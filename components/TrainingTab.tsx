import React from 'react';
import { Card, Highlight } from './common/Card';

interface TrainingTabProps {
    showCopyNotification: (message?: string) => void;
}

const Objection = ({ title, response, onCopy }: { title: string, response: string, onCopy: (text: string) => void }) => (
    <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
        <h4 className="font-bold text-lg text-brand-primary mb-2">{title}</h4>
        <p className="text-gray-600 italic">"{response}"</p>
        <button onClick={() => onCopy(response)} className="text-sm font-semibold text-brand-primary hover:underline mt-3">Copy Response</button>
    </div>
);

export const TrainingTab = ({ showCopyNotification }: TrainingTabProps) => {
    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        showCopyNotification();
    };

    const objections = [
        {
            title: '💰 "Budget Concerns"',
            response: "I understand budget considerations are important. That's exactly why we offer flexible packages. More importantly, the networking ROI from connecting with 4+ Central Bank executives in one place is typically worth 10x the investment. Can we explore a package that fits your current allocation?"
        },
        {
            title: '⏰ "Timing Issues"',
            response: "I appreciate you being upfront about timing. November 2025 might seem far, but Central Bank executives book their calendars 6-12 months in advance. Early commitment actually gives you more speaking opportunities and premium booth selection. What would make the timing work better for your company?"
        },
        {
            title: '📊 "ROI Uncertainty"',
            response: "Great question! Our 2024 sponsors averaged 23 qualified leads and 4 partnership discussions per event. But beyond leads, you're gaining access to regulatory insights that could influence your Latin American strategy for years. Can I share our sponsor success case studies?"
        },
        {
            title: '🏢 "Internal Approval Process"',
            response: "Absolutely understand - these decisions require proper internal alignment. I can provide an executive summary specifically for your leadership team, including confirmed attendee list and competitive landscape. What information would be most compelling for your decision makers?"
        }
    ];

    return (
        <div className="space-y-8">
            <Card title="Training Guide" icon="🎓">
                <p>Use this section to train new team members and referral partners on our proven sales methodology. The key to success is a deep understanding of our value proposition and adherence to the communication strategy.</p>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card title="Core Training Modules" icon="🎯">
                    <ul className="list-disc list-inside space-y-2">
                        <li><strong>Event Knowledge:</strong> Understand the summit's value, confirmed attendees, and unique positioning.</li>
                        <li><strong>Target Identification:</strong> Learn to identify high-value prospects on LinkedIn.</li>
                        <li><strong>Message Personalization:</strong> Master crafting messages that reference specific company initiatives.</li>
                        <li><strong>Objection Handling:</strong> Learn proven responses for common concerns.</li>
                        <li><strong>Follow-up Mastery:</strong> Perfect timing and messaging for follow-up sequences.</li>
                    </ul>
                </Card>
                 <Card title="Universal Principles" icon="⚖️">
                    <ul className="list-disc list-inside space-y-2">
                        <li><strong>2-3 Minute Rule:</strong> ALWAYS wait between greeting and main pitch on LinkedIn.</li>
                        <li><strong>Authority First:</strong> Lead with your credibility before diving into event details.</li>
                        <li><strong>Social Proof Order:</strong> Always mention Central Banks first, then corporate sponsors.</li>
                        <li><strong>Email Gateway:</strong> Move qualified prospects to email for the detailed overview.</li>
                        <li><strong>Question Close:</strong> Always end with a specific question to encourage a response.</li>
                    </ul>
                </Card>
            </div>

            <Card title="Common Objections & Responses" icon="🔧" className="bg-gradient-to-br from-red-50 to-orange-50 border-orange-500">
                <p className="mb-6">Be prepared for common objections. Here are battle-tested responses. Click to copy.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {objections.map(obj => (
                        <Objection key={obj.title} title={obj.title} response={obj.response} onCopy={handleCopy} />
                    ))}
                </div>
            </Card>
        </div>
    );
};
