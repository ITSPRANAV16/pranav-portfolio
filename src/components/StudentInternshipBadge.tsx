import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GraduationCap, Briefcase, Sparkles, MapPin, X, ArrowUpRight, FileDown, CheckCircle2, Code2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { handleCVDownload } from '../utils/cvStore';

interface StudentInternshipBadgeProps {
  onContactClick: () => void;
  className?: string;
}

export default function StudentInternshipBadge({ onContactClick, className = '' }: StudentInternshipBadgeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useLanguage();

  return (
    <>
      {/* 1. Main Floating / Interactive Badge */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        onClick={() => setIsOpen(true)}
        className={`group cursor-pointer bg-white/95 hover:bg-white backdrop-blur-md border border-gray-200/80 hover:border-gray-900/30 p-2 sm:p-2.5 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex items-center justify-between gap-3 select-none ${className}`}
        role="button"
        aria-label="View Student Profile & Internship Status"
      >
        <div className="flex items-center gap-2.5">
          {/* Left Icon Pill */}
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-sm shrink-0 group-hover:scale-105 transition-transform">
            <GraduationCap className="w-5 h-5" />
          </div>

          {/* Texts */}
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-bold text-gray-900 tracking-tight flex items-center gap-1">
                {language === 'mr' ? 'B.Tech विद्यार्थी (ECE)' : 'B.Tech Undergrad (ECE)'}
              </span>
              <span className="text-[10px] font-semibold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded-md">
                SPPU
              </span>
            </div>
            <p className="text-[11px] font-medium text-gray-500 line-clamp-1">
              Dr. D.Y. Patil Tech Campus, Pune
            </p>
          </div>
        </div>

        {/* Live Status Tag */}
        <div className="hidden sm:flex items-center gap-2 pl-2 pr-1 border-l border-gray-200/80">
          <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200/60 px-2.5 py-1 rounded-full text-[11px] font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>{language === 'mr' ? 'इंटर्नशिपसाठी उपलब्ध' : 'Open for Internships'}</span>
          </div>
          <div className="w-6 h-6 rounded-full bg-gray-100 group-hover:bg-black group-hover:text-white flex items-center justify-center transition-colors">
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Mobile Mini Indicator */}
        <div className="flex sm:hidden items-center gap-1 bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full text-[10px] font-bold shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>{language === 'mr' ? 'उपलब्ध' : 'Available'}</span>
        </div>
      </motion.div>

      {/* 2. Detailed Modal / Candidate Snapshot */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
              className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden z-10 my-auto"
            >
              {/* Header Gradient */}
              <div className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 text-white p-6 sm:p-7 relative">
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  {language === 'mr' ? 'विद्यार्थी प्रोफाईल आणि इंटर्नशिप स्थिती' : 'Candidate & Internship Snapshot'}
                </div>

                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-1">
                  Pranav Patil
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm font-medium">
                  {language === 'mr'
                    ? 'B.Tech - इलेक्ट्रॉनिक्स आणि कॉम्प्युटर इंजिनिअरिंग विद्यार्थी'
                    : 'B.Tech in Electronics & Computer Engineering Undergrad'}
                </p>

                <div className="flex items-center gap-3 mt-4 flex-wrap text-xs text-gray-300">
                  <span className="flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-lg">
                    <GraduationCap className="w-3.5 h-3.5 text-sky-400" />
                    SPPU (2026 - 2029)
                  </span>
                  <span className="flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-lg">
                    <MapPin className="w-3.5 h-3.5 text-rose-400" />
                    Pune, Maharashtra
                  </span>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-6 sm:p-7 space-y-5 max-h-[65vh] overflow-y-auto">
                {/* 1. Academic & University */}
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
                    <GraduationCap className="w-4 h-4 text-indigo-600" />
                    {language === 'mr' ? 'शैक्षणिक पार्श्वभूमी' : 'Academic Profile'}
                  </div>
                  <div className="space-y-2 text-xs sm:text-sm text-gray-700">
                    <div>
                      <div className="font-semibold text-gray-900">
                        Dr. D.Y. Patil Technical Campus, Varale, Pune
                      </div>
                      <div className="text-gray-500 text-xs">
                        {language === 'mr'
                          ? 'सावित्रीबाई फुले पुणे विद्यापीठ (SPPU) शी संलग्न'
                          : 'Affiliated with Savitribai Phule Pune University (SPPU)'}
                      </div>
                    </div>
                    <div className="pt-2 border-t border-gray-200/60">
                      <div className="font-semibold text-gray-900">
                        Diploma in Computer Engineering (MSBTE)
                      </div>
                      <div className="text-gray-500 text-xs">
                        {language === 'mr'
                          ? 'नानासाहेब महाडिक पॉलिटेक्निक • फर्स्ट क्लास विथ डिस्टिंक्शन'
                          : 'Nanasaheb Mahadik Polytechnic • Completed with Distinction'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Target Roles & Availability */}
                <div className="bg-emerald-50/70 border border-emerald-100 rounded-2xl p-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 uppercase tracking-wider mb-2">
                    <Briefcase className="w-4 h-4 text-emerald-600" />
                    {language === 'mr' ? 'सध्याच्या संधी आणि रोल्स' : 'Target Internship Roles'}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium text-emerald-950">
                    <div className="flex items-center gap-1.5 bg-white/80 px-2.5 py-1.5 rounded-lg border border-emerald-200/50">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Android App Developer (Native Java/Kotlin)</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-white/80 px-2.5 py-1.5 rounded-lg border border-emerald-200/50">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Full-Stack Web Dev (React, Node.js)</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-white/80 px-2.5 py-1.5 rounded-lg border border-emerald-200/50">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Software Engineering Intern</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-white/80 px-2.5 py-1.5 rounded-lg border border-emerald-200/50">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Open for 3 to 6-Month Internships</span>
                    </div>
                  </div>
                </div>

                {/* 3. Core Tech Foundations */}
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-900 uppercase tracking-wider mb-2.5">
                    <Code2 className="w-4 h-4 text-sky-600" />
                    {language === 'mr' ? 'महत्त्वाची कौशल्ये आणि तंत्रज्ञान' : 'Core Foundations & Skills'}
                  </div>
                  <div className="flex flex-wrap gap-1.5 text-xs font-medium">
                    {['Core Java', 'Android Studio', 'React.js', 'Room SQLite', 'Retrofit & REST APIs', 'DBMS / SQL', 'Data Structures (DSA)', 'Git / GitHub', 'Tailwind CSS'].map((skill) => (
                      <span key={skill} className="bg-gray-100 text-gray-800 px-2.5 py-1 rounded-lg border border-gray-200/70">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="p-4 sm:p-5 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  onClick={() => handleCVDownload()}
                  className="w-full sm:w-auto px-5 py-2.5 bg-white hover:bg-gray-100 text-gray-900 border border-gray-200 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
                >
                  <FileDown className="w-4 h-4 text-gray-600" />
                  {language === 'mr' ? 'रेझ्युमे डाउनलोड करा' : 'Download CV (PDF)'}
                </button>

                <button
                  onClick={() => {
                    setIsOpen(false);
                    onContactClick();
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 bg-[#121212] hover:bg-black text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] cursor-pointer shadow-md"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  {language === 'mr' ? 'इंटर्नशिपसाठी संपर्क करा' : 'Connect for Internship'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
