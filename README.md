# Cedrex Castigon — Personal Portfolio Website

A responsive personal portfolio website that presents my background, technical skills, projects, education, certificates, and resume, with a working contact form so visitors can reach me directly.

- **Live site:** https://cedrexportfolio.vercel.app
- **Repository:** https://github.com/kxschei/castigon-portfolio

---

## Table of Contents

1. [Project Description](#project-description)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Getting Started](#getting-started)
5. [Environment Variables](#environment-variables)
6. [Available Scripts](#available-scripts)
7. [Project Structure](#project-structure)
8. [Updating the Content](#updating-the-content)
9. [Deployment](#deployment)
10. [Author](#author)

---

## Project Description

This project is a single-page portfolio website built with **Next.js** and **React**. It acts as an online résumé: visitors can learn who I am, see the tools and languages I work with, browse my school and personal projects, view my certificates, read or download my resume, and send me a message.

The goals of the project were to:

- Build a real, publicly deployed website instead of a static class exercise.
- Practice modern front-end development with components, TypeScript, and utility-first CSS.
- Design an interface that works well on phones, tablets, and desktops, in both light and dark mode.
- Keep all portfolio content in one data file so the site is easy to update without touching the layout code.

The page is divided into the following sections:

| # | Section | Contents |
|---|---|---|
| — | **Hero** | Name, role, call-to-action buttons, social links, and portrait photo |
| 01 | **About** | Short bio, personal details, interests, and what I am currently learning |
| 02 | **TechStack** | Languages, frameworks, databases, and tools, grouped by category |
| 03 | **Projects** | Project cards with screenshots, descriptions, what I built, and technologies used |
| 04 | **Education & Experience** | Education timeline and related experience |
| 05 | **Certificates** | Earned certificates (Cisco NetAcad and others) with preview images |
| 06 | **Resume** | Resume preview with links to the printable page and PDF download |
| — | **Contact** | Contact form and contact channels in the footer |

---

## Features

- **Responsive design** — layouts adapt from small phones to wide desktop screens. On phones the portrait moves into the About section so the first screen stays focused on the introduction.
- **Light and dark themes** — a toggle in the navigation bar switches themes. The choice is saved in the browser, and first-time visitors get the theme that matches their device setting. A small script runs before the page is drawn so there is no "flash" of the wrong theme on load.
- **Smooth scrolling and animations** — smooth scrolling between sections, a letter-by-letter animated headline, and sections that fade in as they scroll into view. Animations are reduced automatically for users who enable "reduce motion" on their device.
- **Animated social icons** — the social links use lightweight Lottie animations.
- **Project slideshows** — project cards with more than one screenshot show an auto-advancing slideshow with clickable dots.
- **Printable resume** — a dedicated `/resume` page laid out to fit on one A4 page when printed, plus a downloadable PDF copy.
- **Working contact form** — messages are sent to my email inbox through the Web3Forms API, with loading, success, and error states shown to the user.
- **Link previews** — page metadata and a generated Open Graph image, so sharing the link on social media shows a proper preview card.
- **Optimized images and fonts** — images are served through `next/image` (resized and compressed per device), and fonts are loaded with `next/font`.
- **Accessible markup** — semantic HTML, labelled form fields and links, and keyboard-friendly navigation, including a mobile menu.

---

## Tech Stack

| Category | Technology | Purpose |
|---|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router) | Routing, rendering, image and font optimization |
| UI Library | [React 19](https://react.dev) | Component-based user interface |
| Language | [TypeScript 5](https://www.typescriptlang.org) | Type-safe JavaScript |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) | Utility-first styling and theming |
| Animation | [Framer Motion](https://motion.dev) | Page and scroll animations |
| Smooth Scroll | [Lenis](https://lenis.darkroom.engineering) | Smooth scrolling between sections |
| Icons | [React Icons](https://react-icons.github.io/react-icons), [Lottie](https://airbnb.io/lottie) | Static and animated icons |
| Forms | [Web3Forms](https://web3forms.com) | Delivers contact form messages by email |
| Code Quality | ESLint | Linting and consistent code style |
| Hosting | [Vercel](https://vercel.com) | Deployment and automatic builds from GitHub |
| Version Control | Git and GitHub | Source control and project history |

---

## Getting Started

Follow these steps to run the project on your own computer.

### Prerequisites

- [Node.js](https://nodejs.org) **version 20.9 or later** (includes npm)
- [Git](https://git-scm.com)
- A code editor such as [Visual Studio Code](https://code.visualstudio.com)

You can check your installed versions with:

```bash
node -v
npm -v
git --version
```

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/kxschei/castigon-portfolio.git
   cd castigon-portfolio
   ```

2. **Install the dependencies**

   ```bash
   npm install
   ```

3. **Set up the environment variables** (needed for the contact form — see [Environment Variables](#environment-variables))

   Create a file named `.env.local` in the project root and add:

   ```env
   NEXT_PUBLIC_WEB3FORMS_KEY=your_web3forms_access_key
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open the site** at [http://localhost:3000](http://localhost:3000). The page reloads automatically when you save changes.

### Building for Production

To create and test an optimized production build locally:

```bash
npm run build
npm run start
```

---

## Environment Variables

Environment variables are stored in a `.env.local` file in the project root. This file is listed in `.gitignore`, so private keys are never uploaded to GitHub.

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_WEB3FORMS_KEY` | Yes, for the contact form | Access key from [Web3Forms](https://web3forms.com). Messages sent through the form are delivered to the email address that created the key. Without it, the form shows "The contact form isn't connected yet." |
| `NEXT_PUBLIC_SITE_URL` | No | The site's public address, used for link-preview images. On Vercel it is detected automatically; set it only when hosting somewhere else. Defaults to `http://localhost:3000`. |

**Getting a Web3Forms key:** go to [web3forms.com](https://web3forms.com), enter the email address that should receive messages, and copy the access key that is sent to you.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the development server at `http://localhost:3000` |
| `npm run build` | Creates an optimized production build |
| `npm run start` | Runs the production build (run `npm run build` first) |
| `npm run lint` | Checks the code with ESLint |

---

## Project Structure

```
castigon-portfolio/
├── app/                        # Pages and global setup (Next.js App Router)
│   ├── layout.tsx              # Root layout: fonts, metadata, theme script
│   ├── page.tsx                # Home page — puts all the sections together
│   ├── globals.css             # Global styles and light/dark color tokens
│   ├── opengraph-image.tsx     # Generates the link-preview image
│   ├── icon.svg                # Browser tab icon
│   └── resume/
│       └── page.tsx            # Printable resume page (/resume)
│
├── components/                 # Reusable UI components
│   ├── Navbar.tsx              # Top navigation and mobile menu
│   ├── Hero.tsx                # Intro headline, buttons, and social links
│   ├── Portrait.tsx            # Portrait photo frame (used in Hero and About)
│   ├── BentoAbout.tsx          # About section and shared section heading
│   ├── Skills.tsx              # TechStack section
│   ├── Projects.tsx            # Project cards and screenshot slideshows
│   ├── Experience.tsx          # Education & Experience timeline
│   ├── Certificates.tsx        # Certificates gallery
│   ├── ResumeSection.tsx       # Resume preview section
│   ├── ResumeDocument.tsx      # Full resume layout for /resume
│   ├── ContactForm.tsx         # Contact form (Web3Forms)
│   ├── Footer.tsx              # Contact area and footer
│   ├── ThemeToggle.tsx         # Light/dark mode switch
│   ├── SmoothScroll.tsx        # Smooth scrolling and motion settings
│   ├── AnimatedIcon.tsx        # Animated social icons
│   ├── LottieIcon.tsx          # Lottie animation player
│   └── Logo.tsx                # Site logo
│
├── lib/                        # Site content (edit these to update the site)
│   ├── data.ts                 # Profile, socials, skills, projects, education
│   └── resume.ts               # Resume content
│
├── public/                     # Static files served as-is
│   ├── portrait-full.jpg       # Portrait photo
│   ├── projects/               # Project screenshots
│   ├── certificates/           # Certificate images
│   ├── resume/                 # Resume PDF and preview image
│   └── lottie/                 # Animated icon files
│
├── assets/fonts/               # Fonts used for the link-preview image
├── next.config.ts              # Next.js configuration
├── tsconfig.json               # TypeScript configuration
├── eslint.config.mjs           # ESLint configuration
└── package.json                # Dependencies and scripts
```

---

## Updating the Content

Most of the text on the site comes from two files, so the content can be changed without editing the components:

- **`lib/data.ts`** — name, bio, social links, skills, projects, education, and certificates.
- **`lib/resume.ts`** — the content of the printable resume.

To add a project, place its screenshot in `public/projects/` and add a new entry to the `projects` list in `lib/data.ts`. To update the resume PDF, open `/resume` in the browser and use **Print → Save as PDF**, then replace the file in `public/resume/`.

---

## Deployment

The site is deployed on **Vercel** and connected to the GitHub repository. Every push to the `main` branch automatically builds and publishes a new version of the site.

To deploy your own copy:

1. Push the project to a GitHub repository.
2. Sign in to [Vercel](https://vercel.com) and import the repository.
3. Add `NEXT_PUBLIC_WEB3FORMS_KEY` under **Project Settings → Environment Variables**.
4. Click **Deploy**.

---

## Author

**Cedrex Castigon** — BS Information Technology, Holy Cross of Davao College

- GitHub: [@kxschei](https://github.com/kxschei)
- Email: [castigonlloyd@gmail.com](mailto:castigonlloyd@gmail.com)
- Portfolio: https://cedrexportfolio.vercel.app

---

© 2026 Cedrex Castigon
