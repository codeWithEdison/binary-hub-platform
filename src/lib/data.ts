
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

// Update projects to include new fields
export const innovators: Innovator[] = [
  {
    id: "1",
    name: "UWIHANGANYE Edison",
    role: "Software Developer",
    status: "student",
    department: "Computer Science",
    skills: ["React", "Node.js", "AI", "Machine Learning", 'block chain'],
    image: "https://media.licdn.com/dms/image/v2/D4D03AQH_4THyS9-igg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1715287233733?e=1746662400&v=beta&t=utWb8N1bWMnRRO4uT6Qxu-wVa1D-sCtQGHlb_g17818",
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
    categories: ["Agriculture", "IoT", "Technology"],
    image: "https://images.unsplash.com/photo-1628352081506-83c93d9a2b67?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3",
    date: "2023-09-15",
    status: "In Progress",
    team: [
      { name: "UWIHANGANYE Edison", role: "Lead Developer", image: "https://media.licdn.com/dms/image/v2/D4D03AQH_4THyS9-igg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1715287233733?e=1746662400&v=beta&t=utWb8N1bWMnRRO4uT6Qxu-wVa1D-sCtQGHlb_g17818" },
      { name: "Marie Uwase", role: "IoT Specialist", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3" }
    ],
    links: {
      demo: "https://demo.example.com",
      github: "https://github.com/example/project"
    }
  },
  {
    id: "2",
    title: "Rural Healthcare App",
    description: "Mobile application connecting remote communities with healthcare providers and resources.",
    innovators: ["2"],
    stage: "launched",
    category: "Healthcare",
    categories: ["Healthcare", "Mobile", "Social Impact"],
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    date: "2023-06-22",
    status: "Completed",
    team: [
      { name: "Marie-Claire Uwamahoro", role: "UX Designer", image: "https://images.unsplash.com/photo-1614644147798-f8c0fc9da7f6?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3" },
      { name: "Jean Mutabazi", role: "Mobile Developer", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3" },
      { name: "Alice Kayitesi", role: "Healthcare Consultant", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3" }
    ],
    links: {
      demo: "https://healthcare-app.example.com",
      website: "https://healthcare-project.example.com"
    }
  },
  {
    id: "3",
    title: "Community Solar Initiative",
    description: "Affordable solar energy solutions designed specifically for rural Rwandan communities.",
    innovators: ["3"],
    stage: "development",
    category: "Energy",
    categories: ["Energy", "Sustainability", "Community"],
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3",
    date: "2023-11-08",
    status: "In Progress",
    team: [
      { name: "Eric Mugisha", role: "Renewable Energy Engineer", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3" },
      { name: "Patricia Umutoni", role: "Community Liaison", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3" }
    ]
  },
  {
    id: "4",
    title: "Water Purification Solution",
    description: "Low-cost water purification system using locally available materials and simple technology.",
    innovators: ["4"],
    stage: "prototype",
    category: "Water",
    categories: ["Water", "Health", "Technology"],
    image: "https://images.unsplash.com/photo-1581092921461-39b9d009a73c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    date: "2023-08-14",
    status: "In Progress",
    team: [
      { name: "Diane Umutoni", role: "Biotech Researcher", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3" },
      { name: "Patrick Niyonzima", role: "Water Engineer", image: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1581092921461-39b9d009a73c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1562016600-ece13e8ba570?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3"
    ],
    updates: [
      {
        date: "2023-08-14",
        title: "Project Launch",
        content: "We're excited to start the development of our water purification solution."
      },
      {
        date: "2023-10-22",
        title: "First Prototype",
        content: "Successfully tested our first prototype with promising results in lab conditions."
      }
    ]
  },
  {
    id: "5",
    title: "Mobile Savings Platform",
    description: "Fintech solution helping unbanked Rwandans save money and build financial resilience.",
    innovators: ["5"],
    stage: "launched",
    category: "Finance",
    categories: ["Finance", "Mobile", "Financial Inclusion"],
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    date: "2023-03-05",
    status: "Completed",
    team: [
      { name: "Kevin Hakizimana", role: "Fintech Entrepreneur", image: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3" },
      { name: "Grace Mukeshimana", role: "Mobile Developer", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3" },
      { name: "James Ngabo", role: "Financial Advisor", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3" }
    ],
    links: {
      website: "https://savings-platform.example.com"
    },
    technologies: ["React Native", "Node.js", "MongoDB", "AWS"]
  },
  {
    id: "6",
    title: "Rural School Tablet Program",
    description: "Educational initiative providing tablets and digital curricula to rural schools.",
    innovators: ["6"],
    stage: "development",
    category: "Education",
    categories: ["Education", "Technology", "Rural Development"],
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop&ixlib=rb-4.0.3",
    date: "2023-12-01",
    status: "In Progress",
    team: [
      { name: "Claudine Nyiraneza", role: "Education Technologist", image: "https://images.unsplash.com/photo-1581992652564-44c42f5ad3ad?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3" },
      { name: "Emmanuel Ndayisaba", role: "Educational Content Creator", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3" }
    ],
    technologies: ["Android", "Educational Apps", "Solar Charging"],
    gallery: [
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1610484826967-09c5720778c7?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1610484827141-843f6b092676?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3"
    ]
  }
];

export const services: Service[] = [
  {
    id: "1",
    title: "Access to Skilled Talent",
    description: "Get access to experienced developers, designers, testers, and mentors with innovative thinking.",
    icon: "users"
  },
  {
    id: "2",
    title: "Cost Efficiency",
    description: "Development costs significantly reduced with shared infrastructure and tools.",
    icon: "banknote"
  },
  {
    id: "3",
    title: "Mentorship & Technical Guidance",
    description: "Get mentorship from industry experts, professors, and senior developers.",
    icon: "rocket"
  },
  {
    id: "4",
    title: "Infrastructure & Workspace",
    description: "Free access to office space, internet, devices, testing tools, and meeting rooms.",
    icon: "laptop"
  },
  {
    id: "5",
    title: "Funding Opportunities",
    description: "Early-stage grants, stipends, and connections to investors and innovation funds.",
    icon: "award"
  },
  {
    id: "6",
    title: "Networking & Exposure",
    description: "Access to hackathons, demos, exhibitions, seminars, meetings, and conferences.",
    icon: "network"
  }
];

export const stats = [
  { value: "200+", label: "Innovators Supported" },
  { value: "5+", label: "Flagship Projects" },
  { value: "50+", label: "Active Students" },
  { value: "10+", label: "Industry Partners" }
];
