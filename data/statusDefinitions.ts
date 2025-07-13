import type { ProspectStatus } from '../types';

export interface StatusDefinition {
    value: ProspectStatus;
    label: string;
    group: string;
    style: string;
}

// This is the single source of truth for all statuses, derived from the Customer Journey map.
export const statusDefinitions: StatusDefinition[] = [
    // Prospecting
    { value: 'initial-contact', label: 'Initial Contact', group: 'Prospecting', style: 'bg-sky-100 text-sky-800' },
    { value: 'qualification', label: 'Qualification / Email Ask', group: 'Prospecting', style: 'bg-blue-100 text-blue-800' },
    { value: 'linkedin-email-ask', label: 'LinkedIn Email Ask', group: 'Prospecting', style: 'bg-blue-200 text-blue-900' },
    { value: 'linkedin-followup-1', label: 'LinkedIn Follow-up #1', group: 'Prospecting', style: 'bg-blue-300 text-blue-900' },
    // Post-Overview
    { value: 'overview-email-sent', label: 'Overview Email Sent', group: 'Post-Overview', style: 'bg-indigo-200 text-indigo-800' },
    { value: 'email-content-followup', label: 'Email Content Follow-up', group: 'Post-Overview', style: 'bg-cyan-100 text-cyan-800' },
    // Re-engagement
    { value: 'high-value-rescue-1', label: 'High-Value Rescue #1', group: 'Re-engagement', style: 'bg-yellow-100 text-yellow-800' },
    { value: 'social-proof-update', label: 'Social Proof Update', group: 'Re-engagement', style: 'bg-amber-100 text-amber-800' },
    // Meeting Funnel
    { value: 'discovery-meeting-held', label: 'Discovery Meeting Held', group: 'Meeting Funnel', style: 'bg-lime-100 text-lime-800' },
    { value: 'proposal-meeting-held', label: 'Sponsorship Proposal Meeting', group: 'Meeting Funnel', style: 'bg-emerald-100 text-emerald-800' },
    // Post-Proposal
    { value: 'proposal-email-sent', label: 'Proposal Email Sent', group: 'Post-Proposal', style: 'bg-indigo-100 text-indigo-800' },
    { value: 'follow-up-gentle-nudge', label: 'Follow-up: Gentle Nudge', group: 'Post-Proposal', style: 'bg-violet-100 text-violet-800' },
    { value: 'follow-up-scarcity', label: 'Follow-up: Category Scarcity', group: 'Post-Proposal', style: 'bg-purple-100 text-purple-800' },
    { value: 'follow-up-early-bird', label: 'Follow-up: Early Bird Offer', group: 'Post-Proposal', style: 'bg-fuchsia-100 text-fuchsia-800' },
    { value: 'follow-up-final-call', label: 'Follow-up: Final Call & Pivot', group: 'Post-Proposal', style: 'bg-pink-100 text-pink-800' },
    // Terminal Status
    { value: 'deal-closed', label: 'Deal Closed', group: 'Terminal', style: 'bg-green-100 text-green-800' },
    { value: 'deal-lost', label: 'Deal Lost', group: 'Terminal', style: 'bg-red-100 text-red-800' },
];

// Utility to easily access a status definition by its value
export const statusMap = statusDefinitions.reduce((acc, current) => {
    acc[current.value] = current;
    return acc;
}, {} as Record<ProspectStatus, StatusDefinition>);
