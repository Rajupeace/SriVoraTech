import { useState, useEffect } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { ArrowRight, Zap, Rocket, ShieldCheck, Star } from 'lucide-react'
import { subscribeToRatings } from '../services/ratingsService'
import HeroCanvas from './HeroCanvas'
import './Hero.css'

export default function Hero() {
  const [ref1, vis1] = useScrollAnimation()
  const [ref2, vis2] = useScrollAnimation()
  const [ref3, vis3] = useScrollAnimation()
  const [ref4, vis4] = useScrollAnimation()
  const [ref5, vis5] = useScrollAnimation()

  const [ratingStats, setRatingStats] = useState({ averageRating: null, totalCount: 0 })

  useEffect(() => {
    const unsubscribe = subscribeToRatings((metrics) => {
      if (metrics) {
        setRatingStats({
          averageRating: metrics.totalCount > 0 ? metrics.averageRating : null,
          totalCount: metrics.totalCount || 0
        })
      }
    })
    return () => unsubscribe()
  }, [])

  return (
    <section id="home" className="hero-section">
      {/* Subtle, faint background canvas */}
      <HeroCanvas />

      {/* Subtle background glow */}
      <div className="hero-ambient-glow" />

      <div className="hero-centered-container container">
        {/* Availability Pill & Eyebrow */}
        <div ref={ref1} className={`hero-status-pill animate-on-scroll ${vis1 ? 'visible' : ''}`}>
          <span className="hero-status-dot" />
          <span className="hero-status-text">Available for New Project Engagements</span>
        </div>

        <div className="hero-eyebrow-label">
          NEXT-GEN SOFTWARE ENGINEERING &amp; APPLIED AI
        </div>

        {/* Hero Title: Sentence Case with Clean Blue Accent */}
        <div ref={ref2} className={`hero-title-container animate-on-scroll delay-1 ${vis2 ? 'visible' : ''}`}>
          <h1 className="hero-main-title">
            Architecting <span className="hero-highlight">intelligent systems</span> that scale globally.
          </h1>
        </div>

        {/* Clean subtitle */}
        <p ref={ref3} className={`hero-description animate-on-scroll delay-2 ${vis3 ? 'visible' : ''}`}>
          SriVoraTech empowers startups and business leaders with custom software engineering, scalable cloud architecture, intelligent AI automation, and mobile platforms built with clean code and high performance.
        </p>

        {/* CTA Buttons: Matching Heights, Primary Filled & Secondary Outlined */}
        <div ref={ref4} className={`hero-actions-row animate-on-scroll delay-3 ${vis4 ? 'visible' : ''}`}>
          <a href="#contact" className="btn-primary hero-btn-filled">
            Book 30-Min Discovery Call
            <span className="btn-icon">
              <ArrowRight size={17} style={{ transform: 'rotate(-45deg)' }} />
            </span>
          </a>

          <a href="#our-works" className="hero-btn-outlined">
            Explore Signature Products
          </a>
        </div>

        {/* Proof / Verification Row */}
        <div ref={ref5} className={`hero-proof-row animate-on-scroll delay-4 ${vis5 ? 'visible' : ''}`}>
          {ratingStats.totalCount > 0 ? (
            <a href="#website-rating" className="hero-rating-link" title="View Verified Client Ratings">
              <div className="hero-stars-row">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>
              <span className="hero-proof-text">
                Rated {Number(ratingStats.averageRating).toFixed(1)}/5 ({ratingStats.totalCount} Verified Reviews)
              </span>
            </a>
          ) : (
            <div className="hero-trust-pills-row">
              <div className="trust-item">
                <Rocket size={15} className="trust-icon" />
                <span>Iterative Agile Sprints</span>
              </div>
              <span className="trust-dot">•</span>
              <div className="trust-item">
                <ShieldCheck size={15} className="trust-icon" />
                <span>100% IP &amp; Source Ownership</span>
              </div>
              <span className="trust-dot">•</span>
              <div className="trust-item">
                <Zap size={15} className="trust-icon" />
                <span>High-Availability Cloud</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
