import { useState } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import {
  Code,
  Smartphone,
  Laptop,
  Globe,
  Bot,
  Workflow,
  Brain,
  Cpu,
  Building2,
  Users,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Zap,
  Cloud,
  Database,
  Terminal,
  Server,
  Layers,
  HelpCircle,
  Briefcase
} from 'lucide-react'
import './Services.css'

export const serviceDivisions = [
  { id: 'all', label: 'All Divisions', count: 18 },
  { id: 'software-engineering', label: 'Division 1: Software Engineering', count: 7, icon: Code },
  { id: 'ai-automation', label: 'Division 2: AI & Intelligent Automation', count: 6, icon: Bot },
  { id: 'cloud-engineering', label: 'Division 3: Cloud & Digital Engineering', count: 5, icon: Cloud },
]

export const servicesData = [
  // ── DIVISION 1: SOFTWARE ENGINEERING ──
  {
    id: 'fullstack-dev',
    title: 'Full-Stack Development',
    division: 'software-engineering',
    divisionLabel: 'Software Engineering',
    badge: 'Enterprise Architecture',
    metric: '⚡ Agile Delivery',
    desc: 'End-to-end software development combining modern reactive frontends, resilient backend APIs, and ACID-compliant relational databases.',
    problemSolved: 'Eliminates fragmented vendor silos, reducing architectural bugs and ensuring high cross-team velocity.',
    projectExample: 'SriERP Pro Campus Management & ShopSphere Multi-Vendor Hub',
    icon: Code,
    color: '#0067f4',
    gradient: 'linear-gradient(135deg, #0067f4, #2563eb)',
    features: [
      'React 19 & Next.js 15 Server-Side Architecture',
      'Node.js & Express REST / GraphQL APIs',
      'PostgreSQL, MySQL & MongoDB Database Pipelines',
      'TypeScript Type-Safe End-to-End Contracts'
    ],
    technologies: ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker'],
    benefits: ['Single-source codebase', 'Optimized Low-Latency APIs', '100% Code Ownership']
  },
  {
    id: 'webapp-dev',
    title: 'Web Application Development',
    division: 'software-engineering',
    divisionLabel: 'Software Engineering',
    badge: 'High Performance',
    metric: '🚀 High Availability',
    desc: 'Bespoke web platforms built for speed, conversion rate optimization, and high concurrent active users.',
    problemSolved: 'Solves slow page load times, high bounce rates, and broken responsive mobile layouts.',
    projectExample: 'ShopSphere E-Commerce & HealthConnect Telemedicine Portal',
    icon: Globe,
    color: '#6366f1',
    gradient: 'linear-gradient(135deg, #6366f1, #4f46e5)',
    features: [
      'Interactive Single Page Applications (SPA) & PWAs',
      'Google Core Web Vitals Performance Optimization',
      'Secure JWT & OAuth2 Session Authentication',
      'Edge CDN Caching & Global Asset Delivery'
    ],
    technologies: ['React', 'Vite', 'TailwindCSS', 'REST APIs', 'Vercel / Cloudflare'],
    benefits: ['Zero layout shifts', 'Instant mobile readiness', 'SEO structured data']
  },
  {
    id: 'mobile-app-dev',
    title: 'Mobile Application Development',
    division: 'software-engineering',
    divisionLabel: 'Software Engineering',
    badge: 'iOS & Android',
    metric: '📱 60 FPS Native UX',
    desc: 'Cross-platform native mobile applications delivering fluid user experiences across smartphones and tablets.',
    problemSolved: 'Significantly reduces cross-platform development overhead compared to maintaining separate native codebases.',
    projectExample: 'HealthConnect Mobile Doctor/Patient Teleconsult App',
    icon: Smartphone,
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981, #059669)',
    features: [
      'Flutter & React Native Unified Codebases',
      'Offline-First Local SQLite / Realm Storage',
      'Biometric Touch ID / Face ID Authentication',
      'App Store & Google Play Store Publishing Pipeline'
    ],
    technologies: ['Flutter', 'React Native', 'Firebase', 'REST APIs', 'SQLite'],
    benefits: ['Unified iOS & Android', 'Offline capability', 'Hardware sensors integration']
  },
  {
    id: 'saas-platforms',
    title: 'SaaS Platforms',
    division: 'software-engineering',
    divisionLabel: 'Software Engineering',
    badge: 'Multi-Tenant',
    metric: '📈 Scalable Revenue',
    desc: 'Multi-tenant Software-as-a-Service platforms engineered for recurring subscriptions, seat management, and isolated tenant databases.',
    problemSolved: 'Prevents data leakage across tenants while enabling seamless tiered billing and user management.',
    projectExample: 'SmartAI Assistant Studio & ProjectFlow Workspace',
    icon: Laptop,
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
    features: [
      'Multi-Tenant Tenant Isolation & Row-Level Security',
      'Automated Stripe / Razorpay Subscription Webhooks',
      'Custom Role-Based Access Control (RBAC)',
      'Self-Service Workspace & Team Invite Engine'
    ],
    technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe / Razorpay', 'Docker'],
    benefits: ['Automated billing', 'Tenant data isolation', 'Fast onboarding']
  },
  {
    id: 'erp-crm',
    title: 'ERP & CRM Systems',
    division: 'software-engineering',
    divisionLabel: 'Software Engineering',
    badge: 'Enterprise Core',
    metric: '🏢 Unified Operations',
    desc: 'Centralized enterprise platforms that integrate human resources, payroll, inventory, sales pipelines, and financial reports.',
    problemSolved: 'Replaces disconnected spreadsheets and fragmented software tools with a single verified dashboard.',
    projectExample: 'SriERP Pro Enterprise Platform',
    icon: Building2,
    color: '#06b6d4',
    gradient: 'linear-gradient(135deg, #06b6d4, #0284c7)',
    features: [
      'Automated Payroll & Biometric Attendance Logging',
      'Multi-Location Real-Time Warehouse Inventory',
      'Sales Pipeline Kanban & Client Communication CRM',
      'Audit Logs & Strict Role-Based Permissions'
    ],
    technologies: ['React', 'NestJS / Express', 'PostgreSQL', 'Redis', 'Docker'],
    benefits: ['Unified data source', 'Zero manual spreadsheet errors', 'Real-time financial audits']
  },
  {
    id: 'custom-software',
    title: 'Custom Software Development',
    division: 'software-engineering',
    divisionLabel: 'Software Engineering',
    badge: 'Bespoke Engineering',
    metric: '🛡️ Zero Vendor Lock-in',
    desc: 'Tailored software solutions engineered strictly to your proprietary business logic, workflow rules, and compliance standards.',
    problemSolved: 'Eliminates monthly per-seat licensing costs and rigid constraints of off-the-shelf software.',
    projectExample: 'Custom EMR Video Engine & University Exam Portals',
    icon: Layers,
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
    features: [
      'Tailor-Made Data Models & Workflow State Machines',
      'Microservices & Clean Domain-Driven Design (DDD)',
      'Comprehensive Automated Unit & Integration Tests',
      '100% Intellectual Property & Source Handover'
    ],
    technologies: ['Node.js', 'Python', 'React', 'PostgreSQL', 'AWS'],
    benefits: ['Tailored to exact workflows', 'Full IP transfer', 'Unlimited scalability']
  },
  {
    id: 'api-development',
    title: 'API Development & System Integration',
    division: 'software-engineering',
    divisionLabel: 'Software Engineering',
    badge: 'Low-Latency APIs',
    metric: '⚡ High Concurrency',
    desc: 'Robust RESTful, GraphQL, and WebSocket APIs engineered with rate limiting, OpenAPI specifications, and caching.',
    problemSolved: 'Connects legacy databases and third-party SaaS services with secure, low-latency bridges.',
    projectExample: 'High-Throughput Webhook Event Hub & Payment Integrations',
    icon: Terminal,
    color: '#ec4899',
    gradient: 'linear-gradient(135deg, #ec4899, #db2777)',
    features: [
      'Swagger / OpenAPI Documented Endpoints',
      'Redis Caching & Token-Bucket Rate Limiting',
      'Webhook Subscription & Event Delivery Handlers',
      'HMAC Signature & Mutual TLS Security'
    ],
    technologies: ['Node.js', 'FastAPI', 'Express', 'Redis', 'Postman'],
    benefits: ['Clear documentation', 'Secure rate limiting', 'High throughput']
  },

  // ── DIVISION 2: AI & INTELLIGENT AUTOMATION ──
  {
    id: 'generative-ai',
    title: 'Generative AI & LLM Engineering',
    division: 'ai-automation',
    divisionLabel: 'AI & Intelligent Automation',
    badge: 'State of the Art',
    metric: '🧠 Multi-Modal AI',
    desc: 'Custom generative AI solutions utilizing OpenAI GPT-4o, Google Gemini, and Anthropic Claude for document generation and creative workflows.',
    problemSolved: 'Automates manual content drafting, technical report synthesis, and document translation.',
    projectExample: 'SmartAI Document Summarizer & Automated SOAP Clinical Notes',
    icon: Brain,
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
    features: [
      'Prompt Engineering & Structured JSON Output Schemas',
      'Multi-Modal Image & Document Understanding',
      'Hallucination Guardrails & Content Moderation',
      'Cost-Optimized Model Routing (Flash / Pro)'
    ],
    technologies: ['OpenAI API', 'Google Gemini', 'Anthropic Claude', 'Python', 'LangChain'],
    benefits: ['Accelerated content workflows', 'Grounded RAG retrieval to minimize hallucinations', 'Token cost optimization']
  },
  {
    id: 'ai-agents',
    title: 'Autonomous AI Agents',
    division: 'ai-automation',
    divisionLabel: 'AI & Intelligent Automation',
    badge: 'Agentic Workflows',
    metric: '🤖 Multi-Step Reasoning',
    desc: 'Goal-oriented AI agents capable of planning multi-step actions, calling external APIs, querying databases, and executing workflows autonomously.',
    problemSolved: 'Eliminates repetitive cross-tool manual task execution by employees.',
    projectExample: 'SriVora AI Autonomous Task Graph & SmartAI Assistant Builder',
    icon: Bot,
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b, #ea580c)',
    features: [
      'LangGraph & CrewAI Multi-Agent Coordination',
      'Dynamic Tool Calling & Webhook Execution',
      'Memory Retention (Short-Term & Long-Term)',
      'Sandboxed Execution & Human-in-the-Loop Safeguards'
    ],
    technologies: ['Python', 'LangGraph', 'FastAPI', 'Pinecone', 'OpenAI'],
    benefits: ['Autonomous multi-step tasks', 'Human oversight controls', 'Tool-calling execution']
  },
  {
    id: 'rag-systems',
    title: 'Retrieval-Augmented Generation (RAG)',
    division: 'ai-automation',
    divisionLabel: 'AI & Intelligent Automation',
    badge: 'Enterprise Vector Search',
    metric: '🔍 Fast Vector Retrieval',
    desc: 'Connect private company knowledge bases, PDFs, databases, and wikis to AI models without data leakage or hallucinations.',
    problemSolved: 'Enables instant answers grounded strictly in verified enterprise company documents.',
    projectExample: 'SmartAI Knowledge Base & EMR Medical Protocol Assistant',
    icon: Database,
    color: '#0067f4',
    gradient: 'linear-gradient(135deg, #0067f4, #0284c7)',
    features: [
      'Vector Embedding Pipelines (Pinecone / Chroma / pgvector)',
      'Document Chunking & Hybrid Semantic Search',
      'Re-ranking Algorithms for Context Precision',
      'Strict Role-Based Document Access Isolation'
    ],
    technologies: ['Python', 'Pinecone', 'ChromaDB', 'LangChain', 'FastAPI'],
    benefits: ['Accurate source citations', 'Data remains private', 'Sub-second document lookup']
  },
  {
    id: 'machine-learning',
    title: 'Applied Machine Learning',
    division: 'ai-automation',
    divisionLabel: 'AI & Intelligent Automation',
    badge: 'Predictive Analytics',
    metric: '📊 Data-Driven Insights',
    desc: 'Custom regression, classification, and time-series forecasting models trained on structured enterprise business data.',
    problemSolved: 'Transforms raw database records into actionable predictive insights for churn, demand, and risk.',
    projectExample: 'ShopSphere Inventory Demand Forecasting & Retail Trends',
    icon: Cpu,
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981, #0d9488)',
    features: [
      'Predictive Churn & Customer Lifetime Value Models',
      'Inventory Demand & Reorder Point Optimization',
      'Data Preprocessing & Automated Feature Pipelines',
      'Model Drift Monitoring & Continuous Evaluation'
    ],
    technologies: ['Python', 'Scikit-Learn', 'Pandas', 'FastAPI', 'PostgreSQL'],
    benefits: ['Reduced inventory waste', 'Accurate demand forecast', 'Data-driven decisions']
  },
  {
    id: 'ai-chatbots',
    title: 'Intelligent AI Chatbots',
    division: 'ai-automation',
    divisionLabel: 'AI & Intelligent Automation',
    badge: 'Continuous Automated Assistance',
    metric: '💬 Automated Inquiry Resolution',
    desc: 'Omnichannel AI conversational assistants trained on company FAQs, product catalogs, and policies with escalation to human agents.',
    problemSolved: 'Resolves customer inquiries instantly at 2 AM without requiring a 24/7 human support desk.',
    projectExample: 'Live Embed Chatbot Widget & Multi-Language Support Engine',
    icon: Bot,
    color: '#ec4899',
    gradient: 'linear-gradient(135deg, #ec4899, #be185d)',
    features: [
      'Seamless Embeddable JavaScript Widget',
      'Multi-Language Translation & Context Memory',
      'Human Agent Handoff via Slack / Email / CRM',
      'Analytics Dashboard on Inquiries & Sentiment'
    ],
    technologies: ['React', 'Python', 'FastAPI', 'OpenAI', 'WebSockets'],
    benefits: ['Continuous automated response', 'Context-aware inquiry handling', 'CRM pipeline synchronization']
  },
  {
    id: 'workflow-automation',
    title: 'Intelligent Workflow Automation',
    division: 'ai-automation',
    divisionLabel: 'AI & Intelligent Automation',
    badge: 'Process Efficiency',
    metric: '⏱️ Significant Time Savings',
    desc: 'Automating repetitive data entry, PDF invoice processing, lead qualification, and cross-department notification pipelines.',
    problemSolved: 'Eliminates hours of manual copy-pasting between Google Sheets, CRMs, emails, and databases.',
    projectExample: 'SmartAI Visual Workflow Canvas & Google Sheets Sync Pipeline',
    icon: Workflow,
    color: '#06b6d4',
    gradient: 'linear-gradient(135deg, #06b6d4, #0e7490)',
    features: [
      'Automated Document OCR & Invoice Extraction',
      'Multi-System Webhook & API Orchestration',
      'Automated Email & WhatsApp Notification Triggers',
      'Error Handling & Scheduled Cron Jobs'
    ],
    technologies: ['Python', 'Node.js', 'Google Apps Script', 'FastAPI', 'Redis'],
    benefits: ['Eliminates manual entry errors', 'Real-time alert dispatch', 'Substantial operational time savings']
  },

  // ── DIVISION 3: CLOUD & DIGITAL ENGINEERING ──
  {
    id: 'aws-cloud',
    title: 'AWS Cloud & Architecture',
    division: 'cloud-engineering',
    divisionLabel: 'Cloud & Digital Engineering',
    badge: 'High Availability',
    metric: '☁️ Multi-AZ Resilience',
    desc: 'Scalable AWS cloud architecture design utilizing ECS, Lambda serverless, RDS PostgreSQL, S3, and CloudFront.',
    problemSolved: 'Prevents server crashes under traffic spikes and reduces unoptimized monthly cloud bills.',
    projectExample: 'Dockerized AWS ECS Multi-Container Infrastructure',
    icon: Cloud,
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b, #b45309)',
    features: [
      'AWS Multi-AZ VPC Network Architecture',
      'Containerized Microservices on ECS / Fargate',
      'Automated RDS PostgreSQL Backups & Read Replicas',
      'CloudFront CDN Global Content Acceleration'
    ],
    technologies: ['AWS ECS', 'AWS RDS', 'S3', 'CloudFront', 'Route53', 'Docker'],
    benefits: ['Fault-tolerant architecture', 'Optimized cloud costs', 'Global CDN latency']
  },
  {
    id: 'devops-cicd',
    title: 'DevOps & CI/CD Pipelines',
    division: 'cloud-engineering',
    divisionLabel: 'Cloud & Digital Engineering',
    badge: 'Automated Release',
    metric: '⚡ Automated CI/CD',
    desc: 'Automated Continuous Integration and Continuous Deployment (CI/CD) pipelines with linting, testing, and blue-green deployments.',
    problemSolved: 'Eliminates stressful manual FTP/SSH deployments and avoids pushing broken code to production.',
    projectExample: 'GitHub Actions Automated Testing & Vercel / AWS Pipeline',
    icon: Terminal,
    color: '#0067f4',
    gradient: 'linear-gradient(135deg, #0067f4, #1d4ed8)',
    features: [
      'GitHub Actions Automated Test & Build Pipelines',
      'Docker Multi-Stage Image Optimization',
      'Blue-Green & Rolling Zero-Downtime Deploys',
      'Secrets Management & Environment Vault'
    ],
    technologies: ['GitHub Actions', 'Docker', 'Linux', 'Vercel', 'Nginx'],
    benefits: ['Fast, safe deployments', 'Automated testing checks', 'Immediate rollback safety']
  },
  {
    id: 'database-engineering',
    title: 'Database Engineering & Optimization',
    division: 'cloud-engineering',
    divisionLabel: 'Cloud & Digital Engineering',
    badge: 'Data Integrity',
    metric: '⚡ Optimized Query Indexing',
    desc: 'Schema modeling, index optimization, read replication, connection pooling, and automated backup strategies.',
    problemSolved: 'Fixes slow database queries, connection pool exhaustion, and prevents disastrous data loss.',
    projectExample: 'High-Throughput PostgreSQL & Redis Caching Layer',
    icon: Database,
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981, #047857)',
    features: [
      'Relational (PostgreSQL, MySQL) & NoSQL (MongoDB) Modeling',
      'Redis In-Memory Caching & Session Stores',
      'Indexing Strategies & Query Execution Plan Tuning',
      'Automated Point-in-Time Recovery (PITR)'
    ],
    technologies: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Prisma'],
    benefits: ['Sub-millisecond query speed', 'Data integrity guarantees', 'Automated backup recovery']
  },
  {
    id: 'cloud-security',
    title: 'Cloud Security & Infrastructure Hardening',
    division: 'cloud-engineering',
    divisionLabel: 'Cloud & Digital Engineering',
    badge: 'OWASP Standards',
    metric: '🔒 Defense-in-Depth',
    desc: 'Hardened cloud infrastructure with SSL/TLS encryption, firewall rules, rate limiting, and vulnerability scanning.',
    problemSolved: 'Protects customer data from unauthorized access, injection attacks, and DDoS threats.',
    projectExample: 'Hardened API Gateway & Role-Based JWT Security Audit',
    icon: ShieldCheck,
    color: '#6366f1',
    gradient: 'linear-gradient(135deg, #6366f1, #4338ca)',
    features: [
      'Strict Content Security Policy (CSP) & Security Headers',
      'Web Application Firewall (WAF) & DDoS Rate Limiting',
      'End-to-End Encryption in Transit (TLS 1.3) & Rest (AES-256)',
      'Automated Dependency Vulnerability Audits'
    ],
    technologies: ['AWS WAF', 'SSL/TLS', 'JWT', 'OWASP Standards', 'Docker'],
    benefits: ['Hardened against exploits', 'Encrypted customer data', 'Compliance-ready posture']
  },
  {
    id: 'monitoring-maintenance',
    title: 'Monitoring, Alerting & High-Availability Target',
    division: 'cloud-engineering',
    divisionLabel: 'Cloud & Digital Engineering',
    badge: 'Proactive Health',
    metric: '📊 Real-Time Telemetry',
    desc: 'Continuous application telemetry, server health monitoring, crash reporting, and proactive incident response.',
    problemSolved: 'Catches performance bottlenecks and server errors before customers experience disruptions.',
    projectExample: 'Telemetry Health Check Endpoints & Real-Time Alerting',
    icon: Server,
    color: '#06b6d4',
    gradient: 'linear-gradient(135deg, #06b6d4, #0369a1)',
    features: [
      'Real-Time Server Health & API Uptime Monitoring',
      'Automated Error Tracking & Crash Alerts',
      'Resource Utilization & Auto-Scaling Rules',
      'Periodic Security Updates & Patch Management'
    ],
    technologies: ['CloudWatch', 'Prometheus', 'Grafana', 'Sentry', 'Docker'],
    benefits: ['Proactive error detection', 'Target 99.9% availability', 'Rapid incident triage & resolution']
  }
]

