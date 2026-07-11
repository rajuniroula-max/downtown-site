/* ==========================================================================
   TYPE DEFINITIONS (Matching Supabase schemas to be defined in Stage 5)
   ========================================================================== */

export interface Destination {
  id: string;
  slug: string; // e.g. "australia", "usa"
  country: string; // e.g. "Australia", "United States"
  flagIcon: string; // e.g. "🇦🇺"
  universitiesCount: string;
  badge: string;
  tagline: string;
  heroImage: string;
  whyStudyText: string;
  whyStudyPoints: string[];
  costOfLiving: {
    rent: string;
    food: string;
    transport: string;
    overallEstimate: string;
  };
  visaRequirements: {
    title: string;
    details: string;
  }[];
  popularCourses: string[];
}

export interface TestPrep {
  id: string;
  slug: string; // e.g. "ielts", "pte"
  name: string;
  tagline: string;
  overview: string;
  syllabusPoints: string[];
  duration: string;
  pricing: string;
  classSchedule: {
    batch: string;
    timing: string;
    instructor: string;
  }[];
  faq: {
    question: string;
    answer: string;
  }[];
}

export interface University {
  id: string;
  slug: string; // e.g. "anu-australia"
  name: string;
  country: string; // e.g. "Australia"
  city: string;
  logo: string;
  aboutText: string;
  coursesOffered: string[];
  admissionRequirements: string[];
  galleryImages: string[];
  isFeatured?: boolean;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  detailedContent: string;
  iconName: string; // to resolve dynamically
  processSteps: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // HTML/markdown style content
  category: string;
  date: string;
  author: string;
  readTime: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  mapIframe: string;
}

export interface Testimonial {
  id: string;
  name: string;
  destination: string;
  initials: string;
  quote: string;
  rating: number;
}

/* ==========================================================================
   MOCK DATASETS (Ready for database integration)
   ========================================================================== */

