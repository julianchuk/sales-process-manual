
import React, { forwardRef } from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
    icon?: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({ children, className = '', title, icon }, ref) => (
    <div ref={ref} className={`bg-gradient-to-br from-slate-50 to-gray-100 rounded-xl p-6 border-l-4 border-brand-primary shadow-md ${className}`}>
        {title && (
            <div className="flex items-center mb-4">
                {icon && <div className="text-2xl mr-3">{icon}</div>}
                <h3 className="text-xl font-bold text-brand-primary-dark">{title}</h3>
            </div>
        )}
        <div className="text-gray-700 space-y-3">
            {children}
        </div>
    </div>
));

Card.displayName = 'Card';


export const Highlight = ({ children }: { children: React.ReactNode }) => (
    <span className="bg-gradient-to-r from-yellow-200 to-orange-200 px-2 py-1 rounded-md font-semibold text-yellow-900">
        {children}
    </span>
);