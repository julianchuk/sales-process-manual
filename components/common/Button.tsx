import React from 'react';

type ButtonProps = {
    children: React.ReactNode;
    variant?: 'primary' | 'success' | 'warning' | 'info';
    icon?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ children, variant = 'primary', icon, ...props }: ButtonProps) => {
    const baseClasses = "px-5 py-2.5 rounded-lg font-semibold text-white shadow-md transition-all duration-300 ease-in-out flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";
    
    const variants = {
        primary: 'bg-gradient-to-br from-brand-primary to-brand-primary-dark hover:shadow-lg hover:-translate-y-0.5',
        success: 'bg-gradient-to-br from-brand-accent-green to-teal-600 hover:shadow-lg hover:-translate-y-0.5',
        warning: 'bg-gradient-to-br from-brand-accent-yellow to-brand-accent-orange hover:shadow-lg hover:-translate-y-0.5',
        info: 'bg-gradient-to-br from-sky-500 to-indigo-600 hover:shadow-lg hover:-translate-y-0.5',
    };

    return (
        <button className={`${baseClasses} ${variants[variant]}`} {...props}>
            {icon}
            {children}
        </button>
    );
};
