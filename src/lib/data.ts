
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
};

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export const innovators: Innovator[] = [
  {
    id: "1",
    name: "Jean-Claude Ndayisenga",
    role: "Software Developer",
    status: "student",
    department: "Computer Science",
    skills: ["React", "Node.js", "AI", "Machine Learning"],
    image: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3",
    projects: ["Smart Agriculture IoT Platform", "Student Collaboration App"],
    bio: "Final year computer science student focusing on AI applications for agriculture in Rwanda."
  },
  {
    id: "2",
    name: "Marie-Claire Uwamahoro",
    role: "UX Designer",
    status: "alumni",
    department: "Design",
    skills: ["UI/UX", "User Research", "Prototyping", "Design Systems"],
    image: "https://images.unsplash.com/photo-1614644147798-f8c0fc9da7f6?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3",
    projects: ["Rural Healthcare App", "Financial Inclusion Platform"],
    bio: "Design alumna with 3 years experience creating accessible digital products for underserved communities."
  },
  {
    id: "3",
    name: "Eric Mugisha",
    role: "Renewable Energy Engineer",
    status: "faculty",
    department: "Engineering",
    skills: ["Solar Energy", "Sustainable Design", "Project Management"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3",
    projects: ["Community Solar Initiative", "Energy Education Program"],
    bio: "Faculty member leading research on affordable renewable energy solutions for rural Rwanda."
  },
  {
    id: "4",
    name: "Diane Umutoni",
    role: "Biotech Researcher",
    status: "student",
    department: "Biotechnology",
    skills: ["Microbiology", "Lab Research", "Data Analysis"],
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3",
    projects: ["Water Purification Solution", "Local Medicine Research"],
    bio: "PhD student researching affordable water purification using locally sourced materials."
  },
  {
    id: "5",
    name: "Kevin Hakizimana",
    role: "Fintech Entrepreneur",
    status: "alumni",
    department: "Business",
    skills: ["Finance", "Entrepreneurship", "Product Strategy", "Mobile Payments"],
    image: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3",
    projects: ["Mobile Savings Platform", "Farmer Payment System"],
    bio: "Binary Hub alumni who launched a successful fintech startup serving over 50,000 Rwandans."
  },
  {
    id: "6",
    name: "Claudine Nyiraneza",
    role: "Education Technologist",
    status: "faculty",
    department: "Education",
    skills: ["EdTech", "Curriculum Design", "Digital Literacy"],
    image: "https://images.unsplash.com/photo-1581992652564-44c42f5ad3ad?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3",
    projects: ["Rural School Tablet Program", "Teacher Training Platform"],
    bio: "Education faculty member pioneering digital literacy programs for rural schools."
  }
];

export const projects: Project[] = [
  {
    id: "1",
    title: "Smart Agriculture IoT Platform",
    description: "IoT system helping small-scale farmers monitor soil conditions and optimize irrigation.",
    innovators: ["1"],
    stage: "prototype",
    category: "Agriculture",
    image: "https://images.unsplash.com/photo-1628352081506-83c93d9a2b67?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: "2",
    title: "Rural Healthcare App",
    description: "Mobile application connecting remote communities with healthcare providers and resources.",
    innovators: ["2"],
    stage: "launched",
    category: "Healthcare",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: "3",
    title: "Community Solar Initiative",
    description: "Affordable solar energy solutions designed specifically for rural Rwandan communities.",
    innovators: ["3"],
    stage: "development",
    category: "Energy",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: "4",
    title: "Water Purification Solution",
    description: "Low-cost water purification system using locally available materials and simple technology.",
    innovators: ["4"],
    stage: "prototype",
    category: "Water",
    image: "https://images.unsplash.com/photo-1581092921461-39b9d009a73c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: "5",
    title: "Mobile Savings Platform",
    description: "Fintech solution helping unbanked Rwandans save money and build financial resilience.",
    innovators: ["5"],
    stage: "launched",
    category: "Finance",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: "6",
    title: "Rural School Tablet Program",
    description: "Educational initiative providing tablets and digital curricula to rural schools.",
    innovators: ["6"],
    stage: "development",
    category: "Education",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop&ixlib=rb-4.0.3"
  }
];

export const services: Service[] = [
  {
    id: "1",
    title: "Incubation Program",
    description: "12-week intensive program helping innovators develop ideas into viable prototypes and businesses.",
    icon: "rocket"
  },
  {
    id: "2",
    title: "Mentorship Network",
    description: "Connect with industry experts and successful entrepreneurs for guidance and advice.",
    icon: "users"
  },
  {
    id: "3",
    title: "Funding Access",
    description: "Support in accessing grants, investments, and other funding opportunities for your innovation.",
    icon: "banknote"
  },
  {
    id: "4",
    title: "Workspace & Resources",
    description: "Access to state-of-the-art facilities, equipment, and workspace for development and testing.",
    icon: "laptop"
  }
];

export const stats = [
  { value: "200+", label: "Innovators Supported" },
  { value: "45+", label: "Successful Startups" },
  { value: "$2.5M", label: "Investment Secured" },
  { value: "12", label: "Industry Partners" }
];
