import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Settings, 
  UploadCloud, 
  CheckCircle, 
  FileText, 
  X, 
  RotateCcw, 
  Info,
  Link2,
  FolderOpen,
  FileCheck,
  ExternalLink,
  Plus,
  Trash2,
  User,
  Briefcase,
  Share2,
  Code,
  Smartphone,
  Database,
  Save,
  MapPin,
  Mail,
  Phone
} from 'lucide-react';
import { 
  saveCustomCV, 
  getCustomCV, 
  hasCustomCV,
  saveCustomCVUrl,
  getCustomCVUrl,
  deleteCustomCVUrl
} from '../utils/cvStore';
import {
  getRawSettings,
  savePortfolioSettings,
  resetPortfolioSettings,
  getDefaultSettings,
  OWNER_CONFIG
} from '../config/owner';

type TabType = 'basics' | 'socials' | 'skills' | 'services' | 'cv' | 'danger';

export default function CVManagerWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  
  // Tab controller
  const [activeTab, setActiveTab] = useState<TabType>('basics');
  
  // CV File & Link states
  const [hasFile, setHasFile] = useState(false);
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [cvUrl, setCvUrl] = useState('');
  const [activeUrl, setActiveUrl] = useState<string | null>(null);

  // Basics Form states
  const [basics, setBasics] = useState({
    name: '',
    fullName: '',
    title: '',
    role: '',
    tagline: '',
    bio: '',
    email: '',
    phone: '',
    location: ''
  });

  // Socials Form states
  const [socials, setSocials] = useState({
    github: '',
    linkedin: '',
    naukri: ''
  });

  // Skills Categories states
  const [skillCategories, setSkillCategories] = useState<any[]>([]);
  const [newSkillCategoryName, setNewSkillCategoryName] = useState('');
  const [newSkillsForCat, setNewSkillsForCat] = useState<{ [catIndex: number]: string }>({});

  // Services State
  const [services, setServices] = useState<any[]>([]);
  const [selectedServiceIndex, setSelectedServiceIndex] = useState<number>(0);

  // Status message state
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check URL query parameters for ?admin=true on mount to unlock panel
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.get('admin') === 'true') {
      localStorage.setItem('cv_manager_unlocked', 'true');
      setIsAdminUnlocked(true);
    } else if (localStorage.getItem('cv_manager_unlocked') === 'true') {
      setIsAdminUnlocked(true);
    }
  }, []);

  // Load latest settings when modal is opened
  useEffect(() => {
    if (isOpen) {
      loadAllSettings();
    }
  }, [isOpen]);

  const loadAllSettings = async () => {
    const raw = getRawSettings();
    if (raw) {
      setBasics({
        name: raw.name || '',
        fullName: raw.fullName || '',
        title: raw.title || '',
        role: raw.role || '',
        tagline: raw.tagline || '',
        bio: raw.bio || '',
        email: raw.email || '',
        phone: raw.phone || '',
        location: raw.location || ''
      });

      setSocials({
        github: raw.socials?.github || '',
        linkedin: raw.socials?.linkedin || '',
        naukri: raw.socials?.naukri || raw.socials?.dribbble || ''
      });

      setSkillCategories(raw.skillCategories ? JSON.parse(JSON.stringify(raw.skillCategories)) : []);
      setServices(raw.services ? JSON.parse(JSON.stringify(raw.services)) : []);
    }

    // Load CV File State
    const uploaded = await hasCustomCV();
    if (uploaded) {
      const file = await getCustomCV();
      if (file) {
        setHasFile(true);
        setFileName(file instanceof File ? file.name : 'Personal_CV.pdf');
        const sizeInKB = Math.round(file.size / 1024);
        setFileSize(`${sizeInKB} KB`);
      }
    } else {
      setHasFile(false);
      setFileName('');
      setFileSize('');
    }

    // Load CV URL Link
    const savedUrl = getCustomCVUrl();
    if (savedUrl) {
      setCvUrl(savedUrl);
      setActiveUrl(savedUrl);
    } else {
      // Fallback
      setCvUrl(raw?.cvUrl || '');
      setActiveUrl(raw?.cvUrl || null);
    }
  };

  // Helper clear alerts
  const triggerSuccessAlert = () => {
    setStatus('success');
    setTimeout(() => setStatus('idle'), 3000);
  };

  const triggerErrorAlert = (msg: string) => {
    setStatus('error');
    setErrorMessage(msg);
    setTimeout(() => setStatus('idle'), 4000);
  };

  // Save Basics Action
  const handleSaveBasics = () => {
    try {
      const current = getRawSettings();
      const updated = {
        ...current,
        ...basics
      };
      savePortfolioSettings(updated);
      triggerSuccessAlert();
    } catch (e) {
      triggerErrorAlert('Failed to update Basic Bio settings.');
    }
  };

  // Save Socials Action
  const handleSaveSocials = () => {
    try {
      const current = getRawSettings();
      const updated = {
        ...current,
        socials: {
          ...current.socials,
          ...socials
        }
      };
      savePortfolioSettings(updated);
      triggerSuccessAlert();
    } catch (e) {
      triggerErrorAlert('Failed to update Social configuration.');
    }
  };

  // Save Skills configuration
  const handleSaveSkills = () => {
    try {
      const current = getRawSettings();
      const updated = {
        ...current,
        skillCategories
      };
      savePortfolioSettings(updated);
      triggerSuccessAlert();
    } catch (e) {
      triggerErrorAlert('Failed to save updated Tech Skills list.');
    }
  };

  // Save Services list
  const handleSaveServices = () => {
    try {
      const current = getRawSettings();
      const updated = {
        ...current,
        services
      };
      savePortfolioSettings(updated);
      triggerSuccessAlert();
    } catch (e) {
      triggerErrorAlert('Failed to save updated Services configurations.');
    }
  };

  // ADD & REMOVE CATEGOREY OR SKILLS
  const handleAddSkillCategory = () => {
    if (!newSkillCategoryName.trim()) return;
    const updated = [...skillCategories, { name: newSkillCategoryName.trim(), skills: [] }];
    setSkillCategories(updated);
    setNewSkillCategoryName('');
  };

  const handleRemoveSkillCategory = (indexToRemove: number) => {
    const updated = skillCategories.filter((_, idx) => idx !== indexToRemove);
    setSkillCategories(updated);
  };

  const handleAddSkillToCategory = (catIndex: number) => {
    const skillText = newSkillsForCat[catIndex]?.trim();
    if (!skillText) return;

    const updated = [...skillCategories];
    updated[catIndex].skills = [...updated[catIndex].skills, skillText];
    
    setSkillCategories(updated);
    setNewSkillsForCat({
      ...newSkillsForCat,
      [catIndex]: ''
    });
  };

  const handleRemoveSkillFromCategory = (catIndex: number, skillName: string) => {
    const updated = [...skillCategories];
    updated[catIndex].skills = updated[catIndex].skills.filter((sk: string) => sk !== skillName);
    setSkillCategories(updated);
  };

  // SERVICES INDIVIDUAL CHANGE HANDLERS
  const handleServiceFieldChange = (index: number, field: string, value: string) => {
    const updated = [...services];
    updated[index] = {
      ...updated[index],
      [field]: value
    };
    setServices(updated);
  };

  // Integrated file upload actions
  const processFile = async (file: File) => {
    if (file.type !== 'application/pdf') {
      triggerErrorAlert('Please upload a valid PDF file only.');
      return;
    }

    try {
      await saveCustomCV(file);
      setHasFile(true);
      setFileName(file.name);
      const sizeInKB = Math.round(file.size / 1024);
      setFileSize(`${sizeInKB} KB`);
      
      triggerSuccessAlert();
      loadAllSettings();
    } catch (err) {
      triggerErrorAlert('Failed to save PDF locally.');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      await processFile(e.target.files[0]);
    }
  };

  const handleSaveCVUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cvUrl.trim()) {
      triggerErrorAlert('Please enter a valid URL.');
      return;
    }

    if (!cvUrl.startsWith('http://') && !cvUrl.startsWith('https://')) {
      triggerErrorAlert('URL must start with http:// or https://');
      return;
    }

    try {
      saveCustomCVUrl(cvUrl.trim());
      setActiveUrl(cvUrl.trim());
      triggerSuccessAlert();
    } catch (err) {
      triggerErrorAlert('Failed to lock custom link.');
    }
  };

  const handleResetCVUrl = () => {
    deleteCustomCVUrl();
    setCvUrl('');
    setActiveUrl(null);
    triggerSuccessAlert();
  };

  const handleResetFile = async () => {
    try {
      const DB_NAME = 'PatilCVStorage';
      const STORE_NAME = 'pdf_files';
      const KEY_NAME = 'custom_cv_pdf';

      const request = indexedDB.open(DB_NAME, 1);
      request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction(STORE_NAME, 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        store.delete(KEY_NAME);
        setHasFile(false);
        setFileName('');
        setFileSize('');
        triggerSuccessAlert();
      };
    } catch (err) {
      triggerErrorAlert('Deletion failed.');
    }
  };

  // Reset to static system original settings
  const handleSystemRestoreDefault = () => {
    if (window.confirm('Are you absolutely sure you want to revert all customized profile text, skills list, pricing, and social metrics back to system defaults?')) {
      resetPortfolioSettings();
      deleteCustomCVUrl();
      triggerSuccessAlert();
      loadAllSettings();
    }
  };

  const handleLockPortal = () => {
    localStorage.removeItem('cv_manager_unlocked');
    setIsAdminUnlocked(false);
    setIsOpen(false);
  };

  const isActiveMode = activeUrl ? 'link' : hasFile ? 'upload' : 'default';

  if (!isAdminUnlocked) {
    return null;
  }

  return (
    <>
      {/* Dynamic Settings Launcher Widget Button */}
      <div className="fixed bottom-6 left-6 z-40">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1, rotate: 60 }}
          whileTap={{ scale: 0.9 }}
          title="Portfolio Administration Console"
          className="p-3.5 bg-neutral-900 border border-emerald-500/30 text-white rounded-full shadow-[0_12px_40px_rgba(0,0,0,0.5)] cursor-pointer hover:bg-neutral-850 flex items-center justify-center relative group"
        >
          <Settings className="w-5.5 h-5.5 text-emerald-400" />
          
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-neutral-900 scale-90 bg-emerald-400 animate-pulse" />

          {/* Quick status display */}
          <span className="absolute left-16 bg-[#0E0E0E] border border-white/10 text-[10px] uppercase font-bold tracking-wider py-1.5 px-3.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl text-emerald-300">
            Open Control Center & Edit Content
          </span>
        </motion.button>
      </div>

      {/* Main Slide-up Configuration Panel Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 24, stiffness: 300 }}
              className="bg-[#0A0A0A] text-white border border-white/10 rounded-3xl w-full max-w-[850px] h-[90vh] md:h-[650px] flex flex-col shadow-[0_40px_90px_rgba(0,0,0,0.8)] relative overflow-hidden font-sans"
            >
              {/* Top Titlebar */}
              <div className="flex justify-between items-center px-6 py-4.5 border-b border-white/10 bg-neutral-950 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping shrink-0 absolute" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500 shrink-0" />
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-widest text-neutral-200">
                      Patil Core Portfolio Console
                    </h4>
                    <p className="text-[10px] text-neutral-400/90 font-mono">Dynamic Settings Injector Mode</p>
                  </div>
                </div>
                
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-neutral-400 hover:text-white rounded-full hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Main Content Area: Split layout (Navigation VS Inputs Grid) */}
              <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
                {/* Left Drawer Navigation Tabs */}
                <div className="w-full md:w-[220px] bg-[#0E0E0E] border-b md:border-b-0 md:border-r border-white/5 p-4 flex md:flex-col gap-1 overflow-x-auto md:overflow-x-visible shrink-0">
                  <span className="hidden md:block text-[9px] font-black tracking-widest text-[#555] uppercase mb-2 px-3">
                    Administrative Domains
                  </span>
                  
                  <button
                    onClick={() => setActiveTab('basics')}
                    className={`flex-1 md:flex-none text-left py-2.5 px-4.5 rounded-xl font-bold text-xs flex items-center gap-3 transition-all cursor-pointer ${
                      activeTab === 'basics' 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                        : 'text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <User className="w-4 h-4 shrink-0" />
                    Bio Basics
                  </button>

                  <button
                    onClick={() => setActiveTab('socials')}
                    className={`flex-1 md:flex-none text-left py-2.5 px-4.5 rounded-xl font-bold text-xs flex items-center gap-3 transition-all cursor-pointer ${
                      activeTab === 'socials' 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                        : 'text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <Share2 className="w-4 h-4 shrink-0" />
                    Social Indices
                  </button>

                  <button
                    onClick={() => setActiveTab('skills')}
                    className={`flex-1 md:flex-none text-left py-2.5 px-4.5 rounded-xl font-bold text-xs flex items-center gap-3 transition-all cursor-pointer ${
                      activeTab === 'skills' 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                        : 'text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <Code className="w-4 h-4 shrink-0" />
                    Skills Matrix
                  </button>

                  <button
                    onClick={() => setActiveTab('services')}
                    className={`flex-1 md:flex-none text-left py-2.5 px-4.5 rounded-xl font-bold text-xs flex items-center gap-3 transition-all cursor-pointer ${
                      activeTab === 'services' 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                        : 'text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <Briefcase className="w-4 h-4 shrink-0" />
                    Pricing & Services
                  </button>

                  <button
                    onClick={() => setActiveTab('cv')}
                    className={`flex-1 md:flex-none text-left py-2.5 px-4.5 rounded-xl font-bold text-xs flex items-center gap-3 transition-all cursor-pointer ${
                      activeTab === 'cv' 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                        : 'text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <FileText className="w-4 h-4 shrink-0" />
                    Resume/CV PDF
                  </button>

                  <button
                    onClick={() => setActiveTab('danger')}
                    className={`flex-1 md:flex-none text-left py-2.5 px-4.5 rounded-xl font-bold text-xs flex items-center gap-3 transition-all cursor-pointer ${
                      activeTab === 'danger' 
                        ? 'bg-red-500/10 text-red-400 border border-red-500/20' 
                        : 'text-neutral-500 hover:text-red-300 hover:bg-red-500/5 border border-transparent'
                    }`}
                  >
                    <RotateCcw className="w-4 h-4 shrink-0" />
                    System Recovery
                  </button>
                </div>

                {/* Right Container viewports */}
                <div className="flex-1 p-6 overflow-y-auto bg-neutral-950">
                  <AnimatePresence mode="wait">
                    
                    {/* BASICS PORTAL PANEL */}
                    {activeTab === 'basics' && (
                      <motion.div
                        key="basics-panel"
                        initial={{ opacity: 0, x: 5 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -5 }}
                        className="space-y-4"
                      >
                        <h5 className="text-sm font-bold text-neutral-300 uppercase tracking-widest border-b border-white/5 pb-2">
                          Identity Basics & Metadata
                        </h5>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">First / Display Name</label>
                            <input 
                              type="text" 
                              value={basics.name} 
                              onChange={(e) => setBasics({ ...basics, name: e.target.value })}
                              className="w-full bg-[#121212] border border-white/10 rounded-xl px-4.5 py-2.5 font-sans text-xs focus:outline-none focus:border-emerald-400/55 transition-colors text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Full Surname Name</label>
                            <input 
                              type="text" 
                              value={basics.fullName} 
                              onChange={(e) => setBasics({ ...basics, fullName: e.target.value })}
                              className="w-full bg-[#121212] border border-white/10 rounded-xl px-4.5 py-2.5 font-sans text-xs focus:outline-none focus:border-emerald-400/55 transition-colors text-white"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Professional Summary Role</label>
                          <input 
                            type="text" 
                            value={basics.role} 
                            onChange={(e) => setBasics({ ...basics, role: e.target.value })}
                            className="w-full bg-[#121212] border border-white/10 rounded-xl px-4.5 py-2.5 font-sans text-xs focus:outline-none focus:border-emerald-400/55 transition-colors text-white"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Email Address</label>
                            <input 
                              type="email" 
                              value={basics.email} 
                              onChange={(e) => setBasics({ ...basics, email: e.target.value })}
                              className="w-full bg-[#121212] border border-white/10 rounded-xl px-4.5 py-2.5 font-sans text-xs focus:outline-none focus:border-emerald-400/55 transition-colors text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Contact Number</label>
                            <input 
                              type="text" 
                              value={basics.phone} 
                              onChange={(e) => setBasics({ ...basics, phone: e.target.value })}
                              className="w-full bg-[#121212] border border-white/10 rounded-xl px-4.5 py-2.5 font-sans text-xs focus:outline-none focus:border-emerald-400/55 transition-colors text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Station/Location</label>
                            <input 
                              type="text" 
                              value={basics.location} 
                              onChange={(e) => setBasics({ ...basics, location: e.target.value })}
                              className="w-full bg-[#121212] border border-white/10 rounded-xl px-4.5 py-2.5 font-sans text-xs focus:outline-none focus:border-emerald-400/55 transition-colors text-white"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Catchy Tagline Description</label>
                          <textarea 
                            value={basics.tagline} 
                            rows={2}
                            onChange={(e) => setBasics({ ...basics, tagline: e.target.value })}
                            className="w-full bg-[#121212] border border-white/10 rounded-xl px-4.5 py-2.5 font-sans text-xs focus:outline-none focus:border-emerald-400/55 transition-colors text-white resize-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Biography Narrative Summary</label>
                          <textarea 
                            value={basics.bio} 
                            rows={4}
                            onChange={(e) => setBasics({ ...basics, bio: e.target.value })}
                            className="w-full bg-[#121212] border border-white/10 rounded-xl px-4.5 py-2.5 font-sans text-xs focus:outline-none focus:border-emerald-400/55 transition-colors text-white resize-y"
                          />
                        </div>

                        <div className="flex justify-end pt-2">
                          <button
                            onClick={handleSaveBasics}
                            className="bg-emerald-500 hover:bg-emerald-600 text-neutral-900 font-bold px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider cursor-pointer transition-colors flex items-center gap-2"
                          >
                            <Save className="w-4 h-4" />
                            Save Bio Changes
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* SOCIAL PANEL */}
                    {activeTab === 'socials' && (
                      <motion.div
                        key="socials-panel"
                        initial={{ opacity: 0, x: 5 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -5 }}
                        className="space-y-4"
                      >
                        <h5 className="text-sm font-bold text-neutral-300 uppercase tracking-widest border-b border-white/5 pb-2">
                          Social Media Integrations
                        </h5>
                        <p className="text-[11px] text-[#A5B5C1]/70 leading-relaxed">
                          Provide active absolute urls below to map dynamic pills and footer icons to redirect clients to your public profile indices.
                        </p>

                        <div className="space-y-4">
                          <div>
                            <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">GitHub Profile Link</label>
                            <div className="flex gap-2">
                              <input 
                                type="text" 
                                value={socials.github} 
                                placeholder="http://github.com/..."
                                onChange={(e) => setSocials({ ...socials, github: e.target.value })}
                                className="w-full bg-[#121212] border border-white/10 rounded-xl px-4.5 py-2.5 font-sans text-xs focus:outline-none focus:border-emerald-400/55 transition-colors text-white"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">LinkedIn Profile Link</label>
                            <div className="flex gap-2">
                              <input 
                                type="text" 
                                value={socials.linkedin} 
                                placeholder="http://linkedin.com/..."
                                onChange={(e) => setSocials({ ...socials, linkedin: e.target.value })}
                                className="w-full bg-[#121212] border border-white/10 rounded-xl px-4.5 py-2.5 font-sans text-xs focus:outline-none focus:border-emerald-400/55 transition-colors text-white"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Naukri (Job Portal) Link</label>
                            <div className="flex gap-2">
                              <input 
                                type="text" 
                                value={socials.naukri} 
                                placeholder="https://www.naukri.com/..."
                                onChange={(e) => setSocials({ ...socials, naukri: e.target.value })}
                                className="w-full bg-[#121212] border border-white/10 rounded-xl px-4.5 py-2.5 font-sans text-xs focus:outline-none focus:border-emerald-400/55 transition-colors text-white"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end pt-4 border-t border-white/5">
                          <button
                            onClick={handleSaveSocials}
                            className="bg-emerald-500 hover:bg-emerald-600 text-neutral-900 font-bold px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider cursor-pointer transition-colors flex items-center gap-2"
                          >
                            <Save className="w-4 h-4" />
                            Lock Social Links
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* SKILLS PANEL */}
                    {activeTab === 'skills' && (
                      <motion.div
                        key="skills-panel"
                        initial={{ opacity: 0, x: 5 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -5 }}
                        className="space-y-4 text-xs"
                      >
                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                          <h5 className="text-sm font-bold text-neutral-300 uppercase tracking-widest">
                            Skills & Domain Categories
                          </h5>
                          <button
                            onClick={handleSaveSkills}
                            className="bg-emerald-500 hover:bg-emerald-600 text-neutral-900 font-bold px-4 py-1.5 rounded-lg text-[10px] uppercase tracking-wider cursor-pointer transition-colors flex items-center gap-1.5"
                          >
                            <Save className="w-3.5 h-3.5" />
                            Save Skills State
                          </button>
                        </div>

                        {/* Fast Skill Category Creator */}
                        <div className="bg-[#121212] border border-white/5 rounded-2xl p-4 flex gap-3.5 items-end">
                          <div className="flex-1">
                            <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Create New Skill Domain Category</label>
                            <input 
                              type="text" 
                              value={newSkillCategoryName}
                              placeholder="e.g. Server-Side Architectures, Cloud Platforms"
                              onChange={(e) => setNewSkillCategoryName(e.target.value)}
                              className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/20 focus:outline-none focus:border-emerald-400/50"
                            />
                          </div>
                          <button
                            onClick={handleAddSkillCategory}
                            className="bg-white hover:bg-neutral-200 text-neutral-900 px-4 py-2.5 rounded-xl cursor-pointer font-bold flex items-center gap-1"
                          >
                            <Plus className="w-4 h-4" />
                            Create Category
                          </button>
                        </div>

                        {/* List of categories with editable tags */}
                        <div className="space-y-4 mt-4 h-[300px] overflow-y-auto pr-1">
                          {skillCategories.map((cat, catIdx) => (
                            <div key={cat.name} className="border border-white/5 bg-white/2 p-4.5 rounded-2xl space-y-3">
                              <div className="flex justify-between items-center">
                                <h6 className="font-extrabold uppercase text-xs tracking-wider text-neutral-200 flex items-center gap-2">
                                  <Code className="w-3.5 h-3.5 text-emerald-400" />
                                  {cat.name}
                                </h6>
                                <button
                                  onClick={() => handleRemoveSkillCategory(catIdx)}
                                  className="text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer scale-90"
                                >
                                  <Trash2 className="w-3 px-0.5" />
                                  Remove Section
                                </button>
                              </div>

                              {/* Skills Tags List */}
                              <div className="flex flex-wrap gap-2">
                                {cat.skills.map((skill: string) => (
                                  <span 
                                    key={skill}
                                    className="px-2.5 py-1 bg-[#121212] border border-emerald-500/10 rounded-lg text-[10px] text-neutral-300 font-medium flex items-center gap-1.5"
                                  >
                                    {skill}
                                    <button
                                      onClick={() => handleRemoveSkillFromCategory(catIdx, skill)}
                                      className="text-neutral-500 hover:text-red-400 hover:bg-white/5 rounded-full p-0.5"
                                    >
                                      <X className="w-2.5 h-2.5" />
                                    </button>
                                  </span>
                                ))}
                                {cat.skills.length === 0 && (
                                  <span className="text-[10px] text-neutral-500 italic">No skills registered yet.</span>
                                )}
                              </div>

                              {/* Append skill inside this category fields */}
                              <div className="flex gap-2 max-w-[320px]">
                                <input 
                                  type="text"
                                  placeholder="Add skill tag (e.g. Firebase)"
                                  value={newSkillsForCat[catIdx] || ''}
                                  onChange={(e) => setNewSkillsForCat({
                                    ...newSkillsForCat,
                                    [catIdx]: e.target.value
                                  })}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                      e.preventDefault();
                                      handleAddSkillToCategory(catIdx);
                                    }
                                  }}
                                  className="flex-1 bg-[#121212] border border-white/10 rounded-xl px-3 py-1.5 placeholder-white/20 text-[11px] focus:outline-none"
                                />
                                <button
                                  onClick={() => handleAddSkillToCategory(catIdx)}
                                  className="bg-neutral-800 hover:bg-neutral-700 text-white px-3.5 py-1.5 rounded-xl cursor-pointer font-bold"
                                >
                                  Add
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* SERVICES PANEL */}
                    {activeTab === 'services' && (
                      <motion.div
                        key="services-panel"
                        initial={{ opacity: 0, x: 5 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -5 }}
                        className="space-y-4 text-xs"
                      >
                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                          <h5 className="text-sm font-bold text-neutral-300 uppercase tracking-widest">
                            Freelance Services & Quotas
                          </h5>
                          <button
                            onClick={handleSaveServices}
                            className="bg-emerald-500 hover:bg-emerald-600 text-neutral-900 font-bold px-4 py-1.5 rounded-lg text-[10px] uppercase tracking-wider cursor-pointer transition-colors flex items-center gap-1.5"
                          >
                            <Save className="w-3.5 h-3.5" />
                            Save Services State
                          </button>
                        </div>

                        {/* Quick category select */}
                        <div className="flex gap-1 overflow-x-auto p-1 bg-[#121212] rounded-xl shrink-0">
                          {services.map((srv, idx) => (
                            <button
                              key={srv.id}
                              onClick={() => setSelectedServiceIndex(idx)}
                              className={`px-3 py-1.5 font-black uppercase text-[10px] tracking-wider rounded-lg shrink-0 cursor-pointer transition-colors ${
                                selectedServiceIndex === idx 
                                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-505/20' 
                                  : 'text-neutral-500 hover:text-white'
                              }`}
                            >
                              Service {srv.number}: {srv.name ? srv.name.slice(0, 15) : 'Unnamed'}...
                            </button>
                          ))}
                        </div>

                        {/* Active Service Card Configuration */}
                        {services[selectedServiceIndex] && (
                          <div className="border border-white/5 bg-white/2 p-5 rounded-2xl space-y-4 animate-fadeIn">
                            <div className="flex gap-4">
                              <div className="w-[80px]">
                                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Number</label>
                                <input 
                                  type="text" 
                                  value={services[selectedServiceIndex].number || ''}
                                  onChange={(e) => handleServiceFieldChange(selectedServiceIndex, 'number', e.target.value)}
                                  className="w-full bg-[#121212] border border-white/10 rounded-xl px-3 py-2 text-white font-mono"
                                />
                              </div>
                              <div className="flex-1">
                                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Service Title Heading</label>
                                <input 
                                  type="text" 
                                  value={services[selectedServiceIndex].name || ''}
                                  onChange={(e) => handleServiceFieldChange(selectedServiceIndex, 'name', e.target.value)}
                                  className="w-full bg-[#121212] border border-white/10 rounded-xl px-3.5 py-2 text-white"
                                />
                              </div>
                              <div className="w-[120px]">
                                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Custom Price</label>
                                <input 
                                  type="text" 
                                  value={services[selectedServiceIndex].price || ''}
                                  onChange={(e) => handleServiceFieldChange(selectedServiceIndex, 'price', e.target.value)}
                                  className="w-full bg-[#121212] border border-white/10 rounded-xl px-3.5 py-2 text-white text-emerald-400 font-bold"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Detailed Offer Description</label>
                              <textarea 
                                value={services[selectedServiceIndex].description || ''}
                                rows={4}
                                onChange={(e) => handleServiceFieldChange(selectedServiceIndex, 'description', e.target.value)}
                                className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-2.5 text-white resize-none"
                              />
                            </div>

                            <p className="text-[10px] text-neutral-500 italic">
                              * All image arrays for individual service visual templates can be managed directly in the code definitions if absolute links change.
                            </p>
                          </div>
                        )}
                      </motion.div>
                    )}

                    {/* CV TAB */}
                    {activeTab === 'cv' && (
                      <motion.div
                        key="cv-panel"
                        initial={{ opacity: 0, x: 5 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -5 }}
                        className="space-y-4 text-xs"
                      >
                        <h5 className="text-sm font-bold text-neutral-300 uppercase tracking-widest border-b border-white/5 pb-2">
                          Resume & Curriculum Vitae Config
                        </h5>
                        <p className="text-[11px] text-[#A5B5C1]/70 leading-relaxed">
                          Define how recruiter download demands are handled. Set a dynamic Drive redirect link, or upload an offline binary PDF file which is stored in IndexedDB browser memory.
                        </p>

                        <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl">
                          <span>Currently Active Retrieval Mode:</span>
                          <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                            isActiveMode === 'link' 
                              ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/20' 
                              : isActiveMode === 'upload' 
                                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20' 
                                : 'bg-amber-500/15 text-amber-400 border border-amber-500/20'
                          }`}>
                            {isActiveMode === 'link' && 'Active Custom Drive URL'}
                            {isActiveMode === 'upload' && 'Active Local PDF Upload'}
                            {isActiveMode === 'default' && 'Active Default System PDF'}
                          </span>
                        </div>

                        {/* CV URL Setup Form */}
                        <div className="bg-[#121212] border border-white/5 p-4.5 rounded-2xl relative space-y-3.5">
                          <h6 className="font-bold text-xs uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                            <Link2 className="w-4 h-4 text-cyan-400" />
                            Google Drive / Personal Custom URL
                          </h6>
                          <form onSubmit={handleSaveCVUrl} className="flex flex-col gap-3">
                            <input
                              type="text"
                              value={cvUrl}
                              onChange={(e) => setCvUrl(e.target.value)}
                              placeholder="Paste shareable link (e.g. https://drive.google.com/...)"
                              className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-2.5 placeholder-white/25 text-xs text-white focus:outline-none focus:border-cyan-400/50"
                            />
                            <div className="flex justify-between items-center mt-1">
                              {activeUrl ? (
                                <button
                                  type="button"
                                  onClick={handleResetCVUrl}
                                  className="text-red-400 hover:text-red-300 uppercase tracking-widest font-black text-[9px] cursor-pointer"
                                  title="Unlink url"
                                >
                                  Unlink URL
                                </button>
                              ) : <span className="text-[10px] text-neutral-500 italic">No link locked in.</span>}
                              <button
                                type="submit"
                                className="bg-cyan-400 hover:bg-cyan-500 text-neutral-950 font-bold px-4.5 py-2 rounded-xl text-[11px] cursor-pointer"
                              >
                                Lock System URL Redirect
                              </button>
                            </div>
                          </form>
                        </div>

                        {/* PDF Drag & Drop Box */}
                        <div className="bg-[#121212] border border-white/5 p-4.5 rounded-2xl space-y-3">
                          <h6 className="font-bold text-xs uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                            <UploadCloud className="w-4 h-4 text-emerald-400" />
                            Private Browser Memory Upload (Offline DB File)
                          </h6>
                          
                          <div 
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                            className={`border border-dashed rounded-2xl p-4.5 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center min-h-[110px] ${
                              isDragging 
                                ? 'border-emerald-400 bg-emerald-500/10' 
                                : hasFile 
                                  ? 'border-emerald-505/30 bg-emerald-500/5 hover:bg-emerald-500/10' 
                                  : 'border-white/10 bg-neutral-900 hover:border-white/20'
                            }`}
                          >
                            <input 
                              type="file" 
                              ref={fileInputRef}
                              onChange={handleFileSelect}
                              accept=".pdf" 
                              className="hidden" 
                            />

                            {hasFile ? (
                              <div className="flex flex-col items-center">
                                <FileText className="w-7 h-7 text-emerald-400 mb-1.5" />
                                <p className="font-bold text-white max-w-[280px] truncate">{fileName}</p>
                                <p className="text-[9px] text-emerald-400 font-mono mt-0.5">{fileSize}</p>
                                <span className="text-[9px] text-neutral-400 bg-white/5 px-2 py-0.5 mt-2 rounded">Replace PDF</span>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center">
                                <UploadCloud className="w-6 h-6 text-emerald-400 mb-1.5" />
                                <p className="font-semibold text-neutral-300">Drag & drop or Click to choose PDF CV file</p>
                                <p className="text-[9px] text-neutral-500">Limits: PDF extensions up to 5MB</p>
                              </div>
                            )}
                          </div>

                          {hasFile && (
                            <div className="flex justify-end">
                              <button
                                onClick={handleResetFile}
                                className="text-[9px] uppercase tracking-wider font-extrabold text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer"
                              >
                                Delete Offline Registry PDF
                              </button>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}

                    {/* DANGER ZONE PANEL */}
                    {activeTab === 'danger' && (
                      <motion.div
                        key="danger-panel"
                        initial={{ opacity: 0, x: 5 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -5 }}
                        className="space-y-4 text-xs"
                      >
                        <h5 className="text-sm font-bold text-red-400 uppercase tracking-widest border-b border-red-500/10 pb-2">
                          System Recovery & Risk Center
                        </h5>
                        
                        <div className="bg-red-500/5 border border-red-500/10 rounded-2xl p-5 space-y-4">
                          <div className="flex gap-3">
                            <Info className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                            <div>
                              <strong className="text-white block text-sm mb-1">Destroy Custom Parameters</strong>
                              Reverting your portfolio database will delete all local configuration profiles (Custom Biographies, Custom Bio Basics, Skills tag list, Services details and prices). This restores your entire page to the default system parameters instantly.
                            </div>
                          </div>

                          <div className="p-3.5 bg-[#000]/40 border border-white/5 rounded-xl text-[11px] text-neutral-400 leading-relaxed">
                            <strong>Note:</strong> Custom PDF files cached in IndexedDB Storage are kept, but if you have a locked Google Drive redirect URL, it is removed. Customizations can be re-locked at any time by accessing this Administrator Control suite.
                          </div>

                          <div className="pt-2 flex justify-start">
                            <button
                              onClick={handleSystemRestoreDefault}
                              className="bg-red-500 hover:bg-red-650 hover:bg-red-650 text-white font-black px-6 py-3 rounded-xl text-xs uppercase tracking-widest transition-colors cursor-pointer"
                            >
                              Destroy Customizations & Reset
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}

                  </AnimatePresence>
                </div>
              </div>

              {/* Status and Action Alert Center (Kept small and clean) */}
              <div className="bg-neutral-950 px-6 py-3 border-t border-white/5 flex justify-between items-center shrink-0">
                <div className="h-4">
                  <AnimatePresence>
                    {status === 'success' && (
                      <motion.div 
                        initial={{ opacity: 0, y: 3 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-bold uppercase tracking-wider"
                      >
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                        Section Parameters compiled and saved successfully!
                      </motion.div>
                    )}

                    {status === 'error' && (
                      <motion.div 
                        initial={{ opacity: 0, y: 3 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-1.5 text-red-400 text-[10px] font-bold uppercase tracking-wider"
                      >
                        <X className="w-3.5 h-3.5 shrink-0" />
                        {errorMessage}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleLockPortal}
                    className="text-red-400 hover:text-red-300 text-[10px] uppercase tracking-widest font-extrabold px-3 py-1.5 hover:bg-red-500/5 rounded-lg transition-colors cursor-pointer"
                    title="Logs administrator out of browser context, hiding floating configuration icon completely."
                  >
                    Lock Portal & Hide Control Icon
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="bg-white hover:bg-neutral-100 text-neutral-950 px-5.5 py-2 text-xs font-bold rounded-xl tracking-wider uppercase transition-colors cursor-pointer"
                  >
                    Dismiss Console
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
