
import type { ProspectStatus } from '../types';

export interface JourneyTouchpoint {
    id: number;
    name: string;
    timing: string;
    day: number;
    x: number;
    mood: 'positive' | 'peak' | 'neutral' | 'side-quest' | 'loop' | 'positive-alt' | 'urgent';
    description: string;
    statusKey?: ProspectStatus;
}

// This is now the single source of truth for the customer journey map.
// The `statusKey` property links a visual touchpoint to a prospect's status.
export const touchpoints: JourneyTouchpoint[] = [
    { id: 1, name: 'Initial Greeting', timing: '0-1 min', day: 0, x: 50, mood: 'positive', description: "Warm, personal greeting to establish human connection.", statusKey: 'initial-contact' },
    { id: 2, name: 'Main Pitch', timing: '2-3 min', day: 0, x: 120, mood: 'peak', description: "The complete value proposition.", statusKey: 'initial-contact' },
    { id: 3, name: 'Response Qualification', timing: '5-10 min', day: 0, x: 200, mood: 'neutral', description: "Qualify responses and provide specific answers.", statusKey: 'qualification' },
    { id: 8, name: 'LinkedIn Email Ask', timing: 'Day 0', day: 0, x: 280, mood: 'side-quest', description: "First attempt to get email after hesitation.", statusKey: 'linkedin-email-ask' },
    { id: 22, name: 'LinkedIn Follow-up #1', timing: 'Day 7', day: 7, x: 360, mood: 'side-quest', description: "High-value follow-up on LinkedIn.", statusKey: 'linkedin-followup-1' },
    { id: 4, name: 'Send Overview Email', timing: 'Day 0', day: 0, x: 450, mood: 'positive', description: "Send the comprehensive overview email.", statusKey: 'overview-email-sent' },
    { id: 5, name: 'Confirm Email Sent via Chat', timing: 'Day 0', day: 0, x: 0, mood: 'loop', description: "Close the loop on chat to confirm email." },
    { id: 6, name: 'Email Content Follow-up', timing: 'Day 4', day: 4, x: 610, mood: 'positive-alt', description: "Follow up with new, valuable information.", statusKey: 'email-content-followup' },
    { id: 7, name: 'Confirm Follow-up Sent via Chat', timing: 'Day 4', day: 4, x: 0, mood: 'loop', description: "Close the loop on chat for the follow-up." },
    { id: 9, name: 'High-Value Rescue #1', timing: 'Day 7', day: 7, x: 780, mood: 'neutral', description: "Strategic re-engagement for silent prospects.", statusKey: 'high-value-rescue-1' },
    { id: 10, name: 'Social Proof', timing: 'Day 10', day: 10, x: 870, mood: 'peak', description: "Leverage new partnerships to create FOMO.", statusKey: 'social-proof-update' },
    { id: 11, name: 'Discovery Meeting Held', timing: 'Variable', day: 15, x: 1000, mood: 'neutral', description: 'Successful discovery call to understand needs.', statusKey: 'discovery-meeting-held' },
    { id: 12, name: 'Sponsorship Proposal Meeting', timing: '+2 days', day: 17, x: 1130, mood: 'positive', description: 'Present tailored sponsorship packages.', statusKey: 'proposal-meeting-held' },
    { id: 13, name: 'Send Proposal Email', timing: '+24 hours', day: 18, x: 1230, mood: 'peak', description: "Send a formal proposal email with resources.", statusKey: 'proposal-email-sent' },
    { id: 14, name: 'Confirm Proposal Sent via Chat', timing: '+24 hours', day: 18, x: 0, mood: 'loop', description: "Close the loop on chat for the proposal." },
    { id: 15, name: 'Follow-up: Gentle Nudge', timing: '+3 days', day: 21, x: 1430, mood: 'positive-alt', description: 'Proactive offer of collaboration to remove blockers.', statusKey: 'follow-up-gentle-nudge' },
    { id: 16, name: 'Confirm Nudge Sent via Chat', timing: '+3 days', day: 21, x: 0, mood: 'loop', description: "Close the loop on chat for the 'Gentle Nudge'." },
    { id: 17, name: 'Follow-up: Category Scarcity', timing: '+7 days', day: 25, x: 1630, mood: 'urgent', description: 'Create diplomatic urgency with category interest.', statusKey: 'follow-up-scarcity' },
    { id: 18, name: 'Follow-up: Early Bird Offer', timing: '+12 days', day: 30, x: 1750, mood: 'peak', description: 'A value-driven incentive to close the deal.', statusKey: 'follow-up-early-bird' },
    { id: 19, name: 'Confirm Offer Sent via Chat', timing: '+12 days', day: 30, x: 0, mood: 'loop', description: "Close the loop on chat for the 'Early Bird Offer'." },
    { id: 20, name: 'Follow-up: Final Call & Pivot', timing: '+15 days', day: 33, x: 1990, mood: 'neutral', description: 'Final attempt that pivots to a new opportunity.', statusKey: 'follow-up-final-call' },
    { id: 21, name: 'Deal Closed', timing: '+7 days', day: 40, x: 2110, mood: 'peak', description: 'Successful conversion to sponsor.', statusKey: 'deal-closed' }
];

export const animationOrder = [1, 2, 3, 4, 3, 8, 22, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
