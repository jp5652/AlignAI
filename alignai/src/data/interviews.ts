export interface Interview {
  id: string
  title: string
  description: string
  duration: string
  difficulty: 'Easy' | 'Medium' | 'Difficult'
  category: string
  bgColor: string
}

export const interviewData: Interview[] = [
  // Software Engineering
  {
    id: 'software-1',
    title: 'Software Engineering',
    description: 'New Grad E3: Technical interview #1',
    duration: '20m',
    difficulty: 'Medium',
    category: 'Software',
    bgColor: 'from-purple-100 to-purple-200'
  },
  {
    id: 'software-2',
    title: 'Low-Level Design',
    description: 'Analyze components and optimization ideas',
    duration: '30m',
    difficulty: 'Difficult',
    category: 'Software',
    bgColor: 'from-blue-100 to-blue-200'
  },
  {
    id: 'software-3',
    title: 'DevOps Fundamentals',
    description: 'Talk about CI/CD, Docker, and cloud tools',
    duration: '35m',
    difficulty: 'Difficult',
    category: 'Software',
    bgColor: 'from-indigo-100 to-indigo-200'
  },
  {
    id: 'software-4',
    title: 'Front-end 101',
    description: 'Review UI optimization and JS techniques',
    duration: '30m',
    difficulty: 'Medium',
    category: 'Software',
    bgColor: 'from-cyan-100 to-cyan-200'
  },
  {
    id: 'software-5',
    title: 'Testing & Automation',
    description: 'Explore unit testing and automation tools',
    duration: '30m',
    difficulty: 'Medium',
    category: 'Software',
    bgColor: 'from-teal-100 to-teal-200'
  },
  {
    id: 'software-6',
    title: 'SQL & Database Talk',
    description: 'Discuss SQL queries and optimization',
    duration: '30m',
    difficulty: 'Medium',
    category: 'Software',
    bgColor: 'from-emerald-100 to-emerald-200'
  },
  {
    id: 'software-7',
    title: 'JavaScript Mastery',
    description: 'Review JS concepts and front-end skills',
    duration: '30m',
    difficulty: 'Medium',
    category: 'Software',
    bgColor: 'from-yellow-100 to-yellow-200'
  },
  {
    id: 'software-8',
    title: 'System Design Basics',
    description: 'Design scalable, distributed systems',
    duration: '35m',
    difficulty: 'Difficult',
    category: 'Software',
    bgColor: 'from-orange-100 to-orange-200'
  },
  {
    id: 'software-9',
    title: 'Coding Concepts Basics',
    description: 'Explore arrays, trees, graphs, algorithms',
    duration: '30m',
    difficulty: 'Medium',
    category: 'Software',
    bgColor: 'from-red-100 to-red-200'
  },
  {
    id: 'software-10',
    title: 'DSA technical interview',
    description: 'Test your algorithms knowledge',
    duration: '30m',
    difficulty: 'Difficult',
    category: 'Software',
    bgColor: 'from-pink-100 to-pink-200'
  },
  {
    id: 'software-11',
    title: 'Systems Design Interview',
    description: 'Demonstrate your ability to architect scalable and efficient systems',
    duration: '30m',
    difficulty: 'Medium',
    category: 'Software',
    bgColor: 'from-purple-100 to-purple-200'
  },

  // Consulting
  {
    id: 'consulting-1',
    title: 'Consulting Case Interview #1',
    description: 'Help a client analyze the launch of a new sports beverage',
    duration: '20m',
    difficulty: 'Medium',
    category: 'Consulting',
    bgColor: 'from-blue-100 to-blue-200'
  },
  {
    id: 'consulting-2',
    title: 'Consulting Case Interview #2',
    description: 'Explore solutions for a travel agency\'s overloaded call center',
    duration: '10m',
    difficulty: 'Medium',
    category: 'Consulting',
    bgColor: 'from-indigo-100 to-indigo-200'
  },
  {
    id: 'consulting-3',
    title: 'Consulting Case Interview #3',
    description: 'Help a client improve profitability.',
    duration: '30m',
    difficulty: 'Medium',
    category: 'Consulting',
    bgColor: 'from-cyan-100 to-cyan-200'
  },
  {
    id: 'consulting-4',
    title: 'Consulting Case Interview',
    description: 'Showcase your problem-solving skills',
    duration: '45m',
    difficulty: 'Medium',
    category: 'Consulting',
    bgColor: 'from-teal-100 to-teal-200'
  },

  // Data Science & Analytics
  {
    id: 'data-1',
    title: 'Stacks vs Queues',
    description: 'Learn the FIFO and LIFO flows',
    duration: '5m',
    difficulty: 'Medium',
    category: 'Data Science',
    bgColor: 'from-green-100 to-green-200'
  },
  {
    id: 'data-2',
    title: 'Hash Tables',
    description: 'Master the magic of key-to-index storage',
    duration: '5m',
    difficulty: 'Medium',
    category: 'Data Science',
    bgColor: 'from-emerald-100 to-emerald-200'
  },
  {
    id: 'data-3',
    title: 'Deep Learning Intro',
    description: 'Review neural networks and deep learning',
    duration: '35m',
    difficulty: 'Difficult',
    category: 'Data Science',
    bgColor: 'from-lime-100 to-lime-200'
  },
  {
    id: 'data-4',
    title: 'A/B Testing Basics',
    description: 'Talk about A/B testing and experiment design',
    duration: '30m',
    difficulty: 'Medium',
    category: 'Data Science',
    bgColor: 'from-green-100 to-green-200'
  },
  {
    id: 'data-5',
    title: 'Data Cleaning Tips',
    description: 'Discuss data cleaning and preprocessing',
    duration: '25m',
    difficulty: 'Easy',
    category: 'Data Science',
    bgColor: 'from-emerald-100 to-emerald-200'
  },
  {
    id: 'data-6',
    title: 'Time Series Basics',
    description: 'Explore time series data and forecasting',
    duration: '30m',
    difficulty: 'Medium',
    category: 'Data Science',
    bgColor: 'from-teal-100 to-teal-200'
  },
  {
    id: 'data-7',
    title: 'Big Data Concepts',
    description: 'Discuss big data tools and ecosystems',
    duration: '35m',
    difficulty: 'Difficult',
    category: 'Data Science',
    bgColor: 'from-cyan-100 to-cyan-200'
  },
  {
    id: 'data-8',
    title: 'Python for Data Science',
    description: 'Review Python usage in data science tasks',
    duration: '30m',
    difficulty: 'Medium',
    category: 'Data Science',
    bgColor: 'from-blue-100 to-blue-200'
  },
  {
    id: 'data-9',
    title: 'Machine Learning 101',
    description: 'Explore basic machine learning models',
    duration: '30m',
    difficulty: 'Difficult',
    category: 'Data Science',
    bgColor: 'from-indigo-100 to-indigo-200'
  },
  {
    id: 'data-10',
    title: 'Data Analysis Talk',
    description: 'Discuss data analysis and visualization',
    duration: '25m',
    difficulty: 'Medium',
    category: 'Data Science',
    bgColor: 'from-purple-100 to-purple-200'
  },
  {
    id: 'data-11',
    title: 'SQL for Data Science',
    description: 'Talk about SQL queries and databases',
    duration: '25m',
    difficulty: 'Medium',
    category: 'Data Science',
    bgColor: 'from-pink-100 to-pink-200'
  },
  {
    id: 'data-12',
    title: 'Statistics Basics',
    description: 'Review statistical concepts and probability',
    duration: '30m',
    difficulty: 'Medium',
    category: 'Data Science',
    bgColor: 'from-red-100 to-red-200'
  },
  {
    id: 'data-13',
    title: 'Data Analysis Interview',
    description: 'Assess analytical skills, technical proficiency, and problem-solving abilities in a data-driven context.',
    duration: '20m',
    difficulty: 'Difficult',
    category: 'Data Science',
    bgColor: 'from-orange-100 to-orange-200'
  },

  // Finance
  {
    id: 'finance-1',
    title: 'Working Capital Case',
    description: 'Explain the dynamics of working capital',
    duration: '5m',
    difficulty: 'Medium',
    category: 'Finance',
    bgColor: 'from-yellow-100 to-yellow-200'
  },
  {
    id: 'finance-2',
    title: 'Negative Equity Case',
    description: 'Discuss cases of negative shareholder equity',
    duration: '20m',
    difficulty: 'Medium',
    category: 'Finance',
    bgColor: 'from-amber-100 to-amber-200'
  },
  {
    id: 'finance-3',
    title: 'Financial Statements',
    description: 'Discuss the 3 main accounting statements',
    duration: '5m',
    difficulty: 'Medium',
    category: 'Finance',
    bgColor: 'from-lime-100 to-lime-200'
  },
  {
    id: 'finance-4',
    title: 'Behavioral Finance',
    description: 'Explore psychology in financial decisions',
    duration: '30m',
    difficulty: 'Medium',
    category: 'Finance',
    bgColor: 'from-green-100 to-green-200'
  },
  {
    id: 'finance-5',
    title: 'Portfolio Management',
    description: 'Review portfolio management strategies',
    duration: '30m',
    difficulty: 'Medium',
    category: 'Finance',
    bgColor: 'from-emerald-100 to-emerald-200'
  },
  {
    id: 'finance-6',
    title: 'Risk Management',
    description: 'Explore strategies for risk assessment',
    duration: '35m',
    difficulty: 'Difficult',
    category: 'Finance',
    bgColor: 'from-teal-100 to-teal-200'
  },
  {
    id: 'finance-7',
    title: 'Excel for Finance',
    description: 'Discuss Excel skills for finance tasks',
    duration: '30m',
    difficulty: 'Easy',
    category: 'Finance',
    bgColor: 'from-cyan-100 to-cyan-200'
  },
  {
    id: 'finance-8',
    title: 'Market Trends',
    description: 'Discuss current market trends and impacts',
    duration: '30m',
    difficulty: 'Medium',
    category: 'Finance',
    bgColor: 'from-blue-100 to-blue-200'
  },
  {
    id: 'finance-9',
    title: 'Corporate Finance',
    description: 'Review corporate finance principles',
    duration: '30m',
    difficulty: 'Medium',
    category: 'Finance',
    bgColor: 'from-indigo-100 to-indigo-200'
  },
  {
    id: 'finance-10',
    title: 'Valuation Techniques',
    description: 'Explore different valuation methods',
    duration: '35m',
    difficulty: 'Difficult',
    category: 'Finance',
    bgColor: 'from-purple-100 to-purple-200'
  },
  {
    id: 'finance-11',
    title: 'Investment Analysis',
    description: 'Discuss investment evaluation techniques',
    duration: '30m',
    difficulty: 'Medium',
    category: 'Finance',
    bgColor: 'from-pink-100 to-pink-200'
  },
  {
    id: 'finance-12',
    title: 'Financial Modeling',
    description: 'Discuss building financial models',
    duration: '30m',
    difficulty: 'Medium',
    category: 'Finance',
    bgColor: 'from-red-100 to-red-200'
  },
  {
    id: 'finance-13',
    title: 'Market Sizing Interview',
    description: 'Assess analytical thinking and business acumen.',
    duration: '20m',
    difficulty: 'Medium',
    category: 'Finance',
    bgColor: 'from-orange-100 to-orange-200'
  },
  {
    id: 'finance-14',
    title: 'Investment Banking Interview',
    description: 'Assess deal-making and financial understanding.',
    duration: '20m',
    difficulty: 'Medium',
    category: 'Finance',
    bgColor: 'from-yellow-100 to-yellow-200'
  },
  {
    id: 'finance-15',
    title: 'Financial Analyst Interview',
    description: 'Assess analytical, strategic, and communication skills.',
    duration: '20m',
    difficulty: 'Difficult',
    category: 'Finance',
    bgColor: 'from-amber-100 to-amber-200'
  },

  // Marketing
  {
    id: 'marketing-1',
    title: 'Creative Campaign Ideas',
    description: 'Present a unique campaign concept',
    duration: '25m',
    difficulty: 'Medium',
    category: 'Marketing',
    bgColor: 'from-blue-100 to-blue-200'
  },
  {
    id: 'marketing-2',
    title: 'Analytics and KPIs',
    description: 'Discuss your metrics approach',
    duration: '30m',
    difficulty: 'Difficult',
    category: 'Marketing',
    bgColor: 'from-indigo-100 to-indigo-200'
  },
  {
    id: 'marketing-3',
    title: 'Social Media Campaigns',
    description: 'Discuss campaign strategies',
    duration: '20m',
    difficulty: 'Medium',
    category: 'Marketing',
    bgColor: 'from-purple-100 to-purple-200'
  },
  {
    id: 'marketing-4',
    title: 'Marketing Case Interview',
    description: 'Show strategic thinking, creativity, and marketing skills.',
    duration: '20m',
    difficulty: 'Medium',
    category: 'Marketing',
    bgColor: 'from-pink-100 to-pink-200'
  },
  {
    id: 'marketing-5',
    title: 'Customer Segmentation',
    description: 'Discuss segmentation strategies',
    duration: '20m',
    difficulty: 'Difficult',
    category: 'Marketing',
    bgColor: 'from-red-100 to-red-200'
  },
  {
    id: 'marketing-6',
    title: 'Email Marketing Tactics',
    description: 'Explain your email strategies',
    duration: '15m',
    difficulty: 'Easy',
    category: 'Marketing',
    bgColor: 'from-orange-100 to-orange-200'
  },
  {
    id: 'marketing-7',
    title: 'Market Research Methods',
    description: 'Discuss your research techniques',
    duration: '15m',
    difficulty: 'Easy',
    category: 'Marketing',
    bgColor: 'from-yellow-100 to-yellow-200'
  },
  {
    id: 'marketing-8',
    title: 'Brand Development',
    description: 'Discuss your approach to branding',
    duration: '20m',
    difficulty: 'Medium',
    category: 'Marketing',
    bgColor: 'from-amber-100 to-amber-200'
  },
  {
    id: 'marketing-9',
    title: 'SEO Best Practices',
    description: 'Explain your SEO techniques',
    duration: '25m',
    difficulty: 'Difficult',
    category: 'Marketing',
    bgColor: 'from-lime-100 to-lime-200'
  },
  {
    id: 'marketing-10',
    title: 'Content Marketing Plan',
    description: 'Outline a content strategy',
    duration: '25m',
    difficulty: 'Medium',
    category: 'Marketing',
    bgColor: 'from-green-100 to-green-200'
  },
  {
    id: 'marketing-11',
    title: 'Digital Marketing Strategy',
    description: 'Discuss your digital strategy',
    duration: '20m',
    difficulty: 'Medium',
    category: 'Marketing',
    bgColor: 'from-emerald-100 to-emerald-200'
  },

  // Quantitative/Statistics
  {
    id: 'quant-1',
    title: 'Quant #1: Handshakes',
    description: 'Calculate the number of handshakes',
    duration: '10m',
    difficulty: 'Medium',
    category: 'Statistics',
    bgColor: 'from-lime-100 to-lime-200'
  },
  {
    id: 'quant-2',
    title: 'Quant #2: Local Maxima',
    description: 'Determine expected local maxima in a sequence',
    duration: '10m',
    difficulty: 'Medium',
    category: 'Statistics',
    bgColor: 'from-green-100 to-green-200'
  },
  {
    id: 'quant-3',
    title: 'Quant #3: Matching Heads',
    description: 'Deduce a simple game\'s profitability',
    duration: '5m',
    difficulty: 'Easy',
    category: 'Statistics',
    bgColor: 'from-emerald-100 to-emerald-200'
  },
  {
    id: 'quant-4',
    title: 'Quant #4: Moving Ants',
    description: 'Analyze movements of ants on a stick',
    duration: '10m',
    difficulty: 'Easy',
    category: 'Statistics',
    bgColor: 'from-teal-100 to-teal-200'
  },
  {
    id: 'quant-5',
    title: 'Quant #5: 2D Paths',
    description: 'Consider all possible paths in a 2D game',
    duration: '10m',
    difficulty: 'Easy',
    category: 'Statistics',
    bgColor: 'from-cyan-100 to-cyan-200'
  },
  {
    id: 'stats-1',
    title: 'Statistical Ethics',
    description: 'Discuss ethical considerations',
    duration: '20m',
    difficulty: 'Medium',
    category: 'Statistics',
    bgColor: 'from-blue-100 to-blue-200'
  },
  {
    id: 'stats-2',
    title: 'Data Visualization',
    description: 'Explain your visualization approach',
    duration: '20m',
    difficulty: 'Medium',
    category: 'Statistics',
    bgColor: 'from-indigo-100 to-indigo-200'
  },
  {
    id: 'stats-3',
    title: 'Sampling Techniques',
    description: 'Describe your sampling methods',
    duration: '30m',
    difficulty: 'Medium',
    category: 'Statistics',
    bgColor: 'from-purple-100 to-purple-200'
  },
  {
    id: 'stats-4',
    title: 'Statistical Software',
    description: 'Discuss software tools you use',
    duration: '15m',
    difficulty: 'Easy',
    category: 'Statistics',
    bgColor: 'from-pink-100 to-pink-200'
  },
  {
    id: 'stats-5',
    title: 'Quality Control Methods',
    description: 'Discuss quality control in analysis',
    duration: '20m',
    difficulty: 'Medium',
    category: 'Statistics',
    bgColor: 'from-red-100 to-red-200'
  },

  // Business & Product
  {
    id: 'business-1',
    title: 'MVC Models',
    description: 'Explain this core design architecture',
    duration: '5m',
    difficulty: 'Medium',
    category: 'Business',
    bgColor: 'from-blue-100 to-blue-200'
  },
  {
    id: 'business-2',
    title: 'REST API 101',
    description: 'Web APIs using HTTP methods',
    duration: '5m',
    difficulty: 'Easy',
    category: 'Business',
    bgColor: 'from-indigo-100 to-indigo-200'
  },
  {
    id: 'business-3',
    title: 'Processes vs Threads',
    description: 'Discuss these Core OS concepts',
    duration: '5m',
    difficulty: 'Easy',
    category: 'Business',
    bgColor: 'from-purple-100 to-purple-200'
  },
  {
    id: 'business-4',
    title: 'Risk Assessment Case',
    description: 'Evaluate risks in a business plan',
    duration: '30m',
    difficulty: 'Medium',
    category: 'Business',
    bgColor: 'from-pink-100 to-pink-200'
  },
  {
    id: 'business-5',
    title: 'Digital Transformation',
    description: 'Guide a firm through digital change',
    duration: '30m',
    difficulty: 'Easy',
    category: 'Business',
    bgColor: 'from-red-100 to-red-200'
  },
  {
    id: 'business-6',
    title: 'Business Model Evaluation',
    description: 'Assess the viability of a business model',
    duration: '25m',
    difficulty: 'Difficult',
    category: 'Business',
    bgColor: 'from-orange-100 to-orange-200'
  },
  {
    id: 'business-7',
    title: 'Growth Strategy Case',
    description: 'Develop strategies for business growth',
    duration: '30m',
    difficulty: 'Medium',
    category: 'Business',
    bgColor: 'from-yellow-100 to-yellow-200'
  },
  {
    id: 'business-8',
    title: 'Profitability Case',
    description: 'Identify factors impacting profitability',
    duration: '30m',
    difficulty: 'Difficult',
    category: 'Business',
    bgColor: 'from-amber-100 to-amber-200'
  },
  {
    id: 'business-9',
    title: 'Operational Improvement',
    description: 'Analyze inefficiencies in operations',
    duration: '20m',
    difficulty: 'Medium',
    category: 'Business',
    bgColor: 'from-lime-100 to-lime-200'
  },
  {
    id: 'business-10',
    title: 'Project management',
    description: 'Show leadership, adaptability, and execution skills.',
    duration: '20m',
    difficulty: 'Medium',
    category: 'Business',
    bgColor: 'from-green-100 to-green-200'
  },

  // Product Management
  {
    id: 'product-1',
    title: 'New Product Launch',
    description: 'Plan and strategize a product launch',
    duration: '30m',
    difficulty: 'Medium',
    category: 'Product',
    bgColor: 'from-pink-100 to-pink-200'
  },
  {
    id: 'product-2',
    title: 'Agile Methodologies',
    description: 'Explore agile practices for product teams',
    duration: '30m',
    difficulty: 'Medium',
    category: 'Product',
    bgColor: 'from-red-100 to-red-200'
  },
  {
    id: 'product-3',
    title: 'Go-to-Market Plan',
    description: 'Discuss strategies for launching products',
    duration: '20m',
    difficulty: 'Easy',
    category: 'Product',
    bgColor: 'from-orange-100 to-orange-200'
  },
  {
    id: 'product-4',
    title: 'Product Lifecycle 101',
    description: 'Review stages of product lifecycle',
    duration: '30m',
    difficulty: 'Medium',
    category: 'Product',
    bgColor: 'from-yellow-100 to-yellow-200'
  },
  {
    id: 'product-5',
    title: 'Metrics and KPIs',
    description: 'Explore key metrics for product success',
    duration: '30m',
    difficulty: 'Medium',
    category: 'Product',
    bgColor: 'from-amber-100 to-amber-200'
  },
  {
    id: 'product-6',
    title: 'Product Strategy Casing',
    description: 'Discuss product vision and strategy',
    duration: '30m',
    difficulty: 'Medium',
    category: 'Product',
    bgColor: 'from-lime-100 to-lime-200'
  },

  // General Behavioral
  {
    id: 'behavioral-1',
    title: 'Behavioral Interview',
    description: 'Practice Mercor\'s general interview',
    duration: '20m',
    difficulty: 'Medium',
    category: 'Behavioral',
    bgColor: 'from-emerald-100 to-emerald-200'
  },
  {
    id: 'behavioral-2',
    title: 'Behavioral Insights',
    description: 'Discuss leadership and conflict handling',
    duration: '25m',
    difficulty: 'Easy',
    category: 'Behavioral',
    bgColor: 'from-teal-100 to-teal-200'
  },
  {
    id: 'behavioral-3',
    title: 'Behavioral Interview',
    description: 'Knock your soft-skills out of the park',
    duration: '15m',
    difficulty: 'Easy',
    category: 'Behavioral',
    bgColor: 'from-cyan-100 to-cyan-200'
  },

  // Engineering (Non-Software)
  {
    id: 'engineering-1',
    title: 'Manufacturing Processes',
    description: 'Explain key manufacturing techniques',
    duration: '20m',
    difficulty: 'Medium',
    category: 'Engineering',
    bgColor: 'from-blue-100 to-blue-200'
  },
  {
    id: 'engineering-2',
    title: 'Robotics Engineering',
    description: 'Discuss your approach to robotics',
    duration: '20m',
    difficulty: 'Difficult',
    category: 'Engineering',
    bgColor: 'from-indigo-100 to-indigo-200'
  },
  {
    id: 'engineering-3',
    title: 'Quality Assurance Methods',
    description: 'Explain QA processes in projects',
    duration: '25m',
    difficulty: 'Medium',
    category: 'Engineering',
    bgColor: 'from-purple-100 to-purple-200'
  },
  {
    id: 'engineering-4',
    title: 'Systems Engineering Approach',
    description: 'Explain systems engineering principles',
    duration: '20m',
    difficulty: 'Medium',
    category: 'Engineering',
    bgColor: 'from-pink-100 to-pink-200'
  },
  {
    id: 'engineering-5',
    title: 'Project Risk Management',
    description: 'Discuss risk management strategies',
    duration: '25m',
    difficulty: 'Difficult',
    category: 'Engineering',
    bgColor: 'from-red-100 to-red-200'
  },

  // Design
  {
    id: 'design-1',
    title: 'Design Trends Analysis',
    description: 'Analyze current design trends',
    duration: '20m',
    difficulty: 'Easy',
    category: 'Design',
    bgColor: 'from-orange-100 to-orange-200'
  },
  {
    id: 'design-2',
    title: 'Usability Testing',
    description: 'Explain your testing process',
    duration: '25m',
    difficulty: 'Medium',
    category: 'Design',
    bgColor: 'from-yellow-100 to-yellow-200'
  },
  {
    id: 'design-3',
    title: 'Color Theory Application',
    description: 'Discuss color choices in design',
    duration: '15m',
    difficulty: 'Medium',
    category: 'Design',
    bgColor: 'from-amber-100 to-amber-200'
  },
  {
    id: 'design-4',
    title: 'Wireframing Process',
    description: 'Explain your wireframing approach',
    duration: '30m',
    difficulty: 'Medium',
    category: 'Design',
    bgColor: 'from-lime-100 to-lime-200'
  },
  {
    id: 'design-5',
    title: 'Brand Identity Interview',
    description: 'Outline a brand identity project',
    duration: '30m',
    difficulty: 'Difficult',
    category: 'Design',
    bgColor: 'from-green-100 to-green-200'
  },

  // Writing
  {
    id: 'writing-1',
    title: 'Press Release Practice',
    description: 'Draft a press release on a topic',
    duration: '30m',
    difficulty: 'Medium',
    category: 'Writing',
    bgColor: 'from-emerald-100 to-emerald-200'
  },
  {
    id: 'writing-2',
    title: 'Grant Writing Discussion',
    description: 'Discuss key elements of a grant',
    duration: '20m',
    difficulty: 'Medium',
    category: 'Writing',
    bgColor: 'from-teal-100 to-teal-200'
  },
  {
    id: 'writing-3',
    title: 'Screenwriting Pitch',
    description: 'Pitch a screenplay idea',
    duration: '30m',
    difficulty: 'Difficult',
    category: 'Writing',
    bgColor: 'from-cyan-100 to-cyan-200'
  },
  {
    id: 'writing-4',
    title: 'Content Strategy Discussion',
    description: 'Discuss a content strategy plan',
    duration: '20m',
    difficulty: 'Easy',
    category: 'Writing',
    bgColor: 'from-blue-100 to-blue-200'
  },
  {
    id: 'writing-5',
    title: 'Copywriting Exercise',
    description: 'Pitch a product in 2 minutes',
    duration: '20m',
    difficulty: 'Medium',
    category: 'Writing',
    bgColor: 'from-indigo-100 to-indigo-200'
  },

  // Biology
  {
    id: 'biology-1',
    title: 'Environmental Biology',
    description: 'Discuss high-impact projects',
    duration: '30m',
    difficulty: 'Medium',
    category: 'Biology',
    bgColor: 'from-purple-100 to-purple-200'
  },
  {
    id: 'biology-2',
    title: 'Pathology Techniques',
    description: 'Discuss pathology testing methods',
    duration: '25m',
    difficulty: 'Medium',
    category: 'Biology',
    bgColor: 'from-pink-100 to-pink-200'
  },
  {
    id: 'biology-3',
    title: 'Bioinformatics Techniques',
    description: 'Discuss bioinformatics applications',
    duration: '20m',
    difficulty: 'Difficult',
    category: 'Biology',
    bgColor: 'from-red-100 to-red-200'
  },
  {
    id: 'biology-4',
    title: 'Neuroscience Research',
    description: 'Discuss your neuroscience projects',
    duration: '25m',
    difficulty: 'Medium',
    category: 'Biology',
    bgColor: 'from-orange-100 to-orange-200'
  },
  {
    id: 'biology-5',
    title: 'Genomic Data Analysis',
    description: 'Discuss genomic analysis methods',
    duration: '30m',
    difficulty: 'Difficult',
    category: 'Biology',
    bgColor: 'from-yellow-100 to-yellow-200'
  },

  // Security
  {
    id: 'security-1',
    title: 'Network Security Drill',
    description: 'Conduct a security drill',
    duration: '30m',
    difficulty: 'Difficult',
    category: 'Security',
    bgColor: 'from-amber-100 to-amber-200'
  },
  {
    id: 'security-2',
    title: 'Threat Intelligence',
    description: 'Discuss your threat intelligence methods',
    duration: '40m',
    difficulty: 'Difficult',
    category: 'Security',
    bgColor: 'from-lime-100 to-lime-200'
  },
  {
    id: 'security-3',
    title: 'Physical Security Measures',
    description: 'Discuss physical security practices',
    duration: '15m',
    difficulty: 'Medium',
    category: 'Security',
    bgColor: 'from-green-100 to-green-200'
  },
  {
    id: 'security-4',
    title: 'Cybersecurity Strategy',
    description: 'Discuss your security strategies',
    duration: '20m',
    difficulty: 'Difficult',
    category: 'Security',
    bgColor: 'from-emerald-100 to-emerald-200'
  },
  {
    id: 'security-5',
    title: 'Penetration Testing',
    description: 'Explain your penetration testing approach',
    duration: '30m',
    difficulty: 'Difficult',
    category: 'Security',
    bgColor: 'from-teal-100 to-teal-200'
  },

  // Blockchain
  {
    id: 'blockchain-1',
    title: 'Distributed Ledger Case',
    description: 'Design a DLT application',
    duration: '30m',
    difficulty: 'Difficult',
    category: 'Blockchain',
    bgColor: 'from-cyan-100 to-cyan-200'
  },
  {
    id: 'blockchain-2',
    title: 'Consensus Algorithm Test',
    description: 'Evaluate a consensus algorithm',
    duration: '30m',
    difficulty: 'Medium',
    category: 'Blockchain',
    bgColor: 'from-blue-100 to-blue-200'
  },
  {
    id: 'blockchain-3',
    title: 'Blockchain Scaling',
    description: 'Propose a scalability solution',
    duration: '35m',
    difficulty: 'Difficult',
    category: 'Blockchain',
    bgColor: 'from-indigo-100 to-indigo-200'
  },
  {
    id: 'blockchain-4',
    title: 'Token Distribution Plan',
    description: 'Create a token distribution',
    duration: '20m',
    difficulty: 'Medium',
    category: 'Blockchain',
    bgColor: 'from-purple-100 to-purple-200'
  },
  {
    id: 'blockchain-5',
    title: 'Smart Contract Design',
    description: 'Propose a smart contract use case',
    duration: '20m',
    difficulty: 'Medium',
    category: 'Blockchain',
    bgColor: 'from-pink-100 to-pink-200'
  },

  // Legal
  {
    id: 'legal-1',
    title: 'Civil Litigation Process',
    description: 'Explain the litigation process',
    duration: '35m',
    difficulty: 'Medium',
    category: 'Legal',
    bgColor: 'from-red-100 to-red-200'
  },
  {
    id: 'legal-2',
    title: 'Legal Ethics Discussion',
    description: 'Discuss ethics in legal practice',
    duration: '30m',
    difficulty: 'Easy',
    category: 'Legal',
    bgColor: 'from-orange-100 to-orange-200'
  },
  {
    id: 'legal-3',
    title: 'Regulatory Compliance',
    description: 'Discuss compliance with regulations',
    duration: '40m',
    difficulty: 'Difficult',
    category: 'Legal',
    bgColor: 'from-yellow-100 to-yellow-200'
  },
  {
    id: 'legal-4',
    title: 'Employment Law Case',
    description: 'Review an employment law case',
    duration: '35m',
    difficulty: 'Medium',
    category: 'Legal',
    bgColor: 'from-amber-100 to-amber-200'
  },
  {
    id: 'legal-5',
    title: 'Intellectual Property',
    description: 'Discuss IP rights and protections',
    duration: '30m',
    difficulty: 'Medium',
    category: 'Legal',
    bgColor: 'from-lime-100 to-lime-200'
  },

  // Media
  {
    id: 'media-1',
    title: 'Critical Reception',
    description: 'Discuss how to handle critiques',
    duration: '20m',
    difficulty: 'Medium',
    category: 'Media',
    bgColor: 'from-green-100 to-green-200'
  },
  {
    id: 'media-2',
    title: 'Content Distribution',
    description: 'Explain content distribution strategies',
    duration: '25m',
    difficulty: 'Medium',
    category: 'Media',
    bgColor: 'from-emerald-100 to-emerald-200'
  },
  {
    id: 'media-3',
    title: 'Showrunner Skills',
    description: 'Discuss the role of a showrunner',
    duration: '30m',
    difficulty: 'Medium',
    category: 'Media',
    bgColor: 'from-teal-100 to-teal-200'
  },
  {
    id: 'media-4',
    title: 'Digital Content Trends',
    description: 'Analyze trends in digital content',
    duration: '15m',
    difficulty: 'Easy',
    category: 'Media',
    bgColor: 'from-cyan-100 to-cyan-200'
  },
  {
    id: 'media-5',
    title: 'Production Workflow',
    description: 'Explain your production workflow',
    duration: '30m',
    difficulty: 'Difficult',
    category: 'Media',
    bgColor: 'from-blue-100 to-blue-200'
  }
]