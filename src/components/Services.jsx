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
  Palette,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Zap,
  Star
} from 'lucide-react'
import './Services.css'

const serviceCategories = [
  { id: 'all', label: 'All Services', count: 12 },
  { id: 'web-mobile', label: 'Web & Mobile Apps', count: 4 },
  { id: 'ai-auto', label: 'AI & Automation', count: 4 },
  { id: 'enterprise', label: 'Enterprise & ERP', count: 2 },
  { id: 'design-security', label: 'Design & Security', count: 2 },
]

const servicesList = [
  {
    id: 'custom-software',
    title: 'Custom Software & Cloud Architecture',
    category: 'web-mobile',
    badge: 'Enterprise Grade',
    metric: '⚡ 2-4 Wks MVP',
    desc: 'High-performance cloud-native platforms, microservices architecture, and tailored software built for high-throughput scalability.',
    icon: Laptop,
    color: '#0067f4',
    gradient: 'linear-gradient(135deg, #0067f4, #2563eb)',
    features: [
      'Microservices & Event-Driven Architecture',
      'Cloud-Native AWS / GCP Infrastructure',
      'Automated CI/CD Deployment Pipelines',
      'High-Concurrency PostgreSQL & Redis'
    ],
    technologies: ['React', 'Node.js', 'Python', 'PostgreSQL', 'Docker', 'AWS'],
    benefits: ['Sub-100ms API Latency', 'Unlimited Scale', 'Zero Vendor Lock-in']
  },
  {
    id: 'fullstack-web',
    title: 'Full-Stack Web App Engineering',
    category: 'web-mobile',
    badge: 'Most Popular',
    metric: '🚀 99.9% Uptime',
    desc: 'End-to-end web applications built with React 19, Next.js App Router, TypeScript, and serverless backend pipelines.',
    icon: Code,
    color: '#6366f1',
    gradient: 'linear-gradient(135deg, #6366f1, #4f46e5)',
    features: [
      'Next.js 15 Server-Side Rendering (SSR)',
      'GraphQL & REST API Hubs',
      'OAuth2 / WebAuthn Authentication',
      'Real-Time WebSockets & Push Sync'
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'Prisma'],
    benefits: ['Lighthouse 98+ Score', 'SEO Ranked', 'Instant PWA Support']
  },
  {
    id: 'mobile-apps',
    title: 'Native & Cross-Platform Mobile Apps',
    category: 'web-mobile',
    badge: 'iOS & Android',
    metric: '📱 60 FPS Native UX',
    desc: 'Bespoke mobile applications built with Flutter & React Native delivering buttery-smooth 60 FPS UX across smartphones & tablets.',
    icon: Smartphone,
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981, #059669)',
    features: [
      'Flutter & React Native Cross-Platform',
      'Offline First SQLite & Realm Storage',
      'Biometric FaceID / Fingerprint Auth',
      'App Store & Play Store Publishing'
    ],
    technologies: ['Flutter', 'React Native', 'Swift', 'Kotlin', 'Firebase'],
    benefits: ['50% Dev Cost Savings', 'Offline Mode', 'Native Hardware Access']
  },
  {
    id: 'high-converting-web',
    title: 'High-Converting Web Experiences',
    category: 'web-mobile',
    badge: 'Conversion Boost',
    metric: '📈 +45% Leads Boost',
    desc: 'Captivating digital brand experiences, interactive landing pages, and web apps engineered to turn traffic into paying clients.',
    icon: Globe,
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
    features: [
      'Dynamic Micro-Animations & Smooth Motion',
      'Headless CMS Integration (Sanity/Strapi)',
      'Automated Lead Capture Webhooks',
      'A/B Testing & Analytics Setup'
    ],
    technologies: ['React', 'Framer Motion', 'Tailwind CSS', 'Vercel'],
    benefits: ['Sub-Second Load Time', 'High Lead Conversion', 'Cross-Device UX']
  },
  {
    id: 'ai-agents',
    title: 'AI Autonomous Agents & RAG Engines',
    category: 'ai-auto',
    badge: 'AI Breakthrough',
    metric: '🤖 Sub-200ms RAG',
    desc: 'Autonomous AI agents powered by OpenAI GPT-4o, Gemini 1.5, and LangChain that navigate web UI, execute workflows, and query custom knowledge bases.',
    icon: Bot,
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
    features: [
      'RAG Vector Embeddings (Pinecone / Qdrant)',
      'Multi-Modal Voice & Vision AI Assist',
      'Custom Tool-Calling & API Execution',
      'Enterprise Knowledge Base Sync'
    ],
    technologies: ['Python', 'FastAPI', 'OpenAI', 'Gemini AI', 'LangChain', 'Pinecone'],
    benefits: ['80% Ticket Automation', '24/7 Multi-Lingual', 'Instant Doc Synthesis']
  },
  {
    id: 'workflow-auto',
    title: 'Enterprise Workflow Automation',
    category: 'ai-auto',
    badge: 'Operational Speed',
    metric: '⏱️ 120+ Hrs Saved/Mo',
    desc: 'Eliminate repetitive manual data entry, invoice approvals, and cross-department handoffs with automated RPA and webhook pipelines.',
    icon: Workflow,
    color: '#ef4444',
    gradient: 'linear-gradient(135deg, #ef4444, #dc2626)',
    features: [
      'Visual Workflow Orchestration',
      'Multi-System Webhook Integration',
      'Automated Invoice OCR Extraction',
      'Real-Time Slack/Teams Notifications'
    ],
    technologies: ['Python', 'n8n', 'Zapier', 'PostgreSQL', 'Redis'],
    benefits: ['100% Error-Free', 'Zero Manual Entry', 'Instant SLA Compliance']
  },
  {
    id: 'generative-ai',
    title: 'Generative AI & LLM Fine-Tuning',
    category: 'ai-auto',
    badge: 'Custom Models',
    metric: '🧠 Tailored Model Weights',
    desc: 'Domain-specific fine-tuned AI models and custom LLM inference pipelines trained on your proprietary company dataset with total data privacy.',
    icon: Brain,
    color: '#ec4899',
    gradient: 'linear-gradient(135deg, #ec4899, #db2777)',
    features: [
      'Private On-Premise LLM Deployment',
      'LoRA & PEFT Fine-Tuning Pipelines',
      'Prompt Optimization & Guardrails',
      'Toxic / PII Redaction Filters'
    ],
    technologies: ['PyTorch', 'HuggingFace', 'Ollama', 'vLLM', 'Python'],
    benefits: ['100% Proprietary IP', 'Zero Data Leakage', 'Lower Inference Cost']
  },
  {
    id: 'ai-websites',
    title: 'AI-Personalized Digital Platforms',
    category: 'ai-auto',
    badge: 'Smart UX',
    metric: '🎯 Hyper-Personalized',
    desc: 'Web portals and e-commerce stores that automatically adapt layout, recommendations, and pricing based on real-time user intent AI analysis.',
    icon: Cpu,
    color: '#06b6d4',
    gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)',
    features: [
      'Real-Time User Intent Scoring',
      'Dynamic AI Product Recommendations',
      'Smart Semantic Search Auto-Complete',
      'Adaptive Theme & Content Layout'
    ],
    technologies: ['Next.js', 'Vector Search', 'Vercel AI SDK', 'Tailwind'],
    benefits: ['Higher Engagement', 'Increased Order Value', 'Dynamic Adaptation']
  },
  {
    id: 'erp-cloud',
    title: 'OmniChannel ERP & Supply Chain Cloud',
    category: 'enterprise',
    badge: 'Enterprise Core',
    metric: '📦 Multi-Store Sync',
    desc: 'Unified Enterprise Resource Planning platforms managing multi-warehouse inventory, procurement, financial ledgers, and automated logistics.',
    icon: Building2,
    color: '#f97316',
    gradient: 'linear-gradient(135deg, #f97316, #ea580c)',
    features: [
      'Real-Time Multi-Warehouse Stock Sync',
      'Double-Entry Accounting & Ledger Engine',
      'Role-Based Access Control (RBAC)',
      'Audit Trails & Automated Reordering'
    ],
    technologies: ['Django', 'PostgreSQL', 'Redis', 'Celery', 'Docker'],
    benefits: ['Unified Ledger', 'Zero Stockouts', 'Full Inventory Visibility']
  },
  {
    id: 'crm-solutions',
    title: 'AI-Powered CRM & Sales Automation',
    category: 'enterprise',
    badge: 'Revenue Accelerator',
    metric: '💼 3x Lead Conversion',
    desc: 'Custom Customer Relationship Management platforms with automated deal stage triggers, lead scoring, and automated email follow-ups.',
    icon: Users,
    color: '#14b8a6',
    gradient: 'linear-gradient(135deg, #14b8a6, #0d9488)',
    features: [
      'Visual Kanban Deal Stage Pipelines',
      'AI Lead Intent & Probability Scoring',
      'VoIP Calling & WhatsApp Webhooks',
      'Automated Contract Generation'
    ],
    technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
    benefits: ['Shorter Sales Cycles', 'Pipeline Visibility', 'Automated Retention']
  },
  {
    id: 'uiux-design',
    title: 'UI/UX Design Systems & Design Tokens',
    category: 'design-security',
    badge: 'Design System',
    metric: '🎨 Pixel-Perfect UI',
    desc: 'User-centered interface design, clickable Figma prototypes, accessible design systems, and modern digital brand guidelines.',
    icon: Palette,
    color: '#a855f7',
    gradient: 'linear-gradient(135deg, #a855f7, #9333ea)',
    features: [
      'Figma Design Token Libraries',
      'Interactive High-Fidelity Prototypes',
      'WCAG 2.1 AA Accessibility Audits',
      'Micro-Animation & Motion Specs'
    ],
    technologies: ['Figma', 'Adobe XD', 'Framer', 'After Effects'],
    benefits: ['High User Satisfaction', 'Faster Dev Handoff', 'Unified Brand Identity']
  },
  {
    id: 'security-advisory',
    title: 'Cybersecurity, Audit & Tech Advisory',
    category: 'design-security',
    badge: 'SOC2 & HIPAA',
    metric: '🛡️ Zero Trust Security',
    desc: 'Penetration testing, cloud security audits, compliance verification (SOC2 / HIPAA / GDPR), and CTO strategic engineering advisory.',
    icon: ShieldCheck,
    color: '#0ea5e9',
    gradient: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
    features: [
      'Comprehensive Security & Code Audits',
      'HIPAA & SOC2 Compliance Preparation',
      'AWS / Azure Zero-Trust Architecture',
      'Disaster Recovery & Backup Automation'
    ],
    technologies: ['AWS Security Hub', 'Docker', 'Kubernetes', 'Terraform'],
    benefits: ['Mitigated Risk', 'Guaranteed Compliance', 'Cost-Optimized Cloud']
  }
]

