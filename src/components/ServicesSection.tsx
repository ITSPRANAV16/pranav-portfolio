import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { OWNER_CONFIG } from '../config/owner';
import { useLanguage } from '../context/LanguageContext';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 40, damping: 20 },
  },
};

export default function ServicesSection({ id = 'services' }: { id?: string }) {
  const services = OWNER_CONFIG.services;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { t } = useLanguage();

  return (
    <section id={id} className="w-full relative bg-[#F4F4F4] pt-12 pb-32">
      <motion.div 
        className="max-w-[1400px] mx-auto px-4 md:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        
        {/* Title Area */}
        <div className="relative w-full flex items-center justify-center py-20 md:py-32 overflow-hidden mb-8 md:mb-16">
          <motion.span 
            initial={{ opacity: 0, scale: 0.9, y: "-50%" }}
            whileInView={{ opacity: 1, scale: 1, y: "-50%" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute text-[#E5E5E5] font-bold text-center w-full z-0 pointer-events-none select-none uppercase tracking-[0.1em]"
            style={{ fontSize: 'clamp(5rem, 20vw, 15rem)', top: '50%', whiteSpace: 'nowrap' }}
          >
            BUILD
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="relative z-10 text-3xl md:text-5xl lg:text-7xl font-bold tracking-tight text-[#121212] flex items-center gap-2"
          >
            <span className="text-gray-300 font-light mr-1">/</span> {t("What I Build").toUpperCase()}
          </motion.h2>
        </div>

        {/* Services List */}
        <div className="flex flex-col w-full mt-8">
          {services.map((item, index) => {
            const isHovered = hoveredIndex === index;
            
            return (
              <motion.div 
                key={index} 
                variants={itemVariants}
                className="w-full border-b border-black/10 last:border-b-0 relative group"
                onMouseEnter={() => { if (window.innerWidth >= 768) setHoveredIndex(index); }}
                onMouseLeave={() => { if (window.innerWidth >= 768) setHoveredIndex(null); }}
              >
                <div 
                  onClick={() => {
                    if (window.innerWidth < 768) {
                      setHoveredIndex(hoveredIndex === index ? null : index);
                    }
                  }}
                  className={`relative cursor-pointer transition-all duration-400 ease-out z-10 ${isHovered ? 'bg-[#1a1a1a] rounded-[24px] shadow-2xl py-4 sm:-mx-6 sm:px-6 z-20' : 'bg-transparent rounded-none z-10 py-0'}`}
                >
                  <div className="w-full py-8 md:py-10 px-4 flex flex-col md:flex-row md:items-center justify-between relative min-h-[120px] md:min-h-[160px]">
                    
                    {/* Left Side (Text) */}
                    <div className="w-full md:w-1/2 flex flex-col justify-center z-20">
                      <h4 className={`text-3xl md:text-[52px] font-medium tracking-tight transition-colors duration-400 ${isHovered ? 'text-white' : 'text-[#121212]'}`}>
                        {t(item.name).toUpperCase()}
                      </h4>
                      
                      <AnimatePresence>
                        {isHovered && (
                          <motion.p 
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: 'auto', marginTop: '1rem' }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-gray-400 text-sm md:text-lg font-light leading-relaxed max-w-sm overflow-hidden"
                          >
                            {t(item.description)}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Right Side (Images / Arrow) */}
                    <div className="w-full md:w-1/2 flex items-center justify-end relative h-full mt-4 md:mt-0">
                      
                      {/* The Arrow / Close Icon */}
                      <div className={`shrink-0 absolute right-0 md:right-4 flex items-center justify-center transition-all duration-400 w-12 h-12 rounded-full ${isHovered ? 'text-white' : 'text-black opacity-60 group-hover:opacity-100 group-hover:translate-x-2'}`}>
                        <AnimatePresence mode="wait">
                          {isHovered ? (
                            <motion.svg 
                              key="close"
                              initial={{ opacity: 0, rotate: -90 }}
                              animate={{ opacity: 1, rotate: 0 }}
                              exit={{ opacity: 0, rotate: 90 }}
                              width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                            >
                              <path d="M18 6L6 18M6 6l12 12"/>
                            </motion.svg>
                          ) : (
                            <motion.svg 
                              key="arrow"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 10 }}
                              width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                            >
                              <path d="M7 17L17 7"/>
                              <path d="M7 7h10v10"/>
                            </motion.svg>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* The Images */}
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div 
                            className="hidden md:flex absolute right-4 md:right-16 top-1/2 -translate-y-1/2 w-full max-w-[320px] h-[250px] flex-shrink-0 z-30 pointer-events-none justify-end md:pr-4"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                          >
                            <motion.div
                              initial={{ opacity: 0, rotate: 10, y: 20, x: 20, scale: 0.8 }}
                              animate={{ opacity: 1, rotate: 8, y: 10, x: 20, scale: 0.95 }}
                              exit={{ opacity: 0, rotate: 10, y: 20, x: 20, scale: 0.8 }}
                              transition={{ delay: 0.1, type: "spring", stiffness: 60, damping: 20 }}
                              className="absolute z-0 w-[240px] md:w-[300px] aspect-[4/3] rounded-xl overflow-hidden bg-[#242424] border-4 border-[#1a1a1a] shadow-2xl"
                            >
                              <img src={item.images?.[1] || `https://picsum.photos/seed/${index}b/400/300`} referrerPolicy="no-referrer" className="w-full h-full object-cover opacity-80" alt="" />
                            </motion.div>
                            <motion.div
                              initial={{ opacity: 0, rotate: -10, y: 20, scale: 0.8 }}
                              animate={{ opacity: 1, rotate: -4, y: -10, x: -20, scale: 1 }}
                              exit={{ opacity: 0, rotate: -10, y: 20, scale: 0.8 }}
                              transition={{ delay: 0.05, type: "spring", stiffness: 60, damping: 20 }}
                              className="absolute z-10 w-[240px] md:w-[320px] aspect-[4/3] rounded-xl overflow-hidden bg-[#242424] border-4 border-[#1a1a1a] shadow-2xl"
                            >
                              <img src={item.images?.[0] || `https://picsum.photos/seed/${index}/400/300`} referrerPolicy="no-referrer" className="w-full h-full object-cover opacity-100 transition-transform duration-500 hover:scale-105" alt={`${item.name} image`} />
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
