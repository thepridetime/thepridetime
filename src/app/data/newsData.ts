export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  category: string;
  subcategory?: string;
  image: string;
  date: string;
  readTime: string;
  featured?: boolean;
  breaking?: boolean;
  tags: string[];
  region: string;
}

export const articles: Article[] = [
  // TECHNOLOGY
  {
    id: "1",
    title: "Global AI Alliance Forms as Tech Giants Unite to Shape Digital Intelligence Standards",
    excerpt: "A landmark coalition of 47 technology companies across 18 nations announced the formation of the Global Digital Intelligence Standards Board, setting the stage for unified AI governance frameworks in 2026.",
    content: "In an unprecedented move, technology leaders from Silicon Valley to Singapore have joined forces to establish a comprehensive framework for artificial intelligence governance. The alliance aims to create interoperable standards that will accelerate responsible AI adoption across enterprise environments worldwide.",
    author: "Alexandra Chen",
    authorRole: "Senior Technology Correspondent",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1768224656445-33d078c250b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwZGlnaXRhbCUyMG5ldHdvcmslMjBkYXRhfGVufDF8fHx8MTc3MjYyMTI5MnwO&ixlib=rb-4.1.0&q=80&w=1080",
    date: "March 4, 2026",
    readTime: "6 min read",
    featured: true,
    breaking: true,
    tags: ["AI Governance", "Global Standards", "Digital Intelligence"],
    region: "Global"
  },
  {
    id: "2",
    title: "Enterprise AI Spending to Exceed $2.4 Trillion Globally by 2027, Alphaburg Report Analysis Reveals",
    excerpt: "Alphaburg Report's annual enterprise technology forecast projects unprecedented investment growth across all sectors, driven by generative AI adoption and autonomous systems deployment across Fortune 500 companies.",
    content: "The Alphaburg Report Intelligence Research Division has released its highly anticipated annual technology investment report projecting that enterprise AI spending will surpass the $2.4 trillion mark by 2027.",
    author: "James Thornton",
    authorRole: "Chief Technology Analyst",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1758520144750-dd3cbde6a689?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbG9iYWwlMjB0ZWNobm9sb2d5JTIwYnVzaW5lc3MlMjBlbnRlcnByaXNlfGVufDF8fHx8MTc3MjYyMTI5MHww&ixlib=rb-4.1.0&q=80&w=1080",
    date: "February 28, 2026",
    readTime: "9 min read",
    tags: ["Enterprise AI", "Investment", "Market Forecast"],
    region: "Global"
  },
  {
    id: "3",
    title: "Hyperscale Cloud Wars Intensify as AWS, Azure and Google Battle for $800B Market",
    excerpt: "The three cloud titans are in an arms race to deploy next-gen AI infrastructure, with capital expenditure reaching record levels as enterprise demand for intelligent compute surges globally.",
    content: "Amazon Web Services, Microsoft Azure, and Google Cloud are collectively investing over $400 billion in infrastructure upgrades in 2026 as enterprise demand for AI-optimized compute capacity reaches unprecedented levels.",
    author: "Michael Torres",
    authorRole: "Cloud & Infrastructure Reporter",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1506399558188-acca6f8cbf41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwY2VudGVyJTIwY2xvdWQlMjBjb21wdXRpbmclMjBzZXJ2ZXIlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc3MjYyNjU1MXww&ixlib=rb-4.1.0&q=80&w=1080",
    date: "March 3, 2026",
    readTime: "7 min read",
    tags: ["Cloud Computing", "AWS", "Azure", "Google Cloud"],
    region: "Global"
  },
  {
    id: "4",
    title: "Quantum Internet Backbone Goes Live Across North American Corridor",
    excerpt: "The first commercial quantum communication network spanning 4,800 km between New York, Chicago, and Los Angeles achieves operational status, offering unprecedented secure data transmission.",
    content: "A historic milestone in communications technology was achieved today as the first commercial quantum internet backbone spanning North America's major financial and technology hubs went fully operational.",
    author: "Dr. Priya Sharma",
    authorRole: "Emerging Technology Editor",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwZGlnaXRhbCUyMHByb3RlY3Rpb24lMjBlbnRlcnByaXNlfGVufDF8fHx8MTc3MjYyMTI5OXww&ixlib=rb-4.1.0&q=80&w=1080",
    date: "March 1, 2026",
    readTime: "8 min read",
    breaking: true,
    tags: ["Quantum Internet", "Communications", "Security"],
    region: "North America"
  },

  // FINANCE
  {
    id: "5",
    title: "Federal Reserve Signals Rate Adjustments Amid Digital Currency Expansion",
    excerpt: "Central banks across G20 nations are recalibrating monetary policy as CBDC adoption accelerates, with the Fed's latest report projecting a 34% rise in digital transaction volumes.",
    content: "The Federal Reserve released a comprehensive monetary policy report today indicating significant shifts in interest rate strategy as central bank digital currencies gain mainstream adoption.",
    author: "Marcus Webb",
    authorRole: "Global Finance Editor",
    category: "Finance",
    image: "https://images.unsplash.com/photo-1761233138981-50a88922c852?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNlJTIwc3RvY2slMjBtYXJrZXQlMjBnbG9iYWwlMjBlY29ub215fGVufDF8fHx8MTc3MjYyMTI5NXww&ixlib=rb-4.1.0&q=80&w=1080",
    date: "March 4, 2026",
    readTime: "5 min read",
    featured: true,
    tags: ["Federal Reserve", "Digital Currency", "Monetary Policy"],
    region: "North America"
  },
  {
    id: "6",
    title: "Global Investment Banks Launch Unified AI Trading Platform Across 40 Exchanges",
    excerpt: "A consortium of the world's 12 largest investment banks has deployed a shared AI trading intelligence layer capable of analyzing 14 million data points per second across global markets.",
    content: "The world's largest investment banks have quietly assembled one of the most ambitious technology projects in financial history—a unified AI trading intelligence platform that spans 40 major exchanges.",
    author: "Sophie Laurent",
    authorRole: "Capital Markets Correspondent",
    category: "Finance",
    image: "https://images.unsplash.com/photo-1642775196125-38a9eb496568?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdG9jayUyMG1hcmtldCUyMHRyYWRpbmclMjBmbG9vciUyMGRpZ2l0YWwlMjBzY3JlZW5zfGVufDF8fHx8MTc3MjYyNjU0OHww&ixlib=rb-4.1.0&q=80&w=1080",
    date: "March 3, 2026",
    readTime: "6 min read",
    tags: ["Investment Banking", "AI Trading", "Capital Markets"],
    region: "Global"
  },
  {
    id: "7",
    title: "Decentralized Finance Volume Surpasses Traditional Banking for First Time in History",
    excerpt: "DeFi platforms record $8.7 trillion in monthly transaction volume in February 2026, surpassing the aggregate volume of traditional retail banking for the first time ever.",
    content: "In a landmark shift for global finance, decentralized finance platforms have collectively processed more transaction volume than traditional retail banking networks for the first time.",
    author: "David Kim",
    authorRole: "Digital Finance Reporter",
    category: "Finance",
    image: "https://images.unsplash.com/photo-1744473119469-905016183836?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcnlwdG9jdXJyZW5jeSUyMGJsb2NrY2hhaW4lMjBkaWdpdGFsJTIwZmluYW5jZXxlbnwxfHx8fDE3NzI2MjM4ODB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    date: "March 2, 2026",
    readTime: "7 min read",
    breaking: true,
    tags: ["DeFi", "Blockchain", "Banking Disruption"],
    region: "Global"
  },

  // CYBERSECURITY
  {
    id: "8",
    title: "Next-Generation Quantum Encryption Breaks Ground for Enterprise Security",
    excerpt: "A breakthrough in post-quantum cryptography by researchers at MIT and CERN is set to redefine enterprise cybersecurity, offering protection against threats not yet conceived.",
    content: "Researchers have unveiled a revolutionary quantum encryption system that promises to secure enterprise networks against next-generation cyber threats including adversarial AI and quantum decryption attacks.",
    author: "Dr. Sarah Okonkwo",
    authorRole: "Cybersecurity Analyst",
    category: "Cybersecurity",
    image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwZGlnaXRhbCUyMHByb3RlY3Rpb24lMjBlbnRlcnByaXNlfGVufDF8fHx8MTc3MjYyMTI5OXww&ixlib=rb-4.1.0&q=80&w=1080",
    date: "March 3, 2026",
    readTime: "7 min read",
    breaking: true,
    tags: ["Quantum Computing", "Encryption", "Enterprise Security"],
    region: "Europe"
  },
  {
    id: "9",
    title: "Global Cybersecurity Treaty Signed by 140 Nations at UN Emergency Summit",
    excerpt: "After three years of negotiations, the landmark Geneva Digital Security Convention establishes binding cyber warfare rules, mandatory breach reporting, and cross-border incident response protocols.",
    content: "In a historic diplomatic achievement, 140 nations signed the Geneva Digital Security Convention at an emergency UN summit, creating the world's first binding international framework for cybersecurity governance.",
    author: "Francesca Morel",
    authorRole: "International Affairs Editor",
    category: "Cybersecurity",
    image: "https://images.unsplash.com/photo-1768224656445-33d078c250b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwZGlnaXRhbCUyMG5ldHdvcmslMjBkYXRhfGVufDF8fHx8MTc3MjYyMTI5MnwO&ixlib=rb-4.1.0&q=80&w=1080",
    date: "March 2, 2026",
    readTime: "8 min read",
    tags: ["Cyber Treaty", "International Law", "UN"],
    region: "Global"
  },

  // ENERGY
  {
    id: "10",
    title: "Renewable Energy Grid Connects 200 Nations in Historic Climate Accord Implementation",
    excerpt: "The International Energy Consortium's Smart Grid Initiative reaches full operational capacity, linking renewable energy sources across six continents in real-time digital orchestration.",
    content: "A historic milestone in global energy cooperation was reached today as the International Energy Consortium announced that its Smart Grid Initiative had achieved full operational capacity connecting renewable energy sources across 200 nations.",
    author: "Ravi Nair",
    authorRole: "Energy & Sustainability Reporter",
    category: "Energy",
    image: "https://images.unsplash.com/photo-1769501378353-2e4e3e3e325c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmVyZ3klMjByZW5ld2FibGUlMjB0ZWNobm9sb2d5JTIwaW5kdXN0cnl8ZW58MXx8fHwxNzcyNjIxMjk5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    date: "March 3, 2026",
    readTime: "8 min read",
    tags: ["Renewable Energy", "Climate", "Smart Grid"],
    region: "Global"
  },
  {
    id: "11",
    title: "OPEC+ Announces Digital Energy Trading Platform to Revolutionize Oil Markets",
    excerpt: "The 23-member OPEC+ coalition unveiled a blockchain-powered energy trading platform that will replace legacy spot market infrastructure, enabling real-time settlement across 87 currencies.",
    content: "OPEC+ made a landmark announcement today unveiling a next-generation digital energy trading platform built on enterprise blockchain infrastructure that will fundamentally reshape how crude oil and natural gas are traded globally.",
    author: "Ahmad Al-Mansouri",
    authorRole: "Energy Markets Editor",
    category: "Energy",
    image: "https://images.unsplash.com/photo-1694039446022-2d227e8b104b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvaWwlMjBnYXMlMjBlbmVyZ3klMjBjb21tb2RpdGllcyUyMGluZHVzdHJ5fGVufDF8fHx8MTc3MjYyNjU1MHww&ixlib=rb-4.1.0&q=80&w=1080",
    date: "March 4, 2026",
    readTime: "6 min read",
    breaking: true,
    tags: ["OPEC", "Energy Trading", "Blockchain"],
    region: "Middle East"
  },
  {
    id: "12",
    title: "Fusion Energy Startup Achieves Commercial Net-Positive Output for 72 Consecutive Hours",
    excerpt: "Helion Energy's Polaris reactor maintains sustained commercial-scale fusion output for 72 hours, a world record that signals the imminent arrival of fusion power for the electrical grid.",
    content: "A major milestone in fusion energy development was announced as Helion Energy reported that its Polaris fusion reactor had maintained net-positive energy output for 72 consecutive hours at commercial scale.",
    author: "Dr. Wei Zhang",
    authorRole: "Clean Energy Correspondent",
    category: "Energy",
    image: "https://images.unsplash.com/photo-1769501378353-2e4e3e3e325c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmVyZ3klMjByZW5ld2FibGUlMjB0ZWNobm9sb2d5JTIwaW5kdXN0cnl8ZW58MXx8fHwxNzcyNjIxMjk5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    date: "March 1, 2026",
    readTime: "9 min read",
    tags: ["Fusion Energy", "Clean Power", "Innovation"],
    region: "North America"
  },

  // HEALTHCARE
  {
    id: "13",
    title: "AI-Driven Diagnostics Platform Receives Approval in 28 Countries Simultaneously",
    excerpt: "MedIntel's neural diagnostic system, capable of detecting over 1,200 conditions with 99.3% accuracy, gains regulatory clearance across major healthcare markets in a single coordinated announcement.",
    content: "A groundbreaking AI diagnostic platform developed by MedIntel Corporation has received simultaneous regulatory approval across 28 countries in what regulators describe as an unprecedented coordinated approval process.",
    author: "Dr. Elena Vasquez",
    authorRole: "Healthcare & Life Sciences Editor",
    category: "Healthcare",
    image: "https://images.unsplash.com/photo-1758691463203-cce9d415b2b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwaW5ub3ZhdGlvbiUyMG1lZGljYWwlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc3MjU4MTg2OHww&ixlib=rb-4.1.0&q=80&w=1080",
    date: "March 2, 2026",
    readTime: "6 min read",
    tags: ["AI Diagnostics", "Healthcare Regulation", "MedTech"],
    region: "Global"
  },
  {
    id: "14",
    title: "Global Pharmaceutical Giants Form $340B Digital Health Consortium",
    excerpt: "Pfizer, Roche, AstraZeneca, and 14 other major pharmaceutical companies announced a joint investment in a unified digital health infrastructure to accelerate drug discovery and personalized medicine.",
    content: "The world's largest pharmaceutical companies have joined forces in an unprecedented $340 billion commitment to build a shared digital health infrastructure that will transform drug discovery, clinical trials, and personalized medicine delivery.",
    author: "Catherine Walsh",
    authorRole: "Pharma Industry Reporter",
    category: "Healthcare",
    image: "https://images.unsplash.com/photo-1758691463203-cce9d415b2b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwaW5ub3ZhdGlvbiUyMG1lZGljYWwlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc3MjU4MTg2OHww&ixlib=rb-4.1.0&q=80&w=1080",
    date: "March 4, 2026",
    readTime: "7 min read",
    tags: ["Pharma", "Digital Health", "Drug Discovery"],
    region: "Global"
  },

  // MANUFACTURING
  {
    id: "15",
    title: "Autonomous Manufacturing Hubs Redefine Industrial Output Across Asia-Pacific",
    excerpt: "Fully automated smart factories across South Korea, Japan, and Taiwan report 400% productivity increases while reducing carbon footprint by 67% through intelligent process orchestration.",
    content: "The Asia-Pacific manufacturing sector is experiencing a seismic transformation as autonomous production hubs come online across the region's industrial heartland.",
    author: "Jin-Ho Park",
    authorRole: "Industrial Technology Correspondent",
    category: "Manufacturing",
    image: "https://images.unsplash.com/photo-1761195696590-3490ea770aa1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW51ZmFjdHVyaW5nJTIwYXV0b21hdGlvbiUyMHJvYm90aWNzJTIwZmFjdG9yeXxlbnwxfHx8fDE3NzI2MjEzMDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    date: "March 2, 2026",
    readTime: "5 min read",
    tags: ["Automation", "Smart Manufacturing", "Industry 5.0"],
    region: "Asia-Pacific"
  },
  {
    id: "16",
    title: "Industry 5.0 Framework Adopted by G7 Nations as New Manufacturing Standard",
    excerpt: "The G7 industrial ministers formally endorsed the Industry 5.0 framework, mandating human-AI collaborative manufacturing standards across all member nation industrial sectors by 2028.",
    content: "In a landmark policy decision, G7 industrial ministers formally adopted the Industry 5.0 framework as the new global standard for advanced manufacturing, requiring member nations to implement human-AI collaborative production systems.",
    author: "Heinrich Mueller",
    authorRole: "Industrial Policy Correspondent",
    category: "Manufacturing",
    image: "https://images.unsplash.com/photo-1761195696590-3490ea770aa1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW51ZmFjdHVyaW5nJTIwYXV0b21hdGlvbiUyMHJvYm90aWNzJTIwZmFjdG9yeXxlbnwxfHx8fDE3NzI2MjEzMDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    date: "February 28, 2026",
    readTime: "6 min read",
    tags: ["Industry 5.0", "G7", "Manufacturing Policy"],
    region: "Europe"
  },

  // SMART CITIES
  {
    id: "17",
    title: "Digital Twin Cities Initiative Transforms Urban Planning in 50 Metropolises",
    excerpt: "The UN Smart Cities Program reports that real-time digital twin technology is cutting urban operational costs by 42% while improving citizen services quality scores by 78%.",
    content: "Urban centers across the globe are undergoing a fundamental transformation through the implementation of digital twin technology that creates perfect virtual replicas of physical city infrastructure.",
    author: "Nadia Al-Rashid",
    authorRole: "Smart Cities & Infrastructure Editor",
    category: "Smart Cities",
    image: "https://images.unsplash.com/photo-1761039232971-bb55a290762c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGNpdHklMjBpbmZyYXN0cnVjdHVyZSUyMGRpZ2l0YWwlMjB0cmFuc2Zvcm1hdGlvbnxlbnwxfHx8fDE3NzI2MjEzMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    date: "March 1, 2026",
    readTime: "7 min read",
    tags: ["Digital Twin", "Urban Planning", "Smart Infrastructure"],
    region: "Global"
  },
  {
    id: "18",
    title: "Singapore Launches World's First Fully AI-Governed City Management System",
    excerpt: "Singapore's Government Technology Agency deploys an end-to-end AI city management platform controlling traffic, utilities, emergency services, and public safety across the entire island-state.",
    content: "Singapore has taken its Smart Nation initiative to an unprecedented level with the launch of the world's first fully integrated AI city management system that autonomously governs critical urban infrastructure.",
    author: "Lim Wei Ling",
    authorRole: "Asia-Pacific Bureau Chief",
    category: "Smart Cities",
    image: "https://images.unsplash.com/photo-1761039232971-bb55a290762c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGNpdHklMjBpbmZyYXN0cnVjdHVyZSUyMGRpZ2l0YWwlMjB0cmFuc2Zvcm1hdGlvbnxlbnwxfHx8fDE3NzI2MjEzMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    date: "March 3, 2026",
    readTime: "6 min read",
    tags: ["Smart Cities", "Singapore", "Urban AI"],
    region: "Asia-Pacific"
  },

  // SUPPLY CHAIN
  {
    id: "19",
    title: "Blockchain-Enabled Supply Chain Visibility Becomes Standard for Fortune 500",
    excerpt: "A comprehensive study reveals 83% of Fortune 500 companies have fully integrated distributed ledger technology for end-to-end supply chain transparency by Q1 2026.",
    content: "Enterprise adoption of blockchain-based supply chain solutions has reached a tipping point, with more than four-fifths of the world's largest companies now operating on distributed ledger infrastructure.",
    author: "Thomas Eriksson",
    authorRole: "Supply Chain & Logistics Reporter",
    category: "Supply Chain",
    image: "https://images.unsplash.com/photo-1761307234387-d9291985eaf9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBwbHklMjBjaGFpbiUyMGxvZ2lzdGljcyUyMGdsb2JhbCUyMHRyYWRlfGVufDF8fHx8MTc3MjYyMTMwMnww&ixlib=rb-4.1.0&q=80&w=1080",
    date: "March 1, 2026",
    readTime: "6 min read",
    tags: ["Blockchain", "Supply Chain", "Fortune 500"],
    region: "North America"
  },
  {
    id: "20",
    title: "Autonomous Last-Mile Delivery Networks Deploy Across 35 Major Cities Simultaneously",
    excerpt: "A consortium of logistics companies has launched coordinated drone and ground-robot delivery networks across 35 cities on four continents, completing 2.4 million deliveries in the first week.",
    content: "A coordinated global launch of autonomous last-mile delivery networks spanning 35 major cities has marked a turning point for urban logistics, combining aerial drone delivery with ground-based autonomous robots.",
    author: "Kenji Nakamura",
    authorRole: "Logistics & Mobility Editor",
    category: "Supply Chain",
    image: "https://images.unsplash.com/photo-1761307234387-d9291985eaf9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBwbHklMjBjaGFpbiUyMGxvZ2lzdGljcyUyMGdsb2JhbCUyMHRyYWRlfGVufDF8fHx8MTc3MjYyMTMwMnww&ixlib=rb-4.1.0&q=80&w=1080",
    date: "March 4, 2026",
    readTime: "5 min read",
    breaking: true,
    tags: ["Autonomous Delivery", "Last Mile", "Robotics"],
    region: "Global"
  },

  // SUSTAINABILITY
  {
    id: "21",
    title: "Net-Zero Transition Accelerates as Carbon Credit Markets Hit $2.1 Trillion",
    excerpt: "The global voluntary carbon credit market surpassed $2.1 trillion in February 2026, signaling that corporate decarbonization is now a mainstream enterprise strategy rather than a reputational exercise.",
    content: "The exponential growth of global carbon credit markets signals that corporate decarbonization has crossed a critical threshold from aspirational goal to core business strategy.",
    author: "Amara Diallo",
    authorRole: "Sustainability & ESG Editor",
    category: "Sustainability",
    image: "https://images.unsplash.com/photo-1769501378353-2e4e3e3e325c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmVyZ3klMjByZW5ld2FibGUlMjB0ZWNobm9sb2d5JTIwaW5kdXN0cnl8ZW58MXx8fHwxNzcyNjIxMjk5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    date: "March 4, 2026",
    readTime: "7 min read",
    tags: ["Carbon Credits", "Net Zero", "ESG"],
    region: "Global"
  },

];

