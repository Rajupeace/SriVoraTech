import React from 'react'
import SEO from './SEO'
import { FileText, ArrowLeft, Mail, CheckCircle2, Shield, Scale, Clock } from 'lucide-react'

export default function TermsPage({ onBack, onNavigate }) {
  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '60px 24px 100px', color: '#f8fafc' }}>
      <SEO
        pathname="/terms"
        title="Terms of Service | SriVoraTech"
        description="Official Terms of Service and Software Development Agreement conditions for SriVoraTech Technologies."
        breadcrumbs={[{ name: 'Home', url: '/' }, { name: 'Terms of Service', url: '/terms' }]}
      />

      <div style={{ marginBottom: '32px' }}>
        <button
          onClick={onBack || (() => window.history.back())}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#cbd5e1', cursor: 'pointer', fontSize: '13.5px', fontWeight: '600', marginBottom: '24px' }}
        >
          <ArrowLeft size={16} /> Back
        </button>

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', background: 'rgba(0, 103, 244, 0.1)', border: '1px solid rgba(0, 103, 244, 0.25)', borderRadius: '999px', color: '#38bdf8', fontSize: '12px', fontWeight: '700', marginBottom: '14px' }}>
          <Scale size={14} /> Service Terms • Standard Master Agreement
        </div>

        <h1 style={{ fontSize: '2.8rem', fontWeight: '800', margin: '8px 0 16px', background: 'linear-gradient(135deg, #fff 0%, #cbd5e1 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Terms of Service
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1.1rem', lineHeight: '1.7' }}>
          These terms govern all custom software development, AI solutions engineering, and cloud deployment contracts entered into with SriVoraTech (<strong>srivoratech.in</strong>).
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '36px' }}>
        <section>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#38bdf8', marginBottom: '12px' }}>
            1. Scope of Engagement &amp; Sprints
          </h2>
          <p style={{ color: '#cbd5e1', lineHeight: '1.7', fontSize: '14.5px' }}>
            All projects are executed based on a signed Statement of Work (SOW) defining sprint milestones, functional deliverables, architectural specifications, and delivery timelines. Typical MVP sprints are scheduled for 2 to 4 weeks with weekly progress demos.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#38bdf8', marginBottom: '12px' }}>
            2. Intellectual Property Rights &amp; Source Code Handover
          </h2>
          <p style={{ color: '#cbd5e1', lineHeight: '1.7', fontSize: '14.5px' }}>
            Clients retain 100% full ownership of all custom software source code, design systems, databases, and deployment keys upon milestone payment settlement. SriVoraTech provides immediate git repository access and cloud transfer documentation.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#38bdf8', marginBottom: '12px' }}>
            3. Warranty, Bug Fixes &amp; Post-Launch Support
          </h2>
          <p style={{ color: '#cbd5e1', lineHeight: '1.7', fontSize: '14.5px' }}>
            Every delivered project includes a standard 30-day post-launch warranty period during which any defects or discrepancies against the agreed SOW are fixed with priority at zero additional charge. Ongoing SLA and cloud maintenance packages are available under dedicated retainer contracts.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#38bdf8', marginBottom: '12px' }}>
            4. Payment Terms &amp; Invoicing
          </h2>
          <p style={{ color: '#cbd5e1', lineHeight: '1.7', fontSize: '14.5px' }}>
            Invoices are issued according to milestone delivery schedules (e.g., Sprint Planning, Beta Prototype, Production Release). Payments may be made via bank transfer, Stripe, or approved corporate payment gateways.
          </p>
        </section>

        <section style={{ borderTop: '1px solid #1e293b', paddingTop: '20px' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#f8fafc', marginBottom: '8px' }}>
            Legal Contact
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.6' }}>
            For contract clarifications or master service agreement requests, contact:
          </p>
          <p style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#38bdf8', fontWeight: '600', marginTop: '8px' }}>
            <Mail size={16} /> srivoratech9@gmail.com
          </p>
        </section>
      </div>
    </div>
  )
}

