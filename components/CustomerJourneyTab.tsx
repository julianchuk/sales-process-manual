


import React, { useState, useMemo, useCallback, useRef } from 'react';
import { Card, Highlight } from './common/Card';
import { Button } from './common/Button';
import { touchpoints, animationOrder } from '../data/journeyData'; // Use centralized data
import type { JourneyTouchpoint } from '../data/journeyData';

// ... (Rest of the component's internal detail views like InitialGreetingDetails etc. remain unchanged) ...

const DetailTemplate = ({ title, content, onCopy, preformatted = true }: { title: string, content: string, onCopy?: () => void, preformatted?: boolean }) => (
    <div className="bg-white border-2 border-gray-200 rounded-xl p-4 my-4 shadow-sm">
        <div className="flex justify-between items-center pb-3 mb-3 border-b">
            <h5 className="font-bold text-md text-brand-primary-dark">{title}</h5>
            {onCopy && <Button onClick={onCopy} variant="primary" className="px-3 py-1.5 text-sm">📋 Copy</Button>}
        </div>
        <div className={`${preformatted ? 'whitespace-pre-wrap font-mono' : ''} text-xs bg-gray-50 p-3 rounded-lg text-gray-700`}>{content}</div>
    </div>
);


const InitialGreetingDetails = ({ showCopyNotification }: { showCopyNotification: (message?: string) => void }) => {
    const template = "Hi [NAME], it's a pleasure to greet you!";
    const handleCopy = () => {
        navigator.clipboard.writeText(template);
        showCopyNotification();
    };
    const proTips = [
        { title: "Show Genuine Appreciation", text: "Express sincere gratitude for the opportunity to connect, e.g., \"It's truly a pleasure to connect with you!\" This sets a warm, human tone." },
        { title: "Convey Good Vibes & Joy", text: "Use positive language and emojis (e.g., 😊 or 👋) to transmit optimism and enthusiasm. Example: \"Hi [NAME], thrilled to reach out today!\"" },
        { title: "Prioritize the Human", text: "Focus on the person first, not the pitch. Ask a light, human-centric question like \"How's your week going?\" or compliment their recent work, e.g., \"I loved your recent post on [TOPIC]!\"" },
        { title: "Take Your Time", text: "Wait 0-1 minute before moving to the pitch. This shows respect for their time and builds rapport naturally." },
        { title: "Avoid Rushing", text: "Never jump straight to business. A rushed greeting feels transactional and undermines the human connection." }
    ];

    return (
        <div className="mt-4 space-y-4">
             <DetailTemplate title="Example Message" content={template} onCopy={handleCopy} />
             <Card title="💡 Pro Tips for Initial Greeting" icon="🧠" className="bg-gradient-to-br from-yellow-50 to-orange-50 border-brand-accent-yellow">
                <ul className="space-y-3">
                    {proTips.map((tip, index) => (
                        <li key={index}>
                            <strong className="text-gray-800">{tip.title}:</strong>
                            <span className="text-gray-700 ml-1">{tip.text}</span>
                        </li>
                    ))}
                </ul>
             </Card>
        </div>
    );
};

const ConfirmEmailSentDetails = ({ showCopyNotification }: { showCopyNotification: (message?: string) => void }) => {
    const templates = {
        greeting: "Hi [NAME], hope your day is going great!",
        confirmation: "Email sent! Please confirm receipt, just in case it landed in spam."
    };
    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        showCopyNotification();
    };

    return (
        <div className="mt-4 space-y-6">
            <Card title="💬 Two-Part Chat Message" icon="📱">
                <p className="text-sm text-gray-600 mb-4">Send these two messages in the original chat (LinkedIn, WhatsApp, etc.) 1 minute apart.</p>
                <DetailTemplate title="Message 1: The Greeting" content={templates.greeting} onCopy={() => handleCopy(templates.greeting)} />
                <DetailTemplate title="Message 2: The Confirmation (1 min later)" content={templates.confirmation} onCopy={() => handleCopy(templates.confirmation)} />
            </Card>
            <Card title="💡 Pro-Tips for Closing the Loop" icon="🧠">
                <ul className="space-y-2 text-sm text-gray-700">
                    <li><strong>Maintain Momentum:</strong> This keeps the original chat warm while you wait for an email response.</li>
                    <li><strong>Beat the Spam Filter:</strong> This is the single most effective way to ensure your detailed email gets seen.</li>
                    <li><strong>Create a Micro-Commitment:</strong> Asking for confirmation subtly prompts them to open the email sooner.</li>
                    <li><strong>Show You're Organized:</strong> It demonstrates a professional, end-to-end communication process.</li>
                </ul>
            </Card>
        </div>
    );
};

const ConfirmFollowupSentDetails = ({ showCopyNotification }: { showCopyNotification: (message?: string) => void }) => {
    const template = "Hi [NAME], just sent you a quick follow-up email with some important updates. Let me know your thoughts when you have a chance!";
    const handleCopy = () => {
        navigator.clipboard.writeText(template);
        showCopyNotification();
    };

    return (
        <div className="mt-4 space-y-6">
            <DetailTemplate title="Follow-up Confirmation Message" content={template} onCopy={handleCopy} />
            <Card title="💡 Pro-Tips for the Second Loop" icon="🧠">
                <ul className="space-y-2 text-sm text-gray-700">
                    <li><strong>Reinforce & Nudge:</strong> This action gently nudges the prospect to check their email without being pushy.</li>
                    <li><strong>Keep it Simple:</strong> A single, brief message is all that's needed here.</li>
                    <li><strong>Maintain Channel Warmth:</strong> It shows you're actively managing the conversation across platforms.</li>
                </ul>
            </Card>
        </div>
    );
};


const DayFourFollowupDetails = ({ showCopyNotification }: { showCopyNotification: (message?: string) => void }) => {
    const template = `Subject: Following up – [Prospect Company] & Blockchain Summit LATAM 2024

Hi [PROSPECT_NAME],

Hope you are doing very well. Following up on our conversation about the potential participation of [Prospect Company] in the Blockchain Summit LATAM 2024.

I understand that schedules can get busy, but we were very enthusiastic about coordinating a call to share the value proposition in depth, especially considering the institutional and strategic profile we are consolidating.

I'll take this opportunity to leave you with some key updates since our last exchange:

✅ **Key Updates Since We Last Spoke:**
*   **Confirmed:** The Bank for International Settlements (BIS), alongside the central banks of Colombia, Brazil, Mexico, and Chile.
*   **New Speaker:** Juan Carlos Reyes, president of El Salvador's CNAD, has joined as a speaker.
*   **Official Media Partner:** Negocios TV is confirmed (global leader in YouTube views among financial media in Feb 2024).
*   **Regional Activations:** Roadshows are being organized in Bogotá, Medellín, Lima, Santiago, San José, and Buenos Aires, in partnership with local fintech and blockchain chambers.

🏆 **Blockchain & Fintech LATAM Awards:**
Organized with our regional chamber allies under multilateral MoUs, we are featuring award categories aligned with the profile of the [client type/industry, e.g., 'exchange' or 'payments' sector]:
*   [Mention 2-3 specific award categories relevant to their business from the full list, e.g., Best CEX, Best Web3 Education Initiative, Best Fintech-Web3 Integration].

👉 If you are still interested, you can book a time directly here: [YOUR_BOOKING_LINK]
Or, if you prefer, I'd be happy to use your scheduling tool.

I would be delighted to resume the conversation when you consider it appropriate. I'm convinced that [Prospect Company] can play a leading role in this edition of the Summit.

Best regards,
[YOUR_NAME]`;

    const handleCopy = (content: string) => {
        navigator.clipboard.writeText(content);
        showCopyNotification();
    };

    return (
        <div className="mt-4 space-y-6">
            <Card title="🔱 Day 4: High-Value Email Follow-up" icon="📧">
                 <div className="border border-green-300 bg-green-50 rounded-lg p-4">
                    <h4 className="font-bold text-lg text-green-800 mb-2">Path: Email Content Follow-up </h4>
                    <p className="text-sm text-green-700 mb-2"><strong>TARGET:</strong> Prospects who HAVE received the overview email but haven't responded.</p>
                    <DetailTemplate title="High-Value Follow-up Template" content={template} onCopy={() => handleCopy(template)} />
                    <Card title="💡 Pro-Tips for High-Value Follow-up" icon="🧠" className="mt-4 bg-gradient-to-br from-green-100 to-teal-100 border-green-500">
                        <ul className="space-y-2 text-sm text-gray-700">
                            <li><strong>Lead with New Value:</strong> Don't just "check in." Always provide new, exciting information (new speakers, partners, awards) to justify the follow-up.</li>
                            <li><strong>Personalize the Updates:</strong> When mentioning the awards, tailor the example categories to the prospect's specific industry (e.g., mention "Best CEX" to an exchange). This shows you're thinking specifically about them.</li>
                            <li><strong>Be Flexible on the Call to Action:</strong> Offering both your booking link and the option to use theirs is considerate and removes friction.</li>
                        </ul>
                    </Card>
                </div>
            </Card>

            <Card title="⚡ Time Optimization Tips" icon="⏱️" className="bg-gradient-to-br from-gray-50 to-gray-200 border-gray-400">
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li><strong>Never Show Desperation:</strong> Don't beg for meetings or responses. Your time is valuable.</li>
                    <li><strong>Flow and Optimize:</strong> If you meet resistance on a channel, don't force it. Let the prospect go.</li>
                    <li><strong>Focus on the Responsive:</strong> Allocate your energy to prospects who are engaging with you.</li>
                    <li><strong>Difficult Prospects are a Red Flag:</strong> If a prospect is difficult this early, they will likely be a difficult partner. Focus on building smooth, positive relationships.</li>
                </ul>
            </Card>
        </div>
    );
};


