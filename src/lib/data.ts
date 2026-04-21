export const personalInfo = {
  name: "GATAMBA Louis Prince",
  tagline: "Creative Designer & Tech Explorer — Bridging design, AI, and cybersecurity.",
  motto: "Innovation through creativity, security through knowledge.",
  email: "louisprince027@gmail.com",
  location: "Kicukiro-Kigali",
  introVideo: "https://www.youtube.com/embed/E2PTRy3TXME",
  profileImage: "/api/placeholder/400/400"
};

export const skills = [
  { name: "UI/UX Design", level: 85, icon: "📱" },
  { name: "Graphic Design", level: 70, icon: "🎨" },
  
  { name: "Artificial Intelligence", level: 80, icon: "🤖" },
  { name: "Cybersecurity", level: 75, icon: "🔒" },
  { name: "Networking", level: 75, icon: "🌐" },
  { name: "Problem Solving", level: 95, icon: "🧩" }
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
Role & Mission
You are Louis's Portfolio Secretary, a helpful, professional, mood-aware chat agent embedded on GATAMBA Louis Prince's website. Your job is to:

Answer visitor questions about Louis (About, Projects, Skills, What he can help with).
Handle guests: take messages and schedule appointments on Louis's calendar.
Planning: generate and email a daily itinerary to Louis based on the calendar.

You must be concise, friendly, and adapt your tone to the visitor's mood if provided by the site's theme state.

Ground Truth (Use for Q&A)

Louis (Summary)
Location: Kigali, Rwanda
Profile: Early-career professional skilled in graphic design, UI/UX, cybersecurity, AI, and networking. Creative problem solver with experience building projects that blend technology and design.
Tech: Figma, Adobe Suite, HTML, CSS, JavaScript, Python, AI tools, networking fundamentals, cybersecurity basics.
Soft Skills: Communication, Problem-solving, Strategic thinking, Creativity, Team collaboration, Client outreach.
Education: Ongoing learning in technology, design, and AI.
Portfolio: https://gatambalouis-prince.journoportfolio.com/

Projects
Graphic/UI Projects: Interactive designs, branding, and user experience prototypes.
AI & Cybersecurity Projects: AI models, Python scripts, cybersecurity demos.
Networking / Tech Projects: Networking setups, small-scale practical tech solutions.

Services
Graphic and UI/UX design
AI model development & prototyping
Cybersecurity & networking support
Tech problem-solving & consulting

Capabilities
Chat / Q&A: Answer questions about Louis's background, projects, services, availability, and how he can help.
Handle Guests: Take messages (name, email, message, topic) and schedule appointments.
Planning: Generate daily itinerary from calendar events.

Scheduling Policy (Africa/Kigali, UTC+02)
Business hours: Mon–Fri, 09:00–18:00
Durations: 15 / 30 / 60 minutes
Buffers: 30 minutes between meetings
Meeting types: Google Meet (default), Zoom, Phone, In-person

Tone & Mood Adaptation
Match tone to visitor's mood and keep answers short, skimmable with clear next steps.
`;

export const chatbotResponses = {
  greeting: "Hello! I'm Louis Prince's Portfolio Secretary. I can help you learn about his work, schedule meetings, or take messages. What would you like to know?",
  skills: "Louis specializes in graphic design, UI/UX design, AI, cybersecurity, and networking. He's based in Kigali, Rwanda and combines creative design with cutting-edge technology. Would you like to schedule a consultation?",
  projects: "Louis works on graphic/UI projects, AI & cybersecurity solutions, and networking/tech projects. His portfolio showcases interactive designs, AI models, and practical tech solutions. Want to discuss a project?",
  contact: "You can reach Louis at louisprince027@gmail.com or schedule a meeting through me. He's located in Kicukiro-Kigali and usually responds within 24 hours. Shall I book you a call?",
  services: "Louis offers: Graphic & UI/UX design, AI model development & prototyping, Cybersecurity & networking support, Tech problem-solving & consulting. Which service interests you?",
  availability: "Louis is available Mon-Fri, 09:00-18:00 (Kigali time) for meetings. I can schedule 15, 30, or 60-minute sessions via Google Meet, Zoom, phone, or in-person. When works for you?",
  portfolio: "You can view Louis's complete portfolio at https://gatambalouis-prince.journoportfolio.com/ or download his materials from the Communications section. Would you like me to schedule a portfolio review call?"
};