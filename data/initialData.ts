import type { Prospect } from '../types';

export const initialProspects: Prospect[] = [
  {
    id: 'elena-vasquez-model',
    name: 'Elena Vasquez',
    company: 'Nexus Capital',
    position: 'Lead Analyst, Digital Assets',
    email: 'elena.v@nexuscap.com',
    platform: 'linkedin',
    status: 'deal-closed',
    dealValue: 60000,
    isHighValue: true,
    history: [
      { id: 'ev-hist-1', timestamp: '2024-06-01T10:00:00Z', type: 'note', content: 'Prospect identified. Strong fit for our institutional track.', statusAtTheTime: 'initial-contact' },
      { id: 'ev-hist-2', timestamp: '2024-06-01T10:30:00Z', type: 'chat', content: 'Yo: Hola Elena, un gusto saludarte!\n\n[Wait 2-3 minutes after they reply to your greeting]\n\nYo: Te comento que estoy a cargo de las relaciones públicas del Blockchain Summit LATAM...', statusAtTheTime: 'initial-contact' },
      { id: 'ev-hist-3', timestamp: '2024-06-01T10:35:00Z', type: 'chat', content: 'Elena: Hola Julián, gracias. Sí, lo tengo en el radar. ¿Qué oportunidades tienen?', statusAtTheTime: 'initial-contact' },
      { id: 'ev-hist-4', timestamp: '2024-06-01T10:36:00Z', type: 'statusChange', content: 'Status changed to Qualification / Email Ask', statusAtTheTime: 'initial-contact' },
      { id: 'ev-hist-5', timestamp: '2024-06-01T10:40:00Z', type: 'chat', content: 'Yo: Claro! Para enviarte el detalle completo de los paquetes y los speakers confirmados, ¿me podrías facilitar tu email? Así te envío el overview completo.', statusAtTheTime: 'qualification' },
      { id: 'ev-hist-6', timestamp: '2024-06-02T11:00:00Z', type: 'email', content: 'Sent the comprehensive overview email to elena.v@nexuscap.com.', statusAtTheTime: 'qualification' },
      { id: 'ev-hist-7', timestamp: '2024-06-02T11:01:00Z', type: 'statusChange', content: 'Status changed to Overview Email Sent', statusAtTheTime: 'qualification' },
      { id: 'ev-hist-8', timestamp: '2024-06-07T15:00:00Z', type: 'call', content: 'Held discovery call. Confirmed their main goal is networking with regulators. Booked proposal meeting.', statusAtTheTime: 'overview-email-sent' },
      { id: 'ev-hist-9', timestamp: '2024-06-07T15:01:00Z', type: 'statusChange', content: 'Status changed to Discovery Meeting Held', statusAtTheTime: 'overview-email-sent' },
      { id: 'ev-hist-10', timestamp: '2024-06-10T11:00:00Z', type: 'call', content: 'Presented the "Gold Partner" package. They were impressed with the institutional access. Sent proposal email right after.', statusAtTheTime: 'discovery-meeting-held' },
      { id: 'ev-hist-11', timestamp: '2024-06-10T11:30:00Z', type: 'statusChange', content: 'Status changed to Proposal Email Sent', statusAtTheTime: 'proposal-meeting-held' },
      { id: 'ev-hist-12', timestamp: '2024-06-14T10:00:00Z', type: 'email', content: 'Sent gentle nudge follow-up with the one-pager summary for their internal team.', statusAtTheTime: 'proposal-email-sent' },
      { id: 'ev-hist-13', timestamp: '2024-06-14T10:01:00Z', type: 'statusChange', content: 'Status changed to Follow-up: Gentle Nudge', statusAtTheTime: 'proposal-email-sent' },
      { id: 'ev-hist-14', timestamp: '2024-06-20T16:00:00Z', type: 'chat', content: 'Elena: Hola Julián, gracias por el seguimiento. Lo estamos revisando internamente, te aviso en breve.', statusAtTheTime: 'follow-up-gentle-nudge' },
      { id: 'ev-hist-15', timestamp: '2024-06-28T12:00:00Z', type: 'note', content: 'Contract signed! They are confirmed as Gold Sponsor.', statusAtTheTime: 'follow-up-gentle-nudge' },
      { id: 'ev-hist-16', timestamp: '2024-06-28T12:01:00Z', type: 'statusChange', content: 'Status changed to Deal Closed', statusAtTheTime: 'follow-up-gentle-nudge' },
    ],
    headline: 'Lead Analyst, Digital Assets | Institutional Crypto | Market Research',
    about: 'Experienced analyst focused on the impact of digital assets on traditional financial markets. My goal is to bridge the gap between innovation and institutional adoption.',
    experience: 'Lead Analyst at Nexus Capital (2019-Present). Previously at a major investment bank covering technology stocks.',
    companyOverview: 'Nexus Capital is a research-driven investment firm with a strong focus on emerging technologies, including blockchain and digital assets.',
    companyWebsite: 'https://nexuscap.com'
  },
  {
    id: 'sofia-chen-model',
    name: 'Sofia Chen',
    company: 'Global Fintech Innovations',
    position: 'VP of Strategy',
    email: 'sofia.c@gfi.com',
    platform: 'linkedin',
    status: 'proposal-email-sent',
    dealValue: 75000,
    isHighValue: true,
    history: [
      { id: 'hist-1', timestamp: '2024-07-10T10:00:00Z', type: 'chat', content: 'Initial outreach on LinkedIn, she responded positively.', statusAtTheTime: 'initial-contact' },
      { id: 'hist-2', timestamp: '2024-07-10T10:05:00Z', type: 'statusChange', content: "Status changed to Qualification / Email Ask", statusAtTheTime: 'initial-contact' },
      { id: 'hist-3', timestamp: '2024-07-11T14:20:00Z', type: 'email', content: 'Sent the overview email after she provided her address.', statusAtTheTime: 'qualification' },
      { id: 'hist-4', timestamp: '2024-07-11T14:21:00Z', type: 'statusChange', content: "Status changed to Overview Email Sent", statusAtTheTime: 'qualification' },
      { id: 'hist-5', timestamp: '2024-07-15T09:00:00Z', type: 'call', content: 'Held discovery call. Great interest in the regulatory track and connecting with BIS.', statusAtTheTime: 'overview-email-sent' },
      { id: 'hist-6', timestamp: '2024-07-15T09:30:00Z', type: 'statusChange', content: "Status changed to Discovery Meeting Held", statusAtTheTime: 'overview-email-sent' },
       { id: 'hist-7', timestamp: '2024-07-18T11:00:00Z', type: 'email', content: 'Presented the formal sponsorship proposal via email and a brief follow-up call.', statusAtTheTime: 'discovery-meeting-held' },
       { id: 'hist-8', timestamp: '2024-07-18T11:05:00Z', type: 'statusChange', content: "Status changed to Proposal Email Sent", statusAtTheTime: 'proposal-meeting-held' }
    ],
    headline: 'VP of Strategy | Fintech | Blockchain | Digital Transformation',
    about: 'Driving strategic initiatives at the intersection of finance and technology. Passionate about leveraging blockchain for global impact.',
    experience: 'VP of Strategy at Global Fintech Innovations (2020-Present)',
    companyOverview: 'Global Fintech Innovations is a leader in developing next-generation financial solutions, focusing on cross-border payments and digital assets.',
    companyWebsite: 'https://gfi.com'
  },
  {
    id: '1',
    name: 'Agustina Ramos',
    company: 'Binance',
    position: 'LATAM Growth Director',
    email: 'agustina.r@binance.com',
    platform: 'email',
    status: 'follow-up-gentle-nudge',
    dealValue: 50000,
    isHighValue: true,
    history: [
      { id: 'hist-ag-1', timestamp: '2024-07-15T12:00:00Z', type: 'note', content: `Prospect created from AI Parser.`, statusAtTheTime: 'proposal-email-sent'},
    ],
    headline: 'Driving growth for the world\'s leading blockchain ecosystem.',
    about: 'Passionate about financial inclusion and bringing the power of crypto to Latin America. Focused on strategic partnerships and community building.',
    experience: 'LATAM Growth Director at Binance (2022-Present), previously Head of Marketing at a major fintech.',
    companyOverview: 'Binance is the world’s leading blockchain ecosystem and cryptocurrency infrastructure provider with a financial product suite that includes the largest digital asset exchange by volume.',
    companyWebsite: 'https://www.binance.com'
  },
  {
    id: '2',
    name: 'Carlos Fernandez',
    company: 'Bitso',
    position: 'Head of Partnerships',
    email: 'c.fernandez@bitso.com',
    platform: 'linkedin',
    status: 'qualification',
    dealValue: 25000,
    isHighValue: true,
    history: [
       { id: 'hist-cf-1', timestamp: '2024-07-20T11:00:00Z', type: 'chat', content: 'Initial connection on LinkedIn, showed interest in the event and asked for more details about sponsorship.', statusAtTheTime: 'initial-contact'},
       { id: 'hist-cf-2', timestamp: '2024-07-20T11:01:00Z', type: 'note', content: 'Seems very interested in the regulatory track and networking with Central Banks.', statusAtTheTime: 'initial-contact'}
    ],
    headline: 'Building bridges in the LATAM crypto space.',
    about: 'Focused on creating strategic alliances that drive the adoption of crypto-based financial services in Latin America.',
    experience: 'Head of Partnerships at Bitso (2021-Present)',
    companyOverview: 'Bitso is a leading Latin American crypto platform with a mission to make crypto useful.',
    companyWebsite: 'https://bitso.com/'
  },
   {
    id: 'jonathan-mondragon',
    name: 'Jonathan Mondragon',
    company: 'VirtuaBroker',
    position: 'Chief Revenue Officer (CRO)',
    email: 'j.mondragon@virtuabroker.com',
    platform: 'linkedin',
    status: 'initial-contact',
    dealValue: 75000,
    isHighValue: true,
    history: [
      { id: 'hist-jm-1', timestamp: '2024-08-02T10:00:00Z', type: 'note', content: 'High-value target. Focus on their cross-border payment disruption angle.', statusAtTheTime: 'initial-contact'}
    ],
    headline: 'CRO at Virtuabroker | Cross-Border Payments | FX | Fintech Innovation | Blockchain | Sales Leadership | Growth | Revenue Generation | Scale | Disruption',
    about: "As Chief Revenue Officer at Virtuabroker, I’m passionate about driving growth and innovation in the fintech industry. Together with an incredible technical team, we leverage blockchain to revolutionize cross-border payments and foreign exchange (FX) solutions. I lead revenue-focused initiatives that scale the business while transforming the way global transactions are conducted.\n\nMy expertise lies in developing strategic sales frameworks, optimizing pricing models, and forging strong partnerships to expand into new markets. I thrive in fast-paced environments, aligning sales and marketing efforts to deliver impactful results and ensure client satisfaction and retention. With a data-driven approach and cutting-edge technology, I help shape the future of global payments, helping in the disruption of traditional financial ecosystems.",
    experience: "Chief Revenue Officer (CRO) at Virtuabroker (Sep 2024 - Present)\nCEO & founder at Mondragon Enterprises SL. (Sep 2020 - Present)\nCeo founder at La comunidad del Ladrillo (Jun 2021 - May 2022)\nJefe de servicios comerciales at Orange España (Jul 2016 - Jun 2020)\ncomercial at Vodafone (Mar 2016 - Jul 2016)",
    companyOverview: "At VirtuaBroker, we provide next-generation payment infrastructure that enables businesses to move money across borders instantly, securely, and at a fraction of the cost — powered by blockchain technology and stablecoins. We offer an alternative to the traditional SWIFT system, delivering cross-border transactions that are as seamless as local bank transfers. Our API-first platform allows fintechs, PSPs, remittance providers, and enterprises to simplify their global payment operations without the need for costly infrastructure or long development cycles.",
    companyWebsite: 'https://virtuabroker.com'
  },
  {
    id: '3',
    name: 'Maria Rodriguez',
    company: 'Mercado Libre',
    position: 'Fintech Innovation Lead',
    email: 'maria.r@mercadolibre.com',
    platform: 'email',
    status: 'deal-closed',
    dealValue: 35000,
    isHighValue: false,
    history: [
      {id: 'hist-mr-1', timestamp: '2024-07-10T15:00:00Z', type: 'note', content: 'Final contract signed for a "Fintech Innovation Partner" package. Onboarding process started. They are excited to co-host a workshop.', statusAtTheTime: 'follow-up-final-call'}
    ],
    headline: '', about: '', experience: '', companyOverview: '', companyWebsite: ''
  },
  {
    id: '4',
    name: 'Juan Perez',
    company: 'Local Startup',
    position: 'CEO',
    email: 'juan.p@localstartup.com',
    platform: 'twitter',
    status: 'high-value-rescue-1',
    dealValue: 10000,
    isHighValue: true,
    history: [
      { id: 'hist-jp-1', timestamp: '2024-06-25T18:00:00Z', type: 'chat', content: 'Had a good initial call, sent the proposal, but went silent after that.', statusAtTheTime: 'email-content-followup'},
      { id: 'hist-jp-2', timestamp: '2024-06-25T18:01:00Z', type: 'note', content: 'They have a limited budget but are very innovative.', statusAtTheTime: 'email-content-followup'}
    ],
    headline: '', about: '', experience: '', companyOverview: '', companyWebsite: ''
  },
  {
    id: '5',
    name: 'Isabella Navarro',
    company: 'LegalChain',
    position: 'Partner',
    email: 'isabella.n@legalchain.io',
    platform: 'linkedin',
    status: 'discovery-meeting-held',
    dealValue: 25000,
    isHighValue: true,
    history: [
       { id: 'hist-in-1', timestamp: '2024-08-01T16:00:00Z', type: 'call', content: 'Discovery call held. They are very interested in the regulatory track and the panel on MiCA.', statusAtTheTime: 'email-content-followup'}
    ],
    headline: 'Legal Expert in Blockchain and Digital Assets',
    about: 'Specializing in the legal frameworks for tokenization and DeFi.',
    experience: 'Partner at LegalChain (2019-Present)',
    companyOverview: 'LegalChain provides expert legal counsel for the blockchain industry.',
    companyWebsite: 'https://legalchain.io'
  },
  {
    id: '6',
    name: 'David Kim',
    company: 'CryptoVentures Fund',
    position: 'Managing Partner',
    email: 'david.k@cryptoventures.vc',
    platform: 'email',
    status: 'proposal-email-sent',
    dealValue: 100000,
    isHighValue: true,
    history: [
       { id: 'hist-dk-1', timestamp: '2024-07-28T12:00:00Z', type: 'email', content: 'Sent tailored proposal for "Venture Partner" package.', statusAtTheTime: 'proposal-meeting-held'}
    ],
    headline: 'Investing in the future of decentralized finance.',
    about: '', experience: '', companyOverview: '', companyWebsite: ''
  },
  {
    id: '7',
    name: 'Laura Gomez',
    company: 'Tech Unida',
    position: 'Community Manager',
    email: 'laura.g@techunida.org',
    platform: 'linkedin',
    status: 'deal-lost',
    dealValue: 5000,
    isHighValue: false,
    history: [
      { id: 'hist-lg-1', timestamp: '2024-07-29T14:00:00Z', type: 'chat', content: 'Followed up multiple times. They have decided to allocate their budget elsewhere for Q4. Marked as Deal Lost.', statusAtTheTime: 'follow-up-final-call'}
    ],
    headline: '', about: '', experience: '', companyOverview: '', companyWebsite: ''
  }
];