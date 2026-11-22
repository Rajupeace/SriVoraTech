import { useState } from 'react'
import SEO from './SEO'
import {
  Layers, CheckCircle2, Clock, FileText, ArrowLeft, ShieldCheck, Download,
  ExternalLink, MessageSquare, PhoneCall, Sparkles, ChevronRight, AlertCircle,
  Code2, Database, Rocket, Info, Lock, Palette, FileCode, Globe
} from 'lucide-react'

export default function ClientPortalPage({ onBack, onNavigate }) {
  const [activeTab, setActiveTab] = useState('milestones') // 'milestones' | 'documents' | 'support'
  const [selectedDocInfo, setSelectedDocInfo] = useState(null)

  const sampleMilestones = [
    {
      id: 1,
      title: 'Phase 1: Architecture Blueprint & UI/UX Design System',
      status: 'Completed',
      date: 'Sprint Week 1',
      progress: 100,
      details: 'Figma interactive component library, database schema ER diagram, and system design specifications finalized and approved.',
      deliverables: ['System Architecture Blueprint', 'Figma Interactive Prototype', 'DB Schema Model']
    },
    {
      id: 2,
      title: 'Phase 2: Core Microservices & Database Engineering',
      status: 'Completed',
      date: 'Sprint Week 2',
      progress: 100,
      details: 'PostgreSQL database initialized, Prisma ORM migrations executed, JWT authentication implemented with role-based permissions.',
      deliverables: ['Swagger API Documentation', 'Dockerized Dev Environment', 'Database Migration Scripts']
    },
    {
      id: 3,
      title: 'Phase 3: Frontend Integration & State Synchronization',
      status: 'In Progress',
      date: 'Sprint Week 3 (Sample Active Sprint)',
      progress: 85,
      details: 'React 19 / Next.js frontend integrated with REST APIs, WebSocket live streams active, responsive mobile layout optimizations.',
      deliverables: ['Staging Preview URL', 'Real-Time Telemetry Tests', 'Cart & Payment Webhooks']
    },
    {
      id: 4,
      title: 'Phase 4: Security Hardening, QA & Performance Testing',
      status: 'Upcoming',
      date: 'Sprint Week 4',
      progress: 0,
      details: 'OWASP vulnerability checks, Core Web Vitals performance audit, cross-browser compatibility checks, and load testing.',
      deliverables: ['QA Test Execution Report', 'Security Audit Checklist', 'Core Web Vitals Report']
    },
    {
      id: 5,
      title: 'Phase 5: Production Deployment & 100% IP Transfer',
      status: 'Upcoming',
      date: 'Final Handover',
      progress: 0,
      details: 'Zero-downtime deployment to AWS/Vercel production, DNS configuration, and immediate transfer of Git repos and cloud root credentials.',
      deliverables: ['Full Source Code Repo Access', 'Cloud Account Transfer', '30-Day Post-Launch Warranty']
    }
  ]

  const sampleDocuments = [
    { name: 'Statement of Work (SOW) & Milestone Schedule.pdf', size: '1.2 MB', date: 'Sample Sprint Document', type: 'Contract' },
    { name: 'System Architecture & Data Flow Diagram.pdf', size: '2.8 MB', date: 'Sample Sprint Document', type: 'Architecture' },
    { name: 'Interactive Figma Component Tokens.fig', size: '14.5 MB', date: 'Sample Sprint Document', type: 'Design' },
    { name: 'API Endpoints Specification (OpenAPI).json', size: '420 KB', date: 'Sample Sprint Document', type: 'API Specs' },
  ]

  const getDeliverableIcon = (name) => {
    const lower = name.toLowerCase()
    if (lower.includes('figma') || lower.includes('prototype') || lower.includes('design') || lower.includes('blueprint')) {
      return <Palette size={13} style={{ color: '#8b5cf6' }} />
    }
    if (lower.includes('api') || lower.includes('swagger') || lower.includes('spec') || lower.includes('webhook')) {
      return <FileCode size={13} style={{ color: '#0284c7' }} />
    }
    if (lower.includes('staging') || lower.includes('url') || lower.includes('preview') || lower.includes('telemetry')) {
      return <Globe size={13} style={{ color: '#0067f4' }} />
    }
    if (lower.includes('db') || lower.includes('database') || lower.includes('schema') || lower.includes('migration')) {
      return <Database size={13} style={{ color: '#10b981' }} />
    }
    if (lower.includes('security') || lower.includes('qa') || lower.includes('audit') || lower.includes('warranty') || lower.includes('repo')) {
      return <ShieldCheck size={13} style={{ color: '#f59e0b' }} />
    }
    return <Code2 size={13} style={{ color: '#0067f4' }} />
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '110px 24px 100px', color: 'var(--color-text-primary, #1e293b)' }}>
      <SEO
        pathname="/client-portal"
        title="Interactive Client Portal Preview | SriVoraTech"
        description="Interactive demonstration of SriVoraTech's client sprint tracking portal, milestone visibility, and deliverable handover process."
        breadcrumbs={[{ name: 'Home', url: '/' }, { name: 'Client Portal Preview', url: '/client-portal' }]}
      />

      <div style={{ marginBottom: '32px' }}>
        <button
          onClick={onBack || (() => window.history.back())}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: '#ffffff', border: '1px solid var(--color-gray-200, #e2e8f0)', borderRadius: '8px', color: 'var(--color-text-primary, #1e293b)', cursor: 'pointer', fontSize: '13.5px', fontWeight: '600', marginBottom: '24px', boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}
        >
          <ArrowLeft size={16} /> Back to Home
        </button>

        {/* Prominent Demonstration Notice */}
        <div style={{ background: 'rgba(0, 103, 244, 0.08)', border: '1px solid rgba(0, 103, 244, 0.25)', borderRadius: '12px', padding: '16px 20px', marginBottom: '24px', display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
          <Info size={20} style={{ color: '#0067f4', flexShrink: 0, marginTop: '2px' }} />
          <div>
            <strong style={{ color: '#0067f4', fontSize: '14px', display: 'block', marginBottom: '4px' }}>
              Interactive Client Portal Preview (Sample Project Data)
            </strong>
            <p style={{ margin: 0, color: 'var(--color-text-secondary, #475569)', fontSize: '13.5px', lineHeight: '1.6' }}>
              This page is an interactive demonstration illustrating how SriVoraTech clients track live sprint milestones, inspect deliverables, and collaborate with our engineering team. Live client credentials and secure private repository access are provisioned upon project agreement.
            </p>
          </div>
        </div>

        <h1 style={{ fontSize: '2.8rem', fontWeight: '800', margin: '8px 0 16px', color: 'var(--color-text-heading, #0f172a)', letterSpacing: '-0.02em' }}>
          Client Milestone Tracker (Preview)
        </h1>
        <p style={{ color: 'var(--color-text-secondary, #475569)', fontSize: '1.1rem', lineHeight: '1.7', maxWidth: '750px' }}>
          Transparent tracking across all SriVoraTech engineering sprints. View milestone progress, sample deliverables, and our direct support workflow.
        </p>
      </div>

      {/* Project Header Bar */}
      <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', border: '1px solid #334155', borderRadius: '16px', padding: '24px 28px', marginBottom: '32px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '20px', boxShadow: '0 8px 24px rgba(15, 23, 42, 0.12)' }}>
        <div>
          <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Sample Active Sprint Demonstration
          </span>
          <h2 style={{ fontSize: '20px', fontWeight: '700', margin: '4px 0 0', color: '#fff' }}>
            Project: Custom Enterprise Platform MVP (Sample)
          </h2>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '11.5px', color: '#94a3b8' }}>Overall Milestone Progress</span>
            <div style={{ fontSize: '18px', fontWeight: '800', color: '#10b981' }}>77% (Sample)</div>
          </div>
          <div style={{ width: '90px', height: '6px', background: '#334155', borderRadius: '999px', overflow: 'hidden' }}>
            <div style={{ width: '77%', height: '100%', background: '#10b981', borderRadius: '999px' }} />
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{ display: 'flex', gap: '12px', borderBottom: '1px solid var(--color-gray-200, #e2e8f0)', paddingBottom: '16px', marginBottom: '32px', flexWrap: 'wrap' }}>
        <button
          onClick={() => setActiveTab('milestones')}
          style={{ padding: '9px 20px', borderRadius: '10px', background: activeTab === 'milestones' ? '#0067f4' : '#ffffff', color: activeTab === 'milestones' ? '#fff' : '#475569', border: `1.5px solid ${activeTab === 'milestones' ? '#0067f4' : '#e2e8f0'}`, cursor: 'pointer', fontWeight: '700', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: activeTab === 'milestones' ? '0 4px 12px rgba(0, 103, 244, 0.25)' : 'none', transition: 'all 200ms ease' }}
        >
          <Layers size={16} /> Sprint Milestones
        </button>
        <button
          onClick={() => setActiveTab('documents')}
          style={{ padding: '9px 20px', borderRadius: '10px', background: activeTab === 'documents' ? '#0067f4' : '#ffffff', color: activeTab === 'documents' ? '#fff' : '#475569', border: `1.5px solid ${activeTab === 'documents' ? '#0067f4' : '#e2e8f0'}`, cursor: 'pointer', fontWeight: '700', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: activeTab === 'documents' ? '0 4px 12px rgba(0, 103, 244, 0.25)' : 'none', transition: 'all 200ms ease' }}
        >
          <FileText size={16} /> Deliverables &amp; Artifacts
        </button>
        <button
          onClick={() => setActiveTab('support')}
          style={{ padding: '9px 20px', borderRadius: '10px', background: activeTab === 'support' ? '#0067f4' : '#ffffff', color: activeTab === 'support' ? '#fff' : '#475569', border: `1.5px solid ${activeTab === 'support' ? '#0067f4' : '#e2e8f0'}`, cursor: 'pointer', fontWeight: '700', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: activeTab === 'support' ? '0 4px 12px rgba(0, 103, 244, 0.25)' : 'none', transition: 'all 200ms ease' }}
        >
          <MessageSquare size={16} /> Engineering Support
        </button>
      </div>

      {/* TAB 1: Milestones */}
      {activeTab === 'milestones' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {sampleMilestones.map((m) => (
            <div key={m.id} style={{ background: '#ffffff', border: '1px solid var(--color-gray-200, #e2e8f0)', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 16px rgba(15, 23, 42, 0.04)', transition: 'all 200ms ease' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {m.status === 'Completed' && <CheckCircle2 size={18} style={{ color: '#10b981' }} />}
                  {m.status === 'In Progress' && <Clock size={18} style={{ color: '#0067f4' }} />}
                  {m.status === 'Upcoming' && <Clock size={18} style={{ color: '#94a3b8' }} />}
                  <h3 style={{ fontSize: '16.5px', fontWeight: '700', color: '#0f172a', margin: 0 }}>{m.title}</h3>
                </div>
                <span style={{ fontSize: '12px', padding: '4px 12px', borderRadius: '999px', background: m.status === 'Completed' ? 'rgba(16, 185, 129, 0.1)' : m.status === 'In Progress' ? 'rgba(0, 103, 244, 0.1)' : 'rgba(100, 116, 139, 0.1)', color: m.status === 'Completed' ? '#059669' : m.status === 'In Progress' ? '#0067f4' : '#64748b', border: '1px solid currentColor', fontWeight: '700' }}>
                  {m.status} • {m.date}
                </span>
              </div>
              <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.6', margin: '0 0 16px' }}>{m.details}</p>
              <div>
                <span style={{ fontSize: '12px', fontWeight: '700', color: '#334155', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '8px' }}>
                  Sample Deliverables:
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {m.deliverables.map((d, i) => (
                    <span key={i} style={{ fontSize: '12.5px', padding: '5px 12px', borderRadius: '8px', background: '#f8fafc', border: '1px solid #e2e8f0', color: '#1e293b', display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: '500' }}>
                      {getDeliverableIcon(d)} {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: Documents & Deliverables */}
      {activeTab === 'documents' && (
        <div>
          {selectedDocInfo && (
            <div style={{ background: '#f8fafc', border: '1.5px solid #0067f4', borderRadius: '12px', padding: '16px 20px', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', boxShadow: '0 4px 14px rgba(0, 103, 244, 0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Lock size={18} style={{ color: '#0067f4', flexShrink: 0 }} />
                <span style={{ fontSize: '13.5px', color: '#1e293b' }}>
                  In production, <strong>{selectedDocInfo}</strong> is downloaded via an encrypted, signed time-limited S3 URL provisioned to authorized client accounts.
                </span>
              </div>
              <button
                onClick={() => setSelectedDocInfo(null)}
                style={{ background: '#ffffff', border: '1px solid #cbd5e1', color: '#475569', padding: '4px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}
              >
                Close
              </button>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {sampleDocuments.map((doc, idx) => (
              <div key={idx} style={{ background: '#ffffff', border: '1px solid var(--color-gray-200, #e2e8f0)', borderRadius: '14px', padding: '20px', boxShadow: '0 4px 14px rgba(15, 23, 42, 0.04)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(0, 103, 244, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0067f4', flexShrink: 0 }}>
                    <FileText size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a', margin: 0, wordBreak: 'break-word' }}>{doc.name}</h4>
                    <span style={{ fontSize: '11.5px', color: '#64748b' }}>{doc.size} • {doc.type}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedDocInfo(doc.name)}
                  style={{ width: '100%', padding: '9px 12px', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '8px', color: '#0067f4', cursor: 'pointer', fontSize: '12.5px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', transition: 'all 200ms ease' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#0067f4'; e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.borderColor = '#0067f4'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.color = '#0067f4'; e.currentTarget.style.borderColor = '#cbd5e1'; }}
                >
                  <Lock size={13} /> View Delivery Protocol
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Support */}
      {activeTab === 'support' && (
        <div style={{ background: '#ffffff', border: '1px solid var(--color-gray-200, #e2e8f0)', borderRadius: '16px', padding: '32px', boxShadow: '0 4px 16px rgba(15, 23, 42, 0.04)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', marginBottom: '8px' }}>
            Dedicated Engineering Support Desk
          </h3>
          <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.6', marginBottom: '24px' }}>
            During active sprints, clients have direct Slack/WhatsApp access to lead software architects and the executive leadership team.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '700', textTransform: 'uppercase' }}>Direct Support Email</span>
              <div style={{ fontSize: '15px', fontWeight: '700', color: '#0067f4', marginTop: '6px' }}>contact@srivoratech.in</div>
            </div>
            <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '700', textTransform: 'uppercase' }}>WhatsApp Engineering Channel</span>
              <div style={{ fontSize: '15px', fontWeight: '700', color: '#10b981', marginTop: '6px' }}>+91 91820 30946</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
