import React, { useState, useCallback, useEffect } from 'react';
import { HashRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { ScriptGeneratorTab } from './components/ScriptGeneratorTab';
import { MessageTemplatesTab } from './components/MessageTemplatesTab';
import { TrainingTab } from './components/TrainingTab';
import { OverviewTab } from './components/OverviewTab';
import { CustomerJourneyTab } from './components/CustomerJourneyTab';
import { ProspectsTab } from './components/ProspectsTab';
import type { Prospect, Interaction, InteractionType } from './types';
import { initialProspects } from './data/initialData';


const Header = () => (
    <div className="bg-gradient-to-br from-brand-primary-dark to-brand-primary text-white p-8 text-center relative overflow-hidden rounded-t-2xl">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10">
            <h1 className="text-4xl font-extrabold mb-2 tracking-tight">🚀 Sales Process Manual</h1>
            <p className="text-lg opacity-90">Blockchain Summit LATAM 2025 - AI-Powered Prospecting System</p>
        </div>
    </div>
);

const Nav = () => {
    const navItems = [
        { path: '/', label: '📋 Overview' },
        { path: '/prospects', label: '🎯 Prospects' },
        { path: '/journey', label: '🌊 Customer Journey' },
        { path: '/generator', label: '⚡ Script Generator' },
        { path: '/templates', label: '📝 Message Templates' },
        { path: '/training', label: '🎓 Training Guide' },
    ];

    return (
        <nav className="flex flex-wrap bg-gray-100 border-b-2 border-gray-200 overflow-x-auto">
            {navItems.map(item => (
                <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                        `py-4 px-6 font-semibold text-gray-600 border-b-4 transition-colors duration-300 ease-in-out whitespace-nowrap
                        ${isActive ? 'border-brand-primary text-brand-primary bg-white' : 'border-transparent hover:bg-gray-200 hover:text-brand-primary'}`
                    }
                >
                    {item.label}
                </NavLink>
            ))}
        </nav>
    );
};


const CopyNotification = ({ message, show }: { message: string, show: boolean }) => (
    <div className={`fixed top-5 right-5 bg-brand-accent-green text-white py-2 px-5 rounded-lg shadow-lg transition-all duration-300 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}`}>
        {message}
    </div>
);

const PROSPECTS_STORAGE_KEY = 'sales-manual-prospects-v2';

export default function App() {
    const [prospects, setProspects] = useState<Prospect[]>(() => {
        try {
            const savedProspects = localStorage.getItem(PROSPECTS_STORAGE_KEY);
            if (savedProspects) {
                return JSON.parse(savedProspects);
            }
        } catch (error) {
            console.error("Error reading prospects from localStorage", error);
        }
        return initialProspects;
    });
    
    const [notification, setNotification] = useState({ show: false, message: '' });

    useEffect(() => {
        try {
            localStorage.setItem(PROSPECTS_STORAGE_KEY, JSON.stringify(prospects));
        } catch (error) {
            console.error("Error saving prospects to localStorage", error);
        }
    }, [prospects]);

    const showCopyNotification = useCallback((message = '✅ Copied to clipboard!') => {
        setNotification({ show: true, message });
        setTimeout(() => {
            setNotification({ show: false, message: '' });
        }, 2000);
    }, []);

    const handleUpdateProspect = (updatedProspect: Prospect) => {
        setProspects(prevProspects => {
            return prevProspects.map(p => {
                if (p.id === updatedProspect.id) {
                    // Automatically add a status change interaction to the history
                    if (p.status !== updatedProspect.status) {
                        const newInteraction: Interaction = {
                            id: new Date().toISOString(),
                            timestamp: new Date().toISOString(),
                            type: 'statusChange',
                            content: `Status changed to ${updatedProspect.status.replace(/-/g, ' ')}`,
                            statusAtTheTime: p.status,
                        };
                        // Make sure history exists
                        const history = updatedProspect.history || [];
                        return { ...updatedProspect, history: [...history, newInteraction] };
                    }
                    return updatedProspect;
                }
                return p;
            });
        });
        showCopyNotification('Prospect updated!');
    };
    
    const handleAddInteraction = (prospectId: string, type: InteractionType, content: string) => {
        setProspects(prevProspects => {
            return prevProspects.map(p => {
                if (p.id === prospectId) {
                    const newInteraction: Interaction = {
                        id: new Date().toISOString(),
                        timestamp: new Date().toISOString(),
                        type: type,
                        content: content,
                        statusAtTheTime: p.status,
                    };
                    const history = p.history || [];
                    return { ...p, history: [...history, newInteraction] };
                }
                return p;
            });
        });
        showCopyNotification('Interaction added!');
    };


    const handleAddProspect = (newProspectData: Omit<Prospect, 'id' | 'history'> & { about?: string, experience?: string }) => {
        
        let initialNote = 'Prospect created.';
        if (newProspectData.about || newProspectData.experience) {
            initialNote = 'Prospect created from AI Parser.';
        }
        
        const { about, experience, ...restOfData } = newProspectData;

        const newProspect: Prospect = {
            ...restOfData,
            id: new Date().toISOString(),
            // Pass about and experience to be stored at the top level
            about: about || '',
            experience: experience || '',
            history: [{
                id: new Date().toISOString(),
                timestamp: new Date().toISOString(),
                type: 'note',
                content: initialNote,
                statusAtTheTime: newProspectData.status,
            }]
        };

        setProspects(prevProspects => [...prevProspects, newProspect]);
        showCopyNotification('Prospect added!');
    };

    const handleDeleteProspect = (prospectId: string) => {
        if (window.confirm('Are you sure you want to permanently delete this prospect?')) {
            setProspects(prevProspects => prevProspects.filter(p => p.id !== prospectId));
            showCopyNotification('Prospect deleted.');
        }
    };


    return (
        <HashRouter>
            <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 font-sans text-gray-800">
                <div className="max-w-7xl mx-auto my-0 sm:my-8 bg-white rounded-2xl shadow-2xl">
                    <Header />
                    <Nav />
                    <main className="p-4 sm:p-8 bg-white rounded-b-2xl">
                         <Routes>
                            <Route path="/" element={<OverviewTab prospects={prospects} />} />
                            <Route path="/prospects" element={<ProspectsTab prospects={prospects} onUpdate={handleUpdateProspect} onAdd={handleAddProspect} onDelete={handleDeleteProspect} onAddInteraction={handleAddInteraction} />} />
                            <Route path="/journey" element={<CustomerJourneyTab showCopyNotification={showCopyNotification} />} />
                            <Route path="/generator" element={<ScriptGeneratorTab showCopyNotification={showCopyNotification} prospects={prospects}/>} />
                            <Route path="/templates" element={<MessageTemplatesTab showCopyNotification={showCopyNotification} />} />
                            <Route path="/training" element={<TrainingTab showCopyNotification={showCopyNotification} />} />
                        </Routes>
                    </main>
                </div>
                <CopyNotification show={notification.show} message={notification.message} />
            </div>
        </HashRouter>
    );
}
