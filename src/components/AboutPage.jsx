import React from 'react'
import SEO from './SEO'
import Leadership from './Leadership'
import WhyChoose from './WhyChoose'
import Achievements from './Achievements'
import LocalBusinessSchema from './StructuredData'
import { generateLocalBusinessSchema } from '../lib/seo'
import { ShieldCheck, Award, MapPin, Globe2, Users, CheckCircle2, ArrowLeft } from 'lucide-react'

export default function AboutPage({ onBack, onNavigate }) {
  const localSchema = generateLocalBusinessSchema()

  return (
    <div className="about-page-container" style={{ padding: '110px 24px 100px', maxWidth: '1200px', margin: '0 auto', color: 'var(--color-text-primary, #1e293b)' }}>
      <SEO pathname="/about" breadcrumbs={[{ name: 'Home', url: '/' }, { name: 'About Us', url: '/about' }]} schema={localSchema} />

      <button
        onClick={onBack || (() => window.history.back())}
        style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: '#ffffff', border: '1px solid var(--color-gray-200, #e2e8f0)', borderRadius: '8px', color: 'var(--color-text-primary, #1e293b)', cursor: 'pointer', fontSize: '13.5px', fontWeight: '600', marginBottom: '24px', boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}
      >
        <ArrowLeft size={16} /> Back to Home
      </button>

      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <div className="seo-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 14px', background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)', color: '#059669', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '700', marginBottom: '14px' }}>
          <ShieldCheck size={14} /> Founder &amp; CEO Badisa Srikanth
        </div>
        <h1 style={{ fontSize: '3rem', fontWeight: '800', margin: '8px 0 18px', color: 'var(--color-text-heading, #0f172a)', letterSpacing: '-0.02em' }}>
          About SriVoraTech
        </h1>
        <p style={{ color: 'var(--color-text-secondary, #475569)', fontSize: '1.15rem', maxWidth: '800px', margin: '0 auto', lineHeight: '1.7' }}>
          SriVoraTech (srivoratech.in) was founded in 2024 in Hyderabad, India by CEO <strong>Badisa Srikanth (Srikanth Badisa)</strong>. We are a next-generation IT services and AI solutions engineering company serving global startups, SMBs, and enterprises across India, USA, UK, Canada, Australia, and UAE.
        </p>
      </div>

      {/* Leadership & EEAT Component */}
      <Leadership />

      {/* Core Values & Why Choose */}
      <div style={{ marginTop: '60px' }}>
        <WhyChoose />
      </div>

      {/* Achievements & Metrics */}
      <div style={{ marginTop: '60px' }}>
        <Achievements />
      </div>
    </div>
  )
}