const ResponseQualificationDetails = () => {
    return (
        <div className="mt-4 space-y-6">
            <p className="text-gray-600">This is a branching point. If the prospect gives their email, you proceed to <Highlight>Send Overview Email</Highlight>. If they are hesitant, you move to the <Highlight>LinkedIn Email Ask</Highlight> path to persist.</p>
            <Card title="💡 Conversion Strategy Pro Tips" icon="🧠" className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-500">
                <ul className="space-y-3">
                    <li className="flex items-start">
                        <span className="text-purple-600 mr-2 mt-1">✓</span>
                        <span className="text-gray-700 text-sm"><strong>Qualify and Direct:</strong> Your goal is to determine their interest level and guide them to the correct path (main email funnel or the LinkedIn persistence path).</span>
                    </li>
                     <li className="flex items-start">
                        <span className="text-purple-600 mr-2 mt-1">✓</span>
                        <span className="text-gray-700 text-sm"><strong>High Engagement:</strong> If they ask questions like "When is the event?", answer directly and then pivot to the email ask. See the "LinkedIn Email Ask" step for templates.</span>
                    </li>
                    <li className="flex items-start">
                        <span className="text-purple-600 mr-2 mt-1">✓</span>
                        <span className="text-gray-700 text-sm"><strong>Low Engagement:</strong> For 👍 or "Thanks", you can either let them go or, if they are a high-value target, transition them to the "LinkedIn Email Ask" path to try and re-engage.</span>
                    </li>
                </ul>
            </Card>
        </div>
    );
};


const LinkedInEmailAskDetails = ({ showCopyNotification }: { showCopyNotification: (message?: string) => void }) => {
    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        showCopyNotification();
    };

    const templates = {
        tellMeFirst: "Of course! Let me tell you we have confirmed BIS (Bank for International Settlements), 4 Central Banks, BlackRock, JP Morgan - there are multiple partnership options. \n\nGiven the volume of options, and for organization and follow-up workflow purposes, I prefer to send you the complete overview by email so you can review it at your own pace. What would be your email?",
        fitFirstFallback: "That's precisely why I send the complete information - so you can review all the touchpoints and partnership opportunities at your own pace, and then decide if you find areas of interest for you. \n\nThis way, if you do see relevant touchpoints, we can have a focused discovery meeting. If not, no time wasted for either of us. Makes sense?",
    };

    const proTips = [
        "Value Preview Method: 'Of course! We have confirmed BIS, 4 Central Banks, BlackRock, JP Morgan... for organization and follow-up workflow purposes, I prefer email.' Shows transparency while maintaining professional standards.",
        "Diplomatic Justification: 'For organization and follow-up workflow purposes' sounds professional and systematic, not preferential. It positions email as a business standard, not personal preference.",
        "Avoid Dry Responses: Never just say 'It's too much info for this channel.' Always give value preview first, then justify the email process. Dry responses lose qualified prospects.",
        "Efficiency Language: 'Most economical/time-efficient' frames the email process as beneficial for them, not just you."
    ];
    
     return (
        <div className="mt-4 space-y-6">
            <Card title="🛡️ Email Resistance & Qualification" icon="🚦">
                <p className="text-sm text-gray-600 mb-4">Use these templates when a prospect shows interest but is hesitant to provide their email address.</p>
                <DetailTemplate title='"Tell me here first" (Primary Response)' content={templates.tellMeFirst} onCopy={() => handleCopy(templates.tellMeFirst)} />
                <DetailTemplate title='"Just tell me how we fit first" (Fallback Response)' content={templates.fitFirstFallback} onCopy={() => handleCopy(templates.fitFirstFallback)} />
            </Card>

             <Card title="💡 Pro-Tips for this Stage" icon="🧠">
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                    {proTips.map((tip, index) => <li key={index}>{tip}</li>)}
                </ul>
            </Card>
        </div>
    );
};

const LinkedInFollowupDetails = ({ showCopyNotification }: { showCopyNotification: (message?: string) => void }) => {
    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        showCopyNotification();
    };
    const template = "Hi [NAME], hope you're doing very well! \n\nMy messages probably got lost in the crowd - writing to get to the top of your inbox. \n\nQuick reminder about the Blockchain Summit LATAM opportunity with Central Banks of Colombia, Brazil, Mexico, Chile + BIS now confirmed. Worth a quick chat?";

     return (
        <div className="mt-4 space-y-6">
            <Card title="🎣 High-Value Follow-up on LinkedIn" icon="💬">
                <p className="text-sm text-gray-600 mb-4">Use this template for high-value prospects who have gone silent after your initial attempts to get their email.</p>
                <DetailTemplate title="Follow-up Message (Day 7)" content={template} onCopy={() => handleCopy(template)} />
            </Card>
             <Card title="💡 Pro-Tips for this Stage" icon="🧠">
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                    <li><strong>Keep it Brief:</strong> This message should be short, friendly, and easy to read.</li>
                    <li><strong>Re-state Value:</strong> Briefly remind them of the core value proposition (Central Banks, BIS).</li>
                    <li><strong>Low-Pressure CTA:</strong> "Worth a quick chat?" is a soft call to action that's easy to respond to.</li>
                    <li><strong>Goal:</strong> The goal is simple: get a response and finally secure their email to move them to the main funnel.</li>
                </ul>
            </Card>
        </div>
    );
};