export default function Services() {
  const [ref, isVisible] = useScrollAnimation()
  const [activeCategory, setActiveCategory] = useState('all')

  const scrollToContact = () => {
    const contactElement = document.getElementById('contact')
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const filteredServices = activeCategory === 'all'
    ? servicesList
    : servicesList.filter(s => s.category === activeCategory)

  return (
    <section ref={ref} className="services-light section" id="services">
      {/* Subtle Light Ambient Mesh */}
      <div className="light-bg-blob blob-1" />
      <div className="light-bg-blob blob-2" />

      <div className="container">
        {/* Header Badge & Title */}
        <div className={`services-light-header animate-on-scroll ${isVisible ? 'visible' : ''}`}>
          <div className="light-badge">
            <Sparkles size={14} className="badge-icon" />
            <span>OUR ENGINEERING CAPABILITIES</span>
          </div>
          <h2 className="section-title-light">
            Our Core <span className="gradient-text-blue">Services & Solutions</span>
          </h2>
          <p className="section-subtitle-light">
            Empowering businesses with custom software architecture, AI automation engines, enterprise ERPs, and cloud-native applications built for maximum scalability and security.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="services-light-tabs">
          {serviceCategories.map((cat) => (
            <button
              key={cat.id}
              className={`light-tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <span>{cat.label}</span>
              <span className="light-tab-badge">{cat.count}</span>
            </button>
          ))}
        </div>

        {/* Clean 2-Column Grid Cards (No Clunky Accordion) */}
        <div className="services-light-grid">
          {filteredServices.map((service, idx) => {
            const Icon = service.icon
            return (
              <div
                key={service.id}
                className={`service-light-card animate-on-scroll ${isVisible ? 'visible' : ''}`}
                style={{ '--accent-color': service.color, '--delay': `${0.04 + (idx % 4) * 0.05}s` }}
              >
                {/* Top Accent Strip */}
                <div className="card-top-accent" style={{ background: service.gradient }} />

                {/* Card Header & Icon */}
                <div className="card-header-row">
                  <div className="card-icon-circle" style={{ background: `${service.color}15`, color: service.color }}>
                    <Icon size={24} />
                  </div>
                  <div className="card-badges-right">
                    <span className="card-metric-tag">{service.metric}</span>
                    <span className="card-pill-tag">{service.badge}</span>
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="card-title-text">{service.title}</h3>
                <p className="card-desc-text">{service.desc}</p>

                {/* Key Features List */}
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

                  <button className="light-quote-btn" onClick={scrollToContact} style={{ '--btn-color': service.color }}>
                    <span>Request Proposal</span>
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
