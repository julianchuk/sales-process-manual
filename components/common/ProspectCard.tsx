import React from 'react';
import type { Prospect } from '../../types';
import { statusMap } from '../../data/statusDefinitions';

interface ProspectCardProps {
    prospect: Prospect;
    onCardClick: () => void;
}

export const ProspectCard = ({ prospect, onCardClick }: ProspectCardProps) => {
    const currentStatus = statusMap[prospect.status] || { label: 'Unknown', style: 'bg-gray-100 text-gray-800' };
    
    return (
        <div
            className="bg-white rounded-xl shadow-lg border-t-4 border-brand-primary flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer h-full"
            onClick={onCardClick}
        >
            <div className="p-5 flex-grow">
                 <div className="flex justify-between items-start gap-2 mb-2">
                    <h3 className="text-xl font-bold text-brand-primary-dark min-w-0">{prospect.name}</h3>
                </div>
                 <div className="flex mb-3">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${currentStatus.style}`}>
                        {currentStatus.label}
                    </span>
                </div>
                <div>
                    <p className="text-gray-600 font-medium min-w-0">{prospect.company}</p>
                    <p className="text-sm text-gray-500 min-w-0">{prospect.position}</p>
                </div>
            </div>
        </div>
    );
};
