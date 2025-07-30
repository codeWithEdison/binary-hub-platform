
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

// Updated innovators based on binaryhub.md - including junior volunteers
export const innovators: Innovator[] = [
  {
    id: "1",
    name: "MBONABUCYA Celestin",
    role: "Hub Coordinator (Academic Staff)",
    status: "faculty",
    department: "School of ICT",
    skills: ["Strategic Leadership", "Innovation Management", "Project Coordination", "Mentorship"],
    image: "/img/cordinator.jpg",
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
    image: "https://images.unsplash.com/photo-1573497019940-1c00da094a0b?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3",
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
  },
  // Junior Volunteers added as innovators
  {
    id: "13",
    name: "Denis UWIHIRWE",
    role: "Junior Developer",
    status: "student",
    department: "School of ICT",
    skills: ["JavaScript", "React", "Web Development"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3",
    projects: ["Learning Projects", "Code Reviews"],
    bio: "Junior Developer learning and contributing to Binary Hub projects."
  },
  {
    id: "14",
    name: "Jado Fils SEZIKEYE",
    role: "Junior Developer",
    status: "student",
    department: "School of ICT",
    skills: ["Python", "Django", "Backend Development"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3",
    projects: ["Learning Projects", "Code Reviews"],
    bio: "Junior Developer learning and contributing to Binary Hub projects."
  },
  {
    id: "15",
    name: "Olivier BYIRINGORO",
    role: "Junior Developer",
    status: "student",
    department: "School of ICT",
    skills: ["JavaScript", "Node.js", "Full Stack Development"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3",
    projects: ["Learning Projects", "Code Reviews"],
    bio: "Junior Developer learning and contributing to Binary Hub projects."
  },
  {
    id: "16",
    name: "Poli NDIRAMIYE",
    role: "Junior Developer",
    status: "student",
    department: "School of ICT",
    skills: ["React", "TypeScript", "Frontend Development"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3",
    projects: ["Learning Projects", "Code Reviews"],
    bio: "Junior Developer learning and contributing to Binary Hub projects."
  },
  {
    id: "17",
    name: "Michael MUNEZERO NTAGANIRA",
    role: "Junior Developer",
    status: "student",
    department: "School of ICT",
    skills: ["Java", "Spring Boot", "Backend Development"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3",
    projects: ["Learning Projects", "Code Reviews"],
    bio: "Junior Developer learning and contributing to Binary Hub projects."
  },
  {
    id: "18",
    name: "Clement NSENGIYUMVA",
    role: "Junior Developer",
    status: "student",
    department: "School of ICT",
    skills: ["JavaScript", "Vue.js", "Frontend Development"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3",
    projects: ["Learning Projects", "Code Reviews"],
    bio: "Junior Developer learning and contributing to Binary Hub projects."
  },
  {
    id: "19",
    name: "Obed UWIHANGANYE",
    role: "Junior Developer",
    status: "student",
    department: "School of ICT",
    skills: ["Python", "Flask", "Backend Development"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3",
    projects: ["Learning Projects", "Code Reviews"],
    bio: "Junior Developer learning and contributing to Binary Hub projects."
  },
  {
    id: "20",
    name: "TUYISHIME KAYITSINGA Hertillan",
    role: "Junior Developer",
    status: "student",
    department: "School of ICT",
    skills: ["React", "Node.js", "Full Stack Development"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3",
    projects: ["Learning Projects", "Code Reviews"],
    bio: "Junior Developer learning and contributing to Binary Hub projects."
  },
  {
    id: "21",
    name: "Eric TUYISHIME",
    role: "Junior Developer",
    status: "student",
    department: "School of ICT",
    skills: ["JavaScript", "Express.js", "Backend Development"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3",
    projects: ["Learning Projects", "Code Reviews"],
    bio: "Junior Developer learning and contributing to Binary Hub projects."
  },
  {
    id: "22",
    name: "Merci RUYANGA",
    role: "Junior Developer",
    status: "student",
    department: "School of ICT",
    skills: ["React", "CSS", "Frontend Development"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3",
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
      { name: "MBONABUCYA Celestin", role: "Project Lead", image: "/img/cordinator.jpg" },
      { name: "NDAYISHIMIYE Habibu", role: "Assistant Coordinator", image: "/img/Habibu.png" },
      { name: "ISHIMWE KARLISE Lucie", role: "Assistant Administrator", image: "/img/lucie.jpg" },
      { name: "NIYONGABO Emmanuel", role: "Frontend Developer", image: "/img/emmanuel.png" },
      { name: "SHYIRAMBERE Joseph", role: "Backend Developer", image: "/img/joseph.jpg" },
      { name: "David TUYISHIME", role: "Backend Team Leader", image: "/img/David.png" },
      { name: "UWIHANGANYE Edison", role: "UI/UX Designer", image: "/img/presentation-img/edison.jpg" }
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
    image: "/img/Project/imotrack.png",
    date: "2023-06-20",
    status: "development",
    team: [
      { name: "Marie Claire UWIRINYIYIMANA", role: "Health & Sports Coordinator", image: "https://images.unsplash.com/photo-1614644147798-f8c0fc9da7f6?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3" },
      { name: "Poli NDIRAMIYE", role: "Junior Developer", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3" },
      { name: "Michael MUNEZERO NTAGANIRA", role: "Junior Developer", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3" },
      { name: "Clement NSENGIYUMVA", role: "Junior Developer", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3" },
      { name: "Obed UWIHANGANYE", role: "Junior Developer", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3" }
    ],
    links: {
      demo: "https://www.figma.com/proto/86AnJDFU35wGufAEm3Eud6/IMOTRAK?node-id=124-3&t=bDVR2Vj1FvlYdiDv-1&starting-point-node-id=124%3A3"
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
    innovators: ["7", "15", "10"],
    stage: "development",
    category: "Request Management",
    categories: ["Workflow", "Government", "Administration"],
    image: "/img/Project/inuma.png",
    date: "2023-09-10",
    status: "In Progress",
    team: [
      { name: "UWIHANGANYE Edison", role: "UI/UX & Frontend Team Leader", image: "/img/presentation-img/edison.jpg" },
      { name: "Olivier BYIRINGORO", role: "Frontend Developer", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3" },
      { name: "Igor IHIMBAZWE", role: "Backend Developer", image: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3" }
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
      { name: "NIYONGABO Emmanuel", role: "Frontend Developer", image: "/img/emmanuel.png" },
      { name: "SHYIRAMBERE Joseph", role: "Backend Developer", image: "/img/joseph.jpg" }
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
    innovators: [],
    stage: "concept",
    category: "Education",
    categories: ["Education", "Academic Management", "University"],
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop&ixlib=rb-4.0.3",
    date: "2024-01-10",
    status: "Planning Phase",
    team: [],
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
  { value: "5", label: "Flagship Solutions" }, // UMUTUNGO Box, IMOTRAK, INUMA App, Customer Support System, Academic Records System
  { value: "22", label: "Total Innovators" }, // Core Team (12) + Junior Volunteers (10) = 22 total team members
  { value: "5", label: "Professionals" }, // Alumni (3) + Faculty (1) + External Experts (1) = 5 professionals
  { value: "8+", label: "Industry Partners" } // Mastercard Foundation, GIZ, ENABEL, Ministry of ICT/RISA, UR Data Center, Center for Innovation, Directorate of Research, Private Sector
];
