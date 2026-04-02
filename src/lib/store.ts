// ─── TYPES ───────────────────────────────────────────────────────────────────

export type BlogCategory = "News" | "Programs" | "Community" | "Impact";
export type BlogStatus = "Published" | "Draft";
export type EventType = "Workshop" | "Graduation" | "Open Day" | "Community";
export type EventStatus = "Upcoming" | "Past";
export type AppStatus = "Pending" | "Accepted" | "Enrolled" | "Rejected";
export type EnquiryType = "application" | "volunteer" | "general";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  category: BlogCategory;
  status: BlogStatus;
  author: string;
  coverImage: string;
  date: string;
  readTime: number;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  time: string;
  location: string;
  type: EventType;
  capacity: number;
  status: EventStatus;
  rsvps: RSVP[];
}

export interface RSVP {
  id: string;
  name: string;
  email: string;
  seats: number;
  date: string;
  eventId: string;
}

export interface ProgramRegistration {
  id: string;
  programId: string;
  programTitle: string;
  name: string;
  email: string;
  phone: string;
  dob: string;
  location: string;
  education: string;
  employment: string;
  motivation: string;
  extraAnswer: string;
  status: AppStatus;
  date: string;
  cohortId?: string;
}

export interface Cohort {
  id: string;
  programId: string;
  programTitle: string;
  name: string;
  startDate: string;
  endDate: string;
  capacity: number;
  enrolled: string[]; // registration IDs
  status: "Active" | "Completed" | "Upcoming";
}

export interface Certificate {
  id: string;
  certId: string;
  graduateName: string;
  programTitle: string;
  programId: string;
  cohortName: string;
  issueDate: string;
  cohortId: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  enquiryType: EnquiryType;
  program?: string;
  message: string;
  date: string;
  read: boolean;
}

// ─── SEED DATA ────────────────────────────────────────────────────────────────

export const SEED_POSTS: BlogPost[] = [
  {
    id: "post-1",
    title: "Adele Foundation Reaches 10,000 Graduates Across Nigeria",
    slug: "adele-10000-graduates-nigeria",
    excerpt:
      "From Lagos to Kano, thousands of young Nigerians have gained life-changing skills through our programs.",
    body: `What started in a small training space in Yaba, Lagos has grown into a nationwide movement. Today, we celebrate over 10,000 graduates across Nigeria.

These are not just numbers — they are real people building businesses, supporting families, and transforming their communities.

From tailoring hubs in Aba to tech freelancers in Abuja, the ripple effect continues to grow.

Our mission remains simple: equip Nigerians with practical skills for economic independence.`,
    category: "News",
    status: "Published",
    author: "Adele Foundation",
    coverImage:
      "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=1200&q=80",
    date: "2025-03-10",
    readTime: 4,
  },

  {
    id: "post-2",
    title: "How Young Women in Lagos Are Building Fashion Brands",
    slug: "lagos-fashion-women",
    excerpt:
      "Graduates from our tailoring program are launching thriving fashion businesses in Lagos.",
    body: `In Surulere and Yaba, a new wave of young women are building fashion brands powered by skill and creativity.

Through our Tailoring & Textiles program, participants learn not just how to sew, but how to build a business.

Many of our graduates now run Instagram-based fashion brands, taking custom orders and growing steady income streams.`,
    category: "Programs",
    status: "Published",
    author: "Adele Foundation",
    coverImage:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
    date: "2025-02-18",
    readTime: 5,
  },

  {
    id: "post-3",
    title: "Digital Skills Are Opening New Doors for Nigerian Youth",
    slug: "digital-skills-nigeria",
    excerpt:
      "Digital literacy is becoming essential for economic survival in Nigeria.",
    body: `From freelancing to remote jobs, digital skills are creating new opportunities for young Nigerians.

Our Digital Literacy program equips participants with practical tools — from email communication to online business skills.

Many graduates now earn income through freelancing platforms, social media marketing, and remote work.`,
    category: "Programs",
    status: "Published",
    author: "Adele Foundation",
    coverImage:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&q=80",
    date: "2025-01-30",
    readTime: 4,
  },
];

