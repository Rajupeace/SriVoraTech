import { useState } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { Mail, Phone, MapPin, Send, ArrowRight, Shield, FileText, Scale, ExternalLink, CheckCircle2, Sparkles, Linkedin, Info } from 'lucide-react'
import { COMPANY_CONFIG } from '../config/company'
import './Footer.css'

const footerLinks = [
  { name: 'About Us', href: '/about', isRoute: true },
  { name: 'Services', href: '/services', isRoute: true },
  { name: 'Signature Products', href: '#our-works', isRoute: false },
  { name: 'Case Studies', href: '/case-studies', isRoute: true },
  { name: 'Tech Stack', href: '#tech-stack', isRoute: false },
  { name: 'Cost Estimator', href: '#estimator', isRoute: false },
  { name: 'Client Portal', href: '/client-portal', isRoute: true },
  { name: 'Engineering Careers', href: '/careers', isRoute: true },
  { name: 'Technical Blog', href: '/blog', isRoute: true },
  { name: 'Privacy Policy', href: '/privacy', isRoute: true },
  { name: 'Terms of Service', href: '/terms', isRoute: true },
  { name: 'HTML Sitemap', href: '/sitemap', isRoute: true },
]

export default function Footer({ onNavigate }) {
  const [ref, isVisible] = useScrollAnimation()
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

  const toggleLegal = (section) => {
    setActiveLegal(activeLegal === section ? null : section)
  }

  return (
    <footer ref={ref} className={`footer animate-on-scroll ${isVisible ? 'visible' : ''}`}>
      <div className="footer-bg-logo">
        <span className="footer-bg-text">SriVoraTech</span>
      </div>

      <div className="footer-top container">
        {/* Column 1: Brand & Contact */}
        <div className="footer-col footer-brand">
          <div className="footer-logo">
            <span className="logo-text">Sri<span className="gradient-text">Vora</span>Tech</span>
          </div>
          <p className="footer-tagline">
            Next-Gen Software Engineering, Applied AI &amp; Cloud Platform Solutions.
          </p>

          <div className="footer-contact-info">
            <a href={`mailto:${COMPANY_CONFIG.email.support}`} className="footer-contact-link">
              <Mail size={15} />
              <span>{COMPANY_CONFIG.email.support}</span>
            </a>
            <a href={`tel:${COMPANY_CONFIG.phone.international}`} className="footer-contact-link">
              <Phone size={15} />
              <span>{COMPANY_CONFIG.phone.display}</span>
            </a>
            <div className="footer-contact-item">
              <MapPin size={15} />
              <span>{COMPANY_CONFIG.location.addressDisplay}</span>
            </div>
          </div>
        </div>

        {/* Column 2: Navigation Links */}
        <div className="footer-col footer-links-col">
          <h4 className="footer-heading">Quick Navigation</h4>
          <div className="footer-nav-grid">
            <div className="footer-nav-col">
              {footerLinks.slice(0, 6).map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link)}
                  className="footer-nav-link"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <div className="footer-nav-col">
              {footerLinks.slice(6).map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link)}
                  className="footer-nav-link"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Column 3: Newsletter (Honest Status - Coming Soon) */}
        <div className="footer-col footer-newsletter">
          <h4 className="footer-heading">Engineering Digest</h4>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '3px 10px', background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.25)', borderRadius: '999px', color: '#38bdf8', fontSize: '11px', fontWeight: '700', marginBottom: '10px' }}>
            <Sparkles size={11} /> Publication Launching Q4 2026
          </div>
          <p className="footer-newsletter-desc">
            We are preparing our quarterly technical publication covering cloud architecture teardowns, distributed systems, and applied AI workflows.
          </p>
          <div style={{ marginTop: '12px' }}>
            <a
              href={COMPANY_CONFIG.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary-light"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', fontSize: '13px' }}
            >
              <Linkedin size={15} /> Follow Us on LinkedIn
            </a>
          </div>
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
                <li>OWASP Security Guidelines &amp; Input Validation</li>
                <li>Role-Based Access Control (RBAC) via Secure JWT</li>
                <li>Data Protection in Transit via TLS / HTTPS</li>
                <li>Secure Secrets Management &amp; Sanitized Environment Variables</li>
              </ul>
            </div>
          )}
        </div>

        {/* Intellectual Property */}
        <div className={`legal-accordion ${activeLegal === 'ip' ? 'open' : ''}`}>
          <button className="legal-accordion-btn" onClick={() => toggleLegal('ip')}>
            <span className="legal-icon-label">
              <FileText size={16} /> Intellectual Property &amp; Code Ownership
            </span>
            <span className="legal-toggle">{activeLegal === 'ip' ? '−' : '+'}</span>
          </button>
          {activeLegal === 'ip' && (
            <div className="legal-content">
              <p>Upon final sprint completion and invoice settlement, 100% of all custom source code, documentation, schemas, and cloud deployment credentials are unconditionally transferred to your organization.</p>
            </div>
          )}
        </div>
      </div>

      {/* ── Footer Bottom Row ── */}
      <div className="footer-bottom container">
        <div className="footer-copyright">
          © {COMPANY_CONFIG.copyrightYear} {COMPANY_CONFIG.legalName}. All rights reserved.
        </div>
        <div className="footer-bottom-links">
          <a href="/privacy" onClick={(e) => handleLinkClick(e, { href: '/privacy', isRoute: true })}>Privacy Policy</a>
          <span className="footer-dot">•</span>
          <a href="/terms" onClick={(e) => handleLinkClick(e, { href: '/terms', isRoute: true })}>Terms of Service</a>
          <span className="footer-dot">•</span>
          <a href="/sitemap" onClick={(e) => handleLinkClick(e, { href: '/sitemap', isRoute: true })}>Sitemap</a>
        </div>
      </div>
    </footer>
  )
}
