import React, { useState, useRef, Suspense, lazy } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import FadeIn from "./FadeIn";
import { ScrollReveal, ScrollRevealStagger } from "./ScrollReveal";
import { ProjectItem } from "../types";
import { OWNER_CONFIG } from "../config/owner";
import { useLanguage } from "../context/LanguageContext";

// Lazy load the heavy ProjectModal component to improve initial load performance
const ProjectModal = lazy(() => import("./ProjectModal"));

// Custom LazyImage component that renders a modern skeleton loader and smoothly fades in once loaded
function LazyImage({ src, alt, className, ...props }: React.ImgHTMLAttributes<HTMLImageElement> & { className?: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative w-full h-full bg-neutral-100 overflow-hidden">
      {!loaded && (
        <div className="absolute inset-0 bg-neutral-200/50 animate-pulse flex items-center justify-center">
          <div className="w-6 h-6 rounded-full border-2 border-black/10 border-t-black/60 animate-spin" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={`${className} transition-opacity duration-500 ease-in-out ${loaded ? "opacity-100" : "opacity-0"}`}
        loading="lazy"
        referrerPolicy="no-referrer"
        {...props}
      />
    </div>
  );
}

interface ProjectsSectionProps {
  id?: string;
  onContactClick: () => void;
}

export default function ProjectsSection({
  id = "projects",
  onContactClick,
}: ProjectsSectionProps) {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [filter, setFilter] = useState<'all' | 'real' | 'exploration'>('all');
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const projects: ProjectItem[] = [
    {
      id: "p1",
      number: "01",
      category: "Full-Stack Solution",
      type: "real",
      name: "StreetVendorConnector",
      role: "Full-Stack Developer",
      duration: "12/2025 - Present",
      description: "A comprehensive multi-platform ecosystem bridging the gap between street vendors and local customers via real-time location discovery.",
      techStack: ["Java (Android)", "PHP 8.x", "MySQL 8", "Node.js + Express", "Gemini 2.0 Flash"],
      keyAchievements: ["Engineered a scalable three-tier architecture.", "Implemented live vendor discovery using OpenStreetMap."],
      architectureNotes: ["Harnessed Gradle Product Flavors to output dual specialized variant APKs."],
      impactMetric: "Built a foundational, secure ecosystem to modernize traditional street vending.",
      images: {
        col1Top: "/allflow.png",
        col1Bottom: "/allflow.png",
        col2Tall: "/allflow.png",
      },
    },
    {
      id: "p2",
      number: "02",
      category: "Academic App",
      type: "exploration",
      name: "Feedback Management System",
      role: "Principal UI/UX Designer",
      duration: "01/2026 - 03/2026",
      description: "An institutional-grade evaluation suite created to streamline course audits. Designed interactive feedback loops, completed automated UX QA testing.",
      techStack: ["Figma Blueprinting", "UI/UX Prototypes", "DBMS Integration", "Web Engineering"],
      keyAchievements: ["Presented full specification blueprints to academic deans.", "Established automated front-end Selenium scripts."],
      architectureNotes: ["Modular, component-driven UI templates with high-fidelity click prototypes."],
      impactMetric: "Boosted institutional action response metrics by 68%.",
      images: {
        col1Top: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85",
        col1Bottom: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85",
        col2Tall: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85",
      },
    },
    {
      id: "p3",
      number: "03",
      category: "Academic App",
      type: "real",
      name: "College Quiz Platform",
      role: "Lead Frontend Engineer",
      duration: "01/2026 - 02/2026",
      description: "An interactive real-time examination web portal designed and built to host department-wide competitions.",
      techStack: ["React", "PostgreSQL", "Team Coordination", "State Management"],
      keyAchievements: ["Led a crew of 4 student web developers.", "Authored robust React dynamic timer synchronization mechanisms."],
      architectureNotes: ["Constructed custom SQL views for automated score compilation."],
      impactMetric: "Maintained absolute zero live session interruptions for 455+ concurrent active quiz takers.",
      images: {
        col1Top: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85",
        col1Bottom: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85",
        col2Tall: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85",
      },
    },
    {
      id: "p4",
      number: "04",
      category: "Android Application",
      type: "real",
      name: "EcoBuddy",
      role: "Lead Android Developer",
      duration: "03/2025 - 05/2025",
      description: "An offline-first Android app tracking eco-friendly actions with a custom SavingsEngine algorithm computing real-time CO2 and financial savings by aggregating Room Database records with configurable environmental multipliers.",
      techStack: ["Java", "Room Database", "Material Design 3", "AlarmManager", "ExecutorService", "Jetpack Navigation"],
      keyAchievements: [
        "Developed custom SavingsEngine algorithm computing real-time CO2 and financial savings by aggregating Room Database records with configurable environmental multipliers.",
        "Implemented a dynamic gamification system parsing historical database thresholds to programmatically unlock UI achievement badges using vector drawable ColorFilter manipulation.",
        "Integrated all I/O operations on ExecutorService thread pools ensuring 60fps UI performance, plus background hourly eco-tip notifications via AlarmManager + BroadcastReceiver with BOOT_COMPLETED reboot persistence."
      ],
      architectureNotes: ["Decoupled database I/O using dedicated ExecutorService thread pools to keep design UI perfectly fluid."],
      impactMetric: "Assured flawless 60fps screen execution with zero database blockages.",
      images: {
        col1Top: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1000&auto=format&fit=crop",
        col1Bottom: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1000&auto=format&fit=crop",
        col2Tall: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1000&auto=format&fit=crop",
      },
    },
    {
      id: "p5",
      number: "05",
      category: "Academic Project",
      type: "exploration",
      name: "Smart Attendance System",
      role: "Backend Architect",
      duration: "09/2024 - 11/2024",
      description: "An automated student tracking platform integrating face recognition with academic management systems.",
      techStack: ["Python", "OpenCV", "Flask", "MySQL", "Git"],
      keyAchievements: ["Formulated real-time computer vision script pipelines.", "Created API endpoints for automated PDF log reporting."],
      architectureNotes: ["Decoupled scanning server from main administration dashboard using REST APIs."],
      impactMetric: "Accelerated morning attendance registration by 82%.",
      images: {
        col1Top: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1000&auto=format&fit=crop",
        col1Bottom: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?q=80&w=1000&auto=format&fit=crop",
        col2Tall: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop",
      },
    },
  ];

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => p.type === filter);

  return (
    <section id={id} ref={sectionRef} className="w-full relative bg-[#F4F4F4] pt-24 pb-32">
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-black/80 z-50 origin-left"
        style={{ scaleX }}
      />
      
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        
        {/* Title Area */}
        <div className="relative w-full flex items-center justify-center py-20 md:py-32 overflow-hidden mb-8 md:mb-16">
          <ScrollReveal
            direction="scale"
            duration={1.4}
            viewportMargin="-100px"
            className="absolute text-[#E5E5E5] font-bold text-center w-full z-0 pointer-events-none select-none uppercase tracking-[0.1em] origin-center -translate-y-1/2"
            style={{ fontSize: 'clamp(5rem, 20vw, 15rem)', top: '50%', whiteSpace: 'nowrap' }}
          >
            PORTFOLIO
          </ScrollReveal>
          <ScrollReveal
            direction="up"
            distance={45}
            duration={0.8}
            delay={0.2}
            viewportMargin="-100px"
            className="relative z-10 text-3xl md:text-5xl lg:text-7xl font-bold tracking-tight text-[#121212] flex items-center gap-2"
          >
            <span className="text-gray-300 font-light mr-1">/</span> {t("Featured Work").toUpperCase()}
          </ScrollReveal>
        </div>

        {/* Filters & Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-center w-full mb-12 gap-6">
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10 text-sm font-medium">
            <button 
              onClick={() => setFilter('all')}
              className={`pb-1 transition-all cursor-pointer ${filter === 'all' ? 'text-black border-b border-black font-semibold' : 'text-gray-400 hover:text-black'}`}
            >
              {t("All")}
            </button>
            <button 
              onClick={() => setFilter('real')}
              className={`pb-1 transition-all cursor-pointer ${filter === 'real' ? 'text-black border-b border-black font-semibold' : 'text-gray-400 hover:text-black'}`}
            >
              {t("Real Project")}
            </button>
            <button 
              onClick={() => setFilter('exploration')}
              className={`pb-1 transition-all cursor-pointer ${filter === 'exploration' ? 'text-black border-b border-black font-semibold' : 'text-gray-400 hover:text-black'}`}
            >
              {t("Exploration")}
            </button>
          </div>
          <button 
            onClick={() => setFilter('all')}
            className="bg-white border border-gray-200 shadow-sm rounded-full px-6 py-2.5 text-sm font-medium hover:bg-gray-50 flex items-center gap-2 transition-colors cursor-pointer"
          >
            {t("View All Work")}
            <svg className="w-4 h-4 translate-x-0.5 -translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
          </button>
        </div>

        {/* Project Grid with Stagger Reveal */}
        <ScrollRevealStagger
          direction="up"
          distance={35}
          staggerDelay={0.12}
          viewportMargin="-80px"
          className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-16 lg:gap-y-24 w-full"
        >
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id} 
              className="w-full flex flex-col group cursor-pointer bg-white/75 backdrop-blur-md rounded-[24px] p-8 border border-neutral-200/80 hover:border-neutral-900/40 shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.04),0_0_25px_rgba(0,0,0,0.06)] hover:-translate-y-2.5 hover:bg-white/85 transition-all duration-500 cursor-pointer h-full relative" 
              onClick={() => setSelectedProject(project)}
            >
              <div className="flex flex-col h-full min-h-[180px]">
                {/* Category Pill Tag */}
                <div className="mb-4">
                  <span className="px-3 py-1 bg-neutral-100 text-[10px] font-bold tracking-wider rounded-full text-neutral-500 border border-neutral-200/40 uppercase">
                    {t(project.category)}
                  </span>
                </div>
                
                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-2.5 text-[#121212] font-display transition-colors">
                  {t(project.name)}
                </h3>

                {/* Description */}
                <p className="text-xs md:text-sm text-neutral-500 leading-relaxed font-normal mb-8 flex-1">
                  {t(project.description || "Web App")}
                </p>
                
                {/* Tech Stack / Info Tags */}
                <div className="flex flex-wrap gap-2.5 mt-auto">
                  {project.techStack?.slice(0, 4).map((tech, tIdx) => (
                    <span key={tIdx} className="bg-neutral-50 border border-neutral-200/60 text-neutral-600 text-[11px] font-medium px-3.5 py-1 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </ScrollRevealStagger>

      </div>

      <Suspense fallback={null}>
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </Suspense>
    </section>
  );
}
