import React from 'react'
import SEO from './SEO'
import StructuredData from './StructuredData'
import { CheckCircle2, ArrowRight, ShieldCheck, Zap, Code2, Cpu, Globe, Smartphone, Layers } from 'lucide-react'
import './Services.css'


const SERVICE_DATA = {
  'web-development': {
    title: 'Web Development Company | React & Next.js Experts',
    h1: 'Next-Gen Web Development Services',
    subtitle: 'We craft high-performance, SEO-optimized web applications with React, Next.js, Node.js, and modern CSS/Tailwind for startups and enterprises.',
    icon: Code2,
    features: [
      'Custom React.js & Next.js 15 App Architecture',
      'Server-Side Rendering (SSR) & Static Generation (SSG)',
      '100/100 Google Lighthouse Core Web Vitals Optimization',
      'Headless CMS & E-Commerce Integration (Shopify, Strapi)',
      'Enterprise Micro-Frontends & API First Engineering',
      'Progressive Web Apps (PWA) with Offline Capabilities'
    ],
    techStack: ['React', 'Next.js', 'Node.js', 'TypeScript', 'TailwindCSS', 'Express', 'MongoDB'],
    deliverables: 'Production-ready web application in 2-4 weeks with source code IP transfer.'
  },
  'mobile-app-development': {
    title: 'Mobile App Development Company | iOS & Android Apps',
    h1: 'Cross-Platform & Native Mobile App Development',
    subtitle: 'Build sleek, scalable iOS and Android applications engineered with React Native, Flutter, and cloud-native backends.',
    icon: Smartphone,

    features: [
      'React Native & Flutter Cross-Platform Development',
      'Native iOS (Swift) & Android (Kotlin) Optimization',
      'Real-Time Push Notifications & Background Sync',
      'Offline-First Database Sync & Biometric Auth',
      'Apple App Store & Google Play Store Publishing',
      'AI Chatbot & Voice Assistant Integration'
    ],
    techStack: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'GraphQL', 'AWS'],
    deliverables: 'Native App Store & Play Store ready builds with 100% code ownership.'
  },
  'ai-development': {
    title: 'AI Development Company & Custom AI Automation',
    h1: 'Enterprise AI Engineering & LLM Solutions',
    subtitle: 'Empower your operations with custom AI agents, RAG knowledge bases, LLM integrations, and machine learning pipelines.',
    icon: Cpu,
    features: [
      'Custom LLM Fine-Tuning & Prompt Engineering',
      'RAG (Retrieval-Augmented Generation) Vector Databases',
      'Autonomous AI Chatbots & Customer Support Agents',
      'Computer Vision & Automated Document Extraction',
      'Predictive Analytics & Recommendation Engines',
      'AI SOAP Note Assistants & Clinical Workflow Tools'
    ],
    techStack: ['Python', 'PyTorch', 'OpenAI API', 'LangChain', 'Pinecone', 'FastAPI', 'Docker'],
    deliverables: 'Trained AI agents & secure backend APIs with zero vendor lock-in.'
  },
  'custom-software': {
    title: 'Custom Software Development Company | Enterprise Solutions',
    h1: 'Enterprise Software & SaaS Product Engineering',
    subtitle: 'From complex ERP systems to cloud CRM platforms, SriVoraTech builds bespoke software tailored to your workflow.',
    icon: Layers,
    features: [
      'Tailor-Made Enterprise ERP & CRM Systems',
      'Multi-Tenant SaaS Architecture Design',
      'High-Throughput Microservices & GraphQL APIs',
      'Legacy System Modernization & Cloud Migration',
      'Automated Testing & CI/CD Pipeline Setup',
      'HIPAA & OWASP Security Compliant Development'
    ],
    techStack: ['Node.js', 'Python', 'React', 'PostgreSQL', 'Docker', 'Kubernetes', 'AWS'],
    deliverables: 'Scalable enterprise architecture built to handle millions of transactions.'
  },
  'cloud-services': {
    title: 'Cloud Solutions & DevOps Engineering',
    h1: 'Cloud Infrastructure & DevOps Solutions',
    subtitle: 'Deploy, scale, and secure your applications on AWS, Azure, and GCP with zero downtime and automated CI/CD.',
    icon: Globe,
    features: [
      'AWS, Azure & Google Cloud Platform Architecture',
      'Infrastructure as Code (Terraform & CloudFormation)',
      'Docker Containerization & Kubernetes Orchestration',
      'Zero-Downtime Deployment & Auto-Scaling',
      '24/7 Cloud Monitoring, Logging & Alerting',
      'Disaster Recovery & High-Availability Configurations'
    ],
    techStack: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Nginx'],
    deliverables: 'Fully automated, high-availability cloud infrastructure.'
  },
  'ui-ux-design': {
    title: 'UI/UX Design Agency | Product Design & Wireframing',
    h1: 'User-Centric UI/UX Design & Branding',
    subtitle: 'We design intuitive visual interfaces, interactive wireframes, and design systems that maximize user engagement.',
    icon: Zap,
    features: [
      'User Research & Customer Journey Mapping',
      'Figma Interactive Wireframing & Prototyping',
      'Scalable Design Systems & Component Libraries',
      'Web & Mobile UI Visual Refresh',
      'Conversion Rate Optimization (CRO) Interfaces',
      'Accessibility (WCAG 2.1 AAA) Compliant Styling'
    ],
    techStack: ['Figma', 'Adobe CC', 'Principle', 'Design Systems', 'CSS3', 'Tailwind'],
    deliverables: 'Complete Figma design specs & developer-ready assets.'
  },
  'seo-services': {
    title: 'SEO Services & Technical SEO Agency',
    h1: '100/100 Google Lighthouse & Technical SEO',
    subtitle: 'Outrank competitors with technical SEO audits, Core Web Vitals optimization, schema markup, and high-converting content.',
    icon: Zap,
    features: [
      'Complete Technical SEO & Crawlability Audits',
      'Core Web Vitals Speed Tuning (LCP, INP, CLS)',
      'Rich JSON-LD Schema Markup Generation',
      'Keyword Research & EEAT Content Optimization',
      'Google Search Console & Bing Webmaster Verification',
      'Local Business SEO & Multi-Region Hreflang Targeting'
    ],
    techStack: ['Google Search Console', 'Lighthouse', 'Schema.org', 'GA4', 'Ahrefs', 'Semrush'],
    deliverables: '100/100 Lighthouse score & verified Search Console indexing.'
  }
}

