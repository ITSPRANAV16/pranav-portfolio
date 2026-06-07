import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, ChevronLeft, ChevronRight, Maximize2, ZoomIn, ZoomOut } from 'lucide-react';
import { ProjectItem } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { t } = useLanguage();
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);

  // Compile unique images or valid image paths for this project safely (even if project is null)
  const galleryImages = project ? [
    project.images?.col2Tall,
    project.images?.col1Top,
    project.images?.col1Bottom,
  ].filter(Boolean) : [];

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
      setActiveImgIdx(0);
      setIsLightboxOpen(false);
      setZoomScale(1);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [project]);

  // Keyboard controls for Lightbox
  useEffect(() => {
    if (!isLightboxOpen || !project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
        setZoomScale(1);
      } else if (e.key === 'ArrowLeft') {
        setActiveImgIdx((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
        setZoomScale(1);
      } else if (e.key === 'ArrowRight') {
        setActiveImgIdx((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
        setZoomScale(1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, galleryImages.length, project]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImgIdx((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
    setZoomScale(1);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImgIdx((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
    setZoomScale(1);
  };

  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomScale((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomScale((prev) => Math.max(prev - 0.25, 0.75));
  };

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
                  </div>

                  {/* Right Column */}
                  <div className="flex flex-col gap-6">
                     
                     {/* Dynamic Interactive Image Gallery */}
                     <div className="flex flex-col gap-4">
                       <span className="text-xs uppercase tracking-widest text-[#0EA5E9] font-bold">{t("Interactive Showcase")}</span>
                       
                       {/* Main Display Window */}
                       <div 
                         onClick={() => setIsLightboxOpen(true)}
                         className="relative w-full h-56 sm:h-64 md:h-72 bg-[#141416] rounded-[24px] border border-white/10 overflow-hidden cursor-zoom-in group select-none"
                       >
                         {/* Image transition wrapper */}
                         <AnimatePresence mode="wait">
                           <motion.img 
                             key={activeImgIdx}
                             src={galleryImages[activeImgIdx]} 
                             alt={`${project.name} preview ${activeImgIdx + 1}`} 
                             initial={{ opacity: 0, scale: 0.98 }}
                             animate={{ opacity: 1, scale: 1 }}
                             exit={{ opacity: 0, scale: 1.02 }}
                             transition={{ duration: 0.25, ease: "easeInOut" }}
                             className="w-full h-full object-cover" 
                             loading="lazy"
                             referrerPolicy="no-referrer"
                           />
                         </AnimatePresence>

                         {/* Hover Controls for quick slide swapping */}
                         {galleryImages.length > 1 && (
                           <>
                             <button
                               onClick={handlePrev}
                               className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white/80 hover:text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer z-10"
                             >
                               <ChevronLeft className="w-4 h-4" />
                             </button>
                             <button
                               onClick={handleNext}
                               className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white/80 hover:text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer z-10"
                             >
                               <ChevronRight className="w-4 h-4" />
                             </button>
                           </>
                         )}

                         {/* Maximize overlay */}
                         <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md border border-white/10 px-2.5 py-1.5 rounded-full flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none text-[10px] uppercase font-bold tracking-wider text-[#D7E2EA]">
                           <Maximize2 className="w-3 h-3 text-[#0EA5E9]" />
                           {t("Fullscreen")}
                         </div>

                         {/* Position indicator */}
                         <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm border border-white/15 px-3 py-1 rounded-full text-[10px] font-bold text-white/90 z-10">
                           {activeImgIdx + 1} / {galleryImages.length}
                         </div>
                       </div>

                       {/* Interactive Navigation Deck (Thumbnails) */}
                       {galleryImages.length > 1 && (
                         <div className="grid grid-cols-3 gap-3">
                           {galleryImages.map((img, idx) => (
                             <button
                               key={idx}
                               onClick={() => {
                                 setActiveImgIdx(idx);
                                 setZoomScale(1);
                               }}
                               className={`relative aspect-[4/3] rounded-[16px] overflow-hidden border-2 transition-all cursor-pointer ${
                                 activeImgIdx === idx 
                                   ? "border-[#0EA5E9] scale-[1.02] shadow-[0_0_15px_rgba(14,165,233,0.3)]" 
                                   : "border-white/5 hover:border-white/20 select-none"
                               }`}
                             >
                               <img 
                                 src={img} 
                                 alt={`thumbnail ${idx + 1}`} 
                                 className="w-full h-full object-cover select-none" 
                                 loading="lazy"
                                 referrerPolicy="no-referrer"
                               />
                               {activeImgIdx === idx && (
                                 <div className="absolute inset-0 bg-[#0EA5E9]/10 pointer-events-none" />
                               )}
                             </button>
                           ))}
                         </div>
                       )}
                     </div>

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

          {/* Lightbox / Fullscreen Overlay */}
          <AnimatePresence>
            {isLightboxOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4 md:p-8 select-none"
              >
                {/* Header Control Panel */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-[125] bg-black/60 p-3 rounded-2xl border border-white/5 backdrop-blur-md pointer-events-auto">
                  <div className="flex flex-col pl-2">
                    <span className="text-xs uppercase font-black tracking-widest text-[#0EA5E9]">{t(project.name)}</span>
                    <span className="text-[11px] text-white/50 font-mono">Image {activeImgIdx + 1} of {galleryImages.length}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {/* Zoom In */}
                    <button 
                      onClick={handleZoomIn}
                      className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors cursor-pointer"
                      title={t("Zoom In")}
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                    {/* Zoom Out */}
                    <button 
                      onClick={handleZoomOut}
                      className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors cursor-pointer"
                      title={t("Zoom Out")}
                    >
                      <ZoomOut className="w-4 h-4" />
                    </button>
                    {/* Reset Zoom */}
                    {zoomScale !== 1 && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); setZoomScale(1); }}
                        className="text-[10px] font-bold uppercase tracking-widest px-3.5 py-2 rounded-full bg-[#0EA5E9]/25 hover:bg-[#0EA5E9]/40 border border-[#0EA5E9]/50 text-white transition-all cursor-pointer"
                      >
                        {t("Reset")}
                      </button>
                    )}
                    
                    <div className="w-[1px] h-6 bg-white/10 mx-1" />

                    {/* Close button */}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsLightboxOpen(false);
                        setZoomScale(1);
                      }}
                      className="p-2.5 rounded-full bg-red-500/20 hover:bg-red-500/40 border border-red-500/40 text-red-100 transition-colors cursor-pointer"
                      title={t("Close Fullscreen")}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Lightbox Main Image Screen */}
                <div className="relative w-full max-w-5xl h-full flex items-center justify-center pointer-events-none">
                  {/* Left slide arrow */}
                  {galleryImages.length > 1 && (
                    <button
                      onClick={handlePrev}
                      className="absolute left-2 md:-left-16 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all pointer-events-auto cursor-pointer z-20"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                  )}

                  {/* Image viewport */}
                  <div className="w-full h-[70vh] flex items-center justify-center overflow-hidden">
                    <motion.img
                      key={activeImgIdx}
                      src={galleryImages[activeImgIdx]}
                      alt={project.name}
                      style={{ scale: zoomScale }}
                      drag={zoomScale > 1}
                      dragConstraints={{ left: -300, right: 300, top: -200, bottom: 200 }}
                      className="max-w-full max-h-full object-contain pointer-events-auto rounded-lg shadow-2xl transition-transform duration-200"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Right slide arrow */}
                  {galleryImages.length > 1 && (
                    <button
                      onClick={handleNext}
                      className="absolute right-2 md:-right-16 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all pointer-events-auto cursor-pointer z-20"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  )}
                </div>

                {/* Thumbnail list bar in lightbox at the bottom */}
                {galleryImages.length > 1 && (
                  <div className="absolute bottom-6 flex items-center gap-3 bg-black/60 p-2.5 rounded-2xl border border-white/5 backdrop-blur-md overflow-x-auto z-[125] max-w-[80vw]">
                    {galleryImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveImgIdx(idx);
                          setZoomScale(1);
                        }}
                        className={`w-12 h-9 rounded-lg overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                          activeImgIdx === idx ? 'border-[#0EA5E9] scale-105' : 'border-transparent opacity-50 hover:opacity-100'
                        }`}
                      >
                        <img src={img} className="w-full h-full object-cover select-none" referrerPolicy="no-referrer" />
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
}
