import { useState, useEffect, useRef, lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProjectCards from './components/ProjectCards'
import QuoteBlock from './components/QuoteBlock'
import Challenges from './components/Challenges'
import WhyChoose from './components/WhyChoose'
import Leadership from './components/Leadership'
import OnboardingSteps from './components/OnboardingSteps'
import Services from './components/Services'
import ProjectEstimator from './components/ProjectEstimator'
import TechStack from './components/TechStack'
import WorkShowcase from './components/WorkShowcase'
import TrustTicker from './components/TrustTicker'
import Achievements from './components/Achievements'
import FAQ from './components/FAQ'
import WebsiteRating from './components/WebsiteRating'
import Contact from './components/Contact'
import PreFooterCTA from './components/PreFooterCTA'
import Footer from './components/Footer'
import FloatingActions from './components/FloatingActions'
import AIChatWidget from './components/AIChatWidget'
import WelcomeSplash from './components/WelcomeSplash'
import SEO from './components/SEO'
import Analytics from './components/Analytics'

// Lazy-loaded routes for code-splitting and performance
const CareersPage = lazy(() => import('./components/CareersPage'))
const SEODashboard = lazy(() => import('./components/SEODashboard'))
const AboutPage = lazy(() => import('./components/AboutPage'))
const ServiceDetailPage = lazy(() => import('./components/ServiceDetailPage'))
const BlogHub = lazy(() => import('./components/BlogHub'))
const BlogPost = lazy(() => import('./components/BlogPost'))
const CaseStudiesPage = lazy(() => import('./components/CaseStudiesPage'))
const PricingPage = lazy(() => import('./components/PricingPage'))
const HTMLSitemap = lazy(() => import('./components/HTMLSitemap'))
const FounderPage = lazy(() => import('./components/FounderPage'))
const PrivacyPolicyPage = lazy(() => import('./components/PrivacyPolicyPage'))
const TermsPage = lazy(() => import('./components/TermsPage'))
const ClientPortalPage = lazy(() => import('./components/ClientPortalPage'))
const NotFoundPage = lazy(() => import('./components/NotFoundPage'))

export default function App() {
  const glowRef = useRef(null)
  const [currentPath, setCurrentPath] = useState(window.location.pathname)
  const [currentHash, setCurrentHash] = useState(window.location.hash)
  const [showSplash, setShowSplash] = useState(true)
  const [selectedPostSlug, setSelectedPostSlug] = useState(null)

  const navigate = (path) => {
    if (path.startsWith('/#') || (path.startsWith('#') && currentPath !== '/')) {
      const hash = path.replace('/', '')
      window.history.pushState({}, '', `/${hash}`)
      setCurrentPath('/')
      setCurrentHash(hash)
      setSelectedPostSlug(null)
      setTimeout(() => {
        const el = document.getElementById(hash.replace('#', ''))
        if (el) el.scrollIntoView({ behavior: 'smooth' })
        else window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 50)
      return
    }

    let target = path.startsWith('/') ? path : `/${path}`
    window.history.pushState({}, '', target)
    setCurrentPath(target)
    setCurrentHash('')
    setSelectedPostSlug(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname)
      setCurrentHash(window.location.hash)
    }

    window.addEventListener('popstate', handlePopState)
    window.addEventListener('hashchange', handlePopState)
    return () => {
      window.removeEventListener('popstate', handlePopState)
      window.removeEventListener('hashchange', handlePopState)
    }
  }, [])

  // Auto-scroll for section anchor aliases (/services -> #services, /contact -> #contact)
  useEffect(() => {
    if (currentPath === '/services') {
      setTimeout(() => {
        const el = document.getElementById('services')
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else if (currentPath === '/contact') {
      setTimeout(() => {
        const el = document.getElementById('contact')
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }, [currentPath])

  useEffect(() => {
    const glow = glowRef.current
    let animFrame

    const handleMouseMove = (e) => {
      if (glow) {
        if (animFrame) cancelAnimationFrame(animFrame)
        animFrame = requestAnimationFrame(() => {
          glow.style.left = e.clientX + 'px'
          glow.style.top = e.clientY + 'px'
          glow.classList.add('active')
        })
      }

      const card = e.target.closest(
        '.challenge-card, .service-card, .why-card, .leader-card, .team-discipline-card, .work-card, .achievement-card, .onboarding-step, .faq-item, .project-card, .spotlight-card, .estimator-card, .rating-card'
      )
      if (card) {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const centerX = rect.width / 2
        const centerY = rect.height / 2
        const tiltX = ((y - centerY) / centerY) * -4
        const tiltY = ((x - centerX) / centerX) * 4

        card.style.setProperty('--mouse-x', `${x}px`)
        card.style.setProperty('--mouse-y', `${y}px`)
        card.style.setProperty('--tilt-x', `${tiltX.toFixed(2)}deg`)
        card.style.setProperty('--tilt-y', `${tiltY.toFixed(2)}deg`)
      }
    }

    const handleMouseOut = (e) => {
      const card = e.target.closest(
        '.challenge-card, .service-card, .why-card, .leader-card, .team-discipline-card, .work-card, .achievement-card, .onboarding-step, .faq-item, .project-card, .spotlight-card, .estimator-card, .rating-card'
      )
      if (card && !card.contains(e.relatedTarget)) {
        card.style.setProperty('--tilt-x', '0deg')
        card.style.setProperty('--tilt-y', '0deg')
      }
    }

    const handleMouseLeave = () => {
      if (glow) glow.classList.remove('active')
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseout', handleMouseOut)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseout', handleMouseOut)
      document.removeEventListener('mouseleave', handleMouseLeave)
      if (animFrame) cancelAnimationFrame(animFrame)
    }
  }, [])

  // Render Sub-pages cleanly with explicit 404 fallback
  const renderContent = () => {
    if (currentPath === '/careers' || currentHash === '#careers') {
      return <CareersPage onBack={() => navigate('/')} />
    }

    if (currentPath === '/privacy') {
      return <PrivacyPolicyPage onBack={() => navigate('/')} onNavigate={navigate} />
    }

    if (currentPath === '/terms') {
      return <TermsPage onBack={() => navigate('/')} onNavigate={navigate} />
    }

    if (currentPath === '/client-portal' || currentPath === '/tracker') {
      return <ClientPortalPage onBack={() => navigate('/')} onNavigate={navigate} />
    }

    if (currentPath === '/seo-dashboard') {
      return <SEODashboard />
    }

    if (currentPath === '/about') {
      return <AboutPage onNavigate={navigate} />
    }

    if (currentPath === '/founder') {
      return <FounderPage onNavigate={navigate} />
    }

    if (currentPath === '/pricing') {
      return <PricingPage />
    }

    if (currentPath === '/case-studies') {
      return <CaseStudiesPage />
    }

    if (currentPath === '/sitemap') {
      return <HTMLSitemap onNavigate={navigate} />
    }

    if (currentPath.startsWith('/services/')) {
      const slug = currentPath.replace('/services/', '')
      return <ServiceDetailPage serviceSlug={slug} onNavigate={navigate} />
    }

    if (currentPath === '/blog' || currentPath.startsWith('/blog/')) {
      if (selectedPostSlug || currentPath.length > 6) {
        const slug = selectedPostSlug || currentPath.replace('/blog/', '')
        return <BlogPost postSlug={slug} onBack={() => navigate('/blog')} />
      }
      return <BlogHub onSelectPost={(slug) => navigate(`/blog/${slug}`)} onNavigate={navigate} />
    }

    // Homepage view (also targets /services and /contact section scrolls)
    if (currentPath === '/' || currentPath === '' || currentPath === '/services' || currentPath === '/contact') {
      return (
        <main>
          <Hero />
          <TrustTicker />
          <ProjectCards />
          <QuoteBlock />
          <Challenges />
          <WhyChoose />
          <Leadership />
          <OnboardingSteps />
          <Services onNavigate={navigate} />
          <ProjectEstimator />
          <TechStack />
          <WorkShowcase />
          <Achievements />
          <FAQ />
          <WebsiteRating />
          <Contact />
          <PreFooterCTA />
        </main>
      )
    }

    // Explicit 404 Fallback for unknown routes
    return <NotFoundPage onNavigate={navigate} />
  }

  return (
    <div className="app">
      <SEO pathname={currentPath} />
      <Analytics />

      {/* Mouse tracker ambient light */}
      <div ref={glowRef} className="cursor-glow" />

      {/* Cinematic Welcome Splash */}
      {showSplash && <WelcomeSplash onComplete={() => setShowSplash(false)} />}

      <Navbar onNavigate={navigate} activePath={currentPath} />

      <Suspense fallback={<div className="page-loading-skeleton" />}>
        {renderContent()}
      </Suspense>

      <Footer onNavigate={navigate} />
      <FloatingActions onNavigate={navigate} />
      <AIChatWidget onNavigate={navigate} />
    </div>
  )
}
