

import React from 'react';
import { Card, Highlight } from './common/Card';
import type { Prospect } from '../types';
import { statusDefinitions } from '../data/statusDefinitions';

// Card for Revenue and Projections
const GoalCard = ({ value, title, description }: { value: string, title: string, description: string }) => (
    <div className="bg-gradient-to-br from-brand-primary to-brand-primary-dark rounded-xl p-8 text-center text-white shadow-2xl h-full flex flex-col justify-center">
        <div className="text-lg font-semibold tracking-wider uppercase">{title}</div>
        <div className="text-6xl font-extrabold my-2">{value}</div>
        <div className="text-md opacity-90">{description}</div>
    </div>
);

// Card for individual funnel stages
const FunnelStage = ({ value, label, conversion, icon, isLast = false }: { value: string, label: string, conversion?: string, icon: string, isLast?: boolean }) => (
    <div className="flex-1 flex flex-col items-center text-center px-2">
        <div className="bg-white rounded-full h-20 w-20 flex items-center justify-center text-3xl shadow-md border-4 border-slate-200">
            {icon}
        </div>
        <div className="mt-3">
            <div className="text-3xl font-bold text-brand-primary-dark">{value}</div>
            <div className="text-gray-600 font-semibold">{label}</div>
        </div>
        {conversion && (
            <div className="mt-2 bg-slate-200 text-slate-700 text-xs font-bold px-3 py-1 rounded-full">
                {conversion}
            </div>
        )}
    </div>
);

// Arrow between funnel stages
const FunnelArrow = () => (
    <div className="flex-shrink-0 self-center text-3xl text-slate-300 mx-1 hidden md:block">
        &rarr;
    </div>
);

// Card for individual activity metrics
const ActivityMetricCard = ({ value, label }: { value: string, label: string }) => (
    <div className="bg-white rounded-lg p-4 text-center shadow-sm border-t-4 border-brand-primary">
        <div className="text-3xl font-bold text-brand-primary-dark">{value}</div>
        <div className="text-gray-500 font-medium mt-1">{label}</div>
    </div>
);

// Visual funnel pyramid
const FunnelVisualization = ({ data }) => {
    const colors = [
        'from-indigo-500 to-indigo-400',
        'from-sky-600 to-sky-500',
        'from-cyan-500 to-cyan-400',
        'from-teal-500 to-teal-400',
        'from-green-500 to-green-400',
    ];
    const widths = [100, 80, 60, 45, 30];

    return (
        <div className="flex flex-col items-center justify-center py-4 space-y-0">
            {data.map((stage, index) => (
                 <div
                    key={stage.label}
                    className={`bg-gradient-to-r ${colors[index % colors.length]} w-full flex flex-col items-center justify-center text-white text-center p-3 shadow-md first:rounded-t-lg last:rounded-b-lg`}
                    style={{ 
                        maxWidth: `${widths[index % widths.length]}%`, // Added modulo for safety
                        minHeight: '60px',
                        ...(index > 0 && { marginTop: '-1px' })
                     }}
                >
                    <span className="font-bold">{stage.label}</span>
                    <span className="text-xl font-extrabold">{stage.value}</span>
                </div>
            ))}
        </div>
    );
};

// Card for highlighting key conversion rates
const ConversionRateCard = ({ value, title, description, icon }: { value: string, title: string, description: string, icon: string }) => (
    <div className="bg-gradient-to-br from-green-50 to-teal-100 rounded-xl p-6 text-center shadow-lg border-l-4 border-brand-accent-green flex flex-col items-center justify-center h-full">
        <div className="text-4xl mb-2 text-gray-600">{icon}</div>
        <div className="text-5xl font-extrabold text-brand-accent-green">{value}</div>
        <div className="text-lg font-bold text-gray-800 mt-2">{title}</div>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
    </div>
);


