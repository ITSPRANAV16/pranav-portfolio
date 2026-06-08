import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, CheckCircle2, Mail, MessageSquare, User, Briefcase } from 'lucide-react';
import ContactButton from './ContactButton';
import { OWNER_CONFIG } from '../config/owner';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [form, setForm] = useState({ name: '', email: '', project: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setForm({ name: '', email: '', project: '', message: '' });
        setTimeout(() => {
          setIsSubmitted(false);
          onClose();
        }, 2500);
      } else {
        alert(data.error || 'Failed to send message.');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert('Network error. Failed to send message.');
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
          />

          {/* Form Modal Body */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="relative w-full max-w-lg rounded-3xl border-2 border-[#D7E2EA]/30 bg-[#0C0C0C] p-6 sm:p-8 md:p-10 text-[#D7E2EA] shadow-2xl z-10 select-none overflow-y-auto max-h-[92vh] sm:max-h-[90vh] scrollbar-thin scrollbar-thumb-white/10"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-[#D7E2EA]/60 hover:text-white transition-colors duration-200 cursor-pointer p-1 rounded-full hover:bg-white/10"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Success state */}
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center gap-4"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/30 text-emerald-400 mb-2">
                  <CheckCircle2 className="w-10 h-10 animate-bounce" />
                </div>
                <h3 className="text-2xl font-bold uppercase tracking-wide">Inquiry Sent!</h3>
                <p className="text-sm text-[#D7E2EA]/60 max-w-xs leading-relaxed">
                  Thanks for reaching out! {OWNER_CONFIG.name} will review your project details and respond within 24 hours.
                </p>
              </motion.div>
            ) : (
              /* Input Form state */
              <div className="flex flex-col w-full text-left">
                <div className="mb-6">
                  <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight hero-heading">
                    Let&apos;s Craft
                  </h3>
                  <p className="text-xs sm:text-sm text-[#D7E2EA]/60 mt-1 uppercase tracking-widest font-light">
                    Initiate your 3D collaboration
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {/* Name field */}
                  <div className="flex flex-col gap-1">
                    <label className="text-xs uppercase tracking-widest text-[#D7E2EA]/60 font-medium flex items-center gap-1.5">
                      <User className="w-3 h-3" /> Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Aditya Patil"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0EA5E9]/60 transition-colors"
                    />
                  </div>

                  {/* Email field */}
                  <div className="flex flex-col gap-1">
                    <label className="text-xs uppercase tracking-widest text-[#D7E2EA]/60 font-medium flex items-center gap-1.5">
                      <Mail className="w-3 h-3" /> Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="aditya@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0EA5E9]/60 transition-colors"
                    />
                  </div>

                  {/* Project type field */}
                  <div className="flex flex-col gap-1">
                    <label className="text-xs uppercase tracking-widest text-[#D7E2EA]/60 font-medium flex items-center gap-1.5">
                      <Briefcase className="w-3 h-3" /> Project Type (Optional)
                    </label>
                    <select
                      value={form.project}
                      onChange={(e) => setForm({ ...form, project: e.target.value })}
                      className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0EA5E9]/60 transition-colors cursor-pointer text-[#D7E2EA]/85"
                    >
                      <option value="">Select services needed...</option>
                      <option value="android_app">Android Mobile App Development</option>
                      <option value="ui_ux">UI/UX Design & Prototyping</option>
                      <option value="full_stack">Full-Stack Web Architectures</option>
                      <option value="sqlite">SQLite & DBMS Architecture</option>
                      <option value="api_jwt">REST API & JWT Security Sync</option>
                    </select>
                  </div>

                  {/* Message field */}
                  <div className="flex flex-col gap-1">
                    <label className="text-xs uppercase tracking-widest text-[#D7E2EA]/60 font-medium flex items-center gap-1.5">
                      <MessageSquare className="w-3 h-3" /> Tell me about your project
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Briefly describe what you'd like to build together..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0EA5E9]/60 transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="mt-4 flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="relative rounded-full font-medium uppercase tracking-widest text-[#121212] transition-transform duration-200 hover:scale-102 active:scale-98 disabled:opacity-50 cursor-pointer select-none focus:outline-none flex items-center justify-center gap-2 px-8 py-3.5 text-xs sm:text-sm w-full"
                      style={{
                        background: 'linear-gradient(123deg, #18011F 7%, #0EA5E9 37%, #7621B0 72%, #BE4C00 100%)',
                        boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
                        outline: '2px solid white',
                        outlineOffset: '-3px',
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          Submit Inquiry <Send className="w-4 h-4 ml-1" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
