import { useState, useEffect, useRef } from 'react'
import { Menu, X, ArrowRight, Zap, ChevronDown } from 'lucide-react'
import './Navbar.css'

const primaryNavLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Our Work', href: '#our-works' },
  { label: 'Tech Stack', href: '#tech-stack' },
  { label: 'Estimator', href: '#estimator' },
  {
    label: 'Company',
    isDropdown: true,
    children: [
      { label: 'About Us', href: '/about', isRoute: true },
      { label: 'Founder Profile', href: '/founder', isRoute: true },
      { label: 'Leadership', href: '#leadership' },
    ]
  },
  { label: 'Portal', href: '/client-portal', isRoute: true },
  { label: 'Blog', href: '/blog', isRoute: true },
  { label: 'Careers', href: '/careers', isRoute: true },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar({ onNavigate }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const dropdownRef = useRef(null)

  const currentPath = typeof window !== 'undefined' ? window.location.pathname : ''

  const isLinkActive = (link) => {
    if (link.isRoute) {
      if (link.href === '/blog' && currentPath.startsWith('/blog')) return true
      return currentPath === link.href
    }
    return activeSection === link.href.substring(1)
  }

  const handleLinkClick = (e, link) => {
    if (link.isRoute) {
      e.preventDefault()
      if (onNavigate) {
        onNavigate(link.href)
      } else {
        window.location.href = link.href
      }
      setMobileOpen(false)
      setCompanyDropdownOpen(false)
    } else if (window.location.pathname !== '/') {
      e.preventDefault()
      if (onNavigate) {
        onNavigate(`/${link.href}`)
      } else {
        window.location.href = `/${link.href}`
      }
      setMobileOpen(false)
      setCompanyDropdownOpen(false)
    } else {
      setMobileOpen(false)
      setCompanyDropdownOpen(false)
    }
  }

  const handleLogoClick = (e) => {
    e.preventDefault()
    if (onNavigate) {
      onNavigate('/')
    } else {
      window.location.href = '/'
    }
    setMobileOpen(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      // Active section scroll spy
      const sections = ['services', 'our-works', 'tech-stack', 'estimator', 'leadership', 'contact']
      let matched = false
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 140 && rect.bottom >= 140) {
            setActiveSection(sectionId)
            matched = true
            break
          }
        }
      }
      if (!matched) {
        setActiveSection('')
      }
    }

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setCompanyDropdownOpen(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        {/* 1. Brand Logo Area (Left) */}
        <a className="header-logo" href="/" onClick={handleLogoClick} aria-label="SriVoraTech Home">
          <div className="logo-badge">
            <Zap size={16} className="logo-icon" />
          </div>
          <div className="logo-text">
            SriVora<span className="logo-accent">Tech</span>
          </div>
        </a>

        {/* 2. Main Navigation Links (Center) */}
        <nav className="header-nav" aria-label="Main Navigation">
          {primaryNavLinks.map((link) => {
            if (link.isDropdown) {
              const isAnyChildActive = link.children.some(child => isLinkActive(child))
              return (
                <div
                  key={link.label}
                  className="header-dropdown-wrap"
                  ref={dropdownRef}
                  onMouseEnter={() => setCompanyDropdownOpen(true)}
                  onMouseLeave={() => setCompanyDropdownOpen(false)}
                >
                  <button
                    className={`header-nav-link header-dropdown-btn ${isAnyChildActive ? 'active' : ''}`}
                    onClick={() => setCompanyDropdownOpen(!companyDropdownOpen)}
                    aria-expanded={companyDropdownOpen}
                    aria-haspopup="true"
                  >
                    <span>{link.label}</span>
                    <ChevronDown size={13} className={`dropdown-caret ${companyDropdownOpen ? 'open' : ''}`} />
                    {isAnyChildActive && <span className="nav-active-dot" />}
                  </button>

                  {companyDropdownOpen && (
                    <div className="header-dropdown-panel animate-pop">
                      {link.children.map((child) => {
                        const isChildActive = isLinkActive(child)
                        return (
                          <a
                            key={child.href}
                            className={`dropdown-menu-item ${isChildActive ? 'active' : ''}`}
                            href={child.href}
                            onClick={(e) => handleLinkClick(e, child)}
                          >
                            {child.label}
                          </a>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            }

            const isActive = isLinkActive(link)
            return (
              <a
                key={link.href}
                className={`header-nav-link ${isActive ? 'active' : ''}`}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link)}
              >
                {link.label}
                {isActive && <span className="nav-active-dot" />}
              </a>
            )
          })}
        </nav>

        {/* 3. Primary Action & Mobile Menu Toggle (Right) */}
        <div className="header-actions">
          <a
            href="#contact"
            className="btn-primary header-cta-btn"
            onClick={(e) => {
              if (window.location.pathname !== '/') {
                e.preventDefault()
                onNavigate('/#contact')
              }
            }}
          >
            <span className="pulse-green-dot" /> Book a Call
            <span className="btn-icon">
              <ArrowRight size={15} style={{ transform: 'rotate(-45deg)' }} />
            </span>
          </a>

          <button
            className="header-hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Drawer */}
      {mobileOpen && (
        <div className="header-mobile-drawer animate-pop">
          <a className="mobile-drawer-link" href="#services" onClick={(e) => handleLinkClick(e, { href: '#services' })}>
            Services
          </a>
          <a className="mobile-drawer-link" href="#our-works" onClick={(e) => handleLinkClick(e, { href: '#our-works' })}>
            Our Work
          </a>
          <a className="mobile-drawer-link" href="#tech-stack" onClick={(e) => handleLinkClick(e, { href: '#tech-stack' })}>
            Tech Stack
          </a>
          <a className="mobile-drawer-link" href="#estimator" onClick={(e) => handleLinkClick(e, { href: '#estimator' })}>
            Estimator
          </a>
          <div className="mobile-section-heading">Company</div>
          <a className="mobile-drawer-link mobile-sub-link" href="/about" onClick={(e) => handleLinkClick(e, { href: '/about', isRoute: true })}>
            About SriVoraTech
          </a>
          <a className="mobile-drawer-link mobile-sub-link" href="/founder" onClick={(e) => handleLinkClick(e, { href: '/founder', isRoute: true })}>
            Founder Profile
          </a>
          <a className="mobile-drawer-link mobile-sub-link" href="#leadership" onClick={(e) => handleLinkClick(e, { href: '#leadership' })}>
            Leadership Team
          </a>
          <div className="mobile-section-heading">Platform &amp; Insights</div>
          <a className={`mobile-drawer-link ${currentPath === '/client-portal' ? 'active' : ''}`} href="/client-portal" onClick={(e) => handleLinkClick(e, { href: '/client-portal', isRoute: true })}>
            Client Portal (Preview)
          </a>
          <a className={`mobile-drawer-link ${currentPath === '/blog' ? 'active' : ''}`} href="/blog" onClick={(e) => handleLinkClick(e, { href: '/blog', isRoute: true })}>
            Technical Blog
          </a>
          <a className={`mobile-drawer-link ${currentPath === '/careers' ? 'active' : ''}`} href="/careers" onClick={(e) => handleLinkClick(e, { href: '/careers', isRoute: true })}>
            Careers &amp; Open Roles
          </a>
          <a className="mobile-drawer-link" href="#contact" onClick={(e) => handleLinkClick(e, { href: '#contact' })}>
            Contact Us
          </a>

          <a
            href="#contact"
            className="btn-primary mobile-cta-btn"
            onClick={(e) => {
              setMobileOpen(false)
              if (window.location.pathname !== '/') {
                e.preventDefault()
                onNavigate('/#contact')
              }
            }}
          >
            <span className="pulse-green-dot" /> Book a Discovery Call
            <span className="btn-icon">
              <ArrowRight size={15} style={{ transform: 'rotate(-45deg)' }} />
            </span>
          </a>
        </div>
      )}
    </header>
  )
}
