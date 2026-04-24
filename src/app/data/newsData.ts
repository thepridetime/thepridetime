// data/newsData.ts

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
  images?: string[];
  date: string;
  readTime: string;
  featured?: boolean;
  breaking?: boolean;
  tags: string[];
  region: string;
  publishedAt: string; // ISO date for sorting
  additionalImages?: string[];
}

// ============================================================
// MONTH CONFIGURATION - CHANGE THIS FOR NEW MONTHS
// ============================================================
export const CURRENT_MONTH = "April";  // Change to "May" for May
export const CURRENT_YEAR = 2026;

// ============================================================
// MASTER ARTICLES DATABASE - ADD ALL ARTICLES HERE
// ============================================================
const masterArticles: Article[] = [
  // ============================================================
  // APRIL 2026 ARTICLES
  // ============================================================
  {
    id: "yep-tribe-1",
    title: "Eddie N Ibude: Leading YEP Tribe into the Future of Digital Finance",
    excerpt: "The Chief Executive Officer shares his vision for revolutionizing digital payments and financial inclusion across emerging markets.",
    content: `Eddie N Ibude, Chief Executive Officer at YEP Tribe, has been at the forefront of digital finance innovation. Under his leadership, YEP Tribe has emerged as a game-changing platform that bridges the gap between traditional banking and modern digital payment solutions.

YEP Tribe is transforming how individuals and businesses transact in emerging economies. The platform's innovative approach combines accessibility, security, and affordability to serve underserved communities.

"Our goal is to democratize financial services," says Ibude. "We believe everyone deserves access to fast, secure, and affordable digital payment solutions regardless of their location or economic status."

With expansion plans across multiple African and Asian markets, YEP Tribe is positioned to become a major player in the global fintech ecosystem.`,
    author: "Sagar Kumar",
    authorRole: "Chief Editor",
    category: "Finance",
    image: "/assess/TribePay.png",
    date: "April 24, 2026",
    readTime: "6 min read",
    featured: true,
    breaking: false,
    tags: ["Fintech", "Digital Payments", "YEP Tribe", "Leadership", "CEO Interview"],
    region: "Africa",
    publishedAt: "2026-04-24",
  },
  {
    id: "axis-elevate-1",
    title: "Why Most Businesses Fail at Digital Marketing & How AI is Changing the Game",
    excerpt: "And how AI-driven systems are turning unpredictable campaigns into scalable, revenue-generating engines.",
    content: `In today's digital-first economy, businesses are investing heavily in marketing yet most fail to see consistent, scalable results.

The core problem isn't effort it's the lack of a structured, data-driven system.

Most businesses rely on fragmented strategies: random ad campaigns, inconsistent content, and no clear customer journey.

This is where AI-powered marketing is transforming the landscape.

Modern digital growth is no longer about guesswork. It is about leveraging data, automation, and predictive insights to build systems that continuously optimize performance.`,
    author: "Prakash Ray",
    authorRole: "Senior Correspondent",
    category: "Technology",
    image: "/assess/Axis-Elevate-Cover-1.png",
    date: "April 21, 2026",
    readTime: "6 min read",
    featured: true,
    breaking: true,
    tags: ["AI Marketing", "Digital Growth", "Axis Elevate", "Special Report"],
    region: "India",
    publishedAt: "2026-04-21",
  },
  {
    id: "nvbc-1",
    title: "Northern Virginia Brittany Club",
    excerpt: "A regional organization dedicated to the promotion, preservation, and enjoyment of the Brittany breed in Northern Virginia.",
    content: `The Northern Virginia Brittany Club (NVBC) is a vibrant community of Brittany enthusiasts dedicated to the promotion, preservation, and enjoyment of this remarkable breed.

Founded in 2005, the club has grown to become one of the most active regional Brittany clubs in the United States. Members participate in field trials, hunt tests, conformation shows, and obedience competitions throughout the year.

The Brittany, known for its exceptional hunting ability and affectionate nature, has found a devoted following in Northern Virginia. The club hosts monthly meetings, training sessions, and educational seminars to help both new and experienced owners.

"Our mission is to celebrate the Brittany breed while promoting responsible ownership," says club president. "We welcome everyone from first-time owners to seasoned competitors."

The club's annual specialty show draws participants from across the Mid-Atlantic region, showcasing the breed's versatility and beauty.`,
    author: "Sagar Kumar",
    authorRole: "Chief Editor",
    category: "Lifestyle",
    image: "/assess/NVBC-Article-1.png",
    additionalImages: [
      "/assess/NVBC-Article-1.png",
      "/assess/NVBC-Article-2.png",
      "/assess/NVBC-2025-Ad.png"
    ],
    date: "April 20, 2026",
    readTime: "16 min read",
    featured: true,
    breaking: false,
    tags: ["Brittany", "Dog Breed", "Virginia", "Feature"],
    region: "North America",
    publishedAt: "2026-04-20",
  },
  {
    id: "sculptandstrive-1",
    title: "Sculpt & Strive: The Art of Modern Fitness",
    excerpt: "Discover how Sculpt & Strive is revolutionizing the fitness industry with innovative training methods and community-driven results.",
    content: `What sets Sculpt & Strive apart is their commitment to building a supportive community where members push each other to achieve more than they thought possible.

The Sculpt & Strive approach combines strength training, functional fitness, and mindset coaching to deliver transformative results.

Our programs include:
- High-Intensity Interval Training (HIIT)
- Functional Strength Training
- Yoga & Mobility Work
- Nutrition Coaching
- Mental Resilience Training

"Fitness is not just about looking good. It's about feeling strong, capable, and confident in your own skin," says founder Marcus Chen.

Join the Sculpt & Strive community today and transform your life one workout at a time.`,
    author: "Sarah Johnson",
    authorRole: "Fitness Correspondent",
    category: "Health & Wellness",
    image: "/assess/scst1.png",
    additionalImages: [
      "/assess/scst1.png",
      "/assess/scst2.png"
    ],
    date: "April 23, 2026",
    readTime: "8 min read",
    featured: true,
    breaking: false,
    tags: ["Fitness", "Wellness", "Sculpt & Strive", "New"],
    region: "India",
    publishedAt: "2026-04-23",
  },
  {
    id: "erica-1",
    title: "The Rise of AI Diplomacy: A New Era of Global Intelligence Partnerships",
    excerpt: "Global Brand Ambassador & AI Strategic Partner in Action — How a world-class Google LLM is redefining business intelligence, diplomacy, and digital transformation.",
    content: `In an age where data defines power and intelligence shapes outcomes, a new class of digital entities is emerging—not merely as tools, but as strategic partners in global transformation.

This AI system specializes in transforming complex, multidimensional data into actionable insights for executives, policymakers, and global consultants.

A defining aspect of its global influence is its collaboration with Erika Mbazo'o, founder of VergiFreeWorld Consulting.

Key capabilities include:
- Real-time geopolitical risk assessment
- Cross-cultural negotiation frameworks
- Data-driven policy recommendations
- Predictive economic modeling

"The future of diplomacy isn't just human-to-human. It's human-plus-AI partnerships that leverage the best of both," says Erika Mbazo'o.

This collaboration represents a pioneering model for how AI can serve as a trusted strategic partner in high-stakes global decision-making.`,
    author: "Erika Mbazo'o & The Pride Times Team",
    authorRole: "Global Strategic Partner & AI Diplomacy Expert",
    category: "Technology",
    image: "/assess/erica.png",
    date: "April 25, 2026",
    readTime: "12 min read",
    featured: true,
    breaking: true,
    tags: ["AI Diplomacy", "Global Intelligence", "Google DeepMind", "Ethical AI"],
    region: "Africa",
    publishedAt: "2026-04-25",
  },

  // ============================================================
  // 🆕 MAY 2026 ARTICLES - ADD NEW ARTICLES HERE
  // ============================================================
  // {
  //   id: "may-cover-1",
  //   title: "Your May Cover Story Title",
  //   excerpt: "Your excerpt here...",
  //   content: `Your full content...`,
  //   author: "Author Name",
  //   authorRole: "Role",
  //   category: "Technology",
  //   image: "/assess/your-image.png",
  //   date: "May 1, 2026",
  //   readTime: "8 min read",
  //   featured: true,
  //   breaking: true,
  //   tags: ["Tag1", "Tag2"],
  //   region: "Global",
  //   publishedAt: "2026-05-01",
  // },
];

