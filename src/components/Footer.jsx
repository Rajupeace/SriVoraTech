import { useState } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { ArrowRight, Zap, CheckCircle2, Mail, Shield, FileText, Scale, Copyright, Heart } from 'lucide-react'
import './Footer.css'

const companyLinks = [
  { label: 'About Us', href: '/about', isRoute: true },
  { label: 'Founder Profile', href: '/founder', isRoute: true },
  { label: 'Services', href: '#services' },
  { label: 'Case Studies', href: '/case-studies', isRoute: true },
  { label: 'Client Portal', href: '/client-portal', isRoute: true },
  { label: 'Project Estimator', href: '#estimator' },
  { label: 'Tech Stack', href: '#tech-stack' },
  { label: 'Careers', href: '/careers', isRoute: true },
  { label: 'Privacy Policy', href: '/privacy', isRoute: true },
  { label: 'Terms of Service', href: '/terms', isRoute: true },
  { label: 'Contact', href: '#contact' },
]

const servicesList = [
  'Full-Stack Software Development',
  'Custom Web Applications',
  'Cross-Platform Mobile Apps',
  'Autonomous AI Agents & RAG',
  'Enterprise ERP & CRM Systems',
  'AWS Cloud Architecture & DevOps',
  'Database Engineering & Security'
]

