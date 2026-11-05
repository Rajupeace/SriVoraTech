import SEO from './SEO'
import { ArrowLeft, Home, Layers, Briefcase, Mail } from 'lucide-react'

export default function NotFoundPage({ onNavigate }) {
  return (
    <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 24px', color: '#f8fafc', textAlign: 'center' }}>
      <SEO
        pathname="/404"
        title="404 - Page Not Found | SriVoraTech"
        description="The page you are looking for does not exist or has been moved."
        noindex={true}
      />

      <div style={{ maxWidth: '580px', margin: '0 auto' }}>
        <div style={{ fontSize: '5rem', fontWeight: '900', letterSpacing: '-0.04em', background: 'linear-gradient(135deg, #0067f4, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1 }}>
          404
        </div>

        <h1 style={{ fontSize: '24px', fontWeight: '700', margin: '16px 0 12px', color: '#fff' }}>
          Page Not Found
        </h1>

        <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: 1.6, marginBottom: '32px' }}>
          The requested URL does not match an active page on SriVoraTech. You can return to our homepage or explore our engineering services below.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
          <button
            onClick={() => onNavigate('/')}
            className="btn-primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', fontSize: '14px' }}
          >
            <Home size={16} /> Return to Homepage
          </button>
          <button
            onClick={() => onNavigate('/services')}
            className="btn-secondary-light"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', fontSize: '14px' }}
          >
            <Layers size={16} /> Explore Services
          </button>
          <button
            onClick={() => onNavigate('/#contact')}
            className="btn-secondary-light"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', fontSize: '14px' }}
          >
            <Mail size={16} /> Contact Us
          </button>
        </div>
      </div>
    </div>
  )
}

