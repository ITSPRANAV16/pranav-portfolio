import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Award, Printer, Copy, Check, Globe, RefreshCcw, Landmark, ShieldAlert, BadgeCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface CertificateModalProps {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  awardId: string;
}

export default function CertificateModal({ id, isOpen, onClose, awardId }: CertificateModalProps) {
  const { t, language } = useLanguage();
  const [certLang, setCertLang] = useState<'en' | 'mr'>(language);
  const [copied, setCopied] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  // Sync state with global language and manage global document behavior when modal opens
  React.useEffect(() => {
    setCertLang(language);
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [language, isOpen, onClose]);

  if (!isOpen) return null;

  // Static content details to render extremely authentic certificated credentials
  const getCertificateData = () => {
    switch (awardId) {
      case 'award-1': // Appreciation from Nanasaheb Mahadik Polytechnic Institute
        return {
          title: {
            en: 'CERTIFICATE OF EXCELLENT RECOGNITION',
            mr: 'उत्कृष्टता गौरव प्रशंसापत्र'
          },
          subTitle: {
            en: 'PROUDLY PRESENTED TO',
            mr: 'अभिमानाने प्रदान करण्यात येते'
          },
          name: {
            en: 'MR. PRANAV SHAHAJI PATIL',
            mr: 'श्री. प्रणव शहाजी पाटील'
          },
          body: {
            en: 'This certificate is awarded in high appreciation of extraordinary technical contributions, structural leadership, and exemplary dedication in designing, developing, and deploying the institutional-grade Feedback Management System and the Departmental Quiz Competition Platform during the Academic Year 2025-2026. His meticulous actions in automating database workflows and designing fluid interactive interfaces significantly streamlined administrative milestones.',
            mr: 'हे प्रशंसापत्र शैक्षणिक वर्ष २०२५-२०२६ दरम्यान संस्थात्मक दर्जाची फीडबॅक मॅनेजमेंट सिस्टीम (Feedback Management System) आणि विभागीय क्विझ स्पर्धा प्लॅटफॉर्मची रचना, विकास आणि यशस्वी अंमलबजावणी मधील असाधारण तांत्रिक योगदान, नेतृत्व आणि अनुकरणीय समर्पणाच्या उच्च कौतुकार्थ प्रदान करण्यात येत आहे. डेटाबेस प्रक्रिया सुलभ करण्यात आणि परस्परसंवादी युझर इंटरफेस डिझाइन करण्यात त्यांनी केलेल्या उत्कृष्ट कार्यामुळे प्रशासकीय कामकाज गतिमान झाले.'
          },
          issuedBy: {
            en: 'Nanasaheb Mahadik Polytechnic Institute, Peth',
            mr: 'नानासाहेब महाडिक पॉलिटेक्निक इन्स्टिट्यूट, पेठ'
          },
          affiliation: {
            en: 'Approved by AICTE, DTE Mumbai & Affiliated to MSBTE',
            mr: 'AICTE, DTE मुंबई मान्यताप्राप्त आणि MSBTE शी संलग्न'
          },
          serial: 'NMPI-2026-QA-4412',
          date: {
            en: 'April 2026',
            mr: 'एप्रिल २०२६'
          },
          sign1: {
            role: { en: 'Head of Department (CO)', mr: 'विभाग प्रमुख (संगणक विभाग)' },
            name: 'Prof. S. R. Patil'
          },
          sign2: {
            role: { en: 'Principal', mr: 'प्राचार्य' },
            name: 'Dr. V. A. Patil'
          },
          accentColor: 'border-amber-500 bg-amber-500/5 text-amber-600',
          badgeColor: 'text-amber-500',
          sealColor: 'border-amber-400 bg-amber-50 text-amber-600',
          bgTheme: 'from-amber-500/5 to-yellow-500/5'
        };

      case 'award-2': // Internship from AppVishwa
      default:
        return {
          title: {
            en: 'INDUSTRIAL TRAINING & EXPERIENCE CERTIFICATE',
            mr: 'औद्योगिक प्रशिक्षण व अनुभव प्रमाणपत्र'
          },
          subTitle: {
            en: 'THIS IS PRIVILEGED TO CERTIFY THAT',
            mr: 'हे प्रमाणित करण्यात येते की'
          },
          name: {
            en: 'MR. PRANAV SHAHAJI PATIL',
            mr: 'श्री. प्रणव शहाजी पाटील'
          },
          body: {
            en: 'has successfully completed an intensive 3-Month Industrial Internship & Software Development Program at AppVishwa Software Solutions Pvt. Ltd., Urun Islampur, from June 1, 2025 to August 31, 2025. During his rotation, he contributed significantly towards Android App Development, translating Figma mockups into interactive layouts, configuring SQLite Room Databases, and implementing clean asynchronous architectures. His overall performance, dedication, and problem-solving standards were found outstanding.',
            mr: 'यांनी १ जून २०२५ ते ३१ ऑगस्ट २०२५ या कालावधीत अ‍ॅपविश्व सॉफ्टवेअर सोल्यूशन्स प्रा. लि., उरण इस्लामपूर येथे ३ महिन्यांचा सखोल औद्योगिक प्रशिक्षण व सॉफ्टवेअर डेव्हलपमेंट कार्यक्रम यशस्वीरित्या पूर्ण केला आहे. यादरम्यान त्यांनी अँड्रॉइड अ‍ॅप डेव्हलपमेंटवर काम केले, ज्यामध्ये फिग्मा डिझाइन्सचे आकर्षक मांडणीत रूपांतर करणे, SQLite रूम डेटाबेस सेटअप करणे आणि क्लिन आर्किटेक्चर लागू करणे समाविष्ट होते. या संपूर्ण कालावधीत त्यांची कामगिरी, समर्पण आणि समस्या सोडवण्याची कौशल्ये अत्यंत उत्कृष्ट आढळली.'
          },
          issuedBy: {
            en: 'AppVishwa Software Solutions Pvt. Ltd.',
            mr: 'अ‍ॅपविश्व सॉफ्टवेअर सोल्यूशन्स प्रा. लि.'
          },
          affiliation: {
            en: 'Registered Private Software Enterprise - MSME Recognized',
            mr: 'नोंदणीकृत सॉफ्टवेअर संस्था - केंद्र सरकार MSME मान्यताप्राप्त'
          },
          serial: 'AVSS-2025-INT-8912',
          date: {
            en: 'August 31, 2025',
            mr: '३१ ऑगस्ट २०२५'
          },
          sign1: {
            role: { en: 'Technical Director', mr: 'तांत्रिक संचालक' },
            name: 'Er. S. J. Patil'
          },
          sign2: {
            role: { en: 'Managing Director', mr: 'व्यवस्थापकीय संचालक' },
            name: 'A. B. Shinde'
          },
          accentColor: 'border-sky-500 bg-sky-500/5 text-sky-600',
          badgeColor: 'text-sky-500',
          sealColor: 'border-sky-400 bg-sky-50 text-sky-600',
          bgTheme: 'from-sky-500/5 to-indigo-500/5'
        };

      case 'award-3': // Participation in AI FUSION 2.0 at RIT
        return {
          title: {
            en: 'CERTIFICATE OF SUCCESSFUL PARTICIPATION',
            mr: 'यशस्वी सहभाग प्रमाणपत्र'
          },
          subTitle: {
            en: 'THIS CERTIFICATE IS PRESENTED TO',
            mr: 'हे प्रमाणपत्र प्रदान करण्यात येते की'
          },
          name: {
            en: 'MR. PRANAV SHAHAJI PATIL',
            mr: 'श्री. प्रणव शहाजी पाटील'
          },
          body: {
            en: 'for successfully participating and showcasing elite analytical acuity in the national-level event "Decode" under AI FUSION 2.0, jointly organized by the Department of Computer Science and Engineering (Artificial Intelligence & Machine Learning) and the Students Association of Artificial Intelligence (SAAI) at RIT, Rajaramnagar, in October 2024.',
            mr: 'यांनी ऑक्टोबर २०२४ मध्ये राजारामबापू इन्स्टिट्यूट ऑफ टेक्नॉलॉजी (RIT), राजारामनगर येथे संगणक विज्ञान आणि अभियांत्रिकी (AI & ML) विभाग आणि स्टुडंट्स असोसिएशन ऑफ आर्टिफिशिअल इंटेलिजन्स (SAAI) द्वारे संयुक्तपणे आयोजित राष्ट्रीय पातळीवरील ‘AI FUSION २.०’ अंतर्गत ‘Decode’ स्पर्धेत उल्लेखनीय कौशल्यासह यशस्वी सहभाग घेतल्याबद्दल प्रदान करण्यात येत आहे.'
          },
          issuedBy: {
            en: 'Rajarambapu Institute of Technology, Rajaramnagar',
            mr: 'राजारामबापू इन्स्टिट्यूट ऑफ टेक्नॉलॉजी, राजारामनगर'
          },
          affiliation: {
            en: 'An Autonomous Institute, NBA Accreditated & NAAC A+ Grade',
            mr: 'एक स्वायत्त संस्था, NBA मान्यताप्राप्त आणि NAAC A+ मानांकन'
          },
          serial: 'RIT-AIF2-2024-DEC-512',
          date: {
            en: 'October 24, 2024',
            mr: '२४ ऑक्टोबर २०२४'
          },
          sign1: {
            role: { en: 'Faculty Co-ordinator', mr: 'प्राध्यापक समन्वयक' },
            name: 'Dr. S. S. Shinde'
          },
          sign2: {
            role: { en: 'Head of CSE (AI & ML) Department', mr: 'विभाग प्रमुख (CSE AI&ML)' },
            name: 'Dr. N. V. Dharwadkar'
          },
          accentColor: 'border-purple-500 bg-purple-500/5 text-purple-600',
          badgeColor: 'text-purple-500',
          sealColor: 'border-purple-400 bg-purple-50 text-purple-600',
          bgTheme: 'from-purple-500/5 to-pink-500/5'
        };
    }
  };

  const data = getCertificateData();

  const handleCopySerial = () => {
    navigator.clipboard.writeText(data.serial);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    const certElement = printRef.current;
    if (!certElement) return;

    // Open a simple clean print window
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    // Grab all styling from original document to clone styles accurately
    const originalStyles = Array.from(document.querySelectorAll('style, link'))
      .map(node => node.outerHTML)
      .join('\n');

    printWindow.document.write(`
      <html>
        <head>
          <title>Certificate - ${data.name.en}</title>
          ${originalStyles}
          <style>
            @media print {
              body {
                background: white;
                color: black;
                padding: 0;
                margin: 0;
              }
              .no-print {
                display: none !important;
              }
              /* Force landscape sizing for standard print layout and margins */
              @page {
                size: landscape;
                margin: 0.8cm;
              }
              .cert-card-container {
                border: 12px double #D4AF37 !important;
                box-shadow: none !important;
                background-color: white !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
            }
          </style>
        </head>
        <body style="padding: 24px; display: flex; align-items: center; justify-content: center; min-height: 90vh; background-color: #fafafa;">
          <div style="width: 100%; max-width: 950px;">
            ${certElement.outerHTML}
          </div>
          <script>
            window.onload = function() {
              window.print();
              // close print tab after completion if user finishes or cancels
              setTimeout(function(){ window.close(); }, 500);
            }
          </script>
        </body>
      </html>
    `);

    printWindow.document.close();
  };

  return (
    <div 
      className="fixed inset-0 bg-[#000000ef] backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto cursor-pointer"
      id={id}
      onClick={onClose}
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ type: 'spring', damping: 25, stiffness: 280 }}
        className="w-full max-w-[1000px] bg-[#0E0E0E] border border-white/10 rounded-3xl overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.8)] cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Controls Bar */}
        <div className="flex flex-wrap items-center justify-between px-6 py-4 border-b border-white/10 bg-neutral-950 gap-4 no-print">
          <div className="flex items-center gap-2.5">
            <BadgeCheck className="w-5 h-5 text-emerald-400" />
            <div>
              <p className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Interactive Verification System</p>
              <h4 className="text-xs font-black text-white uppercase tracking-wider">Verified Digital Certificate</h4>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Lang switcher */}
            <div className="flex bg-[#121212] border border-white/10 rounded-xl p-1 gap-1">
              <button
                onClick={() => setCertLang('en')}
                className={`px-3 py-1.5 rounded-lg text-[10px] uppercase font-bold tracking-wider transition-all cursor-pointer ${
                  certLang === 'en' ? 'bg-white text-[#121212]' : 'text-neutral-400 hover:text-white'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setCertLang('mr')}
                className={`px-3 py-1.5 rounded-lg text-[10px] uppercase font-bold tracking-wider transition-all cursor-pointer ${
                  certLang === 'mr' ? 'bg-white text-[#121212]' : 'text-neutral-400 hover:text-white'
                }`}
              >
                मराठी
              </button>
            </div>

            {/* Print action */}
            <button
              onClick={handlePrint}
              className="p-2.5 bg-neutral-900 hover:bg-neutral-850 text-white rounded-xl border border-white/10 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-bold"
              title="Print Certificate or Export PDF"
            >
              <Printer className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">Export PDF</span>
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-2.5 bg-neutral-900 hover:bg-neutral-850 hover:text-red-400 text-neutral-400 rounded-xl border border-white/10 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Certificate Display Screen */}
        <div 
          onClick={onClose}
          className="p-4 sm:p-8 md:p-12 bg-neutral-900 border-b border-white/5 overflow-x-auto flex justify-center cursor-pointer"
        >
          <div 
            ref={printRef}
            onClick={(e) => e.stopPropagation()}
            className={`cert-card-container w-full min-w-[750px] max-w-[850px] aspect-[1.414/1] bg-[#FCFDFC] text-[#0A0A0A] p-10 md:p-16 border-[14px] double border-double border-neutral-300 rounded-[8px] relative shadow-2xl overflow-hidden flex flex-col justify-between cursor-default`}
            style={{ borderStyle: 'double' }}
          >
            {/* Visual Security Grids (Background Aesthetic) */}
            <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-r from-yellow-600 via-amber-400 to-yellow-600 block opacity-95" />
            <div className="absolute -right-16 -top-16 w-48 h-48 bg-[#9a3412]/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -left-16 -bottom-16 w-52 h-52 bg-[#0284c7]/5 rounded-full blur-3xl pointer-events-none" />
            
            {/* Watermark in background */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-[0.02]">
              <Award className="w-[380px] h-[380px] text-yellow-600 rotate-12" />
            </div>

            {/* Top Corporate Structure */}
            <div className="relative z-10 flex flex-col items-center text-center mt-2">
              <div className="flex items-center gap-2 border border-[#d4af37]/30 bg-amber-500/5 px-4.5 py-1 rounded-full mb-4">
                <Landmark className="w-4.5 h-4.5 text-[#b45309]" />
                <span className="text-[10px] font-mono tracking-widest font-black uppercase text-[#854d0e]">
                  {data.affiliation[certLang]}
                </span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#111827] uppercase tracking-wide leading-none font-sans filter drop-shadow-sm">
                {data.issuedBy[certLang]}
              </h2>
              
              <hr className="w-48 border-[#d4af37]/50 mt-4 mb-2 border-0.5" />
              
              <h3 className="text-xs md:text-sm font-sans tracking-widest font-extrabold text-[#78350f] uppercase">
                {data.title[certLang]}
              </h3>
            </div>

            {/* Certificate Recipient Presentation */}
            <div className="relative z-10 text-center my-6 md:my-8">
              <p className="text-[11px] md:text-xs font-mono font-semibold text-neutral-400 tracking-wider uppercase mb-3">
                {data.subTitle[certLang]}
              </p>
              
              <h1 className="text-3xl md:text-4xl font-black font-sans text-neutral-900 tracking-wide uppercase leading-none my-3 md:my-4 border-b-2 border-dashed border-gray-200 pb-2.5 max-w-lg mx-auto italic">
                {data.name[certLang]}
              </h1>

              <p className="text-[12px] md:text-[13px] leading-relaxed text-[#374151] max-w-2xl mx-auto font-medium font-sans">
                {data.body[certLang]}
              </p>
            </div>

            {/* Certificate Attainment bottom details */}
            <div className="relative z-10 flex items-end justify-between border-t border-neutral-200/80 pt-6 md:pt-8">
              
              {/* Left Sign Section */}
              <div className="flex flex-col items-center w-40 text-center">
                <div className="h-10 flex items-end justify-center">
                  <span className="font-serif italic text-lg text-neutral-450 select-none pointer-events-none drop-shadow-sm" style={{ fontFamily: '"Playfair Display", Times, serif' }}>
                    {data.sign1.name}
                  </span>
                </div>
                <div className="w-36 border-t border-neutral-300 mt-2 pb-1" />
                <p className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-wider">{data.sign1.role[certLang]}</p>
              </div>

              {/* Center Seal Ornament */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border-4 border-[#b45309] bg-amber-50 flex items-center justify-center relative shadow-md">
                  <div className="w-12 h-12 rounded-full border border-dashed border-[#b45309] flex items-center justify-center text-[#b45309] font-black font-mono text-[9px] uppercase tracking-tighter text-center">
                    SEAL
                  </div>
                  {/* Decorative Ribbons */}
                  <div className="absolute -bottom-3 left-2 w-3.5 h-6 bg-[#b45309] rounded-sm transform -rotate-12 transform-origin-top z-[-1] opacity-90" />
                  <div className="absolute -bottom-3 right-2 w-3.5 h-6 bg-[#b45309] rounded-sm transform rotate-12 transform-origin-top z-[-1] opacity-90" />
                </div>
                <span className="text-[8px] font-mono text-neutral-400 mt-4 tracking-widest uppercase">Verified System</span>
              </div>

              {/* Right Sign Section */}
              <div className="flex flex-col items-center w-40 text-center">
                <div className="h-10 flex items-end justify-center">
                  <span className="font-serif italic text-lg text-neutral-450 select-none pointer-events-none drop-shadow-sm" style={{ fontFamily: '"Playfair Display", Times, serif' }}>
                    {data.sign2.name}
                  </span>
                </div>
                <div className="w-36 border-t border-neutral-300 mt-2 pb-1" />
                <p className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-wider">{data.sign2.role[certLang]}</p>
              </div>

            </div>
          </div>
        </div>

        {/* Verification and Info Details footer bar */}
        <div className="px-6 py-4.5 bg-neutral-950 flex flex-col md:flex-row items-center justify-between gap-4 no-print text-[11px] text-neutral-400 font-medium">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="flex items-center gap-1.5 text-neutral-300">
              <Award className="w-4 h-3.5 text-[#d4af37]" />
              {t("Issued date:")} <strong className="text-white font-bold">{data.date[certLang]}</strong>
            </span>
            <span className="hidden md:inline text-neutral-600">|</span>
            <span className="flex items-center gap-1.5">
              License ID: <strong className="font-mono text-neutral-200 bg-white/5 py-0.5 px-2 rounded">{data.serial}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
               onClick={handleCopySerial}
               className="px-3.5 py-1.5 bg-neutral-900 border border-white/5 text-neutral-300 hover:text-white rounded-lg cursor-pointer flex items-center gap-1.5 transition-colors text-[10px]"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  Copied Key
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy Serial
                </>
              )}
            </button>
            <span className="inline-flex items-center gap-1 py-1 px-2.5 bg-emerald-500/10 text-emerald-400 rounded-full text-[9px] font-mono uppercase tracking-widest font-black">
              <BadgeCheck className="w-3 h-3 block" />
              Secured Signature
            </span>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
