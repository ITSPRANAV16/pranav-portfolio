const DEFAULT_CONFIG = {
  name: 'Pranav Patil',
  fullName: 'Pranav Shahaji Patil',
  title: 'Pranav Patil -- Creative Developer & Android Engineer',
  email: 'pranavsp2810@gmail.com',
  phone: '8770871946',
  location: 'Pune, India',
  role: 'Creative Software Developer & B.Tech Undergrad (ECE)',
  tagline: 'creative developer passionate about building next-gen android apps, exploring electronics & computing systems, and crafting responsive web interfaces.',
  bio: "Completed Diploma in Computer Engineering and currently pursuing B.Tech in Electronics & Computer Engineering at Dr. D.Y. Patil Technical Campus, Varale, Pune. Skilled in Java, Android app development, and UI/UX prototyping. Eager to learn, innovate, and contribute to the tech industry, backed by a successful 3-month internship at AppVishwa Software Solutions Pvt. Ltd and real-world project deliveries.",
  cvUrl: 'https://drive.google.com/file/d/1ONsNm81ajVR8-SQvSWJ0cwEhKIhct__Q/view?usp=drive_link',
  
  education: [
    {
      institution: 'Dr. D.Y. Patil Technical Campus, Varale',
      university: 'Savitribai Phule Pune University (SPPU)',
      degree: 'B.Tech in Electronics & Computer Engineering',
      duration: '2026 - 2029 (Currently Pursuing)',
      location: 'Varale, Talegaon, Pune, Maharashtra, India',
      highlights: [
        'Affiliated to Savitribai Phule Pune University (SPPU) — undergraduate student in Electronics & Computer Engineering.',
        'Embarking on the B.Tech journey in Electronics and Computer Engineering, eager to explore computing hardware, embedded IoT systems, and scalable software architectures.'
      ]
    },
    {
      institution: 'Nanasaheb Mahadik Polytechnic Institute',
      university: 'Maharashtra State Board of Technical Education (MSBTE)',
      degree: 'Diploma in Computer Engineering (Completed)',
      duration: '08/2022 - 06/2025 (Completed)',
      location: 'Peth, Maharashtra, India',
      highlights: [
        'Affiliated to MSBTE (Maharashtra State Board of Technical Education) — successfully completed 3-year Diploma program with distinction.',
        'Strong foundation in Object-Oriented Programming (OOP), Core Java, and DBMS / SQL systems with deployed capstone projects.'
      ]
    },
    {
      institution: 'Islampur High School, Islampur',
      university: 'Maharashtra State Board (SSC)',
      degree: 'Secondary School Certificate (SSC)',
      duration: '06/2021 - 06/2022',
      location: 'Islampur, Maharashtra, India',
      highlights: [
        'Graduated with strong fundamental academic performance',
        'Active participant in regional engineering and computer science clubs'
      ]
    }
  ],

  experience: [
    {
      company: 'AppVishwa Software Solutions Pvt. Ltd.',
      role: 'Software Development Intern',
      duration: '06/2025 - 08/2025',
      location: 'Urun Islampur, Maharashtra, India',
      description: 'Completed an intensive 3-month industrial training program, rotating through foundational modern software stacks to build full-lifecycle solutions.',
      modules: [
        {
          title: 'Strategic Analysis & Discovery',
          details: 'Formulated precise scope audits and strategic project maps. Mastered target audience assessment and constraint-mapping for computational Python logic.'
        },
        {
          title: 'UI Block Architecture & Design',
          details: 'Designed interactive layout flows, blueprint designs, and context specifications. Translated Figma mockups into fully fluid web prototypes.'
        },
        {
          title: 'Modular Development & Code',
          details: 'Engineered responsive mobile applications using Core Java, XML, and local SQLite Room DB structures following strict clean MVVM patterns.'
        },
        {
          title: 'Performance QA & Safe Deliveries',
          details: 'Executed runtime performance audits, monitored frame-rate stability, avoided performance memory leaks, and utilized Git pipelines for safe team delivery.'
        }
      ]
    }
  ],

  skillCategories: [
    {
      name: 'Programming Languages',
      skills: ['Java (Primary)', 'C', 'C++', 'Python']
    },
    {
      name: 'Android Engineering',
      skills: [
        'Android Studio',
        'Retrofit',
        'Glide',
        'Room Database (SQLite)',
        'WorkManager',
        'ViewBinding',
        'Material 3'
      ]
    },
    {
      name: 'Databases & Web',
      skills: ['DBMS Concepts', 'SQL', 'HTML5', 'CSS3', 'Basic PHP (XAMPP)']
    },
    {
      name: 'Tools & Workflows',
      skills: [
        'Git',
        'GitLab',
        'SDLC Processes',
        'Debugging',
        'Unit Testing',
        'Agile Workflow',
        'ADB (Android Debug Bridge)'
      ]
    }
  ],

  services: [
    {
      id: 's1',
      number: '01',
      name: 'Academic Project Delivery',
      description: 'End-to-end software development and documentation for Degree, Diploma, BCA, MCA, and Engineering (CS/IT). Providing fully functional source code, database architectures, and report/synopsis guidelines.',
      price: '₹12,000+',
      images: [
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop', // Project planning/academic
        'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1000&auto=format&fit=crop' // Student learning/compiling
      ]
    },
    {
      id: 's2',
      number: '02',
      name: 'Custom Web Applications',
      description: 'Designing and executing modern responsive web portals, custom student evaluation systems, dashboard frameworks, and client-server architectures built with React, HTML5/CSS, or PHP.',
      price: '₹10,500+',
      images: [
        'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop', // React Code
        'https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=1000&auto=format&fit=crop' // HTML / CSS IDE
      ]
    },
    {
      id: 's3',
      number: '03',
      name: 'Native Mobile Apps',
      description: 'High-performance native Android applications coded in Core Java and Kotlin, featuring local Room database caching, background service alerts, and polished Material 3 interfaces.',
      price: '₹14,000+',
      images: [
        'https://images.unsplash.com/photo-1526498460520-4c246339dccb?q=80&w=1000&auto=format&fit=crop', // Mobile dev code
        'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1000&auto=format&fit=crop' // Modern device layout
      ]
    },
    {
      id: 's4',
      number: '04',
      name: 'DBMS & Database Systems',
      description: 'Designing highly optimized relational SQLite, Room, or XAMPP MySQL structures. Modeling complete ER diagrams, table schemas, and custom SQL queries for robust local search operations.',
      price: '₹6,000+',
      images: [
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1000&auto=format&fit=crop', // Databases / Servers
        'https://images.unsplash.com/photo-1563206767-5b18f218e8de?q=80&w=1000&auto=format&fit=crop' // Abstract Data Nodes
      ]
    },
    {
      id: 's5',
      number: '05',
      name: 'Mentorship & Project Setup',
      description: 'Dedicated guidance from compiler setup to presentation ready status. Explaining source code line-by-line and conducting mock presentation checks to help you ace your Viva and major project evaluations.',
      price: '₹5,000+',
      images: [
        'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1000&auto=format&fit=crop', // Student study / laptop
        'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1000&auto=format&fit=crop' // IT mentorship/guidance
      ]
    }
  ],

  certificates: [
    {
      title: 'Industrial Training Certificate (3 Months)',
      issuer: 'AppVishwa Software Solutions Pvt. Ltd.',
      duration: 'Summer 2025'
    },
    {
      title: 'Certificate of Appreciation - Feedback Management System & College Quiz Competition Platform',
      issuer: 'Nanasaheb Mahadik Polytechnic Institute, Peth',
      duration: 'Academic Year 2025 - 2026'
    }
  ],

  interests: [
    'UI/UX Design & Digital Prototyping',
    'Innovative App Development',
    'Hackathons & Coding Competitions',
    'Exploring Emerging Technologies'
  ],

  socials: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    naukri: 'https://www.naukri.com'
  }
};