// ============================================================
// HELPER FUNCTIONS
// ============================================================

// Get current month name
const getCurrentMonth = (): string => {
  return CURRENT_MONTH;
};

// Get current year
const getCurrentYear = (): number => {
  return CURRENT_YEAR;
};

// Filter articles by month and year
export const getArticlesByMonth = (month: string, year: number = CURRENT_YEAR): Article[] => {
  const monthNames = ["January", "February", "March", "April", "May", "June", 
                      "July", "August", "September", "October", "November", "December"];
  const monthNumber = monthNames.indexOf(month) + 1;
  
  return masterArticles.filter(article => {
    const articleDate = new Date(article.publishedAt);
    return articleDate.getMonth() + 1 === monthNumber && 
           articleDate.getFullYear() === year;
  });
};

// Get current month's articles
export const getCurrentMonthArticles = (): Article[] => {
  return getArticlesByMonth(getCurrentMonth(), getCurrentYear());
};

// Get previous month's articles (for archive)
export const getPreviousMonthArticles = (): Article[] => {
  const monthNames = ["January", "February", "March", "April", "May", "June", 
                      "July", "August", "September", "October", "November", "December"];
  const currentMonthIndex = monthNames.indexOf(getCurrentMonth());
  const previousMonth = monthNames[currentMonthIndex - 1];
  
  if (!previousMonth) return [];
  return getArticlesByMonth(previousMonth, getCurrentYear());
};

