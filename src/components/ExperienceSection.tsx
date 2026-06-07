import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { OWNER_CONFIG } from '../config/owner';
import { Briefcase, GraduationCap, Calendar, MapPin, ChevronRight, CheckCircle2, Award, Sparkles, BookOpen } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import CertificateModal from './CertificateModal';

export default function ExperienceSection({ id = 'experience' }: { id?: string }) {
  const experiences = OWNER_CONFIG.experience || [];
  const educations = OWNER_CONFIG.education || [];
  const { t, language } = useLanguage();
  const [activeCertId, setActiveCertId] = useState<string | null>(null);

  const detailsRef = useRef<HTMLDivElement>(null);

  // Group all items into a unified list or separate tabs
  const [activeTab, setActiveTab] = useState<'all' | 'experience' | 'education'>('all');
  const [selectedId, setSelectedId] = useState<string>('exp-0');

  // Let's create a combined array of items with pre-calculated details for interactive click actions
  const timelineItems = [
    ...experiences.map((exp, idx) => ({
      uid: `exp-${idx}`,
      type: 'experience' as const,
      title: t(exp.role),
      subtitle: t(exp.company),
      duration: t(exp.duration),
      location: t(exp.location),
      description: t(exp.description),
      modules: (exp.modules || []).map(m => ({
        title: t(m.title),
        details: t(m.details)
      })),
      highlights: [],
    })),
    ...educations.map((edu, idx) => ({
      uid: `edu-${idx}`,
      type: 'education' as const,
      title: t(edu.degree),
      subtitle: t(edu.institution),
      duration: t(edu.duration),
      location: t(edu.location),
      description: '',
      modules: [],
      highlights: (edu.highlights || []).map((h: string) => t(h)),
    }))
  ];

  // Auto-select first item in current active tab if the selected item is filtered out
  const filteredTimeline = timelineItems.filter(item => {
    if (activeTab === 'all') return true;
    return item.type === activeTab;
  });

  // Ensure something is selected when we switch tabs
  React.useEffect(() => {
    if (filteredTimeline.length > 0) {
      const alreadyPresent = filteredTimeline.some(item => item.uid === selectedId);
      if (!alreadyPresent) {
        setSelectedId(filteredTimeline[0].uid);
      }
    }
  }, [activeTab]);

  const currentSelection = timelineItems.find(item => item.uid === selectedId) || timelineItems[0];

  return (
    <section 
      id={id} 
      className="w-full relative px-6 md:px-12 py-24 md:py-32 bg-[#F9FAFB] border-t border-b border-gray-200/60 overflow-hidden"
    >
      {/* Decorative Interactive Lights */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-sky-200/20 blur-[100px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-0 left-10 w-[500px] h-[500px] bg-amber-100/30 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="max-w-[1240px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 border-b border-gray-200 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-1 bg-[#121212] text-white rounded-full text-[10px] font-mono font-bold tracking-widest uppercase shadow-sm">
                {t("Timeline / Journey")}
              </span>
              <span className="text-gray-400 text-xs font-mono font-bold">[05]</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl font-black text-[#121212] tracking-tight uppercase leading-[1.05]">
              {t("Experience")} & <span className="font-sans font-light text-neutral-450 italic lowercase">{t("Education")}</span>
            </h2>
          </div>

          <p className="text-gray-500 font-medium text-sm sm:text-base max-w-sm mt-4 md:mt-0 leading-relaxed font-sans">
            {t("Explore my professional journey, academic backgrounds, and technical milestones interactively by selecting the cards below.")}
          </p>
        </div>

        {/* Tab Switcher Controls - High Polish Interactive Design */}
        <div className="flex flex-wrap items-center justify-start gap-2 mb-10 pb-2 border-b border-gray-100">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-5 py-2.5 rounded-full text-xs font-black tracking-wider uppercase transition-all duration-300 flex items-center gap-2 border cursor-pointer select-none ${
              activeTab === 'all' 
                ? 'bg-[#121212] text-white border-transparent shadow-lg scale-[1.03]' 
                : 'bg-white hover:bg-gray-50 text-neutral-600 hover:text-black border-gray-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            {t("All")}
          </button>
          <button
            onClick={() => setActiveTab('experience')}
            className={`px-5 py-2.5 rounded-full text-xs font-black tracking-wider uppercase transition-all duration-300 flex items-center gap-2 border cursor-[#121212] cursor-pointer select-none ${
              activeTab === 'experience' 
                ? 'bg-[#121212] text-white border-transparent shadow-lg scale-[1.03]' 
                : 'bg-white hover:bg-gray-50 text-neutral-600 hover:text-black border-gray-200'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 text-sky-500" />
            {t("Experience")}
          </button>
          <button
            onClick={() => setActiveTab('education')}
            className={`px-5 py-2.5 rounded-full text-xs font-black tracking-wider uppercase transition-all duration-300 flex items-center gap-2 border cursor-pointer select-none ${
              activeTab === 'education' 
                ? 'bg-[#121212] text-white border-transparent shadow-lg scale-[1.03]' 
                : 'bg-white hover:bg-gray-50 text-neutral-600 hover:text-black border-gray-200'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-amber-500" />
            {t("Education")}
          </button>
        </div>

        {/* Dynamic Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
          
          {/* LEFT COLUMN: Timeline Menu Toggles (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-3.5 order-1 lg:order-1">
            <span className="text-[10px] font-mono font-bold text-gray-400 tracking-widest uppercase px-1 mb-1 block">
              {language === 'mr' ? 'तपशील पाहण्यासाठी खालील कार्ड्स निवडा' : 'Interact (Select to view detailed specs)'}
            </span>

            <div className="flex flex-col gap-3">
              <AnimatePresence mode="popLayout">
                {filteredTimeline.map((item) => {
                  const isSelected = item.uid === selectedId;
                  
                  return (
                    <motion.button
                      key={item.uid}
                      layoutId={`item-card-${item.uid}`}
                      onClick={() => {
                        setSelectedId(item.uid);
                        // Smoothly scroll down to details on mobile screens
                        if (window.innerWidth < 1024) {
                          setTimeout(() => {
                            detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                          }, 100);
                        }
                      }}
                      whileHover={{ x: isSelected ? 0 : 5 }}
                      className={`text-left w-full p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden cursor-pointer flex flex-col justify-between ${
                        isSelected 
                          ? 'bg-white border-[#121212] shadow-[0_12px_32px_rgb(0,0,0,0.06)]' 
                          : 'bg-white/60 hover:bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm'
                      }`}
                    >
                      {/* Interactive Visual Highlight Bar on Card selection */}
                      {isSelected && (
                        <motion.div 
                          layoutId="selected-indicator"
                          className={`absolute left-0 top-0 bottom-0 w-1.5 ${item.type === 'experience' ? 'bg-sky-500' : 'bg-amber-400'}`}
                        />
                      )}

                      <div className="flex justify-between items-start gap-3 w-full pl-2">
                        <div className="flex gap-3">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                            isSelected 
                              ? (item.type === 'experience' ? 'bg-sky-500/10 text-sky-600' : 'bg-amber-500/10 text-amber-600')
                              : 'bg-gray-100 text-gray-400'
                          }`}>
                            {item.type === 'experience' ? <Briefcase className="w-4 h-4" /> : <GraduationCap className="w-4 h-4" />}
                          </div>
                          
                          <div>
                            <span className="text-[10px] uppercase font-mono tracking-wider text-gray-400 block mb-0.5">
                              {item.type === 'experience' ? 'Industrial Exp' : 'Academic Deg'}
                            </span>
                            <h3 className={`text-base font-black uppercase tracking-tight leading-tight ${isSelected ? 'text-[#121212]' : 'text-neutral-700'}`}>
                              {item.subtitle}
                            </h3>
                            <p className="text-xs text-gray-500 mt-1 font-medium">{item.title}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between w-full mt-4 pl-2 pt-3 border-t border-gray-100 text-[11px] text-gray-400">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-neutral-400" />
                          {item.location}
                        </span>
                        
                        <span className={`font-mono flex items-center gap-0.5 ${isSelected ? 'opacity-100' : 'opacity-0'} font-bold transition-opacity`}>
                          View Specs <ChevronRight className="w-3.5 h-3.5 animate-bounce-horizontal" />
                        </span>
                      </div>
                    </motion.button>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT COLUMN: Dynamic Interactive Details (7 cols) */}
          <div ref={detailsRef} className="lg:col-span-7 order-2 lg:order-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSelection.uid}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="w-full bg-white border border-gray-200/80 rounded-3xl p-6 sm:p-10 shadow-[0_16px_40px_rgb(0,0,0,0.035)] relative overflow-hidden min-h-[460px] flex flex-col justify-between"
              >
                <div>
                  
                  {/* Category Stamp Label */}
                  <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-gray-100">
                    <span className="flex items-center gap-1.5 font-mono text-xs font-bold text-gray-400">
                      {currentSelection.type === 'experience' ? (
                        <>
                          <Briefcase className="w-4 h-4 text-sky-500" />
                          PROFESSIONAL EXPERIENCE
                        </>
                      ) : (
                        <>
                          <GraduationCap className="w-4 h-4 text-amber-500" />
                          ACADEMIC RECOGNITION
                        </>
                      )}
                    </span>
                  </div>

                  {/* Institution / Company Big Name */}
                  <h3 className="text-2xl sm:text-3xl font-black text-[#121212] tracking-tight uppercase leading-tight mb-2">
                    {currentSelection.subtitle}
                  </h3>
                  
                  {/* Degree/Role and Place row */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6 text-sm text-gray-500 font-medium">
                    <span className="text-[#121212] font-semibold">{currentSelection.title}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                    <span className="flex items-center gap-1 text-gray-400">
                      <MapPin className="w-3.5 h-3.5" />
                      {currentSelection.location}
                    </span>
                  </div>

                  {/* Render core description */}
                  {currentSelection.description && (
                    <p className="text-gray-600 text-[14px] leading-relaxed mb-6 font-medium">
                      {currentSelection.description}
                    </p>
                  )}

                  {/* Render Nested Details (Highlights for Education OR Modules for Internship Experience) */}
                  <div className="space-y-4">
                    {currentSelection.highlights.length > 0 ? (
                      <div>
                        <span className="text-[10px] font-mono tracking-wider font-bold text-amber-600 uppercase mb-3 block">
                          {t("Academic Highlights / Distinctions")}
                        </span>
                        
                        <div className="grid grid-cols-1 gap-2.5">
                          {currentSelection.highlights.map((highlight, idx) => (
                            <div key={idx} className="flex items-start gap-3 bg-[#FCFDFC] border border-[#E9EBEA] p-3 rounded-xl hover:border-amber-200/60 transition-colors">
                              <div className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                                <CheckCircle2 className="w-3 h-3" />
                              </div>
                              <p className="text-xs sm:text-sm text-neutral-700 leading-normal font-sans">
                                {highlight}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null}

                    {/* Modules Render for Intern AppVishwa */}
                    {currentSelection.modules.length > 0 ? (
                      <div>
                        <span className="text-[10px] font-mono tracking-wider font-bold text-sky-600 uppercase mb-3 block animate-pulse">
                          {t("Mastered Stacks / Practical Training")}
                        </span>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          {currentSelection.modules.map((mod: any, idx: number) => (
                            <div key={idx} className="bg-sky-50/20 border border-sky-100/50 hover:border-sky-200 hover:bg-sky-50/40 p-4 rounded-2xl transition-all duration-300">
                              <h4 className="text-xs font-black uppercase tracking-wider text-sky-600 mb-1 flex items-center gap-1.5">
                                <BookOpen className="w-3.5 h-3.5" />
                                {mod.title}
                              </h4>
                              <p className="text-[11px] text-neutral-600 leading-normal">
                                {mod.details}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null}

                  </div>
                </div>

                {/* Bottom trust seal badge interactive */}
                <div className="mt-8 pt-5 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs">
                  <span className="text-gray-400 font-mono">
                    ID Ref: {currentSelection.uid.toUpperCase()}
                  </span>
                  
                  <span className="px-3 py-1 bg-[#121212]/5 rounded-full text-[10px] font-bold text-[#121212] flex items-center gap-1 uppercase select-none">
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    Verified Credentials Digital CV
                  </span>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Dynamic bottom feedback highlights / Stats block for delightful light aesthetics */}
        <div className="bg-[#121212] text-white rounded-3xl p-6 sm:p-10 mt-16 shadow-xl grid grid-cols-1 md:grid-cols-3 gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-full bg-[linear-gradient(45deg,rgba(255,255,255,0.02)_13px,transparent_13px)] bg-[size:20px_20px] opacity-[0.4]" />
          
          <div className="relative z-10 flex gap-4">
            <div className="text-amber-400 font-mono text-xl sm:text-2xl font-black">/01</div>
            <div>
              <h5 className="font-bold text-sm tracking-wide uppercase uppercase mb-1">Industrial Intern</h5>
              <p className="text-xs text-neutral-400 leading-normal">Rotating across Web Layout pipelines, Python Script algorithms, structures, & Android MVC configurations.</p>
            </div>
          </div>
          <div className="relative z-10 flex gap-4">
            <div className="text-sky-400 font-mono text-xl sm:text-2xl font-black">/02</div>
            <div>
              <h5 className="font-bold text-sm tracking-wide uppercase uppercase mb-1">Academic Credentials</h5>
              <p className="text-xs text-neutral-400 leading-normal">Mastering essential Software Development Life Cycle (SDLC), Object Oriented logic, databases, & Android tools.</p>
            </div>
          </div>
          <div className="relative z-10 flex gap-4">
            <div className="text-emerald-400 font-mono text-xl sm:text-2xl font-black">/03</div>
            <div>
              <h5 className="font-bold text-sm tracking-wide uppercase uppercase mb-1">Interactive Touch UI</h5>
              <p className="text-xs text-neutral-400 leading-normal">Applying rich Material Design 3 guidelines to client widgets to ensure dynamic responsiveness and tactile delight.</p>
            </div>
          </div>
        </div>

      </div>

      {/* High Fidelity Certificate Viewer Modal Popup linked to Journey cards */}
      <AnimatePresence>
        {activeCertId && (
          <CertificateModal
            id="experience-cert-modal"
            isOpen={!!activeCertId}
            onClose={() => setActiveCertId(null)}
            awardId={activeCertId}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
