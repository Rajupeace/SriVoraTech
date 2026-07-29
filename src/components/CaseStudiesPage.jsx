import React from 'react'
import SEO from './SEO'
import WorkShowcase from './WorkShowcase'

export default function CaseStudiesPage() {
  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '60px 24px 100px', color: '#f8fafc' }}>
      <SEO pathname="/case-studies" breadcrumbs={[{ name: 'Home', url: '/' }, { name: 'Case Studies', url: '/case-studies' }]} />

      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <span style={{ color: '#10b981', fontWeight: '700', textTransform: 'uppercase', fontSize: '0.85rem' }}>Enterprise Portfolio</span>
        <h1 style={{ fontSize: '2.8rem', fontWeight: '800', margin: '12px 0 16px', background: 'linear-gradient(135deg, #fff 0%, #cbd5e1 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          SriVoraTech Case Studies &amp; Success Stories
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '750px', margin: '0 auto' }}>
          Explore featured products built by SriVoraTech: SmartAI assistant suite, SriERP college management system, HealthConnect EMR, and ShopSphere E-commerce platform.
        </p>
      </div>

      <WorkShowcase />
    </div>
  )
}