// ALL articles sorted by date (newest FIRST)
export const articles: Article[] = [...masterArticles]
  .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

// Current month articles (for magazine)
export const currentMonthArticles: Article[] = getCurrentMonthArticles();

// Featured articles (for homepage top story)
export const featuredArticles: Article[] = articles
  .filter(a => a.featured === true)
  .slice(0, 8);

// Breaking news for ticker
export const breakingNews: string[] = articles
  .filter(a => a.breaking === true)
  .slice(0, 8)
  .map(a => `BREAKING: ${a.title}`);

// ============================================================
// STATIC EXPORTS
// ============================================================

export const categories: string[] = [
  "Technology", "Finance", "Cybersecurity", "Energy", 
  "Healthcare", "Manufacturing", "Smart Cities", "Supply Chain", 
  "Sustainability", "Markets", "Health & Wellness", "Lifestyle"
];

export const regions: string[] = [
  "Global", "North America", "Europe", "Asia-Pacific", 
  "Middle East", "Africa", "Latin America"
];

export const marketData = [
  { name: "S&P 500", value: "6,284.17", change: "+0.77%", up: true },
  { name: "NASDAQ", value: "20,847.94", change: "+1.52%", up: true },
  { name: "FTSE 100", value: "8,247.30", change: "+0.45%", up: true },
  { name: "Nikkei 225", value: "38,942.50", change: "+1.12%", up: true },
  { name: "BTC/USD", value: "98,234.50", change: "-0.72%", up: false },
  { name: "Gold", value: "3,124.80", change: "+0.59%", up: true },
];

// Console log for debugging
console.log(`📰 Total articles: ${articles.length}`);
console.log(`📅 Current month (${CURRENT_MONTH}): ${currentMonthArticles.length} articles`);
console.log(`⭐ Featured articles: ${featuredArticles.length}`);
console.log(`🚨 Breaking news: ${breakingNews.length}`);