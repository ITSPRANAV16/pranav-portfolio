import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Terminal, 
  Cpu, 
  Database, 
  Code2, 
  Layers, 
  CheckCircle2, 
  RefreshCw, 
  GitBranch, 
  Sparkles, 
  Globe 
} from 'lucide-react';

export default function InteractiveDeveloperConsole() {
  const [activeTab, setActiveTab] = useState<'editor' | 'terminal' | 'architecture' | 'google'>('editor');
  const [isCompiling, setIsCompiling] = useState(false);
  const [compileProgress, setCompileProgress] = useState(0);
  const [compileSuccess, setCompileSuccess] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [gscToken, setGscToken] = useState(() => localStorage.getItem('google_site_verification') || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Handle saving verification details
  const handleSaveToken = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('google_site_verification', gscToken.trim());
    window.dispatchEvent(new Event('portfolio_settings_changed')); // Refresh SEO tags
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  // Simulation of compilation script logs
  const rawLogs = [
    'Initializing Android Gradle Daemon...',
    'Loading Room Database models (SQLite)...',
    'Binding network protocols with Retrofit client...',
    'Establishing JSON Web Token (JWT) auth interceptor...',
    'Inflating ViewBinding and Material 3 layouts...',
    'Validating OSMDroid Map GPS coordinate layers...',
    'Compiling StreetVendorConnector.java ...',
    'Optimization pass completed. APK weight: 14.2 MB.',
    'STREET VENDOR CONNECTOR INSTALLED SUCCESSFULLY ON PORT: 3000'
  ];

  // Compile Trigger Simulation
  const handleCompile = () => {
    if (isCompiling) return;
    setIsCompiling(true);
    setCompileProgress(0);
    setCompileSuccess(false);
    setTerminalLogs([]);
    setActiveTab('terminal');

    // Interval to populate logs line-by-line
    let currentLogIndex = 0;
    const logInterval = setInterval(() => {
      if (currentLogIndex < rawLogs.length) {
        setTerminalLogs(prev => [...prev, `[INIT] ${rawLogs[currentLogIndex]}`]);
        currentLogIndex++;
      }
    }, 380);

    // Interval for progress bar
    const progressInterval = setInterval(() => {
      setCompileProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(logInterval);
          setIsCompiling(false);
          setCompileSuccess(true);
          setTerminalLogs(prevLogs => [
            ...prevLogs,
            `[SUCCESS] ---------------------------------------------`,
            `[SUCCESS] BUILD COMPLETED IN 3840ms!`,
            `[SUCCESS] WELCOME PRANAV SHAHJI PATIL'S ENVIRONMENT`,
            `[SUCCESS] STATUS: ACTIVE | LOCATION: PUNE, INDIA`
          ]);
          return 100;
        }
        return prev + 10;
      });
    }, 350);
  };

  // Auto-run trigger once on load to greet the user
  useEffect(() => {
    const timer = setTimeout(() => {
      handleCompile();
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full max-w-[600px] h-[340px] sm:h-[400px] lg:h-[440px] flex flex-col relative z-20 font-mono text-left group px-2 sm:px-0">
      
      {/* 3D Outer Glowing Aura */}
      <div className="absolute inset-0 bg-[#0EA5E9]/10 rounded-[30px] filter blur-2xl group-hover:bg-[#0EA5E9]/15 transition-all duration-700 pointer-events-none" />

      {/* Floating Background Satellites - Custom Interactive Decor representing tech stack (Hidden on mobile to prevent horizontal viewport overflow) */}
      <div className="absolute -top-12 -left-8 w-12 h-12 bg-[#0C0C0C]/80 border border-[#0EA5E9]/30 rounded-xl hidden sm:flex items-center justify-center shadow-lg pointer-events-none animate-bounce" style={{ animationDuration: '6s' }}>
        <Cpu className="w-6 h-6 text-[#0EA5E9]/80 animate-pulse" />
        <span className="absolute -bottom-2 -right-1 text-[8px] uppercase tracking-tighter bg-[#0EA5E9] text-white px-1 py-0.5 rounded scale-75 font-semibold">SDK</span>
      </div>

      <div className="absolute top-20 -right-8 w-12 h-12 bg-[#0C0C0C]/80 border border-[#0EA5E9]/30 rounded-xl hidden sm:flex items-center justify-center shadow-lg pointer-events-none animate-bounce" style={{ animationDuration: '8s', animationDelay: '1s' }}>
        <Database className="w-6 h-6 text-[#0EA5E9]/80 animate-pulse" />
        <span className="absolute -bottom-2 -right-1 text-[8px] uppercase tracking-tighter bg-emerald-600 text-white px-1 py-0.5 rounded scale-75 font-semibold">Room</span>
      </div>

      <div className="absolute -bottom-6 -left-4 w-12 h-12 bg-[#0C0C0C]/80 border border-white/10 rounded-xl hidden sm:flex items-center justify-center shadow-lg pointer-events-none animate-bounce" style={{ animationDuration: '7s', animationDelay: '2s' }}>
        <Globe className="w-5 h-5 text-indigo-400" />
      </div>

      <div className="absolute -bottom-8 -right-4 w-14 h-14 bg-[#0C0C0C]/80 border border-[#0EA5E9]/30 rounded-xl hidden sm:flex flex-col items-center justify-center shadow-lg pointer-events-none">
        <GitBranch className="w-5 h-5 text-[#0EA5E9]" />
        <span className="text-[7px] uppercase tracking-widest text-[#D7E2EA]/50 font-bold scale-90">Git</span>
      </div>

      {/* Primary OS Glass Window */}
      <div className="w-full h-full bg-[#0C0C0C]/90 border-2 border-white/10 group-hover:border-[#0EA5E9]/45 rounded-[28px] overflow-hidden flex flex-col shadow-[0_30px_70px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-all duration-500">
        
        {/* Terminal Header Bar */}
        <div className="flex justify-between items-center bg-[#121212]/90 border-b border-white/5 py-3.5 px-5 select-none shrink-0">
          <div className="flex gap-2 items-center">
            <span className="w-3.5 h-3.5 rounded-full bg-red-500/80 inline-block border border-red-600/50" />
            <span className="w-3.5 h-3.5 rounded-full bg-yellow-500/80 inline-block border border-yellow-600/50" />
            <span className="w-3.5 h-3.5 rounded-full bg-green-500/80 inline-block border border-green-600/50" />
            <span className="text-[10px] md:text-xs uppercase tracking-widest font-semibold text-[#D7E2EA]/40 ml-2.5 flex items-center gap-1.5 font-sans">
              <span className="w-1.5 h-1.5 bg-[#0EA5E9] rounded-full animate-ping inline-block" />
              patil_compiler_v1.2.0
            </span>
          </div>
          <div>
            {/* Run button */}
            <button
              onClick={handleCompile}
              disabled={isCompiling}
              className={`flex items-center gap-1 px-3.5 py-1.5 text-[10px] font-sans font-bold uppercase tracking-wider rounded-lg border cursor-pointer hover:scale-103 transition-transform ${
                isCompiling
                  ? 'bg-[#0EA5E9]/20 border-[#0EA5E9]/30 text-[#0EA5E9] cursor-not-allowed'
                  : 'bg-[#0EA5E9] border-[#0EA5E9] text-white hover:bg-[#0EA5E9]/90'
              }`}
            >
              {isCompiling ? (
                <>
                  <RefreshCw className="w-3 h-3 animate-spin" />
                  Building
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 fill-white" />
                  Run Compiler
                </>
              )}
            </button>
          </div>
        </div>

        {/* IDE Layout Tab Switches */}
        <div className="flex bg-[#121212]/50 border-b border-white/5 text-[11px] uppercase font-semibold tracking-wider text-left shrink-0">
          <button
            onClick={() => setActiveTab('editor')}
            className={`px-4.5 py-2.5 flex items-center gap-2 border-r border-white/5 cursor-pointer transition-all ${
              activeTab === 'editor'
                ? 'bg-[#0C0C0C] text-white border-b-2 border-b-[#0EA5E9]'
                : 'text-[#D7E2EA]/40 hover:text-[#D7E2EA]/75'
            }`}
          >
            <Code2 className="w-3.5 h-3.5 text-[#0EA5E9]" />
            Connector.java
          </button>
          <button
            onClick={() => setActiveTab('terminal')}
            className={`px-4.5 py-2.5 flex items-center gap-2 border-r border-white/5 cursor-pointer transition-all ${
              activeTab === 'terminal'
                ? 'bg-[#0C0C0C] text-white border-b-2 border-b-[#0EA5E9]'
                : 'text-[#D7E2EA]/40 hover:text-[#D7E2EA]/75'
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-[#0EA5E9]" />
            Build Terminal
          </button>
          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-4.5 py-2.5 flex items-center gap-2 border-r border-white/5 cursor-pointer transition-all ${
              activeTab === 'architecture'
                ? 'bg-[#0C0C0C] text-white border-b-2 border-b-[#0EA5E9]'
                : 'text-[#D7E2EA]/40 hover:text-[#D7E2EA]/75'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-[#0EA5E9]" />
            Arch.sys
          </button>
          <button
            onClick={() => setActiveTab('google')}
            className={`px-4.5 py-2.5 flex items-center gap-2 cursor-pointer transition-all ${
              activeTab === 'google'
                ? 'bg-[#0C0C0C] text-[#38BDF8] border-b-2 border-b-[#0EA5E9]'
                : 'text-[#D7E2EA]/40 hover:text-[#D7E2EA]/75'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-[#38BDF8] animate-pulse" />
            GSC Verify
          </button>
        </div>

        {/* Console Workspace Screens with transitions */}
        <div className="flex-1 p-4 overflow-y-auto bg-[#0C0C0C] text-xs leading-relaxed text-[#D7E2EA]/90 h-full relative" style={{ scrollbarWidth: 'thin' }}>
          
          <AnimatePresence mode="wait">
            
            {/* Editor Screen View */}
            {activeTab === 'editor' && (
              <motion.div
                key="editor-screen"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
                className="font-mono text-[10px] sm:text-xs text-left"
              >
                <div className="text-gray-600 block mb-1">// Built with Android SDK & SQLite database integration</div>
                <div><span className="text-pink-400">package</span> com.pranav.portfolio;</div>
                <div className="text-gray-500 mb-1">import android.database.sqlite.Room;</div>
                
                <div className="mt-2 text-violet-400">public class <span className="text-blue-300">StreetVendorConnector</span> extends AndroidApp &#123;</div>
                <div className="pl-4 text-emerald-400">private <span className="text-teal-300">RoomDatabase</span> sqliteDb;</div>
                <div className="pl-4 text-emerald-400">private <span className="text-teal-300">JWTAuth</span> interceptor;</div>

                <div className="pl-4 mt-2 text-yellow-400">@Override</div>
                <div className="pl-4"><span className="text-pink-400">public void</span> <span className="text-blue-300">onCreate</span>() &#125;</div>
                <div className="pl-8 text-gray-500">// Run dynamic core setup</div>
                <div className="pl-8 text-indigo-300">sqliteDb = Room.databaseBuilder(<span className="text-pink-400">this</span>).build();</div>
                <div className="pl-8 text-indigo-300">interceptor = <span className="text-pink-400">new</span> JWTAuth(<span className="text-amber-300">&quot;jwt_prod_key&quot;</span>);</div>
                <div className="pl-8 text-indigo-300">Retrofit.syncChannels();</div>
                <div className="pl-4">&#125;</div>
                <div className="">&#125;</div>
              </motion.div>
            )}

            {/* Live Terminal screen logs view */}
            {activeTab === 'terminal' && (
              <motion.div
                key="terminal-screen"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
                className="w-full text-left"
              >
                {terminalLogs.length === 0 ? (
                  <div className="text-slate-500 text-center py-10">
                    <Terminal className="w-8 h-8 mx-auto text-[#0EA5E9]/20 animate-pulse mb-2" />
                    Click &apos;Run Compiler&apos; at the top to compile development log.
                  </div>
                ) : (
                  <div className="flex flex-col gap-1.5 font-mono text-[9px] sm:text-xs">
                    {terminalLogs.map((log, index) => {
                      let color = 'text-[#D7E2EA]/70';
                      if (log.startsWith('[SUCCESS]')) color = 'text-green-400 font-bold';
                      else if (log.includes('Compiling') || log.includes('Optimization')) color = 'text-[#0EA5E9] font-semibold';
                      else if (log.includes('APK weight')) color = 'text-cyan-400';
                      return (
                        <div key={index} className={color}>
                          {log}
                        </div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            )}

            {/* Architecture View Tab */}
            {activeTab === 'architecture' && (
              <motion.div
                key="architecture-screen"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
                className="flex flex-col gap-3 font-mono text-[10px] text-left pt-2"
              >
                <div className="border border-[#0EA5E9]/20 rounded-lg p-2.5 bg-[#121212]/50 flex justify-between items-center">
                  <div>
                    <h5 className="font-bold text-[#D7E2EA] text-[11px] uppercase tracking-wide">Client Presentation Tier</h5>
                    <p className="text-[10px] text-[#D7E2EA]/50 font-light mt-0.5">Android UI / Material Design 3 / ViewBinding</p>
                  </div>
                  <span className="text-[9px] uppercase font-bold tracking-widest text-[#0EA5E9] bg-[#0EA5E9]/10 px-2 py-0.5 rounded">Native</span>
                </div>

                <div className="border border-[#0EA5E9]/25 rounded-lg p-2.5 bg-[#121212]/50 flex justify-between items-center">
                  <div>
                    <h5 className="font-bold text-[#D7E2EA] text-[11px] uppercase tracking-wide">Secure Authorization Router</h5>
                    <p className="text-[10px] text-[#D7E2EA]/50 font-light mt-0.5">Retrofit Client REST Sync / JWT Bearer Tokens</p>
                  </div>
                  <span className="text-[9px] uppercase font-bold tracking-widest text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">Security</span>
                </div>

                <div className="border border-white/5 rounded-lg p-2.5 bg-[#121212]/30 flex justify-between items-center">
                  <div>
                    <h5 className="font-bold text-[#D7E2EA]/70 text-[11px] uppercase tracking-wide">Database Persistence Engine</h5>
                    <p className="text-[10px] text-[#D7E2EA]/40 font-light mt-0.5">Room database framework / Persistent SQLite relational queries</p>
                  </div>
                  <span className="text-[9px] uppercase font-bold tracking-widest text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">Durable</span>
                </div>
              </motion.div>
            )}

            {/* Google Search Console Verification Panel */}
            {activeTab === 'google' && (
              <motion.div
                key="google-screen"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
                className="flex flex-col gap-4 text-left"
              >
                <div className="border border-indigo-500/20 bg-indigo-550/5 bg-indigo-500/5 rounded-xl p-3.5 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
                    <Globe className="w-4 h-4 shrink-0 animate-spin" style={{ animationDuration: '4s' }} />
                    Google Search Console Verify
                  </div>
                  <p className="text-[11px] text-[#D7E2EA]/70 leading-normal">
                    तुमची वेबसाईट गुगलच्या प्रसिद्ध <strong className="text-white">Search Index</strong> आणि <strong className="text-white">Google Search Result</strong> मध्ये आणण्यासाठी खालचे पर्याय वापरा:
                  </p>
                </div>

                <form onSubmit={handleSaveToken} className="flex flex-col gap-3.5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 font-sans">
                      HTML Tag Method (गुगल व्हेरिफिकेशन कोड):
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="उदा. google8f395781a7b18cb4 वा meta profile code"
                        value={gscToken}
                        onChange={(e) => {
                          setGscToken(e.target.value);
                          setSavedSuccess(false);
                        }}
                        className="flex-1 bg-[#161616] border border-white/10 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#0EA5E9] transition-colors"
                      />
                      <button
                        type="submit"
                        className="bg-[#0EA5E9] text-white font-sans text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-lg cursor-pointer hover:bg-[#0EA5E9]/90 active:scale-98 transition-all shrink-0"
                      >
                        Apply
                      </button>
                    </div>
                  </div>

                  {savedSuccess && (
                    <div className="text-green-400 text-[10px] font-bold flex items-center gap-1.5 font-sans animate-bounce">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Yuvraaj applied! HTML Meta index tag updated in build configuration dynamically.
                    </div>
                  )}
                </form>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1 text-[10px]">
                  <div className="border border-white/5 bg-[#121212]/30 p-2.5 rounded-lg flex flex-col gap-1">
                    <span className="font-bold text-[#D7E2EA] text-[11px] uppercase tracking-wide">पर्याय १ (HTML Tag):</span>
                    <p className="text-[#D7E2EA]/50 leading-relaxed">
                      तुमचा गुगलचा <code className="text-[#0EA5E9]">google-site-verification</code> कोड वरील इनपुट मध्ये टाकून `Apply` दाबा. यामुळे आपोआप वेबसाईटच्या हेड (<code className="text-pink-400">&lt;head&gt;</code>) मध्ये मेटा टॅग समाविष्ट होईल.
                    </p>
                  </div>

                  <div className="border border-white/5 bg-[#121212]/30 p-2.5 rounded-lg flex flex-col gap-1">
                    <span className="font-bold text-[#D7E2EA] text-[11px] uppercase tracking-wide">पर्याय २ (HTML File Upload):</span>
                    <p className="text-[#D7E2EA]/50 leading-relaxed">
                      गुगलकडून मिळालेली फाईल (उदा. <code className="text-[#0EA5E9]">googlef1a2b3.html</code>) आपल्याला आपल्या <code className="text-teal-400">public/</code> फोल्डर मध्ये ठेवायची आहे. तुम्ही मला फक्त चॅटमध्ये त्या फाईलचे नाव सांगा, मी ती लगेच बनवून देईल!
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>

        </div>

        {/* Footer Build Status with animated progress scale */}
        <div className="bg-[#121212]/90 border-t border-white/5 py-3 px-5 sm:px-6 flex justify-between items-center text-[10px] text-[#D7E2EA]/50 shrink-0 select-none">
          {isCompiling ? (
            <div className="flex items-center gap-3 w-full">
              <span className="animate-pulse font-bold text-[#0EA5E9]">BUILDING: {compileProgress}%</span>
              <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-[#0EA5E9] to-cyan-500" 
                  initial={{ width: '0%' }}
                  animate={{ width: `${compileProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          ) : (
            <>
              {compileSuccess ? (
                <span className="text-green-400 flex items-center gap-1.5 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  STATUS: COMPILED SUCCESSFULLY
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#0EA5E9]" />
                  READY TO COMPILE PROTOCOL
                </span>
              )}
              <span className="font-bold">JVM: SE 21</span>
            </>
          )}
        </div>

      </div>
    </div>
  );
}