export const OverviewTab = ({ prospects }: { prospects: Prospect[] }) => {
    
    const totalRevenue = prospects
        .filter(p => p.status === 'deal-closed')
        .reduce((sum, p) => sum + p.dealValue, 0);

    const dealCount = prospects.filter(p => p.status === 'deal-closed').length;

    const pipelineValue = prospects
      .filter(p => p.status !== 'deal-closed' && p.status !== 'deal-lost')
      .reduce((sum, p) => sum + p.dealValue, 0);

    const getCountByStatus = (status: Prospect['status']) => prospects.filter(p => p.status === status).length;
    
    const getCountByGroup = (group: string) => {
        const statusesInGroup = statusDefinitions.filter(s => s.group === group).map(s => s.value);
        return prospects.filter(p => statusesInGroup.includes(p.status)).length;
    };
    
    // NEW: Hardcoded campaign data based on user input, reflecting a multi-step funnel
    const campaignData = {
        linkedinMessages: 450,
        emailsSent: 244,
        discoveryCalls: 37,
    };
    
    const linkedinToEmailRate = campaignData.linkedinMessages > 0 ? ((campaignData.emailsSent / campaignData.linkedinMessages) * 100).toFixed(2) + '%' : 'N/A';
    const emailToCallRate = campaignData.emailsSent > 0 ? ((campaignData.discoveryCalls / campaignData.emailsSent) * 100).toFixed(2) + '%' : 'N/A';
    const linkedInToCallRate = campaignData.linkedinMessages > 0 ? ((campaignData.discoveryCalls / campaignData.linkedinMessages) * 100).toFixed(2) + '%' : 'N/A';
    
    const campaignActivityData = [
        { value: `~${campaignData.linkedinMessages}`, label: 'LinkedIn Messages' },
        { value: campaignData.emailsSent.toString(), label: 'Emails Obtained' },
        { value: campaignData.discoveryCalls.toString(), label: 'Discovery Calls' },
        { value: linkedInToCallRate, label: 'Overall Conversion (LI → Call)' },
    ];


    const funnelCounts = {
        'prospecting': getCountByGroup('Prospecting'),
        'follow-up': getCountByGroup('Post-Overview') + getCountByGroup('Meeting Funnel') + getCountByGroup('Post-Proposal'),
        're-engagement': getCountByGroup('Re-engagement'),
        'closed': getCountByStatus('deal-closed'),
    };
    
    const totalActiveProspects = funnelCounts['prospecting'] + funnelCounts['follow-up'] + funnelCounts['re-engagement'];

    const funnelData = [
        { value: funnelCounts['prospecting'].toString(), label: 'Prospecting', icon: '💬' },
        { value: funnelCounts['follow-up'].toString(), label: 'Follow-up Funnel', icon: '🤝' },
        { value: funnelCounts['re-engagement'].toString(), label: 'Re-engagement', icon: '🎣' },
        { value: funnelCounts['closed'].toString(), label: 'Deals Closed', icon: '✅', isLast: true },
    ];

    // **THE FIX**: New data source for the funnel visualization based on hardcoded campaign numbers.
    const campaignFunnelData = [
        { label: 'LinkedIn Messages', value: `~${campaignData.linkedinMessages}` },
        { label: 'Emails Obtained', value: `${campaignData.emailsSent}` },
        { label: 'Discovery Calls Booked', value: `${campaignData.discoveryCalls}` },
    ];

    const activityData = [
        { value: prospects.length.toString(), label: 'Total Prospects' },
        { value: totalActiveProspects.toString(), label: 'Active Pipeline' },
        { value: dealCount.toString(), label: 'Deals Closed' },
        { value: getCountByStatus('deal-lost').toString(), label: 'Deals Lost' },
        { value: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(pipelineValue), label: 'Pipeline Value' },
        { value: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(totalRevenue / (dealCount || 1)), label: 'Avg. Deal Size' },
    ];
    
    return (
        <div className="space-y-8">
            <Card title="Live Sales Dashboard" icon="🎯">
                <p>This dashboard shows our <Highlight>live progress</Highlight> for the Blockchain Summit LATAM 2025 campaign, powered directly by the prospects you manage in the 'Prospects' tab. All data updates in real-time.</p>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <GoalCard 
                    title="Sponsorship Revenue"
                    value={new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(totalRevenue)}
                    description={`Goal: $500,000 | ${dealCount} deals closed`}
                />
                 <GoalCard 
                    title="Active Pipeline Value"
                    value={new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(pipelineValue)}
                    description={`${totalActiveProspects} active prospects`}
                />
            </div>
            
            <Card title="Campaign Performance (Since May 10, 2025)" icon="🚀">
                 <p className="mb-6 text-center text-gray-600">A snapshot of our top-of-funnel outreach efforts and their effectiveness based on real-world data.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {campaignActivityData.map(item => (
                        <ActivityMetricCard key={item.label} {...item} />
                    ))}
                </div>
            </Card>

            <Card title="Live Sales Funnel (Managed Prospects)" icon="📊" className="bg-gradient-to-br from-slate-50 to-gray-100">
                <p className="mb-8 text-center text-gray-600">A simplified overview of your pipeline, from initial contact to closed deals, based on prospects managed in this tool.</p>
                <div className="flex flex-col md:flex-row items-stretch justify-center space-y-8 md:space-y-0 md:space-x-2">
                    {funnelData.map((stage, index) => (
                        <React.Fragment key={stage.label}>
                            <FunnelStage {...stage} />
                            {!stage.isLast && <FunnelArrow />}
                        </React.Fragment>
                    ))}
                </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card title="🏆 Top of Funnel Conversion" icon="📈">
                    <p className="mb-6 text-center text-gray-600">These metrics show the effectiveness of our initial outreach based on your provided data.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <ConversionRateCard 
                            value={linkedinToEmailRate}
                            icon="💬 → 📧"
                            title="LinkedIn Message → Email"
                            description={`From ~${campaignData.linkedinMessages} LinkedIn messages, ${campaignData.emailsSent} email addresses were obtained.`}
                        />
                        <ConversionRateCard 
                            value={emailToCallRate}
                            icon="📧 → 📞"
                            title="Email Sent → Discovery Call"
                            description={`From ${campaignData.emailsSent} emails sent, ${campaignData.discoveryCalls} discovery calls were booked.`}
                        />
                    </div>
                </Card>

                <Card title="Funnel Visualization (Top of Funnel)" icon="🎨">
                     <p className="mb-4 text-center text-gray-600">A visual representation of the initial outreach campaign's conversion flow.</p>
                     <FunnelVisualization data={campaignFunnelData} />
                </Card>
            </div>

             <Card title="Activity Highlights (Managed Prospects)" icon="📋" className="bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-500">
                <p className="mb-6 text-center text-gray-600">Key performance indicators from your live prospect data within this tool.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {activityData.map(item => (
                        <ActivityMetricCard key={item.label} {...item} />
                    ))}
                </div>
            </Card>

        </div>
    );
};