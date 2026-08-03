import { SubjectItem, FeatureItem, FormatItem } from "./types";

export const ACADEMY_INFO = {
  name: "Brainy Bunch Learning Academy",
  tagline: "Unlocking Every Child's Brilliance & Academic Confidence",
  locationShort: "Irving, TX",
  locationFull: "TBD",
  regionArea: "Irving, Las Colinas, Coppell & Dallas Area (+ Online Anywhere)",
  primaryPhone: "(469) 387-7880",
  //secondaryPhone: "(469) 555-0182",
  email: "lpturaga26@gmail.com",
  hourlyRate: 25,
  grades: "K – 8th Grade Focus",
  totalClasses: 5,
  operatingHours: [
    { days: "Monday – Friday", hours: "8:00 AM – 5:00 PM" },
  ],
  founders: [
    {
      name: "Priyanka Turaga",
      role: "Founder & Tutor",
      bio: "Additional information to be added",
      initials: "PT",
    },
    //{
    //  name: "Prof. Rajesh Kumar",
    //  role: "Co-Founder & Head of STEM Studies",
    //  bio: "Former educator and passionate mentor dedicated to making math & science engaging, intuitive, and fun.",
    //  initials: "RK",
    //},
  ],
};

export const WHY_US_FEATURES: FeatureItem[] = [
  {
    id: "small-classes",
    title: "Small Micro-Groups & 1-on-1 Focus",
    description: "Whether in 1-on-1 or tiny micro-groups (max 4 students), every student receives undivided individual attention and targeted guidance.",
    stat: "1:1 & Micro",
    statLabel: "Dedicated Attention",
    iconName: "Users",
  },
  {
    id: "passionate-tutors",
    title: "Passionate & Vetted Educators",
    description: "Our instructors are background-checked subject experts trained to explain concepts with patience, clarity, and enthusiasm.",
    stat: "100%",
    statLabel: "Vetted Tutors",
    iconName: "GraduationCap",
  },
  {
    id: "tailored-plans",
    title: "Customized Learning Plans",
    description: "No cookie-cutter worksheets. We conduct a diagnostic assessment to build a personalized roadmap suited to your child's pace.",
    stat: "Free",
    statLabel: "Diagnostic Assessment",
    iconName: "Target",
  },
  {
    id: "flexible-scheduling",
    title: "Flexible Schedules & Easy Rescheduling",
    description: "Convenient weekday afternoon and evening slots. Easily adapt sessions around sports and family life.",
    stat: "Weekdays",
    statLabel: "Flexible Slots",
    iconName: "Clock",
  },
  {
    id: "proven-confidence",
    title: "Proven Academic Boost & Confidence",
    description: "Beyond grade improvements, we cultivate self-reliance, critical thinking habits, and a genuine love for learning.",
    stat: "98%",
    statLabel: "Parent Satisfaction",
    iconName: "TrendingUp",
  },
];

