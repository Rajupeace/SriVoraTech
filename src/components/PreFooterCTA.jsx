import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { ArrowRight, Sparkles, Shield, Rocket, CheckCircle2 } from 'lucide-react'
import './PreFooterCTA.css'

const marqueeItems = [
  'React 19',
  'Next.js 15',
  'TypeScript',
  'Tailwind CSS',
  'Node.js',
  'FastAPI',
  'Python AI',
  'PostgreSQL',
  'Redis Cache',
  'AWS Cloud',
  'Docker CI/CD',
  'GraphQL',
]

export default function PreFooterCTA() {
  const [ref, isVisible] = useScrollAnimation()

  return (
    <section className="pre-footer-cta" id="cta-section">
      <div className="container">
        <div ref={ref} className={`pre-footer-card animate-on-scroll ${isVisible ? 'visible' : ''}`}>
          <div className="cta-orb orb-cta-1" />
          <div className="cta-orb orb-cta-2" />

          <div className="cta-content-inner">
            <div className="cta-status-pill">
              <Sparkles size={14} className="flame-icon" />
              <span>Now Scheduling Discovery Sprints</span>
            </div>

            <h2 className="pre-footer-title">
              Let's Turn Your Vision into a <span className="gradient-text">High-Performance Product</span>
            </h2>

            <p className="pre-footer-subtitle">
              Book a 30-minute discovery session with our core architects to walk through your technical requirements, architecture design, and sprint roadmap.
            </p>

            <div className="cta-actions-row">
              <a href="#contact" className="btn-accent cta-main-btn">
                Book a 30-Min Call
                <ArrowRight size={18} />
              </a>

              <a href="#estimator" className="btn-secondary-dark">
                Estimate Project in 60s
              </a>
            </div>

            <div className="cta-trust-list">
              <span><Rocket size={14} /> 2–4 Wks Rapid MVP Sprint</span>
              <span><Shield size={14} /> 100% IP Code Ownership</span>
              <span><CheckCircle2 size={14} /> Transparent Milestones</span>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee Ticker */}
      <div className="marquee-wrapper">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, idx) => (
            <span key={idx} className="marquee-item">
              <span className="marquee-dot" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