export const mockDestinations: Destination[] = [
  {
    id: "1",
    slug: "australia",
    country: "Australia",
    flagIcon: "🇦🇺",
    universitiesCount: "42",
    badge: "Most Popular",
    tagline: "Study in Australia: World-Class Education & Vibrant Student Life",
    heroImage: "/images/destinations/australia.jpg",
    whyStudyText: "Australia offers high-quality qualifications, excellent support services for international students, and opportunities to gain work experience while studying. It's renowned for its world-class research institutes and highly livable cities.",
    whyStudyPoints: [
      "Universities consistently ranked in the global Top 100.",
      "Up to 2-4 years of post-study work rights depending on study location.",
      "Work up to 48 hours per fortnight during study semesters.",
      "High standard of living and multicultural society."
    ],
    costOfLiving: {
      rent: "AUD 180 - AUD 440 per week",
      food: "AUD 80 - AUD 200 per week",
      transport: "AUD 30 - AUD 70 per week",
      overallEstimate: "AUD 21,041 per year (standard student visa minimum)"
    },
    visaRequirements: [
      {
        title: "Confirmation of Enrolment (CoE)",
        details: "An official document issued by your university confirming you have accepted their offer and paid the deposit."
      },
      {
        title: "Genuine Student (GS) Requirement",
        details: "Evidence demonstrating your true intention to study in Australia, including educational background, local ties, and career goals."
      },
      {
        title: "Financial Capacity Documentation",
        details: "Proof of funds covering one year of tuition fees, living costs, travel expenses, and health insurance."
      },
      {
        title: "English Language Proficiency",
        details: "Minimum scores in tests like IELTS (typically 6.0 or 6.5) or PTE Academic (58 or higher)."
      }
    ],
    popularCourses: ["Information Technology", "Business & MBA", "Nursing & Public Health", "Engineering", "Hospitality Management"]
  },
  {
    id: "2",
    slug: "uk",
    country: "United Kingdom",
    flagIcon: "🇬🇧",
    universitiesCount: "130+",
    badge: "Fast-Track Degrees",
    tagline: "Study in the UK: Historic Tradition and Accelerated Programs",
    heroImage: "/images/destinations/uk.jpg",
    whyStudyText: "The UK is home to some of the world's oldest and most prestigious universities. Accelerated Master's degrees can be completed in just one year, reducing tuition costs and living expenses considerably.",
    whyStudyPoints: [
      "1-year Master's degrees and 3-year Bachelor's degrees.",
      "2-year Post-Study Work Visa (Graduate Route).",
      "NHS health surcharge provides complete healthcare access.",
      "Globally recognized degrees with rich academic pedigree."
    ],
    costOfLiving: {
      rent: "GBP 120 - GBP 250 per week",
      food: "GBP 40 - GBP 90 per week",
      transport: "GBP 20 - GBP 50 per week",
      overallEstimate: "GBP 9,207 - GBP 12,006 per year (embassy requirements depending on location)"
    },
    visaRequirements: [
      {
        title: "Confirmation of Acceptance for Studies (CAS)",
        details: "A unique reference number issued by your UK university confirming your course details."
      },
      {
        title: "Financial Maintenance Funds",
        details: "Must show £1,334 per month (for up to 9 months) if studying in London, or £1,023 per month if outside London, held in an approved bank for 28 consecutive days."
      },
      {
        title: "English Language Assessment",
        details: "Typically requires IELTS Academic (minimum 6.0 overall, no band less than 5.5) or university equivalent."
      }
    ],
    popularCourses: ["Data Science & Analytics", "Finance & Accountancy", "Public Health", "Law", "Mechanical & Aerospace Engineering"]
  },
  {
    id: "3",
    slug: "usa",
    country: "United States",
    flagIcon: "🇺🇸",
    universitiesCount: "4000+",
    badge: "Ivy League Hub",
    tagline: "Study in the USA: Innovation, Flexibility & Leading Research",
    heroImage: "/images/destinations/usa.jpg",
    whyStudyText: "The United States is the premier global hub for higher education. Offering unmatched academic flexibility, it boasts the largest selection of universities and allows students to choose their majors after exploring multiple subjects.",
    whyStudyPoints: [
      "Home to major Ivy League institutions and top-tier research universities.",
      "OPT (Optional Practical Training) allows STEM graduates to work for up to 3 years.",
      "Wide range of academic scholarships and assistantships.",
      "Diverse campus environments and dynamic student organizations."
    ],
    costOfLiving: {
      rent: "USD 500 - USD 1,200 per month",
      food: "USD 200 - USD 400 per month",
      transport: "USD 50 - USD 150 per month",
      overallEstimate: "USD 12,000 - USD 18,000 per year"
    },
    visaRequirements: [
      {
        title: "Form I-20",
        details: "An official certificate issued by the US school stating your program parameters and estimated costs."
      },
      {
        title: "SEVIS Fee Payment",
        details: "Receipt proving payment of the SEVIS fee before scheduling your F-1 Visa interview."
      },
      {
        title: "DS-160 Confirmation & Visa Interview",
        details: "Completion of the online visa application and scheduling of physical fingerprinting and interview sessions."
      },
      {
        title: "Financial Sufficiency Proof",
        details: "Bank statements showing funds equal to or greater than the total cost of attendance listed on your I-20."
      }
    ],
    popularCourses: ["Computer Science", "Artificial Intelligence", "Business Analytics", "Biomedical Sciences", "Electrical Engineering"]
  },
  {
    id: "4",
    slug: "canada",
    country: "Canada",
    flagIcon: "🇨🇦",
    universitiesCount: "100+",
    badge: "PR Pathways",
    tagline: "Study in Canada: High Standard of Living and PR Pathways",
    heroImage: "/images/destinations/canada.jpg",
    whyStudyText: "Canada offers outstanding academic standard with exceptionally safe and welcoming communities. It is highly sought-after due to its post-graduation work permit (PGWP) and pathways leading to Permanent Residency (PR).",
    whyStudyPoints: [
      "Top-tier public colleges and universities offering hands-on coop work options.",
      "Post-Graduation Work Permit (PGWP) up to 3 years.",
      "Favorable permanent residency pathways via Express Entry & PNP.",
      "Affordable tuition fees compared to other popular study hubs."
    ],
    costOfLiving: {
      rent: "CAD 500 - CAD 1,100 per month",
      food: "CAD 150 - CAD 300 per month",
      transport: "CAD 80 - CAD 130 per month",
      overallEstimate: "CAD 20,635 per year (mandatory GIC deposit system)"
    },
    visaRequirements: [
      {
        title: "Letter of Acceptance (LOA)",
        details: "Acceptance letter issued by a Designated Learning Institution (DLI) in Canada."
      },
      {
        title: "Guaranteed Investment Certificate (GIC)",
        details: "A mandatory purchase of a CAD 20,635 certificate from a Canadian bank to prove living funds."
      },
      {
        title: "Study Permit Application & Biometrics",
        details: "Submission of visa application online under the SDS (Student Direct Stream) or regular stream."
      }
    ],
    popularCourses: ["Cyber Security", "MBA & Commerce", "Supply Chain Management", "Project Management", "Data Science"]
  },
  {
    id: "5",
    slug: "new-zealand",
    country: "New Zealand",
    flagIcon: "🇳🇿",
    universitiesCount: "8",
    badge: "Safe & Serene",
    tagline: "Study in New Zealand: Safe Learning & Practical Industry Skills",
    heroImage: "/images/destinations/newzealand.jpg",
    whyStudyText: "New Zealand offers a uniquely supportive learning environment. With all 8 of its public universities ranked in the QS Global Top 3%, it is highly respected for its practical, real-world educational focus.",
    whyStudyPoints: [
      "Every university is public and ranked in the global top tier.",
      "Stunningly safe, peaceful, and clean study environment.",
      "Post-study work rights up to 3 years.",
      "Exceptional student care services and codes of practice."
    ],
    costOfLiving: {
      rent: "NZD 150 - NZD 350 per week",
      food: "NZD 60 - NZD 120 per week",
      transport: "NZD 20 - NZD 50 per week",
      overallEstimate: "NZD 20,000 per year (minimum visa requirement)"
    },
    visaRequirements: [
      {
        title: "Offer of Place",
        details: "Acceptance letter from an approved university, college, or private training establishment (PTE)."
      },
      {
        title: "Evidence of Tuition Payment",
        details: "Receipt showing payment of first-year tuition fees, which is usually required before visa final approval."
      },
      {
        title: "Proof of Financial Capacity",
        details: "Must show at least NZD 20,000 per year of study for living costs."
      }
    ],
    popularCourses: ["Agribusiness", "Information Technology", "Tourism & Leisure Management", "Civil Engineering", "Biotechnology"]
  },
  {
    id: "6",
    slug: "europe",
    country: "Europe",
    flagIcon: "🇪🇺",
    universitiesCount: "500+",
    badge: "Budget-Friendly",
    tagline: "Study in Europe: Rich History, Free Tuition & Schengen Mobility",
    heroImage: "/images/destinations/europe.jpg",
    whyStudyText: "European countries, particularly Germany and France, offer premier education at very low costs. Many public universities offer English-taught degrees with free tuition, and study visas allow free travel across the Schengen Area.",
    whyStudyPoints: [
      "Free or extremely low tuition fees in German public universities.",
      "Opportunity to learn a new language and experience multiple cultures.",
      "Schengen visa allows travel to 29 European countries.",
      "Excellent post-study work and residency options."
    ],
    costOfLiving: {
      rent: "EUR 300 - EUR 700 per month",
      food: "EUR 150 - EUR 250 per month",
      transport: "EUR 30 - EUR 80 per month",
      overallEstimate: "EUR 11,208 per year (German Blocked Account requirement)"
    },
    visaRequirements: [
      {
        title: "Admission Letter",
        details: "Confirmation of admission to a university in Germany, France, or another European nation."
      },
      {
        title: "Blocked Account (Germany)",
        details: "A special account holding EUR 11,208 to verify you have sufficient funds to live for one year."
      },
      {
        title: "Health Insurance Certificate",
        details: "Travel insurance and local public health cover setup required before arrival."
      }
    ],
    popularCourses: ["Automotive Engineering", "Renewable Energy", "International Business", "Computer Engineering", "Data Science"]
  }
];