const MainPitchDetails = ({ showCopyNotification }: { showCopyNotification: (message?: string) => void }) => {
    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        showCopyNotification();
    };

    const pitchStructureContent = `🔸 AUTHORITY ESTABLISHMENT:
"I'm reaching out and building partnerships, which is why I wanted to share that I'm in charge of public relations for Blockchain Summit LATAM"

🔸 EVENT POSITIONING:
"We're hosting an event in Medellín, Colombia focused on regulators and central banks"

🔸 INSTITUTIONAL CREDIBILITY:
"We have confirmed Central Banks of Colombia, Brazil, Mexico, and Chile, with possible participation from Central Banks of Germany, Guatemala, and Dominican Republic"

🔸 CORPORATE SOCIAL PROOF:
"Additionally, we have major institutional players like BlackRock, JP Morgan Colombia, Bancolombia, and Banco Popular, among others."`;
    
    const referralBlurbContent = `// For the internal contact (e.g., Julián)
Hi Julián,

I'm connecting you with [CONTACT_NAME] from [COMPANY]. They are on the [COMMERCIAL_ROLE] front and are interested in the event's profile for this year. [COMPANY] is currently focused on [TOPIC_OF_INTEREST] and its [UNIQUE_BENEFIT].

// For the new lead (e.g., Gloria)
Hi [CONTACT_NAME],

As we discussed, I'm connecting you with Julián from the Blockchain Summit LATAM.

// Common closing for a group chat
Keeping the intro as simple as possible. Julián, over to you!`;

    const bdeVariations = {
        corporate: `🔸 AUTHORITY: I'm [YOUR_NAME], Business Development Executive at [YOUR_COMPANY]\n\n🔸 PARTNERSHIP ANGLE: We have a strategic alliance with Blockchain Summit LATAM 2024, the most important institutional blockchain event in the region\n\n🔸 EXCLUSIVE ACCESS: We've secured preferential access for our key partners to network with Central Banks of Colombia, Brazil, Mexico, and Chile\n\n🔸 CORPORATE VALIDATION: BlackRock, JP Morgan, and major financial institutions will be present\n\nThis could be a unique opportunity for [COMPANY_NAME] to establish direct relationships with regulators and blockchain ecosystem leaders in LATAM.`,
        startup: `🔸 INTRO: I'm [YOUR_NAME], I specialize in connecting innovative startups with international growth opportunities\n\n🔸 OPPORTUNITY: I'm curating an exclusive selection of companies for Blockchain Summit LATAM 2024 - imagine direct networking with 4+ Central Banks\n\n🔸 STARTUP FOCUS: This isn't another boring corporate event - it's where game-changing startups connect with the regulators who define the rules\n\n🔸 VALIDATION: BlackRock and JP Morgan already confirmed - this means the institutional ecosystem is paying serious attention\n\nIs [COMPANY_NAME] ready to be part of the conversation that's defining the future of blockchain in LATAM?`,
        financial: `🔸 CREDENTIALS: I'm reaching out from [YOUR_COMPANY] where I lead institutional relationships for the blockchain and fintech sector\n\n🔸 REGULATORY FOCUS: I have the privilege of coordinating financial institution participation in Blockchain Summit LATAM 2024\n\n🔸 CENTRAL BANK ACCESS: This event offers something unique: direct access to regulators from Colombia, Brazil, Mexico, and Chile in a structured networking format\n\n🔸 INSTITUTIONAL VALIDATION: The confirmation of BlackRock and JP Morgan Colombia validates the strategic importance of this gathering\n\nFor [COMPANY_NAME], this represents an exceptional opportunity to influence the emerging regulatory framework and establish key relationships in the LATAM market.`
    };

    const proTips = [
        { title: "Non-Negotiable Timing", text: "ALWAYS wait 2-3 minutes after the greeting. This is crucial for building rapport and showing respect. It's not optional." },
        { title: "The Winning Sequence", text: "The pitch structure (Authority -> Positioning -> Credibility -> Social Proof) is proven. Follow it exactly for maximum impact." },
        { title: "Adapt Your Angle", text: "Emphasize the LATAM focus for regional prospects, but highlight the international scope (e.g., German Central Bank) for global companies." },
        { title: "Adapt Your Authority", text: "If you're a BDE or agent, use the variations to establish your credibility. You're a strategic partner, not just a salesperson." },
        { title: "Always End with a Question", text: "Your message must end with a question (e.g., 'Would you be interested in learning more?'). This prompts a response and moves the conversation forward." }
    ];

    return (
        <div className="mt-4 space-y-6">
            <DetailTemplate 
                title="🎯 Complete Main Pitch Structure" 
                content={pitchStructureContent} 
                onCopy={() => handleCopy(pitchStructureContent)} 
            />
            <Card title="🔄 BDE Traditional Variations" icon="👔">
                <DetailTemplate title="💼 Corporate BDE Version" content={bdeVariations.corporate} onCopy={() => handleCopy(bdeVariations.corporate)} />
                <DetailTemplate title="🌟 Startup BDE Version" content={bdeVariations.startup} onCopy={() => handleCopy(bdeVariations.startup)} />
                <DetailTemplate title="🏦 Financial Services BDE" content={bdeVariations.financial} onCopy={() => handleCopy(bdeVariations.financial)} />
            </Card>
            <Card title="🤝 Referral / KOL Introduction Blurb" icon="🔗" className="bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-500">
                <DetailTemplate
                    title="Example Blurb for WhatsApp/Email"
                    content={referralBlurbContent}
                    onCopy={() => handleCopy(referralBlurbContent)}
                />
            </Card>
             <Card title="💡 Pro Tips for Main Pitch" icon="🧠" className="bg-gradient-to-br from-sky-50 to-blue-100 border-sky-500">
                <ul className="space-y-3">
                    {proTips.map((tip, index) => (
                        <li key={index}>
                            <strong className="text-gray-800">{tip.title}:</strong>
                            <span className="text-gray-700 ml-1">{tip.text}</span>
                        </li>
                    ))}
                </ul>
            </Card>
        </div>
    );
};

