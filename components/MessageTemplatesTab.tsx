
import React from 'react';
import { Card, Highlight } from './common/Card';
import { Button } from './common/Button';

interface MessageTemplatesTabProps {
    showCopyNotification: (message?: string) => void;
}

const Template = ({ title, platform, platformColor, content, onCopy }: { title: string, platform: string, platformColor: string, content: string, onCopy: () => void }) => {
    return (
        <div className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center pb-4 mb-4 border-b">
                <h4 className="font-bold text-lg text-brand-primary-dark flex items-center gap-3">
                    {title}
                    <span className="text-xs font-semibold px-3 py-1 rounded-full text-white" style={{ backgroundColor: platformColor }}>
                        {platform}
                    </span>
                </h4>
                <Button onClick={onCopy} variant="primary">📋 Copy</Button>
            </div>
            <div className="whitespace-pre-wrap font-mono text-sm bg-gray-50 p-4 rounded-lg text-gray-700">
                {content}
            </div>
        </div>
    );
};

export const MessageTemplatesTab = ({ showCopyNotification }: MessageTemplatesTabProps) => {

    const templates = [
        {
            id: 'linkedin-initial',
            title: 'Initial LinkedIn Message',
            platform: 'LinkedIn',
            platformColor: '#0077b5',
            content: `Hi [FIRST_NAME], it's a pleasure to connect with you!\n\n[Wait 2-3 minutes after they reply to your greeting]\n\nI'm reaching out and building partnerships, which is why I wanted to share that I'm in charge of public relations for Blockchain Summit LATAM. We're hosting an event in Medellín, Colombia focused on regulators and central banks.\n\nWe have confirmed Central Banks of Colombia, Brazil, Mexico, and Chile, with possible participation from Central Banks of Germany, Guatemala, and Dominican Republic. Additionally, we have major institutional players like BlackRock, JP Morgan Colombia, Bancolombia, and Banco Popular, among others.\n\nWould you be interested in learning more details about the sponsorship opportunities?\n\nBest regards,\nJulián Uribe`
        },
        {
            id: 'email-resistance',
            title: '"Tell me here first" (Email Resistance)',
            platform: 'LinkedIn/Email',
            platformColor: '#db4437',
            content: `Of course! Let me tell you we have confirmed BIS (Bank for International Settlements), 4 Central Banks, BlackRock, JP Morgan - there are multiple partnership options.\n\nGiven the volume of options, and for organization and follow-up workflow purposes, I prefer to send you the complete overview by email so you can review it at your own pace. What would be your email?`
        },
        {
            id: 'email-fallback',
            title: '"Just tell me how we fit first" (Fallback)',
            platform: 'LinkedIn/Email',
            platformColor: '#db4437',
            content: `That's precisely why I send the complete information - so you can review all the touchpoints and partnership opportunities at your own pace, and then decide if you find areas of interest for you.\n\nThis way, if you do see relevant touchpoints, we can have a focused discovery meeting. If not, no time wasted for either of us. Makes sense?`
        },
        {
            id: 'whatsapp-followup',
            title: 'WhatsApp Follow-up',
            platform: 'WhatsApp',
            platformColor: '#25d366',
            content: `Hi [FIRST_NAME]! 👋\n\nHope you're having an excellent day. I'm reaching out to give you an update on Blockchain Summit LATAM 2024.\n\n🎉 New confirmations:\n- [NEW_SPEAKER/SPONSOR]\n- [RECENT_ANNOUNCEMENT]\n\nThe event is gaining tremendous momentum and sponsorship slots are filling up quickly.\n\nDo you have a few minutes this week for a quick call? I can share the complete proposal and explore how [COMPANY_NAME] can benefit from this exclusive networking opportunity.\n\nThank you!\nJulián 🚀`
        }
    ];

    const handleCopy = (content: string) => {
        navigator.clipboard.writeText(content);
        showCopyNotification();
    };

    return (
        <div className="space-y-8">
            <Card title="Message Templates" icon="📝">
                <p>Use these battle-tested templates for consistent and effective communication. Click <Highlight>Copy</Highlight> to add a template to your clipboard.</p>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {templates.map(t => (
                    <Template 
                        key={t.id}
                        title={t.title}
                        platform={t.platform}
                        platformColor={t.platformColor}
                        content={t.content}
                        onCopy={() => handleCopy(t.content)}
                    />
                ))}
            </div>
        </div>
    );
};