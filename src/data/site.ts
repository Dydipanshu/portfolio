// Personal details used across the site. Edit here and every page updates.

export const site = {
  name: 'Deepanshu Yadav',
  role: 'Software engineer',
  headline: 'Software engineer, backend and AI',
  description:
    'Deepanshu Yadav is a software engineer in Noida, India. He builds backends in FastAPI and Node.js, AI systems with the tests to back them, and small products like USGScribe. Published paper on power grids.',
  handle: 'dydipanshu',
  // Visitor stats at https://dydipanshu.goatcounter.com (free, no cookies). Set to '' to turn off.
  goatcounter: 'dydipanshu',
  url: 'https://dydipanshu.online',
  location: 'Noida, India',
  timezone: 'Asia/Kolkata',
  email: 'dydipanshu2004@gmail.com',
  socials: {
    github: 'https://github.com/dydipanshu',
    linkedin: 'https://www.linkedin.com/in/dydipanshu',
    scholar: 'https://scholar.google.com/citations?hl=en&user=OAdzz0sAAAAJ',
  },
} as const;

export const nav = [
  { href: '/projects', label: 'Work' },
  { href: '/lab', label: 'Lab' },
  { href: '/blog', label: 'Writing' },
  { href: '/about', label: 'About' },
] as const;

export const experience = [
  {
    company: '2020Tax.ie',
    url: '',
    role: 'Full-stack developer, freelance (the company has since closed)',
    period: 'Apr – Jun 2026',
    points: [
      'Built the front end of the tax-filing flow in Next.js, TypeScript and Redux. It’s a long form where later questions depend on earlier answers, with a lot of validation along the way.',
      'Worked with the team on the data model for the FastAPI backend.',
      'Pages were loading slowly because every request went through a proxy that didn’t do anything. I took it out and the whole site got faster.',
    ],
  },
  {
    company: 'SB Technosoft',
    url: '',
    role: 'Web developer intern',
    period: 'Jun – Jul 2025',
    points: [
      'The only developer on a client website. I gathered what the client wanted, showed them each version, and shipped it on time.',
    ],
  },
] as const;

export const education = {
  school: 'JSS Academy of Technical Education, Noida',
  degree: 'B.Tech in Electrical Engineering',
  period: '2022 – 2026',
};

export const skills = [
  ['AI', 'LLM evaluation, LLM-as-judge, OpenAI API, embeddings and retrieval, PyTorch, scikit-learn'],
  ['Backend', 'Python, FastAPI, Node.js, TypeScript, REST APIs, JWT auth, PostgreSQL, MySQL, MongoDB'],
  ['Infrastructure', 'Linux, Git, GitHub Actions, AWS (EC2, S3, RDS), Vercel, Netlify'],
  ['Front end', 'React, Next.js, Redux'],
  ['Hardware', 'C and C++ on ESP32 and Arduino, sensors, GSM and GPS modules, PID control'],
  ['Data', 'pandas, NumPy, browser automation, MATLAB'],
] as const;

export const paper = {
  title:
    'Comparison of Deep Learning Architectures for Fault Detection in Power Grids: A Study on CNN, Vision Transformer, and Swin Transformer',
  venue: 'MPCON 2026',
  url: 'https://ieeexplore.ieee.org/abstract/document/11508590/',
};

export const honours = [
  'Top 50 out of 600+ teams at e-Yantra, IIT Bombay’s robotics competition (2025)',
  'Semi-finalist at the APNA Hackathon',
  '4 stars in C++ on HackerRank',
  'State-level participant at IndiaSkills',
] as const;
