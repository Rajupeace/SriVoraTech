import { useEffect, useRef } from 'react'
import {
  Shield, Zap, Award, Clock,
  Code2, Cpu, Rocket, Star, CheckCircle2, TrendingUp
} from 'lucide-react'
import './TrustTicker.css'

const statsItems = [
  { icon: <Rocket size={16} />, label: 'Custom Builds Delivered', value: '15+', color: '#0067f4' },
  { icon: <Clock size={16} />, label: 'Avg MVP Sprint', value: '2–4 Weeks', color: '#10b981' },
  { icon: <Star size={16} />, label: 'Client Rating', value: '5.0 ★', color: '#f59e0b' },
  { icon: <Shield size={16} />, label: 'Architecture Target', value: '99.9% Uptime', color: '#06b6d4' },
  { icon: <Award size={16} />, label: 'IP Ownership Transfer', value: '100%', color: '#0ea5e9' },
  { icon: <Cpu size={16} />, label: 'AI Models Integrated', value: '10+', color: '#f97316' },
  { icon: <TrendingUp size={16} />, label: 'Code Quality', value: 'Clean & Scalable', color: '#22c55e' },
  { icon: <Code2 size={16} />, label: 'Tech Stack', value: 'Modern & Robust', color: '#6366f1' },
]

const trustBadges = [
  'OWASP Secure Coding',
  'AWS Cloud Architecture',
  'Google Cloud Ready',
  'Role-Based JWT Security',
  'End-to-End Encryption',
  'Automated CI/CD Pipelines',
  'Full IP Code Handover',
  'Modern Next.js & React 19',
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

    const handleMouseEnter = () => cancelAnimationFrame(animId)
    const handleMouseLeave = () => { animId = requestAnimationFrame(animate) }

    marquee.parentElement.addEventListener('mouseenter', handleMouseEnter)
    marquee.parentElement.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      cancelAnimationFrame(animId)
      marquee.parentElement?.removeEventListener('mouseenter', handleMouseEnter)
      marquee.parentElement?.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  const renderItems = () => (
    <>
      {statsItems.map((item, idx) => (
        <div key={`stat-${idx}`} className="ticker-stat-chip">
          <span className="ticker-stat-icon" style={{ color: item.color }}>{item.icon}</span>
          <span className="ticker-stat-value" style={{ color: item.color }}>{item.value}</span>
          <span className="ticker-stat-label">{item.label}</span>
        </div>
      ))}
      {trustBadges.map((badge, idx) => (
        <div key={`badge-${idx}`} className="ticker-trust-badge">
          <CheckCircle2 size={13} />
          {badge}
        </div>
      ))}
    </>
  )

  return (
    <section className="trust-ticker-section">
      <div className="ticker-glow-left" />
      <div className="ticker-glow-right" />
      <div className="ticker-viewport">
        <div className="ticker-track" ref={marqueeRef}>
          <div className="ticker-track-inner">
            {renderItems()}
            {/* Duplicate for seamless loop */}
            {renderItems()}
          </div>
        </div>
      </div>
    </section>
  )
}
