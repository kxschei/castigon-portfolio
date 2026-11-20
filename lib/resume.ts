// Content for the printable resume at /resume (and the PDF in /public/resume).
// After editing, ask to regenerate the PDF — or use "Print / Save as PDF" on /resume.

import { experience, profile } from "@/lib/data";

export const resume = {
  name: profile.name,
  tagline: "BSIT Student & Aspiring Developer",

  contact: {
    email: profile.email,
    location: "Davao City, Philippines",
    github: "github.com/kxschei",
    facebook: "facebook.com/ishhtea",
  },

  summary:
    "I am an Information Technology student at Holy Cross of Davao College with a passion for building practical software solutions and exploring UI/UX design. I have hands-on experience managing the technical side of a family computer shop, from assembling PCs to troubleshooting and repairing hardware. I apply that same problem-solving mindset to web, mobile, and software development while continuously improving my technical skills through academic projects and real-world experience.",

  education: [
    {
      school: "Holy Cross of Davao College",
      period: "2025 – Present",
      degree: "Bachelor of Science in Information Technology · Currently in 2nd Year",
    },
    {
      school: "AMA Computer College Davao",
      period: "2024 – 2025",
      degree: "Bachelor of Science in Information Technology · 1st Year",
    },
    {
      school: "Holy Cross of Agdao",
      period: "2018 – 2024",
      degree: "Junior High School (2018 – 2022) · Senior High School (2022 – 2024)",
    },
    {
      school: "Rainbow Early Childhood Center Inc.",
      degree: "Elementary",
    },
  ],

  // Same list as the website's Experience section (edit it in lib/data.ts)
  experience,

  certifications: [
    {
      title: "CCNA: Switching, Routing, and Wireless Essentials",
      issuer: "Cisco Networking Academy · AMA Computer University",
      date: "Dec 15, 2025",
    },
    {
      title: "C++ Advanced",
      issuer: "Cisco Networking Academy · AMA Computer University",
      date: "Apr 04, 2025",
    },
    {
      title: "CCNA: Introduction to Networks",
      issuer: "Cisco Networking Academy · AMA Computer University",
      date: "Apr 04, 2025",
    },
    {
      title: "CPA: Programming Essentials in C++",
      issuer: "Cisco Networking Academy",
      date: "Nov 26, 2024",
    },
    {
      title: "Web Development with Bubble.io Training",
      issuer: "JIT · Bubble",
      date: "Sep 28, 2024",
    },
  ],

  skills: [
    "HTML5 & CSS3",
    "JavaScript",
    "React & Next.js",
    "PHP",
    "Java",
    "Python",
    "MySQL",
    "Firebase",
    "Kotlin (Android)",
    "Git & GitHub",
    "VS Code / XAMPP",
    "Android Studio",
    "NetBeans IDE",
    "Figma (UI/UX)",
    "PC Assembly & Repair",
  ],

  /** Public path of the generated PDF. */
  pdf: "/resume/Cedrex-Castigon-Resume.pdf",
};
