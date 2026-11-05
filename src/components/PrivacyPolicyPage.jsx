import React from 'react'
import SEO from './SEO'
import { Shield, ArrowLeft, Mail, CheckCircle2, Lock, Eye, FileText, Globe, Database } from 'lucide-react'
import { COMPANY_CONFIG } from '../config/company'

export default function PrivacyPolicyPage({ onBack, onNavigate }) {
  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '60px 24px 100px', color: '#f8fafc' }}>
      <SEO
        pathname="/privacy"
        title="Privacy Policy | SriVoraTech"
        description="Official Privacy Policy of SriVoraTech Technologies. Explains how client enquiry data, project requirements, and technical specifications are handled and protected."
        breadcrumbs={[{ name: 'Home', url: '/' }, { name: 'Privacy Policy', url: '/privacy' }]}
      />

      <div style={{ marginBottom: '32px' }}>
        <button
          onClick={onBack || (() => window.history.back())}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#cbd5e1', cursor: 'pointer', fontSize: '13.5px', fontWeight: '600', marginBottom: '24px' }}
        >
          <ArrowLeft size={16} /> Back
        </button>

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.25)', borderRadius: '999px', color: '#10b981', fontSize: '12px', fontWeight: '700', marginBottom: '14px' }}>
          <Shield size={14} /> Official Policy • Last Updated: 2026
        </div>

        <h1 style={{ fontSize: '2.8rem', fontWeight: '800', margin: '8px 0 16px', background: 'linear-gradient(135deg, #fff 0%, #cbd5e1 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Privacy Policy
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1.1rem', lineHeight: '1.7' }}>
          At {COMPANY_CONFIG.legalName} (<strong>srivoratech.in</strong>), we respect your confidentiality and are committed to safeguarding all personal information, project specifications, and proprietary data shared with us.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '36px' }}>
        <section>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#38bdf8', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Eye size={20} /> 1. Information We Collect
          </h2>
          <p style={{ color: '#cbd5e1', lineHeight: '1.7', fontSize: '14.5px' }}>
            We only collect data voluntarily submitted by visitors when requesting project estimates, booking technical discovery calls, or applying for engineering positions:
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '12px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', fontSize: '14px' }}>
              <CheckCircle2 size={16} color="#10b981" /> Name, business email address, phone number, and organization name.
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', fontSize: '14px' }}>
              <CheckCircle2 size={16} color="#10b981" /> Project requirements, technical architecture preferences, and budget selections.
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', fontSize: '14px' }}>
              <CheckCircle2 size={16} color="#10b981" /> Resumes, portfolio links, and GitHub profiles submitted during job applications.
            </li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#38bdf8', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Database size={20} /> 2. Processing &amp; Data Storage
          </h2>
          <p style={{ color: '#cbd5e1', lineHeight: '1.7', fontSize: '14.5px' }}>
            Contact form submissions are processed through our authenticated backend API and stored in our database records to ensure reliable enquiry delivery. Enquiries are additionally mirrored to our internal Google Workspace spreadsheet for sales team assignment.
          </p>
          <p style={{ color: '#cbd5e1', lineHeight: '1.7', fontSize: '14.5px', marginTop: '10px' }}>
            <strong>We never sell, rent, or trade your personal or project data to third-party data brokers or marketing networks.</strong> All transmissions occur over encrypted TLS / HTTPS connections.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#38bdf8', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FileText size={20} /> 3. Non-Disclosure &amp; Intellectual Property
          </h2>
          <p style={{ color: '#cbd5e1', lineHeight: '1.7', fontSize: '14.5px' }}>
            We execute formal Mutual Non-Disclosure Agreements (NDA) prior to reviewing proprietary client repositories, business logic, or technical trade secrets. Upon final sprint milestone payment, 100% of all custom source code, documentation, and cloud deployment access is unconditionally transferred to the client.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#38bdf8', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Globe size={20} /> 4. Cookies &amp; Analytics
          </h2>
          <p style={{ color: '#cbd5e1', lineHeight: '1.7', fontSize: '14.5px' }}>
            Our website uses Google Analytics to measure aggregate visitor navigation, page performance, and device screen dimensions without tracking personally identifiable information.
          </p>
        </section>

        <section style={{ borderTop: '1px solid #1e293b', paddingTop: '20px' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#f8fafc', marginBottom: '8px' }}>
            Data Access, Rectification &amp; Deletion
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.6' }}>
            Under applicable data protection principles (including India's Digital Personal Data Protection Act and GDPR principles), you have the right to request access to or permanent deletion of your enquiry data. To exercise these rights, email:
          </p>
          <p style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#38bdf8', fontWeight: '600', marginTop: '8px' }}>
            <Mail size={16} /> {COMPANY_CONFIG.email.support}
          </p>
        </section>
      </div>
    </div>
  )
}
