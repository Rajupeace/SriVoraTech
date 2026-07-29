import React from 'react'
import SEO from './SEO'
import ProjectEstimator from './ProjectEstimator'
import FAQ from './FAQ'
import { CheckCircle2, Zap, ShieldCheck } from 'lucide-react'

export default function PricingPage() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 24px 100px', color: '#f8fafc' }}>
      <SEO pathname="/pricing" breadcrumbs={[{ name: 'Home', url: '/' }, { name: 'Pricing', url: '/pricing' }]} />

      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.8rem', fontWeight: '800', marginBottom: '16px', background: 'linear-gradient(135deg, #fff 0%, #cbd5e1 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Transparent Pricing &amp; Project Cost Estimator
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto' }}>
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
