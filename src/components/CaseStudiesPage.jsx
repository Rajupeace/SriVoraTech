import React from 'react'
import SEO from './SEO'
import WorkShowcase from './WorkShowcase'
import { ArrowLeft } from 'lucide-react'

export default function CaseStudiesPage({ onBack, onNavigate }) {
  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '110px 24px 100px', color: 'var(--color-text-primary, #1e293b)' }}>
      <SEO pathname="/case-studies" breadcrumbs={[{ name: 'Home', url: '/' }, { name: 'Case Studies', url: '/case-studies' }]} />

      <button
        onClick={onBack || (() => window.history.back())}
        style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: '#ffffff', border: '1px solid var(--color-gray-200, #e2e8f0)', borderRadius: '8px', color: 'var(--color-text-primary, #1e293b)', cursor: 'pointer', fontSize: '13.5px', fontWeight: '600', marginBottom: '24px', boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}
      >
        <ArrowLeft size={16} /> Back to Home
      </button>

      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <span style={{ color: '#0067f4', fontWeight: '700', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.05em' }}>Enterprise Portfolio</span>
        <h1 style={{ fontSize: '2.8rem', fontWeight: '800', margin: '12px 0 16px', color: 'var(--color-text-heading, #0f172a)', letterSpacing: '-0.02em' }}>
          SriVoraTech Case Studies &amp; Success Stories
        </h1>
        <p style={{ color: 'var(--color-text-secondary, #475569)', fontSize: '1.1rem', maxWidth: '750px', margin: '0 auto' }}>
          Explore featured products built by SriVoraTech: SmartAI assistant suite, SriERP college management system, HealthConnect EMR, and ShopSphere E-commerce platform.
        </p>
      </div>

      <WorkShowcase />
    </div>
  )
}
