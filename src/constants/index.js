import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  html,
  css,
  reactjs,
  nextJs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  monster,
  crmnext,
  nickelfox,
  newgen,
  skillrisers,
  proximus,
  aptihealthWeb,
  zealWeb,
  rollWeb,
  linkedIn,
  github,
} from "../assets";

const navigationPaths = {
  home: "/",
  about: "about",
  work: "work",
  projects: "projects",
  certifications: "certifications",
  contact: "contact",
};

export const navLinks = [
  {
    id: navigationPaths.about,
    title: "About",
  },
  {
    id: navigationPaths.work,
    title: "Work",
  },
  {
    id: navigationPaths.projects,
    title: "Projects",
  },
  {
    id: navigationPaths.certifications,
    title: "Certifications",
  },
  {
    id: navigationPaths.contact,
    title: "Contact",
  },
];

const services = [
  {
    title: "AI Automation",
    icon: mobile,
  },
  {
    title: "Web Developer",
    icon: web,
  },
  {
    title: "AI Developer",
    icon: creator,
  },
  {
    title: "Graphic Designer",
    icon: backend,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Next JS",
    icon: nextJs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Git",
    icon: git,
  },
];

const experiences = [
  {
    title: "Intern",
    company_name: "Infosys Springboard",
    company_website: "#",
    icon: proximus,
    iconBg: "#E6DEDD",
    date: "Recent",
    points: [
      "Honed skills in NLP, LLM workflows, and responsive web design.",
      "Delivered robust solutions prioritizing performance and scalability.",
    ],
  },
  {
    title: "Intern",
    company_name: "DeQualita India",
    company_website: "#",
    icon: nickelfox,
    iconBg: "#E6DEDD",
    date: "Recent",
    points: [
      "Worked on full-stack web development and AI integration.",
      "Collaborated with teams to build intelligent applications.",
    ],
  },
  {
    title: "ISTE Module Winner",
    company_name: "ISTE",
    company_website: "#",
    icon: crmnext,
    iconBg: "#E6DEDD",
    date: "Award",
    points: [
      "Won the ISTE Road Safety module prize for innovative contribution.",
      "Recognized for leadership and proactive learning.",
    ],
  },
];

const projects = [
  {
    name: "TEERTHARAKSHA",
    description:
      "AI-based Temple Planner (SeniorJourneyTravelling). Integrated automation to streamline operations and enhance user experience for senior citizens.",
    tags: [
      {
        name: "python",
        color: "blue-text-gradient",
      },
      {
        name: "ai",
        color: "green-text-gradient",
      },
      {
        name: "automation",
        color: "pink-text-gradient",
      },
    ],
    image: aptihealthWeb,
    hosted_link: "https://github.com/Narapu-Reddy-Mano-Teja-Reddy/TEERTHARAKSHA-SeniorJourneyTravelling-main",
  },
  {
    name: "AI Ticket Resolution",
    description:
      "Ticket Resolution System. A system leveraging AI to resolve support tickets efficiently, reducing manual effort and improving response times.",
    tags: [
      {
        name: "ai",
        color: "blue-text-gradient",
      },
      {
        name: "nlp",
        color: "green-text-gradient",
      },
      {
        name: "react",
        color: "pink-text-gradient",
      },
    ],
    image: zealWeb,
    hosted_link: "https://github.com/Narapu-Reddy-Mano-Teja-Reddy/ai-ticket-resolution",
  },
  {
    name: "Road Safety Module",
    description:
      "An award-winning module focused on road safety awareness and education, developed as part of ISTE competition.",
    tags: [
      {
        name: "web",
        color: "blue-text-gradient",
      },
      {
        name: "education",
        color: "green-text-gradient",
      },
    ],
    image: rollWeb,
    hosted_link: "https://github.com/Narapu-Reddy-Mano-Teja-Reddy/Road-Safety-Module",
  },
];

const certifications = [
  {
    name: "Infosys Springboard Internship",
    issuer: "Infosys",
    image: proximus,
  },
  {
    name: "DeQualita India Internship",
    issuer: "DeQualita",
    image: nickelfox,
  },
  {
    name: "ISTE Module Winner",
    issuer: "ISTE",
    image: crmnext,
  },
];

const personalInfo = {
  name: "Mano Teja Reddy",
  fullName: "Narapureddy Mano Teja Reddy",
  email: "tejanarapureddy2@gmail.com",
  mobile: "+91 8688386307",
  role: "AI & Web Developer",
  about: `I am an aspiring AI & Web Developer driven by a passion for solving complex, real-world problems through technology. With a strong foundation in Computer Science, I specialize in building intelligent applications that bridge the gap between advanced AI capabilities and user-centric web interfaces. My journey is defined by a curiosity to explore the limits of Generative AI, Computer Vision, and Full-Stack Development.`,
  projectsIntro: `Following projects showcases my skills and experience through real-world examples of my work. Each project is briefly described with links to code repositories. It reflects my ability to solve complex problems, work with different technologies, and manage projects effectively.`,
};

const publicUrls = {
  resume:
    "https://www.manotejareddy.xyz/static/assets/resume/resume.pdf",
  socialProfiles: {
    linkedin: {
      title: "linkedin",
      link: "https://www.linkedin.com/in/mano-teja-reddy-/",
      icon: linkedIn,
    },
    github: {
      title: "github",
      link: "https://github.com/Narapu-Reddy-Mano-Teja-Reddy",
      icon: github,
    },
  },
};

export {
  services,
  technologies,
  experiences,
  projects,
  certifications,
  navigationPaths,
  personalInfo,
  publicUrls,
};
