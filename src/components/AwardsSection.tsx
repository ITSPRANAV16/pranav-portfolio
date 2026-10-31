import React from 'react';
import { motion } from 'motion/react';
import { Award, Trophy, ShieldCheck, Bookmark, Sparkles, ExternalLink, Users } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface AwardItem {
  id: string;
  title: string;
  category: string;
  issuer: string;
  date: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
}

export default function AwardsSection({ id = 'awards' }: { id?: string }) {
  const { t } = useLanguage();

  const awards: AwardItem[] = [
    {
      id: 'award-1',
      title: 'Certificate of Appreciation - Institutional Software Systems',
      category: 'Project Excellence',
      issuer: 'Nanasaheb Mahadik Polytechnic Institute, Peth',
      date: 'Academic Year 2025 - 2026',
      description: 'Awarded for extraordinary contributions in designing, developing, and deploying the institutional-grade Feedback Management System and the Departmental Quiz Competition Platform, which streamlined administrative workflows.',
      icon: Award,
      color: 'from-amber-500/10 to-yellow-500/5 hover:border-amber-400/50',
    },
    {
      id: 'award-2',
      title: 'Industrial Internship & Experience Certificate',
      category: 'Industrial Training',
      issuer: 'AppVishwa Software Solutions Pvt. Ltd.',
      date: 'Summer 2025',
      description: 'Awarded for outstanding contributions and dedication during a 3-month software development internship. Led modular Android UI prototyping, implemented SQLite Room DB structures, and constructed clean async pipelines.',
      icon: Trophy,
      color: 'from-sky-500/10 to-indigo-500/5 hover:border-sky-400/50',
    },
    {
      id: 'award-3',
      title: 'AI FUSION 2.0 Certificate',
      category: 'AI & Technical Event',
      issuer: 'Rajarambapu Institute of Technology, Rajaramnagar',
      date: '10/2024',
      description: 'Awarded for successful participation in the "Decode" event under AI FUSION 2.0, jointly organized by the Department of CSE (AI & ML) and the Students Association of Artificial Intelligence (SAAI).',
      icon: Sparkles,
      color: 'from-purple-500/10 to-pink-500/5 hover:border-purple-400/50',
    },
    {
      id: 'award-4',
      title: "Lead Event Coordinator - Teachers' Day Debate Competition",
      category: 'Institutional Leadership',
      issuer: 'Dr. D.Y. Patil Technical Campus, Varale, Pune',
      date: '09/2026',
      description: 'Recognized for organizational excellence and student team leadership as the Lead Coordinator of the Teachers\' Day Debate Competition, managing 50+ participants, stage logistics, and jury evaluations.',
      icon: Users,
      color: 'from-emerald-500/10 to-teal-500/5 hover:border-emerald-400/50',
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.05,
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 45 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.85, 
        ease: [0.16, 1, 0.3, 1] 
      }
    }
  };

  return (
    <section 
      id={id} 
      className="w-full relative px-6 md:px-12 py-24 md:py-32 bg-[#FFFFFF] border-t border-b border-gray-150 overflow-hidden"
    >
      {/* Dynamic Background Blurs */}
      <div className="absolute top-1/2 left-10 w-[350px] h-[350px] bg-amber-200/10 blur-[130px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-12 w-[400px] h-[400px] bg-sky-200/10 blur-[140px] rounded-full pointer-events-none z-0" />

      <div className="max-w-[1240px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 border-b border-gray-150 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-1 bg-[#121212] text-white rounded-full text-[10px] font-mono font-bold tracking-widest uppercase shadow-sm">
                {t("Honors & Accolades")}
              </span>
              <span className="text-gray-400 text-xs font-mono font-bold">[06]</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl font-black text-[#121212] tracking-tight uppercase leading-[1.05]">
              {t("Awards")} & <span className="font-sans font-light text-neutral-450 italic lowercase">{t("Recognitions")}</span>
            </h2>
          </div>

          <p className="text-gray-500 font-medium text-sm sm:text-base max-w-sm mt-4 md:mt-0 leading-relaxed font-sans">
            {t("Showcasing academic honors, industrial training certificates, and project execution achievements throughout my professional evolution.")}
          </p>
        </div>

        {/* Awards Cards Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {awards.map((award, index) => {
            const IconComponent = award.icon;
            return (
              <motion.div
                key={award.id}
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.2, ease: "easeOut" } }}
                className={`relative group bg-[#fafafa] border border-gray-200/65 hover:border-neutral-900/35 rounded-3xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-[0_20px_45px_rgba(0,0,0,0.04)] transition-all duration-300`}
              >
                {/* Visual Gradient Background Mesh on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${award.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0`} />
                
                {/* Card Top Details */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-mono font-black tracking-widest uppercase text-sky-600 bg-sky-50 px-2.5 py-1 rounded-full">
                      {t(award.category)}
                    </span>
                    <span className="text-xs font-mono text-gray-400 font-semibold">{t(award.date)}</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-[#121212] tracking-tight mb-3 group-hover:text-black transition-colors">
                    {t(award.title)}
                  </h3>

                  <p className="text-neutral-500 group-hover:text-neutral-700 text-sm leading-relaxed transition-colors mt-2">
                    {t(award.description)}
                  </p>
                </div>

                {/* Card Bottom / Issuer Details */}
                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between mt-8 pt-6 border-t border-gray-200/50 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 sm:p-2.5 rounded-xl bg-[#ececec] text-[#333333] group-hover:bg-white group-hover:shadow-md transition-all duration-300">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[11px] font-mono text-gray-400 uppercase tracking-wider">{t("Issued By")}</p>
                      <p className="text-xs font-bold text-neutral-800 leading-tight">{t(award.issuer)}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3.5 pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-100">
                    <Sparkles className="w-4 h-4 text-gray-300 group-hover:text-amber-500 group-hover:rotate-12 transition-all duration-500 opacity-60 group-hover:opacity-100" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
