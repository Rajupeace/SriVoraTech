import React from 'react'
import SEO from './SEO'
import { ArrowLeft, Mail, Scale, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react'
import { COMPANY } from '../config/company'

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
          These terms govern custom software development, AI solutions engineering, and cloud deployment contracts entered into with {COMPANY.legalName} (<strong>{COMPANY.website}</strong>).
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '36px' }}>
        <section>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#38bdf8', marginBottom: '12px' }}>
            1. Scope of Engagement &amp; Milestones
          </h2>
          <p style={{ color: '#cbd5e1', lineHeight: '1.7', fontSize: '14.5px' }}>
            All projects are executed strictly based on a bilateral Statement of Work (SOW) defining sprint milestones, functional deliverables, architectural specifications, and delivery timelines. Project delivery timelines depend on scope complexity and client technical prerequisites, with structured weekly demos and milestone sign-offs.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#38bdf8', marginBottom: '12px' }}>
            2. Intellectual Property Rights &amp; Source Code Handover
          </h2>
          <p style={{ color: '#cbd5e1', lineHeight: '1.7', fontSize: '14.5px' }}>
            Clients retain 100% full legal ownership of all custom software source code, bespoke design assets, schemas, and deployment credentials upon full settlement of milestone invoices. SriVoraTech delivers complete Git repository ownership, CI/CD pipelines, and cloud transfer documentation. SriVoraTech retains no claim to client proprietary business data or models.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#38bdf8', marginBottom: '12px' }}>
            3. Warranty, Bug Fixes &amp; Post-Launch Support
          </h2>
          <p style={{ color: '#cbd5e1', lineHeight: '1.7', fontSize: '14.5px' }}>
            Delivered software builds include a documented post-launch defect remediation window (typically 30 days unless specified otherwise in the SOW), during which any discrepancies against the agreed acceptance criteria are remediated with priority at no additional cost. Ongoing maintenance, SLA guarantees, and infrastructure engineering are contracted under separate service agreements.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#38bdf8', marginBottom: '12px' }}>
            4. Payment Terms &amp; Invoicing
          </h2>
          <p style={{ color: '#cbd5e1', lineHeight: '1.7', fontSize: '14.5px' }}>
            Invoices are issued according to milestone delivery schedules agreed upon in the SOW (e.g., Sprint Planning, Prototype, Staging Acceptance, Production Release). Payments may be made via verified corporate bank wire, Stripe, or approved banking channels.
          </p>
        </section>

        <section style={{ background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#e2e8f0', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertCircle size={16} color="#38bdf8" /> Legal Jurisdiction &amp; Independent Counsel Notice
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '13.5px', lineHeight: '1.6', margin: 0 }}>
            These public terms serve as a summary of our baseline commercial conditions. Master Service Agreements (MSA) and individual SOWs executed with enterprise clients represent the governing legal contract and are subject to the jurisdiction stipulated in each executed agreement. Parties are advised to review SOW terms with their corporate legal counsel.
          </p>
        </section>

        <section style={{ borderTop: '1px solid #1e293b', paddingTop: '20px' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#f8fafc', marginBottom: '8px' }}>
            Legal &amp; Contracts Contact
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.6' }}>
            For Master Service Agreement inquiries, vendor questionnaires, or legal questions:
          </p>
          <p style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#38bdf8', fontWeight: '600', marginTop: '8px' }}>
            <Mail size={16} /> <a href={`mailto:${COMPANY.contactEmail}`} style={{ color: '#38bdf8', textDecoration: 'none' }}>{COMPANY.contactEmail}</a>
          </p>
        </section>
      </div>
    </div>
  )
}
