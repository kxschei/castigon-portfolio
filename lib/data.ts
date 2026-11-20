import type { IconType } from "react-icons";
import type { AnimatedIconName } from "@/components/AnimatedIcon";
import { FaCss3Alt, FaJava } from "react-icons/fa6";
import {
  LuCodeXml,
  LuFacebook,
  LuGithub,
  LuLayers,
  LuMail,
  LuSmartphone,
  LuSquareTerminal,
  LuWrench,
} from "react-icons/lu";
import {
  SiAndroid,
  SiAndroidstudio,
  SiApachenetbeanside,
  SiFigma,
  SiFirebase,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiKotlin,
  SiMysql,
  SiNextdotjs,
  SiPhp,
  SiPython,
  SiReact,
  SiXampp,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

// ---------- Motion / theme constants ----------

/** Seconds before the hero and navbar entrance animations start. */
export const INTRO_DELAY = 0.2;

/** Cinematic ease-out curve used across reveals. */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

// ---------- Content ----------

export const profile = {
  name: "Cedrex Castigon",
  role: "Information Technology Student & Aspiring Developer",
  email: "castigonlloyd@gmail.com",
  /** Shown in the footer next to the copyright. */
  motto: "From fixing PCs to building software, one problem at a time.",
  bio: "I am a 2nd-year BSIT student at Holy Cross of Davao College passionate about building practical software solutions and exploring UI/UX design. I love turning complex problems into simple, user-friendly interfaces. My tech journey started in our family computer shop. Watching my father troubleshoot hardware sparked my curiosity, and I quickly learned how to assemble PCs and fix them myself. Combined with my love for gaming, this grew into a deep passion for technology. Today, I manage the technical side of our shop, and I brought that same hands-on problem-solving mindset into my IT studies in college.",
};

type Channel = {
  label: string;
  href: string;
  /** Short text shown on the Contact Information cards. */
  display: string;
  icon: IconType;
  /** Animated version of the icon (components/AnimatedIcon.tsx), used instead of `icon`. */
  animatedIcon?: AnimatedIconName;
};

const github: Channel = {
  label: "GitHub",
  href: "https://github.com/kxschei",
  display: "github.com/kxschei",
  icon: LuGithub,
  animatedIcon: "github",
};
const facebook: Channel = {
  label: "Facebook",
  href: "https://www.facebook.com/ishhtea",
  display: "facebook.com/ishhtea",
  icon: LuFacebook,
  animatedIcon: "facebook",
};
const email: Channel = {
  label: "Email",
  href: `mailto:${profile.email}`,
  display: profile.email,
  icon: LuMail,
  animatedIcon: "mail",
};

/** Hero icon buttons (order as shown). */
export const socials = [github, facebook, email];
/** Contact section cards (order as shown). */
export const contactChannels = [email, github, facebook];

export const navLinks = [
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Education", id: "experience" },
  { label: "Certificates", id: "certificates" },
  { label: "Resume", id: "resume" },
  { label: "Contact", id: "contact" },
];

// ---------- Education & Experience ----------

export type School = {
  name: string;
  /** e.g. "2022 – 2024". Contains "Present" → shown as current (accent badge). */
  period?: string;
  /** Optional small note, e.g. "2nd Year". */
  note?: string;
};

export const education: { level: string; schools: School[] }[] = [
  {
    level: "College",
    schools: [
      {
        name: "Holy Cross of Davao College",
        period: "2025 – Present",
        note: "Bachelor of Science in Information Technology · 2nd Year",
      },
      {
        name: "AMA Computer College Davao",
        period: "2024 – 2025",
        note: "Bachelor of Science in Information Technology · 1st Year",
      },
    ],
  },
  {
    level: "Senior High School",
    schools: [{ name: "Holy Cross of Agdao", period: "2022 – 2024" }],
  },
  {
    level: "Junior High School",
    schools: [{ name: "Holy Cross of Agdao", period: "2018 – 2022" }],
  },
  {
    level: "Elementary",
    schools: [{ name: "Rainbow Early Childhood Center Inc." }],
  },
];

/** Shared by the Experience section and the resume (/resume). Newest / ongoing first. */
export const experience: {
  title: string;
  subtitle: string;
  period: string;
  description: string;
}[] = [
  {
    title: "PC Technician — Family Computer Shop",
    subtitle: "Hardware & Technical Support",
    period: "Present",
    description:
      "Manage the technical side of our family computer shop: assembling PCs, diagnosing and repairing hardware issues, and keeping the shop's computers running smoothly.",
  },
  {
    title: "School Project — Personal Portfolio Website",
    subtitle: "Web Development Project",
    period: "2026 – Present",
    description:
      "Designed and developed a personal portfolio website as part of a school project. Created a responsive and user-friendly website with light and dark modes, smooth-scroll animations, and a working contact form to showcase personal information, technical skills, projects, and certificates using Next.js, React, TypeScript, Tailwind CSS, Framer Motion, Lenis, and Web3Forms.",
  },
  {
    title: "School Project — Android Firebase Authentication System",
    subtitle: "Mobile Application Development",
    period: "2026 – Present",
    description:
      "Developed an Android application in Kotlin using Android Studio and Firebase. Implemented Login, Register, and Logout with Firebase Authentication, allowing users to create accounts, sign in securely, and log out of the app.",
  },
  {
    title: "EcoShelf Inventory Management System",
    subtitle: "Desktop Application Development",
    period: "2024",
    description:
      "Developed a Java Swing desktop app in NetBeans with user registration and login, and full CRUD features for managing items with peso pricing. Data is saved to a local file so it persists between sessions.",
  },
  {
    title: "School Project — Web-Based Inventory System",
    subtitle: "Web Development Project",
    period: "2024",
    description:
      "Developed an inventory system for recording items and tracking stock levels using PHP, with a MySQL database managed through phpMyAdmin and hosted locally on XAMPP.",
  },
];

export type Skill = {
  name: string;
  icon: IconType;
  /** Brand color for the icon. Omit to use the theme's text color (e.g. GitHub). */
  color?: string;
};

export type SkillGroup = {
  title: string;
  icon: IconType;
  skills: Skill[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    icon: LuCodeXml,
    skills: [
      { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
      { name: "CSS3", icon: FaCss3Alt, color: "#1572B6" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs },
    ],
  },
  {
    title: "Backend & Database",
    icon: LuLayers,
    skills: [
      { name: "PHP", icon: SiPhp, color: "#777BB4" },
      { name: "Java", icon: FaJava, color: "#E76F00" },
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "MySQL", icon: SiMysql, color: "#4479A1" },
      { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
    ],
  },
  {
    title: "Mobile Development",
    icon: LuSmartphone,
    skills: [
      { name: "Android Dev", icon: SiAndroid, color: "#3DDC84" },
      { name: "Kotlin", icon: SiKotlin, color: "#7F52FF" },
    ],
  },
  {
    title: "Development Environment",
    icon: LuSquareTerminal,
    skills: [
      { name: "Visual Studio Code", icon: VscVscode, color: "#007ACC" },
      { name: "NetBeans", icon: SiApachenetbeanside, color: "#1B6AC6" },
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "GitHub", icon: SiGithub },
    ],
  },
  {
    title: "Tools & Platforms",
    icon: LuWrench,
    skills: [
      { name: "XAMPP", icon: SiXampp, color: "#FB7A24" },
      { name: "Figma", icon: SiFigma, color: "#F24E1E" },
      { name: "Android Studio", icon: SiAndroidstudio, color: "#4285F4" },
    ],
  },
];

export const aboutDetails = [
  { label: "Full Name", value: "Cedrex Castigon" },
  { label: "Program", value: "Bachelor of Science in Information Technology" },
  { label: "Year Level", value: "2nd Year" },
  { label: "Location", value: "Davao City, Philippines" },
];

/** `highlight: true` renders the pill in the accent color. */
export const interests = [
  { name: "Web & App Development" },
  { name: "UI/UX Design" },
  { name: "Cybersecurity" },
  { name: "Networking & IT Infrastructure" },
  { name: "Artificial Intelligence" },
  { name: "Game Development" },
  { name: "PC Building & Hardware", highlight: true },
];

export const currentlyLearning = ["UI/UX Design", "TypeScript"];

export type Project = {
  title: string;
  description: string;
  tech: string[];
  /** Link for "View Project". Omit to hide the link. */
  href?: string;
  /** Screenshots in /public/projects/ (16:9 fits best). Two or more rotate as a
   *  slideshow. Omit to show the numbered placeholder. */
  images?: string[];
  /** "What I built" — the concrete features, one or two sentences. */
  built?: string;
  /** "What I learned" — what was hard or new, in your own words. Hidden when empty. */
  learned?: string;
};

export const projects: Project[] = [
  {
    title: "Personal Portfolio",
    description:
      "A responsive personal portfolio with light and dark modes, smooth-scroll animations, and a working contact form to showcase my skills, projects, and certificates.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    // Visitors are already on the live site, so link to the source code
    href: "https://github.com/kxschei/castigon-portfolio",
    images: ["/projects/portfolio-hero.webp"],
    built:
      "Light and dark themes with no flash on load, scroll-triggered animations, animated social icons, project slideshows, a printable one-page resume, and a contact form that delivers to my inbox through Web3Forms.",
  },
  {
    title: "EcoShelf Inventory Management System",
    description:
      "A Java desktop app for managing store inventory. Users register and log in, then add, view, update, and delete items with peso pricing. Data is saved to a local file so it persists between sessions.",
    tech: ["Java", "Java Swing", "NetBeans"],
    images: ["/projects/ecoshelf-main.webp", "/projects/ecoshelf-login.webp"],
    built:
      "Login and registration screens, an inventory table, and Add, Get, Update, and Delete actions, with every record saved to a local file using Java serialization.",
  },
  {
    title: "Android Firebase Authentication System",
    description:
      "An Android app with user registration, login, and logout powered by Firebase Authentication, including input validation and a home screen that opens after signing in.",
    tech: ["Kotlin", "Android Studio", "Firebase"],
    images: ["/projects/android-auth-home.webp", "/projects/android-auth-login.webp"],
    built:
      "Register, Login, and Logout screens connected to Firebase Authentication, with input checks (no empty fields, passwords of at least 6 characters) and Firebase's error messages shown to the user.",
  },
];