function makeDeepProxy(targetObj: any, getLatest: () => any, path: string[] = []): any {
  return new Proxy(targetObj, {
    get(target, prop) {
      if (typeof prop === 'symbol' || prop === '$$typeof' || prop === 'then') {
        return target[prop];
      }
      
      const latestRoot = getLatest();
      // Resolve path
      let latestVal = latestRoot;
      for (const p of path) {
        if (latestVal === undefined || latestVal === null) break;
        latestVal = latestVal[p];
      }
      
      const currentVal = (latestVal !== undefined && latestVal !== null) ? latestVal[prop] : undefined;
      const defaultVal = target[prop];
      
      const valToUse = currentVal !== undefined ? currentVal : defaultVal;
      
      if (valToUse !== null && typeof valToUse === 'object') {
        return makeDeepProxy(valToUse, getLatest, [...path, prop as string]);
      }
      return valToUse;
    }
  });
}

const getLatestSettings = () => {
  try {
    const saved = localStorage.getItem('portfolio_custom_settings');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Error parsing loaded portfolio custom settings:', e);
  }
  return DEFAULT_CONFIG;
};

export const OWNER_CONFIG = makeDeepProxy(DEFAULT_CONFIG, getLatestSettings);

export function savePortfolioSettings(settings: any): void {
  try {
    localStorage.setItem('portfolio_custom_settings', JSON.stringify(settings));
    window.dispatchEvent(new Event('portfolio_settings_changed'));
  } catch (e) {
    console.error('Failed to save settings:', e);
  }
}

export function resetPortfolioSettings(): void {
  try {
    localStorage.removeItem('portfolio_custom_settings');
    window.dispatchEvent(new Event('portfolio_settings_changed'));
  } catch (e) {
    console.error('Failed to reset settings:', e);
  }
}

export function getRawSettings(): any {
  return getLatestSettings();
}

export function getDefaultSettings(): any {
  return DEFAULT_CONFIG;
}

