import React, { useState, useMemo, useRef } from 'react';
import { parse as markedParse } from 'marked';
import type { Prospect, Interaction, InteractionType, ProspectStatus } from '../../types';
import { Button } from './Button';
import { Card } from './Card';
import { statusMap } from '../../data/statusDefinitions';
import { touchpoints as allTouchpoints, JourneyTouchpoint } from '../../data/journeyData';

interface ProspectDetailModalProps {
    prospect: Prospect;
    onClose: () => void;
    onEdit: () => void;
    onAddInteraction: (prospectId: string, type: InteractionType, content: string) => void;
    onGenerateScript: (prospect: Prospect) => void;
}

const interactionIcons: Record<InteractionType, string> = {
    note: '📝',
    chat: '💬',
    email: '📧',
    call: '📞',
    statusChange: '🔄',
};

type PointWithCoords = JourneyTouchpoint & { y: number };

const AddInteractionForm = ({ prospectId, onAddInteraction }: { prospectId: string, onAddInteraction: (prospectId: string, type: InteractionType, content: string) => void }) => {
    const [type, setType] = useState<InteractionType>('note');
    const [content, setContent] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim()) return;
        onAddInteraction(prospectId, type, content);
        setContent('');
        setType('note');
    };

    return (
        <div className="mt-4 border-t pt-4">
            <h4 className="text-md font-bold text-gray-800 mb-3">Add New Interaction</h4>
            <form onSubmit={handleSubmit} className="space-y-3">
                <div className="flex flex-col sm:flex-row items-center gap-3">
                    <select value={type} onChange={(e) => setType(e.target.value as InteractionType)} className="w-full sm:w-auto px-3 py-2 border-2 border-gray-200 rounded-lg text-sm">
                        <option value="note">📝 Note</option>
                        <option value="chat">💬 Chat</option>
                        <option value="email">📧 Email</option>
                        <option value="call">📞 Call</option>
                    </select>
                    <input 
                        type="text"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Log a new interaction..."
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm"
                    />
                </div>
                <Button type="submit" variant="primary" className="w-full sm:w-auto text-sm py-2">Add to History</Button>
            </form>
        </div>
    );
};

const ProspectJourneyVisualizer = ({ history, onStageClick }: { history: Interaction[], onStageClick: (status: ProspectStatus) => void }) => {
    const visitedStatuses = useMemo(() => new Set(history.map(item => item.statusAtTheTime)), [history]);
    
    const waveData = useMemo(() => {
        const height = 150;
        const centerY = height / 2;
        const amplitude = 30;
        const totalWidth = 2200;

        const pointsWithCoords: PointWithCoords[] = JSON.parse(JSON.stringify(allTouchpoints));
        const find = (id: number): PointWithCoords | undefined => pointsWithCoords.find(p => p.id === id);

        pointsWithCoords.forEach(point => {
            if (point.y) return; 
            let y = centerY;
            if (point.mood !== 'loop' && point.mood !== 'side-quest') {
                 switch(point.mood) {
                    case 'peak': y = centerY - amplitude; break;
                    case 'positive': y = centerY - amplitude * 0.6; break;
                    case 'positive-alt': y = centerY - amplitude * 0.4; break;
                    case 'neutral': y = centerY; break;
                    case 'urgent': y = centerY + amplitude * 0.5; break;
                    default: y = centerY;
                }
                if (point.id === 13) y -= amplitude * 0.5;
            }
            point.y = y;
        });

        const mainPathPoints = pointsWithCoords.filter(p => p.mood !== 'loop' && p.mood !== 'side-quest' && p.statusKey && visitedStatuses.has(p.statusKey));
        
        return { pointsWithCoords, mainPathPoints, viewBoxHeight: height, totalWidth };
    }, [visitedStatuses]);

    return (
        <Card title="Prospect's Journey" icon="🗺️">
            <div className="overflow-x-auto">
                <svg width={waveData.totalWidth} height={waveData.viewBoxHeight} viewBox={`0 0 ${waveData.totalWidth} ${waveData.viewBoxHeight}`}>
                    {waveData.pointsWithCoords.map(p => {
                        const isVisited = p.statusKey ? visitedStatuses.has(p.statusKey) : false;
                        if (p.mood === 'loop' || !p.statusKey) return null;

                        return (
                            <g key={p.id} className={isVisited ? "cursor-pointer" : ""} onClick={() => isVisited && p.statusKey && onStageClick(p.statusKey)}>
                                <circle 
                                    cx={p.x} 
                                    cy={p.y} 
                                    r={8}
                                    className={`transition-all duration-300 ${isVisited ? 'fill-brand-accent-green' : 'fill-gray-300'}`}
                                />
                                <text x={p.x} y={p.y - 15} textAnchor="middle" className={`text-[10px] font-semibold ${isVisited ? 'fill-gray-800' : 'fill-gray-400'}`}>{p.name}</text>
                            </g>
                        );
                    })}
                </svg>
            </div>
        </Card>
    );
};

