import React from 'react'
import SEO from './SEO'
import { Link2, Globe, Server, FileText, Layout, Layers, ShieldCheck, Mail, Users } from 'lucide-react'

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

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 24px 100px', color: '#f8fafc' }}>
      <SEO pathname="/sitemap" breadcrumbs={[{ name: 'Home', url: '/' }, { name: 'HTML Sitemap', url: '/sitemap' }]} />

      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={{ fontSize: '2.6rem', fontWeight: '800', marginBottom: '12px' }}>HTML Sitemap &amp; Directory</h1>
        <p style={{ color: '#94a3b8', fontSize: '1.05rem' }}>Comprehensive URL hierarchy and navigation map of SriVoraTech</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
        {categories.map((cat, idx) => {
          const Icon = cat.icon
          return (
            <div key={idx} style={{ padding: '24px', background: 'rgba(15,23,42,0.7)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Icon size={18} style={{ color: '#10b981' }} /> {cat.title}
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {cat.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    {link.external ? (
                      <a href={link.path} target="_blank" rel="noopener noreferrer" style={{ color: '#38bdf8', textDecoration: 'none', fontSize: '0.92rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <Link2 size={14} /> {link.name}
                      </a>
                    ) : (
                      <a
                        href={link.path}
                        onClick={(e) => {
                          e.preventDefault()
                          onNavigate(link.path.replace('/', ''))
                        }}
                        style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '0.92rem', cursor: 'pointer' }}
                      >
                        • {link.name}
                      </a>
                    )}
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