export default function Services({ onNavigate }) {
  const [ref, isVisible] = useScrollAnimation()
  const [activeDivision, setActiveDivision] = useState('all')

  const scrollToContact = (serviceTitle) => {
    const contactElement = document.getElementById('contact')
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' })
    }
    // Dispatch event to pre-populate message in contact form
    window.dispatchEvent(new CustomEvent('svt_populate_estimate', {
      detail: {
        message: `I'm interested in discussing: ${serviceTitle}. Please share more information on scope and delivery timelines.`
      }
    }))
  }

  const filteredServices = activeDivision === 'all'
    ? servicesData
    : servicesData.filter(s => s.division === activeDivision)

  return (
    <section ref={ref} className="services-light section" id="services">
      <div className="light-bg-blob blob-1" />
      <div className="light-bg-blob blob-2" />

      <div className="container">
        {/* Header */}
        <div className={`services-light-header animate-on-scroll ${isVisible ? 'visible' : ''}`}>
          <div className="light-badge">
            <Sparkles size={14} className="badge-icon" />
            <span>PRIMARY BUSINESS DIVISIONS</span>
          </div>
          <h2 className="section-title-light">
            Our Core <span className="gradient-text-blue">Services &amp; Divisions</span>
          </h2>
          <p className="section-subtitle-light">
            SriVoraTech structures its engineering capabilities into three focused business divisions designed to deliver scalable custom software, intelligent AI workflows, and high-availability cloud platforms.
          </p>
        </div>

        {/* Division Switcher Tabs */}
        <div className="services-light-tabs">
          {serviceDivisions.map((div) => (
            <button
              key={div.id}
              className={`light-tab-btn ${activeDivision === div.id ? 'active' : ''}`}
              onClick={() => setActiveDivision(div.id)}
            >
              <span>{div.label}</span>
              <span className="light-tab-badge">{div.count}</span>
            </button>
          ))}
        </div>

        {/* Services Cards Grid */}
        <div className="services-light-grid">
          {filteredServices.map((service, idx) => {
            const Icon = service.icon
            return (
              <div
                key={service.id}
                className={`service-light-card animate-on-scroll ${isVisible ? 'visible' : ''}`}
                style={{ '--accent-color': service.color, '--delay': `${0.04 + (idx % 4) * 0.05}s` }}
              >
                {/* Accent Top Line */}
                <div className="card-top-accent" style={{ background: service.gradient }} />

                {/* Card Header */}
                <div className="card-header-row">
                  <div className="card-icon-circle" style={{ background: `${service.color}15`, color: service.color }}>
                    <Icon size={24} />
                  </div>
                  <div className="card-badges-right">
                    <span className="card-metric-tag">{service.metric}</span>
                    <span className="card-pill-tag">{service.badge}</span>
                  </div>
                </div>

                <div className="card-division-chip">
                  <span>{service.divisionLabel}</span>
                </div>

                {/* Title & Business Description */}
                <h3 className="card-title-text">{service.title}</h3>
                <p className="card-desc-text">{service.desc}</p>

                {/* Problem Solved Box */}
                <div className="card-problem-box">
                  <div className="problem-box-header">
                    <HelpCircle size={13} style={{ color: service.color }} />
                    <strong>What Problem This Solves:</strong>
                  </div>
                  <p className="problem-box-text">{service.problemSolved}</p>
                </div>

                {/* Project Example */}
                <div className="card-example-box">
                  <div className="example-box-header">
                    <Briefcase size={13} style={{ color: service.color }} />
                    <strong>Project Example:</strong>
                  </div>
                  <p className="example-box-text">{service.projectExample}</p>
                </div>

                {/* Key Capabilities */}
                <div className="card-features-box">
                  <span className="box-label">KEY CAPABILITIES</span>
                  <ul className="card-features-list">
                    {service.features.map((feat, i) => (
                      <li key={i}>
                        <CheckCircle2 size={14} className="feat-check-icon" style={{ color: service.color }} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Chips */}
                <div className="card-tech-row">
                  {service.technologies.map((tech) => (
                    <span key={tech} className="light-tech-chip">{tech}</span>
                  ))}
                </div>

                {/* Card Action Footer */}
                <div className="card-action-footer">
                  <div className="card-benefits-inline">
                    {service.benefits.slice(0, 2).map((b, i) => (
                      <span key={i} className="benefit-inline-item">
                        <Zap size={12} style={{ color: service.color }} /> {b}
                      </span>
                    ))}
                  </div>

                  <button
                    className="light-quote-btn"
                    onClick={() => scrollToContact(service.title)}
                    style={{ '--btn-color': service.color }}
                  >
                    <span>Enquire for {service.title}</span>
                    <ArrowRight size={15} className="btn-arrow" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
