import { useState, useEffect } from 'react'
import { Sparkles, ArrowRight, Zap, Shield, Award, Cpu, X } from 'lucide-react'
import './WelcomeSplash.css'

export default function WelcomeSplash({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [isDismissing, setIsDismissing] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const [dontShowAgain, setDontShowAgain] = useState(false)

  useEffect(() => {
    // Check if splash was already dismissed permanently or in this session
    const permanentDismiss = localStorage.getItem('svt_splash_seen_permanent')
    const sessionDismiss = sessionStorage.getItem('svt_splash_seen')
    if (permanentDismiss === 'true' || sessionDismiss === 'true') {
      setIsDismissed(true)
      if (onComplete) onComplete()
      return
    }

    // Smooth quick progress animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            triggerDismiss()
          }, 150)
          return 100
        }
        return prev + 20
      })
    }, 20)

    return () => clearInterval(interval)
  }, [])

  const triggerDismiss = () => {
    if (isDismissing) return
    setIsDismissing(true)
    sessionStorage.setItem('svt_splash_seen', 'true')
    if (dontShowAgain) {
      localStorage.setItem('svt_splash_seen_permanent', 'true')
    }
    setTimeout(() => {
      setIsDismissed(true)
      if (onComplete) onComplete()
    }, 300)
  }

  if (isDismissed) return null

  return (
    <div className={`welcome-splash-overlay ${isDismissing ? 'splash-fade-out' : ''}`}>
      {/* Soft Light Ambient Glow Orbs */}
      <div className="splash-light-orb light-orb-1" />
      <div className="splash-light-orb light-orb-2" />
      <div className="splash-light-orb light-orb-3" />
      <div className="splash-light-grid" />

      <div className="splash-card-light animate-splash-card">
        {/* Instant Skip Intro Button */}
        <button
          className="splash-skip-corner-btn"
          onClick={triggerDismiss}
          aria-label="Skip splash introduction"
        >
          <span>Skip</span>
          <X size={14} />
        </button>

        {/* Top Welcome Badge */}
        <div className="splash-light-badge animate-splash-top">
          <Sparkles size={14} className="sparkle-gold" />
          <span>Official Portal &bull; SriVoraTech.in</span>
        </div>

        {/* Crisp Brand Title */}
        <div className="splash-brand-heading animate-splash-title">
          <h1 className="brand-title-text">
            SriVora<span className="brand-accent-blue">Tech</span><span className="brand-domain-sub">.in</span>
          </h1>
        </div>

        <p className="splash-light-subheading animate-splash-sub">
          Engineering Enterprise AI Solutions, Scalable Cloud Systems & Digital Innovation
        </p>

        {/* Professional Trust Feature Pills */}
        <div className="splash-pills-row animate-splash-features">
          <span className="light-feature-pill"><Zap size={13} className="pill-blue-icon" /> High Performance</span>
          <span className="light-feature-pill"><Shield size={13} className="pill-green-icon" /> Enterprise Security</span>
          <span className="light-feature-pill"><Award size={13} className="pill-gold-icon" /> 5.0 Star Rated Team</span>
        </div>

        {/* Progress Fill & Action Button */}
        <div className="splash-footer-light animate-splash-footer">
          <div className="splash-progress-track-light">
            <div className="splash-progress-fill-blue" style={{ width: `${progress}%` }} />
          </div>

          <div className="splash-bottom-bar">
            <span className="splash-loading-label">
              <Cpu size={14} className="cpu-spin-icon" /> Initializing Platform Modules... {progress}%
            </span>
            <button className="splash-explore-btn-light" onClick={triggerDismiss}>
              Explore Platform <ArrowRight size={14} />
            </button>
          </div>

          <label className="splash-permanent-opt">
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
            />
            <span>Don't show this intro on next visit</span>
          </label>
        </div>
      </div>
    </div>
  )
}
