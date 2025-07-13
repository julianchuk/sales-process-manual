import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { marked } from 'marked';
import { generateScript } from '../services/geminiService';
import { Button } from './common/Button';
import { Card } from './common/Card';
import type { Prospect } from '../types';

interface ScriptGeneratorTabProps {
    showCopyNotification: (message?: string) => void;
    prospects: Prospect[];
}

const Label = ({ children, htmlFor }: { children: React.ReactNode; htmlFor: string }) => (
    <label htmlFor={htmlFor} className="block text-sm font-semibold text-gray-700 mb-2">
        {children}
    </label>
);

const Select = (props: React.SelectHTMLAttributes<HTMLSelectElement>) => (
    <select
        {...props}
        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition"
    />
);

export const ScriptGeneratorTab = ({ showCopyNotification, prospects }: ScriptGeneratorTabProps) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedProspectId, setSelectedProspectId] = useState<string>('');
    const [focus, setFocus] = useState('central-banks');
    const [generatedScript, setGeneratedScript] = useState('Select a prospect to start.');
    const [isLoading, setIsLoading] = useState(false);
    const [scriptHtml, setScriptHtml] = useState('');

    useEffect(() => {
        if (location.state && location.state.prospect) {
            setSelectedProspectId(location.state.prospect.id);
            // Clear state after use to avoid stale data on subsequent visits
             navigate(location.pathname, { replace: true });
        } else if (prospects.length > 0 && !selectedProspectId) {
            setSelectedProspectId(prospects[0].id);
        }
    }, [location.state, prospects, selectedProspectId, navigate]);

    const selectedProspect = prospects.find(p => p.id === selectedProspectId);

    useEffect(() => {
        if (generatedScript && !isLoading && !generatedScript.startsWith('Select a prospect') && !generatedScript.startsWith('[ERROR]')) {
             (async () => {
                const html = await marked.parse(generatedScript);
                setScriptHtml(html);
            })();
        } else {
            setScriptHtml('');
        }
    }, [generatedScript, isLoading]);

    const handleGenerate = async () => {
        if (!selectedProspect) {
            alert('Please select a prospect.');
            return;
        }
        setIsLoading(true);
        setGeneratedScript('Generating your script with AI... Please wait.');
        try {
            const script = await generateScript(
                selectedProspect,
                focus,
            );
            setGeneratedScript(script);
        } catch (error) {
            setGeneratedScript('An error occurred while generating the script.');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleCopy = async () => {
        if (isSpecialState || !scriptHtml) return;
        try {
            const blobHtml = new Blob([scriptHtml], { type: 'text/html' });
            const blobText = new Blob([generatedScript], { type: 'text/plain' });
            await navigator.clipboard.write([ new ClipboardItem({ 'text/html': blobHtml, 'text/plain': blobText }) ]);
            showCopyNotification('✅ Copied with formatting!');
        } catch (error) {
            navigator.clipboard.writeText(generatedScript).then(() => {
                showCopyNotification('Copied as plain text (rich format unsupported).');
            });
        }
    };

    const isSpecialState = isLoading || generatedScript.startsWith('Select a prospect') || generatedScript.startsWith('[ERROR]');

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card title="🤖 AI-Powered Script Generator" icon="⚡" className="bg-gradient-to-br from-green-50 to-cyan-50 border-brand-accent-green">
                <p className="mb-6 text-gray-600">Select a prospect and the AI will craft a personalized outreach message based on their interaction history and the specific context of your conversation.</p>
                <div className="space-y-4">
                     <div>
                        <Label htmlFor="prospectSelect">Select Prospect *</Label>
                        <Select id="prospectSelect" value={selectedProspectId} onChange={e => setSelectedProspectId(e.target.value)}>
                            <option value="" disabled>-- Select a Prospect --</option>
                            {prospects.map(p => (
                                <option key={p.id} value={p.id}>{p.name} - {p.company}</option>
                            ))}
                        </Select>
                    </div>
                    {selectedProspect && (
                        <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-200 text-sm">
                            <p><strong>Status:</strong> {selectedProspect.status.replace(/-/g, ' ')}</p>
                            <p><strong>Platform:</strong> {selectedProspect.platform}</p>
                        </div>
                    )}
                     <div>
                        <Label htmlFor="focus">Specific Focus</Label>
                        <Select id="focus" name="focus" value={focus} onChange={e => setFocus(e.target.value)}>
                            <option value="central-banks">Central Banks & Regulators</option>
                            <option value="fintech">Fintech & Digital Banking</option>
                            <option value="institutional">Institutional Investment</option>
                        </Select>
                    </div>
                </div>
                <div className="mt-6">
                    <Button onClick={handleGenerate} disabled={isLoading || !selectedProspect} variant="success">
                        {isLoading ? 'Generating...' : '⚡ Generate Script'}
                    </Button>
                </div>
            </Card>

            <Card title="Generated Script" icon="📜" className="h-full flex flex-col">
                 <div className={`flex-grow bg-gray-50 rounded-lg min-h-[300px] border-2 border-dashed border-gray-200 transition-all ${isLoading ? 'animate-pulse opacity-60' : ''}`}>
                    {isSpecialState ? (
                        <div className={`p-4 whitespace-pre-wrap font-mono text-sm h-full flex items-center justify-center text-center ${generatedScript.startsWith('[ERROR]') ? 'text-red-600' : 'text-gray-500'}`}>
                            {generatedScript}
                        </div>
                    ) : (
                        <div 
                            className="p-4 space-y-3 text-gray-800 prose"
                            dangerouslySetInnerHTML={{ __html: scriptHtml }}
                        />
                    )}
                </div>
                 <div className="mt-4">
                    <Button onClick={handleCopy} disabled={isSpecialState}>
                       📋 Copy Script
                    </Button>
                </div>
            </Card>
        </div>
    );
};
