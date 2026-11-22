import React from 'react'
import SEO from './SEO'
import ProjectEstimator from './ProjectEstimator'
import FAQ from './FAQ'
import { CheckCircle2, Zap, ShieldCheck } from 'lucide-react'

export default function PricingPage() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '110px 24px 100px', color: 'var(--color-text-primary, #1e293b)' }}>
      <SEO pathname="/pricing" breadcrumbs={[{ name: 'Home', url: '/' }, { name: 'Pricing', url: '/pricing' }]} />

      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <span style={{ color: '#0067f4', fontWeight: '700', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.05em' }}>Cost Estimator</span>
        <h1 style={{ fontSize: '2.8rem', fontWeight: '800', margin: '12px 0 16px', color: 'var(--color-text-heading, #0f172a)', letterSpacing: '-0.02em' }}>
          Transparent Pricing &amp; Project Cost Estimator
        </h1>
        <p style={{ color: 'var(--color-text-secondary, #475569)', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto' }}>
          Calculate your exact project scope and budget with zero hidden fees. Fixed-price sprints delivered in 2–4 weeks.
        </p>
      </div>

      <ProjectEstimator />

      <div style={{ marginTop: '80px' }}>
        <FAQ />
      </div>
    </div>
  )
}