export const ProspectDetailModal = ({ prospect, onClose, onEdit, onAddInteraction, onGenerateScript }: ProspectDetailModalProps) => {
    
    const sortedHistory = [...(prospect.history || [])].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    const currentStatus = statusMap[prospect.status] || { label: 'Unknown', style: 'bg-gray-100 text-gray-800' };
    const interactionRefs = useRef<Record<string, HTMLDivElement | null>>({});

    const handleStageClick = (status: ProspectStatus) => {
        const firstInteractionForStatus = [...prospect.history].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()).find(item => item.statusAtTheTime === status);
        if (firstInteractionForStatus && interactionRefs.current[firstInteractionForStatus.id]) {
            interactionRefs.current[firstInteractionForStatus.id]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    const renderMarkdown = (text?: string) => {
        if (!text) return null;
        const dirtyHtml = markedParse(text);
        return { __html: dirtyHtml };
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-slate-50 rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
                <div className="p-6 border-b flex justify-between items-start bg-white rounded-t-2xl">
                    <div>
                        <h2 className="text-3xl font-extrabold text-brand-primary-dark">{prospect.name}</h2>
                        <p className="text-md text-gray-600 font-medium">{prospect.position} at <span className="font-bold">{prospect.company}</span></p>
                         <div className="mt-2">
                             <span className={`text-xs font-bold px-3 py-1 rounded-full ${currentStatus.style}`}>
                                {currentStatus.label}
                            </span>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition text-3xl font-light">&times;</button>
                </div>
                <div className="flex-grow overflow-y-auto p-6 space-y-6">
                    <ProspectJourneyVisualizer history={prospect.history} onStageClick={handleStageClick} />
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-6">
                             <Card title="Interaction History" icon="📜">
                                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                                    {sortedHistory.map(item => (
                                        <div key={item.id} ref={el => { interactionRefs.current[item.id] = el; }} className="text-sm flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm">
                                            <div className="mt-0.5 text-lg">{interactionIcons[item.type]}</div>
                                            <div className="flex-grow">
                                                <div className="text-gray-800 whitespace-pre-wrap prose prose-sm max-w-none" dangerouslySetInnerHTML={renderMarkdown(item.content) || { __html: '' }} />
                                                <p className="text-xs text-gray-400 mt-1">
                                                    {new Date(item.timestamp).toLocaleString()} - (Status: {statusMap[item.statusAtTheTime]?.label || 'N/A'})
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                     {sortedHistory.length === 0 && <p className="text-gray-500">No interactions logged yet.</p>}
                                </div>
                                <AddInteractionForm prospectId={prospect.id} onAddInteraction={onAddInteraction} />
                            </Card>
                        </div>
                        <div className="lg:col-span-1 space-y-6">
                             <Card title="Profile Intelligence" icon="🧠">
                                 {prospect.headline && <p><strong className="text-gray-600">Headline:</strong> {prospect.headline}</p>}
                                 {prospect.email && <p><strong className="text-gray-600">Email:</strong> <a href={`mailto:${prospect.email}`} className="text-brand-primary hover:underline">{prospect.email}</a></p>}
                                 <p><strong className="text-gray-600">Deal Value:</strong> ${prospect.dealValue.toLocaleString()}</p>
                             </Card>
                             {prospect.about && (
                                <Card title="About" icon="👤">
                                    <div className="text-sm prose max-w-none prose-p:my-1" dangerouslySetInnerHTML={renderMarkdown(prospect.about) || { __html: '' }} />
                                </Card>
                            )}
                             {prospect.experience && (
                                <Card title="Experience" icon="🛠️">
                                     <div className="text-sm prose max-w-none prose-p:my-1" dangerouslySetInnerHTML={renderMarkdown(prospect.experience) || { __html: '' }} />
                                </Card>
                            )}
                        </div>
                    </div>
                </div>
                 <div className="p-4 border-t bg-gray-100 flex justify-end gap-4 rounded-b-2xl">
                    <Button type="button" onClick={onClose} variant="primary" className="bg-gray-200 text-gray-800 hover:bg-gray-300">Close</Button>
                    <Button onClick={onEdit} variant="info">Edit Prospect</Button>
                    <Button onClick={() => onGenerateScript(prospect)} variant="success">⚡ Generate Script</Button>
                </div>
            </div>
        </div>
    );
};