import { useEffect, useRef } from 'react'
import {
  Shield, Zap, Award, Clock,
  Code2, Cpu, Rocket, Star, CheckCircle2, TrendingUp
} from 'lucide-react'
import './TrustTicker.css'

const statsItems = [
  { icon: <Rocket size={16} />, label: 'Software Builds', value: 'Tailored Solutions', color: '#0067f4' },
  { icon: <Clock size={16} />, label: 'Target MVP Sprint', value: '2–4 Weeks', color: '#10b981' },
  { icon: <Shield size={16} />, label: 'Architecture Target', value: '99.9% Uptime', color: '#06b6d4' },
  { icon: <Award size={16} />, label: 'IP Ownership Transfer', value: '100% Handover', color: '#0ea5e9' },
  { icon: <Cpu size={16} />, label: 'AI Architecture', value: 'Applied RAG & LLMs', color: '#f97316' },
  { icon: <TrendingUp size={16} />, label: 'Code Quality', value: 'Clean & Scalable', color: '#22c55e' },
  { icon: <Code2 size={16} />, label: 'Tech Stack', value: 'Modern & Proven', color: '#6366f1' },
]

const trustBadges = [
  'OWASP Guidelines Aligned',
  'AWS Cloud Infrastructure',
  'Multi-Cloud Ready',
  'Role-Based JWT Security',
  'TLS / HTTPS Encryption',
  'Automated CI/CD Pipelines',
  '100% IP Code Handover',
  'Modern React & Next.js',
]

export default function TrustTicker() {
  const marqueeRef = useRef(null)

  useEffect(() => {
    const marquee = marqueeRef.current
    if (!marquee) return

    let animId
    let pos = 0
    const speed = 0.4

    const animate = () => {
      pos -= speed
      const firstTrack = marquee.querySelector('.ticker-track')
      if (firstTrack && Math.abs(pos) >= firstTrack.scrollWidth / 2) {
        pos = 0
      }
      marquee.style.transform = `translateX(${pos}px)`
      animId = requestAnimationFrame(animate)
    }

    animId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <div className="trust-ticker-container" aria-label="Key engineering standards and trust badges">
      {/* Top Track: Engineering Standards */}
      <div className="ticker-wrapper" ref={marqueeRef}>
        <div className="ticker-track">
          {statsItems.concat(statsItems).map((item, idx) => (
            <div key={`stat-${idx}`} className="ticker-item stat-item">
              <span className="ticker-icon" style={{ color: item.color }}>{item.icon}</span>
              <span className="ticker-stat-value" style={{ color: item.color }}>{item.value}</span>
              <span className="ticker-stat-label">{item.label}</span>
              <span className="ticker-dot">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Track: Technical Badges */}
      <div className="ticker-badges-row">
        <div className="ticker-badges-inner">
          {trustBadges.map((badge, idx) => (
            <span key={`badge-${idx}`} className="trust-pill">
              <CheckCircle2 size={12} className="pill-check" />
              {badge}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
