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

export default function App() {
  const glowRef = useRef(null)
  const [currentPath, setCurrentPath] = useState(window.location.pathname)
  const [currentHash, setCurrentHash] = useState(window.location.hash)
  const [showSplash, setShowSplash] = useState(true)
  const [selectedPostSlug, setSelectedPostSlug] = useState(null)

  const navigate = (path) => {
    let target = path.startsWith('/') ? path : `/${path}`
    window.history.pushState({}, '', target)
    setCurrentPath(target)
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

  // Render Sub-pages cleanly
  const renderContent = () => {
    if (currentPath === '/careers' || currentHash === '#careers') {
      return <CareersPage onBack={() => navigate('/')} />
    }

    if (currentPath === '/seo-dashboard') {
      return <SEODashboard />
    }

    if (currentPath === '/about') {
      return <AboutPage onNavigate={navigate} />
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

    // Default Homepage view
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

  return (
    <div className="app">
      <SEO pathname={currentPath} />
      <Analytics gaId="G-MEASUREMENT_ID" gtmId="GTM-TAG_ID" />

      {/* Opening Splash Overlay */}
      {showSplash && currentPath === '/' && <WelcomeSplash onComplete={() => setShowSplash(false)} />}

      {/* Mouse-follow cursor glow */}
      <div ref={glowRef} className="cursor-glow" />

      <Navbar onNavigate={navigate} onOpenCareers={() => navigate('/careers')} />

      <Suspense fallback={
        <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}>
          Loading SriVoraTech...
        </div>
      }>
        {renderContent()}
      </Suspense>

      <Footer onNavigate={navigate} onOpenCareers={() => navigate('/careers')} />
      <FloatingActions />
      <AIChatWidget />
    </div>
  )
}
