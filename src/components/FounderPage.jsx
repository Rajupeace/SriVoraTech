import { useState } from 'react'
import SEO from './SEO'
import StructuredData from './StructuredData'
import { generateFounderPageSchemas } from '../lib/seo'
import srikanthPhoto from '../assets/badisa_srikanth.jpg'
import {
  Sparkles,
  Award,
  ShieldCheck,
  CheckCircle2,
  Linkedin,
  Mail,
  ArrowRight,
  ChevronRight,
  Cpu,
  Code2,
  Smartphone,
  Cloud,
  Layout,
  Zap,
  Target,
  Compass,
  Users,
  MessageSquare,
  HelpCircle,
  PhoneCall,
  Globe,
  Briefcase,
  Building2,
  Check
} from 'lucide-react'
import './FounderPage.css'

export default function FounderPage({ onNavigate }) {
  const [openFaq, setOpenFaq] = useState(null)
  const schemas = generateFounderPageSchemas()

  const expertiseList = [
    {
      title: 'Artificial Intelligence',
      desc: 'Developing LLM-powered agents, custom RAG pipelines, NLP models, and automated intelligent workflows for enterprise growth.',
      icon: Cpu,
      color: '#38bdf8'
    },
    {
      title: 'Software Engineering',
      desc: 'Building high-performance, fault-tolerant enterprise software systems, clean microservices, and high-load database architectures.',
      icon: Code2,
      color: '#0067f4'
    },
    {
      title: 'Web Development',
      desc: 'Engineering ultra-fast, responsive web applications using React.js, Next.js, Node.js, and modern serverless infrastructure.',
      icon: Globe,
      color: '#8b5cf6'
    },
    {
      title: 'Mobile App Development',
      desc: 'Designing cross-platform native mobile applications for iOS and Android using React Native, Flutter, and cloud API backends.',
      icon: Smartphone,
      color: '#ec4899'
    },
    {
      title: 'Cloud Computing',
      desc: 'Architecting zero-downtime AWS cloud infrastructure, CI/CD deployment pipelines, containerization, and automated security monitoring.',
      icon: Cloud,
      color: '#10b981'
    },
    {
      title: 'UI/UX Design',
      desc: 'Crafting user-centric interfaces, interactive wireframes, design systems, and conversion-optimized web and mobile app experiences.',
      icon: Layout,
      color: '#f59e0b'
    },
    {
      title: 'Business Automation',
      desc: 'Streamlining complex operational processes, ERP integrations, CRM pipelines, and intelligent automated workflows.',
      icon: Zap,
      color: '#06b6d4'
    },
    {
      title: 'Digital Transformation',
      desc: 'Guiding startups and enterprises through modern technical roadmaps, legacy modernization, and scalable digital shifts.',
      icon: Compass,
      color: '#a855f7'
    }
  ]

  const faqs = [
    {
      q: 'Who is Badisa Srikanth?',
      a: 'Badisa Srikanth is the Founder and Chief Executive Officer (CEO) of SriVoraTech (srivoratech.in), a next-generation IT services and AI solutions company based in Hyderabad, India.'
    },
    {
      q: 'What is Badisa Srikanth\'s role at SriVoraTech?',
      a: 'As Founder & CEO, Badisa Srikanth leads the company\'s vision, product strategy, technical architecture, and global business growth. He ensures high-quality delivery across custom software, AI solutions, web apps, and mobile platforms.'
    },
    {
      q: 'What are Badisa Srikanth\'s core areas of technical expertise?',
      a: 'His expertise includes Artificial Intelligence, Software Engineering, Web Development (React.js, Next.js, Node.js), Mobile App Development, Cloud Computing (AWS), UI/UX Design, Business Automation, and Digital Transformation.'
    },
    {
      q: 'What is Badisa Srikanth\'s vision for SriVoraTech?',
      a: 'His vision is to build SriVoraTech into a globally trusted technology company delivering innovative, scalable, and high-performance digital solutions for startups and enterprises worldwide.'
    },
    {
      q: 'How can businesses contact Badisa Srikanth and SriVoraTech for projects?',
      a: 'Businesses can connect with Badisa Srikanth via his official LinkedIn profile (linkedin.com/in/srikanthbadisa), email him at srikanthbsqy@gmail.com, or schedule a consultation call directly at srivoratech.in/#contact.'
    }
  ]

  const handleNav = (path) => {
    if (onNavigate) {
      onNavigate(path)
    } else {
      window.location.href = path
    }
  }

  return (
    <div className="founder-page-container">
      {/* Dynamic SEO Tags & Schema */}
      <SEO pathname="/founder" />
      {schemas.map((s, idx) => (
        <StructuredData key={idx} data={s} />
      ))}

      {/* Hero Header Section */}
      <section className="founder-hero-section">
        <div className="container">
          {/* Breadcrumbs Navigation */}
          <nav className="founder-breadcrumb" aria-label="Breadcrumb">
            <button type="button" onClick={() => handleNav('/')} className="breadcrumb-link">Home</button>
            <ChevronRight size={14} className="breadcrumb-sep" />
            <button type="button" onClick={() => handleNav('/about')} className="breadcrumb-link">About Us</button>
            <ChevronRight size={14} className="breadcrumb-sep" />
            <span className="breadcrumb-current">Founder Profile</span>
          </nav>

          <div className="founder-hero-grid">
            {/* Left Image Column */}
            <div className="founder-image-col">
              <div className="founder-image-card glass-card">
                <div className="founder-image-wrapper">
                  <img
                    src={srikanthPhoto}
                    alt="Badisa Srikanth (Srikanth Badisa) - Founder & CEO of SriVoraTech"
                    title="Badisa Srikanth - Founder & CEO of SriVoraTech"
                    className="founder-main-photo"
                    itemProp="image"
                  />
                  <div className="image-overlay-gradient" />
                  <div className="verified-badge-tag">
                    <ShieldCheck size={16} className="verified-icon" /> Verified Executive
                  </div>
                </div>

                <div className="founder-quick-contact">
                  <a
                    href="https://www.linkedin.com/in/srikanthbadisa/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="founder-social-btn linkedin"
                    title="LinkedIn Profile"
                  >
                    <Linkedin size={18} />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href="https://github.com/Rajupeace"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="founder-social-btn github"
                    title="GitHub Profile"
                  >
                    <Code2 size={18} />
                    <span>GitHub</span>
                  </a>
                  <a
                    href="mailto:srikanthbsqy@gmail.com"
                    className="founder-social-btn email"
                    title="Send Email"
                  >
                    <Mail size={18} />
                    <span>Email</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Details Column */}
            <div className="founder-details-col">
              <div className="founder-chip-tag">
                <Sparkles size={14} /> Executive Leadership
              </div>

              <h1 className="founder-name-title">
                Badisa Srikanth
              </h1>

              <div className="founder-role-subtitle">
                Founder & Chief Executive Officer (CEO) at <span className="gradient-text">SriVoraTech</span>
              </div>

              <p className="founder-intro-text">
                Badisa Srikanth is the Founder and CEO of SriVoraTech. He founded the company to help startups, businesses, and enterprises build modern digital products through AI, custom software, cloud technologies, web applications, and mobile applications. His focus is on innovation, scalable technology, and delivering high-quality software solutions.
              </p>

              <div className="founder-stats-bar">
                <div className="founder-stat-item">
                  <span className="stat-val">2024</span>
                  <span className="stat-lbl">Founded SriVoraTech</span>
                </div>
                <div className="founder-stat-item">
                  <span className="stat-val">8+</span>
                  <span className="stat-lbl">Core Tech Domains</span>
                </div>
                <div className="founder-stat-item">
                  <span className="stat-val">100%</span>
                  <span className="stat-lbl">Client IP Ownership</span>
                </div>
              </div>

              <div className="founder-hero-cta-row">
                <a href="#founder-contact" className="btn-primary">
                  Connect with Founder <ArrowRight size={16} />
                </a>
                <button type="button" onClick={() => handleNav('/services')} className="btn-secondary-light">
                  Explore SriVoraTech Services
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Internal Navigation Bar */}
      <section className="internal-nav-strip">
        <div className="container">
          <div className="nav-strip-inner">
            <span className="strip-title">Explore SriVoraTech Pages:</span>
            <div className="strip-links">
              <button type="button" onClick={() => handleNav('/')} className="strip-btn">Home</button>
              <button type="button" onClick={() => handleNav('/about')} className="strip-btn">About</button>
              <button type="button" onClick={() => handleNav('/founder')} className="strip-btn active">Founder</button>
              <button type="button" onClick={() => handleNav('/services')} className="strip-btn">Services</button>
              <button type="button" onClick={() => handleNav('/careers')} className="strip-btn">Careers</button>
              <button type="button" onClick={() => handleNav('/contact')} className="strip-btn">Contact</button>
            </div>
          </div>
        </div>
      </section>

      {/* Biography & Leadership Section */}
      <section className="founder-bio-section section" id="biography">
        <div className="container">
          <div className="section-header center">
            <div className="section-badge">
              <Briefcase size={14} /> Executive Biography
            </div>
            <h2 className="section-title">
              Leadership & <span className="gradient-text">Background</span>
            </h2>
            <p className="section-subtitle">
              Driving digital transformation through technological excellence and customer-centric software engineering.
            </p>
          </div>

          <div className="bio-grid">
            <div className="bio-card glass-card">
              <div className="card-icon-header">
                <Building2 size={24} style={{ color: '#0067f4' }} />
                <h3>About SriVoraTech Founder</h3>
              </div>
              <p>
                As Founder and Chief Executive Officer of SriVoraTech, <strong>Badisa Srikanth</strong> leads the company's overall vision, strategic direction, and technology execution. Under his leadership, SriVoraTech has established itself as an enterprise-grade digital services platform delivering cutting-edge software engineering, custom AI solutions, and cloud architectures.
              </p>
              <p>
                He emphasizes agile development methodologies, sub-second application performance, clean code standards, and strict zero-downtime infrastructure for global clients across India, North America, Europe, and the Middle East.
              </p>
            </div>

            <div className="bio-card glass-card">
              <div className="card-icon-header">
                <Target size={24} style={{ color: '#10b981' }} />
                <h3>Leadership Philosophy</h3>
              </div>
              <p>
                Badisa Srikanth believes in empowering businesses with transparent, high-value software solutions. His leadership approach focuses on:
              </p>
              <ul className="philosophy-list">
                <li><CheckCircle2 size={16} style={{ color: '#10b981' }} /> <strong>Innovation First:</strong> Leveraging artificial intelligence and modern frameworks to solve complex business challenges.</li>
                <li><CheckCircle2 size={16} style={{ color: '#10b981' }} /> <strong>100% IP Transparency:</strong> Guaranteeing full source code ownership and security for every client.</li>
                <li><CheckCircle2 size={16} style={{ color: '#10b981' }} /> <strong>Execution Speed:</strong> Delivering production-ready MVPs in 2-4 week sprint cycles.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Cards */}
      <section className="founder-vision-section section">
        <div className="container">
          <div className="vision-mission-grid">
            <div className="vision-card glass-card">
              <div className="vision-icon-box" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>
                <Compass size={28} />
              </div>
              <h3>Founder's Vision</h3>
              <p>
                "To build SriVoraTech into a globally trusted technology company delivering innovative digital solutions for businesses worldwide."
              </p>
            </div>

            <div className="mission-card glass-card">
              <div className="vision-icon-box" style={{ background: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6' }}>
                <Target size={28} />
              </div>
              <h3>Company Mission</h3>
              <p>
                To accelerate digital product development for startups and enterprise leaders by delivering world-class AI engineering, scalable software architectures, and reliable cloud solutions with 99.9% operational uptime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Areas of Expertise */}
      <section className="founder-expertise-section section" id="expertise">
        <div className="container">
          <div className="section-header center">
            <div className="section-badge">
              <Cpu size={14} /> Core Competencies
            </div>
            <h2 className="section-title">
              Areas of <span className="gradient-text">Expertise</span>
            </h2>
            <p className="section-subtitle">
              Comprehensive domain knowledge spanning modern full-stack development, AI engineering, and enterprise cloud systems.
            </p>
          </div>

          <div className="expertise-cards-grid">
            {expertiseList.map((item, idx) => {
              const IconComp = item.icon
              return (
                <div key={idx} className="expertise-card glass-card" style={{ '--card-accent': item.color }}>
                  <div className="exp-icon-wrapper" style={{ background: `${item.color}15`, color: item.color }}>
                    <IconComp size={24} />
                  </div>
                  <h3 className="exp-title">{item.title}</h3>
                  <p className="exp-desc">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Founder FAQ Section */}
      <section className="founder-faq-section section" id="faq">
        <div className="container">
          <div className="section-header center">
            <div className="section-badge">
              <HelpCircle size={14} /> Frequently Asked Questions
            </div>
            <h2 className="section-title">
              Founder & Leadership <span className="gradient-text">FAQs</span>
            </h2>
          </div>

          <div className="faq-container-box">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx
              return (
                <div
                  key={idx}
                  className={`faq-item-card glass-card ${isOpen ? 'active' : ''}`}
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                >
                  <div className="faq-question-header">
                    <h4>{faq.q}</h4>
                    <span className="faq-toggle-icon">{isOpen ? '-' : '+'}</span>
                  </div>
                  {isOpen && (
                    <div className="faq-answer-body">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Founder Contact & Call To Action */}
      <section className="founder-contact-section section" id="founder-contact">
        <div className="container">
          <div className="contact-cta-card glass-card">
            <div className="cta-content">
              <div className="section-badge">
                <MessageSquare size={14} /> Get in Touch
              </div>
              <h2>Ready to build your next digital product with <span className="gradient-text">SriVoraTech</span>?</h2>
              <p>
                Schedule a 30-minute discovery consultation with Founder & CEO Badisa Srikanth and the engineering team to discuss your technical architecture, project scope, or AI automation goals.
              </p>

              <div className="cta-actions-bar">
                <a href="mailto:srikanthbsqy@gmail.com" className="btn-primary">
                  <Mail size={16} /> Email Founder Directly
                </a>
                <button type="button" onClick={() => handleNav('/contact')} className="btn-secondary-light">
                  <PhoneCall size={16} /> Book Discovery Call
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
