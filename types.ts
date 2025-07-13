export type ProspectStatus =
  | 'initial-contact'
  | 'qualification'
  | 'linkedin-email-ask'
  | 'linkedin-followup-1'
  | 'overview-email-sent'
  | 'email-content-followup'
  | 'high-value-rescue-1'
  | 'social-proof-update'
  | 'discovery-meeting-held'
  | 'proposal-meeting-held'
  | 'proposal-email-sent'
  | 'follow-up-gentle-nudge'
  | 'follow-up-scarcity'
  | 'follow-up-early-bird'
  | 'follow-up-final-call'
  | 'deal-closed'
  | 'deal-lost';

export type InteractionType = 'statusChange' | 'note' | 'chat' | 'call' | 'email';

export interface Interaction {
  id: string;
  timestamp: string; // ISO 8601 format
  type: InteractionType;
  content: string;
  statusAtTheTime: ProspectStatus;
}

export interface Prospect {
  id: string;
  name: string;
  company: string;
  position: string;
  email: string;
  platform: 'linkedin' | 'email' | 'whatsapp' | 'twitter';
  status: ProspectStatus;
  dealValue: number;
  isHighValue: boolean;
  history: Interaction[];
  headline?: string;
  about?: string;
  experience?: string;
  companyOverview?: string;
  companyWebsite?: string;
}
