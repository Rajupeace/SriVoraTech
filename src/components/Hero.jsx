import { useState, useEffect } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { ArrowRight, Zap, MousePointer2, Figma, Shield, Clock, Rocket, Sparkles, Cpu, Globe, Palette, Users, Briefcase, CheckCircle2, ShieldCheck, Activity, Terminal } from 'lucide-react'
import { subscribeToRatings } from '../services/ratingsService'
import HeroCanvas from './HeroCanvas'
import srikanthPhoto from '../assets/badisa_srikanth.jpg'
import vamsiPhoto from '../assets/vamsi_krishna.jpg'
import saiPhoto from '../assets/sai_manindra.jpg'
import './Hero.css'

const colorThemes = [
  { id: 'sapphire', label: 'Sapphire Electric', gradient: 'linear-gradient(135deg, #0067f4 0%, #6366f1 100%)', textGrad: 'linear-gradient(135deg, #0067f4, #8b5cf6, #ec4899)' },
  { id: 'sunset', label: 'Neon Sunset', gradient: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)', textGrad: 'linear-gradient(135deg, #f59e0b, #ef4444, #f97316)' },
  { id: 'emerald', label: 'Cyber Emerald', gradient: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)', textGrad: 'linear-gradient(135deg, #10b981, #06b6d4, #3b82f6)' },
  { id: 'cosmic', label: 'Cosmic Violet', gradient: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)', textGrad: 'linear-gradient(135deg, #8b5cf6, #ec4899, #6366f1)' },
]

export default function Hero() {
  const [ref1, vis1] = useScrollAnimation()
  const [ref2, vis2] = useScrollAnimation()
  const [ref3, vis3] = useScrollAnimation()
  const [ref4, vis4] = useScrollAnimation()
  const [ref5, vis5] = useScrollAnimation()
  const [ref6, vis6] = useScrollAnimation()

  const [colorMode, setColorMode] = useState('sapphire')
  const [activeHeroTab, setActiveHeroTab] = useState('ai')
  const [ratingStats, setRatingStats] = useState({ averageRating: 5.0, totalCount: 15 })

  const [animatedTeamCount, setAnimatedTeamCount] = useState(10)
  const [animatedClientsCount, setAnimatedClientsCount] = useState(50)

  useEffect(() => {
    const unsubscribe = subscribeToRatings((metrics) => {
      if (metrics) {
        setRatingStats({
          averageRating: metrics.averageRating || 5.0,
          totalCount: metrics.totalCount || 15
        })
      }
    })
    return () => unsubscribe()
  }, [])

  const currentTheme = colorThemes.find(t => t.id === colorMode) || colorThemes[0]

  return (
    <section id="home" className={`hero hero-theme-${colorMode}`}>
      {/* Background Particle Physics Canvas */}
      <HeroCanvas colorMode={colorMode} />

      {/* Ambient background glow orbs */}
      <div className="hero-orb-1" />
      <div className="hero-orb-2" />

      {/* Dot pattern background overlay */}
      <div className="hero-dots" />

      {/* Announcement & Color Theme Switcher Bar */}
      <div ref={ref1} className={`hero-top-bar-group animate-on-scroll ${vis1 ? 'visible' : ''}`}>
        <a className="hero-badge" href="#our-works">
          <span className="pulse-ring" />
          <span className="hero-badge-text">⚡ SRIVORATECH AI VIRTUAL ASSISTANT & WORKFLOW AUTOMATION ENGINE</span>
          <span className="hero-badge-arrow">
            <ArrowRight size={14} />
          </span>
        </a>

        {/* Color Theme Selector Pills */}
        <div className="hero-theme-selector">
          <Palette size={13} className="palette-icon" />
          {colorThemes.map(t => (
            <button
              key={t.id}
              className={`theme-dot ${colorMode === t.id ? 'active' : ''}`}
              style={{ background: t.gradient }}
              onClick={() => setColorMode(t.id)}
              title={`Switch theme to ${t.label}`}
              aria-label={`Switch theme to ${t.label}`}
            />
          ))}
        </div>
      </div>

      {/* Center Hero Content */}
      <div className="hero-center">
        <h1 ref={ref2} className={`hero-title animate-on-scroll ${vis2 ? 'visible' : ''}`}>
          <span className="hero-title-line">
            Engineering High-Performance
            <span className="hero-icon-badge rotate-12" title="UI/UX Design Systems">
              <MousePointer2 size={18} />
            </span>
            <span className="hero-icon-badge rotate-neg-12" title="Figma Precision">
              <Figma size={18} />
            </span>
          </span>
          <span className="hero-title-line">
            Custom Software &
            <span className="hero-gradient-badge" style={{ backgroundImage: currentTheme.textGrad }}>
              <Sparkles size={16} /> AI Automation
            </span>
          </span>
        </h1>

        <h1 ref={ref3} className={`hero-title-mobile animate-on-scroll ${vis3 ? 'visible' : ''}`}>
          Engineering High-Performance Software & AI Automation
        </h1>

        <p ref={ref4} className={`hero-subtitle animate-on-scroll delay-1 ${vis4 ? 'visible' : ''}`}>
          SriVoraTech empowers startups and enterprise leaders with tailored software architecture, cloud platforms, custom AI agents, and mobile apps engineered for sub-second speed, 99.9% uptime, and maximum security.
        </p>

        {/* Trust metrics pills */}
        <div className="hero-trust-badges">
          <span className="trust-pill"><Rocket size={14} /> 2-4 Wks MVP Accelerator</span>
          <span className="trust-pill"><ShieldCheck size={14} /> 100% IP & Source Ownership</span>
          <span className="trust-pill"><Clock size={14} /> 99.9% Uptime Guarantee</span>
          <span className="trust-pill"><Zap size={14} /> Sub-100ms API Latency</span>
        </div>

        {/* Action Call to Action buttons */}
        <div ref={ref5} className={`hero-cta-row animate-on-scroll delay-2 ${vis5 ? 'visible' : ''}`}>
          <a href="#contact" className="btn-primary hero-main-btn">
            Book 30-Min Discovery Call
            <span className="btn-icon">
              <ArrowRight size={18} style={{ transform: 'rotate(-45deg)' }} />
            </span>
          </a>

          <a href="#our-works" className="btn-secondary-light">
            Explore Signature Products
          </a>
        </div>

        {/* Executive Founders Social Proof Row */}
        <div ref={ref6} className={`hero-social-proof animate-on-scroll delay-3 ${vis6 ? 'visible' : ''}`}>
          <div className="hero-avatars-stack" title="Executive Leadership: Srikanth (CEO), Vamsi (COO), Manindra (CTO)">
            <img src={srikanthPhoto} alt="Badisa Srikanth (Srikanth Badisa) - Founder & CEO of SriVoraTech" title="Badisa Srikanth (Founder & CEO)" className="hero-avatar hero-avatar-img" />
            <img src={vamsiPhoto} alt="Badisa Vamsi Krishna - Co-Founder & COO of SriVoraTech" title="Badisa Vamsi Krishna (Co-Founder & COO)" className="hero-avatar hero-avatar-img" />
            <img src={saiPhoto} alt="Garapati Sai Manindra - Chief Technology Officer (CTO) of SriVoraTech" title="Garapati Sai Manindra (CTO)" className="hero-avatar hero-avatar-img" />
            <span className="hero-avatar-count">+50</span>
          </div>

          <a href="#website-rating" className="hero-rating" title="View Approved Client Ratings">
            <div className="hero-stars">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="16" height="16" fill="#f59e0b" viewBox="0 0 20 20" className="hero-star" style={{ color: "#f59e0b" }}>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.049 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
                </svg>
              ))}
            </div>
            <span className="hero-review-text">Rated 5.0/5 (50+ Verified Enterprise Reviews)</span>
          </a>
        </div>
      </div>
    </section>
  )
}
