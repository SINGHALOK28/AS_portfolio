/**
 * USER_CONFIG (Portfolio Content & Data)
 * 
 * WHY THIS CODE EXISTS:
 * This file acts as the central "database" for the entire portfolio. 
 * Hardcoding data directly inside React components makes the code messy and difficult to update. 
 * By separating the data into this configuration file, you achieve a clean separation of concerns.
 * 
 * WHAT IT DOES:
 * 1. Exports a single JSON-like object (`USER_CONFIG`) that holds all personal information, projects, skills, and gallery items.
 * 2. React components import this object (via PortfolioConfigContext) and map over the arrays to dynamically generate the UI.
 * 3. To update any text, image, or link on the website, you only need to modify this file instead of hunting through JSX code.
 */
export const USER_CONFIG = {
  profile: {
    name: "Alok Singh",
    title: "Computer Science Engineering Student & Software Developer",
    roles: [
      "Software Developer",
      "Backend Engineer",
      "Data Analyst",
      "NLP & AI Specialist",
      "Technical Blogger"
    ],
    avatarUrl: "/avatar.png",
    bio: "Aspiring developer with experience in building end-to-end web applications using Python, SQL, and Django. Skilled in backend development, database design, and integrating application logic with user-facing components. Interested in scalable applications and applying AI/ML concepts to real-world problems.",
    resumeUrl: "/aloksinghaiml.pdf",
    email: "aloksinghchas01@gmail.com",
    phone: "+91 6207698566",
  },

  usernames: {
    github: "SINGHALOK28",
    leetcode: "singhalok19",
    codeforces: "singhalok19",
    codechef: "singhalok19",
    geeksforgeeks: "singhalok19",
    linkedin: "alok-singh-261149295",
  },

  // High-fidelity fallback stats for offline/rate-limit use
  fallbackStats: {
    github: {
      repositories: 18,
      stars: 42,
      forks: 9,
      commitsThisYear: 320,
      streak: 22,
      contributions: []
    },
    leetcode: {
      solved: 184,
      easy: 70,
      medium: 98,
      hard: 16,
      rank: 125000,
      streak: 42,
      badges: ["100 Days Badge 2025", "Daily Streak"]
    },
    codeforces: {
      rating: 1240,
      maxRating: 1280,
      rank: "Newbie",
      maxRank: "Newbie",
      solvedCount: 86,
      contestsCount: 14
    },
    codechef: {
      rating: 1420,
      stars: "2★",
      globalRank: 12450,
      countryRank: 4200,
      solvedCount: 54
    },
    geeksforgeeks: {
      solved: 245,
      score: 780,
      streak: 40,
      rank: 40 // Top 40 Institution rank
    }
  },

  education: [
    {
      degree: "Bachelor of Engineering in Computer Science & Engineering",
      specialization: "Data Science Specialization",
      institution: "PES College of Engineering, Mandya",
      duration: "2023 - 2027",
      cgpa: "8.45 CGPA",
      courses: [
        "Data Science & Analysis",
        "Natural Language Processing",
        "Database Management Systems",
        "Web Application Development",
        "Data Structures & Algorithms",
        "Applied Machine Learning"
      ]
    },
    {
      degree: "CBSE Class XII (12th Grade)",
      specialization: "Physics, Chemistry, Mathematics (PCM)",
      institution: "Chinmaya Vidyalaya, Bokaro",
      duration: "Passed 2023",
      cgpa: "86.2% Marks",
      courses: [
        "Physics",
        "Chemistry",
        "Mathematics",
        "Computer Science",
        "English"
      ]
    },
    {
      degree: "CBSE Class X (10th Grade)",
      specialization: "General Secondary Education",
      institution: "Chinmaya Vidyalaya, Bokaro",
      duration: "Passed 2021",
      cgpa: "93.4% Marks",
      courses: [
        "Mathematics",
        "Science & Technology",
        "Social Sciences",
        "English",
        "Sanskrit"
      ]
    }
  ],

  skills: {
    categories: [
      { id: "languages", name: "Languages" },
      { id: "libraries", name: "Data Science" },
      { id: "nlp-ai", name: "NLP & AI" },
      { id: "tools", name: "Web & DB" },
      { id: "dev-tools", name: "DevTools" }
    ],
    items: [
      // Languages
      { name: "Python", category: "languages", level: "Expert", value: 90, icon: "python", desc: "Core language for model workflows, backend APIs, and scraping runs." },
      { name: "SQL", category: "languages", level: "Expert", value: 86, icon: "database", desc: "Writing optimized queries, joins, and database operations." },
      { name: "C++", category: "languages", level: "Intermediate", value: 84, icon: "cpp", desc: "Primary language for algorithmic logic and data structures." },
      { name: "C", category: "languages", level: "Intermediate", value: 76, icon: "c", desc: "System-level fundamentals and memory allocation." },
      { name: "Java", category: "languages", level: "Intermediate", value: 78, icon: "java", desc: "Object-oriented structures and desktop integrations." },

      // Data Science Libraries
      { name: "Pandas", category: "libraries", level: "Expert", value: 88, icon: "pandas", desc: "Tabular data cleaning, transformations, and aggregation pipelines." },
      { name: "NumPy", category: "libraries", level: "Expert", value: 86, icon: "numpy", desc: "Linear algebra, multidimensional matrix arrays, and array operations." },
      { name: "Matplotlib", category: "libraries", level: "Intermediate", value: 82, icon: "chart", desc: "Plotting static analytical charts and training performance visuals." },
      { name: "Seaborn", category: "libraries", level: "Intermediate", value: 80, icon: "chart", desc: "Heatmaps, distributions, and customized statistical graphs." },
      { name: "Scikit-learn", category: "libraries", level: "Intermediate", value: 84, icon: "scikit", desc: "Preprocessing pipelines, classification splits, and predictive estimators." },

      // NLP & AI
      { name: "spaCy", category: "nlp-ai", level: "Expert", value: 85, icon: "nlp", desc: "Industrial-grade entity extraction, tagging, and lemmatization." },
      { name: "NLTK", category: "nlp-ai", level: "Expert", value: 84, icon: "nlp", desc: "Text tokenization, sentiment heuristics, and vocabulary corpus parsing." },
      { name: "Sentence Transformers", category: "nlp-ai", level: "Expert", value: 88, icon: "transformer", desc: "Generating contextual embeddings and semantic similarity scores." },

      // Web & DB
      { name: "MySQL", category: "tools", level: "Expert", value: 85, icon: "mysql", desc: "Relational schema design, transactions, and indexing." },
      { name: "HTML & CSS", category: "tools", level: "Intermediate", value: 82, icon: "web", desc: "Building responsive grids, navigation menus, and clean web forms." },
      { name: "JS", category: "tools", level: "Intermediate", value: 84, icon: "javascript", desc: "Creating extensions, script hooks, and asynchronous client events." },
      { name: "Tableau", category: "tools", level: "Intermediate", value: 80, icon: "tableau", desc: "Creating visual dashboard sheets, forensic graphs, and business metrics." },

      // Developer Tools
      { name: "Git and GitHub", category: "dev-tools", level: "Expert", value: 90, icon: "git", desc: "Distributed version control, remote repos, and project workflows." },
      { name: "Chrome Extension", category: "dev-tools", level: "Intermediate", value: 85, icon: "chrome", desc: "Building script injections and threat monitoring browser extensions." },
      { name: "Azure DevOps", category: "dev-tools", level: "Intermediate", value: 80, icon: "azure", desc: "Automating builds, testing hooks, and branch triggers using YAML." },
      { name: "Streamlit", category: "dev-tools", level: "Intermediate", value: 85, icon: "streamlit", desc: "Deploying local ML dashboard prototypes in pure Python." }
    ]
  },

  experiences: [
    {
      role: "Quantitative Research Virtual Experience",
      company: "JPMorgan Chase & Co. (via Forage)",
      duration: "Sept 2025",
      achievements: [
        "Completed a simulation focused on quantitative research methods and predictive modeling.",
        "Analyzed a book of loans to estimate customer probability of default using Python.",
        "Utilized dynamic programming to convert FICO scores into categorical data to predict defaults."
      ],
      techs: ["Python", "Data Analysis", "Dynamic Programming", "Statistics"]
    },
    {
      role: "Data Analytics Virtual Experience",
      company: "Deloitte Australia (via Forage Simulation)",
      duration: "2024 (Virtual Job Simulation)",
      achievements: [
        "Completed a Deloitte simulation involving forensic data analysis, data categorization, and Tableau dashboarding.",
        "Created an interactive business intelligence sheet using Tableau to map forensic statistics.",
        "Utilized Excel worksheets to classify dataset categories, filter noise, and draft data-driven conclusions."
      ],
      techs: ["Tableau", "Excel", "Data Analysis", "Forensics"]
    },
    {
      role: "Project Co-Developer & Team Member",
      company: "PES College of Engineering, Mandya",
      duration: "2023 - 2026",
      achievements: [
        "Architected full-stack civic action platform 'Jan Saathi' incorporating Vertex AI classification and Google Maps API.",
        "Built Chrome extensions mapping OSINT defense data and computing threat classification levels in real-time.",
        "Configured custom sentence-transformer pipelines running on Streamlit instances to parse and evaluate resume profiles."
      ],
      techs: ["Python", "JS", "Django REST", "React.js", "Azure DevOps"]
    }
  ],

  projects: [
    {
      id: "jan-saathi",
      title: "Jan Saathi - Civic Issue Reporting",
      category: "Full-Stack & AI",
      shortDesc: "A civic action portal with automated Vertex AI classification and Google Maps API routing.",
      longDesc: "Jan Saathi is a full-stack civic issue reporting system built to bridge public communication. Includes role-based portals (Citizen, Contractor, Admin) with secure JWT tokens. Integrates Google Maps APIs and Google Vertex AI image classification to automatically identify report types, tag locations, and optimize priority routing lists.",
      techStack: ["React.js", "Django REST", "MongoDB", "Vertex AI", "Google Maps API"],
      github: "https://github.com/alok-singh",
      demo: "https://github.com/alok-singh",
      demoImage: "/projects/jansaathi.png",
      featured: true,
      status: "Production Ready",
      metrics: { resolutionSpeed: "92%", APIlatency: "45ms", detectionAccuracy: "94%" },
      challenges: "Configuring multi-role route authentication and secure image uploads without overloading DB logs.",
      learnings: "Splitting uploads to static buckets and designing JWT hooks that dynamically verify user clearance levels.",
      architectureUrl: "/architecture_jansaathi.png"
    },
    {
      id: "resume-intelligence",
      title: "AI-Driven Resume Intelligence",
      category: "Natural Language Processing",
      shortDesc: "NLP scanning engine parsing resumes and performing candidate scoring via semantic embedding analysis.",
      longDesc: "A semantic parsing utility that extracts over 200+ specialized tech skills from PDF/DOCX resumes. Utilizes spaCy, NLTK tokenizers, and sentence-transformers (all-MiniLM-L6-v2) to compute cosine similarity scores, delivering 35% higher precision than classic keyword matching algorithms.",
      techStack: ["Python", "Streamlit", "Sentence Transformers", "spaCy", "NLTK"],
      github: "https://github.com/SINGHALOK28/AI-Resume-Screening-Skill-Gap-Analyzer",
      demo: "https://github.com/SINGHALOK28/AI-Resume-Screening-Skill-Gap-Analyzer",
      demoImage: "/projects/resume_nlp.png",
      featured: true,
      status: "Stable v1.0",
      metrics: { semanticAccuracy: "90%", matchTime: "<2s", screeningReduction: "60%" },
      challenges: "Normalizing messy unstructured text from varying PDF schemas and font styling tags.",
      learnings: "Creating robust regex cleanup layers and utilizing custom vocabulary boundaries in spaCy's analyzer.",
      architectureUrl: "/architecture_nlp.png"
    },
    {
      id: "defence-osint",
      title: "Defence OSINT Intelligence Assistant",
      category: "Web Security Utilities",
      shortDesc: "Real-time threat level extension detecting entities and highlighting risks.",
      longDesc: "A modular Chrome extension designed to scan live web content, isolating defense-related terminology (countries, military assets, agencies). Uses a custom threat weighting engine to highlight threat indicators and categorize sites (LOW/MEDIUM/HIGH) with negligible browser impact.",
      techStack: ["JS", "Chrome Extension APIs", "NLP Analytics", "Threat Weighting"],
      github: "https://github.com/SINGHALOK28/defence-osint-extension",
      demo: "https://github.com/SINGHALOK28/defence-osint-extension",
      demoImage: "/projects/osint.png",
      featured: true,
      status: "Beta v0.8",
      metrics: { analysisLatency: "<1s", scanReduction: "70%", threatRecall: "91%" },
      challenges: "Avoiding browser lockups while asynchronously scanning heavy HTML documents.",
      learnings: "Offloading parsing logic to Chrome service workers and running element highlights on idle frames.",
      architectureUrl: "/architecture_osint.png"
    }
  ],

  achievements: [
    {
      title: "1st Place Winner - Colossus 2.0 Hackathon",
      issuer: "DR. B R Ambedkar Institute of Technology, BENGALURU",
      date: "2025",
      rarity: "legendary",
      desc: "Developed the top civic safety system prototype among regional college engineering teams.",
      reward: "Gold Medal Winner"
    },
    {
      title: "Top 40 Campus Leaderboard - GeeksforGeeks",
      issuer: "GeeksforGeeks Institution Rankings",
      date: "2025",
      rarity: "epic",
      desc: "Consistently solved complex algorithms and database structures, ranking in the campus top 40 profiles.",
      reward: "Coding Expert"
    },
    {
      title: "PES College Football Representative",
      issuer: "VTU Mysuru Division Athletics",
      date: "2024",
      rarity: "rare",
      desc: "Selected for the PES varsity squad competing in VTU inter-collegiate football tournaments.",
      reward: "Varsity Player"
    }
  ],

  certifications: [
    {
      title: "XPro DevOps Automation Certification",
      issuer: "XPro",
      date: "2024",
      credentialId: "XPRO-DEVOPS",
      credentialUrl: "/certificates/Xpro.pdf",
      pdfUrl: "/certificates/Xpro.pdf",
      skillsGained: ["Azure DevOps", "CI/CD", "YAML", "Git"],
      badgeColor: "#0078D7"
    },
    {
      title: "Deloitte Australia Data Analytics Job Simulation",
      issuer: "Deloitte Australia / Forage",
      date: "Sept 2025",
      credentialId: "FORAGE-DELOITTE-DA-SIM",
      credentialUrl: "https://theforage.com",
      pdfUrl: "https://www.theforage.com/completion-certificates/9PBTqmSxAf6zZTseP/io9DzWKe3PTsiS6GG_9PBTqmSxAf6zZTseP_g4DZ9vz7gdRFfWJgj_1757267638420_completion_certificate.pdf",
      skillsGained: ["Forensic Data Analysis", "Tableau Reporting", "Excel Aggregations", "Business Communication"],
      badgeColor: "#00a3e0"
    },
    {
      title: "Quantitative Research Virtual Experience",
      issuer: "JPMorgan Chase & Co. / Forage",
      date: "Sept 2025",
      credentialId: "FORAGE-JPMORGAN-QUANT",
      credentialUrl: "https://theforage.com",
      pdfUrl: "https://www.theforage.com/completion-certificates/Sj7temL583QAYpHXD/bWqaecPDbYAwSDqJy_Sj7temL583QAYpHXD_g4DZ9vz7gdRFfWJgj_1758031284558_completion_certificate.pdf",
      skillsGained: ["Algorithm Development", "Credit Analysis", "Data Analysis", "Financial Derivatives", "Python", "Statistics"],
      badgeColor: "#0A2F64"
    }
  ],

  leadership: [
    {
      position: "Vice President",
      organization: "DOT Club (Official CSE Data Science Club)",
      duration: "Active Role",
      details: [
        "Organizing and conducting technical events, seminars, and workshops for the Computer Science department.",
        "Mentoring and upskilling junior fellows with core Data Science technologies.",
        "Managing the tech ecosystem, event operations, and coordinating leadership responsibilities within the club."
      ]
    },
    {
      position: "PES College Coding Group Member",
      organization: "PES College of Engineering",
      duration: "2023 - 2026",
      details: [
        "Participated in campus competitive code sprints, reviewing algorithm optimization styles.",
        "Collaborated with developers in building full-stack applications and Chrome utils.",
        "Coordinated team projects for VTU regional hackathons and inter-college contests."
      ]
    }
  ]
};
