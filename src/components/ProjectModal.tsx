import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink } from 'lucide-react';
import { ProjectItem } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { t } = useLanguage();

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [project]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {project && (
        <React.Fragment>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-6 md:p-8 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-[#0C0C0C] border border-[#0EA5E9]/30 rounded-[30px] md:rounded-[40px] shadow-[0_0_50px_rgba(182,0,168,0.15)] flex flex-col pointer-events-auto overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-start justify-between p-6 sm:p-8 border-b border-[#D7E2EA]/10 shrink-0">
                <div className="flex flex-col gap-1 pr-8">
                  <span className="text-[#D7E2EA]/50 uppercase text-xs sm:text-sm tracking-wider font-light">
                    {t(project.category)}
                  </span>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#D7E2EA] uppercase tracking-tight">
                    {t(project.name)}
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="absolute top-6 right-6 p-2 rounded-full bg-[#D7E2EA]/5 hover:bg-[#0EA5E9]/20 text-[#D7E2EA]/70 hover:text-white transition-colors group cursor-pointer"
                >
                  <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                </button>
              </div>

              {/* Scrollable Content Container */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                  
                  {/* Left Column */}
                  <div className="flex flex-col gap-6">
                    {/* Role */}
                    {project.role && (
                      <div className="flex flex-col gap-1.5">
                        <span className="text-xs uppercase tracking-widest text-[#0EA5E9] font-bold">{t("Role")}</span>
                        <span className="text-sm sm:text-base text-[#D7E2EA] font-semibold">{t(project.role)}</span>
                      </div>
                    )}

                    {/* Description */}
                    <div className="flex flex-col gap-2">
                      <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/40 font-bold">{t("Project Scope")}</span>
                      <p className="text-sm sm:text-base text-[#D7E2EA]/85 font-light leading-relaxed">
                        {t(project.description)}
                      </p>
                    </div>

                    {/* Tech Stack */}
                    {project.techStack && (
                      <div className="flex flex-col gap-2.5">
                        <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/40 font-bold">{t("Technologies")}</span>
                        <div className="flex flex-wrap gap-2">
                          {project.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="text-[11px] sm:text-xs uppercase tracking-widest font-medium text-[#D7E2EA] bg-[#D7E2EA]/5 border border-[#D7E2EA]/10 px-3 py-1.5 rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Column */}
                  <div className="flex flex-col gap-6">
                    {/* Achievements */}
                    {project.keyAchievements && (
                      <div className="flex flex-col gap-2.5">
                         <span className="text-xs uppercase tracking-widest text-[#0EA5E9] font-bold">{t("Key Milestones")}</span>
                         <ul className="space-y-2">
                           {project.keyAchievements.map((ach, idx) => (
                             <li key={idx} className="text-sm text-[#D7E2EA]/80 flex items-start gap-2.5 leading-relaxed">
                               <span className="text-[#0EA5E9] font-bold text-xs mt-0.5">✦</span>
                               <span>{t(ach)}</span>
                             </li>
                           ))}
                         </ul>
                      </div>
                    )}

                     {/* Architecture Notes */}
                     {project.architectureNotes && (
                        <div className="flex flex-col gap-2.5">
                          <span className="text-xs uppercase tracking-widest text-[#0EA5E9] font-bold">{t("Architecture")}</span>
                          <div className="space-y-2 bg-[#0EA5E9]/5 border border-[#0EA5E9]/10 p-4 rounded-[20px]">
                            {project.architectureNotes.map((note, idx) => (
                              <p key={idx} className="text-sm text-[#D7E2EA]/85 leading-relaxed flex items-start gap-2.5">
                                <span className="text-[#0EA5E9] font-extrabold">•</span>
                                <span>{t(note)}</span>
                              </p>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Impact Metric */}
                      {project.impactMetric && (
                        <div className="bg-[#0EA5E9]/10 border border-[#0EA5E9]/20 p-4 rounded-[20px] flex items-center justify-between">
                          <div className="flex flex-col gap-1">
                            <span className="text-[10px] uppercase tracking-widest text-[#0EA5E9] font-bold">{t("Impact")}</span>
                            <span className="text-sm font-semibold text-[#D7E2EA]">{t(project.impactMetric)}</span>
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
}