// Test Prep Class Details
export const mockTestPrep: TestPrep[] = [
  {
    id: "tp-1",
    slug: "ielts",
    name: "IELTS Academic",
    tagline: "IELTS Masterclass: Achieve Your Target Band (7.0+ Overall)",
    overview: "The International English Language Testing System (IELTS) is the world's most popular English language proficiency test for higher education and global migration. Our program focuses on advanced strategies across Listening, Reading, Writing, and Speaking.",
    syllabusPoints: [
      "Listening: Practice on audio accents, maps labeling, and matching lists.",
      "Reading: Skimming and scanning techniques, understanding 'True/False/Not Given'.",
      "Writing: Task 1 (Report writing for charts/diagrams) & Task 2 (Opinion/Discussion essays).",
      "Speaking: Mock speaking assessments, interactive vocabulary training, and fluency drills."
    ],
    duration: "6 Weeks (Sun - Fri)",
    pricing: "NPR 5,500 (Including study materials & mock tests)",
    classSchedule: [
      { batch: "Morning Batch A", timing: "7:00 AM - 8:30 AM", instructor: "Mr. Prabin Shrestha" },
      { batch: "Morning Batch B", timing: "9:00 AM - 10:30 AM", instructor: "Mr. Prabin Shrestha" },
      { batch: "Afternoon Batch", timing: "1:00 PM - 2:30 PM", instructor: "Mrs. Alina Subedi" },
      { batch: "Evening Batch", timing: "5:00 PM - 6:30 PM", instructor: "Mr. Ramesh Karki" }
    ],
    faq: [
      {
        question: "How long is the IELTS test score valid?",
        answer: "Your IELTS test score is valid for 2 years from the date of the test."
      },
      {
        question: "Does the course fee cover test registration?",
        answer: "No, the course fee only covers classes, study materials, and mock tests. Test registration fees must be paid separately to British Council or IDP."
      },
      {
        question: "Are mock tests conducted regularly?",
        answer: "Yes, we conduct full-length mock tests every Sunday morning, replicating actual test conditions with descriptive reviews."
      }
    ]
  },
  {
    id: "tp-2",
    slug: "pte",
    name: "PTE Academic",
    tagline: "PTE Prep: Crack Computer-Scored English Proficiency",
    overview: "Pearson Test of English (PTE) Academic is a computer-based English language test accepted by universities and governments. We provide real-time software practice using AI scoring engines to familiarize you with test patterns.",
    syllabusPoints: [
      "Speaking & Writing: Read Aloud, Describe Image, Summarize Written Text.",
      "Reading: Fill in the blanks (Reading & Writing), Re-order Paragraphs.",
      "Listening: Summarize Spoken Text, Write from Dictation, Highlight Incorrect Words.",
      "AI Mock Test Review: Performance breakdown based on pronunciation, oral fluency, and grammar."
    ],
    duration: "5 Weeks (Sun - Fri)",
    pricing: "NPR 6,000 (Including PTE portal access)",
    classSchedule: [
      { batch: "Morning Batch A", timing: "8:00 AM - 9:30 AM", instructor: "Mrs. Alina Subedi" },
      { batch: "Midday Batch", timing: "11:00 AM - 12:30 PM", instructor: "Mr. Ramesh Karki" },
      { batch: "Evening Batch", timing: "4:00 PM - 5:30 PM", instructor: "Mrs. Alina Subedi" }
    ],
    faq: [
      {
        question: "How is PTE different from IELTS?",
        answer: "PTE is entirely computer-based and scored by an AI engine, whereas IELTS can be paper-based or computer-delivered and includes human assessment for writing and speaking."
      },
      {
        question: "How fast do I get PTE scores?",
        answer: "Typically, PTE results are released within 2 to 5 business days."
      }
    ]
  },
  {
    id: "tp-3",
    slug: "toefl",
    name: "TOEFL iBT",
    tagline: "TOEFL Mastery: Intensive Lab-Based Instruction",
    overview: "The Test of English as a Foreign Language (TOEFL) is highly preferred by universities in the USA. Our lab-based classes focus on academic reading, integrated writing, and lectures-based listening tasks.",
    syllabusPoints: [
      "Reading: Academic passage comprehension, vocabulary, and inference questions.",
      "Listening: Lecture structures, conversation logs, note-taking strategies.",
      "Speaking: Integrated tasks combining reading/listening with spoken opinions.",
      "Writing: Academic discussion essays and summaries."
    ],
    duration: "6 Weeks (Sun - Fri)",
    pricing: "NPR 5,500 (Including mock practice tests)",
    classSchedule: [
      { batch: "Morning Batch", timing: "7:00 AM - 8:30 AM", instructor: "Mr. Ramesh Karki" },
      { batch: "Afternoon Batch", timing: "2:00 PM - 3:30 PM", instructor: "Mr. Prabin Shrestha" }
    ],
    faq: [
      {
        question: "What is the total score of TOEFL iBT?",
        answer: "The TOEFL iBT is scored out of 120 points, with 30 points allotted to each of the 4 sections."
      }
    ]
  },
  {
    id: "tp-4",
    slug: "sat",
    name: "SAT Prep",
    tagline: "Digital SAT: Advanced Reading, Writing & Math Prep",
    overview: "The Scholastic Assessment Test (SAT) is a standardized test widely used for college admissions in the United States. We cover both math principles and verbal critical reading components to help you score 1450+.",
    syllabusPoints: [
      "Reading & Writing: Craft & Structure, Information & Ideas, Expression of Ideas.",
      "Math: Heart of Algebra, Problem Solving & Data Analysis, Passport to Advanced Math.",
      "Calculator Strategies: Effectively navigating the Desmos graphing calculator interface.",
      "Full Mock Practices: Regular simulated test sessions using the Bluebook application."
    ],
    duration: "8 Weeks (Sun - Fri)",
    pricing: "NPR 8,000 (Includes official practice logs)",
    classSchedule: [
      { batch: "Morning Batch", timing: "6:30 AM - 8:00 AM", instructor: "Math: Mr. Sunil Devkota / Verbal: Mr. Raju Niroula" },
      { batch: "Evening Batch", timing: "5:30 PM - 7:00 PM", instructor: "Math: Mr. Sunil Devkota / Verbal: Mr. Raju Niroula" }
    ],
    faq: [
      {
        question: "What is a good SAT score?",
        answer: "A score of 1400 or above is considered excellent and puts you in a highly competitive position for scholarships at US colleges."
      }
    ]
  },
  {
    id: "tp-5",
    slug: "gre-gmat",
    name: "GRE & GMAT Prep",
    tagline: "Graduate Prep: Achieve Top Scores for Masters & MBA Programs",
    overview: "Designed for students aiming for graduate degrees or MBAs globally, our GMAT/GRE prep classes focus on quantitative reasoning, analytical writing, and integrated reasoning.",
    syllabusPoints: [
      "Quantitative: Arithmetic, Algebra, Geometry, Data Interpretation.",
      "Verbal: Sentence Equivalence, Text Completion, Reading Comprehension.",
      "Analytical Writing: Analytical writing tasks, structuring argument analyses.",
      "Mock Tests: Full-length adaptive testing simulations."
    ],
    duration: "8 Weeks (Sun - Fri)",
    pricing: "NPR 9,500 (Includes practice materials)",
    classSchedule: [
      { batch: "Morning Batch", timing: "7:00 AM - 8:30 AM", instructor: "Mr. Sunil Devkota" }
    ],
    faq: [
      {
        question: "How long is GMAT score validity?",
        answer: "Both GMAT and GRE scores are valid for 5 years from your test date."
      }
    ]
  }
];

