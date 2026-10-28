export const personalInfo = {
  name: "GATAMBA Louis Prince",
  tagline: "Creative Designer & Tech Explorer — Bridging design, AI, and cybersecurity.",
  motto: "Innovation through creativity, security through knowledge.",
  email: "louisprince027@gmail.com",
  phone: "+250 783596959",
  location: "Kicukiro-Kigali",
  introVideo: "https://www.youtube.com/embed/E2PTRy3TXME",
  profileImage: "/api/placeholder/400/400"
};

import {
  BrainCircuit,
  CircuitBoard,
  Code2,
  Cpu,
  Lightbulb,
  MonitorSmartphone,
  Palette,
  ServerCog,
  ShieldCheck,
  TerminalSquare,
  type LucideIcon,
} from "lucide-react";

export const skills = [
  {
    name: "UI/UX Design",
    level: 90,
    category: "Design",
    icon: MonitorSmartphone,
  },
  {
    name: "Graphic Design",
    level: 70,
    category: "Design",
    icon: Palette,
  },
  {
    name: "Frontend Development",
    level: 90,
    category: "Design",
    icon: Code2,
  },
  {
    name: "Artificial Intelligence",
    level: 80,
    category: "Tech and security",
    icon: BrainCircuit,
  },
  {
    name: "Cybersecurity ",
    level: 75,
    category: "Tech and security",
    icon: ShieldCheck,
  },
  {
    name: "System Administration",
    level: 75,
    category: "Tech and security",
    icon: ServerCog,
  },
  {
    name: "Linux and Shell Scripting",
    level: 70,
    category: "Tech and security",
    icon: TerminalSquare,
  },
  {
    name: "Python Programming",
    level: 85,
    category: "Tech and security",
    icon: Cpu,
  },
  {
    name: "IoT and Embedded Systems",
    level: 70,
    category: "Tech and security",
    icon: CircuitBoard,
  },
  {
    name: "Problem Solving",
    level: 95,
    category: "Mindset",
    icon: Lightbulb,
  }
] satisfies Array<{
  name: string;
  level: number;
  category: "Design" | "Tech and security" | "Mindset";
  icon: LucideIcon;
}>;

export type ProjectShowcaseCard = {
  id: string;
  type: "overview" | "problem" | "features" | "technology" | "results" | "links";
  title: string;
  body?: string;
  description?: string;
  media?: string;
  tags?: string[];
  links?: {
    label: string;
    url: string;
  }[];
  role?: string;
  timeline?: string;
};

export type ProjectImage = {
  src: string;
  alt: string;
  caption: string;
};

export type Project = {
  id: number;
  title: string;
  description: string;
  tagline: string;
  category: string;
  skills: string[];
  liveUrl?: string;
  repoUrl?: string;
  images: Array<ProjectImage | string>;
  cards?: ProjectShowcaseCard[];
};

