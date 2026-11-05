import { useState, useEffect } from 'react'
import { ArrowUp, Calculator, MessageSquare, Mail, PhoneCall, X, Sparkles } from 'lucide-react'
import { COMPANY } from '../config/company'
import './FloatingActions.css'

export default function FloatingActions() {
  const [showTopBtn, setShowTopBtn] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  return (
    <div className="floating-actions-container">
      {/* Expanded Quick Drawer */}
      {isOpen && (
        <div className="floating-drawer animate-pop">
          <div className="drawer-header">
            <span>Quick Connect</span>
            <button className="drawer-close" onClick={() => setIsOpen(false)} aria-label="Close drawer">
              <X size={16} />
            </button>
          </div>

          <div className="drawer-actions">
            <button className="drawer-btn" onClick={() => scrollToSection('estimator')}>
              <div className="drawer-icon-box bg-blue">
                <Calculator size={18} />
              </div>
              <div className="drawer-btn-text">
                <strong>Project Estimator</strong>
                <span>Calculate budget &amp; scope in 60s</span>
              </div>
            </button>

            <button className="drawer-btn" onClick={() => scrollToSection('contact')}>
              <div className="drawer-icon-box bg-purple">
                <PhoneCall size={18} />
              </div>
              <div className="drawer-btn-text">
                <strong>Book a 30-Min Call</strong>
                <span>Direct calendar reservation</span>
              </div>
            </button>

            <a
              href={`https://wa.me/${COMPANY.phoneRaw}?text=Hi%20SriVoraTech,%20I'd%20like%20to%20discuss%20a%20project!`}
              className="drawer-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="drawer-icon-box bg-emerald">
                <MessageSquare size={18} />
              </div>
              <div className="drawer-btn-text">
                <strong>WhatsApp Us</strong>
                <span>{COMPANY.phone}</span>
              </div>
            </a>

            <a
              href={`mailto:${COMPANY.contactEmail}?subject=Project%20Inquiry%20from%20Website`}
              className="drawer-btn"
            >
              <div className="drawer-icon-box bg-purple">
                <Mail size={18} />
              </div>
              <div className="drawer-btn-text">
                <strong>Email Us Directly</strong>
                <span>{COMPANY.contactEmail}</span>
              </div>
            </a>

            <div className="drawer-social-bar">
              <span>Follow Us:</span>
              <a href={COMPANY.socials.facebook} target="_blank" rel="noopener noreferrer" title="Facebook">FB</a>
              <a href={COMPANY.socials.twitter} target="_blank" rel="noopener noreferrer" title="X (Twitter)">X</a>
              <a href={COMPANY.socials.instagram} target="_blank" rel="noopener noreferrer" title="Instagram">IG</a>
              <a href={`https://wa.me/${COMPANY.phoneRaw}`} target="_blank" rel="noopener noreferrer" title="WhatsApp">WA</a>
            </div>
          </div>
        </div>
      )}

      {/* Main Action Trigger Pill */}
      <div className="floating-trigger-group">
        {showTopBtn && (
          <button
            className="fab-btn top-btn"
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            title="Back to Top"
          >
            <ArrowUp size={18} />
          </button>
        )}

        <button
          className={`fab-btn main-trigger ${isOpen ? 'active' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open quick actions"
          title="Quick Actions"
        >
          {isOpen ? <X size={20} /> : <Sparkles size={20} />}
          <span className="fab-label">Quick Quote</span>
        </button>
      </div>
    </div>
  )
}