export const SEED_EVENTS: CalendarEvent[] = [
  {
    id: "evt-1",
    title: "Digital Literacy — Open Day",
    description: "Learn about our upcoming cohort and meet facilitators.",
    date: "2025-04-12",
    time: "10:00 AM",
    location: "Adele Training Centre, Yaba, Lagos",
    type: "Open Day",
    capacity: 60,
    status: "Upcoming",
    rsvps: [],
  },

  {
    id: "evt-2",
    title: "Entrepreneurship Graduation Ceremony",
    description: "Celebrate our latest graduates and their businesses.",
    date: "2025-04-26",
    time: "11:00 AM",
    location: "National Theatre, Lagos",
    type: "Graduation",
    capacity: 200,
    status: "Upcoming",
    rsvps: [],
  },

  {
    id: "evt-3",
    title: "Women in Tech Workshop — Abuja",
    description: "Empowering women with tech skills and opportunities.",
    date: "2025-05-10",
    time: "9:00 AM",
    location: "Abuja Tech Hub, Wuse",
    type: "Workshop",
    capacity: 40,
    status: "Upcoming",
    rsvps: [],
  },

  {
    id: "evt-4",
    title: "Community Outreach — Surulere",
    description: "Free digital skills introduction and program registration.",
    date: "2025-05-17",
    time: "8:00 AM",
    location: "Surulere Community Hall, Lagos",
    type: "Community",
    capacity: 100,
    status: "Upcoming",
    rsvps: [],
  },
];

export const SEED_REGISTRATIONS: ProgramRegistration[] = [
  {
    id: "reg-1",
    programId: "digital-literacy",
    programTitle: "Digital Literacy",
    name: "Chinedu Okafor",
    email: "chinedu@email.com",
    phone: "+2348012345678",
    dob: "1998-05-12",
    location: "Lagos, Yaba",
    education: "Secondary",
    employment: "Unemployed",
    motivation: "I want to learn digital skills and start freelancing.",
    extraAnswer: "",
    status: "Accepted",
    date: "2025-03-01",
  },

  {
    id: "reg-2",
    programId: "entrepreneurship",
    programTitle: "Entrepreneurship",
    name: "Aisha Bello",
    email: "aisha@email.com",
    phone: "+2348098765432",
    dob: "2000-11-03",
    location: "Abuja",
    education: "Tertiary",
    employment: "Self-employed",
    motivation: "I want to grow my small food business.",
    extraAnswer: "",
    status: "Pending",
    date: "2025-03-02",
  },
];

export const SEED_COHORTS: Cohort[] = [
  {
    id: "cohort-1",
    programId: "digital-literacy",
    programTitle: "Digital Literacy",
    name: "Cohort 18 — April 2025",
    startDate: "2025-04-14",
    endDate: "2025-07-07",
    capacity: 25,
    enrolled: ["reg-1", "reg-2"],
    status: "Upcoming",
  },
  {
    id: "cohort-2",
    programId: "carpentry",
    programTitle: "Carpentry & Woodwork",
    name: "Cohort 7 — March 2025",
    startDate: "2025-03-03",
    endDate: "2025-06-30",
    capacity: 16,
    enrolled: ["reg-6"],
    status: "Active",
  },
];

export const SEED_CERTIFICATES: Certificate[] = [
  {
    id: "cert-1",
    certId: "AEF-2024-DL-00138",
    graduateName: "Prince Antwi",
    programTitle: "Digital Literacy",
    programId: "digital-literacy",
    cohortName: "Cohort 17 — Oct 2024",
    issueDate: "2025-01-15",
    cohortId: "cohort-prev-1",
  },
  {
    id: "cert-2",
    certId: "AEF-2024-ENT-00092",
    graduateName: "Kwame Asante",
    programTitle: "Entrepreneurship",
    programId: "entrepreneurship",
    cohortName: "Cohort 11 — Aug 2024",
    issueDate: "2024-11-20",
    cohortId: "cohort-prev-2",
  },
  {
    id: "cert-3",
    certId: "AEF-2024-CA-00047",
    graduateName: "Abena Osei",
    programTitle: "Culinary Arts",
    programId: "culinary-arts",
    cohortName: "Cohort 9 — Sep 2024",
    issueDate: "2024-12-10",
    cohortId: "cohort-prev-3",
  },
];