// Partner Universities List
export const mockUniversities: University[] = [
  {
    id: "uni-1",
    slug: "anu-australia",
    name: "Australian National University (ANU)",
    country: "Australia",
    city: "Canberra",
    logo: "ANU",
    aboutText: "The Australian National University is a world-leading university in Australia's capital city, Canberra. ANU is consistently ranked among the top universities globally and is renowned for its intensive research and academic excellence.",
    coursesOffered: [
      "Bachelor of Information Technology",
      "Bachelor of Finance",
      "Master of Computing (Advanced)",
      "Master of Business Administration (MBA)",
      "Master of Public Health"
    ],
    admissionRequirements: [
      "Academic: Minimum 70% equivalent in High School (for Bachelor's) or 2.8+ GPA in Bachelor's (for Master's).",
      "English: IELTS Academic 6.5 overall (minimum 6.0 in each band) or PTE Academic 58+ overall."
    ],
    galleryImages: [
      "/images/univ/anu-1.jpg",
      "/images/univ/anu-2.jpg"
    ],
    isFeatured: true
  },
  {
    id: "uni-2",
    slug: "toronto-canada",
    name: "University of Toronto",
    country: "Canada",
    city: "Toronto",
    logo: "U of T",
    aboutText: "Founded in 1827, the University of Toronto has evolved into Canada's leading institution of learning, discovery, and knowledge creation. U of T is proud to be one of the world’s top research-intensive universities.",
    coursesOffered: [
      "Bachelor of Applied Science in Computer Engineering",
      "Bachelor of Commerce (Rotman Commerce)",
      "Master of Science in Applied Computing",
      "Master of Engineering in Civil Engineering"
    ],
    admissionRequirements: [
      "Academic: High marks in mathematics and related science courses (minimum 80% equivalent in GPA).",
      "English: IELTS Academic 7.0 overall (minimum 6.5 in each section) or TOEFL iBT 100 overall."
    ],
    galleryImages: [
      "/images/univ/toronto-1.jpg"
    ],
    isFeatured: true
  },
  {
    id: "uni-3",
    slug: "asu-usa",
    name: "Arizona State University",
    country: "United States",
    city: "Tempe, Arizona",
    logo: "ASU",
    aboutText: "Arizona State University is a premier public research university, recognized globally for innovation, academic excellence, and high-impact research. ASU is ranked #1 in the US for Innovation.",
    coursesOffered: [
      "BS in Software Engineering",
      "BS in Business Data Analytics",
      "MS in Computer Science",
      "MS in Finance",
      "MBA"
    ],
    admissionRequirements: [
      "Academic: High school GPA of 3.0 or equivalent. SAT/ACT scores are optional but recommended for scholarships.",
      "English: IELTS 6.0 overall or PTE 53+ overall."
    ],
    galleryImages: [
      "/images/univ/asu-1.jpg"
    ],
    isFeatured: true
  },
  {
    id: "uni-4",
    slug: "leeds-uk",
    name: "University of Leeds",
    country: "United Kingdom",
    city: "Leeds",
    logo: "Leeds",
    aboutText: "Established in 1904, the University of Leeds is one of the UK's largest higher education institutions and a member of the prestigious Russell Group. It is renowned for its research-led education.",
    coursesOffered: [
      "BSc in Computer Science",
      "BSc in Business Management",
      "MSc in International Business",
      "MSc in Data Science & Analytics"
    ],
    admissionRequirements: [
      "Academic: UK 2:1 equivalent degree or high school score of 75% above.",
      "English: IELTS Academic 6.5 overall (minimum 6.0 in each sub-score)."
    ],
    galleryImages: [
      "/images/univ/leeds-1.jpg"
    ],
    isFeatured: false
  },
  {
    id: "uni-5",
    slug: "auckland-nz",
    name: "University of Auckland",
    country: "New Zealand",
    city: "Auckland",
    logo: "Auckland",
    aboutText: "The University of Auckland is New Zealand's top-ranked university and is situated in the country's economic capital. It is host to over 40,000 students across multiple campuses.",
    coursesOffered: [
      "Bachelor of Engineering (Honours)",
      "Bachelor of Science in Information Technology",
      "Master of Professional Studies in Food Science",
      "Master of Management"
    ],
    admissionRequirements: [
      "Academic: Grade 12 scores with solid mathematics and English components.",
      "English: IELTS 6.0 or 6.5 overall depending on the level of study."
    ],
    galleryImages: [
      "/images/univ/auck-1.jpg"
    ],
    isFeatured: false
  },
  {
    id: "uni-6",
    slug: "munich-germany",
    name: "Munich Business School",
    country: "Europe",
    city: "Munich, Germany",
    logo: "MBS",
    aboutText: "Munich Business School is one of Germany's top-ranked private business schools. It offers English-medium Bachelors, Masters, and MBA degrees in International Business and Finance.",
    coursesOffered: [
      "Bachelor in International Business",
      "Master in International Business",
      "Master in Sports Business and Communication",
      "General MBA"
    ],
    admissionRequirements: [
      "Academic: High school transcripts and university entry exams. Personal interviews are mandatory.",
      "English: IELTS 6.5 overall or TOEFL iBT 85."
    ],
    galleryImages: [
      "/images/univ/munich-1.jpg"
    ],
    isFeatured: false
  }
];

