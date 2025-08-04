
export type Innovator = {
  id: string;
  name: string;
  role: string;
  status: "innovator" | "alumni" | "mentor";
  department: string;
  skills: string[];
  image: string;
  projects: string[];
  bio: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  innovators: string[];
  stage: "concept" | "prototype" | "development" | "launched";
  category: string;
  image: string;
  // New properties
  date: string;
  status: string;
  team: Array<{ name: string; role: string; image?: string; }>;
  categories: string[];
  links?: {
    demo?: string;
    github?: string;
    website?: string;
  };
  fullDescription?: string;
  problemStatement?: string;
  solution?: string;
  technologies?: string[];
  results?: string;
  impact?: string;
  futurePlans?: string;
  gallery?: string[];
  updates?: Array<{ date: string; title: string; content: string; }>;
};

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

// Updated innovators based on binaryhub.md - including junior volunteers
export const innovators: Innovator[] = [
  {
    id: "1",
    name: "MBONABUCYA Celestin",
    role: "Hub Coordinator (Academic Staff)",
    status: "mentor",
    department: "School of ICT",
    skills: ["Strategic Leadership", "Innovation Management", "Project Coordination", "Mentorship"],
    image: "/img/Team/cordinator.jpg",
    projects: ["UMUTUNGO Box", "IMOTRAK", "INUMA App"],
    bio: "Hub Coordinator overseeing strategic coordination and partnerships at UR Binary Hub."
  },
  {
    id: "2",
    name: "NDAYISHIMIYE Habibu",
    role: "Assistant Coordinator (innovator)",
    status: "innovator",
    department: "School of ICT",
    skills: ["Project Management", "Team Coordination", "Reporting", "Operations"],
    image: "/img/Team/habibu.jpg",
    projects: ["Hub Operations", "Team Management"],
    bio: "Assistant Coordinator managing day-to-day operations and team coordination at UR Binary Hub."
  },
  {
    id: "3",
    name: "ISHIMWE KARLISE Lucie",
    role: "Assistant Administrator",
    status: "innovator",
    department: "School of ICT",
    skills: ["Documentation", "Administration", "Event Coordination", "Communication"],
    image: "/img/Team/karlise.jpg",
    projects: ["Documentation Management", "Event Organization"],
    bio: "Assistant Administrator managing hub documentation, logistics, and internal communication."
  },
  {
    id: "7",
    name: "UWIHANGANYE Edison",
    role: "UI/UX & Frontend Team Leader",
    status: "innovator",
    department: "Computer Science",
    skills: ["React", "UI/UX Design", "Team Leadership", "Frontend Architecture"],
    image: "/img/Team/edison.jpg",
    projects: ["Customer Support System", "UR Binary Hub Platform"],
    bio: "UI/UX & Frontend Team Leader coordinating frontend development and design activities."
  },
  {
    id: "4",
    name: "NIYONGABO Emmanuel",
    role: "Frontend Mentor",
    status: "alumni",
    department: "External Expert",
    skills: ["React", "JavaScript", "HTML", "CSS", "UI Development"],
    image: "/img/Team/emmanuel.png",
    projects: ["UMUTUNGO Box", "Academic Records System"],
    bio: "Frontend Mentor providing technical guidance and mentorship for frontend development."
  },
  {
    id: "5",
    name: "SHYIRAMBERE Joseph",
    role: "Backend & DB Mentor",
    status: "alumni",
    department: "External Expert",
    skills: ["Node.js", "PostgreSQL", "MongoDB", "REST APIs", "Database Design"],
    image: "/img/Team/joseph.jpg",
    projects: ["IMOTRAK", "Customer Support System"],
    bio: "Backend & Database Mentor leading backend architecture and database optimization."
  },
  {
    id: "6",
    name: "David TUYISHIME",
    role: "Backend Team Leader",
    status: "innovator",
    department: "School of ICT",
    skills: ["Backend Development", "Team Leadership", "Code Review", "Git"],
    image: "/img/Team/david.jpg",
    projects: ["INUMA App", "Academic Records System"],
    bio: "Backend Team Leader coordinating backend development activities and mentoring junior developers."
  },

  {
    id: "8",
    name: "Eric TUYISHIMIRE",
    role: "UI/UX Designer",
    status: "alumni",
    department: "External Expert",
    skills: ["Figma", "Design Systems", "User Research", "Prototyping"],
    image: "/img/Team/eric.jpg",
    projects: ["Design System", "User Experience Research"],
    bio: "UI/UX Designer leading design thinking sessions and establishing UI/UX standards."
  },
  {
    id: "9",
    name: "Derrick IRADUKUNDA",
    role: "Systems Administrator",
    status: "innovator",
    department: "School of ICT",
    skills: ["System Administration", "Server Management", "Deployment", "Security"],
    image: "/img/Team/derrick.jpg",
    projects: ["Infrastructure Management", "Deployment Systems"],
    bio: "Systems Administrator managing internal infrastructure and deployment environments."
  },
  {
    id: "10",
    name: "Igor IHIMBAZWE",
    role: "DevOps Advisor",
    status: "innovator",
    department: "School of ICT",
    skills: ["DevOps", "CI/CD", "Docker", "Cloud Deployment"],
    image: "/img/Team/igor.jpg",
    projects: ["DevOps Pipeline", "Cloud Infrastructure"],
    bio: "DevOps Advisor setting up DevOps pipelines and cloud deployment strategies."
  },
  {
    id: "11",
    name: "Danny HATEGEKIMANA",
    role: "Designer for social, print, and events",
    status: "innovator",
    department: "School of ICT",
    skills: ["Graphic Design", "Branding", "Social Media", "Marketing Materials"],
    image: "/img/Team/danny.jpg",
    projects: ["Brand Identity", "Marketing Materials"],
    bio: "Designer creating promotional materials and maintaining Binary Hub branding."
  },
  {
    id: "12",
    name: "Marie Claire UWIRINYIYIMANA",
    role: "Health & Sports Coordinator",
    status: "innovator",
    department: "School of ICT",
    skills: ["Event Coordination", "Team Building", "Wellness Programs"],
    image: "/img/Team/claire.jpg",
    projects: ["Wellness Programs", "Team Building Activities"],
    bio: "Health & Sports Coordinator organizing wellness activities and team-building events."
  },
  // Junior Volunteers added as innovators
  {
    id: "13",
    name: "Denis UWIHIRWE",
    role: "Junior Developer",
    status: "innovator",
    department: "School of ICT",
    skills: ["JavaScript", "React", "Web Development"],
    image: "/img/Team/denis.jpg",
    projects: ["Learning Projects", "Code Reviews"],
    bio: "Junior Developer learning and contributing to Binary Hub projects."
  },
  {
    id: "14",
    name: "Jado Fils SEZIKEYE",
    role: "Junior Developer",
    status: "innovator", 
    department: "School of ICT",
    skills: ["Python", "Django", "Backend Development"],
    image: "/img/Team/jado.png",
    projects: ["Learning Projects", "Code Reviews"],
    bio: "Junior Developer learning and contributing to Binary Hub projects."
  },
  {
    id: "15",
    name: "Olivier BYIRINGORO",
    role: "Junior Developer",
    status: "innovator",
    department: "School of ICT",
    skills: ["JavaScript", "Node.js", "Full Stack Development"],
    image: "/img/Team/olvier.jpg",
    projects: ["Learning Projects", "Code Reviews"],
    bio: "Junior Developer learning and contributing to Binary Hub projects."
  },
  {
    id: "16",
    name: "Poli NDIRAMIYE",
    role: "Junior Developer",
    status: "innovator",
    department: "School of ICT",
    skills: ["React", "TypeScript", "Frontend Development"],
    image: "/img/Team/poli.jpg",
    projects: ["Learning Projects", "Code Reviews"],
    bio: "Junior Developer learning and contributing to Binary Hub projects."
  },
  {
    id: "17",
    name: "Michael MUNEZERO NTAGANIRA",
    role: "Junior Developer",
    status: "innovator",
    department: "School of ICT",
    skills: ["Java", "Spring Boot", "Backend Development"],
    image: "/img/Team/michel.png",
    projects: ["Learning Projects", "Code Reviews"],
    bio: "Junior Developer learning and contributing to Binary Hub projects."
  },
  {
    id: "18",
    name: "Clement NSENGIYUMVA",
    role: "Junior Developer",
    status: "innovator",
    department: "School of ICT",
    skills: ["JavaScript", "Vue.js", "Frontend Development"],
    image: "/img/Team/clement.jpg",
    projects: ["Learning Projects", "Code Reviews"],
    bio: "Junior Developer learning and contributing to Binary Hub projects."
  },
  {
    id: "19",
    name: "Obed UWIHANGANYE",
    role: "Junior Developer",
    status: "innovator",
    department: "School of ICT",
    skills: ["Python", "Flask", "Backend Development"],
    image: "/img/Team/obed.jpg",
    projects: ["Learning Projects", "Code Reviews"],
    bio: "Junior Developer learning and contributing to Binary Hub projects."
  },
  {
    id: "20",
    name: "TUYISHIME KAYITSINGA Hertillan",
    role: "Junior Developer",
    status: "innovator",
    department: "School of ICT",
    skills: ["React", "Node.js", "Full Stack Development"],
    image: "/img/Team/hertillan.jpg",
    projects: ["Learning Projects", "Code Reviews"],
    bio: "Junior Developer learning and contributing to Binary Hub projects."
  },
  {
    id: "21",
    name: "Eric TUYISHIME",
    role: "Junior Developer",
    status: "innovator",
    department: "School of ICT",
    skills: ["JavaScript", "Express.js", "Backend Development"],
    image: "/img/Team/ericc.jpg",
    projects: ["Learning Projects", "Code Reviews"],
    bio: "Junior Developer learning and contributing to Binary Hub projects."
  },
  {
    id: "22",
    name: "Merci RUYANGA",
    role: "Junior Developer",
    status: "innovator",
    department: "School of ICT",
    skills: ["React", "CSS", "fullstack  Development"],
    image: "/img/Team/merci.jpg",
    projects: ["Learning Projects", "Code Reviews"],
    bio: "Junior Developer learning and contributing to Binary Hub projects."
  }
];



