// ============================================
// NAVIGATION
// ============================================

export const navLinks = [
  { name: "About", href: "#about" },
  { name: "Work", href: "#work" },
  { name: "Ventures", href: "#ventures" },
  { name: "Blog", href: "#blog" },
  { name: "Contact", href: "#contact" },
];

// ============================================
// SOCIAL LINKS
// ============================================

export const socialLinks = [
  { name: "Twitter", href: "https://twitter.com/", icon: "twitter" },
  { name: "GitHub", href: "https://github.com/", icon: "github" },
  { name: "Instagram", href: "https://instagram.com/", icon: "instagram" },
  { name: "Behance", href: "https://behance.net/", icon: "behance" },
];

// ============================================
// PROJECTS DATA
// ============================================

export interface Project {
  id: string;
  title: string;
  description: string;
  category: "code" | "lens";
  tags: string[];
  image: string;
  link?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  // CODE PROJECTS
  {
    id: "project-1",
    title: "Neural Visualizer",
    description: "Interactive 3D visualization of neural network architectures using WebGL and React.",
    category: "code",
    tags: ["WebGL", "React", "Three.js"],
    image: "/images/projects/neural-viz.jpg",
    featured: true,
  },
  {
    id: "project-2",
    title: "DevFlow Dashboard",
    description: "Real-time analytics dashboard for developer productivity metrics.",
    category: "code",
    tags: ["SaaS", "Next.js", "PostgreSQL"],
    image: "/images/projects/devflow.jpg",
  },
  {
    id: "project-3",
    title: "Sentient UI",
    description: "AI-powered component library that adapts to user behavior.",
    category: "code",
    tags: ["AI/ML", "React", "TensorFlow.js"],
    image: "/images/projects/sentient.jpg",
  },
  {
    id: "project-4",
    title: "CryptoFlow",
    description: "Decentralized finance tracking and portfolio management.",
    category: "code",
    tags: ["Blockchain", "Web3", "Solidity"],
    image: "/images/projects/cryptoflow.jpg",
  },
  {
    id: "project-5",
    title: "ML Pipeline Studio",
    description: "Visual drag-and-drop interface for building ML pipelines.",
    category: "code",
    tags: ["ML", "Python", "React Flow"],
    image: "/images/projects/ml-studio.jpg",
  },

  // LENS PROJECTS
  {
    id: "lens-1",
    title: "Echoes of Chennai",
    description: "A short film exploring the hidden rhythms of the city.",
    category: "lens",
    tags: ["Short Film", "Documentary"],
    image: "/images/projects/echoes.jpg",
    featured: true,
  },
  {
    id: "lens-2",
    title: "Neon Dreams",
    description: "Music video for indie artist featuring cyberpunk aesthetics.",
    category: "lens",
    tags: ["Music Video", "Cinematography"],
    image: "/images/projects/neon.jpg",
  },
  {
    id: "lens-3",
    title: "VIINKWEAR Campaign",
    description: "Indo-western fashion brand campaign shoot.",
    category: "lens",
    tags: ["Fashion", "Commercial"],
    image: "/images/projects/viinkwear.jpg",
  },
  {
    id: "lens-4",
    title: "Portrait Series: Creators",
    description: "Editorial portraits of Chennai's creative community.",
    category: "lens",
    tags: ["Portrait", "Editorial"],
    image: "/images/projects/creators.jpg",
  },
  {
    id: "lens-5",
    title: "Midnight Sessions",
    description: "Behind-the-scenes documentary of a music production.",
    category: "lens",
    tags: ["BTS", "Documentary"],
    image: "/images/projects/midnight.jpg",
  },
  {
    id: "lens-6",
    title: "Urban Geometry",
    description: "Architectural photography series exploring Chennai's structures.",
    category: "lens",
    tags: ["Architecture", "Photography"],
    image: "/images/projects/urban.jpg",
  },
];

// ============================================
// ABOUT SECTION
// ============================================

export const aboutData = {
  pullQuote: "Defining the space where code meets cinema.",
  shortIntro:
    "I'm a creator who refuses to choose between logic and art. By day, I architect ML systems and build SaaS products. By night, I craft visual narratives through lens and light.",
  longNarrative:
    "My journey began with curiosity — taking apart cameras and computers with equal fascination. Today, that curiosity drives everything I create. Whether I'm training neural networks or directing a short film, the goal remains the same: translate abstract ideas into tangible experiences that move people. Based in Chennai, I work at the intersection of technology and storytelling, believing that the best creations emerge when we stop seeing boundaries between disciplines.",
  stats: [
    { label: "Based in", value: "Chennai" },
    { label: "Age", value: "24" },
    { label: "Identity", value: "Creator" },
  ],
};

// ============================================
// TESTIMONIALS
// ============================================

export const testimonials = [
  {
    id: 1,
    quote:
      "Rishikesh translates abstract concepts into digital reality with a precision that is rare. He doesn't just write code; he writes narratives.",
    name: "Sarah Jenkins",
    role: "CTO, TechVentures",
  },
  {
    id: 2,
    quote:
      "Working with Rishikesh on our brand campaign was transformative. His eye for cinematic detail elevated every frame.",
    name: "Arjun Mehta",
    role: "Founder, VIINKWEAR",
  },
  {
    id: 3,
    quote:
      "One of the most versatile creators I've collaborated with — equally comfortable discussing ML architectures and shot compositions.",
    name: "Priya Sharma",
    role: "Creative Director",
  },
];