// Expanded Services Mock Data
export const mockServices: Service[] = [
  {
    id: "srv-1",
    slug: "test-prep",
    title: "Test Preparation",
    shortDesc: "Intensive coaching for IELTS, PTE, TOEFL, and SAT with experienced trainers.",
    detailedContent: "Securing a top score in standard proficiency tests is a crucial step towards your admission and visa. We offer daily structured classes, mock exams under exact testing setups, and specialized material to prepare you.",
    iconName: "GraduationCap",
    processSteps: [
      "Diagnostic Assessment: Free test on enrollment to track initial capabilities.",
      "Strategic Coaching: Conceptual training on test parameters with expert trainers.",
      "Mock Tests: Full length mock tests every Sunday with detailed scoring reviews.",
      "Performance Counseling: Personalized feedback to bridge learning gaps."
    ]
  },
  {
    id: "srv-2",
    slug: "uni-application",
    title: "University Selection & Application",
    shortDesc: "Guidance on course selection and securing offer letters from partner universities.",
    detailedContent: "Choosing the correct course and institution is vital for your future. Our QEAC certified advisors evaluate your academic scores, budget constraints, and career plans to list matching universities.",
    iconName: "BookOpen",
    processSteps: [
      "Profiling: Analyzing your educational history and scores.",
      "Shortlisting: Recommending 3-5 universities based on compatibility.",
      "Application Preparation: Reviewing recommendations, letter statements, and drafting portfolios.",
      "Offer Letter Follow-ups: Coordinating with university admission directors for fast processing."
    ]
  },
  {
    id: "srv-3",
    slug: "visa-guidance",
    title: "Visa Documentation & Counselling",
    shortDesc: "Compiling accurate financial files, reviews, and visa mock interview coaching.",
    detailedContent: "Embassy documentation is highly strict. We evaluate bank statements, sponsor letters, tax returns, and statements of purpose (SOP) to confirm your visa application matches guidelines.",
    iconName: "FileText",
    processSteps: [
      "Financial Evaluation: Guidance on sponsor requirements, tax documents, and income reviews.",
      "SOP Editing: Structural reviews and feedback on your Statement of Purpose draft.",
      "File Compilation: Preparing checklists for visa submission portals.",
      "Mock Interviews: Live video sessions mirroring embassy interview standards."
    ]
  },
  {
    id: "srv-4",
    slug: "scholarships",
    title: "Scholarship & Financial Aid Support",
    shortDesc: "Finding university grants and merit scholarships to lower tuition fees.",
    detailedContent: "High-quality global education can be expensive. We analyze and suggest merit-based university grants, regional student scholarships, and graduate assistantships.",
    iconName: "Award",
    processSteps: [
      "Eligibility Scouting: Finding scholarships you qualify for.",
      "Application Review: Editing scholarship essay drafts.",
      "Submission: Uploading support portfolios before program deadlines."
    ]
  },
  {
    id: "srv-5",
    slug: "pre-departure",
    title: "Pre-Departure Briefing",
    shortDesc: "Workshops on foreign student life, flights, card services, and travel logs.",
    detailedContent: "Transitioning to a foreign country brings unexpected challenges. We host detailed pre-departure briefings explaining foreign custom rules, housing bookings, part-time work rights, and banking systems.",
    iconName: "Plane",
    processSteps: [
      "Briefing Seminars: Introducing foreign cultures and student guidelines.",
      "Housing Assistance: Introducing trusted off-campus housing networks.",
      "Flight Booking Support: Sourcing group student airfares."
    ]
  },
  {
    id: "srv-6",
    slug: "career-counselling",
    title: "Career & Stream Counselling",
    shortDesc: "Personalized profiling to match academic choices with global job paths.",
    detailedContent: "Our directors sit with you to map out your long-term career goals. We align your profile with prospective jobs in sectors like IT, Finance, Engineering, and Health across target destinations.",
    iconName: "HeartHandshake",
    processSteps: [
      "Psychometric Assessment: Optional evaluation of strengths.",
      "Global Market Mapping: Detailing employment markets in Australia, Canada, UK, and USA.",
      "Pathway Planning: Laying out stages from entry-level degrees to permanent residency."
    ]
  }
];

