import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'mr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (keyOrText: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {},
  mr: {
    // Nav Links
    "Work": "प्रकल्प",
    "Services": "सेवा",
    "Approach": "दृष्टिकोन",
    "Skills": "कौशल्ये",
    "Experience": "अनुभव",
    "Download CV": "सीव्ही डाउनलोड",
    "Let's Talk": "संपर्क करा",
    "Available for New Project": "नवीन प्रोजेक्टसाठी उपलब्ध",
    "Available for new opportunities": "नवीन संधींसाठी उपलब्ध",
    "Available": "उपलब्ध",
    "Designed purposefully": "हेतूने डिझाइन केलेले",
    "Built offline first": "ऑफलाइन प्रथम बांधलेले",
    "Explore Sitemap": "साइटमॅप एक्सप्लोर करा",
    "Connect With Me": "माझ्याशी संपर्क साधा",
    "Back to top": "वर जा",
    "Top / Home": "मुख्यपृष्ठ",
    "Who I Am": "मी कोण आहे",
    "Featured Work": "निवडक काम",
    "Core Services": "मुख्य सेवा",
    "What I Build": "मी काय तयार करतो",
    "Our Approach": "कार्यपद्धत",
    "Tech Stack": "तंत्रज्ञान संग्रह",
    "Technical Skills": "तांत्रिक कौशल्ये",
    "Awards": "पुरस्कार",
    "Recognitions": "मान्यता",
    "Honors & Accolades": "सन्मान आणि सन्मानचिन्हे",
    "Project Excellence": "प्रकल्प उत्कृष्टता",
    "Industrial Recognition": "औद्योगिक ओळख",
    "Academic Honors": "शैक्षणिक सन्मान",
    "Technical Competition": "तांत्रिक स्पर्धा",
    "Issued By": "द्वारे जारी केले",
    "Showcasing academic honors, industrial training certificates, and project execution achievements throughout my professional evolution.": "माझ्या व्यावसायिक प्रवासातील शैक्षणिक सन्मान, औद्योगिक प्रशिक्षण प्रमाणपत्रे आणि प्रकल्प यशाचे प्रदर्शन.",
    "Certificate of Appreciation - Institutional Software Systems": "प्रशंसापत्र - संस्थात्मक सॉफ्टवेअर प्रणाल्या",
    "Awarded for extraordinary contributions in designing, developing, and deploying the institutional-grade Feedback Management System and the Departmental Quiz Competition Platform, which streamlined administrative workflows.": "प्रशासकीय कार्यप्रवाह सुलभ करणाऱ्या संस्थात्मक-दर्जाच्या फीडबॅक मॅनेजमेंट सिस्टीम आणि विभागीय क्विझ स्पर्धा प्लॅटफॉर्मची रचना, विकास आणि अंमलबजावणी मधील उत्कृष्ट योगदानाबद्दल प्रदान करण्यात आले.",
    "Outstanding Performance Intern Certificate": "उत्कृष्ट कामगिरी इंटर्न प्रमाणपत्र",
    "Recognized for excellent execution during a 3-month industrial software training program. Specially lauded for drafting strategic project maps and crafting modular Android application designs using Java and SQLite Room DB structures.": "३ महिन्यांच्या औद्योगिक सॉफ्टवेअर प्रशिक्षण कार्यक्रमादरम्यान उत्कृष्ट कामगिरीबद्दल गौरवविण्यात आले. धोरणात्मक प्रकल्प आराखडा तयार करणे आणि जावा व SQLite रूम डेटाबेस वापरून मॉड्युलर अँड्रॉइड अॅपचे उत्कृष्ट डिझाइन केल्याबद्दल विशेष कौतुक करण्यात आले.",
    "AI & Technical Event": "एआय आणि तांत्रिक स्पर्धा",
    "Rajarambapu Institute of Technology, Rajaramnagar": "राजारामबापू इन्स्टिट्यूट ऑफ टेक्नॉलॉजी, राजारामनगर",
    "AI FUSION 2.0 Certificate": "AI FUSION 2.0 प्रमाणपत्र",
    "Awarded for successful participation in the \"Decode\" event under AI FUSION 2.0, jointly organized by the Department of CSE (AI & ML) and the Students Association of Artificial Intelligence (SAAI).": "संगणक विज्ञान आणि अभियांत्रिकी (AI & ML) विभाग आणि स्टुडंट्स असोसिएशन ऑफ आर्टिफिशिअल इंटेलिजन्स (SAAI) द्वारे संयुक्तपणे आयोजित AI FUSION 2.0 अंतर्गत 'Decode' स्पर्धेत यशस्वी सहभागाबद्दल प्रदान करण्यात आले.",
    "All": "सर्व",
    "Real Project": "वास्तविक प्रकल्प",
    "Exploration": "संशोधन/चाचणी",
    "View All Work": "सर्व काम पहा",
    "View Certificate": "डिजिटल प्रमाणपत्र पहा",
    "View Verified Certificate": "सत्यापित प्रमाणपत्र पहा",
    "Issued date:": "जारी तारीख:",

    // Profiles & Roles
    "Pranav Patil": "प्रणव पाटील",
    "Pranav Shahaji Patil": "प्रणव शहाजी पाटील",
    "Android Specialist": "अँड्रॉइड तज्ञ",
    "Creative Developer": "क्रिएटिव्ह डेव्हलपर",
    "Creative Software Developer & Android Specialist": "क्रिएटिव्ह सॉफ्टवेअर डेव्हलपर आणि अँड्रॉइड तज्ञ",
    "Creative Software Developer": "क्रिएटिव्ह सॉफ्टवेअर डेव्हलपर",
    "Lead Android Developer": "अँड्रॉइड डेव्हलपर",
    "Principal UI/UX Designer": "मुख्य UI/UX डिझायनर",
    "Lead Creative Developer": "मुख्य क्रिएटिव्ह डेव्हलपर",
    "Backend Architect": "बॅकएंड आर्किटेक्ट",
    "Full-Stack Developer": "फुल-स्टॅक डेव्हलपर",
    "Full-Stack Engineer": "फुल-स्टॅक इंजिनिअर",
    "Web App": "वेब ॲप",

    // Section Headers & Subtext
    "Featured projects showcasing end-to-end development, fluid UI/UX, and highly optimized database engineering.": "अँड्रॉइड अॅप्स, फ्लुइड युझर इंटरफेस आणि ऑप्टिमाइझ्ड डेटाबेस इंजिनिअरिंगचे प्रदर्शन करणारे प्रमुख प्रकल्प.",
    "Professional, responsive mobile and full-stack development crafted with absolute architectural precision.": "पूर्ण आर्किटेक्चरल अचूकतेसह बनविलेली व्यावसायिक आणि जलद मोबाईल व वेब डेव्हलपमेंट.",
    "A structured 4-phase creative lifecycle that powers fluid execution and reliable systems.": "प्रणालीचे सुनियोजित बांधकाम आणि उत्कृष्ट अंमलबजावणी करणारी ४-टप्प्यांची प्रक्रिया.",
    "A curated collection of industry-standard tools, programming frameworks, and databases.": "उद्योग-मानक साधने, प्रोग्रामिंग फ्रेमवर्क्स आणि डेटाबेसचा संग्रह.",
    "Real-world training, academic achievements, and foundational team experiences.": "औद्योगिक अनुभव, शैक्षणिक यश आणि महत्त्वाचे देशांतर्गत प्रकल्प.",
    "Let's create something monumental together.": "चला एकत्र काहीतरी भव्य आणि नाविन्यपूर्ण बनवूया.",
    "Whether you have an idea for a custom Android application or need responsive web design.": "तुमच्याकडे नवीन अँड्रॉइड अॅपची कल्पना असो किंवा वेब डिझाईनची गरज, मला नक्की सांगा.",
    "Let's collaborate": "चला एकत्र काम करूया",
    "Crafting reliable, responsive mobile and web experiences that perform under loading constraints and delight users globally.": "अडथळ्यांशिवाय चालणारे आणि जगभरातील युझर्सना आनंद देणारे दर्जेदार मोबाईल आणि वेब अनुभव निर्माण करणे.",

    // Tagline / Bio
    "creative developer passionate about building next-gen android systems, robust backend logic, and striking interactive interfaces.": "मी पुढील पिढीच्या अँड्रॉइड प्रणाली, मजबूत बॅकएंड लॉजिक आणि आकर्षक युझर इंटरफेस तयार करण्यास उत्सुक असलेला एक क्रिएटिव्ह डेव्हलपर आहे.",
    "Creative Software Developer skilled in Java, Android app development, and UI/UX prototyping. I design intuitive user interfaces and know how to build them so they work perfectly. I am ready to contribute to the IT industry, backed by a successful 3-month internship at AppVishwa Software Solutions Pvt. Ltd and real-world projects like the Feedback Management System. Highly interested in creating innovative mobile applications, with strong problem-solving skills and a team-focused mindset.": "मी जावा, अँड्रॉइड अॅप डेव्हलपमेंट आणि UI/UX प्रोटोटाइपिंगमध्ये कुशल असलेला क्रिएटिव्ह सॉफ्टवेअर डेव्हलपर आहे. मी सुलभ युझर इंटरफेस डिझाइन करतो आणि ते उत्कृष्ट चालतील अशा प्रकारे विकसित करतो. अॅपविश्व सॉफ्टवेअर सोल्यूशन्स प्रा. लि. मधील यशस्वी ३ महिन्यांच्या इंटर्नशिपच्या आणि फीडबॅक मॅनेजमेंट सिस्टीमसारख्या वास्तविक प्रकल्पांच्या अनुभवाससह मी आयटी क्षेत्रात योगदान देण्यास तयार आहे. माझी नवीन मोबाईल अॅप्लिकेशन्स तयार करण्यात मोठी आवड असून माझ्यात मजबूत समस्या निवारण कौशल्ये आणि सायन्स युझर इंटरफेस आहे.",

    // Education Degrees & Orgs
    "Nanasaheb Mahadik Polytechnic Institute": "नानासाहेब महाडिक पॉलिटेक्निक इन्स्टिट्यूट",
    "Diploma in Computer Engineering": "संगणक अभियांत्रिकी पदविका (डिप्लोमा)",
    "Peth, Maharashtra, India": "पेठ, महाराष्ट्र, भारत",
    "Islampur High School, Islampur": "इस्लामपूर हायस्कूल, इस्लामपूर",
    "Secondary School Certificate (SSC)": "माध्यमिक शाळा प्रमाणपत्र (SSC)",
    "Islampur, Maharashtra, India": "इस्लामपूर, महाराष्ट्र, भारत",

    // Education Highlights
    "Rigorous training in Object-Oriented Programming (OOP) & Core Java concepts plus robust DBMS / SQL systems.": "ऑब्जेक्ट-ओरिएंटेड प्रोग्रामिंग (OOP) आणि कोअर जावा संकल्पनांसह मजबूत DBMS/SQL सिस्टीमचे सखोल प्रशिक्षण.",
    "Executed multiple academic capstone projects utilizing a strict 4-phase software lifecycle: strategic mapping, system blue-printing, clean compilation, and performance testing.": "योजना आखणे, ब्ल्यूप्रिंट डिझाइन करणे, अचूक कोडिंग आणि कार्यक्षमता चाचणी अशा ४-टप्प्यांच्या कठोर सॉफ्टवेअर डेव्हलपमेंट प्रक्रियेचा वापर करून एकापेक्षा जास्त शैक्षणिक प्रकल्प पूर्ण केले.",
    "Graduated with strong fundamental academic performance": "उत्कृष्ट शैक्षणिक गुणांसह यश मिळवून उत्तीर्ण",
    "Active participant in regional engineering and computer science clubs": "प्रादेशिक अभियांत्रिकी आणि संगणक शास्त्र क्लब्समध्ये सक्रिय सहभाग",

    // Experience
    "AppVishwa Software Solutions Pvt. Ltd.": "अॅपविश्व सॉफ्टवेअर सोल्यूशन्स प्रा. लि.",
    "Software Development Intern": "सॉफ्टवेअर डेव्हलपमेंट इंटर्न",
    "Urun Islampur, Maharashtra, India": "उरण इस्लामपूर, महाराष्ट्र, भारत",
    "Completed an intensive 3-month industrial training program, rotating through foundational modern software stacks to build full-lifecycle solutions.": "पायाभूत आधुनिक सॉफ्टवेअर तंत्रज्ञानाचा वापर करून संपूर्ण जीवनचक्र उपाय तयार करण्यासाठी ३ महिन्यांचा सखोल औद्योगिक प्रशिक्षण कार्यक्रम यशस्वीरित्या पूर्ण केला.",
    "Strategic Analysis & Discovery": "धोरणात्मक विश्लेषण आणि संशोधन",
    "Formulated precise scope audits and strategic project maps. Mastered target audience assessment and constraint-mapping for computational Python logic.": "प्रकल्पाची व्याप्ती आणि धोरणात्मक आराखडा तयार केला. युझर गरजांचे मूल्यांकन करणे आणि गणिताच्या पायथन लॉजिकसाठी मर्यादा निश्चित करणे शिकलो.",
    "UI Block Architecture & Design": "UI ब्लॉक आर्किटेक्चर आणि डिझाइन",
    "Designed interactive layout flows, blueprint designs, and context specifications. Translated Figma mockups into fully fluid web prototypes.": "परस्परसंवादी मांडणी आराखडा, ब्ल्यूप्रिंट डिझाइन आणि वैशिष्ट्ये तयार केली. फिग्मा मॉकअप्सचे पूर्णपणे फ्लुइड वेब प्रोजेक्टमध्ये रूपांतर केले.",
    "Modular Development & Code": "मॉड्युलर डेव्हलपमेंट आणि कोडिंग",
    "Engineered responsive mobile applications using Core Java, XML, and local SQLite Room DB structures following strict clean MVVM patterns.": "कोअर जावा, XML आणि स्थानिक SQLite रूम डेटाबेस रचनांचा वापर करून कठोर क्लीन MVVM पॅटर्ननुसार गतिमान मोबाईल अॅप्लिकेशन्सचे कोडिंग केले.",
    "Performance QA & Safe Deliveries": "गुणवत्ता चाचणी आणि सुरक्षित डिलिव्हरी",
    "Executed runtime performance audits, monitored frame-rate stability, avoided performance memory leaks, and utilized Git pipelines for safe team delivery.": "रनटाईम परफॉर्मन्स ऑडिट केले, फ्रेम-रेट स्थिरतेवर लक्ष ठेवले, मेमरी गळती टाळली आणि सुरक्षित सांघिक डिलिव्हरीसाठी गिट (Git) पाईपलाईन्सचा वापर केला.",

    // Services
    "Android Custom Apps": "अँड्रॉइड सानुकूल अॅप्स",
    "End-to-end native Android apps developed with Java/Kotlin, customized offline caching (Room DB), API sync (Retrofit), and modern Material Design 3 interfaces.": "जावा/कोटलिनद्वारे विकसित केलेली परिपूर्ण अँड्रॉइड अॅप्स, सानुकूलित offline कॅशिंग (रूम डेटाबेस), एपीआय सिंक (रेट्रोफिट), आणि आधुनिक मटेरियल डिझाईन ३ चे आकर्षक चेहरे.",
    "UI/UX Design & Prototyping": "UI/UX डिझाइन आणि प्रोटोटायपिंग",
    "Creating professional Figma mockups, user flow blueprints, wireframes, and digital interactive prototypes designed to maximize engagement and product clarity.": "उत्पादनाची स्पष्टता वाढवण्यासाठी उत्कृष्ट फिग्मा मॉकअप्स, युझर फ्लो ब्ल्यूप्रिंट्स, वायरफ्रेम्स आणि परस्परसंवादी डिजिटल प्रोटोटाइप्स तयार करणे.",
    "Full-Stack Web Architectures": "फुल-स्टॅक वेब आर्किटेक्चर",
    "Designing fully responsive frontends with HTML/CSS/JS alongside custom database interactions (databases, DBMS) or lightweight backends.": "सानुकूलित डेटाबेस संवाद आणि हलक्या बॅकएंडसह HTML/CSS/JS द्वारे संपूर्ण रिस्पॉन्सिव्ह फ्रंटएंड्स डिझाइन करणे.",
    "Embedded SQLite / DBMS Systems": "एम्बेडेड SQLite / DBMS प्रणाली",
    "Designing highly optimized local persistent storage architectures, data sanitization pipelines, and database relations for desktop or android platforms.": "डेस्कटॉप किंवा अँड्रॉइड प्लॅटफॉर्मसाठी खूप ऑप्टिमाइझ केलेल्या स्थानिक डेटा साठवण रचना, डेटा शुद्धीकरण पाईपलाईन्स आणि डेटाबेस संबंध डिझाइन करणे.",
    "API Integrations & JWT Security": "API एकत्रीकरण आणि JWT सुरक्षा",
    "Linking systems securely through remote REST API engines with robust client authorization (JSON Web Tokens), OkHttp interceptors, and data stream parsing.": "मजबूत क्लायंट प्राधिकरण (JSON वेब टोकन्स), OkHttp इंटरसेप्टर्स आणि डेटा स्ट्रीम पार्सिंगसह टेलिफोनिक REST API इंजिनद्वारे सुरक्षितपणे प्रणाल्या जोडणे.",

    // Specific Projects Metadata (Selected Work)
    "StreetVendorConnector": "स्ट्रीटव्हेंडर कनेक्टर (StreetVendorConnector)",
    "Full-Stack Solution": "फुल-स्टॅक प्रणाली",
    "A comprehensive multi-platform ecosystem bridging the gap between street vendors and local customers via real-time location discovery.": "स्थानिक विक्रेते आणि ग्राहक यांच्यातील दरी रिअल-टाईम लोकेशनद्वारे मिटवणारी एक सर्वसमावेशक आणि रिस्पॉन्सिव्ह मोबाईल प्रणाली.",
    
    "Feedback Management System": "फीडबॅक मॅनेजमेंट सिस्टीम (Feedback Management)",
    "Academic App": "शैक्षणिक ॲप",
    "An institutional-grade evaluation suite created to streamline course audits. Designed interactive feedback loops, completed automated UX QA testing.": "संस्थात्मक मूल्यमापन सुलभ करण्यासाठी तयार केलेले शैक्षणिक अॅप. फीडबॅक मूल्यांकन आणि स्वयंचलित चाचणीसह डिझाइन केलेले.",
    
    "College Quiz Platform": "कॉलेज क्विझ प्लॅटफॉर्म",
    "An interactive real-time examination web portal designed and built to host department-wide competitions.": "गुणवत्तापूर्ण परीक्षा आणि लाइव्ह स्पर्धांचे सुलभ आयोजन करण्यासाठी तयार केलेले परस्परसंवादी रिअल-टाईम वेब पोर्टल.",
    
    "Creative Engineering Sandbox": "क्रिएटिव्ह इंजिनिअरिंग सँडबॉक्स",
    "A striking, motion-heavy interactive laboratory displaying fluid calculations, vector mathematics, and highly optimized layouts.": "परस्परसंवादी गणिते, वेक्टर गणित आणि उत्कृष्ट मांडणी दर्शविणारे एक प्रगत आणि गतिमान दालन.",
    
    "Smart Attendance System": "स्मार्ट हजेरी प्रणाली (Attendance System)",
    "Academic Project": "शैक्षणिक प्रकल्प",
    "An automated student tracking platform integrating face recognition with academic management systems.": "चेहरा ओळखण्याच्या (फेस रेकग्निशन) तंत्रज्ञानाचा वापर करून विद्यार्थी हजेरी नोंदवणारी एक स्वयंचलित प्रणाली.",

    "EcoBuddy": "इकोबडी (EcoBuddy)",
    "An offline-first Android app tracking eco-friendly actions with a custom SavingsEngine algorithm computing real-time CO2 and financial savings by aggregating Room Database records with configurable environmental multipliers.": "एक ऑफलाइन-फर्स्ट अँड्रॉइड अॅप जे पर्यावरणीय कृतींचा मागोवा घेते, सानुकूलित SavingsEngine अल्गोरिदमद्वारे रिअल-टाईम CO2 आणि पैशांच्या बचतीची गणना करते.",
    "Developed custom SavingsEngine algorithm computing real-time CO2 and financial savings by aggregating Room Database records with configurable environmental multipliers.": "सानुकूलित SavingsEngine अल्गोरिदम विकसित केला जो विविध निकषांचा वापर करून रिअल-टाईम CO2 आणि वित्‍तीय बचतीचा मागोवा घेऊन रूम डेटाबेस रेकॉर्डची सांगड घालतो.",
    "Implemented a dynamic gamification system parsing historical database thresholds to programmatically unlock UI achievement badges using vector drawable ColorFilter manipulation.": "ऐतिहासिक डेटाबेस थ्रेशोल्ड पार्स करून प्रोग्रामॅटिकली विविध यश पदके अनलॉक करणारी गतिमान गेमिंग प्रणाली विकसित केली.",
    "Integrated all I/O operations on ExecutorService thread pools ensuring 60fps UI performance, plus background hourly eco-tip notifications via AlarmManager + BroadcastReceiver with BOOT_COMPLETED reboot persistence.": "सर्व डेटा ट्रान्सफर ExecutorService थ्रेड पूलवर राबवून उत्तम ६०fps कामगिरी सुनिश्चित केली तसेच बूट झाल्यानंतरही टिकणाऱ्या अलार्म मॅनेजर व ब्रॉडकास्ट रिसीव्हरद्वारे बॅकग्राउंड सूचना मिळवल्या.",
    "Decoupled database I/O using dedicated ExecutorService thread pools to keep design UI perfectly fluid.": "डेटाबेसचे काम पूर्णपणे वेगळे ठेवण्यासाठी आणि युझर इंटरफेस अगदी फ्लुइड राहण्यासाठी स्वतंत्र ExecutorService थ्रेड पूल्सचा अत्यंत प्रभावी वापर.",
    "Assured flawless 60fps screen execution with zero database blockages.": "शून्य डेटाबेस अडथळ्यांसह परिपूर्ण ६०fps स्क्रीन कामगिरी आणि वेगवान कार्यक्षमतेची हमी.",

    // Process Steps
    "Requirement Sourcing": "गरजांचे मुल्यांकन आणि संशोधन",
    "Architecture Definition": "रचना आणि आराखडा निश्चित करणे",
    "Clean Compilation": "अचूक कोडिंग आणि संकलन",
    "Performance Testing": "गुणवत्ता आणि परफॉर्मन्स चाचणी",
    "Deploy & Observe": "प्रणाली तैनात आणि देखरेख"
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('portfolio_preferred_lang');
      if (saved === 'mr' || saved === 'en') {
        return saved;
      }
    } catch (e) {}
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('portfolio_preferred_lang', lang);
    } catch (e) {}
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'mr' : 'en');
  };

  // Translation function
  const t = (keyOrText: string): string => {
    if (language === 'en') return keyOrText;
    
    // Check if key/text exists in our MR translations
    const cleanKey = keyOrText ? keyOrText.trim() : '';
    if (TRANSLATIONS.mr[cleanKey]) {
      return TRANSLATIONS.mr[cleanKey];
    }
    
    return keyOrText;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
