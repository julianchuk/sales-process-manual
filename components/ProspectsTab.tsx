import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Prospect, ProspectStatus, InteractionType } from '../types';
import { Card } from './common/Card';
import { Button } from './common/Button';
import { ProspectModal } from './common/ProspectModal';
import { ProspectCard } from './common/ProspectCard';
import { ProspectDetailModal } from './common/ProspectDetailModal';
import { touchpoints, JourneyTouchpoint, animationOrder } from '../data/journeyData';

type PointWithCoords = JourneyTouchpoint & { y: number };

interface ProspectsTabProps {
    prospects: Prospect[];
    onUpdate: (prospect: Prospect) => void;
    onAdd: (prospect: Omit<Prospect, 'id' | 'history'> & { about?: string, experience?: string }) => void;
    onDelete: (prospectId: string) => void;
    onAddInteraction: (prospectId: string, type: InteractionType, content: string) => void;
}

const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
}).format(value);


export const ProspectsTab = ({ prospects, onUpdate, onAdd, onDelete, onAddInteraction }: ProspectsTabProps) => {
    const navigate = useNavigate();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [activeProspect, setActiveProspect] = useState<Prospect | null>(null);
    
    const [selectedPoint, setSelectedPoint] = useState<PointWithCoords | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [animationIndex, setAnimationIndex] = useState(0);
    const animationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const prospectListRef = useRef<HTMLDivElement>(null);

    const handleOpenAddModal = () => {
        setActiveProspect(null);
        setIsEditModalOpen(true);
    };

    const handleOpenEditModal = (prospect: Prospect) => {
        setActiveProspect(prospect);
        setIsDetailModalOpen(false); // Close detail view
        setIsEditModalOpen(true);
    };
    
    const handleOpenDetailModal = (prospect: Prospect) => {
        setActiveProspect(prospect);
        setIsDetailModalOpen(true);
    };

    const handleCloseModals = () => {
        setIsEditModalOpen(false);
        setIsDetailModalOpen(false);
        setActiveProspect(null);
    };

    const handleSaveProspect = (prospectData: Omit<Prospect, 'id' | 'history'> | (Prospect & { about?: string, experience?: string })) => {
        if (activeProspect && 'id' in prospectData) {
            onUpdate(prospectData as Prospect);
        } else {
            onAdd(prospectData as Omit<Prospect, 'id' | 'history'> & { about?: string, experience?: string });
        }
        handleCloseModals();
    };

    const prospectCounts = useMemo(() => {
        const counts = new Map<ProspectStatus, number>();
        for (const p of prospects) {
            if (p.status) {
                counts.set(p.status, (counts.get(p.status) || 0) + 1);
            }
        }
        return counts;
    }, [prospects]);

    const waveData = useMemo(() => {
        const height = 450;
        const centerY = height / 2 + 40;
        const amplitude = 60;
        const totalWidth = 2200;
        const pointsWithCoords: PointWithCoords[] = JSON.parse(JSON.stringify(touchpoints));
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
        const p3 = find(3);
        const p8 = find(8);
        const p22 = find(22);
        if (p3?.y && p8 && p22) {
            p8.y = p3.y + amplitude * 2.5; 
            p22.y = p8.y + 20; 
        }
        const mainPathPoints = pointsWithCoords.filter(p => p.mood !== 'loop' && p.mood !== 'side-quest');
        const p13 = mainPathPoints.find(p => p.id === 13);
        const p15 = mainPathPoints.find(p => p.id === 15);
        if (p13?.y && p15) {
             p15.y = p13.y + amplitude * 0.2
        }
        const getPathSegment = (start: PointWithCoords, end: PointWithCoords) => {
            const dx = (end.x - start.x) / 2;
            const cp1x = start.x + dx;
            const cp1y = start.y;
            const cp2x = end.x - dx;
            const cp2y = end.y;
            return ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${end.x},${end.y}`;
        };
        let mainPath = `M 0,${centerY} L ${mainPathPoints[0].x},${mainPathPoints[0].y}`;
        for (let i = 0; i < mainPathPoints.length - 1; i++) {
             mainPath += getPathSegment(mainPathPoints[i], mainPathPoints[i+1]);
        }
        let sideQuestPathDown = '';
        let sideQuestPathMiddle = '';
        let sideQuestPathUp = '';
        const p4 = find(4);
        if(p3 && p8 && p22 && p4) {
            const rxDown = Math.abs(p8.x - p3.x);
            const ryDown = Math.abs(p8.y - p3.y);
            sideQuestPathDown = `M ${p3.x},${p3.y} A ${rxDown} ${ryDown} 0 0 0 ${p8.x},${p8.y}`;
            sideQuestPathMiddle = `M ${p8.x},${p8.y} L ${p22.x},${p22.y}`;
            const rxUp = Math.abs(p4.x - p22.x);
            const ryUp = Math.abs(p4.y - p22.y);
            sideQuestPathUp = `M ${p22.x},${p22.y} A ${rxUp} ${ryUp} 0 0 1 ${p4.x},${p4.y}`;
        }
        return { pointsWithCoords, mainPath, sideQuestPathDown, sideQuestPathMiddle, sideQuestPathUp, viewBoxHeight: height, totalWidth };
    }, []);

    const handlePointClick = useCallback((point: PointWithCoords) => {
        if(point.statusKey){
            if (isAnimating) return; // Disable clicking during animation
            setSelectedPoint(prev => prev?.id === point.id ? null : point);
        }
    }, [isAnimating]);
    
    const runAnimationStep = useCallback((index: number) => {
        if (index >= animationOrder.length) {
            handleReset();
            return;
        }
        const pointId = animationOrder[index];
        const point = waveData.pointsWithCoords.find(p => p.id === pointId);
        if (point?.statusKey) {
            setAnimationIndex(index);
            setSelectedPoint(point);
            if (scrollContainerRef.current) {
                const container = scrollContainerRef.current;
                const scrollPosition = point.x - (container.clientWidth / 2);
                container.scrollTo({ left: scrollPosition, behavior: 'smooth' });
            }
        }
        const prospectCount = (point && point.statusKey) ? (prospectCounts.get(point.statusKey) || 0) : 0;
        const delay = 1000 + (prospectCount * 300);
        animationTimeoutRef.current = setTimeout(() => runAnimationStep(index + 1), delay);
    }, [waveData.pointsWithCoords, prospectCounts]);

    const handleAnimate = useCallback(() => {
        setIsAnimating(true);
        setIsPaused(false);
        runAnimationStep(0);
    }, [runAnimationStep]);

    const handleTogglePause = useCallback(() => {
        setIsPaused(prev => {
            const currentlyPaused = !prev;
            if (currentlyPaused) {
                if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);
            } else {
                runAnimationStep(animationIndex + 1);
            }
            return currentlyPaused;
        });
    }, [animationIndex, runAnimationStep]);

    const handleReset = useCallback(() => {
        if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);
        setIsAnimating(false);
        setIsPaused(false);
        setAnimationIndex(0);
        setSelectedPoint(null);
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        }
    }, []);

    useEffect(() => {
        if (isAnimating && selectedPoint && prospectListRef.current) {
            setTimeout(() => {
                 prospectListRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 150); 
        }
    }, [selectedPoint, isAnimating]);

    const filteredProspects = useMemo(() => {
        if (!selectedPoint || !selectedPoint.statusKey) return [];
        return prospects.filter(p => p.status === selectedPoint.statusKey);
    }, [prospects, selectedPoint]);

    const selectedStageValue = useMemo(() => {
        return filteredProspects.reduce((sum, p) => sum + p.dealValue, 0);
    }, [filteredProspects]);

    const currentAnimatedPointId = isAnimating ? animationOrder[animationIndex] : -1;

    const handleGenerateScript = (prospect: Prospect) => {
        handleCloseModals();
        navigate('/generator', { state: { prospect } });
    };

    return (
        <div className="space-y-8">
            <Card title="Visual Prospect Pipeline" icon="🎯">
                <p>The Customer Journey map is your new pipeline view. Click any stage on the map to see the prospects currently in that phase. This provides a real-time, visual overview of your entire sales funnel.</p>
                 <div className="mt-4 flex flex-wrap gap-4">
                    <Button onClick={handleOpenAddModal} variant="success" disabled={isAnimating}>
                        + Add New Prospect
                    </Button>
                    {!isAnimating && <Button onClick={handleAnimate} variant="info">▶️ Animate Journey</Button>}
                </div>
            </Card>

            <Card ref={scrollContainerRef} className="p-2 sm:p-4 overflow-x-auto">
                 <svg width={waveData.totalWidth} height={waveData.viewBoxHeight} viewBox={`0 0 ${waveData.totalWidth} ${waveData.viewBoxHeight}`} className={`min-w-[${waveData.totalWidth}px]`}>
                     <path d={waveData.mainPath} fill="none" stroke="#2a5298" strokeWidth="4" />
                     <path d={waveData.sideQuestPathDown} fill="none" stroke="#2a5298" strokeWidth="3" strokeDasharray="5, 5" />
                    <path d={waveData.sideQuestPathMiddle} fill="none" stroke="#2a5298" strokeWidth="3" strokeDasharray="5, 5" />
                    <path d={waveData.sideQuestPathUp} fill="none" stroke="#2a5298" strokeWidth="3" strokeDasharray="5, 5" />
                    {waveData.pointsWithCoords.map((p) => {
                         const isSelected = selectedPoint?.id === p.id;
                         const isClickable = !!p.statusKey;
                         const isSideQuestPoint = p.mood === 'side-quest';
                         const isLoopPoint = p.mood === 'loop';
                         const count = p.statusKey ? (prospectCounts.get(p.statusKey) || 0) : 0;
                         const isCurrentlyAnimated = currentAnimatedPointId === p.id;
                         if(isLoopPoint) return null;
                         return (
                            <g key={p.id} className={isClickable ? 'cursor-pointer' : 'cursor-not-allowed'} onClick={() => handlePointClick(p)}>
                                <circle 
                                    cx={p.x} 
                                    cy={p.y!} 
                                    r={isCurrentlyAnimated ? 16 : isSelected ? 14 : 10}
                                    className={`stroke-white transition-all duration-300 ${!isClickable ? 'fill-gray-400 opacity-60' : isSelected || isCurrentlyAnimated ? 'fill-brand-accent-green shadow-lg' : isSideQuestPoint ? 'fill-blue-400' : 'fill-brand-primary'} ${isCurrentlyAnimated ? 'animate-pulse' : ''}`}
                                    strokeWidth={isClickable ? 4 : 2}
                                />
                                <text x={p.x} y={p.y! - 22} textAnchor="middle" className="text-sm font-semibold fill-gray-800 pointer-events-none">{p.name}</text>
                                {count > 0 && !isAnimating && (
                                     <g>
                                        <circle cx={p.x + 20} cy={p.y! - 20} r={11} className="fill-brand-accent-orange stroke-white stroke-2" />
                                        <text x={p.x + 20} y={p.y! - 20} textAnchor="middle" dy=".3em" className="text-xs font-bold fill-white pointer-events-none">{count}</text>
                                    </g>
                                )}
                            </g>
                         );
                     })}
                </svg>
            </Card>

            {selectedPoint && (
                 <Card ref={prospectListRef}>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 border-b pb-4">
                        <div>
                             <h3 className="text-2xl font-bold text-brand-primary-dark">Stage: {selectedPoint.name}</h3>
                            <p className="font-semibold text-gray-600">
                                {filteredProspects.length} {filteredProspects.length === 1 ? 'Prospect' : 'Prospects'} | Total Value: {formatCurrency(selectedStageValue)}
                            </p>
                        </div>
                        {isAnimating ? (
                            <div className="flex gap-2">
                                <Button onClick={handleTogglePause} variant="warning" className="px-3 py-1.5 text-xs">
                                    {isPaused ? '▶️ Resume' : '⏸️ Pause'}
                                </Button>
                                <Button onClick={handleReset} variant="primary" className="px-3 py-1.5 text-xs bg-red-500 hover:bg-red-600">
                                    Stop
                                </Button>
                            </div>
                        ) : (
                             <button onClick={() => setSelectedPoint(null)} className="text-gray-500 hover:text-red-500 font-bold text-xl px-3 py-1 rounded-full hover:bg-red-100 transition-colors" title="Clear Selection">&times;</button>
                        )}
                    </div>

                    {filteredProspects.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {filteredProspects.map(prospect => (
                                <ProspectCard 
                                    key={prospect.id} 
                                    prospect={prospect} 
                                    onCardClick={() => handleOpenDetailModal(prospect)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10 text-gray-500">
                            <p className="font-semibold text-lg">No prospects in this stage.</p>
                        </div>
                    )}
                 </Card>
            )}

            {isEditModalOpen && (
                <ProspectModal 
                    prospect={activeProspect} 
                    onSave={handleSaveProspect} 
                    onClose={handleCloseModals} 
                />
            )}
            
            {isDetailModalOpen && activeProspect && (
                <ProspectDetailModal
                    prospect={activeProspect}
                    onClose={handleCloseModals}
                    onEdit={() => handleOpenEditModal(activeProspect)}
                    onAddInteraction={onAddInteraction}
                    onGenerateScript={handleGenerateScript}
                />
            )}
        </div>
    );
};
