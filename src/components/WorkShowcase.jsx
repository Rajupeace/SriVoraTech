import { useState, useEffect, useRef, useCallback } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { ArrowUpRight, ArrowLeft, X, CheckCircle2, Search, Link2, MapPin, Building2, Users, Quote, ChevronRight, ChevronLeft, Filter, ExternalLink, Globe, Play, Pause } from 'lucide-react'
import './WorkShowcase.css'

/* Auto-playing image slideshow — cycles through images like a video */
function ImageSlideshow({ images, interval = 3000, height = '340px', showControls = true, showThumbnails = false }) {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [progress, setProgress] = useState(0)
  const timerRef = useRef(null)
  const progressRef = useRef(null)

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    if (progressRef.current) clearInterval(progressRef.current)

    const startTime = Date.now()
    progressRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime
      setProgress(Math.min((elapsed / interval) * 100, 100))
    }, 50)

    timerRef.current = setTimeout(() => {
      setCurrentIdx(prev => (prev + 1) % images.length)
      setProgress(0)
    }, interval)
  }, [images.length, interval])

  useEffect(() => {
    if (isPlaying && images.length > 1) {
      startTimer()
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      if (progressRef.current) clearInterval(progressRef.current)
    }
  }, [currentIdx, isPlaying, startTimer, images.length])

  const goTo = (idx) => {
    setCurrentIdx(idx)
    setProgress(0)
  }
  const goNext = () => goTo((currentIdx + 1) % images.length)
  const goPrev = () => goTo((currentIdx - 1 + images.length) % images.length)

  if (!images || images.length === 0) return null

  return (
    <div className="img-slideshow" style={{ height }}>
      {/* Image Stack with Fade */}
      <div className="slideshow-images">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img.src}
            alt={img.title}
            className={`slideshow-img ${idx === currentIdx ? 'slideshow-img--active' : ''}`}
          />
        ))}
      </div>

      {/* Bottom Overlay Bar */}
      <div className="slideshow-overlay-bar">
        <div className="slideshow-caption">{images[currentIdx]?.title}</div>
        <div className="slideshow-controls-row">
          {showControls && (
            <>
              <button className="slideshow-btn" onClick={goPrev} aria-label="Previous"><ChevronLeft size={16} /></button>
              <button className="slideshow-btn" onClick={() => setIsPlaying(!isPlaying)} aria-label={isPlaying ? 'Pause' : 'Play'}>
                {isPlaying ? <Pause size={14} /> : <Play size={14} />}
              </button>
              <button className="slideshow-btn" onClick={goNext} aria-label="Next"><ChevronRight size={16} /></button>
            </>
          )}
          <span className="slideshow-counter">{currentIdx + 1} / {images.length}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="slideshow-progress-track">
        <div className="slideshow-progress-fill" style={{ width: `${progress}%` }} />
      </div>

      {/* Dot Indicators */}
      {images.length > 1 && (
        <div className="slideshow-dots">
          {images.map((_, idx) => (
            <button
              key={idx}
              className={`slideshow-dot ${idx === currentIdx ? 'slideshow-dot--active' : ''}`}
              onClick={() => goTo(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}

      {/* Thumbnail Strip */}
      {showThumbnails && images.length > 1 && (
        <div className="slideshow-thumbnails">
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img.src}
              alt={img.title}
              className={`slideshow-thumb ${idx === currentIdx ? 'slideshow-thumb--active' : ''}`}
              onClick={() => goTo(idx)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

/* Gallery Lightbox — "See All Pics" grid + fullscreen lightbox with Back button */
function GalleryLightbox({ images, color }) {
  const [showGrid, setShowGrid] = useState(false)
  const [lightboxIdx, setLightboxIdx] = useState(-1)

  if (!images || images.length === 0) return null

  return (
    <>
      {/* See All Pics Button */}
      <button
        className="see-all-pics-btn"
        onClick={() => setShowGrid(true)}
        style={{ '--accent': color || '#6366f1' }}
      >
        <span className="see-all-pics-grid-icon">
          {[0,1,2,3].map(i => <span key={i} className="grid-dot" />)}
        </span>
        See All {images.length} Pics
      </button>

      {/* Fullscreen Grid Modal */}
      {showGrid && (
        <div className="gallery-modal-overlay" onClick={() => setShowGrid(false)}>
          <div className="gallery-modal" onClick={e => e.stopPropagation()}>
            <div className="gallery-modal-header">
              <button className="gallery-back-btn" onClick={() => setShowGrid(false)}>
                <ArrowLeft size={18} />
                <span>Back</span>
              </button>
              <h3 className="gallery-modal-title">All Screenshots ({images.length})</h3>
              <button className="gallery-close-btn" onClick={() => setShowGrid(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="gallery-grid">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className="gallery-grid-item"
                  onClick={() => { setLightboxIdx(idx); setShowGrid(false) }}
                >
                  <img src={img.src} alt={img.title} />
                  <span className="gallery-grid-label">{img.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Single Image Lightbox with Back button */}
      {lightboxIdx >= 0 && (
        <div className="lightbox-overlay" onClick={() => setLightboxIdx(-1)}>
          <div className="lightbox-container" onClick={e => e.stopPropagation()}>
            <div className="lightbox-header">
              <button className="gallery-back-btn" onClick={() => { setLightboxIdx(-1); setShowGrid(true) }}>
                <ArrowLeft size={18} />
                <span>Back to Gallery</span>
              </button>
              <span className="lightbox-counter">{lightboxIdx + 1} / {images.length}</span>
              <button className="gallery-close-btn" onClick={() => setLightboxIdx(-1)}>
                <X size={20} />
              </button>
            </div>
            <div className="lightbox-body">
              <button className="lightbox-nav lightbox-nav--prev" onClick={() => setLightboxIdx((lightboxIdx - 1 + images.length) % images.length)}>
                <ChevronLeft size={28} />
              </button>
              <img src={images[lightboxIdx].src} alt={images[lightboxIdx].title} className="lightbox-img" />
              <button className="lightbox-nav lightbox-nav--next" onClick={() => setLightboxIdx((lightboxIdx + 1) % images.length)}>
                <ChevronRight size={28} />
              </button>
            </div>
            <div className="lightbox-caption">{images[lightboxIdx].title}</div>
          </div>
        </div>
      )}
    </>
  )
}


const works = [
  {
    id: 'srierp',
    title: 'SriERP Pro - Enterprise ERP',
    headline: 'Centralized HR, Payroll, Inventory & Finance Platform',
    category: 'Enterprise Software • ERP',
    catGroup: 'enterprise',
    clientName: 'Badisa Srikanth',
    clientRole: 'Founder & CEO, SriVoraTech',
    liveUrl: 'https://vu-universe-360.vercel.app/',
    showcaseImg: '/srierp-admin-dashboard.png',
    adminImg: '/srierp-student-dashboard.png',
    galleryImgs: [
      { src: '/srierp-landing.png', title: 'Vu UniVerse360 Landing Page & Portal Selection' },
      { src: '/srierp-student-dashboard.png', title: 'Student Dashboard — CGPA, Progress & AI Analytics' },
      { src: '/srierp-admin-dashboard.png', title: 'Admin Command Center — System Status & Database Sync' },
      { src: '/srierp-admin-students.png', title: 'Admin Panel — Student Records & Registration Management' },
      { src: '/srierp-faculty-dashboard.png', title: 'Faculty Management — Staff Directory & Department Control' },
      { src: '/srierp-grades-dashboard.png', title: 'Grades Module — CGPA Breakdown & Performance Analytics' },
      { src: '/srierp-attendance-dashboard.png', title: 'Attendance Tracker — Biometric Logs & Leave Workflow' },
      { src: '/srierp-exams-dashboard.png', title: 'Examination Portal — Schedule, Results & Hall Tickets' },
      { src: '/srierp-schedule-dashboard.png', title: 'Class Schedule — Weekly Timetable & Room Allocation' },
      { src: '/srierp-placements-dashboard.png', title: 'Placement Cell — Company Drives & Student Applications' },
      { src: '/srierp-fees-dashboard.png', title: 'Finance Module — Fee Collection & Payment Tracking' },
      { src: '/srierp-vuai-dashboard.png', title: 'VU AI Assistant — Smart Academic Query Engine' }
    ],
    color: '#0067f4',
    gradient: 'linear-gradient(135deg, #0067f4, #6366f1)',
    about: 'A comprehensive Enterprise Resource Planning (ERP) platform managing HR, payroll, inventory, finance, attendance, customer management, and project workflows from one centralized dashboard.',
    hq: 'Hyderabad, India',
    industry: 'Enterprise Software',
    companySize: 'Enterprise (500+)',
    servicesOffered: ['Full Stack Development', 'ERP Architecture', 'PostgreSQL Data Pipeline', 'Docker AWS Deployment'],
    heroQuote: 'Comprehensive Enterprise Resource Planning Platform Built for Security & Scalability',
    challenge: 'Growing enterprises face fragmented systems across payroll, HR, attendance, inventory, and financial reporting, leading to data silos and manual overhead.',
    solution: 'SriVoraTech architected SriERP Pro — a unified enterprise portal with real-time analytics, automated payroll calculators, and role-based access control.',
    approach: [
      'Built a modular React.js dashboard with instant data visualization charts.',
      'Architected NestJS microservices backed by high-throughput PostgreSQL DB.',
      'Containerized all services using Docker on AWS cloud infrastructure.',
      'Integrated automated salary calculators and attendance biometric logging.'
    ],
    features: [
      'Centralized HR & Automated Payroll Management',
      'Real-Time Multi-Warehouse Inventory Tracking',
      'Financial Accounting & Invoicing Module',
      'Biometric Attendance & Leave Workflow',
      'Project Task & Milestone Management',
      'Role-Based JWT Security & Audit Logs'
    ],
    resultsList: [
      'Reduced enterprise administrative overhead by 65%.',
      'Achieved sub-second data query response for 100,000+ employee records.',
      'Zero downtime during peak end-of-month payroll processing.',
      'Full compliance with enterprise security and data privacy standards.'
    ],
    closingQuote: 'Building innovative software and AI-powered solutions that empower businesses to grow, automate, and succeed in the digital era.',
    technologies: ['React.js', 'NestJS', 'PostgreSQL', 'Docker', 'AWS'],
    results: ['65% Admin Overhead Saved', 'Sub-Second Query Speed', '100% Payroll Accuracy']
  },
  {
    id: 'smartai',
    title: 'SmartAI Assistant',
    headline: 'AI Virtual Assistant & Workflow Automation Engine',
    category: 'AI Platform • Workflow',
    catGroup: 'ai',
    clientName: 'Badisa Srikanth',
    clientRole: 'Founder & CEO, SriVoraTech',
    liveUrl: 'https://srivoratech-ai-virtual-assistant-workflow-automat.ai.studio/',
    showcaseImg: '/smartai-dashboard-overview.png',
    adminImg: '/smartai-workflow-canvas.png',
    galleryImgs: [
      { src: '/smartai-dashboard-overview.png', title: 'Executive Dashboard — Analytics & Platform Usage' },
      { src: '/smartai-assistants-builder.png', title: 'AI Assistant Studio — Custom Instructions & Temperature' },
      { src: '/smartai-workflow-canvas.png', title: 'Workflow Canvas — Visual Drag & Drop Automation Engine' },
      { src: '/smartai-rag-knowledge.png', title: 'Knowledge Base (RAG) — Vector Embeddings & Document Indexing' },
      { src: '/smartai-live-chat.png', title: 'Live Chat Inbox — Real-Time Customer Support & AI Co-pilot' },
      { src: '/smartai-crm-pipelines.png', title: 'CRM & Lead Pipelines — Deal Stages & AI Lead Qualification' },
      { src: '/smartai-triggers-cron.png', title: 'Triggers & Cron Engine — Scheduled Automation Tasks' },
      { src: '/smartai-integrations-panel.png', title: 'Integrations Panel — Gemini, OpenAI, Anthropic, Slack, Twilio' },
      { src: '/smartai-usage-costs.png', title: 'Usage & Cost Analytics — Token Spend & Latency Metrics' },
      { src: '/smartai-billing-wallet.png', title: 'Billing & Wallet — Enterprise Plans & Credit Balance' },
      { src: '/smartai-admin-security.png', title: 'Admin Security — SOC2 Compliance, Audit Logs & 2FA Control' },
      { src: '/smartai-settings-page.png', title: 'Workspace Settings — Team Members, API Keys & Domain Whitelist' }
    ],
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
    about: 'An AI-powered virtual assistant that answers customer queries, automates business workflows, summarizes documents, and integrates with websites, CRM, and ERP platforms.',
    hq: 'Hyderabad, India',
    industry: 'Artificial Intelligence',
    companySize: 'Mid-size & Enterprise',
    servicesOffered: ['Python AI Engine', 'FastAPI Backend', 'LangChain Integration', 'Vector Database Pipeline'],
    heroQuote: 'AI Virtual Assistant That Automates Customer Support & Summarizes Enterprise Docs',
    challenge: 'Businesses struggle with high support ticket volume and manual document processing, slowing response times for critical customer inquiries.',
    solution: 'SriVoraTech engineered SmartAI Assistant using RAG (Retrieval-Augmented Generation), Python FastAPI, and vector databases for semantic document search.',
    approach: [
      'Built document embedding pipelines using OpenAI & Google Gemini APIs.',
      'Leveraged Pinecone/Vector DB for sub-100ms semantic knowledge retrieval.',
      'Designed website chat widget & CRM/ERP integration webhooks.',
      'Created automated workflow triggers for email, ticket, and lead capture.'
    ],
    features: [
      '24/7 AI Customer Support & Chatbot Embed',
      'Automated Enterprise Document Summarization',
      'LangChain & Vector Database RAG Architecture',
      'Seamless CRM & ERP Webhook Integrations',
      'Multi-Language Translation & Voice Assist',
      'Real-Time Analytics & Escalation Routing'
    ],
    resultsList: [
      'Automated 80% of routine customer support queries instantly.',
      'Saved teams over 120 hours monthly in document analysis.',
      'Integrated smoothly across web, CRM, and internal Slack channels.',
      'Maintained 99.4% semantic retrieval accuracy on technical knowledge bases.'
    ],
    closingQuote: 'SmartAI Assistant turns enterprise knowledge into instant, accurate answers for customers and internal teams.',
    technologies: ['Python', 'FastAPI', 'OpenAI / Gemini', 'LangChain', 'Vector DB'],
    results: ['80% Support Tickets Automated', '120+ Hours Monthly Saved', '99.4% Retrieval Accuracy']
  },
  {
    id: 'shopsphere',
    title: 'ShopSphere Commerce',
    headline: 'Modern Multi-Vendor E-Commerce Platform',
    category: 'E-Commerce • Payments',
    catGroup: 'commerce',
    clientName: 'Badisa Srikanth',
    clientRole: 'Founder & CEO, SriVoraTech',
    liveUrl: 'https://sritheeagle.github.io/e-commerce-/',
    showcaseImg: '/shopsphere-ecommerce-live.png',
    adminImg: '/shopsphere-admin-live.png',
    galleryImgs: [
      { src: '/shopsphere-ecommerce-live.png', title: 'Live Storefront Marketplace — Direct Sourcing from Verified Sellers & AI Search' },
      { src: '/shopsphere-products-live.png', title: 'Daily Flash Sales & Product Catalog — Up to 50% Off Vendor Inventory' },
      { src: '/shopsphere-admin-live.png', title: 'Admin & Seller Core Hub — Escrow Buyer Protection, Shipping & Payout Governance' }
    ],
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981, #059669)',
    about: 'A modern e-commerce platform featuring secure payments, inventory management, order tracking, analytics, customer accounts, discount management, and an admin dashboard.',
    hq: 'Hyderabad, India',
    industry: 'E-Commerce',
    companySize: 'SMBs & Retail Brands',
    servicesOffered: ['Next.js App Router', 'Node.js API', 'Stripe / Razorpay Checkout', 'Cloudinary Media CDN'],
    heroQuote: 'Modern E-Commerce Engine Delivering Lightning-Fast Checkout & Admin Analytics',
    challenge: 'E-commerce retailers face slow page loading times, high cart abandonment, and clunky inventory admin interfaces.',
    solution: 'SriVoraTech created ShopSphere Commerce with server-side rendered Next.js 14, Stripe/Razorpay payment gateways, and automated Cloudinary image optimization.',
    approach: [
      'Utilized Next.js 14 SSR for sub-second page loads and maximum SEO performance.',
      'Integrated Stripe & Razorpay multi-currency checkout gateways.',
      'Built a full-featured admin dashboard with real-time revenue analytics.',
      'Designed coupon discount engines and automated order status webhooks.'
    ],
    features: [
      'Multi-Currency Stripe & Razorpay Checkout',
      'Real-Time Inventory & Low-Stock Alerts',
      'Automated Order Tracking & Email Receipts',
      'Dynamic Discount & Coupon Code Engine',
      'Customer Account Portals & Order History',
      'Intuitive Admin Sales Analytics Dashboard'
    ],
    resultsList: [
      'Boosted mobile conversion rate by 45% with instant checkout.',
      'Achieved a 99.9% uptime track during high-traffic promotional sales.',
      'Reduced image payload size by 70% using Cloudinary CDN.',
      'Processed over 50,000 orders without a single transaction error.'
    ],
    closingQuote: 'ShopSphere delivers the speed and scalability online retailers need to convert visitors into loyal customers.',
    technologies: ['Next.js', 'Node.js', 'MongoDB', 'Stripe / Razorpay', 'Cloudinary'],
    results: ['45% Higher Conversion Rate', '99.9% Sale Uptime Track', '50,000+ Orders Processed']
  },
  {
    id: 'healthconnect',
    title: 'HealthConnect Healthcare',
    headline: 'Digital Teleconsultation & Patient EMR Platform',
    category: 'Healthcare • Telemedicine',
    catGroup: 'healthcare',
    clientName: 'Badisa Srikanth',
    clientRole: 'Founder & CEO, SriVoraTech',
    liveUrl: 'https://papafoundation09-commits.github.io/hps/',
    showcaseImg: '/healthconnect-emr-dashboard.png',
    adminImg: '/healthconnect-soap-editor.png',
    galleryImgs: [
      { src: '/healthconnect-emr-dashboard.png', title: 'Doctor Dashboard — Real-Time Clinical Analytics & Patient Teleconsult Queue' },
      { src: '/healthconnect-soap-editor.png', title: 'Clinical EMR Editor & AI SOAP Assistant — Voice Dictation & SOAP Notes' },
      { src: '/healthconnect-public-home.png', title: 'Teleconsultation Portal — AI Symptom Checker, Triage & Specialty Directory' },
      { src: '/healthconnect-doctors-booking.png', title: 'Doctor Directory & Instant Teleconsultation Appointment Booking' }
    ],
    color: '#ec4899',
    gradient: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
    about: 'A digital healthcare solution enabling online appointment booking, electronic medical records (EMR), teleconsultation, prescription management, and patient-doctor communication.',
    hq: 'Hyderabad, India',
    industry: 'Healthcare & HealthTech',
    companySize: 'Hospitals & Clinics',
    servicesOffered: ['React.js Frontend', 'WebRTC Video Engine', 'MySQL Database', 'Firebase Realtime'],
    heroQuote: 'Secure Digital Healthcare Solution Bringing Teleconsultations & EMR to Patients',
    challenge: 'Healthcare providers require HIPAA-compliant, encrypted video consultation systems and instant digital prescription management.',
    solution: 'SriVoraTech built HealthConnect using WebRTC peer-to-peer video streams, secure MySQL EMR databases, and Firebase real-time notifications.',
    approach: [
      'Engineered WebRTC encrypted video calling with zero plugin downloads.',
      'Designed digital prescription generation with downloadable PDFs.',
      'Built online appointment scheduling with doctor calendar sync.',
      'Implemented end-to-end encrypted medical record storage.'
    ],
    features: [
      'WebRTC HD Peer-to-Peer Teleconsultation',
      'Electronic Medical Records (EMR) Vault',
      'Online Doctor Appointment Booking',
      'Digital Prescription Generator (PDF)',
      'Secure Doctor-Patient In-App Messaging',
      'Real-Time Firebase Push Notifications'
    ],
    resultsList: [
      'Facilitated over 25,000 successful video consultations.',
      'Reduced patient waiting times by 50% through digital queues.',
      'Maintained 100% data encryption compliance for medical records.',
      'Rated 4.9/5 stars by participating physicians and patients.'
    ],
    closingQuote: 'HealthConnect bridges the distance between patients and doctors with secure, intuitive digital healthcare.',
    technologies: ['React.js', 'Node.js', 'MySQL', 'WebRTC', 'Firebase'],
    results: ['25,000+ Video Consults', '50% Reduced Wait Time', '4.9/5 Rating by Physicians']
  },
  {
    id: 'eduverse',
    title: 'EduVerse LMS',
    headline: 'Cloud-Based Learning Management System',
    category: 'Education • LMS',
    catGroup: 'education',
    clientName: 'Badisa Srikanth',
    clientRole: 'Founder & CEO, SriVoraTech',
    liveUrl: 'https://srivoratech-lms-learningmanagement.ai.studio/',
    showcaseImg: '/srivoratech-lms-dashboard.png',
    adminImg: '/srivoratech-lms-student-dashboard.png',
    galleryImgs: [
      { src: '/srivoratech-lms-dashboard.png', title: 'SriVoraTech LMS Landing — Featured Learning Programs & Course Catalog' },
      { src: '/srivoratech-lms-student-dashboard.png', title: 'Student Dashboard — Enrolled Courses, Progress & Wishlist Tracking' },
      { src: '/srivoratech-lms-analytics.png', title: 'Learning Progress & Analytics — Completion Metrics & Subject Reports' }
    ],
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b, #f97316)',
    about: 'A cloud-native Learning Management System (LMS) for higher education, featuring structured course hierarchies, automated quiz engines, assignment grading, student progress analytics, and role-based JWT authentication.',
    hq: 'Hyderabad, India',
    industry: 'EdTech & Education',
    companySize: 'Institutes & Universities',
    servicesOffered: ['React.js Dashboard', 'Node.js / Express REST API', 'MySQL Database', 'AWS S3 Video Streaming'],
    heroQuote: 'Cloud-Native LMS Empowering Higher Education with Structured Courses, Quizzes & Analytics',
    challenge: 'Educational institutions need reliable platforms to manage course materials, stream video lectures, track student attendance, and conduct online assessments.',
    solution: 'SriVoraTech designed EduVerse LMS with Node.js REST APIs, MySQL persistence, AWS S3 video streaming, and automated grading analytics.',
    approach: [
      'Architected secure AWS S3 video streaming for HD lecture playback.',
      'Built automated quiz & assignment grading engines with instant results.',
      'Designed student attendance and progress tracking analytics dashboard.',
      'Implemented JWT authentication with role-based student/teacher access.'
    ],
    features: [
      'Online Course Management & Lecture Video Stream',
      'Automated Quiz & Assignment Grading System',
      'Student Attendance & Engagement Tracking',
      'Progress Analytics & Performance Reports',
      'Role-Based Access for Students, Teachers & Admins',
      'AWS S3 Secure Cloud Storage Integration'
    ],
    resultsList: [
      'Supported 40,000+ enrolled students across multiple campuses.',
      'Achieved 99.8% streaming reliability during final exams.',
      'Saved faculty 30+ hours per semester in automated grading.',
      'Enabled seamless remote learning and assessment management.'
    ],
    closingQuote: 'EduVerse LMS transforms traditional education into a modern, accessible cloud learning experience.',
    technologies: ['React.js', 'Node.js', 'MySQL', 'AWS S3', 'JWT Auth'],
    results: ['40,000+ Enrolled Students', '99.8% Exam Streaming Reliability', '30+ Hours Saved per Faculty']
  },
  {
    id: 'projectflow',
    title: 'ProjectFlow CRM',
    headline: 'Business CRM & Collaborative Project Workspace',
    category: 'Business CRM • Projects',
    catGroup: 'crm',
    clientName: 'Badisa Srikanth',
    clientRole: 'Founder & CEO, SriVoraTech',
    showcaseImg: '/projectflow-dashboard.png',
    adminImg: '/projectflow-dashboard.png',
    galleryImgs: [
      { src: '/projectflow-dashboard.png', title: 'Kanban Sales Funnel & Real-Time Team Collaboration' }
    ],
    color: '#06b6d4',
    gradient: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
    about: 'A customer relationship and project management platform with lead tracking, client communication, task assignment, milestone tracking, invoicing, team collaboration, and real-time reporting.',
    hq: 'Hyderabad, India',
    industry: 'Business Productivity',
    companySize: 'Agencies & Startups',
    servicesOffered: ['React.js App', 'Express.js API', 'MongoDB Cluster', 'Socket.IO Realtime'],
    heroQuote: 'All-in-One CRM & Project Management Tool for Lead Tracking & Team Collaboration',
    challenge: 'Growing companies struggle to track sales pipelines, assign project tasks, and issue client invoices across disjointed tools.',
    solution: 'SriVoraTech built ProjectFlow CRM using React.js, Express.js, MongoDB, and Socket.IO for real-time team messaging and milestone updates.',
    approach: [
      'Created Kanban & List project views with drag-and-drop task movement.',
      'Engineered Socket.IO real-time chat and notification webhooks.',
      'Built automated client invoice generation with PDF exports.',
      'Designed lead pipeline funnel tracking with conversion analytics.'
    ],
    features: [
      'Visual Lead Sales Pipeline & CRM Funnel',
      'Drag-and-Drop Task & Milestone Management',
      'Socket.IO Real-Time Team Collaboration & Chat',
      'Automated Client Invoicing & Payment Status',
      'Time Tracking & Project Budget Reports',
      'Docker Containerized Architecture'
    ],
    resultsList: [
      'Increased lead-to-client conversion rate by 35%.',
      'Accelerated project milestone completion speed by 25%.',
      'Eliminated reliance on 4 separate subscription software tools.',
      'Adopted by over 150 growing business teams.'
    ],
    closingQuote: 'ProjectFlow CRM streamlines lead generation, project execution, and invoicing in one powerful platform.',
    technologies: ['React.js', 'Express.js', 'MongoDB', 'Socket.IO', 'Docker'],
    results: ['35% Higher Lead Conversion', '25% Faster Milestone Delivery', '150+ Teams Onboarded']
  },
  {
    id: 'srivora-ai-agents',
    title: 'SriVora AI Autonomous Agents',
    headline: 'Next-Gen Multi-Agent Enterprise Automation Platform',
    category: 'Enterprise AI • Autonomous Agents',
    catGroup: 'upcoming',
    isUpcoming: true,
    statusTag: 'Upcoming Project (Q4 2026)',
    clientName: 'Badisa Srikanth',
    clientRole: 'Founder & CEO, SriVoraTech',
    showcaseImg: '/srivora-agentic-dashboard.png',
    adminImg: '/srivora-agentic-dashboard.png',
    galleryImgs: [
      { src: '/srivora-agentic-dashboard.png', title: 'Autonomous Multi-Agent Task Graph & Vector Pipeline' }
    ],
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
    about: 'An upcoming autonomous multi-agent platform designed to orchestrate complex enterprise tasks, execute data pipelines, run automated software testing, and manage AI customer interactions.',
    hq: 'Hyderabad, India',
    industry: 'Artificial Intelligence',
    companySize: 'Enterprise & AI Startups',
    servicesOffered: ['Multi-Agent Architecture', 'LangGraph & Python FastAPI', 'LLM Function Calling', 'DeepSeek-V3 & Gemini Integration'],
    heroQuote: 'Autonomous Multi-Agent Platform Engineered to Execute Complex Enterprise Task Orchestration',
    challenge: 'Enterprises struggle to connect separate AI LLMs into unified workflows capable of executing multi-step business logic autonomously.',
    solution: 'SriVoraTech is engineering SriVora AI Autonomous Agents — a state-of-the-art framework leveraging LangGraph, Python, and function-calling vector pipelines.',
    approach: [
      'Architected multi-agent graph topologies for parallel task execution.',
      'Integrated DeepSeek-V3 & Google Gemini model endpoints.',
      'Engineered safe sandboxed execution environments for database operations.',
      'Designed real-time telemetry dashboards for monitoring agent reasoning.'
    ],
    features: [
      'Multi-Agent Workflow Graph Orchestration',
      'Autonomous Code Generation & Software Testing',
      'Sub-Second Vector Knowledge Base Retrieval',
      'Sandboxed Enterprise Execution Safeguards',
      'Real-Time Telemetry & Agent Step Inspector',
      'Custom LLM Function Calling Webhooks'
    ],
    resultsList: [
      'Expected 85% reduction in manual multi-step workflow execution times.',
      'Built for 10x throughput scaling over traditional single-prompt assistants.',
      'Architected for strict enterprise security and data privacy isolation.'
    ],
    closingQuote: 'SriVora AI Agents unlock true autonomous task execution for modern digital enterprises.',
    technologies: ['Python', 'LangGraph', 'FastAPI', 'DeepSeek-V3', 'Pinecone'],
    results: ['Q4 2026 Expected Launch', 'Multi-Agent Graph Architecture', '10x Speed Scaling']
  },
  {
    id: 'omnichannel-erp',
    title: 'OmniChannel ERP Cloud',
    headline: 'Multi-Store Inventory, POS & Supply Chain Automation',
    category: 'Enterprise Software • Cloud ERP',
    catGroup: 'upcoming',
    isUpcoming: true,
    statusTag: 'Upcoming Project (Q4 2026)',
    clientName: 'Badisa Srikanth',
    clientRole: 'Founder & CEO, SriVoraTech',
    showcaseImg: '/omnichannel-erp-dashboard.png',
    adminImg: '/omnichannel-erp-dashboard.png',
    galleryImgs: [
      { src: '/omnichannel-erp-dashboard.png', title: 'Multi-Store Inventory, POS & Supply Chain Automation Engine' }
    ],
    color: '#0067f4',
    gradient: 'linear-gradient(135deg, #0067f4, #06b6d4)',
    about: 'An upcoming cloud-native ERP platform built specifically for retail chains, franchise networks, and multi-location warehouses to unify point-of-sale (POS), inventory, and automated replenishment.',
    hq: 'Hyderabad, India',
    industry: 'Retail & Enterprise Tech',
    companySize: 'Multi-Store Chains & Distributors',
    servicesOffered: ['Go (Golang) Microservices', 'React.js Cloud POS', 'Kafka Streaming Engine', 'Kubernetes Cloud Deployment'],
    heroQuote: 'Next-Generation OmniChannel Retail ERP Built for Ultra-Fast POS & Supply Chain Synchronization',
    challenge: 'Multi-location retailers encounter inventory sync delays, stockouts, and manual transfer errors between offline stores and online storefronts.',
    solution: 'SriVoraTech is building OmniChannel ERP Cloud — driven by Go microservices and Apache Kafka for millisecond inventory state updates across all locations.',
    approach: [
      'Engineered ultra-fast Go (Golang) backend microservices for low latency.',
      'Integrated Apache Kafka event streaming for real-time inventory sync.',
      'Built offline-first Progressive Web App (PWA) POS terminal interface.',
      'Automated dynamic reorder points based on machine learning sales trends.'
    ],
    features: [
      'Millisecond Multi-Store Stock Synchronization',
      'Offline-First Progressive Web App (PWA) POS',
      'Automated Purchase Orders & Supplier Workflows',
      'Real-Time Multi-Warehouse Supply Chain Tracking',
      'Centralized Financial Accounting & Tax Invoicing',
      'Kubernetes Cloud Infrastructure Scaling'
    ],
    resultsList: [
      'Eliminates stockout errors across offline and e-commerce channels.',
      'Sub-50ms transaction processing speed at POS checkout counters.',
      'Built to scale across 1,000+ retail outlets effortlessly.'
    ],
    closingQuote: 'Unifying physical retail stores and digital storefronts into one synchronized cloud platform.',
    technologies: ['Golang', 'React.js', 'Apache Kafka', 'PostgreSQL', 'Kubernetes'],
    results: ['Q4 2026 Expected Launch', 'Sub-50ms POS Transaction', 'Kafka Real-Time Streaming']
  },
  {
    id: 'payshield-v2',
    title: 'FinTech PayShield Gateway v2',
    headline: 'AI Fraud Detection & Global Payout Settlement Engine',
    category: 'Fintech • Payments & Security',
    catGroup: 'upcoming',
    isUpcoming: true,
    statusTag: 'Upcoming Project (Q1 2027)',
    clientName: 'Badisa Srikanth',
    clientRole: 'Founder & CEO, SriVoraTech',
    showcaseImg: '/payshield-fraud-dashboard.png',
    adminImg: '/payshield-fraud-dashboard.png',
    galleryImgs: [
      { src: '/payshield-fraud-dashboard.png', title: 'AI Fraud Detection & Global Payout Settlement Engine' }
    ],
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981, #3b82f6)',
    about: 'An upcoming payment gateway and fraud prevention platform with AI transaction risk scoring, multi-currency payouts, instant settlements, and chargeback protection.',
    hq: 'Hyderabad, India',
    industry: 'Financial Technology',
    companySize: 'Fintechs & Global Merchants',
    servicesOffered: ['Fintech Payment Architecture', 'AI Risk Analytics Engine', 'ClickHouse Data Pipeline', 'Redis High-Speed Cache'],
    heroQuote: 'AI-Powered Payment Gateway Infrastructure Engineered for Sub-Second Risk Analysis & Instant Payouts',
    challenge: 'Online merchants lose billions annually to fraudulent transactions, chargeback penalties, and delayed settlement cycles.',
    solution: 'SriVoraTech is developing PayShield Gateway v2 — combining real-time machine learning risk models with high-throughput settlement routing.',
    approach: [
      'Built machine learning risk models for millisecond fraud detection.',
      'Utilized ClickHouse analytical database for real-time fraud pattern analytics.',
      'Designed multi-processor payout routing to minimize transaction fees.',
      'Architected PCI-DSS compliant tokenized vault storage.'
    ],
    features: [
      'Millisecond AI Transaction Fraud Risk Scoring',
      'Multi-Currency Global Merchant Settlements',
      'Automated Chargeback Protection & Disputing',
      'PCI-DSS Compliant Tokenized Payment Vault',
      'Instant Merchant Payouts & Escrow Management',
      'ClickHouse Analytical Real-Time Reporting'
    ],
    resultsList: [
      'Reduces payment fraud risk by over 90% using predictive AI scoring.',
      'Processes transactions with 99.999% high-availability uptime SLA.',
      'Instant settlement options for merchant liquidity management.'
    ],
    closingQuote: 'Next-generation payment security and instant settlements for global commerce.',
    technologies: ['Next.js', 'Node.js', 'ClickHouse', 'Redis', 'Stripe Connect'],
    results: ['Q1 2027 Expected Launch', '90% Fraud Reduction Model', 'Sub-100ms Risk Analysis']
  }
]

const categories = [
  { id: 'all', label: 'All Solutions' },
  { id: 'upcoming', label: '🚀 Upcoming Projects' },
  { id: 'enterprise', label: 'Enterprise Software' },
  { id: 'ai', label: 'Artificial Intelligence' },
  { id: 'commerce', label: 'E-Commerce' },
  { id: 'healthcare', label: 'Healthcare' },
  { id: 'education', label: 'Education' },
  { id: 'crm', label: 'CRM & Projects' },
]

/* Individual card component */
function WorkCard({ work, idx, onSelect }) {
  const [cardRef, cardVisible] = useScrollAnimation()
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      ref={cardRef}
      className={`work-card animate-on-scroll delay-${(idx % 4) + 1} ${cardVisible ? 'visible' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(work)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(work); } }}
      aria-label={`View solution details for ${work.title}`}
    >
      {work.isUpcoming && (
        <div className="work-upcoming-badge">
          <span>🚀 {work.statusTag || 'Upcoming Project'}</span>
        </div>
      )}

      {work.liveUrl && (
        <a
          href={work.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="work-live-link-badge"
          onClick={(e) => e.stopPropagation()}
          title="Open Live Application"
        >
          <Globe size={12} /> Live Site ↗
        </a>
      )}

      {/* Top Banner Image Container (CodeDale Style) */}
      <div className="work-card-image" style={{ background: work.gradient }}>
        {work.showcaseImg ? (
          <div className="work-card-showcase-wrap">
            <img src={work.showcaseImg} alt={work.title} className="work-card-showcase-img" />
            <div className="showcase-img-badge">{work.category}</div>
          </div>
        ) : (
          <div className="work-card-mockup">
            <div className="mockup-browser">
              <div className="mockup-dots"><span /><span /><span /></div>
              <div className="mockup-content" style={{ background: `${work.color}22` }}>
                <div className="mockup-header" style={{ background: `${work.color}44`, width: '60%', height: '14px', borderRadius: '6px' }} />
                <div className="mockup-lines">
                  <div style={{ background: `${work.color}33`, width: '85%', height: '8px', borderRadius: '4px' }} />
                  <div style={{ background: `${work.color}33`, width: '65%', height: '8px', borderRadius: '4px' }} />
                  <div style={{ background: `${work.color}33`, width: '45%', height: '8px', borderRadius: '4px' }} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CodeDale Chat Conversation Bubbles */}
      <div className="work-card-chat-wrap">
        <div className="card-chat-bubble card-chat-client">
          <p className="card-chat-text">{work.about}</p>
          <span className="card-chat-author">{work.clientName}</span>
        </div>
        <div className="card-chat-bubble card-chat-reply">
          <p className="card-chat-text">Loved building it with you.</p>
          <span className="card-chat-author">SriVoraTech</span>
        </div>
      </div>

      {/* Founder Footer Row */}
      <div className="work-card-footer">
        <div className="card-founder-avatar" style={{ background: work.gradient }}>
          {work.clientName ? work.clientName.charAt(0) : 'B'}
        </div>
        <div className="card-founder-info">
          <h4 className="card-founder-name">{work.clientName || 'Badisa Srikanth'}</h4>
          <span className="card-founder-role">{work.clientRole || 'Founder & CEO'}</span>
        </div>
        <span className="card-view-details-link">
          View <ArrowUpRight size={14} />
        </span>
      </div>

      <div className={`work-card-overlay ${isHovered ? 'work-card-overlay--visible' : ''}`}>
        <span className="work-view-label">
          View Solution Details <ArrowUpRight size={16} />
        </span>
        {work.liveUrl && (
          <a
            href={work.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="work-direct-live-btn"
            onClick={(e) => e.stopPropagation()}
          >
            Launch Live Site <ExternalLink size={14} />
          </a>
        )}
      </div>
    </div>
  )
}

/* Full project detail modal */
function ProjectDetailPage({ project, onClose, onSelectProject, allProjects }) {
  const pageRef = useRef(null)

  useEffect(() => {
    setTimeout(() => pageRef.current?.scrollTo(0, 0), 50)
  }, [project.id])

  const otherProjects = allProjects.filter(p => p.id !== project.id)

  return (
    <div className="project-page-backdrop" role="dialog" aria-modal="true">
      <div className="project-page" ref={pageRef}>
        {/* Top Navigation Bar */}
        <div className="project-page-nav">
          <button className="project-back-btn" onClick={onClose}>
            <ArrowLeft size={18} /> Back to Products
          </button>
          <button className="project-close-btn" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        {/* Hero Section */}
        <div className="project-hero">
          <div className="project-hero-left">
            <div className="project-breadcrumb">
              <span className="breadcrumb-link" onClick={onClose}>Our Work</span>
              <ChevronRight size={14} />
              <span className="breadcrumb-current">{project.id.toUpperCase()}</span>
            </div>
            <h1 className="project-hero-title">{project.headline}</h1>
            
            {project.liveUrl && (
              <div style={{ marginTop: '14px', marginBottom: '16px' }}>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-live-demo-btn"
                >
                  <Globe size={16} /> Launch Live Application ({project.liveUrl.replace('https://', '')}) <ExternalLink size={16} />
                </a>
              </div>
            )}

            <p className="project-hero-subtitle">A conversation with:</p>
            <div className="project-client-row">
              <div className="project-client-avatar" style={{ background: project.gradient }}>
                {project.clientName.charAt(0)}
              </div>
              <div>
                <span className="project-client-name">{project.clientName}</span>
                <span className="project-client-role">{project.clientRole}</span>
              </div>
            </div>
          </div>
          <div className="project-hero-right">
            <div className="project-hero-banner-frame" style={{ borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.1)', boxShadow: '0 12px 32px rgba(0,0,0,0.15)' }}>
              {project.showcaseImg ? (
                <img src={project.showcaseImg} alt={project.title} style={{ width: '100%', height: '280px', objectFit: 'cover', objectPosition: 'top center', display: 'block' }} />
              ) : (
                <div className="project-hero-banner" style={{ background: project.gradient }}>
                  <div className="hero-banner-content">
                    <span className="hero-banner-badge">{project.industry}</span>
                    <h3 className="hero-banner-title">{project.title.split(' - ')[0]}</h3>
                    <p className="hero-banner-sub">{project.category}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 3-Column Body */}
        <div className="project-body">
          {/* Left Sidebar */}
          <aside className="project-sidebar-left">
            <div className="sidebar-section">
              <span className="sidebar-label">ABOUT</span>
              <h4 className="sidebar-company">
                {project.id.toUpperCase()}{' '}
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#0067f4', display: 'inline-flex', alignItems: 'center' }}
                    title="Visit Live Application"
                  >
                    <ExternalLink size={14} />
                  </a>
                ) : (
                  <Link2 size={14} />
                )}
              </h4>
              <p className="sidebar-desc">{project.about}</p>
              {project.liveUrl && (
                <div style={{ marginTop: '10px' }}>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sidebar-live-link"
                  >
                    <Globe size={13} /> {project.liveUrl.replace('https://', '')}
                  </a>
                </div>
              )}
            </div>
            <div className="sidebar-section">
              <span className="sidebar-label">HQ</span>
              <p className="sidebar-value"><MapPin size={14} /> {project.hq}</p>
            </div>
            <div className="sidebar-section">
              <span className="sidebar-label">INDUSTRY</span>
              <p className="sidebar-value"><Building2 size={14} /> {project.industry}</p>
            </div>
            <div className="sidebar-section">
              <span className="sidebar-label">COMPANY SIZE</span>
              <p className="sidebar-value"><Users size={14} /> {project.companySize}</p>
            </div>

            <div className="sidebar-section">
              <span className="sidebar-label">SERVICES OFFERED</span>
              <ul className="sidebar-services-list">
                {project.servicesOffered.map((svc, i) => (
                  <li key={i}>{svc}</li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Center Content */}
          <main className="project-content">
            <blockquote className="project-hero-quote">
              <Quote size={24} className="quote-icon" style={{ color: project.color }} />
              "{project.title.split(' - ')[0]} Brought to Life by SriVoraTech"
            </blockquote>

            <div className="content-divider" />

            <h2 className="content-heading">The Challenge</h2>
            <p className="content-text">{project.challenge}</p>

            <blockquote className="project-closing-quote" style={{ color: project.color, margin: '20px 0' }}>
              <Quote size={20} style={{ opacity: 0.5 }} />
              "We had almost given up on building our dream enterprise portal until SriVoraTech took over."
              <cite>— {project.clientName}, {project.clientRole}</cite>
            </blockquote>

            <h2 className="content-heading">Enter SriVoraTech: Turning Vision into Reality</h2>
            <p className="content-text">{project.solution}</p>

            <h3 className="content-subheading">Our Approach</h3>
            <ul className="content-list">
              {project.approach.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            {/* Approach Section Image */}
            {project.adminImg && (
              <div className="project-section-image-box" style={{ margin: '28px 0', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.1)', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}>
                <img src={project.adminImg} alt={`${project.title} Admin Dashboard`} style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }} />
                <span className="image-caption-tag" style={{ display: 'block', padding: '8px 16px', background: '#0f172a', color: '#94a3b8', fontSize: '12px', fontWeight: '600' }}>
                  Student Dashboard — Live UI
                </span>
              </div>
            )}

            <h2 className="content-heading">Key Features at a Glance</h2>
            <ul className="content-list content-list--features">
              {project.features.map((feat, i) => (
                <li key={i}>
                  <CheckCircle2 size={16} style={{ color: project.color, flexShrink: 0 }} />
                  {feat}
                </li>
              ))}
            </ul>

            {/* Interactive Prototype & Live Frame */}
            <div className="interactive-prototype-container" style={{ borderColor: `${project.color}40`, margin: '32px 0' }}>
              <div className="device-top-bar">
                <div className="device-dots">
                  <span className="dot red" />
                  <span className="dot yellow" />
                  <span className="dot green" />
                </div>
                <div className="device-title-bar">
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'inherit', textDecoration: 'underline' }}
                    >
                      {project.liveUrl}
                    </a>
                  ) : (
                    `${project.title} — Live Interactive Prototype`
                  )}
                </div>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="device-status-badge"
                    style={{ background: `${project.color}20`, color: project.color, textDecoration: 'none', cursor: 'pointer' }}
                  >
                    ● Open Live Application ↗
                  </a>
                )}
              </div>
              <div className="device-screen-content">
                <div className="proto-metrics-header">
                  <div className="p-metric">
                    <span className="p-label">System Status</span>
                    <strong className="p-val text-green">100% Operational</strong>
                  </div>
                  <div className="p-metric">
                    <span className="p-label">Latency</span>
                    <strong className="p-val">12ms</strong>
                  </div>
                  <div className="p-metric">
                    <span className="p-label">Active Connections</span>
                    <strong className="p-val">4,890</strong>
                  </div>
                </div>

                {project.showcaseImg && (
                  <div className="proto-showcase-img-container" style={{ margin: '16px 0', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.1)', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}>
                    <img src={project.showcaseImg} alt={`${project.title} UI Showcase`} style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }} />
                  </div>
                )}
              </div>
            </div>

            <h2 className="content-heading">Results: Why SriVoraTech is the Best</h2>
            <ul className="content-list">
              {project.resultsList.map((result, i) => (
                <li key={i}>{result}</li>
              ))}
            </ul>

            <blockquote className="project-closing-quote" style={{ color: project.color }}>
              <Quote size={20} style={{ opacity: 0.5 }} />
              {project.closingQuote}
              <cite>— {project.clientName}, {project.clientRole}</cite>
            </blockquote>

            {/* Gallery Section — Slideshow + See All Pics */}
            {project.galleryImgs && project.galleryImgs.length > 0 && (
              <div className="project-gallery-section" style={{ margin: '40px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h2 className="content-heading" style={{ margin: 0 }}>Gallery: See the Experience</h2>
                </div>
                <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.1)', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}>
                  <ImageSlideshow images={project.galleryImgs} interval={4000} height="420px" showControls={true} showThumbnails={true} />
                </div>
                <GalleryLightbox images={project.galleryImgs} color={project.color} />
              </div>
            )}
            {/* Tech Stack */}
            <div className="project-tech-section">
              <h3 className="content-subheading">Technologies Powered By</h3>
              <div className="project-tech-tags">
                {project.technologies.map(tech => (
                  <span key={tech} className="project-tech-tag">{tech}</span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="project-cta-section" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '40px' }}>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-cta-btn project-cta-btn--live"
                  style={{ background: project.gradient || '#0067f4' }}
                >
                  <Globe size={18} /> Launch Live Application <ExternalLink size={18} />
                </a>
              )}
              <a href="#contact" className="project-cta-btn" onClick={onClose}>
                Request Demo or Custom Build <ArrowUpRight size={18} />
              </a>
            </div>
          </main>

          {/* Right Sidebar */}
          <aside className="project-sidebar-right">
            <div className="sidebar-section">
              <span className="sidebar-label">ENGINEERING STACK</span>
              <ul className="sidebar-services-list">
                {project.servicesOffered.map((svc, i) => (
                  <li key={i}>{svc}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        {/* Suggested Projects */}
        <div className="project-suggestions">
          <h3 className="suggestions-title">Explore Other Enterprise Products</h3>
          <div className="suggestions-grid">
            {otherProjects.map(p => (
              <div
                key={p.id}
                className="suggestion-card"
                onClick={() => {
                  onSelectProject(p)
                  if (pageRef.current) {
                    pageRef.current.scrollTo({ top: 0, behavior: 'smooth' })
                  }
                }}
                role="button"
                tabIndex={0}
              >
                <div className="suggestion-card-image" style={{ background: p.gradient, position: 'relative', overflow: 'hidden', minHeight: '140px' }}>
                  {p.showcaseImg && (
                    <img
                      src={p.showcaseImg}
                      alt={p.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', position: 'absolute', inset: 0 }}
                    />
                  )}
                  <span className="suggestion-badge" style={{ position: 'relative', zIndex: 2, background: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(8px)' }}>
                    {p.category}
                  </span>
                </div>
                <div className="suggestion-card-info">
                  <h4>{p.title}</h4>
                  <span className="suggestion-link">View Product <ArrowUpRight size={14} /></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function WorkShowcase() {
  const [ref, isVisible] = useScrollAnimation()
  const [selectedProject, setSelectedProject] = useState(null)
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedProject(null)
    }
    if (selectedProject) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedProject])

  const filteredWorks = works.filter((w) => {
    const matchesTab = activeTab === 'all' || w.catGroup === activeTab
    const matchesSearch = searchQuery === '' || 
      w.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.about.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.technologies.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesTab && matchesSearch
  })

  return (
    <section className="work-showcase section" id="our-works">
      <div className="container">
        <div ref={ref} className={`animate-on-scroll ${isVisible ? 'visible' : ''}`}>
          <h2 className="section-title">Our Solutions & Products</h2>
          <p className="section-subtitle">
            Enterprise software platforms, AI virtual assistants, e-commerce engines, and healthcare solutions built by SriVoraTech.
          </p>
        </div>

        {/* Portfolio Category Filters & Search */}
        <div className="work-filter-bar">
          <div className="work-tabs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`work-tab-btn ${activeTab === cat.id ? 'active' : ''}`}
                onClick={() => setActiveTab(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="work-search-box">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search by tech or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="search-clear" onClick={() => setSearchQuery('')}>
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        <div className="work-grid">
          {filteredWorks.map((work, idx) => (
            <WorkCard key={work.id} work={work} idx={idx} onSelect={setSelectedProject} />
          ))}

          {filteredWorks.length === 0 && (
            <div className="work-empty-state">
              <Filter size={32} />
              <p>No products match your current filter. Try adjusting your search query.</p>
            </div>
          )}
        </div>
      </div>

      {/* Full Project Detail Page Overlay */}
      {selectedProject && (
        <ProjectDetailPage
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onSelectProject={setSelectedProject}
          allProjects={works}
        />
      )}
    </section>
  )
}
