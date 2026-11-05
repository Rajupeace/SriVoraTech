import { useState } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { Rocket, ShieldCheck, Gem, Bot, TrendingUp, Users, Sparkles, ChevronRight, CheckCircle2 } from 'lucide-react'
import './WhyChoose.css'

const advantages = [
  {
    id: 1,
    icon: Rocket,
    title: 'Agile Delivery',
    shortDesc: 'Structured two-week iterative sprints with continuous code reviews, regular client demos, and predictable milestone deliveries.',
    badge: 'Milestone Driven',
    metric: 'Iterative Sprints',
    color: '#0067f4',
    features: ['Bi-weekly sprint demos', 'Direct engineer communication', 'Transparent sprint backlogs']
  },
  {
    id: 2,
    icon: ShieldCheck,
    title: 'Security & Data Protection',
    shortDesc: 'Role-based JWT access controls, TLS/HTTPS in transit, parameterized database queries, and secure secrets management by default.',
    badge: 'OWASP Best Practices',
    metric: 'Secure by Design',
    color: '#10b981',
    features: ['JWT authentication', 'TLS data transport', 'Input sanitization & CSP']
  },
  {
    id: 3,
    icon: Gem,
    title: 'Engineering Quality',
    shortDesc: 'Clean, modular, and maintainable software architecture using modern frameworks, strict typing, and automated CI/CD checks.',
    badge: 'Modern Architecture',
    metric: 'Scalable Systems',
    color: '#8b5cf6',
    features: ['Modular code structure', 'Automated build validation', 'Comprehensive documentation']
  },
  {
    id: 4,
    icon: Bot,
    title: 'Applied AI & Automation',
    shortDesc: 'Tailored AI integration: custom RAG retrieval, context-aware conversational bots, and automated business workflows that reduce manual overhead.',
    badge: 'Applied AI',
    metric: 'Intelligent Workflows',
    color: '#ec4899',
    features: ['Custom RAG vector search', 'LLM prompt orchestration', 'Workflow event pipelines']
  },
  {
    id: 5,
    icon: TrendingUp,
    title: 'Cloud Foundations',
    shortDesc: 'Built for enterprise resilience with Docker containerization, cloud-native deployments, and proactive health monitoring.',
    badge: 'High Availability',
    metric: 'Architecture Target: 99.9%',
    color: '#f59e0b',
    features: ['Dockerized services', 'Multi-region deploy ready', '24/7 uptime health checks']
  },
  {
    id: 6,
    icon: Users,
    title: 'Transparent Collaboration',
    shortDesc: 'Direct engineering partnership, weekly updates, clear deliverable sign-offs, and 100% intellectual property source code transfer upon completion.',
    badge: '100% IP Handover',
    metric: 'Full Code Ownership',
    color: '#06b6d4',
    features: ['Full source ownership', 'Shared progress tracking', 'Post-delivery warranty']
  },
]

export default function WhyChoose() {
  const [ref, isVisible] = useScrollAnimation()
  const [expandedCard, setExpandedCard] = useState(null)

  return (
    <section ref={ref} className="why-choose section" id="why-choose">
      <div className="container">
        <div className={`animate-on-scroll ${isVisible ? 'visible' : ''}`}>
          <div className="why-badge">
            <Sparkles size={14} />
            Why Partner with SriVoraTech
          </div>
          <h2 className="section-title">
            Engineering Built on <span className="gradient-text">Trust & Standards</span>
          </h2>
          <p className="section-subtitle">
            We focus on clean architecture, verifiable security practices, and transparent communication throughout every sprint.
          </p>
        </div>

        <div className="why-grid">
          {advantages.map((adv) => {
            const Icon = adv.icon
            const isExpanded = expandedCard === adv.id

            return (
              <div
                key={adv.id}
                className={`why-card ${isExpanded ? 'expanded' : ''}`}
                style={{ '--why-accent': adv.color }}
                onClick={() => setExpandedCard(isExpanded ? null : adv.id)}
              >
                <div className="why-card-top-row">
                  <div className="why-icon-box" style={{ background: `${adv.color}15`, color: adv.color }}>
                    <Icon size={24} />
                  </div>
                  <span
                    className="why-metric-chip"
                    style={{ color: adv.color, borderColor: `${adv.color}40`, background: `${adv.color}0a` }}
                  >
                    {adv.badge}
                  </span>
                </div>

                <div className="why-card-body">
                  <h3 className="why-card-title">{adv.title}</h3>
                  <p className="why-card-desc">{adv.shortDesc}</p>
                </div>

                <div className="why-features-list">
                  {adv.features.map((feat, idx) => (
                    <div key={idx} className="why-feature-row">
                      <CheckCircle2 size={13} style={{ color: adv.color, flexShrink: 0 }} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="why-expand-hint">
                  <span style={{ color: adv.color, fontWeight: 700 }}>{adv.metric}</span>
                  <ChevronRight size={15} className={`expand-chevron ${isExpanded ? 'rotated' : ''}`} style={{ marginLeft: 'auto' }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
