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
    "Quick Controls": "त्वरित नियंत्रणे",
    "Build": "निर्मिती",
    "Download CV": "सीव्ही डाउनलोड",
    "Let's Talk": "संपर्क करा",
    "MENU": "मेन्यू",
    "CLOSE": "बंद करा",
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
    "creative developer passionate about building next-gen android apps, exploring electronics & computing systems, and crafting responsive web interfaces.": "पुढील पिढीच्या अँड्रॉइड ॲप्स, इलेक्ट्रॉनिक्स आणि कॉम्प्युटिंग सिस्टीम्स एक्सप्लोर करणारा आणि आकर्षक वेब इंटरफेस बनवणारा क्रिएटिव्ह डेव्हलपर.",
    "creative developer passionate about building next-gen android systems, embedded IoT architectures, and striking interactive interfaces.": "पुढील पिढीच्या अँड्रॉइड सिस्टीम्स, एम्बेडेड IoT आर्किटेक्चर्स आणि आकर्षक परस्परसंवादी इंटरफेस विकसित करण्यास उत्सुक असलेला एक क्रिएटिव्ह डेव्हलपर.",
    "creative developer passionate about building next-gen android systems, robust backend logic, and striking interactive interfaces.": "मी पुढील पिढीच्या अँड्रॉइड प्रणाली, मजबूत बॅकएंड लॉजिक आणि आकर्षक युझर इंटरफेस तयार करण्यास उत्सुक असलेला एक क्रिएटिव्ह डेव्हलपर आहे.",
    "Creative Software Developer & B.Tech Undergrad (ECE)": "क्रिएटिव्ह सॉफ्टवेअर डेव्हलपर आणि बी.टेक पदवीधर (ECE)",
    "Creative Software Developer & Electronics/Computer Engineering Undergrad": "क्रिएटिव्ह सॉफ्टवेअर डेव्हलपर आणि इलेक्ट्रॉनिक्स/कॉम्प्युटर इंजिनिअरिंग विद्यार्थी",
    "Completed Diploma in Computer Engineering and currently pursuing B.Tech in Electronics & Computer Engineering at Dr. D.Y. Patil Technical Campus, Varale, Pune. Skilled in Java, Android app development, and UI/UX prototyping. Eager to learn, innovate, and contribute to the tech industry, backed by a successful 3-month internship at AppVishwa Software Solutions Pvt. Ltd and real-world project deliveries.": "कॉम्प्युटर इंजिनिअरिंगचा डिप्लोमा यशस्वीरीत्या पूर्ण करून सध्या डॉ. डी. वाय. पाटील टेक्निकल कॅम्पस, वराळे, पुणे येथे इलेक्ट्रॉनिक्स आणि कॉम्प्युटर इंजिनिअरिंगमध्ये बी.टेक पदवी घेत आहे. जावा, अँड्रॉइड ॲप डेव्हलपमेंट आणि UI/UX प्रोटोटायपिंगमध्ये कुशल. अॅपविश्व सॉफ्टवेअर सोल्यूशन्स प्रा. लि. मधील ३ महिन्यांच्या इंटर्नशिप आणि प्रोजेक्ट्सच्या अनुभवासह तंत्रज्ञान क्षेत्रात शिकण्यास आणि योगदान देण्यास सज्ज.",

    // Education Degrees & Orgs
    "Dr. D.Y. Patil Technical Campus, Varale": "डॉ. डी. वाय. पाटील टेक्निकल कॅम्पस, वराळे",
    "Savitribai Phule Pune University (SPPU)": "सावित्रीबाई फुले पुणे विद्यापीठ (SPPU)",
    "Maharashtra State Board of Technical Education (MSBTE)": "महाराष्ट्र राज्य तंत्र शिक्षण मंडळ (MSBTE)",
    "Maharashtra State Board (SSC)": "महाराष्ट्र राज्य माध्यमिक मंडळ (SSC)",
    "Affiliation:": "संलग्नता / मंडळ:",
    "B.Tech in Electronics & Computer Engineering": "बी.टेक - इलेक्ट्रॉनिक्स आणि कॉम्प्युटर इंजिनिअरिंग",
    "B.Tech in Electronics and Computer Engineering": "बी.टेक - इलेक्ट्रॉनिक्स आणि कॉम्प्युटर इंजिनिअरिंग",
    "2026 - 2029 (Currently Pursuing)": "२०२६ - २०२९ (सध्या शिकत आहे)",
    "Varale, Talegaon, Pune, Maharashtra, India": "वराळे, तळेगाव, पुणे, महाराष्ट्र, भारत",
    "Affiliated to Savitribai Phule Pune University (SPPU) — undergraduate student in Electronics & Computer Engineering.": "सावित्रीबाई फुले पुणे विद्यापीठाशी संलग्न (SPPU) — इलेक्ट्रॉनिक्स आणि कॉम्प्युटर इंजिनिअरिंग पदवीधर विद्यार्थी.",
    "Embarking on the B.Tech journey in Electronics and Computer Engineering, eager to explore computing hardware, embedded IoT systems, and scalable software architectures.": "इलेक्ट्रॉनिक्स आणि कॉम्प्युटर इंजिनिअरिंगमध्ये बी.टेकच्या प्रवासाची सुरुवात, कॉम्प्युटिंग हार्डवेअर, एम्बेडेड IoT सिस्टीम्स आणि सॉफ्टवेअर आर्किटेक्चर शिकण्यास उत्सुक.",
    "Newly admitted Direct Second Year (DSE) undergraduate embarking on the B.Tech journey in Electronics and Computer Engineering.": "इलेक्ट्रॉनिक्स आणि कॉम्प्युटर इंजिनिअरिंगमध्ये बी.टेकच्या प्रवासाची सुरुवात करणारा नवनिर्वाचित डायरेक्ट सेकंड इयर (DSE) पदवीधर विद्यार्थी.",
    "Eager to explore modern computing hardware, embedded IoT systems, and integrate with scalable mobile and full-stack software.": "आधुनिक कॉम्प्युटिंग हार्डवेअर, एम्बेडेड IoT सिस्टीम्स एक्सप्लोर करण्यास आणि स्केलेबल मोबाईल व फुल-स्टॅक सॉफ्टवेअर तयार करण्यास उत्सुक.",
    "Nanasaheb Mahadik Polytechnic Institute": "नानासाहेब महाडिक पॉलिटेक्निक इन्स्टिट्यूट",
    "Diploma in Computer Engineering (Completed)": "संगणक अभियांत्रिकी पदविका / डिप्लोमा (यशस्वीरीत्या पूर्ण)",
    "Diploma in Computer Engineering": "संगणक अभियांत्रिकी पदविका (डिप्लोमा)",
    "08/2022 - 06/2025 (Completed)": "०८/२०२२ - ०६/२०२५ (पूर्ण)",
    "Peth, Maharashtra, India": "पेठ, महाराष्ट्र, भारत",
    "Islampur High School, Islampur": "इस्लामपूर हायस्कूल, इस्लामपूर",
    "Secondary School Certificate (SSC)": "माध्यमिक शाळा प्रमाणपत्र (SSC)",
    "Islampur, Maharashtra, India": "इस्लामपूर, महाराष्ट्र, भारत",

    // Education Highlights
    "Affiliated to MSBTE (Maharashtra State Board of Technical Education) — successfully completed 3-year Diploma program with distinction.": "महाराष्ट्र राज्य तंत्र शिक्षण मंडळाशी संलग्न (MSBTE) — ३ वर्षांचा पदविका/डिप्लोमा कार्यक्रम विशेष प्रावीण्यासह यशस्वीरीत्या पूर्ण.",
    "Strong foundation in Object-Oriented Programming (OOP), Core Java, and DBMS / SQL systems with deployed capstone projects.": "ऑब्जेक्ट-ओरिएंटेड प्रोग्रामिंग (OOP), कोअर जावा आणि DBMS/SQL सिस्टीमचा मजबूत पाया व शैक्षणिक प्रकल्पांची यशस्वी अंमलबजावणी.",
    "Successfully completed 3-year Diploma program with strong foundation in Object-Oriented Programming (OOP), Core Java, and DBMS / SQL systems.": "ऑब्जेक्ट-ओरिएंटेड प्रोग्रामिंग (OOP), कोअर जावा आणि DBMS/SQL सिस्टीमच्या मजबूत पायाभरणीसह ३ वर्षांचा डिप्लोमा कार्यक्रम यशस्वीरित्या पूर्ण केला.",
    "Delivered institutional software systems (Feedback Management System & Quiz Platform) utilizing a structured 4-phase software lifecycle.": "सुनियोजित ४-टप्प्यांच्या सॉफ्टवेअर प्रक्रियेचा वापर करून संस्थात्मक सॉफ्टवेअर सिस्टीम्स (फीडबॅक मॅनेजमेंट आणि क्विझ प्लॅटफॉर्म) यशस्वीरीत्या विकसित व तैनात केले.",
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
    "Academic Project Delivery": "शैक्षणिक प्रकल्प विकास",
    "End-to-end software development and documentation for Degree, Diploma, BCA, MCA, and Engineering (CS/IT). Providing fully functional source code, database architectures, and report/synopsis guidelines.": "डिग्री, डिप्लोमा, BCA, MCA आणि इंजिनिअरिंग (CS/IT) साठी संपूर्ण सॉफ्टवेअर डेव्हलपमेंट आणि दस्तऐवजीकरण (Documentation). यामध्ये पूर्णपणे कार्यरत सोर्स कोड, डेटाबेस आर्किटेक्चर आणि प्रोजेक्ट रिपोर्ट/सिनोप्सिसचा समावेश आहे.",
    "Custom Web Applications": "सानुकूल वेब ॲप्लिकेशन्स",
    "Designing and executing modern responsive web portals, custom student evaluation systems, dashboard frameworks, and client-server architectures built with React, HTML5/CSS, or PHP.": "रिएक्ट, HTML5/CSS किंवा PHP सह बनविलेले आधुनिक रिस्पॉन्सिव्ह वेब पोर्टल्स, सानुकूल विद्यार्थी मूल्यमापन प्रणाली आणि डॅशबोर्ड फ्रेमवर्क डिझाइन आणि विकसित करणे.",
    "Native Mobile Apps": "नेटिव्ह मोबाईल ॲप्स",
    "High-performance native Android applications coded in Core Java and Kotlin, featuring local Room database caching, background service alerts, and polished Material 3 interfaces.": "कोअर जावा आणि कोटलिन मधील उत्कृष्ट कामगिरीचे नेटिव्ह अँड्रॉइड ॲप्लिकेशन्स, ज्यामध्ये स्थानिक रूम (Room) डेटाबेस, बॅकग्राउंड सर्व्हिस आणि आकर्षक मटेरियल ३ डिझाइन समाविष्ट आहे.",
    "DBMS & Database Systems": "डेटाबेस मॅनेजमेंट सिस्टीम्स",
    "Designing highly optimized relational SQLite, Room, or XAMPP MySQL structures. Modeling complete ER diagrams, table schemas, and custom SQL queries for robust local search operations.": "ऑप्टिमाइझ्ड SQLite, Room किंवा XAMPP MySQL डेटाबेस रचना डिझाइन करणे. मजबूत स्थानिक सर्च ऑपरेशन्ससाठी ईआर (ER) आकृत्या, टेबल स्कीमा आणि सानुकूल SQL क्वेरी तयार करणे.",
    "Mentorship & Project Setup": "मार्गदर्शन आणि प्रकल्प सेटअप",
    "Dedicated guidance from compiler setup to presentation ready status. Explaining source code line-by-line and conducting mock presentation checks to help you ace your Viva and major project evaluations.": "कंपायलर सेटअपपासून ते प्रेझेंटेशनपर्यंत संपूर्ण मार्गदर्शन. तुमचा मौखिक परीक्षा (Viva) आणि मुख्य प्रकल्पाचे मूल्यांकन यशस्वीरित्या उत्तीर्ण करण्यासाठी सोर्स कोडचे सविस्तर वर्णन आणि सराव मुलाखत देणे.",

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
    "Assured flawless 60fps screen execution with zero database blockages.": "शून्य डेटाबेस अडथळ्यांसह परिपूर्ण ६०fps स्क्रीन कामगिरी आणि वेगवान कार्यक्षमतेची हमी.",
    
    "B.Tech Academic Project": "बी.टेक शैक्षणिक प्रकल्प (B.Tech Academic Project)",
    "IoT & Embedded Systems": "आयओटी आणि एम्बेडेड सिस्टीम्स (IoT & Embedded Systems)",
    "Smart Traffic System": "स्मार्ट ट्रॅफिक सिस्टीम (Smart Traffic System)",
    "An IoT-based intelligent traffic management system that dynamically adjusts signal timings based on real-time traffic density. Built using ESP32 WiFi-enabled microcontroller with IR sensor networks for vehicle detection, automated signal switching, and a remote monitoring dashboard for live traffic analytics.": "रिअल-टाईम वाहतूक घनतेनुसार सिग्नलची वेळ आपोआप नियंत्रित करणारी आयओटी-आधारित वाहतूक व्यवस्थापन प्रणाली. यामध्ये ESP32 मायक्रोकंट्रोलर, IR सेन्सर नेटवर्क आणि थेट वाहतूक माहिती दर्शवणारा डॅशबोर्ड वापरला गेला आहे.",
    "Smart Hand Gesture Car": "स्मार्ट हँड जेश्चर कार (Smart Hand Gesture Car)",
    "A wirelessly controlled robotic car that responds to real-time hand gestures via RF communication. The transmitter glove uses MPU6050 accelerometer/gyroscope data to detect tilt gestures, while the receiver car interprets RF signals for precise directional motor control using L298N H-Bridge driver.": "हाताच्या हालचालींवर (जेश्चर) चालणारी वायरलेस रोबोटिक कार. हातातील सेन्सर ग्लोव्ह MPU6050 द्वारे हाताची हालचाल ओळखतो आणि RF कम्युनिकेशनद्वारे कारला अचूक दिशेने चालवतो.",

    // Leadership & Coordination
    "Leadership & Roles": "नेतृत्व आणि जबाबदाऱ्या",
    "Leadership Role": "नेतृत्व भूमिका",
    "LEADERSHIP & EVENT COORDINATION": "नेतृत्व आणि कार्यक्रम समन्वय",
    "Institutional Leadership": "संस्थात्मक नेतृत्व",
    "Lead Event Coordinator - Teachers' Day Debate Competition": "प्रमुख कार्यक्रम समन्वयक - शिक्षक दिन वादविवाद स्पर्धा",
    "Spearheaded the organization and execution of the departmental debate competition on Teachers' Day. Managed team logistics, curated debate topics, and coordinated faculty jury evaluations.": "शिक्षक दिनानिमित्त आयोजित वादविवाद स्पर्धेचे संपूर्ण नियोजन आणि यशस्वी आयोजन केले. टीमचे व्यवस्थापन, वादविवादाचे विषय निवडणे आणि प्राध्यापक परीक्षकांशी समन्वय साधण्याचे काम यशस्वीपणे पार पाडले.",
    "Core Responsibilities & Event Modules": "प्रमुख जबाबदाऱ्या आणि कार्यप्रवाह",
    "Event Planning & Architecture": "कार्यक्रमाचे नियोजन आणि रूपरेषा",
    "Formulated debate formats, curated topic pools on emerging technologies and societal themes, and structured strict timekeeping rules for 50+ participants.": "वादविवादाची पद्धत, तांत्रिक व सामाजिक विषयांची निवड आणि ५०+ स्पर्धकांसाठी अचूक वेळेचे नियम तयार केले.",
    "Faculty & Jury Coordination": "प्राध्यापक आणि परीक्षक समन्वय",
    "Liaised directly with college professors and guest judges, establishing objective scoring rubrics and structured speaker protocols.": "वरिष्ठ प्राध्यापक व परीक्षकांशी थेट समन्वय साधून निष्पक्ष गुणांकन पद्धत आणि वक्त्यांसाठीचे नियम निश्चित केले.",
    "Team Delegation & Stage Logistics": "टीम व्यवस्थापन आणि स्टेज नियोजन",
    "Led a student volunteer crew of 8 peers, managing attendee registration desk, A/V audio systems, and stage flow.": "८ स्वयंसेवक विद्यार्थ्यांच्या टीमचे नेतृत्व करत नोंदणी कक्ष, ऑडिओ/माईक सिस्टीम आणि स्टेजचे अचूक नियोजन सांभाळले.",
    "Public Engagement & Conflict Resolution": "स्पर्धक संवाद आणि वाद निवारण",
    "Acted as primary point of contact for participant queries, ensuring seamless round transitions and an energetic academic debate environment.": "विद्यार्थ्यांच्या शंकांचे निरसन करून स्पर्धेच्या फेऱ्या सुरळीतपणे आणि उत्साही शैक्षणिक वातावरणात पार पाडल्या.",
    "Recognized for organizational excellence and student team leadership as the Lead Coordinator of the Teachers' Day Debate Competition, managing 50+ participants, stage logistics, and jury evaluations.": "५०+ स्पर्धक, स्टेज व्यवस्थापन आणि प्राध्यापक परीक्षकांचे यशस्वी नियोजन करून शिक्षक दिन वादविवाद स्पर्धेचे उत्कृष्ट नेतृत्व केल्याबद्दल सन्मानित.",
    
    // Diploma Leadership Roles
    "Chief Event Coordinator & Lead Software Architect - College Quiz Platform": "मुख्य कार्यक्रम समन्वयक आणि लीड सॉफ्टवेअर आर्किटेक्ट - कॉलेज क्विझ प्लॅटफॉर्म",
    "Headed the entire departmental quiz competition lifecycle—architecting the real-time examination software platform, managing live server sessions, and directing event operations for 455+ concurrent participants.": "विभागीय क्विझ स्पर्धेचे संपूर्ण संचालन केले—रिअल-टाईम परीक्षा सॉफ्टवेअर विकसित करणे, थेट सर्व्हर नियंत्रित करणे आणि ४५५+ स्पर्धकांच्या स्पर्धेचे मुख्य समन्वयक म्हणून यशस्वी आयोजन केले.",
    "Real-Time Software Architecture": "रिअल-टाईम सॉफ्टवेअर आर्किटेक्चर",
    "Engineered responsive full-stack examination portal with dynamic timer synchronization, secure question shuffling, and automated score tabulation.": "डायनॅमिक टायमर सिंक्रोनायझेशन, सुरक्षित प्रश्न शफलिंग आणि स्वयंचलित गुणतालिकेसह पूर्णपणे रिस्पॉन्सिव्ह परीक्षा पोर्टल विकसित केले.",
    "Live Session & System Control": "थेट सत्र आणि सिस्टीम नियंत्रण",
    "Controlled administrator dashboard in real time during live competition sessions, ensuring zero latency spikes or system interruptions across 455+ active takers.": "थेट स्पर्धेदरम्यान ॲडमिन डॅशबोर्डवरून प्रश्न प्रसारण आणि सर्व्हर लोड नियंत्रित करून शून्य अडथळ्यांसह परीक्षा सुरळीत पार पाडली.",
    "Operational Event Leadership": "इव्हेंट व्यवस्थापन आणि संचालन",
    "Organized multi-hall examination logistics, managed round transitions, and guided technical volunteers for smooth student hardware onboarding.": "अनेक परीक्षा हॉलचे व्यवस्थापन, विविध फेऱ्यांचे नियोजन आणि तांत्रिक स्वयंसेवकांना मार्गदर्शन करून विद्यार्थ्यांना सुलभ अनुभव दिला.",
    "Jury Coordination & Result Auditing": "परीक्षक समन्वय आणि निकाल पडताळणी",
    "Coordinated with departmental faculty judges to audit leaderboards and declare transparent winners for the institutional awards ceremony.": "विभागीय प्राध्यापक परीक्षकांशी समन्वय साधून लीडरबोर्डची पडताळणी केली आणि बक्षीस समारंभासाठी पारदर्शक विजेते घोषित केले.",

    "Lead Software Developer & Technical Head - Student Feedback Management System": "लीड सॉफ्टवेअर डेव्हलपर आणि टेक्निकल हेड - स्टुडंट फीडबॅक मॅनेजमेंट सिस्टीम",
    "Lead Software Developer & Technical Head": "लीड सॉफ्टवेअर डेव्हलपर आणि टेक्निकल हेड",
    "Chief Event Coordinator & Lead Software Architect": "मुख्य कार्यक्रम समन्वयक आणि लीड सॉफ्टवेअर आर्किटेक्ट",
    "Spearheaded the technical development and institutional deployment of an end-to-end feedback evaluation portal, directing peer student developers and collaborating with academic heads.": "संस्थात्मक स्तरावरील फीडबॅक मूल्यांकन पोर्टलचा तांत्रिक विकास आणि अंमलबजावणीचे नेतृत्व केले; सहकारी विद्यार्थ्यांचे मार्गदर्शन आणि विभागप्रमुखांशी समन्वय साधला.",
    "System Architecture & Schema Design": "सिस्टीम आर्किटेक्चर आणि स्कीमा डिझाइन",
    "Engineered secure relational database schemas, anonymous feedback ingestion pipelines, and administrative reporting APIs.": "सुरक्षित रिलेशनल डेटाबेस स्कीमा, गोपनीय फीडबॅक संकलन प्रणाली आणि प्रशासकीय रिपोर्टिंग APIs तयार केले.",
    "Developer Team Direction": "डेव्हलपर टीमचे नेतृत्व",
    "Led a peer student development crew through sprint cycles, assigning modular interface components and reviewing Git pull requests.": "सहकारी विद्यार्थी डेव्हलपर्सच्या टीमचे नेतृत्व करत मॉड्युलर घटकांचे वाटप केले आणि गिट (Git) कोड रिव्ह्यू पार पाडले.",
    "Faculty Alignment & Requirement Auditing": "प्राध्यापक समन्वय आणि गरजांचे मूल्यांकन",
    "Conducted requirement discovery sessions with department heads and deans, translating academic compliance policies into intuitive UX feedback forms.": "विभागप्रमुख आणि डीन यांच्याशी चर्चा करून शैक्षणिक नियमांचे रुपांतर सोप्या आणि सुटसुटीत डिजिटल फीडबॅक फॉर्म्समध्ये केले.",
    "Campus-Wide Rollout & Impact": "संस्थात्मक अंमलबजावणी आणि प्रभाव",
    "Successfully deployed the platform across college departments, boosting administrative evaluation turnaround and institutional action metrics by 68%.": "सर्व विभागांमध्ये प्रणाली यशस्वीरीत्या राबवून प्रशासकीय मूल्यमापनाचा वेग वाढवला आणि संस्थात्मक प्रतिसाद दर ६८% ने सुधारला.",

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