export default function ServiceDetailPage({ serviceSlug = 'web-development', onNavigate }) {
  const service = SERVICE_DATA[serviceSlug] || SERVICE_DATA['web-development']

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.subtitle,
    provider: {
      '@type': 'Organization',
      name: 'SriVoraTech',
      url: 'https://srivoratech.in'
    },
    areaServed: ['India', 'United States', 'United Kingdom', 'Canada', 'Australia', 'United Arab Emirates'],
    url: `https://srivoratech.in/services/${serviceSlug}`
  }

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: service.title, url: `/services/${serviceSlug}` }
  ]

  return (
    <div className="service-detail-page">
      <SEO pathname={`/services/${serviceSlug}`} breadcrumbs={breadcrumbs} schema={serviceSchema} />

      <section className="service-hero-section">
        <div className="container">
          <div className="service-hero-badge">
            <ShieldCheck size={16} /> Enterprise Grade Solution
          </div>
          <h1>{service.h1}</h1>
          <p className="service-hero-sub">{service.subtitle}</p>

          <div className="service-cta-row">
            <button className="btn-primary" onClick={() => onNavigate('contact')}>
              Get Started <ArrowRight size={16} />
            </button>
            <button className="btn-secondary" onClick={() => onNavigate('pricing')}>
              View Pricing &amp; Estimator
            </button>
          </div>
        </div>
      </section>

      <section className="service-features-section">
        <div className="container">
          <h2>Key Capabilities &amp; Deliverables</h2>
          <div className="features-grid">
            {service.features.map((feat, idx) => (
              <div key={idx} className="feature-card spotlight-card">
                <CheckCircle2 size={20} className="check-icon" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="service-tech-section">
        <div className="container">
          <h2>Technologies We Leverage</h2>
          <div className="tech-tags">
            {service.techStack.map((tech, idx) => (
              <span key={idx} className="tech-pill">{tech}</span>
            ))}
          </div>
          <div className="deliverable-box">
            <strong>Guaranteed Deliverable:</strong> {service.deliverables}
          </div>
        </div>
      </section>
    </div>
  )
}
