import React from 'react'
import SEO from './SEO'
import WorkShowcase from './WorkShowcase'

export default function CaseStudiesPage() {
  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '110px 24px 100px', color: 'var(--color-text-primary, #1e293b)' }}>
      <SEO pathname="/case-studies" breadcrumbs={[{ name: 'Home', url: '/' }, { name: 'Case Studies', url: '/case-studies' }]} />

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
