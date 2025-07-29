
export type Innovator = {
  id: string;
  name: string;
  role: string;
  status: "student" | "alumni" | "faculty";
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

// Updated innovators based on binaryhub.md
export const innovators: Innovator[] = [
  {
    id: "1",
    name: "MBONABUCYA Celestin",
    role: "Hub Coordinator (Academic Staff)",
    status: "faculty",
    department: "School of ICT",
    skills: ["Strategic Leadership", "Innovation Management", "Project Coordination", "Mentorship"],
    image: "/img/coordinatoro.jpg",
    projects: ["UMUTUNGO Box", "IMOTRAK", "INUMA App"],
    bio: "Hub Coordinator overseeing strategic coordination and partnerships at UR Binary Hub."
  },
  {
    id: "2",
    name: "NDAYISHIMIYE Habibu",
    role: "Assistant Coordinator (Student)",
    status: "student",
    department: "School of ICT",
    skills: ["Project Management", "Team Coordination", "Reporting", "Operations"],
    image: "/img/Habibu.png",
    projects: ["Hub Operations", "Team Management"],
    bio: "Assistant Coordinator managing day-to-day operations and team coordination at UR Binary Hub."
  },
  {
    id: "3",
    name: "ISHIMWE KARLISE Lucie",
    role: "Assistant Administrator",
    status: "student",
    department: "School of ICT",
    skills: ["Documentation", "Administration", "Event Coordination", "Communication"],
    image: "/img/lucie.jpg",
    projects: ["Documentation Management", "Event Organization"],
    bio: "Assistant Administrator managing hub documentation, logistics, and internal communication."
  },
  {
    id: "4",
    name: "NIYONGABO Emmanuel",
    role: "Frontend Mentor",
    status: "alumni",
    department: "External Expert",
    skills: ["React", "JavaScript", "HTML", "CSS", "UI Development"],
    image: "/img/emmanuel.png",
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
    image: "/img/joseph.jpg",
    projects: ["IMOTRAK", "Customer Support System"],
    bio: "Backend & Database Mentor leading backend architecture and database optimization."
  },
  {
    id: "6",
    name: "David TUYISHIME",
    role: "Backend Team Leader",
    status: "student",
    department: "School of ICT",
    skills: ["Backend Development", "Team Leadership", "Code Review", "Git"],
    image: "/img/David.png",
    projects: ["INUMA App", "Academic Records System"],
    bio: "Backend Team Leader coordinating backend development activities and mentoring junior developers."
  },
  {
    id: "7",
    name: "UWIHANGANYE Edison",
    role: "UI/UX & Frontend Team Leader",
    status: "student",
    department: "Computer Science",
    skills: ["React", "UI/UX Design", "Team Leadership", "Frontend Architecture"],
    image: "/img/presentation-img/edison.jpg",
    projects: ["Customer Support System", "UR Binary Hub Platform"],
    bio: "UI/UX & Frontend Team Leader coordinating frontend development and design activities."
  },
  {
    id: "8",
    name: "Eric TUYISHIMIRE",
    role: "UI/UX Designer",
    status: "alumni",
    department: "External Expert",
    skills: ["Figma", "Design Systems", "User Research", "Prototyping"],
    image: "/img/eds.jpg",
    projects: ["Design System", "User Experience Research"],
    bio: "UI/UX Designer leading design thinking sessions and establishing UI/UX standards."
  },
  {
    id: "9",
    name: "Derrick IRADUKUNDA",
    role: "Systems Administrator",
    status: "student",
    department: "School of ICT",
    skills: ["System Administration", "Server Management", "Deployment", "Security"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3",
    projects: ["Infrastructure Management", "Deployment Systems"],
    bio: "Systems Administrator managing internal infrastructure and deployment environments."
  },
  {
    id: "10",
    name: "Igor IHIMBAZWE",
    role: "DevOps Advisor",
    status: "student",
    department: "School of ICT",
    skills: ["DevOps", "CI/CD", "Docker", "Cloud Deployment"],
    image: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3",
    projects: ["DevOps Pipeline", "Cloud Infrastructure"],
    bio: "DevOps Advisor setting up DevOps pipelines and cloud deployment strategies."
  },
  {
    id: "11",
    name: "Danny HATEGEKIMANA",
    role: "Designer for social, print, and events",
    status: "student",
    department: "School of ICT",
    skills: ["Graphic Design", "Branding", "Social Media", "Marketing Materials"],
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3",
    projects: ["Brand Identity", "Marketing Materials"],
    bio: "Designer creating promotional materials and maintaining Binary Hub branding."
  },
  {
    id: "12",
    name: "Marie Claire UWIRINYIYIMANA",
    role: "Health & Sports Coordinator",
    status: "student",
    department: "School of ICT",
    skills: ["Event Coordination", "Team Building", "Wellness Programs"],
    image: "https://images.unsplash.com/photo-1614644147798-f8c0fc9da7f6?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3",
    projects: ["Wellness Programs", "Team Building Activities"],
    bio: "Health & Sports Coordinator organizing wellness activities and team-building events."
  }
];

// Updated projects based on binaryhub.md flagship projects
export const projects: Project[] = [
  {
    id: "1",
    title: "UMUTUNGO Box",
    description: "Asset Management System for public institutions to track assets, value, and depreciation.",
    innovators: ["1", "4"],
    stage: "launched",
    category: "Asset Management",
    categories: ["Government", "Asset Management", "Public Service"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    date: "2023-03-15",
    status: "Completed",
    team: [
      { name: "MBONABUCYA Celestin", role: "Project Lead", image: "/img/coordinatoro.jpg" },
      { name: "NIYONGABO Emmanuel", role: "Frontend Developer", image: "/img/emmanuel.png" }
    ],
    links: {
      demo: "https://umutungo.example.com"
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
    innovators: ["5", "6"],
    stage: "launched",
    category: "Fleet Management",
    categories: ["Transportation", "Fleet Management", "Government"],
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3",
    date: "2023-06-20",
    status: "Completed",
    team: [
      { name: "SHYIRAMBERE Joseph", role: "Backend Developer", image: "/img/joseph.jpg" },
      { name: "David TUYISHIME", role: "Team Leader", image: "/img/David.png" }
    ],
    links: {
      demo: "https://imotrak.example.com"
    },
    fullDescription: "Complete fleet management solution for institutional vehicle monitoring.",
    problemStatement: "Institutions had no systematic way to track vehicle usage, maintenance, and costs.",
    solution: "Built a comprehensive system for vehicle registration, usage tracking, maintenance scheduling, and cost analysis.",
    technologies: ["Vue.js", "Express.js", "MongoDB", "Chart.js"]
  },
  {
    id: "3",
    title: "INUMA App",
    description: "Request flow management system for submitting and following up on staff inquiries in institutions.",
    innovators: ["6", "7"],
    stage: "development",
    category: "Request Management",
    categories: ["Workflow", "Government", "Administration"],
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    date: "2023-09-10",
    status: "In Progress",
    team: [
      { name: "David TUYISHIME", role: "Backend Lead", image: "/img/David.png" },
      { name: "UWIHANGANYE Edison", role: "Frontend Lead", image: "/img/presentation-img/edison.jpg" }
    ],
    fullDescription: "Streamlined request management system for institutional staff inquiries.",
    problemStatement: "Staff requests and inquiries were handled manually without proper tracking.",
    solution: "Developed a digital workflow system for request submission, tracking, and resolution.",
    technologies: ["React", "Node.js", "MySQL", "Material-UI"]
  },
  {
    id: "4",
    title: "Customer Support System – Rwanda FDA",
    description: "Helps citizens submit and track requests to Rwanda FDA; integrated with email and SMS.",
    innovators: ["4", "7"],
    stage: "launched",
    category: "Customer Support",
    categories: ["Government", "Healthcare", "Public Service"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    date: "2023-11-15",
    status: "Completed",
    team: [
      { name: "NIYONGABO Emmanuel", role: "Frontend Developer", image: "/img/emmanuel.png" },
      { name: "UWIHANGANYE Edison", role: "UI/UX Lead", image: "/img/presentation-img/edison.jpg" }
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
    description: "Tool for managing student marks, transcripts, and academic validation processes at CST. (Under Development)",
    innovators: ["4", "6"],
    stage: "development",
    category: "Education",
    categories: ["Education", "Academic Management", "University"],
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop&ixlib=rb-4.0.3",
    date: "2024-01-10",
    status: "In Progress",
    team: [
      { name: "NIYONGABO Emmanuel", role: "Frontend Developer", image: "/img/emmanuel.png" },
      { name: "David TUYISHIME", role: "Backend Developer", image: "/img/David.png" }
    ],
    fullDescription: "Comprehensive academic records management system for CST.",
    problemStatement: "Manual academic record keeping was inefficient and error-prone.",
    solution: "Developing a digital system for marks entry, transcript generation, and academic validation.",
    technologies: ["React", "Django", "PostgreSQL", "PDF Generation"],
    updates: [
      {
        date: "2024-01-10",
        title: "Project Initiated",
        content: "Started development of the academic records management system for CST."
      },
      {
        date: "2024-02-15",
        title: "Database Design Complete",
        content: "Completed the database schema design for student records and transcript management."
      }
    ]
  }
];

// Updated services based on binaryhub.md benefits
export const services: Service[] = [
  {
    id: "1",
    title: "Talent Access",
    description: "Work with developers, designers, mentors. Involves students, alumni, and professionals.",
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
  { value: "5+", label: "Flagship Projects" },
  { value: "12+", label: "Core Team Members" },
  { value: "10+", label: "Junior Volunteers" },
  { value: "15+", label: "Industry Partners" }
];