export const breakingNews = [
  "BREAKING: G20 Leaders Agree on Digital Intelligence Tax Framework — Effective Q3 2026",
  "ALERT: Nasdaq Digital Index surpasses 25,000 points for first time in history",
  "DEVELOPING: Global Cybersecurity Treaty signed by 140 nations at UN emergency summit",
  "BREAKING: Quantum Internet backbone goes live across North American corridor",
  "ALERT: OPEC+ announces blockchain digital energy trading platform — $4.2T market disruption",
  "BREAKING: Fusion reactor achieves 72-hour sustained commercial output — clean energy milestone",
  "DEVELOPING: DeFi volume surpasses traditional banking for the first time in history",
];

export const marketData = [
  { name: "AR Tech Index", value: "12,847.23", change: "+1.34%", up: true },
  { name: "Global AI ETF", value: "4,521.80", change: "+2.18%", up: true },
  { name: "Digital Assets", value: "98,234.50", change: "-0.72%", up: false },
  { name: "Energy Futures", value: "87.42", change: "+0.95%", up: true },
  { name: "HealthTech Index", value: "3,102.67", change: "+1.56%", up: true },
  { name: "EUR/USD", value: "1.0842", change: "-0.23%", up: false },
  { name: "Gold", value: "3,124.80", change: "+0.59%", up: true },
  { name: "BTC/USD", value: "98,234.50", change: "-0.72%", up: false },
];

export const categories = [
  "Technology",
  "Finance",
  "Cybersecurity",
  "Energy",
  "Healthcare",
  "Manufacturing",
  "Smart Cities",
  "Supply Chain",
  "Sustainability",
  "Markets",
];

export const regions = ["Global", "North America", "Europe", "Asia-Pacific", "Middle East", "Africa", "Latin America"];