const SendOverviewEmailDetails = ({ showCopyNotification }: { showCopyNotification: (message?: string) => void }) => {
    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        showCopyNotification();
    };

    const emailTemplate = `Subject: Exclusive Blockchain Summit LATAM 2024 Partnership Opportunity

Hi [PROSPECT_NAME],

[Start with a personalized paragraph about the prospect and their company. Reference their background, recent achievements, or company initiatives. Show you've done your research. Use the Pro-Tips below for guidance.]

---

📌 **Why I'm Reaching Out**

We're building the most institutionally robust edition of the Summit to date. A key pillar is a series of regional activations across Latin America, designed to connect platforms like yours with influential audiences: fintech associations, business guilds, universities, legal and accounting firms, chambers of commerce, and regulators.

We are looking for:
• Direct Sponsors
• Strategic Referrals (Funds, Projects, Institutions)
• High-level Institutional or Technical Speakers
• Academic, Association, or Regulatory Allies

🔔 **Note:** Panel spaces are primarily reserved for paying sponsors or high-value profiles arriving through a co-sponsoring referral pipeline.

---

🧠 **Blockchain Summit LATAM 2024 – At a Glance**

• **📍 Medellín, Colombia**
• **📅 November 12, 13 & 14, 2024**
• **🎓 Academic Partner:** Universidad EAFIT (Top 3 in Colombia)
• **🏛️ Focus:** Regulation, central banks, financial infrastructure, tokenization, and institutional adoption.

---

✅ **Confirmed Participation**

• **Central Banks:** Colombia, Brazil, Mexico, Chile
• **International:** Bank for International Settlements (BIS) confirmed. In talks with Germany, Guatemala, and Dominican Republic.
• **Regulatory:** Colombian Financial Superintendence (SFC), Asobancaria
• **Institutional:** BlackRock, JP Morgan, Bancolombia, Banco Popular. In talks with VanEck.

---

🌐 **Distinguished Academics & International Delegations**

• **Juan Carlos Reyes** – President, National Digital Assets Commission (CNAD) of El Salvador
• **Prof. Alfredo Muñoz García** – Grant Thornton Europe / Complutense University of Madrid (Remote)
• **María del Sagrario Navarro** – University of Castilla-La Mancha, INATBA
• **Dr. Steffen Härting** – Deloitte Germany, Crypto Asset Markets
• **Ana Elisa de Iparraguirre** – Brickken / National University of Rosario
• **Carlos Salinas** – MoraBanc, Head of Digital Assets and Fintech
• **Sebastián Zapata Veira** – Externado University / Bitso
• **The Walker Group** – Ex-Citigroup executives

---

🗓️ **Thematic Structure by Day**

• **Day 1:** Total focus on regulators, central banks, and top traditional institutional actors.
• **Day 2:** Intersection between traditional finance (TradFi) and emerging technologies.
• **Day 3:** Full DeFi, community, protocols, and adoption.

---

🤝 **Regional Alliance Network**

We are working with a growing network of chambers to co-organize activations and build a regional Blockchain & Fintech Chamber.
• **Confirmed:** Blockchain Chamber of Chile, Paraguayan Blockchain Chamber, Blockchain Chamber of Guatemala, Asoblockchain Colombia.
• **In advanced talks with:** Fintech Chamber of Panama, Asoblockchain Peru, Blockchain Association of Bolivia, Fintech Chamber of Argentina.

---

🏆 **NEW FOR 2024: Regional Awards & Media Partnership**

• **Regional Awards:** Alongside our allied chambers, we will host the first regional awards ceremony. Example categories include:
  - 🏅 **With Blockchain Chambers:** Best CEX, Best Web3 Infrastructure, Best RWA Tokenization, Best DID Solution, Best Web3 Education Initiative, Web3 Startup of the Year.
  - 💳 **With Fintech Chambers:** Best Payments Fintech, Best Digital Onboarding/KYC, Best Retail Investment Platform, Best Fintech-Web3 Integration, Most Innovative Bank in Digital Assets.
• **Official Media Partner: Negocios TV**
We've partnered exclusively with Negocios TV, the first Spanish-language financial channel broadcasting live from the NYSE floor. With over 2 million users across Ibero-America, it has become one of the most influential voices in Spanish-speaking markets.
  • **📈 Global #1:** In February 2024, Negocios TV ranked #1 globally in YouTube views among financial media, surpassing CNN, Fox Business, and Bloomberg Markets.
  • **🔗 More Info:** [Link to Press/Info Page]

---

🌎 **Regional Activations – LATAM & Hash House Medellín**

In addition to the main event, we are developing pre-event activations in major cities (Bogotá, Lima, Santiago, San José, Buenos Aires) in partnership with local chambers, universities, and business associations.

**Activation Formats:**
• Tech meetups and platform showcases
• Panels with accounting, legal, notarial, registry, and economic guilds
• Networking rounds with chambers of commerce and business associations
• Sessions with RegTech, PayTech, and RWA leaders
• Meetings with foreign trade guilds, importers/exporters, and real estate associations
• Educational spaces with universities and technical training centers

In Medellín, these activities are developed in partnership with Hash House, the most active Web3 hub in the city.

---

🗓️ **Next Step**

Would you be open to a brief 15-30 minute discovery call to explore how [COMPANY_NAME] could get involved, either directly or through strategic referrals?

You can book a time that works for you directly here: [YOUR_BOOKING_LINK]

Thanks again for your time and for the leadership you've shown in [THEIR_INDUSTRY].

Best regards,

[YOUR_NAME]
[YOUR_TITLE]`;

    const proTips = [
        { title: "Research is Key", text: "Before sending, spend 5 minutes on the prospect's LinkedIn profile. Look at their 'About' section, recent posts, and past 3-4 job experiences." },
        { title: "Company Context", text: "Also, read the 'About' page of their current company to understand their mission and latest news." },
        { title: "Craft the Perfect Opening", text: "Use your research to write a unique, personalized opening paragraph. Compliment a recent project, mention a shared connection, or connect their work to the event's theme. This shows you're not just spamming." },
        { title: "Paste and Send", text: "Once you have your personalized opening, paste the rest of this standardized template below it." }
    ];

    return (
        <div className="mt-4 space-y-6">
            <DetailTemplate
                title="Comprehensive Overview Email Template"
                content={emailTemplate}
                onCopy={() => handleCopy(emailTemplate)}
            />
            <Card title="💡 Pro Tips for Personalization" icon="✍️" className="bg-gradient-to-br from-yellow-50 to-orange-50 border-brand-accent-yellow">
                 <ul className="space-y-3">
                    {proTips.map((tip, index) => (
                        <li key={index}>
                            <strong className="text-gray-800">{tip.title}:</strong>
                            <span className="text-gray-700 ml-1">{tip.text}</span>
                        </li>
                    ))}
                </ul>
            </Card>
        </div>
    );
};

const HighValueRescueDetails = ({ showCopyNotification }: { showCopyNotification: (message?: string) => void }) => {
    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        showCopyNotification();
    };

    const emailTemplate = `Subject: One last idea for [Prospect Company] & Blockchain Summit LATAM

Hi [PROSPECT_NAME],

I'm writing one last time before I close the file on my end. I’m convinced there's a powerful opportunity here and wanted to share one final, concrete thought.

[Insert your deep research here. Example: "I was reading your company's Q4 report where your CEO, [CEO_NAME], emphasized the strategic priority of expanding into new regulated markets. This aligns perfectly with what we are building."]

---

💡 **An Idea to Spark a Conversation...**

What if we built a high-profile panel specifically around [Prospect Company]'s interests?

For example, I just confirmed a powerhouse panel for our regulatory track featuring:
*   **Carlos Salinas** (Head of Digital Assets, MoraBanc Andorra)
*   **María del Sagrario Navarro** (LegalTech Expert, University of Castilla-La Mancha)
*   **Dr. Steffen Härting** (Senior Executive, Crypto Asset Markets at Deloitte)

They will be discussing "Regulatory entry requirements for the provision of crypto-asset services," with perspectives on:
*   Institutional frameworks and licensing regimes
*   Gaps and gray areas in MiCA
*   DeFi platforms and regulatory blind spots
*   Practical implementation from the banking sector

**The angle is: let's co-create a high-impact panel around a topic you're passionate about. You bring the vision, and I'll bring the high-level partners to make it happen.**

---

This is the level of conversation we're curating. Discussions with other key players in the [prospect's industry] sector are already advancing.

Is this a priority for you right now? If so, my calendar is open for a brief, direct conversation.

Best regards,

[YOUR_NAME]`;

    const proTips = [
        { title: "Exhaustive Research", text: "This isn't just a LinkedIn glance. Read their latest quarterly report, find press releases, or watch a recent interview with their CEO. Find a direct quote or a stated company goal to reference." },
        { title: "The Creative Proposal", text: "The custom panel idea is a 'pattern interrupt.' It shows you are a creator and a connector, not just a salesperson. It reframes the conversation from 'buying a sponsorship' to 'co-creating value'." },
        { title: "The Competitor Angle (FOMO)", text: "Subtly mentioning 'discussions with other key players in their industry' creates urgency and social proof. It implies the train is leaving the station, with or without them." },
        { title: "Top-Down Pressure", text: "By aligning your pitch with a publicly stated goal from their CEO or a quarterly report, you make it much harder for your contact to ignore. You're not just pitching an event; you're offering a solution to a company-wide priority." },
        { title: "The Power of Finality", text: "A confident 'willingness to walk away' (e.g., 'before I close the file') can often trigger a response from a prospect who has been procrastinating. It's a professional and respectful way to ask for a final decision." }
    ];

    return (
        <div className="mt-4 space-y-6">
            <DetailTemplate
                title="Assertive 'High-Value Rescue' Email Template"
                content={emailTemplate}
                onCopy={() => handleCopy(emailTemplate)}
            />
            <Card title="💡 Pro-Tips for Advanced Re-engagement" icon="🚀" className="bg-gradient-to-br from-red-50 to-orange-100 border-red-500">
                <ul className="space-y-3">
                    {proTips.map((tip, index) => (
                        <li key={index}>
                            <strong className="text-gray-800">{tip.title}:</strong>
                            <span className="text-gray-700 ml-1">{tip.text}</span>
                        </li>
                    ))}
                </ul>
            </Card>
        </div>
    );
};

