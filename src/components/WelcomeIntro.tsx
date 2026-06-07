import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Volume2, ArrowRight, Sparkles, VolumeX, Cpu, Code, Database, Terminal, RefreshCw, Layers, HardDrive, Smartphone, Wifi, RotateCcw, AlertCircle, Trash2, Plus, Search, ChevronRight, Activity, Check } from 'lucide-react';
import { OWNER_CONFIG } from '../config/owner';

interface WelcomeIntroProps {
  onComplete: () => void;
}

export default function WelcomeIntro({ onComplete }: WelcomeIntroProps) {
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [isDoneSpeaking, setIsDoneSpeaking] = useState(false);
  const [speechMode, setSpeechMode] = useState<'text-to-speech' | 'synth-telemetry'>('text-to-speech');
  const [audioWaves, setAudioWaves] = useState<number[]>(Array.from({ length: 24 }, () => 6));
  const [activeVoiceName, setActiveVoiceName] = useState('Default TTS Vocal Engine');
  
  // Interactive Android Emulator Power & Audio physical states
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
  const [phonePowerOn, setPhonePowerOn] = useState(true);
  const [phoneVolume, setPhoneVolume] = useState(80);
  const [activeWallpaper, setActiveWallpaper] = useState<'cyber-magenta' | 'cyberpunk-emerald' | 'digital-blue' | 'amoled-carbon'>('cyber-magenta');
  const [currentCaption, setCurrentCaption] = useState('Awaiting activation...');
  
  // Interactive Android JVM Emulator states
  const [activeCompilingState, setActiveCompilingState] = useState<'idle' | 'compiling' | 'success'>('idle');
  const [loadedApp, setLoadedApp] = useState<'launcher' | 'feedback' | 'sqlite' | 'monitor' | 'wallpapers'>('launcher');
  const [emulatorLogs, setEmulatorLogs] = useState<string[]>([
    'System: PRANAV_OS booted.',
    'JVM compiler ready.',
    'Status: Standby.',
  ]);

  // Realtime System Telemetry for high fidelity feel
  const [cpuUtilization, setCpuUtilization] = useState(42);
  const [ramUtilization, setRamUtilization] = useState(256);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  // Custom interactive DB schema & inputs
  const [sqliteRows, setSqliteRows] = useState([
    { id: 101, name: 'Pranav Patil', role: 'Android Specialist', rating: 5, remark: 'Kotlin build compiled with 0 warnings.' },
    { id: 102, name: 'Google Evaluator', role: 'Technical Lead', rating: 5, remark: 'Excellent dynamic layout animation structure.' },
    { id: 103, name: 'NMPI Admin', role: 'Staff Registrar', rating: 4, remark: 'Local database saves feedback files instantly.' },
    { id: 104, name: 'Prof. J. Deshmukh', role: 'Project Head', rating: 5, remark: 'Exceptional visual polish, highly recommended.' },
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Real Form input variables inside the phone mock UI!
  const [formName, setFormName] = useState('');
  const [formRole, setFormRole] = useState('Student');
  const [formRating, setFormRating] = useState(5);
  const [formRemark, setFormRemark] = useState('');
  
  // Custom Boot Loading States
  const [isBooting, setIsBooting] = useState(true);
  const [bootText, setBootText] = useState('SYS INIT: LOADERS STARTING...');
  const [bootProgress, setBootProgress] = useState(0);

  const waveIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const forwardTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Real-time Web Audio API variables
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const synthIntervalsRef = useRef<NodeJS.Timeout[]>([]);

  // Floating matrix of code snippets in background for premium cyber feel
  const [particles] = useState(() => 
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      text: ['01', 'JVM', 'SQLite', 'Kotlin', 'android', 'compile()', 'struct', 'Thread', 'null', 'MainActivity', 'Gradle'][i % 11],
      x: Math.random() * 90 + 5, // percentage
      y: Math.random() * 80 + 10, // percentage
      duration: Math.random() * 15 + 10,
      delay: Math.random() * -10,
      scale: Math.random() * 0.4 + 0.6
    }))
  );

  // Listen to mouse wheel or touch slide gestures to automatically redirect past the intro screen to the portfolio home!
  useEffect(() => {
    let accY = 0;
    const handleScrollOrWheel = (e: WheelEvent) => {
      accY += e.deltaY;
      if (Math.abs(accY) > 30 || e.deltaY > 15) {
        onComplete();
      }
    };

    let startTouchY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      startTouchY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY;
      const deltaY = startTouchY - currentY; // positive delta means scrolling down/swipe up
      if (deltaY > 25) {
        onComplete();
      }
    };

    window.addEventListener('wheel', handleScrollOrWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleScrollOrWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [onComplete]);

  // 0. Auto Bootloader Sequence Effect
  useEffect(() => {
    let currentProgress = 0;
    const phrases = [
      'SYS INIT: BOOTING KERNEL SEGMENTS...',
      'NET ENGINE: REGISTERING AGENT PORTS AT 0.0.0.0:3000...',
      'COMPILER: MOUNTING ANDROID RUNTIME CONTEXT...',
      'DATABASES: INTRODUCING LOCAL SQLITE SYSTEM INTERFACE...',
      'SYNTH VOCODER: PREPARING REALTIME WAVEFORM SPECTROGRAM...',
      'SYS BOOT: COMPLETED SUCCESSFULLY! LAUNCHING INTERACTIVE PORTAL...'
    ];
    let phraseIdx = 0;

    const interval = setInterval(() => {
      currentProgress += 5;
      if (currentProgress % 15 === 0 && phraseIdx < phrases.length - 1) {
        phraseIdx++;
        setBootText(phrases[phraseIdx]);
      }
      setBootProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsBooting(false);
        }, 350);
      }
    }, 60);

    return () => clearInterval(interval);
  }, []);

  // Initialize speech utterance
  useEffect(() => {
    const textToSpeak = `Hello! I am ${OWNER_CONFIG.fullName}. Welcome to my creative portfolio. I am a software developer and native android specialist. Here you can explore my projects, skills, and even compile live Java databases. Tap Enter to explore.`;
    
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 1.0; // Perfect human natural cadence speed
    utterance.pitch = 1.0; // Intact pure human pitch (avoid robotic pitch down-scaling)

    // Dynamically pick a premium English male voice
    const setVoice = () => {
      if (typeof window === 'undefined' || !window.speechSynthesis) return;
      const voices = window.speechSynthesis.getVoices();
      
      const englishVoices = voices.filter(v => v.lang.toLowerCase().startsWith('en'));
      
      // Sophisticated sorting to explicitly prioritize premium natural Male voices
      const sortedVoices = [...englishVoices].sort((a, b) => {
        const aName = a.name.toLowerCase();
        const bName = b.name.toLowerCase();
        
        let aScore = 0;
        let bScore = 0;
        
        // Heavy weights for explicitly Male voice identifiers
        const malePatterns = ['male', 'david', 'mark', 'daniel', 'george', 'guy', 'ravi', 'james', 'jack', 'microsoft david', 'desktop'];
        const femalePatterns = ['samantha', 'hazel', 'zira', 'susan', 'female', 'karen', 'moira', 'tessa', 'veena'];

        malePatterns.forEach(pat => {
          if (aName.includes(pat)) aScore += 500;
          if (bName.includes(pat)) bScore += 500;
        });

        femalePatterns.forEach(pat => {
          if (aName.includes(pat)) aScore -= 300;
          if (bName.includes(pat)) bScore -= 300;
        });

        // Preference for premium organic/natural modulations
        if (aName.includes('natural')) aScore += 150;
        if (bName.includes('natural')) bScore += 150;

        if (aName.includes('google')) aScore += 100;
        if (bName.includes('google')) bScore += 100;

        if (aName.includes('gb') || aName.includes('uk')) aScore += 30;
        if (bName.includes('gb') || bName.includes('uk')) bScore += 30;

        return bScore - aScore;
      });

      const preferred = sortedVoices[0] || voices.find((v) => v.lang.startsWith('en')) || voices[0];
      
      if (preferred) {
        utterance.voice = preferred;
        setActiveVoiceName(`${preferred.name} (Masculine HQ)`);
      } else {
        setActiveVoiceName('Masculine Vocal Synthesizer');
      }
    };

    if (typeof window !== 'undefined' && window.speechSynthesis) {
      setVoice();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = setVoice;
      }
    }

    // Attach event listeners to monitor speaking state
    utterance.onstart = () => {
      if (forwardTimeoutRef.current) clearTimeout(forwardTimeoutRef.current);
      setIsPlayingVoice(true);
      setIsDoneSpeaking(false);
      setSpeechMode('text-to-speech');
      startSpectrumAnalyzerDummy();
    };

    utterance.onend = () => {
      setIsPlayingVoice(false);
      setIsDoneSpeaking(true);
      stopSpectrumAnalyzerDummy();
      
      // Auto transition to main homepage screens 1.2 seconds after speaking concludes
      forwardTimeoutRef.current = setTimeout(() => {
        onComplete();
      }, 1200);
    };

    utterance.onerror = () => {
      // If voice synthesis errors (sandbox iframe limit), fallback to live audio synth automatically
      setIsPlayingVoice(false);
      handlePlaySynthOnly();
    };

    utteranceRef.current = utterance;

    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      if (forwardTimeoutRef.current) clearTimeout(forwardTimeoutRef.current);
      stopSynthEngine();
      stopSpectrumAnalyzerDummy();
    };
  }, []);

  // Auto-start Speech synthesis / Voice when bootloader concludes
  const hasAutoAttemptedPlayRef = useRef(false);
  useEffect(() => {
    if (!isBooting) {
      if (!hasAutoAttemptedPlayRef.current) {
        hasAutoAttemptedPlayRef.current = true;
        // Small delay to let component layout settle perfectly
        const startTimer = setTimeout(() => {
          handlePlayVoice();
        }, 500);
        return () => clearTimeout(startTimer);
      }

      // Register transparent document gestures to capture standard user interactions to unblock Audio nodes safely
      const forcePlayOnInteraction = () => {
        if (!isPlayingVoice && !isDoneSpeaking) {
          handlePlayVoice();
        }
        // Safe immediate deregistration of event hooks
        document.removeEventListener('click', forcePlayOnInteraction);
        document.removeEventListener('touchstart', forcePlayOnInteraction);
        document.removeEventListener('keydown', forcePlayOnInteraction);
      };

      document.addEventListener('click', forcePlayOnInteraction);
      document.addEventListener('touchstart', forcePlayOnInteraction);
      document.addEventListener('keydown', forcePlayOnInteraction);

      return () => {
        document.removeEventListener('click', forcePlayOnInteraction);
        document.removeEventListener('touchstart', forcePlayOnInteraction);
        document.removeEventListener('keydown', forcePlayOnInteraction);
      };
    }
  }, [isBooting, isPlayingVoice, isDoneSpeaking]);

  // Helper dummy voice wave dynamic movement for normal text-to-speech
  const startSpectrumAnalyzerDummy = () => {
    if (waveIntervalRef.current) clearInterval(waveIntervalRef.current);
    waveIntervalRef.current = setInterval(() => {
      setAudioWaves(
        Array.from({ length: 24 }, () => Math.floor(Math.random() * 45) + 6)
      );
    }, 75);
  };

  const stopSpectrumAnalyzerDummy = () => {
    if (waveIntervalRef.current) {
      clearInterval(waveIntervalRef.current);
      waveIntervalRef.current = null;
    }
    setAudioWaves(Array.from({ length: 24 }, () => 4));
  };

  // Captions synchronizer effect linked directly to voice playing state
  useEffect(() => {
    if (isPlayingVoice) {
      const captions = [
        { time: 0, text: "Hello! I am Pranav Shahaji Patil." },
        { time: 1800, text: "Welcome to my creative interactive portfolio!" },
        { time: 4200, text: "I am a Software Developer & Native Android Specialist." },
        { time: 6600, text: "Explore tools, database schemas, and compile live JVM targets." },
        { time: 9200, text: "Tap 'Enter Portfolio' to bypass or play with emulators." }
      ];
      
      const timeouts = captions.map((cap) => {
        return setTimeout(() => {
          setCurrentCaption(cap.text);
        }, cap.time);
      });
      
      return () => {
        timeouts.forEach(clearTimeout);
      };
    } else {
      setCurrentCaption('Awaiting vocal engine...');
    }
  }, [isPlayingVoice]);

  // Live Sound Wave synthesizer fallback (unblocked by Chrome iframe permissions)
  const handlePlaySynthOnly = () => {
    stopSynthEngine();
    setIsPlayingVoice(true);
    setIsDoneSpeaking(false);
    setSpeechMode('synth-telemetry');

    try {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtxClass) {
        // Ultimate non-audio browser fallback
        startSpectrumAnalyzerDummy();
        setTimeout(() => {
          setIsPlayingVoice(false);
          setIsDoneSpeaking(true);
          stopSpectrumAnalyzerDummy();
        }, 6000);
        return;
      }

      const ctx = new AudioCtxClass();
      audioCtxRef.current = ctx;

      const analyser = ctx.createAnalyser();
      analyser.fftSize = 64; // nice interactive bar count
      analyserRef.current = analyser;
      // Do not connect to ctx.destination so the fallback synthesizer remains 100% silent and clean
      // analyser.connect(ctx.destination);

      // 1. Dual-Filter Matrix (formant biquad + low-pass warmth filter) for deep masculine chest registers
      const speechOsc1 = ctx.createOscillator();
      speechOsc1.type = 'sawtooth';
      speechOsc1.frequency.setValueAtTime(82.41, ctx.currentTime); // Central tone - F2 deep baritone pitch

      const speechOsc2 = ctx.createOscillator();
      speechOsc2.type = 'sawtooth';
      speechOsc2.frequency.setValueAtTime(83.1, ctx.currentTime); // Detuned spread 1 (+0.7Hz chorusing warmth)

      const speechOsc3 = ctx.createOscillator();
      speechOsc3.type = 'triangle';
      speechOsc3.frequency.setValueAtTime(41.2, ctx.currentTime); // Sub-bass octaves (half frequency F1 sub-harmonic for robust masculine depth)

      const formantFilter = ctx.createBiquadFilter();
      formantFilter.type = 'bandpass';
      formantFilter.frequency.setValueAtTime(380, ctx.currentTime); // Lowered formant frequency standard for deep male speech resonant cavity
      formantFilter.Q.setValueAtTime(6.0, ctx.currentTime);

      const lpFilter = ctx.createBiquadFilter();
      lpFilter.type = 'lowpass';
      lpFilter.frequency.setValueAtTime(1800, ctx.currentTime); // Lower cutoff to filter out treble sizzle, cementing velvet vocal warmth

      // Scale base gain by phone volume
      const speechGain = ctx.createGain();
      const currentVolFactor = phoneVolume / 100;
      speechGain.gain.setValueAtTime(0.12 * currentVolFactor, ctx.currentTime);

      // Route oscillators into filter bank
      speechOsc1.connect(formantFilter);
      speechOsc2.connect(formantFilter);
      speechOsc3.connect(formantFilter);
      
      formantFilter.connect(lpFilter);
      lpFilter.connect(speechGain);
      speechGain.connect(analyser);

      speechOsc1.start();
      speechOsc2.start();
      speechOsc3.start();

      // 2. Premium Spacious 3D Echo Delay System (Jarvis/Sci-fi ambient echo!)
      const delayNode = ctx.createDelay();
      delayNode.delayTime.setValueAtTime(0.22, ctx.currentTime); // Elegant timed delay repeat

      const feedbackGain = ctx.createGain();
      feedbackGain.gain.setValueAtTime(0.28, ctx.currentTime); // High-fidelity decay loop

      // Route speech gain to delay feedback loop and link output directly to analyser for visual spectrum jumping!
      speechGain.connect(delayNode);
      delayNode.connect(feedbackGain);
      feedbackGain.connect(delayNode); // loop feedback back into delay
      feedbackGain.connect(analyser); // outputs dry-wet echoes

      // Clear previous intervals if any
      synthIntervalsRef.current.forEach(interval => clearInterval(interval));
      synthIntervalsRef.current = [];

      // Modulate vocal formant filters in real-time to generate hyper-realistic speech cadences
      const modInterval = setInterval(() => {
        const time = ctx.currentTime;
        const randomFormant = 280 + Math.random() * 650; // Deep vocal acoustics (F1/F2 male oral thresholds)
        const randomPitch = 70 + Math.random() * 30; // Solid deep male pitch modulation bounds (70Hz - 100Hz)
        
        // Dynamically modulate volume based on the active slider setting!
        const volScaler = phoneVolume / 100;
        const randomVol = (0.05 + Math.random() * 0.13) * volScaler;

        formantFilter.frequency.exponentialRampToValueAtTime(randomFormant, time + 0.09);
        speechOsc1.frequency.linearRampToValueAtTime(randomPitch, time + 0.07);
        speechOsc2.frequency.linearRampToValueAtTime(randomPitch + 0.7, time + 0.07);
        speechGain.gain.linearRampToValueAtTime(randomVol, time + 0.06);
      }, 95);
      synthIntervalsRef.current.push(modInterval);

      // Read real spectrum frequency data in real time!
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const drawFrame = () => {
        if (!analyserRef.current || !ctx) return;
        analyserRef.current.getByteFrequencyData(dataArray);

        // Map sound spectrum amplitudes inside the 24-bars array
        const heights = Array.from(dataArray).slice(0, 24).map((val) => {
          // Convert 0-255 frequency amplitude to 6-65px height values
          return Math.max(6, (val / 255) * 60 + Math.random() * 4);
        });

        // Loop array to fill standard elements if needed
        while (heights.length < 24) {
          heights.push(4);
        }

        setAudioWaves(heights);
        animationFrameRef.current = requestAnimationFrame(drawFrame);
      };

      animationFrameRef.current = requestAnimationFrame(drawFrame);

      // Programmatic speaking sequence timeout
      const completionTimeout = setTimeout(() => {
        stopSynthEngine();
        setIsPlayingVoice(false);
        setIsDoneSpeaking(true);
        
        // Auto transition to main portfolio home page 1.2 seconds after speaking concludes
        forwardTimeoutRef.current = setTimeout(() => {
          onComplete();
        }, 1200);
      }, 7500);

      // Keep reference of timer on state to clear if skip is triggered
      const nativeTimerInt = setInterval(() => {}, 10000);
      synthIntervalsRef.current.push(nativeTimerInt);

    } catch (err) {
      console.warn("Failed creating real audio spectrum context: ", err);
      startSpectrumAnalyzerDummy();
    }
  };

  const stopSynthEngine = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    synthIntervalsRef.current.forEach(interval => clearInterval(interval));
    synthIntervalsRef.current = [];

    if (audioCtxRef.current) {
      try {
        audioCtxRef.current.close().catch(() => {});
      } catch (e) {}
      audioCtxRef.current = null;
    }
    setAudioWaves(Array.from({ length: 24 }, () => 4));
  };

  // Handle Play Voice Trigger (First tries high-fidelity text-to-speech, falls back to synthesizer)
  const handlePlayVoice = () => {
    if (isPlayingVoice) return;
    // 1. Reset synthesizer states first
    stopSynthEngine();
    
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      
      // Use premium browser text-to-speech male speaker
      if (utteranceRef.current) {
        // Explicitly set dynamic spoken volume before invocation!
        utteranceRef.current.volume = phoneVolume / 100;
        window.speechSynthesis.speak(utteranceRef.current);
        return; // Return early so we focus purely on the clean real spoken male voice with no background synths
      }
    }
    
    // Safe silent fallback if speech synthesis is blocked
    handlePlaySynthOnly();
  };

  // Mute/Stop Voice Trigger
  const handleStopVoice = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    stopSynthEngine();
    setIsPlayingVoice(false);
  };

  // Realtime System Telemetry simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setCpuUtilization(prev => {
        const delta = Math.floor(Math.random() * 15) - 7;
        const next = prev + delta;
        return Math.min(Math.max(next, 15), 85);
      });
      setRamUtilization(prev => {
        const delta = Math.floor(Math.random() * 12) - 6;
        const next = prev + delta;
        return Math.min(Math.max(next, 180), 420);
      });
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleInsertRandomRow = () => {
    const randomNames = ['Aniket Mane', 'Prof. K. Sinha', 'Tejas Shinde', 'Snehal Patil', 'Rohan Deshmukh'];
    const randomRemarks = [
      'SQLite schema index bound successfully.',
      'Smooth virtual scroll works under high workloads.',
      'Stellar interactive emulator layout.',
      'JVM bytecode compiled with 0 warnings.',
      'Fluency threshold meets Material Design 3 guidelines.'
    ];
    const newId = Math.floor(Math.random() * 900) + 200;
    const newRow = {
      id: newId,
      name: randomNames[Math.floor(Math.random() * randomNames.length)],
      role: 'Evaluator',
      rating: Math.floor(Math.random() * 2) + 4,
      remark: randomRemarks[Math.floor(Math.random() * randomRemarks.length)]
    };
    setSqliteRows(prev => [newRow, ...prev]);
    setEmulatorLogs(prev => [
      ...prev,
      `> INSERT INTO nmpi_feedback_records VALUES (${newId}, "${newRow.name}", "Evaluator", ${newRow.rating});`,
      `✓ Dynamic SQLite Insertion OK (id: ${newId})`
    ]);
    triggerToast("Record added to local SQLiteDB!");
  };

  const handleDeleteRow = (id: number) => {
    setSqliteRows(prev => prev.filter(row => row.id !== id));
    setEmulatorLogs(prev => [
      ...prev,
      `> DELETE FROM nmpi_feedback_records WHERE col_id = ${id};`,
      `✓ Purged 1 row from SQLite.`
    ]);
    triggerToast("Record deleted from SQLiteDB!");
  };

  const handleSubmitFeedbackForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formRemark.trim()) {
      triggerToast("Please fill out all fields!");
      return;
    }
    
    setIsSubmittingFeedback(true);
    triggerToast("Encrypting submission form...");

    setTimeout(() => {
      const newId = Math.floor(Math.random() * 800) + 500;
      const newRow = {
        id: newId,
        name: formName,
        role: formRole,
        rating: formRating,
        remark: formRemark
      };

      setSqliteRows(prev => [newRow, ...prev]);
      setEmulatorLogs(prev => [
        ...prev,
        `> INSERT INTO nmpi_feedback_records VALUES (${newId}, "${formName}", "${formRole}", ${formRating});`,
        `✓ College System APK wrote 1 block of data (ID: ${newId})`
      ]);

      setFormName('');
      setFormRemark('');
      setIsSubmittingFeedback(false);
      setLoadedApp('sqlite'); // Automatically redirect to sqlite sandbox to show off the inserted item!
      triggerToast("Feedback saved in SQLite Table!");
    }, 1200);
  };

  const [compileProgress, setCompileProgress] = useState(0);

  // Android JVM Sandbox Handlers
  const handleCompileJVM = () => {
    if (activeCompilingState === 'compiling') return;
    setActiveCompilingState('compiling');
    setCompileProgress(0);
    setEmulatorLogs(prev => [
      ...prev,
      '--- GRADLE TARGET_BUILD TRIGGERED ---',
      '> ./gradlew assembleDebug --no-daemon'
    ]);
    
    let current = 0;
    const interval = setInterval(() => {
      current += 10;
      setCompileProgress(current);

      if (current === 20) {
        setEmulatorLogs(prev => [...prev, ':app:preBuild OK. Cleaning class caches...']);
      } else if (current === 40) {
        setEmulatorLogs(prev => [...prev, ':app:compileKotlin (scanning MainActivity.kt sources)']);
      } else if (current === 60) {
        setEmulatorLogs(prev => [...prev, ':app:transformClassesToDexWithR8 (dalvik bytecode mapping)']);
      } else if (current === 80) {
        setEmulatorLogs(prev => [...prev, ':app:packageDebug (compressing assets & generating debug.apk)']);
      } else if (current === 100) {
        clearInterval(interval);
        setActiveCompilingState('success');
        setEmulatorLogs(prev => [
          ...prev,
          '✓ BUILD SUCCESSFUL in 1.2s',
          '> launching simulated feedback_v1.07_release.apk...',
          'JVM Context: Loaded successfully in 45ms.'
        ]);
        triggerToast("Compiled & live loaded successfully!");
      }
    }, 120);
  };

  const handleCheckSQLite = () => {
    setEmulatorLogs(prev => [
      ...prev,
      '> sqlite3 application.db',
      'SELECT COUNT(*) FROM nmpi_feedback_records;',
      `Database response: ${sqliteRows.length} active rows found. Connection STATUS_OK.`,
      'Index structures fully verified.'
    ]);
    triggerToast("SQLite schema successfully validated!");
  };

  const handleResetEmulator = () => {
    setLoadedApp('launcher');
    setActiveCompilingState('idle');
    setCompileProgress(0);
    setEmulatorLogs([
      'System: PRANAV_OS booted.',
      'JVM compiler ready.',
      'Status: Standby.',
    ]);
  };

  if (isBooting) {
    return (
      <div className="fixed inset-0 bg-[#060606] flex flex-col justify-center items-center p-6 text-[#D7E2EA] font-mono select-none z-50">
        <div className="max-w-md w-full flex flex-col gap-5 text-left border border-white/5 rounded-2xl p-6 bg-black/60 backdrop-blur-md shadow-[0_30px_70px_rgba(0,0,0,0.8)]">
          {/* Terminal Title Bar */}
          <div className="flex justify-between items-center border-b border-[#0EA5E9]/20 pb-3 text-[10px] text-[#D7E2EA]/40 uppercase tracking-[0.25em]">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500/80" />
              <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
              <span className="w-2 h-2 rounded-full bg-green-500/80" />
            </span>
            <span>GA_INGRESS // PORT 3000</span>
          </div>
          
          {/* Real-time Loader steps */}
          <div className="flex flex-col gap-2 h-24 text-[11px] sm:text-xs">
            <div className="text-white/30 font-light font-mono">~$ sh install_patil_profile.sh</div>
            <div className="text-cyan-400 font-bold font-mono">[OK] COMPILE HARDWARE DETECTED: Java_JVM_8_0</div>
            <div className="flex items-center gap-1.5 text-white/90">
              <span className="text-[#0EA5E9] animate-ping shrink-0 text-[10px]">■</span>
              <span className="font-mono text-[11.5px] font-semibold">{bootText}</span>
            </div>
          </div>

          {/* Progress Indicator Bar */}
          <div className="w-full bg-neutral-900/60 h-3 rounded-full overflow-hidden border border-white/5 p-[2px]">
            <motion.div
              layout
              initial={{ width: '0%' }}
              animate={{ width: `${bootProgress}%` }}
              className="h-full bg-gradient-to-r from-[#0EA5E9] via-violet-500 to-cyan-400 rounded-full"
              transition={{ ease: 'easeInOut' }}
            />
          </div>

          {/* Technical Details Footer */}
          <div className="flex justify-between items-center text-[9px] text-[#D7E2EA]/30 uppercase tracking-widest font-mono">
            <span>SYS_PROGRESS: {bootProgress}%</span>
            <span className="animate-pulse text-[#0EA5E9] font-bold">BOOT SEQUENCE ACTIVE</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen bg-[#060606] flex flex-col justify-between items-center px-4 py-8 select-none font-sans overflow-hidden z-30">
      
      {/* Background neon dynamic grids */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(182,0,168,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(182,0,168,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-[#0EA5E9]/10 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Dynamic Cyber Code Particles drifting in space */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0.03, y: '110vh' }}
            animate={{ 
              opacity: [0.03, 0.16, 0.03],
              y: ['110vh', '-10vh'],
              x: [`${p.x}%`, `${p.x + (p.id % 2 === 0 ? 4 : -4)}%`]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: p.duration, 
              delay: p.delay, 
              ease: 'linear' 
            }}
            className="absolute font-mono text-[9px] sm:text-xs text-[#0EA5E9]/50 font-bold select-none tracking-widest bg-white/2 border border-white/5 px-2 py-1 rounded-md"
            style={{ 
              left: `${p.x}%`,
              scale: p.scale
            }}
          >
            {p.text}
          </motion.div>
        ))}
      </div>

      {/* Header Info */}
      <div className="relative z-10 flex w-full max-w-5xl justify-between items-center pt-2 sm:pt-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#0EA5E9] animate-ping" />
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#D7E2EA]/50 font-mono">
            SYS: INTRO_SEQUENCE_ENGAGED
          </span>
        </div>
        <button
          onClick={onComplete}
          className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#D7E2EA]/40 hover:text-white transition-colors cursor-pointer border border-[#D7E2EA]/10 hover:border-white/20 px-3.5 py-1.5 rounded-full bg-white/5"
        >
          Skip Intro
        </button>
      </div>

      {/* Main Interactive HUD & Center Stage */}
      <div className="relative z-10 w-full max-w-7xl px-4 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center justify-center flex-1 my-4">
        
        {/* LEFT HUD: Dev Metrics HUD (visible only on lg+) */}
        <div className="hidden lg:col-span-3 lg:flex flex-col gap-4 text-left font-mono z-20">
          <div className="bg-white/5 border border-white/15 rounded-2xl p-4 flex flex-col gap-3 backdrop-blur-md shadow-2xl relative overflow-hidden group hover:border-[#0EA5E9]/40 transition-all duration-300">
            <div className="absolute top-0 right-0 w-16 h-16 bg-[#0EA5E9]/5 rounded-bl-full pointer-events-none" />
            <div className="text-[10px] font-bold text-[#0EA5E9] uppercase tracking-[0.2em] border-b border-white/5 pb-2 flex justify-between items-center">
              <span>System Core HUD</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            </div>
            
            <div className="space-y-3 text-[11px]">
              <div className="flex justify-between items-center">
                <span className="text-white/40">HOST_TARGET</span>
                <span className="text-white font-semibold flex items-center gap-1">GA-INSTANCE-3000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/40">DB_PERSISTENCE</span>
                <span className="text-cyan-400 font-bold">SQLITE 3.42+</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/40">VIRTUAL_JVM</span>
                <span className="text-emerald-400 font-semibold">DEX-COMPLIANT</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/40">SPECTRUM_BUS</span>
                <span className="text-fuchsia-400 font-medium">FREQUENCY LOCK</span>
              </div>
            </div>

            {/* Micro progress graphs */}
            <div className="mt-2 space-y-2 border-t border-white/5 pt-3">
              <div className="space-y-1">
                <div className="flex justify-between text-[9px] text-[#D7E2EA]/50 font-bold">
                  <span>CPU THROTTLE</span>
                  <span>{cpuUtilization}%</span>
                </div>
                <div className="w-full bg-black/50 h-1.5 rounded-full overflow-hidden p-[1px]">
                  <div className="h-full bg-gradient-to-r from-[#0EA5E9] to-cyan-400 rounded-full" style={{ width: `${cpuUtilization}%` }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[9px] text-[#D7E2EA]/50 font-bold">
                  <span>JVM RAM ALLOC</span>
                  <span>{ramUtilization}MB</span>
                </div>
                <div className="w-full bg-black/50 h-1.5 rounded-full overflow-hidden p-[1px]">
                  <div className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full" style={{ width: `${(ramUtilization / 512) * 100}%` }} />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col gap-2 backdrop-blur-md shadow-2xl relative overflow-hidden group hover:border-cyan-400/30 transition-all duration-300">
            <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-[0.2em] border-b border-white/5 pb-2 flex justify-between items-center">
              <span>ACTIVE TELEMETRY</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </div>
            <div className="text-[9px] space-y-1.5 text-white/60 leading-normal font-mono max-h-[140px] overflow-y-auto scrollbar-none">
              <div className="text-green-400 font-medium">✓ Socket connected (Host Ingress 3000)</div>
              <div>&gt; Loading dynamic content mapping...</div>
              <div>&gt; Web Audio Node synthesized</div>
              <div className="text-yellow-400 font-light">! Rate-limit checking active...</div>
              <div className="text-[#0EA5E9] font-semibold">&gt; PORTFOLIO IN STANDBY</div>
            </div>
          </div>
        </div>

        {/* CENTER COLUMN: Main Android emulator content (6/12 width on lg) */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center text-center flex-grow w-full">        {/* Sleek Futuristic Holographic Android Emulator with Conic Neon Border and Ambient Shadow */}
        <div className="relative w-[310px] sm:w-[330px] md:w-[350px] h-[380px] sm:h-[420px] md:h-[430px] flex flex-col items-center justify-center mb-6 select-none z-10">
          
          {/* Subtle Outer Neon Backlight behind the Phone Device */}
          <div className="absolute inset-x-4 inset-y-4 rounded-[42px] bg-gradient-to-tr from-[#0EA5E9]/20 via-transparent to-cyan-500/15 blur-2xl pointer-events-none z-0" />

          {/* Realistic High-Tech Glassmorphic Phone Shell Frame with Active Side Buttons */}
          <div className="relative w-full h-full rounded-[40px] border-[3.5px] border-neutral-800/90 bg-neutral-950/95 shadow-[0_25px_60px_rgba(0,0,0,0.85),_0_0_20px_rgba(182,0,168,0.2)] flex flex-col overflow-hidden z-10 p-2.5">
            
            {/* Interactive Tactile Phone Buttons */}
            <button
              onClick={() => {
                setPhoneVolume(v => {
                  const next = Math.min(100, v + 10);
                  triggerToast(`Volume adjusted: ${next}%`);
                  return next;
                });
              }}
              className="absolute -left-[3px] top-24 w-[6px] h-12 bg-neutral-700 hover:bg-cyan-400 active:bg-cyan-500 rounded-r-md transition-colors cursor-pointer z-40 shadow-md transform active:translate-x-[1px]"
              title="Volume Up"
            />
            <button
              onClick={() => {
                setPhoneVolume(v => {
                  const next = Math.max(0, v - 10);
                  triggerToast(`Volume adjusted: ${next}%`);
                  return next;
                });
              }}
              className="absolute -left-[3px] top-40 w-[6px] h-12 bg-neutral-700 hover:bg-cyan-400 active:bg-cyan-500 rounded-r-md transition-colors cursor-pointer z-40 shadow-md transform active:translate-x-[1px]"
              title="Volume Down"
            />
            <button
              onClick={() => {
                setPhonePowerOn(p => {
                  const next = !p;
                  triggerToast(next ? "System initiated: Active Mode" : "Display standby: Power-save engaged");
                  return next;
                });
              }}
              className={`absolute -right-[3px] top-32 w-[6px] h-14 rounded-l-md transition-all cursor-pointer z-40 shadow-md transform active:-translate-x-[1px] ${
                phonePowerOn ? 'bg-[#0EA5E9] hover:bg-fuchsia-500' : 'bg-neutral-600 hover:bg-neutral-500'
              }`}
              title="Power / Toggle Screen"
            />

            {/* Top Speaker Grill Accent & Punch-hole Camera */}
            <div className="absolute top-1.5 inset-x-0 flex justify-center items-center pointer-events-none z-30">
              <div className="w-16 h-1 rounded-full bg-neutral-800/80" />
            </div>

            {/* Simulated Smartphone Screen with Custom Wallpaper Presets */}
            <div className={`relative flex-1 rounded-[32px] overflow-hidden flex flex-col shadow-inner border border-white/5 transition-all duration-500 ${
              activeWallpaper === 'cyber-magenta' ? 'bg-[#0b0416]' :
              activeWallpaper === 'cyberpunk-emerald' ? 'bg-[#021008]' :
              activeWallpaper === 'digital-blue' ? 'bg-[#030B18]' :
              'bg-[#060606]'
            }`}>
              
              {/* Wallpaper Grid Lines background for cyber feel */}
              {activeWallpaper !== 'amoled-carbon' && (
                <div className={`absolute inset-0 z-0 opacity-15 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none`} />
              )}
              
              {/* Scanlines Overlay for retro high-tech screen feel */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none opacity-40 mix-blend-overlay z-20" />
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-950/5 via-transparent to-purple-950/5 pointer-events-none z-20" />

              {/* ACTIVE PHONE DISPLAY OVERLAY IF COLD POWER-OFF */}
              {!phonePowerOn ? (
                <div 
                  onClick={() => {
                    setPhonePowerOn(true);
                    triggerToast("System initiated: Active Mode");
                  }}
                  className="absolute inset-0 bg-black flex flex-col justify-between p-6 text-center select-none z-40 transition-all duration-300 cursor-pointer hover:bg-black/95"
                >
                  <div className="flex justify-between items-center text-[7.5px] font-mono text-zinc-600">
                    <span>PRANAV_OS // STANDBY</span>
                    <span>99% 🔋 [COOL]</span>
                  </div>

                  <div className="flex flex-col items-center justify-center flex-1 py-12 gap-1.5">
                    <span className="text-2xl font-mono text-zinc-500 tracking-wider font-medium animate-pulse">03:45 AM</span>
                    <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-[0.25em]">Amoled Power-Save</span>
                    <div className="w-12 h-[1px] bg-zinc-800 rounded-full mt-3 animate-pulse" />
                  </div>

                  <div className="flex flex-col items-center gap-1.5">
                    <span className="text-[7px] font-mono text-zinc-700 uppercase tracking-widest leading-none">
                      Tap screen or power key to boot
                    </span>
                    <span className="text-[7.5px] font-mono text-[#0EA5E9]/60 animate-bounce uppercase font-bold">
                      WAKE UP EMULATOR
                    </span>
                  </div>
                </div>
              ) : (
                <>
                  {/* Top High-Fidelity OS Status Bar */}
                  <div className="h-7 w-full border-b border-white/5 bg-black/50 px-4.5 flex justify-between items-center text-[9px] font-mono tracking-wider text-[#D7E2EA]/50 select-none z-20 shrink-0">
                    <div className="flex items-center gap-1.5">
                      <span className={`font-bold uppercase tracking-wider ${
                        activeWallpaper === 'cyberpunk-emerald' ? 'text-emerald-400' :
                        activeWallpaper === 'digital-blue' ? 'text-cyan-400' :
                        activeWallpaper === 'cyber-magenta' ? 'text-fuchsia-400' :
                        'text-neutral-400'
                      }`}>PRANAV_OS</span>
                      <div className="flex gap-[2px] items-end h-2">
                        <div className={`w-[1.5px] h-1 ${activeWallpaper === 'cyberpunk-emerald' ? 'bg-emerald-400' : activeWallpaper === 'digital-blue' ? 'bg-cyan-400' : 'bg-[#0EA5E9]'}`} />
                        <div className={`w-[1.5px] h-1.5 ${activeWallpaper === 'cyberpunk-emerald' ? 'bg-emerald-400' : activeWallpaper === 'digital-blue' ? 'bg-cyan-400' : 'bg-[#0EA5E9]'}`} />
                        <div className={`w-[1.5px] h-2 ${activeWallpaper === 'cyberpunk-emerald' ? 'bg-emerald-400' : activeWallpaper === 'digital-blue' ? 'bg-cyan-400' : 'bg-[#0EA5E9]'}`} />
                      </div>
                      <span className={`text-[7px] bg-white/5 px-1 py-0.5 rounded border border-white/10 font-bold pb-0 text-white`}>5G</span>
                    </div>
                    {/* Punch-hole camera circle */}
                    <div className="w-4 h-4 rounded-full bg-neutral-950 border border-neutral-800/80 flex items-center justify-center">
                      <div className={`w-1 h-1 rounded-full animate-pulse ${
                        activeWallpaper === 'cyberpunk-emerald' ? 'bg-emerald-400' :
                        activeWallpaper === 'digital-blue' ? 'bg-cyan-400' :
                        'bg-[#0EA5E9]'
                      }`} />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Wifi className="w-2.5 h-2.5 text-zinc-400" />
                      <span>{phoneVolume}% 🔊</span>
                    </div>
                  </div>

                  {/* Android-style Volume Indicator Overlay popping in on the left edge */}
                  <div className="absolute left-1.5 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1 bg-black/90 border border-white/5 py-2 px-1 rounded-full z-30 pointer-events-none select-none shadow-2xl scale-95">
                    <Volume2 className="w-2.5 h-2.5 text-cyan-400" />
                    <div className="w-[3px] h-12 bg-neutral-800 rounded-full overflow-hidden relative">
                      <div 
                        className={`absolute bottom-0 w-full rounded-full transition-all duration-300 ${
                          activeWallpaper === 'cyberpunk-emerald' ? 'bg-emerald-400' :
                          activeWallpaper === 'digital-blue' ? 'bg-cyan-400' :
                          'bg-[#0EA5E9]'
                        }`} 
                        style={{ height: `${phoneVolume}%` }}
                      />
                    </div>
                    <span className="text-[6px] font-mono text-white/50 mt-0.5 font-bold">{phoneVolume}%</span>
                  </div>

                  {/* SIMULATED SYSTEM TOAST ALERT WITH COMPRESSION SPRING */}
                  <AnimatePresence>
                    {toastMessage && (
                      <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className="absolute top-10 inset-x-2 bg-black/95 border border-white/10 shadow-[0_12px_30px_rgba(0,0,0,0.8)] rounded-xl py-2 px-3 flex items-center gap-2 z-50 pointer-events-none select-none text-left"
                      >
                        <div className={`w-1.5 h-1.5 rounded-full animate-ping shrink-0 ${
                          activeWallpaper === 'cyberpunk-emerald' ? 'bg-emerald-400' :
                          activeWallpaper === 'digital-blue' ? 'bg-cyan-400' :
                          'bg-[#0EA5E9]'
                        }`} />
                        <span className="text-[8px] font-mono text-white uppercase font-bold leading-tight truncate">{toastMessage}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* ACTIVE SCREEN CONTENT */}
                  <div className="flex-1 w-full flex flex-col overflow-y-auto overflow-x-hidden p-3 relative scrollbar-none">
                    
                    {isPlayingVoice ? (
                      /* ========================================================
                         STATE A: ACTIVE AUDIO STREAMING REACTOR (WHEN SPEAKING)
                         ======================================================= */
                      <div className="flex-1 flex flex-col justify-center items-center gap-3 text-center">
                        <p className="font-mono text-[7px] text-cyan-400 tracking-[0.25em] uppercase font-bold animate-pulse">
                          ▲ VOCAL SPECTRUM CORRELATING ▲
                        </p>
                        
                        {/* Pulsating Glowing Sound Hologram Orb with Orbiting Rings */}
                        <div className="relative w-28 sm:w-32 aspect-square flex items-center justify-center my-1 font-mono">
                          
                          {/* Orbital ring 1 */}
                          <motion.div
                            animate={{ rotate: 360, scale: [1, 1.15, 1] }}
                            transition={{ repeat: Infinity, duration: 3.5, ease: "linear" }}
                            className="absolute inset-0 rounded-full border border-dashed border-[#0EA5E9] filter drop-shadow-[0_0_8px_rgba(182,0,168,0.5)]"
                          />

                          {/* Orbital ring 2 */}
                          <motion.div
                            animate={{ rotate: -360, scale: [1.1, 0.92, 1.1] }}
                            transition={{ repeat: Infinity, duration: 4.8, ease: "linear" }}
                            className="absolute inset-1.5 rounded-full border border-cyan-400"
                          />

                          {/* Expanding pulse waves */}
                          <motion.div
                            animate={{ scale: [1, 1.55], opacity: [0.55, 0] }}
                            transition={{ repeat: Infinity, duration: 1.4, ease: "easeOut" }}
                            className="absolute inset-0 rounded-full border border-cyan-400/30"
                          />

                          {/* Center Glowing Energy Sphere */}
                          <motion.div
                            animate={{
                              scale: [1, 1.18, 0.93, 1.14, 1],
                              backgroundColor: ["#0EA5E9", "#22D3EE", "#8b5cf6", "#0ea5e9", "#0EA5E9"]
                            }}
                            transition={{ repeat: Infinity, duration: 2.0, ease: "easeInOut" }}
                            className="w-14 sm:w-16 h-14 sm:h-16 rounded-full flex flex-col items-center justify-center shadow-[0_0_30px_rgba(182,0,168,0.7)] z-10"
                          >
                            <Volume2 className="w-5.5 h-5.5 text-white animate-bounce" />
                          </motion.div>
                        </div>

                        {/* Interactive Dynamic Subtitle Streamer! */}
                        <div className="w-full bg-black/85 p-2.5 rounded-xl border border-white/5 shadow-lg select-text text-center transition-all duration-300">
                          <p className={`text-[9px] font-mono leading-normal font-bold uppercase tracking-wider ${
                            activeWallpaper === 'cyberpunk-emerald' ? 'text-emerald-400' :
                            activeWallpaper === 'digital-blue' ? 'text-cyan-400' :
                            'text-[#0EA5E9]'
                          } mb-0.5`}>Transcript // Spoken caption</p>
                          <p className="text-[8.5px] font-sans text-white font-medium italic">
                            "{currentCaption}"
                          </p>
                        </div>

                        {/* Equalizer Wave bar row */}
                        <div className="flex gap-[3px] items-end justify-center h-8 w-full mt-1.5">
                          {Array.from({ length: 24 }).map((_, i) => {
                            const h = Math.floor(Math.random() * 24) + 4;
                            return (
                              <motion.div
                                key={i}
                                animate={{ height: `${h}px` }}
                                transition={{ repeat: Infinity, duration: 0.15 + (i % 3) * 0.05 }}
                                className={`w-1 rounded-sm bg-gradient-to-t ${
                                  activeWallpaper === 'cyberpunk-emerald' ? 'from-emerald-500 to-teal-400' :
                                  activeWallpaper === 'digital-blue' ? 'from-cyan-500 to-blue-400' :
                                  'from-[#0EA5E9] to-cyan-400'
                                }`}
                                style={{ height: '3px' }}
                              />
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      /* ========================================================
                         STATE B: INTERACTIVE ANDROID JVM HOME & SANDBOX SYSTEM
                         ======================================================= */
                      <div className="flex-1 flex flex-col gap-3">
                        
                        {/* Welcome Title & Processor Badge */}
                        <div className="flex items-center justify-between bg-white/5 border border-white/10 p-2 rounded-xl shrink-0">
                          <div className="flex items-center gap-2">
                            <div className={`w-7 h-7 rounded-lg flex items-center justify-center shadow-lg shrink-0 bg-gradient-to-tr ${
                              activeWallpaper === 'cyberpunk-emerald' ? 'from-emerald-600 to-teal-400' :
                              activeWallpaper === 'digital-blue' ? 'from-cyan-600 to-indigo-500' :
                              'from-[#0EA5E9] to-cyan-500'
                            }`}>
                              <Cpu className="w-3.5 h-3.5 text-white" />
                            </div>
                            <div className="text-left leading-tight">
                              <p className={`text-[9px] font-mono uppercase font-bold tracking-wider ${
                                activeWallpaper === 'cyberpunk-emerald' ? 'text-emerald-400' :
                                activeWallpaper === 'digital-blue' ? 'text-cyan-400' :
                                'text-fuchsia-400'
                              }`}>JVM_ENVIRONMENT</p>
                              <p className="text-[7px] font-mono text-white/40">HOST: REGULAR COMPILER</p>
                            </div>
                          </div>
                          
                          {/* Interactive Telemetry badges */}
                          <div className="flex flex-col items-end font-mono text-[7px]" title="Live System Telemetry">
                            <span className="text-cyan-400 flex items-center gap-1">
                              <span className="w-1 h-1 rounded-full bg-cyan-400 animate-ping" />
                              CPU: {cpuUtilization}%
                            </span>
                            <span className="text-fuchsia-400 uppercase">
                              RAM: {ramUtilization}MB
                            </span>
                          </div>
                        </div>

                        {/* Interactive App Launcher Navigation Tiles */}
                        <div className="grid grid-cols-4 gap-1 text-[7.5px] font-mono font-bold select-none shrink-0">
                          <button
                            onClick={() => {
                              setLoadedApp('sqlite');
                              setEmulatorLogs(prev => [...prev, '> sqlite3 application.db', 'SQL: Switched context to nmpi_feedback_records.']);
                            }}
                            className={`p-1.5 rounded-lg border flex flex-col items-center gap-1 cursor-pointer transition-all active:scale-95 text-center ${
                              loadedApp === 'sqlite' 
                                ? 'bg-cyan-500/10 border-cyan-400 text-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.15)]' 
                                : 'bg-black/40 border-white/5 text-[#D7E2EA]/60 hover:bg-white/5'
                            }`}
                          >
                            <Database className="w-3 h-3 text-cyan-400" />
                            SQLite
                          </button>

                          <button
                            onClick={() => {
                              setLoadedApp('feedback');
                              setEmulatorLogs(prev => [...prev, '> load app/college_feedback.apk', 'Loaded view: college feedback portal.']);
                            }}
                            className={`p-1.5 rounded-lg border flex flex-col items-center gap-1 cursor-pointer transition-all active:scale-95 text-center ${
                              loadedApp === 'feedback' 
                                ? 'bg-[#0EA5E9]/10 border-[#0EA5E9] text-[#0EA5E9] shadow-[0_0_8px_rgba(182,0,168,0.15)]' 
                                : 'bg-black/40 border-white/5 text-[#D7E2EA]/60 hover:bg-white/5'
                            }`}
                          >
                            <Code className="w-3 h-3 text-[#0EA5E9]" />
                            College
                          </button>

                          <button
                            onClick={() => {
                              setLoadedApp('monitor');
                              setEmulatorLogs(prev => [...prev, '> init jvm_telemetry debugger', 'Loaded JVM System telemetry app.']);
                            }}
                            className={`p-1.5 rounded-lg border flex flex-col items-center gap-1 cursor-pointer transition-all active:scale-95 text-center ${
                              loadedApp === 'monitor' 
                                ? 'bg-emerald-500/10 border-emerald-400 text-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.15)]' 
                                : 'bg-black/40 border-white/5 text-[#D7E2EA]/60 hover:bg-white/5'
                            }`}
                          >
                            <Activity className="w-3 h-3 text-emerald-400" />
                            SYS Mon
                          </button>

                          <button
                            onClick={() => {
                              setLoadedApp('wallpapers');
                              setEmulatorLogs(prev => [...prev, '> open wallpaper_settings.app', 'Wallpaper Store loaded.']);
                            }}
                            className={`p-1.5 rounded-lg border flex flex-col items-center gap-1 cursor-pointer transition-all active:scale-95 text-center ${
                              loadedApp === 'wallpapers' 
                                ? 'bg-yellow-500/10 border-yellow-400 text-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.15)]' 
                                : 'bg-black/40 border-white/5 text-[#D7E2EA]/60 hover:bg-white/5'
                            }`}
                          >
                            <Layers className="w-3 h-3 text-yellow-400" />
                            Wallpaper
                          </button>
                        </div>

                        {/* Inner Launcher Screen Panels */}
                        <div className="flex-1 bg-black/60 border border-white/5 rounded-xl p-2.5 flex flex-col overflow-hidden min-h-[170px]">
                          
                          {/* VIEW A: HOME LAUNCHER MENU */}
                          {loadedApp === 'launcher' && (
                            <div className="flex-1 flex flex-col justify-center items-center gap-2 text-center py-2">
                              <span className="w-4 h-4 rounded-full bg-cyan-400 animate-ping absolute opacity-25" />
                              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#0EA5E9]/20 to-cyan-500/20 flex items-center justify-center border border-cyan-400/30 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                                <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
                              </div>
                              
                              <div className="leading-tight select-none">
                                <p className="text-[10px] font-mono font-bold text-white uppercase tracking-wider">PRANAV PATIL PLAYGROUND</p>
                                <p className="text-[7.5px] font-mono text-[#0EA5E9] tracking-widest font-extrabold mt-0.5 text-center">ANDROID SPECIALIST STUDIO</p>
                              </div>

                              <div className="grid grid-cols-2 gap-1 w-full bg-black/40 p-2 rounded-lg border border-white/5 mt-1 select-none text-[8px] font-mono text-left">
                                <div className="flex items-center gap-1 text-white/50">
                                  <span className="w-1 h-1 bg-green-400 rounded-full" />
                                  SDK: Level 34
                                </div>
                                <div className="flex items-center gap-1 text-white/50">
                                  <span className="w-1 h-1 bg-cyan-400 rounded-full" />
                                  SQLite: Active
                                </div>
                                <div className="flex items-center gap-1 text-white/50">
                                  <span className="w-1 h-1 bg-[#0EA5E9] rounded-full" />
                                  JVM: Version 17
                                </div>
                                <div className="flex items-center gap-1 text-white/50">
                                  <span className="w-1 h-1 bg-yellow-400 rounded-full" />
                                  Gradle: v8.2
                                </div>
                              </div>

                              <p className="text-[8px] font-sans text-white/40 leading-normal px-2 block mt-1 select-none">
                                Tap the buttons above to interactively submit reviews, stress test simulated JVM threads, or switch themes!
                              </p>
                            </div>
                          )}

                          {/* VIEW B: INTERACTIVE SQLITE TABLE MANAGEMENT (REAL SEARCH + INSERTS + DELETES) */}
                          {loadedApp === 'sqlite' && (
                            <div className="flex-1 flex flex-col text-left gap-2 overflow-hidden">
                              
                              {/* DB Sub-Header with Real count indicators */}
                              <div className="flex justify-between items-center text-[8px] font-mono text-white/50 border-b border-white/5 pb-1 select-none shrink-0">
                                <span className="flex items-center gap-1 font-bold text-cyan-400 uppercase">
                                  <Database className="w-2.5 h-2.5 text-cyan-400" />
                                  TableName: nmpi_feedback
                                </span>
                                <span className="text-[#0EA5E9] font-bold">ROWS: {sqliteRows.length}</span>
                              </div>

                              {/* Live DB Actions - Trigger quick inserts or validations */}
                              <div className="flex justify-between gap-1.5 select-none shrink-0 border-b border-white/5 pb-1.5">
                                <button
                                  type="button"
                                  onClick={handleInsertRandomRow}
                                  className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-black text-[8px] font-black py-1 px-1.5 rounded transition-all active:scale-95 flex items-center justify-center gap-0.5 cursor-pointer"
                                  title="Add randomly simulated feedback data into custom row"
                                >
                                  <Plus className="w-2 h-2" />
                                  Insert Random Row
                                </button>
                                <button
                                  type="button"
                                  onClick={handleCheckSQLite}
                                  className="flex-1 bg-neutral-800 hover:bg-neutral-700 text-white text-[8px] font-bold py-1 px-1.5 rounded transition-all active:scale-95 flex items-center justify-center gap-0.5 cursor-pointer"
                                  title="Validates SQLite Tables schema and counters"
                                >
                                  <RefreshCw className="w-2 h-2 text-[#0EA5E9]" />
                                  Validate Table
                                </button>
                              </div>

                              {/* Search Input Filter */}
                              <div className="relative shrink-0 select-none">
                                <Search className="absolute left-2 top-1.5 w-3 h-3 text-white/30" />
                                <input
                                  type="text"
                                  placeholder="Search database live..."
                                  value={searchQuery}
                                  onChange={(e) => setSearchQuery(e.target.value)}
                                  className="w-full bg-black/60 border border-white/10 rounded-md py-1 pl-6 pr-2 text-[7.5px] font-mono text-white placeholder-white/20 focus:outline-none focus:border-cyan-400 transition-colors"
                                />
                                {searchQuery && (
                                  <button 
                                    type="button"
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-1.5 top-1 text-[7px] font-black text-white/40 hover:text-cyan-400"
                                  >
                                    ✕
                                  </button>
                                )}
                              </div>

                              {/* SQLite Table content view with seamless springy insertions & deletions! */}
                              <div className="flex-1 overflow-y-auto pr-0.5 space-y-1.5 scrollbar-thin max-h-[140px]">
                                <AnimatePresence mode="popLayout">
                                  {sqliteRows.filter(row => 
                                    row.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                    row.remark.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                    row.role.toLowerCase().includes(searchQuery.toLowerCase())
                                  ).map((row) => (
                                    <motion.div
                                      key={row.id}
                                      layout
                                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                      animate={{ opacity: 1, scale: 1, y: 0 }}
                                      exit={{ opacity: 0, scale: 0.8, x: -30 }}
                                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                                      className="bg-black/50 border border-white/5 rounded-lg p-2 flex flex-col gap-1 relative group hover:border-[#0EA5E9]/30 transition-colors select-text"
                                    >
                                      {/* Row Column details */}
                                      <div className="flex justify-between items-center text-[7px] font-mono">
                                        <span className="text-cyan-400 bg-cyan-400/5 px-1 rounded border border-cyan-400/10 font-bold">col_id: {row.id}</span>
                                        <span className="text-fuchsia-400 font-extrabold tracking-wider uppercase">{row.role}</span>
                                      </div>
                                      
                                      <div className="text-[8.5px] font-bold text-white/95">{row.name}</div>
                                      <p className="text-[7.5px] font-mono text-white/50 leading-normal">"{row.remark}"</p>
                                      
                                      {/* Rating Meter */}
                                      <div className="flex justify-between items-center mt-0.5 shrink-0 select-none">
                                        <div className="flex gap-[2px]">
                                          {Array.from({ length: 5 }).map((_, rIdx) => (
                                            <div 
                                              key={rIdx} 
                                              className={`w-[5px] h-1.5 rounded-sm ${rIdx < row.rating ? 'bg-amber-400' : 'bg-neutral-800'}`} 
                                            />
                                          ))}
                                        </div>
                                        
                                        {/* Real-time interactive row purge command trigger */}
                                        <button
                                          type="button"
                                          onClick={() => handleDeleteRow(row.id)}
                                          className="text-white/30 hover:text-red-400 hover:bg-red-400/10 p-0.5 rounded transition-all cursor-pointer shadow-sm active:scale-95"
                                          title="DELETE row from local store schema"
                                        >
                                          <Trash2 className="w-2.5 h-2.5" />
                                        </button>
                                      </div>
                                    </motion.div>
                                  ))}
                                  {sqliteRows.filter(row => 
                                    row.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                    row.remark.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                    row.role.toLowerCase().includes(searchQuery.toLowerCase())
                                  ).length === 0 && (
                                    <div className="text-center py-6 text-white/30 text-[8px] font-mono uppercase select-none">
                                      No database records match filter.
                                    </div>
                                  )}
                                </AnimatePresence>
                              </div>

                            </div>
                          )}

                          {/* VIEW C: COLLEGE APK - FORM SUBMISSION PORTAL + LIVE JVM COMPILING TRIGGERS */}
                          {loadedApp === 'feedback' && (
                            <div className="flex-1 flex flex-col text-left gap-2 overflow-hidden">
                              
                              {/* APK Title bar */}
                              <div className="flex justify-between items-center text-[8px] font-mono text-white/50 border-b border-white/5 pb-1 select-none shrink-0">
                                <span className="text-[#0EA5E9] font-black tracking-wider font-bold">COLLEGE_FEEDBACK_APK</span>
                                <span className="text-cyan-400 font-extrabold text-[7.5px]">API_34_LIVE</span>
                              </div>

                              {/* Compiling state controller panel or submission UI launcher */}
                              {activeCompilingState !== 'success' ? (
                                /* Needs initial compilation */
                                <div className="flex-1 flex flex-col justify-between select-none">
                                  <div className="space-y-1">
                                    <p className="text-[8.5px] font-bold text-[#D7E2EA]">Kotlin/Java Compilation Module</p>
                                    <p className="text-[7.5px] font-mono text-white/45 leading-normal">
                                      Compile target feedback APK on device JVM before executing forms:
                                    </p>
                                  </div>

                                  {activeCompilingState === 'compiling' && (
                                    <div className="bg-black/40 border border-white/5 p-2 rounded-lg font-mono space-y-1">
                                      <div className="flex justify-between text-[7.5px] text-cyan-400 font-bold mb-0.5">
                                        <span>gradle assembleDebug</span>
                                        <span>{compileProgress}%</span>
                                      </div>
                                      <div className="w-full bg-neutral-900 h-1.5 rounded-full overflow-hidden">
                                        <motion.div 
                                          className="h-full bg-gradient-to-r from-[#0EA5E9] to-cyan-400 animate-pulse"
                                          animate={{ width: `${compileProgress}%` }}
                                          transition={{ duration: 0.1 }}
                                        />
                                      </div>
                                    </div>
                                  )}

                                  <div className="flex gap-2.5 mt-2">
                                    <button
                                      type="button"
                                      onClick={handleCompileJVM}
                                      disabled={activeCompilingState === 'compiling'}
                                      className="flex-1 bg-[#0EA5E9] hover:bg-[#0EA5E9]/90 text-white font-mono text-[8px] font-black py-2 px-3 rounded-lg transition-all active:scale-95 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-1 shadow-lg"
                                    >
                                      <RefreshCw className={`w-3 h-3 ${activeCompilingState === 'compiling' ? 'animate-spin' : ''}`} />
                                      {activeCompilingState === 'compiling' ? 'WORKING...' : 'COMPILE APP'}
                                    </button>
                                    <button
                                      type="button"
                                      onClick={handleResetEmulator}
                                      className="bg-neutral-800 hover:bg-neutral-700 text-white font-mono text-[8px] py-2 px-2.5 rounded-lg transition-colors cursor-pointer"
                                    >
                                      Reset
                                    </button>
                                  </div>

                                  {/* Static compiler logs scroll */}
                                  <div className="mt-2 bg-black/80 rounded border border-white/5 p-1.5 font-mono text-[7px] uppercase text-[#D7E2EA]/60 max-h-[80px] overflow-y-auto scrollbar-thin space-y-0.5 select-text">
                                    {emulatorLogs.slice(-3).map((log, idx) => (
                                      <div key={idx} className={log.startsWith('SUCCESS') || log.startsWith('✓') ? 'text-green-400' : log.includes('OUTPUT') ? 'text-yellow-400' : ''}>
                                        {log}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ) : (
                                /* Submits Form content mock view (Material design 3!) */
                                <div className="flex-1 flex flex-col justify-between overflow-x-hidden overflow-y-auto scrollbar-none gap-2">
                                  
                                  <p className="text-[8.5px] font-sans font-bold text-[#D7E2EA] shrink-0 select-none flex items-center justify-between">
                                    Submit Review Form
                                    <span className="text-[7px] text-green-400 font-mono bg-green-500/10 px-1 py-0.5 rounded border border-green-500/15">ACTIVE COMPILER OK</span>
                                  </p>

                                  <div className="space-y-1 shrink-0">
                                    <input
                                      type="text"
                                      placeholder="Full Name (e.g. Prof. Rohit)"
                                      value={formName}
                                      onChange={(e) => setFormName(e.target.value)}
                                      maxLength={30}
                                      className="w-full bg-black/70 border border-white/10 rounded-md py-1 px-2 text-[8px] font-mono text-white placeholder-white/20 focus:outline-none focus:border-[#0EA5E9] transition-colors"
                                    />
                                  </div>

                                  <div className="flex gap-1 shrink-0 select-none">
                                    {['Student', 'Alumni', 'Faculty'].map((role) => (
                                      <button
                                        key={role}
                                        type="button"
                                        onClick={() => setFormRole(role)}
                                        className={`text-[7px] font-mono px-2 py-0.5 rounded-full border transition-all cursor-pointer ${
                                          formRole === role 
                                            ? 'bg-[#0EA5E9] text-white border-[#0EA5E9] scale-102 font-bold' 
                                            : 'bg-black/40 text-white/50 border-white/5 hover:border-white/10'
                                        }`}
                                      >
                                        {role}
                                      </button>
                                    ))}
                                  </div>

                                  <div className="space-y-1 shrink-0">
                                    <textarea
                                      placeholder="Remarks (e.g. Kotlin architecture runs very smooth.)"
                                      value={formRemark}
                                      onChange={(e) => setFormRemark(e.target.value)}
                                      maxLength={155}
                                      rows={2}
                                      className="w-full bg-black/70 border border-white/10 rounded-md py-1 px-2 text-[8px] font-mono text-white placeholder-white/20 focus:outline-none focus:border-[#0EA5E9] transition-colors resize-none overflow-y-auto"
                                    />
                                  </div>

                                  <div className="flex justify-between items-center bg-black/35 py-1 px-2 rounded-lg border border-white/5 shrink-0 select-none">
                                    <span className="text-[7.5px] font-mono text-white/40 uppercase">Rating Score:</span>
                                    <div className="flex gap-1">
                                      {[1, 2, 3, 4, 5].map((starIn) => (
                                        <button
                                          key={starIn}
                                          type="button"
                                          onClick={() => setFormRating(starIn)}
                                          className="p-0.5 focus:outline-none active:scale-110 transition-transform cursor-pointer"
                                          title={`Assign rating aggregate: ${starIn}`}
                                        >
                                          <div className={`w-2.5 h-3.5 rounded-sm transition-colors ${starIn <= formRating ? 'bg-amber-400' : 'bg-neutral-800'}`} />
                                        </button>
                                      ))}
                                    </div>
                                  </div>

                                  <div className="flex gap-1.5 shrink-0">
                                    <button
                                      type="button"
                                      onClick={(e) => handleSubmitFeedbackForm(e as any)}
                                      disabled={isSubmittingFeedback}
                                      className="flex-1 bg-green-500 hover:bg-green-600 text-black text-[8px] font-black py-1.5 px-2 rounded transition-all active:scale-95 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-0.5"
                                    >
                                      {isSubmittingFeedback ? 'WRITING...' : 'SAVE INPUT'}
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => setActiveCompilingState('idle')}
                                      className="bg-neutral-800 hover:bg-zinc-700 text-white text-[8px] font-bold py-1.5 px-2 rounded transition-colors cursor-pointer"
                                    >
                                      Recompile
                                    </button>
                                  </div>

                                </div>
                              )}

                            </div>
                          )}

                          {/* VIEW D: ACTIVE JVM SYS TELEMETRY MONITOR SCREEN (ADVANCED) */}
                          {loadedApp === 'monitor' && (
                            <div className="flex-1 flex flex-col text-left gap-2 overflow-hidden select-none">
                              <div className="flex justify-between items-center text-[8px] font-mono text-white/50 border-b border-white/5 pb-1 shrink-0">
                                <span className="text-emerald-400 font-bold uppercase flex items-center gap-1 font-mono">
                                  <Terminal className="w-2.5 h-2.5 text-emerald-400" />
                                  JVM_STRESS_TELEMETRY
                                </span>
                                <span className="animate-pulse text-emerald-500 font-mono text-[7px] font-semibold">STATUS: OK</span>
                              </div>

                              <div className="space-y-1.5 flex-1 overflow-y-auto max-h-[140px] pr-0.5 scrollbar-thin">
                                {/* Live Oscillating Telemetry panel */}
                                <div className="grid grid-cols-2 gap-1.5 shrink-0">
                                  <div className="bg-black/40 border border-white/5 p-1.5 rounded-lg">
                                    <p className="text-[7px] font-mono text-zinc-500 uppercase">CPU FREQ</p>
                                    <p className="text-[10px] font-mono font-bold text-emerald-400">{cpuUtilization * 48} MHz</p>
                                    <div className="w-full bg-neutral-900 h-1 rounded-full overflow-hidden mt-1">
                                      <div className="h-full bg-emerald-400 transition-all duration-300" style={{ width: `${cpuUtilization}%` }} />
                                    </div>
                                  </div>
                                  <div className="bg-black/40 border border-white/5 p-1.5 rounded-lg">
                                    <p className="text-[7px] font-mono text-zinc-500 uppercase">GC HEAP</p>
                                    <p className="text-[10px] font-mono font-bold text-fuchsia-400">{ramUtilization} MB</p>
                                    <div className="w-full bg-neutral-900 h-1 rounded-full overflow-hidden mt-1">
                                      <div className="h-full bg-fuchsia-400 transition-all duration-300" style={{ width: `${(ramUtilization / 420) * 100}%` }} />
                                    </div>
                                  </div>
                                </div>

                                {/* Trigger Controls */}
                                <div className="flex gap-1 shrink-0 select-none">
                                  <button 
                                    type="button"
                                    onClick={() => {
                                      setCpuUtilization(85);
                                      setEmulatorLogs(prev => [...prev, '> STRESS RUN: Spiked all JVM thread limits to max frequency! (Throttle mode engaged)']);
                                      triggerToast("CPU Overclocked to 85%!");
                                    }}
                                    className="bg-emerald-500 hover:bg-emerald-600 text-black font-mono text-[7px] font-extrabold py-1 px-1.5 rounded flex-1 active:scale-95 cursor-pointer"
                                  >
                                    Stress Thread
                                  </button>
                                  <button 
                                    type="button"
                                    onClick={() => {
                                      setRamUtilization(182);
                                      setEmulatorLogs(prev => [...prev, '> GC RECLAIM: System.gc() invoked. Purged heap spaces in 12ms.']);
                                      triggerToast("Garbage collection run complete!");
                                    }}
                                    className="bg-purple-600 hover:bg-purple-700 text-white font-mono text-[7px] font-bold py-1 px-1.5 rounded flex-1 active:scale-95 cursor-pointer"
                                  >
                                    Clean Heap
                                  </button>
                                  <button 
                                    type="button"
                                    onClick={() => {
                                      setEmulatorLogs(prev => [...prev, '⚡ CRITICAL WARNING: NullPointerException simulated in JVM Thread 0xF3', '❌ app_crash debug target reported.']);
                                      triggerToast("NullPointerException injected!");
                                    }}
                                    className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-100 font-mono text-[7px] py-1 px-1 rounded flex-1 active:scale-95 cursor-pointer"
                                  >
                                    Inject Fault
                                  </button>
                                </div>

                                {/* Terminal outputs panel */}
                                <div className="bg-black/85 rounded border border-white/5 p-1.5 font-mono text-[6.5px] uppercase text-[#D7E2EA]/50 space-y-0.5 select-text h-[55px] overflow-y-auto scrollbar-thin">
                                  {emulatorLogs.slice(-5).map((log, idx) => (
                                    <div key={idx} className={log.startsWith('✓') ? 'text-cyan-400 animate-pulse' : log.includes('warning') || log.includes('WARNING') ? 'text-yellow-400' : log.startsWith('⚡') || log.startsWith('❌') ? 'text-red-400 font-extrabold animate-pulse' : ''}>
                                      {log}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}

                          {/* VIEW E: PRESET SMARTPHONE WALLPAPERS CHANGING GALLERY (ADVANCED) */}
                          {loadedApp === 'wallpapers' && (
                            <div className="flex-1 flex flex-col text-left gap-2 overflow-hidden select-none">
                              <div className="flex justify-between items-center text-[8px] font-mono text-white/50 border-b border-white/5 pb-1 shrink-0">
                                <span className="text-yellow-400 font-bold uppercase flex items-center gap-1">
                                  <Layers className="w-2.5 h-2.5 text-yellow-400" />
                                  WALLPAPER_STORE
                                </span>
                                <span className="text-zinc-500 font-mono text-[7px]">FLAGSHIP PRESETS</span>
                              </div>

                              <div className="flex-1 overflow-y-auto max-h-[140px] pr-0.5 scrollbar-thin flex flex-col gap-1.5">
                                <p className="text-[7.5px] font-sans text-white/50 leading-snug">
                                  Instantly apply dynamic responsive color spaces inside the live smartphone render:
                                </p>

                                <div className="grid grid-cols-2 gap-1.5 mt-1">
                                  {[
                                    { id: 'cyber-magenta', name: 'Cyber Magenta', color: 'bg-indigo-955 border-indigo-400' },
                                    { id: 'cyberpunk-emerald', name: 'Emerald Matrix', color: 'bg-emerald-950 border-emerald-400' },
                                    { id: 'digital-blue', name: 'Deep Space Blue', color: 'bg-cyan-950 border-cyan-400' },
                                    { id: 'amoled-carbon', name: 'Amoled Carbon', color: 'bg-neutral-900 border-neutral-600' }
                                  ].map((wall) => (
                                    <button 
                                      key={wall.id}
                                      type="button"
                                      onClick={() => {
                                        setActiveWallpaper(wall.id as any);
                                        triggerToast(`Applied wallpaper: ${wall.name}`);
                                        setEmulatorLogs(prev => [...prev, `> switcher: Rendered dynamic preset ${wall.id}`]);
                                      }}
                                      className={`p-1.5 rounded-lg border text-left flex flex-col gap-1 transition-all active:scale-95 cursor-pointer ${
                                        activeWallpaper === wall.id 
                                          ? 'border-yellow-400 bg-white/5 shadow-[0_0_8px_rgba(250,204,21,0.15)]' 
                                          : 'border-white/5 bg-black/40 hover:bg-white/5'
                                      }`}
                                    >
                                      <div className={`w-full h-4 rounded-sm border border-white/5 ${
                                        wall.id === 'cyber-magenta' ? 'bg-[#18092A]' :
                                        wall.id === 'cyberpunk-emerald' ? 'bg-[#031D0D]' :
                                        wall.id === 'digital-blue' ? 'bg-[#041530]' :
                                        'bg-black'
                                      }`} />
                                      <span className="text-[7.5px] font-mono text-white/85 font-semibold">{wall.name}</span>
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}

                        </div>
                      </div>
                    )}
                  </div>

                  {/* Simulated OS Native Screen Footer Navigation Keys */}
                  <div className="h-6.5 w-full bg-black/60 border-t border-white/5 flex gap-7.5 justify-center items-center pointer-events-auto z-20 shrink-0">
                    <button
                      type="button"
                      onClick={handleResetEmulator}
                      className="w-2 h-2 rounded-full bg-white/30 hover:bg-white transition-all active:scale-110 cursor-pointer"
                      title="Reset Switcher"
                    >
                      <span className="sr-only">App Switcher</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleResetEmulator}
                      className="w-4 h-4 rounded-full border border-neutral-700 hover:border-white/70 active:scale-95 flex items-center justify-center cursor-pointer transition-colors"
                      title="Return to Homescreen launcher"
                    >
                      <div className={`w-1.5 h-1.5 rounded-sm ${
                        activeWallpaper === 'cyberpunk-emerald' ? 'bg-emerald-400' :
                        activeWallpaper === 'digital-blue' ? 'bg-cyan-400' :
                        'bg-[#0EA5E9]'
                      }`} />
                    </button>
                    <button
                      type="button"
                      onClick={handleResetEmulator}
                      className="w-2 h-2 border-r-[1.5px] border-b-[1.5px] border-white/30 rotate-[135deg] hover:border-white transition-all cursor-pointer mr-1 relative"
                      title="Return Context"
                    >
                      <span className="sr-only">Back</span>
                    </button>
                  </div>
                </>
              )}

            </div>
          </div>
          
          {/* Floating Orbiting Tech Badges which dynamically pulse as signals flux */}
          <span className="absolute top-11 -right-[34px] bg-black/95 backdrop-blur-md border border-[#0EA5E9]/30 hover:border-[#0EA5E9] text-white py-1.5 px-2.5 rounded-xl text-xs font-mono shadow-2xl flex items-center gap-1.5 select-none z-20 transition-all duration-300 transform hover:scale-105 animate-pulse">
            <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-extrabold text-[9px] tracking-wide text-white">EMULATOR</span>
          </span>
          
          <span className="absolute bottom-16 -left-[34px] bg-black/95 backdrop-blur-md border border-cyan-400/20 hover:border-cyan-400 text-white py-1.5 px-2.5 rounded-xl text-xs font-mono shadow-2xl flex items-center gap-1.5 select-none z-20 transition-all duration-300 transform hover:scale-105 animate-pulse">
            <Activity className="w-3.5 h-3.5 text-[#0EA5E9]" />
            <span className="font-semibold text-[9px] tracking-wider text-cyan-400">COMPILER_JVM</span>
          </span>
        </div>

        {/* Introduction Title Text */}
        <span className="text-xs uppercase tracking-[0.3em] font-extrabold text-[#0EA5E9] mb-2 inline-flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" /> Welcome Protocol
        </span>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase text-white tracking-tight leading-none mb-4">
          PRANAV SHAHAJI PATIL
        </h1>

        <p className="text-xs sm:text-sm text-[#D7E2EA]/60 max-w-sm mb-8 leading-relaxed font-light">
          Tap the speech bubble below to stream my direct audio introduction, or skip to begin testing modules.
        </p>

        {/* Audio Interaction Hub with Real-Time Spectrum Waves */}
        <div className="bg-[#121212]/90 border-2 border-white/10 rounded-[28px] p-5 sm:p-6 w-[310px] sm:w-[380px] shadow-[0_15px_40px_rgba(0,0,0,0.6)] relative overflow-hidden flex flex-col items-center gap-4 group hover:border-[#0EA5E9]/30 transition-colors">
          
          {/* Animated real-time spectrum spectrogram waveform analyzer */}
          <div className="flex flex-col w-full items-center gap-2">
            <div className="flex items-end justify-center gap-[3px] h-16 w-full px-1">
              {audioWaves.map((height, i) => (
                <motion.div
                  key={i}
                  animate={{ height: `${height}px` }}
                  className="w-[6px] sm:w-[8px] rounded-t-full bg-gradient-to-t from-[#0EA5E9] via-violet-500 to-cyan-400"
                  transition={{ type: 'spring', stiffness: 380, damping: 20 }}
                />
              ))}
            </div>
            <div className="flex justify-between w-full text-[8px] font-mono text-white/30 uppercase tracking-widest px-1 shrink-0 select-none">
              <span>32Hz</span>
              <span className="text-white/40 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block animate-pulse" />
                {speechMode === 'text-to-speech' ? 'HQ VOCAL MODE' : 'LIVE SYNTH CHANNELS'}
              </span>
              <span>22kHz</span>
            </div>
            
            {activeVoiceName && (
              <div className="text-[8px] font-mono text-cyan-400/70 bg-cyan-400/5 px-3 py-1 rounded-lg tracking-wider border border-cyan-400/10 mt-1 max-w-full truncate select-none text-center">
                ACTIVE ENGINE // {activeVoiceName.toUpperCase()}
              </div>
            )}
          </div>

          <div className="flex gap-3 justify-center w-full mt-1.5">
            {isPlayingVoice ? (
              <button
                onClick={handleStopVoice}
                className="flex-1 bg-red-600/10 border border-red-500/20 text-red-400 hover:bg-red-600/20 font-bold text-xs uppercase tracking-wider py-3.5 px-5 rounded-2xl flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 animate-pulse"
                title="Silence the live speaking presentation"
              >
                <VolumeX className="w-4 h-4 text-red-500" />
                Stop / Mute Voice
              </button>
            ) : (
              <div className="text-[10px] font-mono text-zinc-400 bg-zinc-950/40 py-3.5 px-5 rounded-2xl w-full text-center tracking-wider border border-white/5 select-none font-bold uppercase transition-all duration-300">
                {isDoneSpeaking ? "✓ Presentation Streams Concluded" : "🔊 Vocal Bio Auto-Started..."}
              </div>
            )}
          </div>
        </div>

        </div> {/* CLOSE CENTER COLUMN */}

        {/* RIGHT HUD: Quick Features HUD (visible only on lg+) */}
        <div className="hidden lg:col-span-3 lg:flex flex-col gap-4 text-left font-mono z-20">
          <div className="bg-white/5 border border-white/11 rounded-2xl p-4 flex flex-col gap-3 backdrop-blur-md shadow-2xl relative overflow-hidden group hover:border-[#0EA5E9]/45 transition-all duration-300">
            <div className="text-[10px] font-bold text-yellow-400 uppercase tracking-[0.2em] border-b border-white/5 pb-2 animate-pulse">
              PORTFOLIO CORE INDICES
            </div>
            
            <div className="space-y-3 text-[11px]">
              <div className="flex gap-2 items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1 shrink-0 animate-ping" />
                <div className="flex flex-col">
                  <span className="font-semibold text-white uppercase text-[9.5px]">NATIVE SPECIALIST</span>
                  <span className="text-[8px] text-[#D7E2EA]/40 leading-snug">Kotlin architecture, SQLite databases & android UI structures</span>
                </div>
              </div>

              <div className="flex gap-2 items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-[#0EA5E9] mt-1 shrink-0" />
                <div className="flex flex-col">
                  <span className="font-semibold text-white uppercase text-[9.5px]">HIGH FIDELITY AUDIO</span>
                  <span className="text-[8px] text-[#D7E2EA]/40 leading-snug">Formant filters & Web Audio oscillators synthesized dynamically</span>
                </div>
              </div>

              <div className="flex gap-2 items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1 shrink-0" />
                <div className="flex flex-col">
                  <span className="font-semibold text-white uppercase text-[9.5px]">STACK PANELS</span>
                  <span className="text-[8px] text-[#D7E2EA]/40 leading-snug">3D overlapping card visual decks driven by framer layouts</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col gap-2.5 backdrop-blur-md shadow-2xl relative overflow-hidden group hover:border-[#0EA5E9]/30 transition-all duration-300">
            <div className="text-[10px] font-bold text-white/80 uppercase tracking-[0.2em] border-b border-white/5 pb-2 flex justify-between items-center">
              <span>SCHEMA COUNTERS</span>
              <span className="text-[8px] bg-white/10 px-1 py-0.5 rounded font-mono font-medium text-white/50">{sqliteRows.length} RECORDS</span>
            </div>
            <div className="space-y-2">
              <div className="p-1.5 rounded bg-black/40 border border-white/5 text-[9px]">
                <div className="flex justify-between font-bold text-[#D7E2EA]/80 mb-0.5 uppercase">
                  <span className="truncate max-w-[124px]">Pranav Patil</span>
                  <span className="text-[#0EA5E9]">5 ★</span>
                </div>
                <p className="text-[#D7E2EA]/50 font-sans italic line-clamp-1">"Kotlin build compiled with 0 warnings."</p>
              </div>

              <div className="p-1.5 rounded bg-black/40 border border-white/5 text-[9px]">
                <div className="flex justify-between font-bold text-[#D7E2EA]/80 mb-0.5 uppercase">
                  <span className="truncate max-w-[124px]">Lead Evaluator</span>
                  <span className="text-[#0EA5E9]">5 ★</span>
                </div>
                <p className="text-[#D7E2EA]/50 font-sans italic line-clamp-1">"Excellent responsive animation stack structure."</p>
              </div>
            </div>
          </div>
        </div>

      </div> {/* CLOSE THREE-COLUMN CONTAINER GRID */}

      {/* Scroll down to Enter Indicator (Replacing old "Enter Portfolio" button as requested) */}
      <div className="relative z-10 w-full max-w-sm pb-6 sm:pb-12 flex justify-center mt-2 pointer-events-none select-none">
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1.5"
        >
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#D7E2EA]/60 font-black animate-pulse text-center">
            Scroll or Swipe Up to Enter
          </span>
          <div className="w-5.5 h-9 rounded-full border-2 border-white/15 flex justify-center p-1 bg-white/5 backdrop-blur-md shadow-2xl">
            <motion.div 
              animate={{ y: [0, 10, 0], opacity: [0.8, 0.2, 0.8] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="w-1.5 h-1.5 rounded-full bg-[#0EA5E9]"
            />
          </div>
        </motion.div>
      </div>

    </div>
  );
}
