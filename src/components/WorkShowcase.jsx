import { useState, useEffect, useRef, useCallback } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import {
  ArrowUpRight, ArrowLeft, X, CheckCircle2, Search, Link2, MapPin, Building2,
  Users, ChevronRight, ChevronLeft, Filter, ExternalLink, Globe, Play, Pause,
  Layers, Database, Server, ShieldCheck, Code2, Cpu, Sparkles, Check, HelpCircle,
  FileCode, Terminal, GitBranch
} from 'lucide-react'
import './WorkShowcase.css'

/* Auto-playing image slideshow — cycles through images like a video */
function ImageSlideshow({ images, interval = 3000, height = '360px', showControls = true, showThumbnails = false }) {
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

/* Gallery Lightbox — "See All Pics" grid + fullscreen lightbox */
function GalleryLightbox({ images, color }) {
  const [showGrid, setShowGrid] = useState(false)
  const [lightboxIdx, setLightboxIdx] = useState(-1)

  if (!images || images.length === 0) return null

  return (
    <>
      <button
        className="see-all-pics-btn"
        onClick={() => setShowGrid(true)}
        style={{ '--accent': color || '#6366f1' }}
      >
        <span className="see-all-pics-grid-icon">
          {[0, 1, 2, 3].map(i => <span key={i} className="grid-dot" />)}
        </span>
        See All {images.length} Screenshots
      </button>

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

      {lightboxIdx >= 0 && (
        <div className="lightbox-overlay" onClick={() => setLightboxIdx(-1)}>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <div className="lightbox-top-bar">
              <button className="lightbox-nav-btn" onClick={() => setShowGrid(true)}>
                <ArrowLeft size={18} />
                <span>Grid View</span>
              </button>
              <span className="lightbox-counter">{lightboxIdx + 1} / {images.length}</span>
              <button className="lightbox-close-btn" onClick={() => setLightboxIdx(-1)}>
                <X size={22} />
              </button>
            </div>
            <div className="lightbox-main">
              <button
                className="lightbox-arrow lightbox-arrow--left"
                onClick={() => setLightboxIdx((lightboxIdx - 1 + images.length) % images.length)}
                aria-label="Previous image"
              >
                <ChevronLeft size={28} />
              </button>
              <img
                src={images[lightboxIdx].src}
                alt={images[lightboxIdx].title}
                className="lightbox-img"
              />
              <button
                className="lightbox-arrow lightbox-arrow--right"
                onClick={() => setLightboxIdx((lightboxIdx + 1) % images.length)}
                aria-label="Next image"
              >
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

export const works = [
  {
    id: 'srierp',
    title: 'SriERP Pro - Enterprise ERP Platform',
    headline: 'Unified Campus, Academic, HR & Operations Management System',
    category: 'Enterprise Software • ERP',
    catGroup: 'enterprise',
    status: 'Live',
    statusTag: 'Live Production Platform',
    liveUrl: 'https://vu-universe-360.vercel.app/',
    githubUrl: 'https://github.com/Rajupeace/SriVoraTech',
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
    about: 'A centralized multi-tenant Enterprise Resource Planning (ERP) platform designed for higher education and multi-department institutions, managing student lifecycles, faculty records, automated payroll, exam grading, and finance from one command hub.',
    hq: 'Hyderabad, India',
    industry: 'Enterprise EdTech & ERP',
    companySize: 'Institutions & Multi-Campus Enterprises',
    servicesOffered: ['Full Stack Architecture', 'PostgreSQL Data Pipeline', 'Role-Based JWT Security', 'Docker Cloud Deployment'],
    challenge: 'Higher education institutions and large organizations struggle with fragmented databases across student registrations, faculty records, fee collections, exam scheduling, and payroll. This results in data silos, manual reconciliation delays, and security risks.',
    businessRequirements: [
      'Centralize 10+ departmental portals into a single unified identity provider.',
      'Deliver role-based authorization for Students, Faculty, Department Heads, and Super Admins.',
      'Provide instant grade computation, fee payment tracking, and automated biometric attendance logging.',
      'Ensure sub-second page transitions and 99.9% uptime availability during peak exam and registration seasons.'
    ],
    solution: 'SriVoraTech architected SriERP Pro (Vu UniVerse360) using a modular React frontend backed by Express/Node.js REST microservices and a high-throughput PostgreSQL relational database, containerized with Docker.',
    architectureDiagram: `[Student / Faculty / Admin Client]
         │ (HTTPS / TLS 1.3)
         ▼
[Edge CDN & Nginx Reverse Proxy]
         │
         ▼
[Node.js / Express Microservices API Gateway]
    ├── JWT Authentication & Role-Based Access Control (RBAC)
    ├── Academic Grading & Attendance Engine
    └── Finance & Fee Reconciliation Queue
         │
         ├──► [Redis In-Memory Session Cache]
         └──► [PostgreSQL Relational DB (ACID Compliant)]`,
    features: [
      'Multi-Role Dashboards for Students, Faculty, and Administrators',
      'Instant CGPA Calculation & Exam Hall Ticket Generator',
      'Automated Attendance Tracker with Leave Approval Workflows',
      'Finance & Fee Collection Module with Digital Receipts',
      'Placement Cell Management with Application Funnel',
      'Integrated VU AI Academic Assistant for Instant Student Support'
    ],
    implementationDetails: [
      'Engineered modular React component architecture with lazy-loaded portal submodules for maximum bundle speed.',
      'Normalized relational database schema in PostgreSQL ensuring zero data redundancy across student and faculty records.',
      'Implemented robust JWT authentication with encrypted HTTP-only session tokens and granular permission gates.',
      'Configured Docker containers and automated CI/CD deployment pipelines on Vercel and cloud servers.'
    ],
    challenges: 'Coordinating synchronized database state across concurrent exam result uploads by faculty while thousands of students check grades simultaneously. Solved by implementing optimistic UI updates and Redis query caching.',
    resultsList: [
      'Unified 12 separate academic and operational modules into one cohesive portal.',
      'Sub-second page rendering and instant search across student directories.',
      'Zero downtime observed during peak grade release periods.',
      'Complete role isolation ensuring student data privacy and grade security.'
    ],
    technologies: ['React.js', 'Node.js', 'Express', 'PostgreSQL', 'Docker', 'Redis', 'Vercel']
  },
  {
    id: 'smartai',
    title: 'SmartAI Assistant',
    headline: 'AI Virtual Assistant & Visual Workflow Automation Engine',
    category: 'AI Platform • Workflow',
    catGroup: 'ai',
    status: 'Live',
    statusTag: 'Live AI Studio & Agentic Engine',
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
      { src: '/smartai-admin-security.png', title: 'Admin Security — Audit Logs & 2FA Control' },
      { src: '/smartai-settings-page.png', title: 'Workspace Settings — Team Members, API Keys & Domain Whitelist' }
    ],
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
    about: 'An enterprise AI virtual assistant and visual workflow orchestration suite that answers user queries, searches proprietary knowledge bases with RAG, and automates multi-step business logic across CRMs and APIs.',
    hq: 'Hyderabad, India',
    industry: 'Artificial Intelligence & Automation',
    companySize: 'SMBs & Growing Enterprises',
    servicesOffered: ['Python AI Engine', 'FastAPI Microservice', 'LangChain RAG Pipeline', 'Vector Database Integration'],
    challenge: 'Businesses experience high support ticket backlogs, slow document parsing, and lack the technical tooling to easily configure and deploy custom LLM agents without writing complex code.',
    businessRequirements: [
      'Enable non-technical operators to build custom AI assistants with system prompts and temperature sliders.',
      'Provide a visual drag-and-drop workflow canvas for chaining webhooks, LLM calls, and CRM triggers.',
      'Ground answers in private enterprise documents (PDF, DOCX, CSV) using vector embeddings with zero hallucinations.',
      'Track real-time token spending, API latency, and conversation sentiment analytics.'
    ],
    solution: 'SriVoraTech built SmartAI Assistant featuring a React visual studio, FastAPI backend microservice, Pinecone vector database integration, and multi-model LLM routing supporting OpenAI, Google Gemini, and Anthropic.',
    architectureDiagram: `[Customer / Web Chat Widget]
         │
         ▼
[FastAPI AI Orchestration Engine]
    ├── Vector Search Query Preprocessing
    ├── Semantic Chunking & Re-ranking
    └── Tool Execution / Webhook Triggers
         │
         ├──► [Pinecone / Chroma Vector DB (Embeddings)]
         ├──► [Multi-LLM Router: GPT-4o / Gemini 1.5 Pro]
         └──► [CRM & Webhook Event Sinks]`,
    features: [
      'Visual Drag-and-Drop Workflow Automation Canvas',
      'RAG Document Knowledge Base with Vector Search',
      'Custom Assistant Builder with Prompt Engineering Controls',
      'Live Support Inbox with AI Co-Pilot Assistance',
      'Automated Cron Triggers & Multi-System Webhooks',
      'Comprehensive Token Usage, Cost & Latency Analytics'
    ],
    implementationDetails: [
      'Developed responsive canvas utilizing React Flow for intuitive node connecting and automation branching.',
      'Engineered chunking and hybrid search algorithms yielding high semantic accuracy on technical manuals.',
      'Implemented token-bucket rate limiters and cost counters guarding against runaway API expenditures.',
      'Containerized the entire Python and Node.js microservices stack for one-click cloud deployment.'
    ],
    challenges: 'Preventing LLM hallucinations on ambiguous questions. Solved by implementing strict system prompt guardrails, context threshold scoring, and fallback handoffs to human operators.',
    resultsList: [
      'Enables rapid deployment of custom AI chatbots in under 15 minutes.',
      'Sub-200ms semantic knowledge retrieval on enterprise documentation.',
      'Visual automation canvas eliminates need for manual Python scripting for standard workflows.',
      'Comprehensive observability into token consumption and model performance.'
    ],
    technologies: ['React.js', 'Python', 'FastAPI', 'LangChain', 'OpenAI API', 'Google Gemini', 'Pinecone', 'Docker']
  },
  {
    id: 'shopsphere',
    title: 'ShopSphere Commerce',
    headline: 'Modern Multi-Vendor Marketplace & E-Commerce Platform',
    category: 'E-Commerce • Payments',
    catGroup: 'commerce',
    status: 'Live',
    statusTag: 'Live E-Commerce Platform',
    liveUrl: 'https://sritheeagle.github.io/e-commerce-/',
    githubUrl: 'https://github.com/Rajupeace/e-commerce-',
    showcaseImg: '/shopsphere-ecommerce-live.png',
    adminImg: '/shopsphere-admin-live.png',
    galleryImgs: [
      { src: '/shopsphere-ecommerce-live.png', title: 'Live Storefront Marketplace — Direct Sourcing & AI Search' },
      { src: '/shopsphere-products-live.png', title: 'Product Catalog & Daily Flash Sales' },
      { src: '/shopsphere-admin-live.png', title: 'Admin & Seller Hub — Buyer Protection & Payout Governance' }
    ],
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981, #059669)',
    about: 'A multi-vendor e-commerce marketplace featuring instant product search, category filtering, cart management, discount engines, escrow seller payouts, and an admin sales analytics dashboard.',
    hq: 'Hyderabad, India',
    industry: 'E-Commerce & Retail Technology',
    companySize: 'Retail Brands & Online Merchants',
    servicesOffered: ['Frontend Architecture', 'Payment Gateway Integration', 'Catalog Search Engine', 'Admin Governance Hub'],
    challenge: 'Retailers face high cart abandonment rates due to sluggish storefront performance, complex checkout workflows, and cumbersome multi-vendor product catalog management.',
    businessRequirements: [
      'Deliver lightning-fast page loading speeds with smooth mobile-first product browsing.',
      'Implement structured catalog filtering by category, price, rating, and promotional status.',
      'Build secure checkout supporting multiple payment gateways and coupon discounts.',
      'Provide sellers and administrators with transparent order tracking and sales dashboards.'
    ],
    solution: 'SriVoraTech created ShopSphere Commerce featuring an optimized reactive storefront, responsive grid layouts, streamlined cart state management, and an administrative control panel.',
    architectureDiagram: `[Shopper Mobile / Desktop Browser]
         │ (Fast Asset Delivery)
         ▼
[Reactive Storefront UI (React / Modern Web)]
    ├── Product Catalog & Real-Time Filter Engine
    ├── Local Cart State & Coupon Discount Calculator
    └── Multi-Step Checkout Workflow
         │
         ├──► [Payment Gateway API (Stripe / Razorpay Mock)]
         └──► [Order Tracking & Inventory Sync API]`,
    features: [
      'Fast Dynamic Product Catalog & Real-Time Search',
      'Intuitive Shopping Cart & Promo Code Discount Engine',
      'Seller & Admin Management Dashboard',
      'Escrow Buyer Protection and Order Status Flow',
      'Mobile-Optimized Responsive Checkout Workflow',
      'High-Resolution Image Delivery with Responsive Breakpoints'
    ],
    implementationDetails: [
      'Engineered state management keeping cart items and inventory counts synchronized across sessions.',
      'Built multi-facet filter system allowing instant narrowing by vendor, price range, and category.',
      'Ensured WCAG color contrast and keyboard navigation across all interactive checkout elements.'
    ],
    challenges: 'Optimizing high-resolution product photography to load instantly on mobile networks without pixelation. Solved via lazy-loading and optimized responsive image formats.',
    resultsList: [
      'Sub-second product catalog search and instant filter response.',
      'Intuitive mobile-first shopping experience with zero layout shift.',
      'Clean modular frontend architecture ready for production API integration.'
    ],
    technologies: ['React.js', 'JavaScript', 'CSS3', 'HTML5', 'GitHub Pages', 'Responsive Design']
  },
  {
    id: 'healthconnect',
    title: 'HealthConnect Healthcare',
    headline: 'Digital Teleconsultation & Patient Electronic Medical Records (EMR)',
    category: 'Healthcare • Telemedicine',
    catGroup: 'healthcare',
    status: 'Live',
    statusTag: 'Live Healthcare Prototype',
    liveUrl: 'https://papafoundation09-commits.github.io/hps/',
    githubUrl: 'https://github.com/Rajupeace',
    showcaseImg: '/healthconnect-emr-dashboard.png',
    adminImg: '/healthconnect-soap-editor.png',
    galleryImgs: [
      { src: '/healthconnect-emr-dashboard.png', title: 'Doctor Dashboard — Real-Time Clinical Queue & Patient List' },
      { src: '/healthconnect-soap-editor.png', title: 'Clinical EMR Editor & AI SOAP Assistant' },
      { src: '/healthconnect-public-home.png', title: 'Teleconsultation Portal — AI Symptom Checker & Specialty Directory' },
      { src: '/healthconnect-doctors-booking.png', title: 'Doctor Directory & Instant Teleconsultation Booking' }
    ],
    color: '#ec4899',
    gradient: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
    about: 'A digital health platform providing remote patient teleconsultation, doctor appointment scheduling, encrypted electronic medical records (EMR), and an AI-assisted clinical SOAP notes editor.',
    hq: 'Hyderabad, India',
    industry: 'Healthcare Technology (HealthTech)',
    companySize: 'Clinics, Hospitals & Telehealth Startups',
    servicesOffered: ['HealthTech Platform Design', 'WebRTC Video Architecture', 'EMR Database Engineering', 'Clinical UI/UX'],
    challenge: 'Healthcare providers face heavy administrative burdens writing clinical notes and struggle to connect with remote patients over secure, accessible telemedicine channels.',
    businessRequirements: [
      'Provide zero-download browser-based video teleconsultations for doctors and patients.',
      'Structure patient history, allergies, and diagnostic records into a secure EMR vault.',
      'Accelerate clinical documentation through structured SOAP note templates.',
      'Ensure strict data privacy and encryption across all consultation channels.'
    ],
    solution: 'SriVoraTech engineered HealthConnect with WebRTC peer-to-peer video streaming, intuitive appointment calendars, and a specialized clinical SOAP notes editor with voice dictation scaffolding.',
    architectureDiagram: `[Patient Browser / Phone] ◄──WebRTC P2P Video Call──► [Doctor Browser / Clinic]
         │                                                      │
         ▼                                                      ▼
[Telehealth Scheduling Hub]                               [Clinical EMR Editor]
         │                                                      │
         └─────────────► [Secure Encrypted Health DB] ◄─────────┘
                                   │
                    [AI SOAP Notes Scaffolding Pipeline]`,
    features: [
      'Direct Browser Peer-to-Peer Video Teleconsultations',
      'Clinical EMR System with Patient Longitudinal History',
      'AI SOAP Note Assistant (Subjective, Objective, Assessment, Plan)',
      'Doctor Specialty Directory & Real-Time Availability Booking',
      'Digital Prescription Generation & PDF Export Scaffolding',
      'Symptom Triage Questionnaire for Initial Patient Intake'
    ],
    implementationDetails: [
      'Built encrypted WebRTC signaling workflows enabling high-definition clinical video without third-party plugins.',
      'Designed ergonomic SOAP editor allowing doctors to rapidly type or dictate patient observations and treatment plans.',
      'Implemented sensitive record isolation and access control safeguards protecting patient confidentiality.'
    ],
    challenges: 'Creating an intuitive clinical interface that doctors can navigate effortlessly during active patient video calls. Solved with a side-by-side split screen consultation layout.',
    resultsList: [
      'Seamless teleconsultation initiation with single-click patient invite links.',
      'Structured clinical SOAP note documentation reduces note-taking overhead.',
      'Fully responsive across desktop workstations and mobile clinical tablets.'
    ],
    technologies: ['React.js', 'WebRTC', 'JavaScript', 'CSS3', 'HTML5', 'GitHub Pages']
  },
  {
    id: 'eduverse',
    title: 'EduVerse LMS',
    headline: 'Cloud-Native Learning Management & Academic Analytics System',
    category: 'Education • LMS',
    catGroup: 'education',
    status: 'Live',
    statusTag: 'Live LMS Platform',
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
    about: 'A cloud-based Learning Management System designed for educational institutions and corporate upskilling programs, featuring structured course curriculums, video streaming, automated quizzes, and student learning analytics.',
    hq: 'Hyderabad, India',
    industry: 'EdTech & Online Education',
    companySize: 'Universities, Academies & Corporate Training',
    servicesOffered: ['LMS Product Architecture', 'Video Streaming Pipeline', 'Assessment Engine', 'Learning Analytics'],
    challenge: 'Institutions require accessible, engaging learning portals that keep students motivated while providing instructors with real-time insight into student completion and comprehension rates.',
    businessRequirements: [
      'Deliver video lessons and downloadable course materials with zero buffering.',
      'Implement interactive quizzes with instant grading and score reporting.',
      'Provide students with personal dashboard tracking enrolled courses and progress.',
      'Give educators actionable analytics on student drop-off and lesson completion.'
    ],
    solution: 'SriVoraTech architected EduVerse LMS featuring a modern course catalog, video player integration, interactive assessment modules, and comprehensive progress charts.',
    architectureDiagram: `[Student / Learner]
         │
         ▼
[EduVerse Learning Portal (React)]
    ├── Video Lecture Playback Engine
    ├── Interactive Quiz & Grading State
    └── Student Progress & Certificate Hub
         │
         ├──► [Course Content & Video Streaming Pipeline]
         └──► [Progress & Assessment Analytics DB]`,
    features: [
      'Comprehensive Course Directory with Category Filtering',
      'Interactive Student Dashboard with Progress Percentage Gauges',
      'Automated Quiz & Knowledge Check Evaluation',
      'Video Lecture Streaming and Resource Downloads',
      'Instructor Analytics Dashboard with Course Completion Metrics',
      'Clean, distraction-free learning interface with dark mode readability'
    ],
    implementationDetails: [
      'Developed progress tracking preserving student position across multi-chapter video curricula.',
      'Built automated scoring logic evaluating multiple-choice and short-answer quizzes immediately upon submission.',
      'Designed responsive dashboard that works seamlessly on desktop, iPad, and mobile viewports.'
    ],
    challenges: 'Designing a lightweight learning interface that loads quickly on low-bandwidth student mobile connections without sacrificing visual appeal. Solved by optimizing asset bundles and utilizing modern CSS grid techniques.',
    resultsList: [
      'Streamlined course delivery and lesson navigation for learners.',
      'Instant automated grading saves instructors hours of manual evaluation.',
      'High visual clarity and mobile responsiveness across all course modules.'
    ],
    technologies: ['React.js', 'JavaScript', 'CSS3', 'HTML5', 'AI Studio', 'Responsive Design']
  },
  {
    id: 'projectflow',
    title: 'ProjectFlow CRM',
    headline: 'Business CRM & Collaborative Project Workspace',
    category: 'Business CRM • Projects',
    catGroup: 'crm',
    status: 'Prototype',
    statusTag: 'Functional Prototype',
    showcaseImg: '/projectflow-dashboard.png',
    adminImg: '/projectflow-dashboard.png',
    galleryImgs: [
      { src: '/projectflow-dashboard.png', title: 'Kanban Sales Funnel & Real-Time Team Collaboration' }
    ],
    color: '#06b6d4',
    gradient: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
    about: 'An integrated CRM and project management workspace with visual Kanban deal funnels, task assignment, milestone tracking, team collaboration, and automated invoice creation.',
    hq: 'Hyderabad, India',
    industry: 'Business Productivity & SaaS',
    companySize: 'Agencies, Startups & Consultancies',
    servicesOffered: ['Product Architecture', 'Kanban Workflow UI', 'Real-Time State Design', 'Invoicing Module'],
    challenge: 'Teams waste valuable hours juggling separate software subscriptions for customer relationship management, task boards, and client invoicing.',
    businessRequirements: [
      'Unify client sales pipeline tracking and post-sale project execution in one place.',
      'Provide drag-and-drop Kanban boards for intuitive sprint management.',
      'Generate professional client invoices with automated status updates.'
    ],
    solution: 'SriVoraTech created ProjectFlow CRM combining visual lead stages with agile task cards and invoice generation in a single coherent workspace.',
    architectureDiagram: `[Team Member / Project Manager]
         │
         ▼
[ProjectFlow Unified Workspace]
    ├── Sales Pipeline Kanban Board
    ├── Project Sprint Task Tracker
    └── Client Invoicing & Time Tracking
         │
         └──► [Relational CRM & Project State Engine]`,
    features: [
      'Visual Drag-and-Drop Sales Pipeline Funnel',
      'Agile Sprint & Task Board with Priority Tags',
      'Client Invoicing Generator with PDF Scaffolding',
      'Team Member Assignment and Milestone Tracking',
      'Real-Time Project Budget and Progress Analytics'
    ],
    implementationDetails: [
      'Engineered fluid drag-and-drop interaction allowing seamless card movement across deal stages.',
      'Designed compact, high-density dashboard suitable for daily operations by busy managers.'
    ],
    challenges: 'Structuring complex relational linkages between prospective leads, closed projects, and recurring invoices. Solved through normalized schema design.',
    resultsList: [
      'Replaces multiple separate tools with one streamlined prototype platform.',
      'Intuitive Kanban interface simplifies daily task and client management.'
    ],
    technologies: ['React.js', 'Node.js', 'MongoDB', 'CSS3', 'REST APIs']
  },
  {
    id: 'srivora-ai-agents',
    title: 'SriVora AI Autonomous Agents',
    headline: 'Multi-Agent Enterprise Orchestration Framework',
    category: 'Enterprise AI • Autonomous Agents',
    catGroup: 'upcoming',
    status: 'In Development',
    statusTag: 'In Active Development',
    showcaseImg: '/srivora-agentic-dashboard.png',
    adminImg: '/srivora-agentic-dashboard.png',
    galleryImgs: [
      { src: '/srivora-agentic-dashboard.png', title: 'Autonomous Multi-Agent Task Graph & Vector Pipeline' }
    ],
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
    about: 'An upcoming multi-agent framework designed to coordinate autonomous AI agents across complex enterprise workflows, automated code testing, database queries, and system monitoring.',
    hq: 'Hyderabad, India',
    industry: 'Artificial Intelligence & Deep Tech',
    companySize: 'Enterprises & AI-First Startups',
    servicesOffered: ['Multi-Agent Architecture', 'LangGraph Topologies', 'Tool Calling Sandboxes', 'Telemetry Engineering'],
    challenge: 'Connecting multiple specialized AI models into reliable, autonomous task graphs with human-in-the-loop oversight and sandboxed tool-calling capabilities.',
    businessRequirements: [
      'Enable multiple AI agents (Researcher, Coder, Critic, Executor) to collaborate on multi-step goals.',
      'Provide visual execution graph with real-time step inspection and token tracing.',
      'Implement strict sandboxed safeguards preventing unauthorized code or database mutation.'
    ],
    solution: 'SriVoraTech is developing the SriVora AI Agent framework leveraging LangGraph state machines, FastAPI microservices, and sandboxed Docker runtimes.',
    architectureDiagram: `[Enterprise User Prompt / Workflow Trigger]
         │
         ▼
[Multi-Agent Supervisor (LangGraph State Machine)]
    ├── Agent 1: Research & Document Retrieval (RAG)
    ├── Agent 2: Code Synthesis / Logic Processing
    └── Agent 3: QA Critic & Verification
         │
         ▼
[Sandboxed Execution Environment (Docker Isolation)]
         │
         ▼
[Verified Output / Webhook Notification]`,
    features: [
      'Multi-Agent Graph Topologies with Dynamic Handoffs',
      'Real-Time Telemetry and Step-by-Step Thought Inspector',
      'Sandboxed Docker Execution Environment for Safety',
      'Vector Embedding Knowledge Bases for Deep Context',
      'Custom LLM Tool-Calling & REST API Integration'
    ],
    implementationDetails: [
      'Architecting cyclic state graphs with checkpoint persistence to allow resuming paused workflows.',
      'Building live telemetry WebSocket stream streaming agent reasoning steps directly to frontend UI.'
    ],
    challenges: 'Managing infinite loops and coordination deadlocks among collaborative agents. Solved using maximum recursion limits and deterministic supervisor arbitration.',
    resultsList: [
      'Architectural blueprint completed and currently in active development.',
      'Initial prototypes demonstrate successful automated multi-step research and synthesis.'
    ],
    technologies: ['Python', 'LangGraph', 'FastAPI', 'OpenAI API', 'Docker', 'Pinecone']
  },
  {
    id: 'omnichannel-erp',
    title: 'OmniChannel Cloud ERP',
    headline: 'Multi-Store Inventory, POS & Supply Chain Automation Platform',
    category: 'Enterprise Software • Cloud ERP',
    catGroup: 'upcoming',
    status: 'Planned',
    statusTag: 'Architecture & Planning Phase',
    showcaseImg: '/omnichannel-erp-dashboard.png',
    adminImg: '/omnichannel-erp-dashboard.png',
    galleryImgs: [
      { src: '/omnichannel-erp-dashboard.png', title: 'Multi-Store Inventory, POS & Supply Chain Automation Engine' }
    ],
    color: '#0067f4',
    gradient: 'linear-gradient(135deg, #0067f4, #06b6d4)',
    about: 'A planned cloud-native ERP platform architected for retail chains, franchises, and multi-location warehouses to unify point-of-sale (POS), warehouse stock, and automated supplier reordering.',
    hq: 'Hyderabad, India',
    industry: 'Retail Tech & Supply Chain',
    companySize: 'Franchise Networks & Multi-Store Retailers',
    servicesOffered: ['Microservices Design', 'Event-Driven Architecture', 'Cloud POS Specifications', 'Database Sharding'],
    challenge: 'Multi-location retail businesses experience inventory synchronization delays between physical store POS terminals and online warehouses, resulting in overselling and stockouts.',
    businessRequirements: [
      'Synchronize inventory state across hundreds of retail POS terminals in sub-second latency.',
      'Provide offline-capable POS interface that syncs sales data immediately upon reconnect.',
      'Automate purchase orders based on real-time stock thresholds.'
    ],
    solution: 'SriVoraTech is designing OmniChannel ERP Cloud utilizing Go microservices, Apache Kafka event streaming, and offline-first Progressive Web App (PWA) terminals.',
    architectureDiagram: `[Store 1 POS Terminal]   [Store 2 POS Terminal]   [E-Commerce Storefront]
         │                        │                        │
         └────────────────────────┼────────────────────────┘
                                  │
                                  ▼
                    [Apache Kafka Event Stream]
                                  │
                                  ▼
                [Inventory & POS Go Microservices]
                                  │
                     [PostgreSQL Distributed DB]`,
    features: [
      'Sub-Second Multi-Location Stock Synchronization',
      'Offline-First Progressive Web App (PWA) Point-of-Sale Terminal',
      'Automated Reorder Point Triggers & Supplier Workflows',
      'Centralized Financial Reporting and Tax Calculation',
      'Role-Based Cashier, Store Manager, and Executive Access'
    ],
    implementationDetails: [
      'System design document and database schema specifications completed.',
      'Kafka event schemas planned for high-throughput transactional consistency.'
    ],
    challenges: 'Handling concurrent purchase transactions for the last remaining unit of an item in two separate stores simultaneously. Designed with distributed optimistic locks.',
    resultsList: [
      'Full technical architecture and system specifications established.',
      'Scheduled for phased development and client pilot rollout.'
    ],
    technologies: ['Golang', 'React.js', 'Apache Kafka', 'PostgreSQL', 'Docker', 'Kubernetes']
  }
]

const categories = [
  { id: 'all', label: 'All Solutions' },
  { id: 'enterprise', label: 'Enterprise & ERP' },
  { id: 'ai', label: 'AI & Automation' },
  { id: 'commerce', label: 'E-Commerce' },
  { id: 'healthcare', label: 'Healthcare' },
  { id: 'education', label: 'Education' },
  { id: 'crm', label: 'CRM & Workspace' },
  { id: 'upcoming', label: '🚀 Upcoming / Roadmap' },
]

/* Individual card component */
function WorkCard({ work, idx, onSelect }) {
  const [cardRef, cardVisible] = useScrollAnimation()
  const [isHovered, setIsHovered] = useState(false)

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Live':
        return { label: '● Live Platform', color: '#10b981' }
      case 'Prototype':
        return { label: '⚡ Functional Prototype', color: '#8b5cf6' }
      case 'In Development':
        return { label: '🛠️ In Development', color: '#0067f4' }
      case 'Planned':
      default:
        return { label: '📋 Planned Architecture', color: '#f59e0b' }
    }
  }

  const statusBadge = getStatusBadge(work.status)

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
      aria-label={`View case study for ${work.title}`}
    >
      {/* Top Banner Image Container */}
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

      {/* Status Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 18px 4px' }}>
        <span style={{ fontSize: '11px', fontWeight: '700', color: statusBadge.color, background: `${statusBadge.color}15`, padding: '3px 10px', borderRadius: '999px', border: `1px solid ${statusBadge.color}30` }}>
          {statusBadge.label}
        </span>
        {work.liveUrl && (
          <a
            href={work.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: '11.5px', color: '#0067f4', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
            onClick={(e) => e.stopPropagation()}
            title="Open Live Application"
          >
            <Globe size={12} /> Live Site ↗
          </a>
        )}
      </div>

      {/* Clean Professional Card Body */}
      <div style={{ padding: '8px 18px 16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#0f172a', margin: '4px 0 6px', lineHeight: '1.3' }}>
          {work.title}
        </h3>
        <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.5', margin: '0 0 14px', flex: 1 }}>
          {work.about}
        </p>

        {/* Tech Chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
          {work.technologies.slice(0, 4).map((tech) => (
            <span key={tech} style={{ fontSize: '11px', padding: '3px 8px', background: '#f1f5f9', color: '#475569', borderRadius: '6px', fontWeight: '600' }}>
              {tech}
            </span>
          ))}
          {work.technologies.length > 4 && (
            <span style={{ fontSize: '11px', padding: '3px 6px', background: '#e2e8f0', color: '#64748b', borderRadius: '6px', fontWeight: '600' }}>
              +{work.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Footer Row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '10px', borderTop: '1px solid #f1f5f9', marginTop: 'auto' }}>
          <span style={{ fontSize: '11.5px', color: '#94a3b8', fontWeight: '600' }}>
            {work.industry}
          </span>
          <span style={{ fontSize: '12px', color: '#0067f4', fontWeight: '700', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            Case Study <ArrowUpRight size={13} />
          </span>
        </div>
      </div>

      <div className={`work-card-overlay ${isHovered ? 'work-card-overlay--visible' : ''}`}>
        <span className="work-view-label">
          View Structured Case Study <ArrowUpRight size={16} />
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

/* Full Structured Case Study Page */
function ProjectDetailPage({ project, onClose, onSelectProject, allProjects }) {
  const pageRef = useRef(null)

  useEffect(() => {
    if (pageRef.current) pageRef.current.scrollTo(0, 0)
  }, [project])

  const otherProjects = allProjects.filter(p => p.id !== project.id).slice(0, 3)

  return (
    <div className="project-page-backdrop" role="dialog" aria-modal="true">
      <div className="project-page" ref={pageRef}>
        {/* Top Sticky Bar */}
        <div className="project-page-nav">
          <button className="project-back-btn" onClick={onClose}>
            <ArrowLeft size={16} />
            <span>Back to All Products</span>
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 14px', background: '#0067f4', color: '#ffffff', borderRadius: '8px', fontSize: '13px', fontWeight: '600', textDecoration: 'none' }}
              >
                <Globe size={14} /> Live Demo <ExternalLink size={13} />
              </a>
            )}
            <button className="project-close-btn" onClick={onClose} aria-label="Close Case Study">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Hero Section */}
        <div className="project-hero">
          <div className="project-hero-left">
            <div className="project-breadcrumb">
              <span className="breadcrumb-link" onClick={onClose}>Our Work</span>
              <ChevronRight size={14} />
              <span className="breadcrumb-current">{project.title.split(' - ')[0]}</span>
            </div>
            
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <span style={{ fontSize: '12px', fontWeight: '700', padding: '4px 12px', borderRadius: '999px', background: project.status === 'Live' ? '#10b98120' : '#8b5cf620', color: project.status === 'Live' ? '#10b981' : '#8b5cf6', border: `1px solid ${project.status === 'Live' ? '#10b98140' : '#8b5cf640'}` }}>
                Status: {project.statusTag || project.status}
              </span>
              <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>
                {project.category}
              </span>
            </div>

            <h1 className="project-hero-title">{project.title}</h1>
            <p style={{ fontSize: '16px', color: '#475569', lineHeight: '1.6', margin: '12px 0 20px' }}>
              {project.headline}
            </p>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '14px', marginBottom: '20px' }}>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-live-demo-btn"
                >
                  <Globe size={16} /> Open Live Platform <ExternalLink size={15} />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 18px', background: '#0f172a', color: '#ffffff', borderRadius: '10px', fontSize: '14px', fontWeight: '600', textDecoration: 'none' }}
                >
                  <GitBranch size={16} /> GitHub Source <ExternalLink size={14} />
                </a>
              )}
            </div>
          </div>

          <div className="project-hero-right">
            <div className="project-hero-banner-frame" style={{ borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.1)', boxShadow: '0 12px 32px rgba(0,0,0,0.15)' }}>
              {project.showcaseImg ? (
                <img src={project.showcaseImg} alt={project.title} style={{ width: '100%', height: '300px', objectFit: 'cover', objectPosition: 'top center', display: 'block' }} />
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

        {/* 3-Column Structured Case Study Body */}
        <div className="project-body">
          {/* Left Sidebar Info */}
          <aside className="project-sidebar-left">
            <div className="sidebar-section">
              <span className="sidebar-label">PROJECT OVERVIEW</span>
              <h4 className="sidebar-company">{project.title.split(' - ')[0]}</h4>
              <p className="sidebar-desc">{project.about}</p>
            </div>

            <div className="sidebar-section">
              <span className="sidebar-label">STATUS</span>
              <p className="sidebar-value" style={{ color: project.status === 'Live' ? '#10b981' : '#8b5cf6', fontWeight: '700' }}>
                {project.statusTag || project.status}
              </p>
            </div>

            <div className="sidebar-section">
              <span className="sidebar-label">LOCATION & TEAM</span>
              <p className="sidebar-value"><MapPin size={14} /> {project.hq}</p>
              <p style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>Engineering: SriVoraTech Core Team</p>
            </div>

            <div className="sidebar-section">
              <span className="sidebar-label">TARGET INDUSTRY</span>
              <p className="sidebar-value"><Building2 size={14} /> {project.industry}</p>
            </div>

            <div className="sidebar-section">
              <span className="sidebar-label">TARGET SCALE</span>
              <p className="sidebar-value"><Users size={14} /> {project.companySize}</p>
            </div>

            <div className="sidebar-section">
              <span className="sidebar-label">CORE ENGINEERING SERVICES</span>
              <ul className="sidebar-services-list">
                {project.servicesOffered.map((svc, i) => (
                  <li key={i}>{svc}</li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Center Main Case Study Content */}
          <main className="project-content">
            {/* 1. Problem Statement */}
            <section style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: '800', color: '#ef4444', textTransform: 'uppercase', letterSpacing: '0.08em' }}>1. The Challenge</span>
              </div>
              <h2 className="content-heading" style={{ marginTop: 0 }}>Operational Problem Statement</h2>
              <p className="content-text">{project.challenge}</p>
            </section>

            {/* 2. Business Requirements */}
            {project.businessRequirements && project.businessRequirements.length > 0 && (
              <section style={{ marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', fontWeight: '800', color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.08em' }}>2. Business Objectives</span>
                </div>
                <h2 className="content-heading" style={{ marginTop: 0 }}>Business Requirements</h2>
                <ul className="content-list content-list--features">
                  {project.businessRequirements.map((req, i) => (
                    <li key={i}>
                      <CheckCircle2 size={16} style={{ color: '#f59e0b', flexShrink: 0 }} />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* 3. Proposed Solution */}
            <section style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: '800', color: '#0067f4', textTransform: 'uppercase', letterSpacing: '0.08em' }}>3. SriVoraTech Solution</span>
              </div>
              <h2 className="content-heading" style={{ marginTop: 0 }}>Proposed Architecture &amp; Solution</h2>
              <p className="content-text">{project.solution}</p>
            </section>

            {/* 4. Architecture Diagram */}
            {project.architectureDiagram && (
              <section style={{ marginBottom: '36px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', fontWeight: '800', color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.08em' }}>4. System Architecture</span>
                </div>
                <h2 className="content-heading" style={{ marginTop: 0 }}>High-Level System Design &amp; Data Flow</h2>
                <div style={{ background: '#0f172a', color: '#38bdf8', padding: '20px 24px', borderRadius: '14px', fontFamily: 'monospace', fontSize: '13px', lineHeight: '1.6', overflowX: 'auto', border: '1px solid #1e293b' }}>
                  <pre style={{ margin: 0 }}>{project.architectureDiagram}</pre>
                </div>
              </section>
            )}

            {/* 5. Actual Screenshots Slideshow & Lightbox */}
            {project.galleryImgs && project.galleryImgs.length > 0 && (
              <section style={{ margin: '36px 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', fontWeight: '800', color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.08em' }}>5. UI &amp; Screenshots</span>
                </div>
                <h2 className="content-heading" style={{ marginTop: 0 }}>Actual Platform Interface ({project.galleryImgs.length} Views)</h2>
                <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.1)', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}>
                  <ImageSlideshow images={project.galleryImgs} interval={4000} height="420px" showControls={true} showThumbnails={true} />
                </div>
                <GalleryLightbox images={project.galleryImgs} color={project.color} />
              </section>
            )}

            {/* 6. Core Features */}
            <section style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: '800', color: '#8b5cf6', textTransform: 'uppercase', letterSpacing: '0.08em' }}>6. Platform Features</span>
              </div>
              <h2 className="content-heading" style={{ marginTop: 0 }}>Key Features &amp; Functional Capabilities</h2>
              <ul className="content-list content-list--features">
                {project.features.map((feat, i) => (
                  <li key={i}>
                    <CheckCircle2 size={16} style={{ color: project.color, flexShrink: 0 }} />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 7. Implementation Details */}
            {project.implementationDetails && project.implementationDetails.length > 0 && (
              <section style={{ marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', fontWeight: '800', color: '#06b6d4', textTransform: 'uppercase', letterSpacing: '0.08em' }}>7. Engineering Approach</span>
                </div>
                <h2 className="content-heading" style={{ marginTop: 0 }}>Implementation &amp; Code Architecture</h2>
                <ul className="content-list">
                  {project.implementationDetails.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* 8. Technical Challenges */}
            {project.challenges && (
              <section style={{ marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', fontWeight: '800', color: '#ec4899', textTransform: 'uppercase', letterSpacing: '0.08em' }}>8. Obstacles Solved</span>
                </div>
                <h2 className="content-heading" style={{ marginTop: 0 }}>Technical Challenges Overcome</h2>
                <p className="content-text">{project.challenges}</p>
              </section>
            )}

            {/* 9. Results */}
            <section style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: '800', color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.08em' }}>9. Measurable Results</span>
              </div>
              <h2 className="content-heading" style={{ marginTop: 0 }}>Verified Performance &amp; Outcomes</h2>
              <ul className="content-list content-list--features">
                {project.resultsList.map((res, i) => (
                  <li key={i}>
                    <CheckCircle2 size={16} style={{ color: '#10b981', flexShrink: 0 }} />
                    <span>{res}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 10. Technology Stack */}
            <section className="project-tech-section" style={{ margin: '32px 0' }}>
              <h3 className="content-subheading">10. Technology Stack</h3>
              <div className="project-tech-tags">
                {project.technologies.map(tech => (
                  <span key={tech} className="project-tech-tag">{tech}</span>
                ))}
              </div>
            </section>

            {/* 11. Links & CTA */}
            <div className="project-cta-section" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '40px', padding: '32px', background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-cta-btn project-cta-btn--live"
                  style={{ background: project.gradient || '#0067f4' }}
                >
                  <Globe size={18} /> Launch Live Demo ({project.title.split(' - ')[0]}) <ExternalLink size={18} />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-cta-btn"
                  style={{ background: '#0f172a', color: '#ffffff' }}
                >
                  <GitBranch size={18} /> View GitHub Repo <ExternalLink size={18} />
                </a>
              )}
              <a href="#contact" className="project-cta-btn" onClick={onClose}>
                Request Custom Solution <ArrowUpRight size={18} />
              </a>
            </div>
          </main>

          {/* Right Sidebar Tech Stack */}
          <aside className="project-sidebar-right">
            <div className="sidebar-section">
              <span className="sidebar-label">CORE TOOLS</span>
              <ul className="sidebar-services-list">
                {project.technologies.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </div>
            {project.liveUrl && (
              <div className="sidebar-section" style={{ marginTop: '24px' }}>
                <span className="sidebar-label">DEPLOYED URL</span>
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
          </aside>
        </div>

        {/* Suggested Other Products */}
        <div className="project-suggestions">
          <h3 className="suggestions-title">Explore Other Solutions &amp; Products</h3>
          <div className="suggestions-grid">
            {otherProjects.map(p => (
              <div
                key={p.id}
                className="suggestion-card"
                onClick={() => {
                  onSelectProject(p)
                  if (pageRef.current) pageRef.current.scrollTo({ top: 0, behavior: 'smooth' })
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
                    {p.status || p.category}
                  </span>
                </div>
                <div className="suggestion-card-info">
                  <h4>{p.title}</h4>
                  <span className="suggestion-link">View Case Study <ArrowUpRight size={14} /></span>
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
          <div className="light-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', background: 'rgba(0, 103, 244, 0.08)', borderRadius: '999px', color: '#0067f4', fontSize: '12px', fontWeight: '700', marginBottom: '14px', border: '1px solid rgba(0, 103, 244, 0.15)' }}>
            <Sparkles size={14} />
            <span>PORTFOLIO &amp; SIGNATURE PRODUCTS</span>
          </div>
          <h2 className="section-title">Our Solutions &amp; Structured Case Studies</h2>
          <p className="section-subtitle">
            Explore SriVoraTech's live products, architectural prototypes, and engineering case studies with full technical transparency.
          </p>
        </div>

        {/* Filter Bar & Search */}
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
