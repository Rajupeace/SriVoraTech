import React from 'react'
import SEO from './SEO'
import { Link2, Globe, Server, FileText, Layout, Layers, ShieldCheck, Mail, Users, Scale } from 'lucide-react'

export default function HTMLSitemap({ onNavigate }) {
  const categories = [
    {
      title: 'Main Navigation Pages',
      icon: Layout,
      links: [
        { name: 'Home Page', path: '/' },
        { name: 'About SriVoraTech', path: '/about' },
        { name: 'Founder Profile (Badisa Srikanth)', path: '/founder' },
        { name: 'All Services', path: '/services' },
        { name: 'Case Studies & Works', path: '/case-studies' },
        { name: 'Pricing & Estimator', path: '/pricing' },
        { name: 'Careers & Open Roles', path: '/careers' },
        { name: 'Technical Blog', path: '/blog' },
        { name: 'Contact Us', path: '/contact' },
        { name: 'SEO Audit Dashboard', path: '/seo-dashboard' }
      ]
    },
    {
      title: 'Service Offerings',
      icon: Layers,
      links: [
        { name: 'Web Development (React & Next.js)', path: '/services/web-development' },
        { name: 'Mobile App Development (iOS & Android)', path: '/services/mobile-app-development' },
        { name: 'AI & LLM Solutions', path: '/services/ai-development' },
        { name: 'Custom Enterprise Software', path: '/services/custom-software' },
        { name: 'Cloud & DevOps Engineering', path: '/services/cloud-services' },
        { name: 'UI/UX Design Agency', path: '/services/ui-ux-design' },
        { name: 'Technical SEO Services', path: '/services/seo-services' }
      ]
    },
    {
      title: 'Legal & Client Hub',
      icon: Scale,
      links: [
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Terms of Service', path: '/terms' },
        { name: 'Client Portal & Milestone Tracker', path: '/client-portal' }
      ]
    },
    {
      title: 'LLM & Search Machine Index Files',
      icon: Server,
      links: [
        { name: 'XML Sitemap Index (sitemap.xml)', path: '/sitemap.xml', external: true },
        { name: 'Robots.txt Directives', path: '/robots.txt', external: true },
        { name: 'LLMs Summary (llms.txt)', path: '/llms.txt', external: true },
        { name: 'LLMs Full Architecture (llms-full.txt)', path: '/llms-full.txt', external: true }
      ]
    }
  ]

  const handleLink = (e, link) => {
    if (link.external) return
    e.preventDefault()
    if (onNavigate) {
      onNavigate(link.path)
    } else {
      window.location.href = link.path
    }
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '110px 24px 100px', color: 'var(--color-text-primary, #1e293b)' }}>
      <SEO pathname="/sitemap" breadcrumbs={[{ name: 'Home', url: '/' }, { name: 'HTML Sitemap', url: '/sitemap' }]} />

      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={{ fontSize: '2.8rem', fontWeight: '800', marginBottom: '12px', color: 'var(--color-text-heading, #0f172a)', letterSpacing: '-0.02em' }}>
          HTML Sitemap &amp; Directory
        </h1>
        <p style={{ color: 'var(--color-text-secondary, #475569)', fontSize: '1.1rem' }}>
          Comprehensive URL hierarchy and navigation map of SriVoraTech
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
        {categories.map((cat, idx) => {
          const Icon = cat.icon
          return (
            <div key={idx} style={{ background: '#ffffff', border: '1px solid var(--color-gray-200, #e2e8f0)', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 20px rgba(15, 23, 42, 0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(0, 103, 244, 0.1)', color: '#0067f4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={18} />
                </div>
                <h2 style={{ fontSize: '1.15rem', fontWeight: '700', margin: 0, color: 'var(--color-text-heading, #0f172a)' }}>{cat.title}</h2>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {cat.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <a
                      href={link.path}
                      onClick={(e) => handleLink(e, link)}
                      target={link.external ? '_blank' : '_self'}
                      rel={link.external ? 'noopener noreferrer' : ''}
                      style={{ color: 'var(--color-text-secondary, #475569)', textDecoration: 'none', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px', transition: 'color 150ms ease', fontWeight: '500' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#0067f4'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary, #475569)'}
                    >
                      <Link2 size={13} style={{ flexShrink: 0, color: '#0067f4' }} />
                      <span>{link.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}