// Blog Posts Mock Data
export const mockBlogPosts: BlogPost[] = [
  {
    id: "blog-1",
    slug: "australia-visa-guide",
    title: "Essential Guide to Australia Student Visas for Fall 2026",
    excerpt: "Everything you need to know about the latest visa guidelines, financial requirements, and GTE criteria for Nepali students.",
    content: "<p>Australia has introduced major changes to its international student visa framework. The previous GTE (Genuine Temporary Entrant) has transitioned, and embassy criteria are stricter regarding student ties, income validation, and program continuity.</p><h4>Key updates you should prepare for:</h4><ul><li><strong>GS (Genuine Student) Requirements:</strong> Detailed questionnaire replacing the old SOP structure.</li><li><strong>Financial Funds:</strong> Evidence of at least AUD 21,041 for living costs.</li><li><strong>Sponsor Verification:</strong> Tax reviews and bank validation.</li></ul><p>Consult with our QEAC directors before filing your application to confirm details match current guidelines.</p>",
    category: "Visa Guide",
    date: "Jul 10, 2026",
    author: "Prabin Shrestha",
    readTime: "5 Min Read"
  },
  {
    id: "blog-2",
    slug: "us-scholarships",
    title: "Understanding Scholarships at US Universities",
    excerpt: "Learn how to secure up to 100% tuition coverage. Discover critical deadlines, essay requirements, and CSS profiling guidelines.",
    content: "<p>Studying in the USA can be highly affordable if you know how to apply for scholarships. Many private and public institutions offer full-tuition waivers, assistantships, and financial aid to eligible Nepalese applicants.</p><h4>How to stand out:</h4><ol><li><strong>SAT Scores:</strong> High scores (1400+) significantly enhance merit waiver eligibility.</li><li><strong>Academic Essays:</strong> Drafting descriptive personal statements.</li><li><strong>CSS Profile:</strong> Accurate financial details showing your financial need.</li></ol><p>Start your applications at least 10 months prior to session intakes to ensure consideration.</p>",
    category: "Scholarships",
    date: "Jul 05, 2026",
    author: "Soniya Thapa",
    readTime: "6 Min Read"
  },
  {
    id: "blog-3",
    slug: "canada-pathways",
    title: "Why Canada Remains a Top Study Choice in 2026",
    excerpt: "Analyzing post-graduation work permit updates, living costs, and student pathways to permanent residency across Canadian provinces.",
    content: "<p>Canada is highly respected for its safety, living quality, and permanent residency (PR) pathways. While PGWP rules have been refined, graduates in tech, healthcare, and engineering still have favorable PR routes under Express Entry and PNP.</p><h4>Top pathways to evaluate:</h4><ul><li><strong>SDS Stream:</strong> Quick visa processing with a GIC deposit.</li><li><strong>Provincial Nominee Program (PNP):</strong> Specialized options for provincial graduates.</li><li><strong>STEM OPT:</strong> Opportunities to gain industry work experience.</li></ul><p>Contact our advisors to see which province best fits your long-term career goals.</p>",
    category: "Study Abroad",
    date: "Jun 28, 2026",
    author: "Raju Niroula",
    readTime: "5 Min Read"
  }
];

