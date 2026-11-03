import React from 'react'
import SEO from './SEO'
import { Shield, ArrowLeft, Mail, CheckCircle2, Lock, Eye, FileText, Globe } from 'lucide-react'

export default function PrivacyPolicyPage({ onBack, onNavigate }) {
  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '60px 24px 100px', color: '#f8fafc' }}>
      <SEO
        pathname="/privacy"
        title="Privacy Policy | SriVoraTech"
        description="Official Privacy Policy of SriVoraTech Technologies. Learn how we handle client data, confidentiality, security, and IP rights."
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
          At SriVoraTech (<strong>srivoratech.in</strong>), we respect your privacy and are committed to protecting all personal information, client project specifications, and proprietary data shared with us.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '36px' }}>
        <section>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#38bdf8', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Eye size={20} /> 1. Information We Collect
          </h2>
          <p style={{ color: '#cbd5e1', lineHeight: '1.7', fontSize: '14.5px' }}>
            We only collect information voluntarily provided by visitors when submitting contact forms, requesting project estimates, applying for open career roles, or engaging in discovery calls:
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '12px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', fontSize: '14px' }}>
              <CheckCircle2 size={16} color="#10b981" /> Name, official email address, phone number, and organization name.
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', fontSize: '14px' }}>
              <CheckCircle2 size={16} color="#10b981" /> Project specifications, scope documents, and budget preferences.
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', fontSize: '14px' }}>
              <CheckCircle2 size={16} color="#10b981" /> Resumes and portfolio links provided during job or internship applications.
            </li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#38bdf8', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Lock size={20} /> 2. How We Use &amp; Protect Your Data
          </h2>
          <p style={{ color: '#cbd5e1', lineHeight: '1.7', fontSize: '14.5px' }}>
            All collected information is used solely to respond to inquiries, execute contractual software engineering sprints, issue invoices, and communicate milestone updates.
          </p>
          <p style={{ color: '#cbd5e1', lineHeight: '1.7', fontSize: '14.5px', marginTop: '10px' }}>
            <strong>We never sell, rent, or trade customer information to third-party advertisers or brokers.</strong> All data transmission is protected using SSL/TLS 1.3 encryption and stored within secured access-controlled databases.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#38bdf8', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FileText size={20} /> 3. Non-Disclosure &amp; Intellectual Property
          </h2>
          <p style={{ color: '#cbd5e1', lineHeight: '1.7', fontSize: '14.5px' }}>
            We sign formal Mutual Non-Disclosure Agreements (NDA) before reviewing confidential codebase repositories or proprietary trade secrets. Upon completion of milestone payments, all intellectual property, git repositories, and cloud credentials are transferred immediately to the client.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#38bdf8', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Globe size={20} /> 4. Cookies &amp; Analytics
          </h2>
          <p style={{ color: '#cbd5e1', lineHeight: '1.7', fontSize: '14.5px' }}>
            Our website uses lightweight standard analytics (Google Analytics) to assess page performance, identify broken links, and measure user navigation without storing personally identifiable information.
          </p>
        </section>

        <section style={{ borderTop: '1px solid #1e293b', paddingTop: '20px' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#f8fafc', marginBottom: '8px' }}>
            Contact SriVoraTech Privacy Office
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.6' }}>
            For privacy inquiries, data deletion requests, or NDA execution, contact us at:
          </p>
          <p style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#38bdf8', fontWeight: '600', marginTop: '8px' }}>
            <Mail size={16} /> srivoratech9@gmail.com
          </p>
        </section>
      </div>
    </div>
  )
}