export const SEED_SUBMISSIONS: ContactSubmission[] = [
  {
    id: "sub-1",
    name: "Nana Addo Frimpong",
    email: "nana.f@email.com",
    phone: "+233244112233",
    enquiryType: "application",
    program: "Digital Literacy",
    message:
      "I am very interested in the Digital Literacy program. I am currently unemployed and looking to transition into IT support. Please let me know when the next cohort begins.",
    date: "2025-03-18",
    read: false,
  },
  {
    id: "sub-2",
    name: "Serwa Mensah",
    email: "serwa@email.com",
    phone: "",
    enquiryType: "volunteer",
    program: "",
    message:
      "I am a software developer with 5 years of experience and would love to volunteer as a mentor for the Digital Literacy program. I am available on weekends.",
    date: "2025-03-15",
    read: true,
  },
  {
    id: "sub-3",
    name: "Kojo Asante",
    email: "kojo.a@email.com",
    phone: "+233244556677",
    enquiryType: "general",
    program: "",
    message:
      "I wanted to ask whether you have any programs available for people with physical disabilities. I am deaf and wondering if your programs can accommodate me.",
    date: "2025-03-12",
    read: true,
  },
];

// ─── PROGRAMS DATA ────────────────────────────────────────────────────────────

export const PROGRAMS_DATA = [
  {
    id: "digital-literacy",
    title: "Digital Literacy",
    tagline: "Build real digital skills for today’s economy",
    shortDesc:
      "Learn practical computer skills, online tools, and digital income pathways — even with no prior experience.",

    duration: "12 Weeks",
    cohortSize: "25 Participants",
    certification: "Digital Skills Certificate",

    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=900&q=80",
    coverImage:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1600&q=80",

    color: "from-primary to-secondary",
    lightColor: "bg-primary/10",
    accentColor: "text-primary",

    schedule: "Monday, Wednesday & Friday — 9:00 AM to 1:00 PM",
    nextCohort: "April 14, 2025",

    requirements: [
      "Minimum secondary school education",
      "Age 18–40",
      "Basic reading and writing in English",
      "No prior computer experience required",
    ],

    facilitator: {
      name: "Tunde Adeyemi",
      title: "Digital Skills Trainer",
      bio: "Over 8 years experience training young Nigerians in digital skills, freelancing, and remote work.",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80",
    },

    curriculum: [
      "Computer basics & internet navigation",
      "Microsoft Office & productivity tools",
      "Email & professional communication",
      "Digital marketing fundamentals",
      "Freelancing platforms (Upwork, Fiverr)",
      "Using AI tools for productivity",
    ],

    outcomes: [
      "70% earn income within 3 months",
      "Freelancing & remote job opportunities",
      "Ability to start online businesses",
    ],

    extraQuestion:
      "Do you currently have access to a smartphone or computer?",
  },

  {
    id: "entrepreneurship",
    title: "Entrepreneurship",
    tagline: "Start and grow a sustainable business",
    shortDesc:
      "Turn your idea into a real business with practical training, mentorship, and funding opportunities.",

    duration: "16 Weeks",
    cohortSize: "20 Participants",
    certification: "Entrepreneurship Certificate",

    image:
      "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=900&q=80",
    coverImage:
      "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1600&q=80",

    color: "from-primary to-accent",
    lightColor: "bg-secondary/10",
    accentColor: "text-primary",

    schedule:
      "Tuesday & Thursday — 9:00 AM to 3:00 PM, Saturday — 10:00 AM to 1:00 PM",
    nextCohort: "May 5, 2025",

    requirements: [
      "Age 18–45",
      "Must have a business idea or existing small business",
      "Basic literacy and numeracy",
    ],

    facilitator: {
      name: "Chinedu Okafor",
      title: "Business Development Coach",
      bio: "Entrepreneur and mentor helping young Nigerians build profitable businesses.",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    },

    curriculum: [
      "Business idea validation",
      "Pricing & financial management",
      "Marketing & customer acquisition",
      "Social media for business",
      "Record keeping & growth strategies",
      "Pitching & accessing funding",
    ],

    outcomes: [
      "60% launch businesses within 6 months",
      "Access to grants and funding opportunities",
      "Improved business income and stability",
    ],

    extraQuestion:
      "Describe your business idea or current business.",
  },

  {
    id: "culinary-arts",
    title: "Culinary Arts",
    tagline: "Turn your passion for food into income",
    shortDesc:
      "Learn professional cooking, food safety, and how to run a profitable food business.",

    duration: "14 Weeks",
    cohortSize: "18 Participants",
    certification: "Culinary Skills Certificate",

    image:
      "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=900&q=80",
    coverImage:
      "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=1600&q=80",

    color: "from-secondary to-primary",
    lightColor: "bg-secondary/10",
    accentColor: "text-secondary",

    schedule: "Monday to Friday — 8:00 AM to 1:00 PM",
    nextCohort: "April 28, 2025",

    requirements: [
      "Age 17–40",
      "Interest in cooking or food business",
      "Willingness to learn and practice",
    ],

    facilitator: {
      name: "Chef Blessing Eze",
      title: "Culinary Trainer",
      bio: "Professional chef with experience in Nigerian and continental cuisine.",
      image:
        "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80",
    },

    curriculum: [
      "Food hygiene & kitchen safety",
      "Nigerian and continental dishes",
      "Baking & pastry basics",
      "Menu planning & costing",
      "Food business setup",
      "Catering & event service",
    ],

    outcomes: [
      "80% employment or self-employment",
      "Catering and food business opportunities",
      "Ability to start a small food brand",
    ],

    extraQuestion:
      "What type of food business are you interested in?",
  },

  {
    id: "tailoring",
    title: "Tailoring & Fashion Design",
    tagline: "Create fashion and build your brand",
    shortDesc:
      "Learn sewing, design, and how to build a fashion business from scratch.",

    duration: "16 Weeks",
    cohortSize: "22 Participants",
    certification: "Fashion & Tailoring Certificate",

    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80",
    coverImage:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80",

    color: "from-primary to-secondary",
    lightColor: "bg-primary/10",
    accentColor: "text-primary",

    schedule: "Monday to Friday — 9:00 AM to 2:00 PM",
    nextCohort: "May 12, 2025",

    requirements: [
      "Age 16–40",
      "Interest in fashion or tailoring",
      "No prior experience required",
    ],

    facilitator: {
      name: "Ngozi Nwankwo",
      title: "Fashion Designer",
      bio: "Fashion designer helping young Nigerians build profitable fashion brands.",
      image:
        "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=200&q=80",
    },

    curriculum: [
      "Sewing techniques (manual & machine)",
      "Pattern drafting",
      "Garment construction",
      "Fashion design basics",
      "Client measurement & fitting",
      "Fashion business & branding",
    ],

    outcomes: [
      "70% start tailoring businesses",
      "Ability to earn from custom orders",
      "Build a fashion brand",
    ],

    extraQuestion:
      "Do you currently have access to a sewing machine?",
  },

  {
    id: "carpentry",
    title: "Carpentry & Woodwork",
    tagline: "Learn a skilled trade and earn consistently",
    shortDesc:
      "Hands-on training in woodworking, furniture making, and construction carpentry.",

    duration: "18 Weeks",
    cohortSize: "16 Participants",
    certification: "Carpentry Certificate",

    image:
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=900&q=80",
    coverImage:
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=1600&q=80",

    color: "from-primary to-secondary",
    lightColor: "bg-primary/10",
    accentColor: "text-primary",

    schedule: "Monday to Friday — 7:30 AM to 1:30 PM",
    nextCohort: "June 2, 2025",

    requirements: [
      "Age 17–40",
      "Physically fit for workshop work",
      "Interest in manual or technical skills",
    ],

    facilitator: {
      name: "Sadiq Musa",
      title: "Master Carpenter",
      bio: "Over 20 years experience in carpentry and furniture making.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    },

    curriculum: [
      "Tool handling & safety",
      "Furniture making",
      "Wood finishing techniques",
      "Basic construction carpentry",
      "Workshop management",
      "Client handling & pricing",
    ],

    outcomes: [
      "75% employed or self-employed",
      "Opportunities in construction & furniture",
      "Ability to run a workshop",
    ],

    extraQuestion:
      "Have you done any form of manual or technical work before?",
  },
];
