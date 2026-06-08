import React, { useState, useRef, useEffect, Suspense, lazy } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import FadeIn from "./FadeIn";
import { ScrollReveal, ScrollRevealStagger } from "./ScrollReveal";
import { ProjectItem } from "../types";
import { OWNER_CONFIG } from "../config/owner";
import { useLanguage } from "../context/LanguageContext";

// Lazy load the heavy ProjectModal component to improve initial load performance
const ProjectModal = lazy(() => import("./ProjectModal"));

// High-fidelity optimized 2D Canvas ambient particles system (Antigravity interactive constellation effect)
function HoverParticlesCanvas({ active, mouseX, mouseY }: { active: boolean; mouseX: number; mouseY: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
    }> = [];

    const numParticles = 20;

    // Set initial size and positions
    const resizeCanvas = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resizeCanvas();

    const rect = canvas.getBoundingClientRect();
    const width = rect.width || 350;
    const height = rect.height || 450;

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        size: Math.random() * 1.5 + 1.2,
      });
    }

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    resizeObserver.observe(canvas);

    const draw = () => {
      if (!canvas || !ctx) return;
      
      const currentWidth = canvas.width / window.devicePixelRatio;
      const currentHeight = canvas.height / window.devicePixelRatio;

      ctx.clearRect(0, 0, currentWidth, currentHeight);

      // Loop through particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Idle drift
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off bounds
        if (p.x < 0) {
          p.x = 0;
          p.vx *= -1;
        } else if (p.x > currentWidth) {
          p.x = currentWidth;
          p.vx *= -1;
        }

        if (p.y < 0) {
          p.y = 0;
          p.vy *= -1;
        } else if (p.y > currentHeight) {
          p.y = currentHeight;
          p.vy *= -1;
        }

        // If card is hovered, gently pull particles toward the cursor
        if (active) {
          const dx = mouseX - p.x;
          const dy = mouseY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 180) {
            // Smooth gravitational pull formula
            const force = (180 - dist) / 180;
            p.x += (dx / dist) * force * 1.6;
            p.y += (dy / dist) * force * 1.6;
          }
        }

        // Render ambient particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = active ? "rgba(18, 18, 18, 0.14)" : "rgba(18, 18, 18, 0.045)";
        ctx.fill();

        // Draw connections between neighboring particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 80) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            // Connective lines fade out with distance and are more prominent during hover
            const alpha = ((80 - dist) / 80) * (active ? 0.08 : 0.02);
            ctx.strokeStyle = `rgba(18, 18, 18, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // Draw interactive line from particle to cursor position
        if (active) {
          const dx = mouseX - p.x;
          const dy = mouseY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouseX, mouseY);
            const alpha = ((110 - dist) / 110) * 0.12;
            ctx.strokeStyle = `rgba(18, 18, 18, ${alpha})`;
            ctx.lineWidth = 0.65;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
    };
  }, [active, mouseX, mouseY]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}

// Dynamic 3D interactive tilt card with high-fidelity mouse-tracking spotlight (Antigravity interactive effect)
interface InteractiveProjectCardProps {
  project: any;
  onClick: any;
  t: any;
  key?: any;
}

function InteractiveProjectCard({ 
  project, 
  onClick, 
  t 
}: InteractiveProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });
  };

  // Build authentic geometric 3D rotational tilt ratios
  let rotateX = 0;
  let rotateY = 0;
  if (isHovered && cardRef.current) {
    const rect = cardRef.current.getBoundingClientRect();
    const midX = rect.width / 2;
    const midY = rect.height / 2;
    // Maximum comfortable 3.5-degree physical perspective rotation to keep UI highly professional
    rotateX = -((coords.y - midY) / midY) * 3.5;
    rotateY = ((coords.x - midX) / midX) * 3.5;
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setCoords({ x: 0, y: 0 });
      }}
      onClick={onClick}
      className="w-full flex flex-col group cursor-pointer bg-white/40 backdrop-blur-xl rounded-[24px] p-6 border border-white/50 hover:border-neutral-900/15 shadow-[0_8px_30px_rgb(0,0,0,0.015)] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.06),0_10px_20px_-5px_rgba(0,0,0,0.02)] transition-all duration-300 h-full relative overflow-hidden"
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${isHovered ? 1.01 : 1})`,
        transition: isHovered ? "transform 0.08s ease-out, border-color 0.3s, shadow 0.3s" : "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.5s, shadow 0.5s, background-color 0.5s",
      }}
    >
      {/* Interactive Particles Background */}
      <HoverParticlesCanvas active={isHovered} mouseX={coords.x} mouseY={coords.y} />

      {/* Absolute Dynamic Spotlight Follower */}
      {isHovered && (
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-0"
          style={{
            background: `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, rgba(18,18,18,0.035) 0%, transparent 100%)`,
          }}
        />
      )}

      {/* Glossy edge highlighting */}
      {isHovered && (
        <div 
          className="absolute inset-0 rounded-[24px] pointer-events-none border border-white/80 z-20"
        />
      )}

      <div className="flex flex-col h-full flex-1 z-10 pt-4">
        {/* Category Pill Tag */}
        <div className="mb-3">
          <span className="px-3 py-1 bg-neutral-100/60 text-[10px] font-bold tracking-wider rounded-full text-neutral-500 border border-neutral-200/30 uppercase">
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
            <span key={tIdx} className="bg-neutral-50/70 border border-neutral-200/50 text-neutral-600 text-[11px] font-medium px-3.5 py-1 rounded-full backdrop-blur-sm">
              {tech}
            </span>
          ))}
        </div>
      </div>
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
        col1Top: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=1000&auto=format&fit=crop",
        col1Bottom: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop",
        col2Tall: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1000&auto=format&fit=crop",
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
            <InteractiveProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelectedProject(project)}
              t={t}
            />
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
