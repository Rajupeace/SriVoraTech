import { useState } from 'react'
import SEO from './SEO'
import {
  Layers, CheckCircle2, Clock, FileText, ArrowLeft, ShieldCheck, Download,
  ExternalLink, MessageSquare, PhoneCall, Sparkles, ChevronRight, AlertCircle,
  Code2, Database, Rocket
} from 'lucide-react'

export default function ClientPortalPage({ onBack, onNavigate }) {
  const [projectId, setProjectId] = useState('SVT-2026-MVP-01')
  const [activeTab, setActiveTab] = useState('milestones') // 'milestones' | 'documents' | 'support'

  const sampleMilestones = [
    {
      id: 1,
      title: 'Phase 1: Architecture Blueprint & UI/UX Design System',
      status: 'Completed',
      date: 'Sprint Week 1',
      progress: 100,
      details: 'Figma interactive component library, database schema ER diagram, and system design specifications finalized and approved.',
      deliverables: ['System Architecture PDF', 'Figma Interactive Prototype', 'DB Schema Blueprint']
    },
    {
      id: 2,
      title: 'Phase 2: Core Microservices & Database Engineering',
      status: 'Completed',
      date: 'Sprint Week 2',
      progress: 100,
      details: 'PostgreSQL database initialized, Prisma ORM migrations executed, JWT authentication implemented with role-based permissions.',
      deliverables: ['Swagger API Documentation', 'Dockerized Dev Environment', 'Database Seed Scripts']
    },
    {
      id: 3,
      title: 'Phase 3: Frontend Integration & State Synchronization',
      status: 'In Progress',
      date: 'Sprint Week 3 (Current Sprint)',
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
      details: 'OWASP vulnerability scans, 100/100 Lighthouse Core Web Vitals audit, cross-browser compatibility checks, and load testing.',
      deliverables: ['QA Test Execution Report', 'Security Audit Certificate', 'Lighthouse 95+ Audit']
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
    { name: 'Statement of Work (SOW) & Milestone Schedule.pdf', size: '1.2 MB', date: 'Jul 2026', type: 'Contract' },
    { name: 'System Architecture & Data Flow Diagram.pdf', size: '2.8 MB', date: 'Jul 2026', type: 'Architecture' },
    { name: 'Interactive Figma Component Tokens.fig', size: '14.5 MB', date: 'Jul 2026', type: 'Design' },
    { name: 'API Endpoints Specification (OpenAPI).json', size: '420 KB', date: 'Jul 2026', type: 'API Specs' },
  ]

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '60px 24px 100px', color: '#f8fafc' }}>
      <SEO
        pathname="/client-portal"
        title="Client Portal & Milestone Tracker | SriVoraTech"
        description="Track live sprint milestones, review architecture documents, and inspect project deliverables on SriVoraTech's client portal."
        breadcrumbs={[{ name: 'Home', url: '/' }, { name: 'Client Portal', url: '/client-portal' }]}
      />

      <div style={{ marginBottom: '32px' }}>
        <button
          onClick={onBack || (() => window.history.back())}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#cbd5e1', cursor: 'pointer', fontSize: '13.5px', fontWeight: '600', marginBottom: '24px' }}
        >
          <ArrowLeft size={16} /> Back to Home
        </button>

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', background: 'rgba(0, 103, 244, 0.1)', border: '1px solid rgba(0, 103, 244, 0.25)', borderRadius: '999px', color: '#38bdf8', fontSize: '12px', fontWeight: '700', marginBottom: '14px' }}>
          <Sparkles size={14} /> Client Project Experience &amp; Milestone Hub
        </div>

        <h1 style={{ fontSize: '2.8rem', fontWeight: '800', margin: '8px 0 16px', background: 'linear-gradient(135deg, #fff 0%, #cbd5e1 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Client Milestone Tracker
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1.1rem', lineHeight: '1.7', maxWidth: '750px' }}>
          Transparent, real-time tracking for all active SriVoraTech engineering sprints. Inspect deliverables, download architecture diagrams, and view milestone completion progress.
        </p>
      </div>

      {/* Project Header Bar */}
      <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '24px 28px', marginBottom: '32px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
        <div>
          <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Active Project Reference
          </span>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#ffffff', margin: '4px 0' }}>
            Enterprise Custom Software Sprint
          </h2>
          <span style={{ fontSize: '13px', color: '#38bdf8', fontFamily: 'monospace' }}>
            Tracking ID: {projectId}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '12px', color: '#94a3b8', display: 'block' }}>Overall Sprint Completion</span>
            <strong style={{ fontSize: '1.6rem', color: '#10b981' }}>77%</strong>
          </div>
          <div style={{ width: '90px', height: '8px', background: '#334155', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: '77%', height: '100%', background: 'linear-gradient(90deg, #0067f4, #10b981)' }} />
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '28px', borderBottom: '1px solid #1e293b', paddingBottom: '12px' }}>
        <button
          onClick={() => setActiveTab('milestones')}
          style={{ padding: '8px 20px', borderRadius: '8px', background: activeTab === 'milestones' ? '#0067f4' : 'transparent', color: activeTab === 'milestones' ? '#ffffff' : '#94a3b8', border: 'none', fontWeight: '600', cursor: 'pointer', fontSize: '14px', transition: 'all 200ms ease' }}
        >
          Sprint Milestones (5)
        </button>
        <button
          onClick={() => setActiveTab('documents')}
          style={{ padding: '8px 20px', borderRadius: '8px', background: activeTab === 'documents' ? '#0067f4' : 'transparent', color: activeTab === 'documents' ? '#ffffff' : '#94a3b8', border: 'none', fontWeight: '600', cursor: 'pointer', fontSize: '14px', transition: 'all 200ms ease' }}
        >
          Documents &amp; IP Artifacts (4)
        </button>
        <button
          onClick={() => setActiveTab('support')}
          style={{ padding: '8px 20px', borderRadius: '8px', background: activeTab === 'support' ? '#0067f4' : 'transparent', color: activeTab === 'support' ? '#ffffff' : '#94a3b8', border: 'none', fontWeight: '600', cursor: 'pointer', fontSize: '14px', transition: 'all 200ms ease' }}
        >
          Dedicated Support
        </button>
      </div>

      {/* Tab 1: Milestones */}
      {activeTab === 'milestones' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {sampleMilestones.map((m) => (
            <div
              key={m.id}
              style={{
                background: '#0f172a',
                border: m.status === 'In Progress' ? '1.5px solid #0067f4' : '1px solid #1e293b',
                borderRadius: '16px',
                padding: '24px',
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: m.status === 'Completed' ? 'rgba(16, 185, 129, 0.2)' : m.status === 'In Progress' ? 'rgba(0, 103, 244, 0.2)' : 'rgba(100, 116, 139, 0.2)',
                      color: m.status === 'Completed' ? '#10b981' : m.status === 'In Progress' ? '#38bdf8' : '#94a3b8',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {m.status === 'Completed' ? <CheckCircle2 size={20} /> : m.status === 'In Progress' ? <Clock size={20} /> : <Layers size={18} />}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: '#f8fafc', margin: 0 }}>
                      {m.title}
                    </h3>
                    <span style={{ fontSize: '12px', color: '#94a3b8' }}>{m.date}</span>
                  </div>
                </div>

                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: '700',
                    padding: '4px 12px',
                    borderRadius: '999px',
                    background: m.status === 'Completed' ? 'rgba(16, 185, 129, 0.15)' : m.status === 'In Progress' ? 'rgba(0, 103, 244, 0.15)' : 'rgba(148, 163, 184, 0.1)',
                    color: m.status === 'Completed' ? '#10b981' : m.status === 'In Progress' ? '#38bdf8' : '#94a3b8',
                    border: `1px solid ${m.status === 'Completed' ? 'rgba(16, 185, 129, 0.3)' : m.status === 'In Progress' ? 'rgba(0, 103, 244, 0.3)' : 'rgba(148, 163, 184, 0.2)'}`
                  }}
                >
                  {m.status} {m.progress > 0 && `(${m.progress}%)`}
                </span>
              </div>

              <p style={{ color: '#cbd5e1', fontSize: '14px', lineHeight: '1.6', margin: '0 0 16px' }}>
                {m.details}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {m.deliverables.map((deliv, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: '12px',
                      padding: '4px 10px',
                      background: '#1e293b',
                      color: '#94a3b8',
                      borderRadius: '6px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}
                  >
                    <CheckCircle2 size={13} color="#10b981" /> {deliv}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Documents */}
      {activeTab === 'documents' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {sampleDocuments.map((doc, idx) => (
            <div
              key={idx}
              style={{
                background: '#0f172a',
                border: '1px solid #1e293b',
                borderRadius: '12px',
                padding: '18px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <FileText size={24} color="#0067f4" />
                <div>
                  <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '600', color: '#f8fafc' }}>{doc.name}</h4>
                  <span style={{ fontSize: '12px', color: '#94a3b8' }}>{doc.type} • {doc.size} • {doc.date}</span>
                </div>
              </div>
              <button
                onClick={() => alert(`Downloading verified artifact: ${doc.name}`)}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 14px', background: '#1e293b', color: '#f8fafc', border: '1px solid #334155', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
              >
                <Download size={14} /> Download
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Dedicated Support */}
      {activeTab === 'support' && (
        <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '36px' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#f8fafc', marginBottom: '12px' }}>
            Direct Engineering Support Line
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '14.5px', lineHeight: '1.6', marginBottom: '24px' }}>
            Have a question about your project sprint or need to schedule an impromptu architecture sync? Reach out directly to your assigned project leads:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            <a
              href="https://wa.me/919182030946?text=Hi%20SriVoraTech,%20checking%20in%20on%20my%20project%20sprint."
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 20px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '12px', color: '#10b981', textDecoration: 'none', fontWeight: '600' }}
            >
              <MessageSquare size={20} />
              <div>
                <strong>WhatsApp Priority Desk</strong>
                <span style={{ display: 'block', fontSize: '12px', color: '#94a3b8' }}>+91 9182030946</span>
              </div>
            </a>

            <a
              href="mailto:srivoratech9@gmail.com?subject=Project%20Sprint%20Inquiry%20SVT-2026-MVP-01"
              style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 20px', background: 'rgba(0, 103, 244, 0.1)', border: '1px solid rgba(0, 103, 244, 0.3)', borderRadius: '12px', color: '#38bdf8', textDecoration: 'none', fontWeight: '600' }}
            >
              <PhoneCall size={20} />
              <div>
                <strong>Official Project Email</strong>
                <span style={{ display: 'block', fontSize: '12px', color: '#94a3b8' }}>srivoratech9@gmail.com</span>
              </div>
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