export const SUBJECTS_LIST: SubjectItem[] = [
  {
    id: "english",
    title: "English",
    category: "Language Arts",
    iconName: "BookOpen",
    badge: "Core K-8",
    description: "Comprehensive English instruction focusing on reading comprehension, vocabulary expansion, literature study, and critical thinking.",
    keyTopics: ["Reading Comprehension", "Vocabulary Building", "Book Analysis", "Critical Reading"],
    colorTheme: {
      bg: "bg-purple-50/80 hover:bg-purple-100/90",
      border: "border-purple-200",
      text: "text-purple-900",
      badgeBg: "bg-purple-200 text-purple-900 font-bold border border-purple-300",
    },
  },
  {
    id: "grammar-spelling-handwriting",
    title: "Grammar, Spelling & Handwriting",
    category: "Language Arts",
    iconName: "PenTool",
    badge: "Essential Skills",
    description: "Targeted skill-building in sentence structure, correct spelling rules, punctuation mechanics, and neat handwriting techniques.",
    keyTopics: ["Grammar Rules & Punctuation", "Spelling Patterns", "Print & Cursive Handwriting", "Composition Mechanics"],
    colorTheme: {
      bg: "bg-yellow-50/80 hover:bg-yellow-100/90",
      border: "border-yellow-200",
      text: "text-amber-950",
      badgeBg: "bg-yellow-200 text-amber-900 font-bold border border-yellow-300",
    },
  },
  {
    id: "math-k8",
    title: "Math (All Levels K-8)",
    category: "STEM Focus",
    iconName: "Calculator",
    badge: "Most Popular",
    description: "Full coverage of K-8 mathematics, including foundational arithmetic, fractions, decimals, word problems, Pre-Algebra, and Geometry concepts.",
    keyTopics: ["K-5 Math Foundations", "Fractions, Ratios & Decimals", "Pre-Algebra & Word Problems", "Geometry Fundamentals"],
    colorTheme: {
      bg: "bg-emerald-50/80 hover:bg-emerald-100/90",
      border: "border-emerald-200",
      text: "text-emerald-950",
      badgeBg: "bg-emerald-200 text-emerald-900 font-bold border border-emerald-300",
    },
  },
  {
    id: "history-3-7",
    title: "History (3rd - 7th Grade)",
    category: "Humanities",
    iconName: "Globe",
    badge: "Grades 3-7",
    description: "Engaging history program covering Early World Civilizations, US History, State History, Geography, and Civic principles for 3rd through 7th graders.",
    keyTopics: ["US History & Foundations", "Ancient & World History", "Texas & State History", "Map Skills & Geography"],
    colorTheme: {
      bg: "bg-yellow-50/80 hover:bg-yellow-100/90",
      border: "border-yellow-200",
      text: "text-amber-950",
      badgeBg: "bg-amber-200 text-amber-900 font-bold border border-amber-300",
    },
  },
  {
    id: "science",
    title: "Science",
    category: "STEM Focus",
    iconName: "Atom",
    badge: "Interactive",
    description: "Fun, hands-on science concepts including Earth & Space Science, Life Sciences, Physics basics, and the Scientific Method.",
    keyTopics: ["Life & Biological Science", "Earth & Space Science", "Physical Science Basics", "Scientific Method & Inquiry"],
    colorTheme: {
      bg: "bg-purple-50/80 hover:bg-purple-100/90",
      border: "border-purple-200",
      text: "text-purple-950",
      badgeBg: "bg-purple-200 text-purple-900 font-bold border border-purple-300",
    },
  },
];

export const FORMATS_LIST: FormatItem[] = [
  {
    id: "in-person",
    title: "In-Person Facility",
    tagline: "Irving, TX Campus Environment",
    iconName: "Building2",
    features: [
      "Quiet learning pods & collaborative tables",
      "Hands-on learning manipulatives and physical books",
      "Distraction-free environment supervised by expert tutors",
      "Conveniently located at MacArthur Blvd in Irving",
    ],
    bestFor: "Students who thrive in tactile, face-to-face environments.",
  },
  {
    id: "online",
    title: "Online Live Interactive",
    tagline: "Learn From Home Anywhere in DFW",
    iconName: "Video",
    features: [
      "HD live video with interactive digital whiteboards",
      "Session notes sent to parents after every class",
      "Interactive quizzes and visual practice exercises",
      "Zero commute time — comfortable learning from home",
    ],
    bestFor: "Busy family schedules or learning from home comfort.",
  },
  {
    id: "one-on-one",
    title: "1-on-1 Dedicated Sessions",
    tagline: "100% Customized Pace",
    iconName: "UserCheck",
    features: [
      "Entire session focused exclusively on your child's curriculum",
      "Targeted remediation for weak spots & acceleration for advanced topics",
      "Direct weekly feedback between tutor and parents",
      "Paced exactly to your child's learning speed",
    ],
    bestFor: "Students needing intensive support or grade acceleration.",
  },
];

export const FAQS_LIST = [
  {
    question: "What are your tutoring rates?",
    answer: "We are currently finalizing our pricing structure. Contact us for a free initial assessment and we'll share current rates with you — no hidden fees or surprise registration costs.",
  },
  {
    question: "Do you offer a free initial assessment?",
    answer: "Yes! Before starting, we offer a free consultation and diagnostic assessment to identify your child's current academic level and learning goals.",
  },
  {
    question: "What subjects and grades are covered?",
    answer: "We offer English, Grammar/Spelling/Handwriting, Math (all levels K-8th grade), History (3rd-7th grade), and Science.",
  },
  {
    question: "Where is the Irving location?",
    answer: "Our academy facility is located at 1200 N MacArthur Blvd, Suite 210, Irving, TX 75061 — conveniently accessible from Las Colinas, Coppell, and the Dallas area.",
  },
];