// Team Members
export const mockTeamMembers: TeamMember[] = [
  {
    id: "team-1",
    name: "Raju Niroula",
    role: "Managing Director / Senior Counsellor",
    bio: "Over 12 years of experience in student counseling. Raju is a qualified advisor specializing in USA and Canada admissions.",
    image: "RN"
  },
  {
    id: "team-2",
    name: "Prabin Shrestha",
    role: "Director of Australia Operations (QEAC M125)",
    bio: "A certified Australia advisor with years of experience compiling student files and GTE/GS declarations.",
    image: "PS"
  },
  {
    id: "team-3",
    name: "Soniya Thapa",
    role: "Senior Admissions Officer",
    bio: "Coordinates university applications and scholarship scouting with institutional partners.",
    image: "ST"
  }
];

// Branch Offices
export const mockBranches: Branch[] = [
  {
    id: "branch-1",
    name: "Kathmandu Head Office",
    address: "Putalisadak, Kathmandu (Opposite Kumari Bank)",
    phone: "+977-1-4412345",
    email: "kathmandu@downtown.edu.np",
    mapIframe: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.339247781534!2d85.32049617546686!3d27.706787876185816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19a4a75ab1c1%3A0x6335191cf0eb9f9f!2sPutalisadak%2C%20Kathmandu!5e0!3m2!1sen!2snp!4v1700000000000!5m2!1sen!2snp"
  },
  {
    id: "branch-2",
    name: "Pokhara Branch Office",
    address: "Chipledhunga, Pokhara",
    phone: "+977-61-532145",
    email: "pokhara@downtown.edu.np",
    mapIframe: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3515.7950920406087!2d83.98236177548489!3d28.21349077589632!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399594511677c7f3%3A0xd6b74e899268f7cf!2sChipledhunga%2C%20Pokhara!5e0!3m2!1sen!2snp!4v1700000000001!5m2!1sen!2snp"
  }
];

