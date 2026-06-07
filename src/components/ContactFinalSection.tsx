import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Github, Instagram, Linkedin, Briefcase, ArrowUpRight } from 'lucide-react';
import { OWNER_CONFIG } from '../config/owner';
import { useLanguage } from '../context/LanguageContext';

export default function ContactFinalSection({ onContactClick }: { onContactClick: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 50, damping: 20 }
    }
  };

  return (
    <motion.section 
      ref={containerRef}
      style={{ scale, opacity, y }}
      className="w-full relative min-h-screen flex flex-col justify-between items-center py-16 md:py-24 px-4 md:px-8 bg-cover bg-center overflow-hidden" 
      
    >
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{ backgroundImage: 'linear-gradient(to bottom, rgba(244, 244, 244, 0.95), rgba(244, 244, 244, 1)), url("https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2000&auto=format&fit=crop")', backgroundSize: 'cover', backgroundPosition: 'center' }}
      />

      <motion.div
        onViewportEnter={() => {
          if (containerRef.current) {
            containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
          }
        }}
        viewport={{ amount: 0.3 }} // Trigger when 30% visible
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        className="w-full max-w-4xl mx-auto flex flex-col items-center text-center z-10 my-auto py-8"
      >
        {/* Availability Badge */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-shadow cursor-default border border-gray-100">
            <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></div>
            <span className="text-sm font-medium text-gray-800">{t("Available for New Project")}</span>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h2 variants={itemVariants} className="text-4xl md:text-6xl lg:text-7xl font-sans font-black tracking-tight text-[#121212] mb-6 leading-tight">
          {t("HAVE A PROJECT IN MIND?")}
        </motion.h2>

        {/* Description */}
        <motion.p variants={itemVariants} className="max-w-2xl text-gray-600 text-lg md:text-xl font-medium mb-10">
          {t("Together, we can create something clear and impactful. Let's collaborate to bring our ideas to life in a way that resonates with everyone.")}
        </motion.p>

        {/* Button Actions Group */}
        <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-4 mb-8">
          <button 
            onClick={onContactClick}
            className="group flex justify-center items-center gap-2 bg-[#1a1a1a] text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-black transition-all hover:scale-105 shadow-xl hover:shadow-2xl cursor-pointer"
          >
            {t("Contact Me")}
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </motion.div>
      </motion.div>

      {/* Footer Nav / Socials Pills */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="w-full px-4 md:px-12 mx-auto z-10 mt-auto"
      >
        <div className="flex flex-wrap items-center justify-center md:justify-between gap-4 max-w-[1600px] mx-auto">
          {/* Profile Pill */}
          <motion.div variants={itemVariants} className="flex items-center gap-3 bg-[#1a1a1a] text-white pl-1.5 pr-6 py-1.5 rounded-full shadow-md">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-white/20 select-none">
               <img src="/profil1.png" className="w-full h-full object-cover object-top filter grayscale" alt="Profile" referrerPolicy="no-referrer" />
            </div>
            <span className="font-semibold text-sm">{t(OWNER_CONFIG.name)}</span>
          </motion.div>

          {/* Social Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            <SocialPill icon={<Briefcase className="w-4 h-4" />} label={t("Naukri Profile")} href={OWNER_CONFIG.socials.naukri || OWNER_CONFIG.socials.dribbble} variants={itemVariants} />
            <SocialPill icon={<Instagram className="w-4 h-4" />} label={t("Instagram")} href={OWNER_CONFIG.socials.instagram} variants={itemVariants} />
            <SocialPill icon={<Linkedin className="w-4 h-4" />} label={t("LinkedIn")} href={OWNER_CONFIG.socials.linkedin} variants={itemVariants} />
            <SocialPill icon={<Github className="w-4 h-4" />} label={t("GitHub")} href={OWNER_CONFIG.socials.github} variants={itemVariants} />
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}

function SocialPill({ icon, label, href, variants }: { icon: React.ReactNode; label: string; href: string; variants: any }) {
  return (
    <motion.a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      variants={variants}
      className="flex items-center gap-2 bg-white text-gray-800 px-5 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all hover:-translate-y-1 font-medium text-sm border border-gray-100"
    >
      <span className="text-gray-600">{icon}</span>
      {label}
    </motion.a>
  );
}