const socialLinks = [
  { label: 'Email Us', href: 'mailto:srivoratech9@gmail.com' },
  { label: 'WhatsApp Chat', href: 'https://wa.me/919182030946' },
  { label: 'Instagram', href: 'https://www.instagram.com/srivora_tech?igsh=MWRxOWJ6Z2F6bnUzdg==' },
  { label: 'Facebook', href: 'https://www.facebook.com/p/SriVoratech-SriVoratech-61591870486562/' },
  { label: 'X (Twitter)', href: 'https://x.com/srivorateclrqn' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/srikanthbadisa/' },
]

export default function Footer({ onNavigate }) {
  const [ref, isVisible] = useScrollAnimation()
  const [subscribed, setSubscribed] = useState(false)
  const [emailInput, setEmailInput] = useState('')
  const [activeLegal, setActiveLegal] = useState(null)

  const handleLinkClick = (e, link) => {
    if (link.isRoute) {
      e.preventDefault()
      if (onNavigate) {
        onNavigate(link.href)
      } else {
        window.location.href = link.href
      }
    } else if (window.location.pathname !== '/') {
      e.preventDefault()
      if (onNavigate) {
        onNavigate(`/${link.href}`)
      } else {
        window.location.href = `/${link.href}`
      }
    }
  }

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    if (emailInput) {
      setSubscribed(true)
      setEmailInput('')
      setTimeout(() => setSubscribed(false), 4000)
    }
  }

  const toggleLegal = (section) => {
    setActiveLegal(activeLegal === section ? null : section)
  }

  return (
    <footer ref={ref} className={`footer animate-on-scroll ${isVisible ? 'visible' : ''}`}>
      <div className="footer-bg-logo">
        <span className="footer-bg-text">SriVoraTech</span>
      </div>

      <div className="footer-grid container">
        {/* Column 1: Logo + tagline */}
        <div className="footer-col footer-brand">
          <a
            className="footer-logo"
            href="/"
            onClick={(e) => {
              e.preventDefault()
              if (onNavigate) onNavigate('/')
              else window.location.href = '/'
            }}
          >
            <div className="logo-badge">
              <Zap size={16} />
            </div>
            <span className="logo-text">SriVora<span className="logo-accent">Tech</span></span>
          </a>
          <p className="footer-tagline">
            End-to-end digital product design, web engineering, and AI automation tailored to accelerate business growth.
          </p>
          <p className="footer-contact-email">
            <Mail size={14} /> srivoratech9@gmail.com
          </p>
          <div className="footer-status-pill">
            <span className="pulse-ring" />
            <span>Building Innovative Software • AI Solutions • Cloud Engineering</span>
          </div>
        </div>

        {/* Column 2: Quick Links + Socials */}
        <div className="footer-col footer-links-grid">
          <div>
            <h4 className="footer-heading">Navigation</h4>
            <div className="footer-link-list">
              {companyLinks.map((link) => (
                <a key={link.href} className="footer-link" href={link.href} onClick={(e) => handleLinkClick(e, link)}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="footer-heading">Connect</h4>
            <div className="footer-link-list">
              {socialLinks.map((link) => (
                <a key={link.label} className="footer-link footer-social-link" href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.label}
                  <ArrowRight size={12} style={{ transform: 'rotate(-45deg)' }} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Column 3: Newsletter */}
        <div className="footer-col footer-newsletter">
          <h4 className="footer-heading">Tech Insights Newsletter</h4>
          <p className="footer-newsletter-desc">
            Subscribe for monthly engineering updates, architecture teardowns, and technology insights.
          </p>
          {subscribed ? (
            <div className="newsletter-success">
              <CheckCircle2 size={18} />
              <span>Subscribed! Thank you for joining.</span>
            </div>
          ) : (
            <form className="footer-form" onSubmit={handleNewsletterSubmit}>
              <span className="footer-form-at">@</span>
              <input
                type="email"
                placeholder="Enter work email..."
                className="footer-form-input"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                required
              />
              <button type="submit" className="footer-form-btn" aria-label="Submit newsletter">
                <ArrowRight size={18} />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* ── Legal Sections ── */}
      <div className="footer-legal-sections container">
        {/* Security Summary */}
        <div className={`legal-accordion ${activeLegal === 'security' ? 'open' : ''}`}>
          <button className="legal-accordion-btn" onClick={() => toggleLegal('security')}>
            <span className="legal-icon-label">
              <Shield size={16} /> Engineering Security Standards
            </span>
            <span className="legal-toggle">{activeLegal === 'security' ? '−' : '+'}</span>
          </button>
          {activeLegal === 'security' && (
            <div className="legal-content">
              <p>At SriVoraTech, security is integrated into every stage of our software development lifecycle.</p>
              <ul className="legal-list">
                <li>OWASP Secure Coding Practices</li>
                <li>TLS 1.3 Encryption in Transit &amp; AES-256 at Rest</li>
                <li>Role-Based Access Control (RBAC) &amp; JWT Verification</li>
                <li>Automated Dependency Scanning and Code Reviews</li>
                <li>Zero-Trust Network Configurations on AWS / GCP</li>
              </ul>
              <p className="legal-email"><Mail size={14} /> srivoratech9@gmail.com</p>
            </div>
          )}
        </div>

        {/* Copyright & IP */}
        <div className={`legal-accordion ${activeLegal === 'copyright' ? 'open' : ''}`}>
          <button className="legal-accordion-btn" onClick={() => toggleLegal('copyright')}>
            <span className="legal-icon-label">
              <Copyright size={16} /> Copyright &amp; Intellectual Property
            </span>
            <span className="legal-toggle">{activeLegal === 'copyright' ? '−' : '+'}</span>
          </button>
          {activeLegal === 'copyright' && (
            <div className="legal-content">
              <p>© 2026 SriVoraTech Technologies. All Rights Reserved.</p>
              <p>All content, source code, software, designs, graphics, logos, trademarks, and documentation on this website are the intellectual property of SriVoraTech unless otherwise stated.</p>
              <p>Custom client software developed under formal contract includes full source code and IP rights transfer upon project completion.</p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom container">
        <p className="footer-copyright">© 2026 SriVoraTech Technologies. All Rights Reserved.</p>
        <p className="footer-made-with">
          Designed &amp; Developed with <Heart size={13} className="heart-icon" /> by SriVoraTech
        </p>
        <div className="footer-legal">
          <button
            className="footer-legal-link"
            onClick={() => onNavigate ? onNavigate('/privacy') : window.location.href = '/privacy'}
          >
            Privacy Policy
          </button>
          <button
            className="footer-legal-link"
            onClick={() => onNavigate ? onNavigate('/terms') : window.location.href = '/terms'}
          >
            Terms of Service
          </button>
          <button
            className="footer-legal-link"
            onClick={() => onNavigate ? onNavigate('/client-portal') : window.location.href = '/client-portal'}
          >
            Client Portal
          </button>
        </div>
      </div>
    </footer>
  )
}