// Testimonials
export const mockTestimonials: Testimonial[] = [
  {
    id: "t-1",
    name: "Sajina Shrestha",
    destination: "University of Technology Sydney (UTS), Australia",
    initials: "SS",
    quote: "Downtown Consultancy guided me so well throughout my visa application for Australia. Their visa guidance class helped me gain confidence for my GTE review. Highly recommended if you want transparent and honest processing.",
    rating: 5
  },
  {
    id: "t-2",
    name: "Rohan Basnet",
    destination: "University of Texas at Arlington, USA",
    initials: "RB",
    quote: "Their SAT classes were outstanding. The instructors provided personal attention and focused strategy logs which helped me score 1480. My USA study visa got approved in the first attempt thanks to their interview prep sessions.",
    rating: 5
  },
  {
    id: "t-3",
    name: "Kiran Adhikari",
    destination: "University of Leeds, UK",
    initials: "KA",
    quote: "Applying for UK universities seemed complex until I came to Downtown. They finalized my application within a week and coached me thoroughly for the university interview. I got my visa without any delays.",
    rating: 5
  },
  {
    id: "t-4",
    name: "Sujat Kafle",
    destination: "York University, Canada",
    initials: "SK",
    quote: "The pre-departure briefings and housing support services at Downtown were outstanding. They helped me lock in a student apartment in Toronto before boarding my flight. 10/10 consultancy support.",
    rating: 5
  }
];
