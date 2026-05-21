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
    resumeUrl: "#",
    email: "aloksinghchas01@gmail.com",
    phone: "+91 6207698566",
  },
  
  usernames: {
    github: "SINGHALOK28",
    leetcode: "singhalok19",
    codeforces: "singhalok19",
    codechef: "singhalok19",
    geeksforgeeks: "singhalok19",
    linkedin: "alok-singh",
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
      { name: "C++", category: "languages", level: "Advanced", value: 84, icon: "cpp", desc: "Primary language for algorithmic logic and data structures." },
      { name: "C", category: "languages", level: "Intermediate", value: 76, icon: "c", desc: "System-level fundamentals and memory allocation." },
      { name: "Java", category: "languages", level: "Intermediate", value: 78, icon: "java", desc: "Object-oriented structures and desktop integrations." },
      
      // Data Science Libraries
      { name: "Pandas", category: "libraries", level: "Expert", value: 88, icon: "pandas", desc: "Tabular data cleaning, transformations, and aggregation pipelines." },
      { name: "NumPy", category: "libraries", level: "Expert", value: 86, icon: "numpy", desc: "Linear algebra, multidimensional matrix arrays, and array operations." },
      { name: "Matplotlib", category: "libraries", level: "Advanced", value: 82, icon: "chart", desc: "Plotting static analytical charts and training performance visuals." },
      { name: "Seaborn", category: "libraries", level: "Advanced", value: 80, icon: "chart", desc: "Heatmaps, distributions, and customized statistical graphs." },
      { name: "Scikit-learn", category: "libraries", level: "Advanced", value: 84, icon: "scikit", desc: "Preprocessing pipelines, classification splits, and predictive estimators." },
      
      // NLP & AI
      { name: "spaCy", category: "nlp-ai", level: "Expert", value: 85, icon: "nlp", desc: "Industrial-grade entity extraction, tagging, and lemmatization." },
      { name: "NLTK", category: "nlp-ai", level: "Expert", value: 84, icon: "nlp", desc: "Text tokenization, sentiment heuristics, and vocabulary corpus parsing." },
      { name: "Sentence Transformers", category: "nlp-ai", level: "Expert", value: 88, icon: "transformer", desc: "Generating contextual embeddings and semantic similarity scores." },
      
      // Web & DB
      { name: "MySQL", category: "tools", level: "Expert", value: 85, icon: "mysql", desc: "Relational schema design, transactions, and indexing." },
      { name: "HTML & CSS", category: "tools", level: "Advanced", value: 82, icon: "web", desc: "Building responsive grids, navigation menus, and clean web forms." },
      { name: "JavaScript", category: "tools", level: "Advanced", value: 84, icon: "javascript", desc: "Creating extensions, script hooks, and asynchronous client events." },
      { name: "Tableau", category: "tools", level: "Advanced", value: 80, icon: "tableau", desc: "Creating visual dashboard sheets, forensic graphs, and business metrics." },
      
      // Developer Tools
      { name: "Git and GitHub", category: "dev-tools", level: "Expert", value: 90, icon: "git", desc: "Distributed version control, remote repos, and project workflows." },
      { name: "Chrome Extension", category: "dev-tools", level: "Advanced", value: 85, icon: "chrome", desc: "Building script injections and threat monitoring browser extensions." },
      { name: "Azure DevOps", category: "dev-tools", level: "Advanced", value: 80, icon: "azure", desc: "Automating builds, testing hooks, and branch triggers using YAML." },
      { name: "Streamlit", category: "dev-tools", level: "Advanced", value: 85, icon: "streamlit", desc: "Deploying local ML dashboard prototypes in pure Python." }
    ]
  },

  experiences: [
    {
      role: "Data Analytics Virtual Intern",
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
      role: "Project Developer & Team Lead",
      company: "PES College of Engineering, Mandya",
      duration: "2023 - 2027",
      achievements: [
        "Architected full-stack civic action platform 'Jan Saathi' incorporating Vertex AI classification and Google Maps API.",
        "Built Chrome extensions mapping OSINT defense data and computing threat classification levels in real-time.",
        "Configured custom sentence-transformer pipelines running on Streamlit instances to parse and evaluate resume profiles."
      ],
      techs: ["Python", "JavaScript", "Django REST", "React.js", "Azure DevOps"]
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
      github: "https://github.com/alok-singh",
      demo: "https://github.com/alok-singh",
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
      techStack: ["JavaScript", "Chrome Extension APIs", "NLP Analytics", "Threat Weighting"],
      github: "https://github.com/alok-singh",
      demo: "https://github.com/alok-singh",
      featured: true,
      status: "Beta v0.8",
      metrics: { analysisLatency: "<1s", scanReduction: "70%", threatRecall: "91%" },
      challenges: "Avoiding browser lockups while asynchronously scanning heavy HTML documents.",
      learnings: "Offloading parsing logic to Chrome service workers and running element highlights on idle frames.",
      architectureUrl: "/architecture_osint.png"
    },
    {
      id: "xpro-azure",
      title: "XPro DevOps automation",
      category: "Cloud Engineering",
      shortDesc: "Designed automated DevOps workflows integrating branch verification gates.",
      longDesc: "Designed and deployed continuous integration and delivery scripts inside Azure DevOps using YAML. Maintained source code versioning on Git/Azure Repos, and coordinated task cycles using Azure Boards.",
      techStack: ["Azure DevOps", "YAML", "Git & Azure Repos", "Azure Boards"],
      github: "https://github.com/alok-singh",
      demo: "https://github.com/alok-singh",
      featured: false,
      status: "Completed Run",
      metrics: { automationRate: "100%", buildDuration: "2.5m", sprintCycles: "6" },
      challenges: "Securing service connection keys and configuring custom runners for testing workflows.",
      learnings: "Structuring multi-stage Azure key vaults and deploying runner agents inside isolated network gates.",
      architectureUrl: "/architecture_xpro.png"
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
      title: "Deloitte Australia Data Analytics Job Simulation",
      issuer: "Deloitte Australia / Forage",
      date: "2024",
      credentialId: "FORAGE-DELOITTE-DA-SIM",
      credentialUrl: "https://theforage.com",
      pdfUrl: "/certificates/deloitte.pdf",
      skillsGained: ["Forensic Data Analysis", "Tableau Reporting", "Excel Aggregations", "Business Communication"],
      badgeColor: "#00a3e0"
    }
  ],

  leadership: [
    {
      position: "PES College Coding Group Member",
      organization: "PES College of Engineering",
      duration: "2023 - 2027",
      details: [
        "Participated in campus competitive code sprints, reviewing algorithm optimization styles.",
        "Collaborated with developers in building full-stack applications and Chrome utils.",
        "Coordinated team projects for VTU regional hackathons and inter-college contests."
      ]
    }
  ],

  blogs: [
    {
      slug: "leveraging-transformers-for-resume-semantic-matching",
      title: "Leveraging Transformers for Resume Semantic Matching",
      date: "May 2026",
      readingTime: "5 min read",
      tags: ["Python", "NLP", "Transformers"],
      difficulty: "Intermediate",
      summary: "Understand how contextual embeddings from sentence transformers score candidate profile similarity with 35% higher precision than keyword counts.",
      content: "When scanning resumes, simple keyword counts ignore context. A candidate who has 'led Python teams' is matches differently from 'wants to learn Python'. By generating semantic embeddings using sentence-transformers, we convert text into coordinate points..."
    },
    {
      slug: "building-chrome-extensions-for-security-scraping",
      title: "Building Chrome Extensions for Threat Detection Scraping",
      date: "Mar 2026",
      readingTime: "6 min read",
      tags: ["JavaScript", "APIs", "Security"],
      difficulty: "Advanced",
      summary: "A practical guide to building lightweight background service scripts that scan DOM trees without blocking screen interaction.",
      content: "Chrome extensions can easily lag user screens if they query the DOM synchronously. By offloading text analysis to chrome service worker threads and utilizing idle callbacks, we can run OSINT threat-scoring engines seamlessly..."
    }
  ],

  gallery: [
    {
      id: "colossus-win",
      type: "memory",
      title: "Colossus 2.0 Hackathon Winner",
      category: "Hackathons",
      date: "2025",
      image: "/gallery/colossus.jpg",
      tags: ["1st Place", "Bengaluru", "Team Work"],
      desc: "Winning Colossus 2.0 hackathon at Dr. B. R. Ambedkar Institute of Technology. What an amazing night!"
    },
    {
      id: "pes-football",
      type: "polaroid",
      title: "PES Varsity Football Match",
      category: "Sports",
      date: "2024",
      image: "/gallery/football.jpg",
      tags: ["VTU Division", "Football", "Squad"],
      desc: "PES college squad before the kickoff in the VTU inter-collegiate tournament."
    }
  ]
};