const DiscoveryMeetingDetails = () => {
    const agenda = [
        "Event overview and vision (5 min)",
        "Deep dive into confirmed attendees and speakers (5 min)",
        "Understand prospect's strategic objectives & KPIs (10 min)"
    ];
    return (
        <div className="mt-4 space-y-4">
            <Card title="Meeting Agenda" icon="🗓️">
                <ul className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                    {agenda.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
            </Card>
            <Card title="💡 Key Objectives" icon="🎯">
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                    <li>Build rapport and establish trust.</li>
                    <li>Uncover the prospect's primary marketing/business goals for the next year.</li>
                    <li>Align the summit's value proposition (audience, access) with their goals.</li>
                    <li>Secure commitment for a follow-up meeting with BSL leadership to discuss sponsorship details.</li>
                </ul>
            </Card>
        </div>
    );
};

const SponsorshipProposalMeetingDetails = () => {
    const agenda = [
        "Recap of discovery call findings and agreed objectives (5 min)",
        "Presentation of 2-3 tailored sponsorship packages (10 min)",
        "Live demo of interactive Budget Calculator & scenario modeling (5 min)",
        "Discuss customization options and handle objections (5 min)",
        "Define clear next steps for contract review and signing (5 min)"
    ];
    const objectives = [
        "Present a compelling business case, not just a list of features.",
        "Clearly demonstrate how the sponsorship will solve their problems or help them reach their goals.",
        "Empower the client with a transparent, interactive tool to build their own package.",
        "Create a sense of partnership and collaboration.",
        "Gain commitment to move forward with a specific package or a final decision timeline."
    ];
    return (
        <div className="mt-4 space-y-4">
            <Card title="Meeting Agenda (30 min)" icon="📊">
                <ul className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                    {agenda.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
            </Card>
             <Card title="💡 Key Objectives" icon="🎯">
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                    {objectives.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
            </Card>
             <Card title="Sendable Asset: Interactive Budget Calculator" icon="🔗" className="bg-gradient-to-br from-green-50 to-teal-50 border-green-500">
                <p className="text-sm text-gray-700 mb-4">After the meeting, empower the prospect by sending them a link to the interactive calculator. This allows them to explore options independently and builds trust through transparency.</p>
                <a 
                    href="https://julianchuk.github.io/blockchain-summit-latam-2025-calculator" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block"
                >
                    <Button variant="success" icon={<span role="img" aria-label="calculator">🧮</span>}>
                        Open Calculator
                    </Button>
                </a>
            </Card>
        </div>
    );
};

const SendProposalEmailDetails = ({ showCopyNotification }: { showCopyNotification: (message?: string) => void }) => {
    const emailTemplate = `Subject: Following Up: Blockchain Summit LATAM 2024 Sponsorship Proposal for [Company Name]

Hi [Prospect Name],

It was a pleasure speaking with you today. I'm incredibly excited about the possibility of having [Company Name] join us as a key partner for the Blockchain Summit LATAM 2024.

As discussed, I've attached a formal proposal tailored to the objectives we covered, focusing on [mention 1-2 key objectives, e.g., 'connecting with regulatory leaders' or 'showcasing your new platform'].

Here are the resources for your review:
1.  **Tailored Proposal (PDF):** The formal document outlining the [Package Name] sponsorship.
2.  **Presentation Deck:** The complete overview of the summit we reviewed.
3.  **Interactive Budget Calculator:** [🧮 Explore with the Interactive Calculator](https://julianchuk.github.io/blockchain-summit-latam-2025-calculator)

Please note, the package and pricing in this proposal are valid for the next 14 days.

I believe the proposed package will deliver significant value and help you achieve your goals in the LATAM market. Let me know if you have any questions.

Best regards,

[Your Name]`;

    const handleCopy = () => {
        navigator.clipboard.writeText(emailTemplate);
        showCopyNotification();
    };

    return (
        <div className="mt-4 space-y-6">
            <Card title="✉️ Post-Meeting Proposal Procedure" icon="🚀">
                <p className="text-sm text-gray-600">This is a critical touchpoint to maintain momentum. Send this email within 24 hours of the proposal meeting.</p>
            </Card>
            <DetailTemplate title="Email Template" content={emailTemplate} onCopy={handleCopy} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card title="✅ Checklist" icon="📋">
                    <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                        <li><strong>Personalized Subject Line:</strong> Include the prospect's company name.</li>
                        <li><strong>Tailored Proposal PDF:</strong> A formal document with the agreed-upon package.</li>
                        <li><strong>Presentation Deck:</strong> The full deck for their reference.</li>
                        <li><strong>Calculator Link:</strong> Empower them to explore further.</li>
                         <li><strong>State Offer Validity:</strong> Clearly mention the 14-day validity period.</li>
                    </ul>
                </Card>
                <Card title="💡 Pro-Tips" icon="🧠">
                     <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                        <li><strong>Speed is Key:</strong> Send within a few hours if possible, while the conversation is fresh.</li>
                        <li><strong>Recap & Reinforce:</strong> Briefly mention a key point from your conversation to show you were listening.</li>
                        <li><strong>Make it Easy:</strong> Attach everything clearly. Don't make them hunt for information.</li>
                        <li><strong>Set the Clock:</strong> The 14-day validity creates a natural, non-pushy reason for your future follow-ups.</li>
                    </ul>
                </Card>
            </div>
        </div>
    );
};

const ConfirmProposalSentDetails = ({ showCopyNotification }: { showCopyNotification: (message?: string) => void }) => {
    const template = "Hi [NAME], just sent over the formal proposal to your email as discussed. It includes the tailored deck and the interactive calculator link. Let me know if you have any questions once you've had a look!";
    const handleCopy = () => {
        navigator.clipboard.writeText(template);
        showCopyNotification();
    };

    return (
        <div className="mt-4 space-y-6">
            <DetailTemplate title="Proposal Confirmation Message" content={template} onCopy={handleCopy} />
            <Card title="💡 Pro-Tips for Proposal Confirmation" icon="🧠" className="bg-gradient-to-br from-indigo-50 to-purple-50 border-brand-secondary">
                <ul className="space-y-2 text-sm text-gray-700">
                    <li><strong>Bridge the Channels:</strong> This action connects your formal email channel with your informal chat channel, creating a unified communication front.</li>
                    <li><strong>Increase Open Rates:</strong> Prompting them in chat dramatically increases the likelihood they will find and open your proposal email promptly.</li>
                    <li><strong>Reinforce Professionalism:</strong> It shows exceptional organization and follow-through, reinforcing that you are a reliable partner.</li>
                    <li><strong>Open a Low-Friction Feedback Loop:</strong> Asking for "any questions" in chat can elicit quick, informal feedback that might not come via email.</li>
                </ul>
            </Card>
        </div>
    );
};

const ConfirmNudgeSentDetails = ({ showCopyNotification }: { showCopyNotification: (message?: string) => void }) => {
    const template = "Hi [NAME], I just sent you a follow-up email with some resources to help with the proposal review. Let me know if they're helpful!";
    const handleCopy = () => {
        navigator.clipboard.writeText(template);
        showCopyNotification();
    };

    return (
        <div className="mt-4 space-y-6">
            <DetailTemplate title="Gentle Nudge Follow-up Confirmation" content={template} onCopy={handleCopy} />
            <Card title="💡 Pro-Tips for this Loop" icon="🧠" className="bg-gradient-to-br from-indigo-50 to-purple-50 border-brand-secondary">
                <ul className="space-y-2 text-sm text-gray-700">
                    <li><strong>Reinforce Your Role:</strong> This message reinforces you as a proactive ally, not just a salesperson.</li>
                    <li><strong>Drive Email Views:</strong> Like other loop-closing messages, this significantly increases the chances your email gets read.</li>
                    <li><strong>Keep it Brief & Casual:</strong> The tone should be helpful and light, consistent with the 'gentle nudge' email.</li>
                </ul>
            </Card>
        </div>
    );
};

const ConfirmEarlyBirdSentDetails = ({ showCopyNotification }: { showCopyNotification: (message?: string) => void }) => {
    const template = "Hi [NAME], just sent you an email with a special 20% early bird discount. Hope this helps get things over the line!";
    const handleCopy = () => {
        navigator.clipboard.writeText(template);
        showCopyNotification();
    };

    return (
        <div className="mt-4 space-y-6">
            <DetailTemplate title="Early Bird Offer Confirmation" content={template} onCopy={handleCopy} />
            <Card title="💡 Pro-Tips for this Loop" icon="🧠" className="bg-gradient-to-br from-indigo-50 to-purple-50 border-brand-secondary">
                <ul className="space-y-2 text-sm text-gray-700">
                    <li><strong>Reinforce Value:</strong> This loop highlights a direct financial incentive, making it a powerful nudge.</li>
                    <li><strong>Drive Urgency:</strong> It reminds them that the offer is available and prompts them to act on the email.</li>
                    <li><strong>Maintain Positive Momentum:</strong> The tone is helpful and positive, framing the discount as a gesture of goodwill.</li>
                </ul>
            </Card>
        </div>
    );
};


const AdvancedFollowupSequenceDetails = ({ selectedId, showCopyNotification }: { selectedId: number | null; showCopyNotification: (message?: string) => void; }) => {
    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        showCopyNotification();
    };

    const followups = {
        gentleNudge: {
            title: "Follow-up #1: The Gentle Nudge (Blocker Removal) (+3 days)",
            template: `Subject: A proactive hand with the [Company Name] proposal

Hi [Prospect Name],

I'm writing to you with one goal: to offer my proactive help and ensure the proposal I sent is a solution for you, not a burden.

At this stage, I find the two most common hurdles are (1) clarifying the final budget, and (2) summarizing the opportunity for internal discussion. I've prepared something to help with both:

1.  **For Budget Questions:** Here is the transparent cost calculator we discussed.
    [🛠️ Explore scenarios with our Interactive Calculator](https://julianchuk.github.io/blockchain-summit-latam-2025-calculator)

2.  **For Internal Sharing:** Here is a one-paragraph summary you can copy-paste to your team.
    > The Blockchain Summit LATAM 2025 offers a unique opportunity for [Company Name] to secure a leadership position in the region's institutional crypto landscape. The proposal focuses on a [Package Name] sponsorship, providing direct access to key regulators, central banks (like BIS, Brazil, Mexico), and major financial players (like BlackRock, JP Morgan), ensuring high-impact visibility and strategic networking.

Let me know if these tools are helpful, or if there are any other specific hurdles where I can lend a hand.

Best regards,
[Your Name]`,
            proTips: [
                "<strong>Address Two Blockers:</strong> Proactively solve the two most common problems: cost uncertainty and the burden of internal reporting.",
                "<strong>Provide Concrete Tools:</strong> Don't just offer help, deliver it. The calculator link and the copy-pasteable summary are tangible assets that save your prospect time.",
                "<strong>Be a Partner, Not a Pitcher:</strong> This approach transforms you from a salesperson asking for a decision into a strategic partner helping to facilitate one.",
                "<strong>Open the Door for Other Issues:</strong> The final question acknowledges that these might not be the only blockers and invites a candid, collaborative conversation."
            ]
        },
        categoryScarcity: {
            title: "Follow-up #2: Category Scarcity (+7 days)",
            template: `Subject: Checking in on [Category, e.g., 'Fintech Payments'] Sponsorship

Hi [Prospect Name],

Following up on our discussion about the [Specific Category, e.g., 'Fintech Payments'] sponsorship track.

I'm reaching out today as a professional courtesy. We're in the final stages of confirming partners for this category and have another company expressing strong interest. Since we've already invested time in tailoring a proposal for you, I wanted to give you the first right of refusal before we move forward with other conversations.

Are you in a position to make a decision this week?

Best regards,
[Your Name]`,
            proTips: [
                "<strong>Be Specific & Honest:</strong> Only use this if it's true. Mentioning a specific, relevant category makes the scarcity genuine and targeted.",
                "<strong>Frame as a Courtesy:</strong> Phrasing it as a 'professional courtesy' or 'first right of refusal' is diplomatic and respectful, not aggressive.",
                "<strong>Create a Soft Deadline:</strong> Asking if they can make a decision 'this week' creates urgency without being ultimatum-like."
            ]
        },
        earlyBirdOffer: {
            title: "Follow-up #3: Early Bird Offer (+12 days)",
            template: `Subject: A little something to help with your decision

Hi [Prospect Name],

Hope you've had a good week.

We're very keen on having [Company Name] on board, and I wanted to offer a special incentive to help with your decision-making process.

For the next 15 days, we'd be happy to extend a 20% Early Bird discount on the final package price. This is a limited-time offer we reserve for high-potential partners we'd love to work with.

You can use the interactive calculator to see how the discount impacts the total: [🧮 Model your savings with the Interactive Calculator](https://julianchuk.github.io/blockchain-summit-latam-2025-calculator)

Let me know if this helps get things over the line!

Best regards,
[Your Name]`,
            proTips: [
                "<strong>Create Real Value:</strong> This isn't just a reminder; it's a tangible incentive. A 20% discount is a powerful motivator.",
                "<strong>Set a Clear Deadline:</strong> The 15-day validity period creates a clear and reasonable sense of urgency.",
                "<strong>Frame as an Exclusive Bonus:</strong> Position the discount as something special for 'high-potential partners.' This makes the prospect feel valued, not just pressured.",
                "<strong>Empower with Tools:</strong> Including the calculator link helps them visualize the value and play with scenarios, increasing engagement."
            ]
        },
        finalCall: {
            title: "Follow-up #4: The Final Call & Pivot (+15 days)",
            template: `Subject: Final thoughts on Blockchain Summit LATAM partnership

Hi [Prospect Name],

I'm writing one last time as we're closing the books on the partnership opportunity we discussed, as the offer period has now concluded.

While that specific package might no longer be available, I still believe there's a strong alignment and wanted to propose one final, creative idea.

What if we co-hosted an exclusive, invitation-only 'Regulator Roundtable' for a small group of your top clients during the summit? This would be a high-impact, low-effort way for [Company Name] to facilitate key conversations, positioning you as a thought leader.

Is this alternative something you'd be open to exploring? If not, I'll assume the timing isn't right and will close the file on my end.

Either way, thank you for your time and consideration.

Best,
[Your Name]`,
            proTips: [
                "<strong>Signal Finality:</strong> Using phrases like 'writing one last time' and 'close the file' clearly communicates that this is the last attempt, which can prompt a response from a procrastinating prospect.",
                "<strong>The Pivot is Key:</strong> Don't just say 'it's your last chance.' Pivoting to a new, creative, and exclusive offer shows you're a valuable partner who thinks outside the box.",
                "<strong>Maintain the Relationship:</strong> The tone remains positive and professional. You're leaving the door open for future collaboration, even if this specific opportunity doesn't work out."
            ]
        }
    };

    const FollowupDetailCard = ({ id, details }: { id: number; details: any }) => (
         <Card 
            title={details.title} 
            icon={id === 15 ? '🤝' : id === 17 ? '⏳' : id === 18 ? '🎉' : '🚀'} 
            className={`transition-all duration-500 ${selectedId === id ? 'border-brand-accent-green shadow-xl scale-105' : 'opacity-70'}`}
        >
            <DetailTemplate title="Email Template" content={details.template} onCopy={() => handleCopy(details.template)} />
            <Card title="💡 Pro-Tips" icon="🧠">
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                    {details.proTips.map((tip: string, index: number) => <li key={index} dangerouslySetInnerHTML={{ __html: tip }}></li>)}
                </ul>
            </Card>
        </Card>
    );

    return (
        <div className="mt-4 space-y-8">
            <FollowupDetailCard id={15} details={followups.gentleNudge} />
            <FollowupDetailCard id={17} details={followups.categoryScarcity} />
            <FollowupDetailCard id={18} details={followups.earlyBirdOffer} />
            <FollowupDetailCard id={20} details={followups.finalCall} />
        </div>
    );
};

type PointWithCoords = JourneyTouchpoint & { y?: number };

export const CustomerJourneyTab = ({ showCopyNotification }: { showCopyNotification: (message?: string) => void }) => {
    const [selectedPoint, setSelectedPoint] = useState<PointWithCoords | null>(null);
    const [animationIndex, setAnimationIndex] = useState(-1);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const animationTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

    const waveData = useMemo(() => {
        const height = 450;
        const centerY = height / 2 + 40;
        const amplitude = 60;
        
        const loopHeight = 120;
        const loopWidth = 80;
        const loopOverhang = 60;

        const pointsWithCoords: PointWithCoords[] = JSON.parse(JSON.stringify(touchpoints));

        const find = (id: number): PointWithCoords | undefined => pointsWithCoords.find(p => p.id === id);
        
        const getPathSegment = (start: PointWithCoords, end: PointWithCoords) => {
            const dx = (end.x - start.x) / 2;
            const cp1x = start.x + dx;
            const cp1y = start.y!;
            const cp2x = end.x - dx;
            const cp2y = end.y!;
            return ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${end.x},${end.y}`;
        };

        pointsWithCoords.forEach(point => {
            if (point.mood === 'loop' || point.mood === 'side-quest') return;

            let y = centerY;
            switch(point.mood) {
                case 'peak': y = centerY - amplitude; break;
                case 'positive': y = centerY - amplitude * 0.6; break;
                case 'positive-alt': y = centerY - amplitude * 0.4; break;
                case 'neutral': y = centerY; break;
                case 'urgent': y = centerY + amplitude * 0.5; break;
                default: y = centerY;
            }

            if (point.id === 13) y -= amplitude * 0.5;
            
            point.y = y;
        });

        const mainPathPoints = pointsWithCoords.filter(p => p.mood !== 'loop' && p.mood !== 'side-quest');
        
        // Side quest path layout
        const p3 = find(3);
        const p4 = find(4);
        const p8 = find(8);
        const p22 = find(22);
        if (p3?.y && p8 && p22) {
            // Vertically position the side-quest points in a valley
            p8.y = p3.y + amplitude * 2.5; 
            // **THE FIX**: Stagger the second point vertically to prevent text overlap
            p22.y = p8.y + 20; 
        }

        const findMain = (id: number) => mainPathPoints.find(p => p.id === id);
        const p13 = findMain(13);
        const p15 = findMain(15);
         if (p13?.y && p15) {
             p15.y = p13.y + amplitude * 0.2
        }

        const loopMappings = [
            { loopId: 5, baseId: 4 },
            { loopId: 7, baseId: 6 },
            { loopId: 14, baseId: 13 },
            { loopId: 16, baseId: 15 },
            { loopId: 19, baseId: 18 }
        ];

        const createRollercoasterLoopPath = (base: PointWithCoords, nextBasePoint: PointWithCoords) => {
            if (!base?.y || !nextBasePoint?.y) return '';
            const start = { x: base.x, y: base.y };

            const endX = base.x + loopWidth;
            const dx = nextBasePoint.x - base.x;
            const dy = nextBasePoint.y - base.y;
            const endY = dx === 0 ? base.y : base.y + (dy / dx) * (endX - base.x);
            const end = { x: endX, y: endY };
            
            const cp1 = { x: start.x + loopWidth + loopOverhang, y: start.y - loopHeight };
            const cp2 = { x: end.x - loopWidth - loopOverhang, y: end.y - loopHeight };
            
            return `M ${start.x},${start.y} C ${cp1.x},${cp1.y} ${cp2.x},${cp2.y} ${end.x},${end.y}`;
        };

        const loopPaths = loopMappings.map(({ loopId, baseId }) => {
            const base = find(baseId);
            const loopPoint = find(loopId);
            
            const mainPathBaseIndex = mainPathPoints.findIndex(p => p.id === baseId);
            const nextBasePoint = mainPathBaseIndex !== -1 && mainPathBaseIndex < mainPathPoints.length - 1 
                ? mainPathPoints[mainPathBaseIndex + 1] 
                : null;

            if (!base || !loopPoint || !nextBasePoint) {
                return '';
            }

            if (!base.y || !nextBasePoint.y) return '';

            const endX = base.x + loopWidth;
            const dx = nextBasePoint.x - base.x;
            const dy = nextBasePoint.y - base.y;
            const endY = dx === 0 ? base.y : base.y + (dy / dx) * (endX - base.x);
            const midBaseY = (base.y + endY) / 2;

            loopPoint.x = base.x + loopWidth / 2;
            loopPoint.y = midBaseY - loopHeight * 0.75;
            
            return createRollercoasterLoopPath(base, nextBasePoint);
        });

        let mainPath = `M 0,${centerY} L ${mainPathPoints[0].x},${mainPathPoints[0].y!}`;
        for (let i = 0; i < mainPathPoints.length - 1; i++) {
             mainPath += getPathSegment(mainPathPoints[i], mainPathPoints[i+1]);
        }
        
        let sideQuestPathDown = '';
        let sideQuestPathMiddle = '';
        let sideQuestPathUp = '';

        if(p3?.x && p3.y && p8?.x && p8.y && p22?.x && p22.y && p4?.x && p4.y) {
            // New logic using SVG Arc for a smooth, U-shaped elliptical curve.
            const rxDown = Math.abs(p8.x - p3.x);
            const ryDown = Math.abs(p8.y - p3.y);
            sideQuestPathDown = `M ${p3.x},${p3.y} A ${rxDown} ${ryDown} 0 0 0 ${p8.x},${p8.y}`;

            sideQuestPathMiddle = `M ${p8.x},${p8.y} L ${p22.x},${p22.y}`;

            const rxUp = Math.abs(p4.x - p22.x);
            const ryUp = Math.abs(p4.y - p22.y);
            sideQuestPathUp = `M ${p22.x},${p22.y} A ${rxUp} ${ryUp} 0 0 1 ${p4.x},${p4.y}`;
        }


        return { pointsWithCoords, mainPath, sideQuestPathDown, sideQuestPathMiddle, sideQuestPathUp, loopPaths, viewBoxHeight: height, totalWidth: 2200 };
    }, []);
    
    const handlePointClick = useCallback((point: PointWithCoords) => {
        setSelectedPoint(point);
    }, []);

    const handleReset = useCallback(() => {
        animationTimers.current.forEach(clearTimeout);
        animationTimers.current = [];
        setSelectedPoint(null);
        setAnimationIndex(-1);
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        }
    }, []);

    const handleAnimate = useCallback(() => {
        if (animationTimers.current.length > 0) {
            handleReset();
            return;
        }

        const animationTouchpoints = animationOrder
            .map(id => waveData.pointsWithCoords.find(p => p.id === id))
            .filter((p): p is PointWithCoords => !!p);

        const timers: ReturnType<typeof setTimeout>[] = [];
        animationTouchpoints.forEach((point, index) => {
            const timerId = setTimeout(() => {
                setAnimationIndex(index);
                setSelectedPoint(point);
                
                if (scrollContainerRef.current) {
                    const container = scrollContainerRef.current;
                    const scrollPosition = point.x - (container.clientWidth / 2);
                    container.scrollTo({
                        left: scrollPosition,
                        behavior: 'smooth'
                    });
                }
            }, index * 800);
            timers.push(timerId);
        });
        
        const finalTimerId = setTimeout(() => {
            setAnimationIndex(-1);
            animationTimers.current = []; // Clear timers when done
        }, animationTouchpoints.length * 800);
        timers.push(finalTimerId);
        
        animationTimers.current = timers;
    }, [handleReset, waveData.pointsWithCoords]);


    const renderDetails = (point: PointWithCoords | null) => {
         if (!point) {
            return (
                <div>
                    <h4 className="font-bold text-lg text-brand-primary-dark">📍 Touchpoint Details</h4>
                    <p className="text-gray-600 mt-2">Click on any point in the wave to see detailed information about that stage of the customer journey.</p>
                </div>
            );
        }
        
        let specificContent;
        switch(point.id) {
            case 1:
                specificContent = <InitialGreetingDetails showCopyNotification={showCopyNotification} />;
                break;
            case 2:
                specificContent = <MainPitchDetails showCopyNotification={showCopyNotification} />;
                break;
            case 3:
                specificContent = <ResponseQualificationDetails />;
                break;
            case 8:
                specificContent = <LinkedInEmailAskDetails showCopyNotification={showCopyNotification} />;
                break;
            case 22:
                 specificContent = <LinkedInFollowupDetails showCopyNotification={showCopyNotification} />;
                 break;
            case 4:
                specificContent = <SendOverviewEmailDetails showCopyNotification={showCopyNotification} />;
                break;
            case 5:
                specificContent = <ConfirmEmailSentDetails showCopyNotification={showCopyNotification} />;
                break;
            case 6:
                specificContent = <DayFourFollowupDetails showCopyNotification={showCopyNotification} />;
                break;
            case 7:
                specificContent = <ConfirmFollowupSentDetails showCopyNotification={showCopyNotification} />;
                break;
            case 9:
                specificContent = <HighValueRescueDetails showCopyNotification={showCopyNotification} />;
                break;
            case 11:
                specificContent = <DiscoveryMeetingDetails />;
                break;
            case 12:
                specificContent = <SponsorshipProposalMeetingDetails />;
                break;
            case 13:
                specificContent = <SendProposalEmailDetails showCopyNotification={showCopyNotification} />;
                break;
            case 14:
                specificContent = <ConfirmProposalSentDetails showCopyNotification={showCopyNotification} />;
                break;
            case 15:
            case 17:
            case 18:
            case 20:
                specificContent = <AdvancedFollowupSequenceDetails selectedId={point.id} showCopyNotification={showCopyNotification} />;
                break;
            case 16:
                specificContent = <ConfirmNudgeSentDetails showCopyNotification={showCopyNotification} />;
                break;
            case 19:
                specificContent = <ConfirmEarlyBirdSentDetails showCopyNotification={showCopyNotification} />;
                break;
            case 10:
            case 21:
                 specificContent = <DetailTemplate title="Details" content={point.description} onCopy={() => { navigator.clipboard.writeText(point.description); showCopyNotification(); }} preformatted={false}/>
                 break;
            default:
                specificContent = <DetailTemplate title="Example Message" content={"Template coming soon..."} />
                break;
        }
        
        return (
            <div>
                <h4 className="font-bold text-lg text-brand-primary-dark flex items-center gap-2">📍 {point.name} <span className="text-sm font-normal text-gray-500">- {point.timing}</span></h4>
                <p className="text-gray-600 mt-2"><strong>Objective:</strong> {point.description}</p>
                {specificContent}
            </div>
        );
    };
    
    return (
        <div className="space-y-8">
            <Card title="Customer Journey Wave" icon="🌊">
                <p>This interactive journey map shows the natural flow of prospect engagement over time. Each touchpoint represents a carefully timed interaction designed to build trust and move toward conversion.</p>
                <p className="mt-2"><strong>Key Feature:</strong> The journey now includes a <Highlight>dedicated path for LinkedIn email resistance</Highlight>, showing how to persist and bring hesitant prospects into the main funnel.</p>
            </Card>

            <Card ref={scrollContainerRef} className="p-2 sm:p-4 overflow-x-auto">
                 <svg id="journeyWave" width={waveData.totalWidth} height={waveData.viewBoxHeight} viewBox={`0 0 ${waveData.totalWidth} ${waveData.viewBoxHeight}`} className={`min-w-[${waveData.totalWidth}px]`}>
                     <defs>
                        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#667eea" />
                            <stop offset="50%" stopColor="#2a5298" />
                            <stop offset="100%" stopColor="#764ba2" />
                        </linearGradient>
                         <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="8" refY="3.5" orient="auto" fill="#0077b5">
                            <polygon points="0 0, 10 3.5, 0 7" />
                        </marker>
                    </defs>
                    
                    <path d={waveData.mainPath} fill="none" stroke="url(#waveGradient)" strokeWidth="4" />
                    
                    <path d={waveData.sideQuestPathDown} fill="none" stroke="#2a5298" strokeWidth="3" strokeDasharray="5, 5" />
                    <path d={waveData.sideQuestPathMiddle} fill="none" stroke="#2a5298" strokeWidth="3" strokeDasharray="5, 5" />
                    <path d={waveData.sideQuestPathUp} fill="none" stroke="#2a5298" strokeWidth="3" strokeDasharray="5, 5" />

                    {waveData.loopPaths.map((path, index) => (
                        <path key={index} d={path} fill="none" stroke="#764ba2" strokeWidth="3" strokeDasharray="4, 4" />
                    ))}

                     {waveData.pointsWithCoords.map((p) => {
                         const isSelected = selectedPoint?.id === p.id;
                         const isAnimating = animationIndex !== -1 && animationOrder[animationIndex] === p.id;
                         const isLoopPoint = p.mood === 'loop';
                         const isSideQuestPoint = p.mood === 'side-quest';

                         return (
                            <g key={p.id} className="cursor-pointer" onClick={() => handlePointClick(p)}>
                                <circle 
                                    cx={p.x} 
                                    cy={p.y} 
                                    r={isAnimating ? 14 : (isSelected ? 12 : 8)}
                                    className={`stroke-white transition-all duration-300 ${isSelected ? 'fill-brand-accent-green' : isLoopPoint ? 'fill-brand-secondary' : isSideQuestPoint ? 'fill-blue-400' : 'fill-brand-primary'}`}
                                    strokeWidth={isAnimating || isSelected ? 4 : 3}
                                />
                                <text x={p.x} y={isLoopPoint ? p.y! - 15 : p.y! - 20} textAnchor="middle" className="text-xs font-semibold fill-gray-700 pointer-events-none">{p.name}</text>
                                <text x={p.x} y={p.y! + 25} textAnchor="middle" className="text-[10px] fill-gray-500 pointer-events-none">{p.timing}</text>
                            </g>
                         );
                     })}
                </svg>
            </Card>

            <div className="flex justify-center gap-4">
                <Button onClick={handleAnimate} variant="success">▶️ Animate Journey</Button>
                <Button onClick={handleReset} variant="warning">🔄 Reset</Button>
            </div>

            <Card className={`transition-all duration-300 ${selectedPoint ? 'bg-gradient-to-br from-indigo-50 to-purple-50 border-brand-secondary' : ''}`}>
                {renderDetails(selectedPoint)}
            </Card>
        </div>
    );
};