// Updated projects based on binaryhub.md flagship projects
export const projects: Project[] = [
  {
    id: "1",
    title: "UMUTUNGO Box",
    description: "Asset Management System for public institutions to track assets, value, and depreciation.",
    innovators: ["1", "2", "3", "4", "5", "6", "7"],
    stage: "development",
    category: "Asset Management",
    categories: ["Government", "Asset Management", "Public Service", 'Planning', 'Monitoring', 'Evaluation'],
    image: "/img/Project/umutungo.png",
    date: "2023-03-15",
    status: "Completed",
    team: [
      { name: "MBONABUCYA Celestin", role: "Project Lead", image: "/img/Team/cordinator.jpg" },
      { name: "NDAYISHIMIYE Habibu", role: "Assistant Coordinator", image: "/img/Team/habibu.jpg" },
      { name: "ISHIMWE KARLISE Lucie", role: "Assistant Administrator", image: "/img/Team/karlise.jpg" },
      { name: "NIYONGABO Emmanuel", role: "Frontend Developer", image: "/img/Team/emmanuel.png" },
      { name: "SHYIRAMBERE Joseph", role: "Backend Developer", image: "/img/Team/joseph.jpg" },
      { name: "David TUYISHIME", role: "Backend Team Leader", image: "/img/Team/david.jpg" },
      { name: "UWIHANGANYE Edison", role: "UI/UX Designer", image: "/img/Team/edison.jpg" }
    ],
    links: {
      demo: "https://demo.umutungo.codewithedison.com/"
    },
    fullDescription: "Comprehensive asset management solution for public institutions to track assets, value, and depreciation.",
    problemStatement: "Public institutions lacked proper asset tracking and management systems.",
    solution: "Developed a comprehensive web-based system for asset registration, tracking, and depreciation calculation.",
    technologies: ["React", "Node.js", "PostgreSQL", "Bootstrap"]
  },
  {
    id: "2",
    title: "IMOTRAK",
    description: "Fleet Management System for monitoring usage, maintenance, and cost of institutional vehicles.",
    innovators: ["12", "16", "17", "18", "19"],
    stage: "development",
    category: "Fleet Management",
    categories: ["Transportation", "Fleet Management", "Government"],
    image: "/img/Project/imotrak.png",
    date: "2023-06-20",
    status: "development",
    team: [
      { name: "Marie Claire UWIRINYIYIMANA", role: "Health & Sports Coordinator", image: "/img/Team/claire.jpg" },
      { name: "Poli NDIRAMIYE", role: "Junior Developer", image: "/img/Team/jonathan.jpg" },
      { name: "Michael MUNEZERO NTAGANIRA", role: "Junior Developer", image: "/img/Team/michel.png" },
      { name: "Clement NSENGIYUMVA", role: "Junior Developer", image: "/img/Team/fabrice.jpg" },
      { name: "Obed UWIHANGANYE", role: "Junior Developer", image: "/img/Team/cryille.jpg" }
    ],
    links: {},
    fullDescription: "Complete fleet management solution for institutional vehicle monitoring.",
    problemStatement: "Institutions had no systematic way to track vehicle usage, maintenance, and costs.",
    solution: "Built a comprehensive system for vehicle registration, usage tracking, maintenance scheduling, and cost analysis.",
    technologies: ["Vue.js", "Express.js", "MongoDB", "Chart.js"]
  },
  {
    id: "3",
    title: "INUMA App",
    description: "Request flow management system for submitting and following up on staff inquiries in institutions.",
    innovators: ["7", "15", "10"],
    stage: "development",
    category: "Request Management",
    categories: ["Workflow", "Government", "Administration"],
    image: "/img/Project/inuma.jpg",
    date: "2023-09-10",
    status: "In Progress",
    team: [
      { name: "UWIHANGANYE Edison", role: "UI/UX & Frontend Team Leader", image: "/img/Team/edison.jpg" },
      { name: "Olivier BYIRINGORO", role: "Frontend Developer", image: "/img/Team/edison.jpg" },
      { name: "Igor IHIMBAZWE", role: "Backend Developer", image: "/img/Team/igor.jpg" }
    ],
    links: {
      demo: "https://staff-request.codewithedison.com/",
    },
    fullDescription: "Streamlined request management system for institutional staff inquiries.",
    problemStatement: "Staff requests and inquiries were handled manually without proper tracking.",
    solution: "Developed a digital workflow system for request submission, tracking, and resolution.",
    technologies: ["React", "Node.js", "MySQL", "Material-UI"]
  },
  {
    id: "4",
    title: "Customer Support System – Rwanda FDA",
    description: "Helps citizens submit and track requests to Rwanda FDA; integrated with email and SMS.",
    innovators: ["4", "5"],
    stage: "launched",
    category: "Customer Support",
    categories: ["Government", "Healthcare", "Public Service"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    date: "2023-11-15",
    status: "Completed",
    team: [
      { name: "NIYONGABO Emmanuel", role: "Frontend Developer", image: "/img/Team/emmanuel.png" },
      { name: "SHYIRAMBERE Joseph", role: "Backend Developer", image: "/img/Team/joseph.jpg" }
    ],
    links: {
      website: "https://fda-support.example.com"
    },
    fullDescription: "Comprehensive customer support platform for Rwanda FDA citizen services.",
    problemStatement: "Citizens had difficulty submitting and tracking requests to Rwanda FDA.",
    solution: "Built an integrated platform with email and SMS notifications for request management.",
    technologies: ["Angular", "Spring Boot", "PostgreSQL", "Twilio API"]
  },
  {
    id: "5",
    title: "Academic Records System",
    description: "Digital system for managing innovator academic records and transcripts.",
    innovators: ["6"],
    stage: "concept",
    category: "Education",
    categories: ["Education", "innovator Management", "Administration"],
    image: "#",
    date: "2024-01-15",
    status: "Planning",
    team: [
      { name: "David TUYISHIME", role: "Backend Team Leader", image: "/img/Team/david.jpg" }
    ],
    links: {},
    fullDescription: "Digital academic records management system for educational institutions.",
    problemStatement: "Academic records were managed manually, leading to inefficiencies and errors.",
    solution: "Develop a digital system for secure academic record management and transcript generation.",
    technologies: ["React", "Node.js", "PostgreSQL", "Digital Signatures"]
  }
];

// Updated services based on binaryhub.md benefits
export const services: Service[] = [
  {
    id: "1",
    title: "Talent Access",
    description: "Work with developers, designers, mentors. Involves innovators, alumni, and professionals.",
    icon: "users"
  },
  {
    id: "2",
    title: "Cost Efficiency",
    description: "Reduced development cost. Shared infrastructure and tools.",
    icon: "banknote"
  },
  {
    id: "3",
    title: "Mentorship",
    description: "Guidance from professors and experts. Regular reviews and code quality checks.",
    icon: "rocket"
  },
  {
    id: "4",
    title: "Workspace & Infrastructure",
    description: "Free access to office, internet, devices, and tools.",
    icon: "laptop"
  },
  {
    id: "5",
    title: "Project Management",
    description: "Agile/Scrum or hybrid methods. Includes version control, documentation, planning.",
    icon: "award"
  },
  {
    id: "6",
    title: "Institutional Support",
    description: "Linked with the University for credibility and recognition.",
    icon: "network"
  },
  {
    id: "7",
    title: "Funding Opportunities",
    description: "Access to seed funding and early grants. Support from partners like Mastercard Foundation, GIZ, ENABEL.",
    icon: "award"
  },
  {
    id: "8",
    title: "MVP & Prototyping Speed",
    description: "Rapid prototyping and feedback.",
    icon: "rocket"
  },
  {
    id: "9",
    title: "Exposure",
    description: "Access to hackathons, exhibitions, seminars, and conferences.",
    icon: "network"
  },
  {
    id: "10",
    title: "Sustainability",
    description: "Co-ownership of IP between UR and developers. Support for business modeling and commercialization.",
    icon: "users"
  },
  {
    id: "11",
    title: "Post-Incubation Support",
    description: "Help with launching, marketing, and scaling. Connection to alumni and advisors.",
    icon: "rocket"
  }
];

// Updated stats based on binaryhub.md information
export const stats = [
  { value: "5", label: "Flagship Solutions" }, // UMUTUNGO Box, IMOTRAK, INUMA App, Customer Support System, Academic Records System
  { value: "22", label: "Total Innovators" }, // Core Team (12) + Junior Volunteers (10) = 22 total team members
  { value: "5", label: "Mentors & Alumini " }, // Alumni (3) + Faculty (1) + External Experts (1) = 5 professionals
  { value: "8+", label: "Industry Partners" } // Mastercard Foundation, GIZ, ENABEL, Ministry of ICT/RISA, UR Data Center, Center for Innovation, Directorate of Research, Private Sector
];