export const projects: Project[] = [
  {
    id: 1,
    title: "FireGuard IoT System",
    description:
      "A smart fire detection and response system using sensors, automation, and alerts to help identify risks early.",
    tagline: "Smart fire detection for safer spaces",
    category: "IoT",
    skills: ["IoT", "Sensors", "Automation", "Alerts"],
    liveUrl: "https://example.com/fireguard-demo",
    repoUrl: "https://github.com/Louis-Prince",
    images: [
      {
        src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
        alt: "Smart fire system hardware",
        caption: "Sensor overview"
      },
      {
        src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
        alt: "Monitoring dashboard",
        caption: "Dashboard overview"
      },
      {
        src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
        alt: "Fire alert response dashboard",
        caption: "Alert flow"
      },
      {
        src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
        alt: "Smart device control boards",
        caption: "Control layer"
      },
      {
        src: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?auto=format&fit=crop&w=1200&q=80",
        alt: "Emergency response monitoring",
        caption: "Response view"
      }
    ],
    cards: [
      {
        id: "fireguard-overview",
        type: "overview",
        title: "Purpose-built fire detection",
        body:
          "I designed FireGuard as a practical safety system focused on early detection and rapid response. The goal was to create a dependable prototype that could help monitor risk factors before they escalate.",
        role: "Full-stack / systems designer",
        timeline: "2024"
      },
      {
        id: "fireguard-problem",
        type: "problem",
        title: "Problem and solution",
        body:
          "Many safety environments lack responsive, low-cost monitoring systems. FireGuard addresses that gap by combining sensor-driven monitoring with real-time alert logic to support faster action.",
        tags: ["Early warning", "Safety systems", "Automation"]
      },
      {
        id: "fireguard-features",
        type: "features",
        title: "Key features",
        body:
          "The system is built around a simple workflow: detect environmental changes, interpret the signal, and trigger alert actions when risk thresholds are reached.",
        tags: ["Sensor monitoring", "Alert logic", "Safety automation"]
      },
      {
        id: "fireguard-technology",
        type: "technology",
        title: "Technology stack",
        tags: ["IoT", "Sensors", "Python", "Automation", "Alerting"],
        body:
          "The solution uses embedded sensing and a logic layer to interpret signals and trigger human-orientated safety responses."
      },
      {
        id: "fireguard-results",
        type: "results",
        title: "Outcomes",
        body:
          "The project demonstrates a working, practical safety-monitoring concept that supports early awareness and improves responsive decision-making in real-world conditions.",
        tags: ["Prototype", "Safety workflow", "Rapid detection"]
      },
      {
        id: "fireguard-links",
        type: "links",
        title: "Project links",
        links: [
          { label: "GitHub", url: "https://github.com/Louis-Prince" },
          { label: "Portfolio", url: "https://gatambalouis-prince.journoportfolio.com/" }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "E-learning Platform",
    description:
      "A SaaS-style learning dashboard with course management, user workflows, and authentication features.",
    tagline: "A streamlined digital learning experience built for clarity and engagement",
    category: "Web App",
    skills: ["React", "UI/UX", "Dashboard", "Authentication"],
    images: [
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1522204523234-8729aa6e3f7f?auto=format&fit=crop&w=1200&q=80"
    ],
    cards: [
      {
        id: "elearning-overview",
        type: "overview",
        title: "Course operations dashboard",
        body:
          "I built a dashboard-first learning platform concept focused on clarity, content management, and user access patterns in a modern SaaS-style experience.",
        role: "Product-minded UI developer",
        timeline: "2024"
      },
      {
        id: "elearning-problem",
        type: "problem",
        title: "Problem and solution",
        body:
          "Learning platforms often feel cluttered and difficult to manage. This concept focuses on simplifying course oversight, user access, and operational tasks inside a cleaner interface.",
        tags: ["Dashboard UX", "Learning workflow", "Product design"]
      },
      {
        id: "elearning-features",
        type: "features",
        title: "Key features",
        body:
          "The interface emphasizes role-based access, course organization, and a clear operational structure that supports both learners and administrators.",
        tags: ["Course management", "Authentication", "Admin UX"]
      },
      {
        id: "elearning-technology",
        type: "technology",
        title: "Technology stack",
        tags: ["React", "TypeScript", "UI/UX", "Authentication", "Dashboard patterns"],
        body:
          "The product blends front-end clarity with structured product flows to create a clean educational experience."
      },
      {
        id: "elearning-results",
        type: "results",
        title: "Outcomes",
        body:
          "The result is a product-style concept that balances usability, structure, and education-specific workflows in a polished, high-clarity interface.",
        tags: ["Product design", "Workflow clarity", "User experience"]
      },
      {
        id: "elearning-links",
        type: "links",
        title: "Project links",
        links: [
          { label: "Portfolio", url: "https://gatambalouis-prince.journoportfolio.com/" },
          { label: "LinkedIn", url: "https://www.linkedin.com/in/gatamba-louis-prince-b32b24285" }
        ]
      }
    ]
  },
  {
    id: 4,
    title: "Agricultural Disease Detection",
    description:
      "A computer vision project focused on detecting banana plant diseases for Rwanda and East Africa.",
    tagline: "AI-powered crop insight for healthier farming decisions",
    category: "AI",
    skills: ["Computer Vision", "Image Recognition", "Machine Learning", "Agriculture"],
    images: [
      "https://images.unsplash.com/photo-1464226184884-fa52ac9fcf6f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1200&q=80"
    ],
    cards: [
      {
        id: "agri-overview",
        type: "overview",
        title: "Plant health diagnostics",
        body:
          "I applied machine learning to agricultural image data to create a disease-detection workflow designed around a real local challenge in crop health monitoring.",
        role: "AI researcher / application builder",
        timeline: "2024"
      },
      {
        id: "agri-problem",
        type: "problem",
        title: "Problem and solution",
        body:
          "Crop diseases can remain undetected early, causing larger agricultural losses. The project applies computer vision to help identify plant health issues from imagery and support timely action.",
        tags: ["Agriculture", "Image analysis", "Diagnostics"]
      },
      {
        id: "agri-features",
        type: "features",
        title: "Key features",
        body:
          "The system focuses on classifying disease patterns in plant images and turning those classifications into actionable agricultural insight.",
        tags: ["Banana disease detection", "Image recognition", "Model-based analysis"]
      },
      {
        id: "agri-technology",
        type: "technology",
        title: "Technology stack",
        tags: ["Computer Vision", "Machine Learning", "Image Recognition", "Python", "Agriculture"],
        body:
          "This project combines image preprocessing and model-based classification to interpret crop health from visual evidence."
      },
      {
        id: "agri-results",
        type: "results",
        title: "Outcomes",
        body:
          "The result is a practical demonstration of AI solving a domain-specific problem in agriculture, with a strong emphasis on real-world relevance and early detection.",
        tags: ["AI for agriculture", "Crop diagnostics", "Problem-driven design"]
      },
      {
        id: "agri-links",
        type: "links",
        title: "Project links",
        links: [
          { label: "GitHub", url: "https://github.com/Louis-Prince" },
          { label: "Portfolio", url: "https://gatambalouis-prince.journoportfolio.com/" }
        ]
      }
    ]
  },
  {
    id: 5,
    title: "USBGUARD",
    description:
      "A Windows security utility for managing trusted USB devices, tracking connection activity, and flagging suspicious device usage.",
    tagline: "USB security and monitoring for safer device access",
    category: "Cybersecurity",
    skills: ["Cybersecurity", "Python", "Windows Security", "Device Monitoring"],
    images: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: 6,
    title: "Cyber Spread Model",
    description:
      "A cybersecurity simulation that models how malware may propagate through connected systems and explores how containment strategies affect spread.",
    tagline: "Exploring malware propagation and containment through simulation",
    category: "Cybersecurity",
    skills: ["Cybersecurity", "Python", "Network Security", "Simulation"],
    images: [
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: 7,
    title: "Security Monitoring and Threat Detection Lab",
    description:
      "A practical security operations lab focused on log review, suspicious activity detection, endpoint monitoring, and incident investigation.",
    tagline: "Hands-on SOC and detection practice for modern security teams",
    category: "Cybersecurity",
    skills: ["SOC", "SIEM", "Splunk", "Sysmon", "Wireshark", "MITRE ATT&CK"],
    images: [
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: 8,
    title: "Network Security and Vulnerability Assessment Lab",
    description:
      "A hands-on laboratory covering network discovery, service enumeration, vulnerability assessment, and packet analysis in controlled environments.",
    tagline: "Security testing and analysis using modern offensive tooling",
    category: "Cybersecurity",
    skills: ["Kali Linux", "Nmap", "Wireshark", "Network Security", "Linux"],
    images: [
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: 11,
    title: "Survey Monitoring System (CSMS)",
    description:
      "A digital monitoring dashboard designed to support structured data review, survey operations, and user-centered decision workflows.",
    tagline: "Dashboard design for operational visibility and monitoring",
    category: "UI/UX",
    skills: ["UI/UX", "Dashboard Design", "Figma", "Data Visualization", "User Research"],
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1522204523234-8729aa6e3f7f?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: 15,
    title: "Creative Design & Digital Branding",
    description:
      "A collection of creative design work showcasing brand identity, logo design, typography, visual storytelling, and digital promotional materials for clear, consistent, and engaging communication across digital platforms.",
    tagline: "Creative design systems built for clarity, consistency, and impact",
    category: "Creative",
    skills: ["Graphic Design", "Brand Identity", "Visual Design", "Digital Marketing", "Social Media Design"],
    images: [
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: 17,
    title: "Active Directory and Windows Server Administration Lab",
    description:
      "A practical system administration lab covering Windows Server configuration, user management, authentication, permissions, and centralized administration.",
    tagline: "Windows infrastructure practice for enterprise-ready administration",
    category: "Infrastructure",
    skills: ["Windows Server", "Active Directory", "System Administration", "Networking"],
    images: [
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: 18,
    title: "Linux Server Administration and Network Services",
    description:
      "A Linux administration lab covering server configuration, troubleshooting, command-line operations, and foundational infrastructure security.",
    tagline: "Linux operations and networking fundamentals in practice",
    category: "Infrastructure",
    skills: ["Linux", "Ubuntu Server", "Networking", "System Administration", "Troubleshooting"],
    images: [
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: 19,
    title: "Network Infrastructure and Firewall Lab",
    description:
      "A virtual networking environment covering firewall rules, traffic control, routing concepts, and secure communication between systems.",
    tagline: "Networking and security practice through controlled lab environments",
    category: "Networking",
    skills: ["Networking", "pfSense", "Firewall", "Virtualization", "Network Security"],
    images: [
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80"
    ]
  }
];

export const socialProfiles = [
  { name: "GitHub", url: "https://github.com/Louis-Prince", icon: "github" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/gatamba-louis-prince-b32b24285", icon: "linkedin" },
  { name: "Instagram", url: "https://www.instagram.com/da_west_001/", icon: "instagram" }
];

export const downloadableFiles = [
  { 
    name: "CV - GATAMBA Louis Prince", 
    type: "PDF", 
    size: "2.1 MB", 
    url: "https://drive.google.com/file/d/1FoO6amFaEcHQAgQHGlz9yIBmG28WwGto/view?usp=drive_link", 
    description: "Complete professional resume" 
  },
  { 
    name: "Portfolio Collection", 
    type: "PDF", 
    size: "15.3 MB", 
    url: "https://drive.google.com/drive/folders/1mxJakXisHdRIyc4_axP2G89uoofaz04V?usp=drive_link", 
    description: "Comprehensive portfolio showcase" 
  },
  { 
    name: "Certifications", 
    type: "PDF", 
    size: "3.2 MB", 
    url: "https://drive.google.com/drive/folders/10Ixd4BsAalmJbn1-U9GBcQOYmXiMiJL3?usp=drive_link", 
    description: "Professional certifications and achievements" 
  }
];

export const secretarySystemPrompt = `
You are an advanced AI portfolio assistant representing GATAMBA Louis Prince, an Information Technology graduate based in Kigali, Rwanda.

You act as his intelligent digital representative — combining the roles of:
- Personal assistant
- Technical expert
- Recruiter-facing guide

Your mission is to impress visitors, recruiters, and collaborators by delivering clear, confident, and engaging responses.

-----------------------------------
🧠 CORE BEHAVIOR
-----------------------------------
- Speak naturally like a human, not like a robot
- Be confident, but not arrogant
- Be concise, but impactful
- Always sound professional and helpful
- Adapt tone depending on the question:
  - Recruiter → persuasive & value-focused
  - Technical → clear & structured
  - Casual → friendly & conversational

-----------------------------------
👤 PROFILE
-----------------------------------
Name: GATAMBA Louis Prince  
Location: Kigali, Rwanda  
Email: louisprince027@gmail.com  

A highly motivated IT professional with strong expertise in:
- Cybersecurity
- Networking
- Programming (JavaScript, Python, C++)
- Linux & System Administration
- UI/UX Design & Graphic Design
- Database Management

Known for:
- Problem-solving mindset
- Strong collaboration skills
- Building user-centered solutions
- Continuous learning and adaptability

-----------------------------------
🎓 EDUCATION
-----------------------------------
- BSc (Hons) Information Technology — University of Rwanda (2021–2025)
- Advanced Certificate (A2) — Lycée de Kigali (2019)
- Academic Excellence Recognition (2018)

-----------------------------------
💼 EXPERIENCE
-----------------------------------
🔹 Rwanda Revenue Authority (RRA) — System Administration Intern
- Active Directory management
- System performance optimization
- IT infrastructure support

🔹 ThinkCyber Program (Ranked 4th)
- SOC Analysis
- Windows Forensics
- Linux Security

🔹 CMU-Africa Bridge Program
- IoT systems
- Image recognition
- Technical pitching

🔹 Solvit Africa — Code2Connect Fellowship
- UI/UX design
- Real-world product development

-----------------------------------
📜 CERTIFICATIONS
-----------------------------------
From:
- Cisco Networking Academy (CCNA, CyberOps, Networking)
- Google (Cybersecurity, Data Science)
- ThinkCyber (SOC Analyst, Linux, Python, Forensics)

-----------------------------------
🛠️ PROJECTS & SYSTEMS
-----------------------------------
Highlight these when asked about projects:

1. FireGuard IoT System
   - Smart fire detection & response system
   - Uses sensors, automation, and alerts

2. Face Recognition Attendance System
   - Built with AI (MTCNN + FaceNet)
   - Raspberry Pi integration

3. E-learning Platform
   - Admin dashboard (SaaS-style)
   - Course management & authentication system

4. Agricultural Image Recognition
   - Detects banana diseases
   - Focused on Rwanda/East Africa

-----------------------------------
🌍 LANGUAGES
-----------------------------------
- Kinyarwanda (Fluent)
- English (Very Good)
- Swahili (Good)

-----------------------------------
🎯 PERSONALITY STYLE
-----------------------------------
- Friendly, smart, and helpful
- Slightly inspired by a professional AI assistant (like a calm, intelligent assistant)
- Never overly robotic or stiff

-----------------------------------
⚡ SMART RESPONSE MODES
-----------------------------------

1. 🧑‍💼 RECRUITER MODE (trigger words: hire, job, why you, candidate)
- Emphasize:
  - Real-world experience
  - Problem-solving ability
  - Practical skills over theory
- Sound confident and valuable

2. 💻 TECH MODE (trigger: explain, how, system, code, cybersecurity)
- Break down concepts simply
- Use examples when needed
- Stay clear and structured

3. 🚀 PROJECT MODE (trigger: projects, built, system)
- List key projects
- Brief explanation of impact and tech used

4. 📞 CONTACT MODE (trigger: contact, reach, email)
- Provide email clearly
- Keep it short and professional

5. 💬 CASUAL MODE
- Friendly and conversational
- Keep it natural

-----------------------------------
📌 RESPONSE RULES
-----------------------------------
- Never say "based on CV" or "according to document"
- Never mention ChatGPT
- Always answer as Louis's assistant or as Louis himself
- Keep answers short unless user asks for details
- Prioritize clarity over complexity
- If unclear question → ask a short clarification

-----------------------------------
✨ UI-AWARE BEHAVIOR (IMPORTANT)
-----------------------------------
- Keep responses clean for chat UI
- Use short paragraphs (2–4 lines max)
- Use bullet points ONLY when helpful
- Avoid long blocks of text
- Make responses feel interactive

-----------------------------------
💬 EXAMPLES
-----------------------------------

Q: Who are you?
A:
"I'm Louis Prince, an IT graduate specializing in cybersecurity, system administration, and intelligent systems. I enjoy building secure, scalable solutions that solve real-world problems."

Q: Why should we hire you?
A:
"I combine strong technical skills with real-world experience. At Rwanda Revenue Authority, I worked on live systems, and through my cybersecurity training, I've developed hands-on expertise in SOC analysis and Linux security. I focus on solving problems, not just understanding them."

Q: What projects have you built?
A:
"I've worked on several systems including:
- A smart IoT fire detection system (FireGuard)
- A face recognition attendance system using AI
- A full-featured e-learning platform
- An image recognition system for crop disease detection"

-----------------------------------

Always aim to:
✔ Impress recruiters  
✔ Explain clearly  
✔ Represent Louis as a strong, capable tech professional
`;

export const chatbotResponses = {
  greeting: "Hello! Great to connect with you. I'm Louis Prince, an IT graduate specializing in cybersecurity, system administration, networking, and Linux. I also have experience in programming and UI/UX design, allowing me to build secure, scalable, and user-centered solutions.\n\nBeyond my technical background, I bring strong interpersonal skills, including communication, teamwork, and problem-solving, which help me collaborate effectively and deliver impactful results.\n\nWhat can I help you with today?",
  
  skills: "I bring strong technical expertise in cybersecurity, networking, and programming. My background includes hands-on experience with JavaScript, Python, and C++, plus Linux system administration. I'm also skilled in UI/UX design and database management. What area interests you most?",
  
  projects: "I've built several practical systems that demonstrate my technical capabilities:\n\n🔥 FireGuard IoT System: Smart fire detection with sensors and automated alerts\n👤 Face Recognition Attendance: AI-powered system using MTCNN and FaceNet on Raspberry Pi\n📚 E-learning Platform: Full SaaS-style admin dashboard with course management\n🍌 Agricultural Disease Detection: Computer vision system for crop health monitoring\n\nEach project focuses on solving real problems with technology. Which one would you like to know more about?",
  
  contact: "You can reach me directly:\n📧 Email: louisprince027@gmail.com\n📞 Phone: +250 783 596 959\n🌍 Instagram: @da_west_001\n💼 LinkedIn: linkedin.com/in/gatamba-louis-prince-b32b24285\n🐙 GitHub: github.com/Louis-Prince\n\nI prefer email for initial contact, but I'm happy to schedule a call. What works best for you?",
  
  services: "I offer professional services in:\n\n🔒 Cybersecurity & Ethical Hacking: Security assessments and SOC analysis\n🧠 AI & Machine Learning: Custom models and computer vision systems\n💻 Software Development: Full-stack applications with modern tech stacks\n🔧 System Administration: Linux, networking, and infrastructure support\n🎨 UI/UX Design: User-centered design and prototyping\n\nI'm particularly strong in cybersecurity and intelligent systems. What kind of project are you working on?",
  
  availability: "I'm available for collaboration and new opportunities. Based in Kigali, Rwanda, I work with teams globally and can handle remote or in-person engagements.\n\n⏰ Business Hours: Mon–Fri, 09:00–18:00 (Kigali time, UTC+2)\n🎯 Open to: Freelance projects, full-time roles, internships, and technical consultations\n📍 Location: Kigali, Rwanda (remote preferred)\n\nI can schedule 15, 30, or 60-minute consultations. When would suit you?",
  
  portfolio: "Check out my complete portfolio at https://gatambalouis-prince.journoportfolio.com/ — it showcases my projects, certifications, and professional work.\n\n📄 CV Download: Available in Communications Materials\n📁 Project Showcase: Detailed case studies and demos\n📜 Certifications: Cisco, Google, and ThinkCyber credentials\n\nI'd be happy to walk you through my work during a call. Interested?",
  
  goals: "I'm focused on becoming a top cybersecurity expert while building impactful AI systems for Africa. My goals include:\n\n🎯 Mastering advanced cybersecurity techniques\n🌍 Developing AI solutions for local challenges\n💡 Creating secure, intelligent digital systems\n🔐 Contributing to Rwanda's growing tech ecosystem\n\nI'm passionate about using technology to solve real-world problems. What opportunities do you see in this space?"
};
