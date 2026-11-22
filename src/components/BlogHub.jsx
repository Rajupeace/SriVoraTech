import React, { useState } from 'react'
import SEO from './SEO'
import { Clock, User, Tag, ArrowRight, BookOpen, Search, CheckCircle, Globe, Cpu, Server, Sparkles, Layers } from 'lucide-react'
import srikanthPhoto from '../assets/badisa_srikanth.jpg'
import saiPhoto from '../assets/sai_manindra.jpg'
import vamsiPhoto from '../assets/vamsi_krishna.jpg'
import './CareersPage.css' // Re-use styling variables

export const BLOG_POSTS = [
  {
    id: 'nextjs-15-seo-guide',
    slug: 'nextjs-15-seo-guide',
    title: 'How to Achieve 100/100 Lighthouse SEO Score in Next.js 15 and React 19',
    excerpt: 'A complete step-by-step guide to Core Web Vitals, server components, dynamic metadata generation, and JSON-LD schema integration.',
    category: 'Web Development',
    tags: ['Next.js', 'React', 'SEO', 'Performance'],
    bannerGradient: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    bannerIcon: Globe,
    bannerAccent: '#38bdf8',
    author: 'Badisa Srikanth',
    authorRole: 'Founder & CEO, SriVoraTech',
    authorImage: srikanthPhoto,
    readTime: '6 min read',
    date: 'July 28, 2026',
    content: `
      <h2>Introduction</h2>
      <p>Achieving a 100/100 SEO and performance score on Google Lighthouse requires a holistic strategy spanning server-side rendering, asset optimization, security headers, and structured data schemas.</p>
      
      <h2>1. Core Web Vitals Optimization</h2>
      <p>Largest Contentful Paint (LCP) must be under 2.5 seconds. Optimize hero images using modern WebP formats, explicit width and height attributes to avoid Cumulative Layout Shift (CLS), and high fetch priority.</p>
      
      <h2>2. Dynamic JSON-LD Schemas</h2>
      <p>Inject rich structured data for Organization, WebSite, LocalBusiness, BreadcrumbList, and FAQPage using Google Search Console verified syntax.</p>
      
      <h2>3. Modern Caching & CDN Distribution</h2>
      <p>Leverage Cloudflare Brotli compression, HTTP/3, and edge caching headers for sub-100ms response times globally.</p>
    `
  },
  {
    id: 'ai-agents-enterprise-automation',
    slug: 'ai-agents-enterprise-automation',
    title: 'Building Autonomous AI Agents with LangChain, OpenAI & Python',
    excerpt: 'Learn how SriVoraTech engineers enterprise RAG vector search pipelines and autonomous AI customer assistants.',
    category: 'AI & Automation',
    tags: ['AI', 'Python', 'LLM', 'LangChain'],
    bannerGradient: 'linear-gradient(135deg, #3b0764 0%, #1e1b4b 100%)',
    bannerIcon: Cpu,
    bannerAccent: '#ec4899',
    author: 'Garapati Sai Manindra',
    authorRole: 'Chief Technology Officer (CTO)',
    authorImage: saiPhoto,
    readTime: '8 min read',
    date: 'July 20, 2026',
    content: `
      <h2>Introduction</h2>
      <p>Autonomous AI agents are transforming how enterprises handle customer support, medical documentation, and document analysis.</p>
      
      <h2>1. Retrieval-Augmented Generation (RAG) Architecture</h2>
      <p>By connecting custom vector databases (Pinecone, Chroma) with OpenAI GPT-4o models, businesses eliminate AI hallucinations while keeping data private.</p>
    `
  },
  {
    id: 'custom-erp-vs-off-the-shelf',
    slug: 'custom-erp-vs-off-the-shelf',
    title: 'Custom ERP vs Off-The-Shelf Software: Strategic Guide for Startups',
    excerpt: 'Why custom software engineering built by SriVoraTech offers 3x ROI compared to rigid SaaS subscription tools.',
    category: 'Software Engineering',
    tags: ['Custom Software', 'ERP', 'SaaS', 'Architecture'],
    bannerGradient: 'linear-gradient(135deg, #0c4a6e 0%, #082f49 100%)',
    bannerIcon: Server,
    bannerAccent: '#06b6d4',
    author: 'Badisa Vamsi Krishna',
    authorRole: 'Co-Founder & COO',
    authorImage: vamsiPhoto,
    readTime: '5 min read',
    date: 'July 15, 2026',
    content: `
      <h2>Introduction</h2>
      <p>As startups scale, rigid third-party software leads to operational bottlenecks. Custom ERP and CRM solutions provide complete data ownership and custom workflow automation.</p>
    `
  }
]

export default function BlogHub({ onSelectPost, onNavigate }) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = ['All', 'Web Development', 'AI & Automation', 'Software Engineering']

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesCat = activeCategory === 'All' || post.category === activeCategory
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCat && matchesSearch
  })

  return (
    <div className="blog-hub-page" style={{ padding: '110px 24px 100px', maxWidth: '1200px', margin: '0 auto', color: 'var(--color-text-primary, #1e293b)' }}>
      <SEO pathname="/blog" breadcrumbs={[{ name: 'Home', url: '/' }, { name: 'Blog', url: '/blog' }]} />

      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <span style={{ color: '#0067f4', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem' }}>Insights &amp; Innovation</span>
        <h1 style={{ fontSize: '2.8rem', fontWeight: '800', margin: '12px 0 16px', color: 'var(--color-text-heading, #0f172a)', letterSpacing: '-0.02em' }}>
          SriVoraTech Technical Engineering Blog
        </h1>
        <p style={{ color: 'var(--color-text-secondary, #475569)', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto' }}>
          Deep dives into AI engineering, React/Next.js performance, cloud DevOps, and technical SEO written by our founding team.
        </p>

        {/* Search & Category Bar */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '30px', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', width: '320px' }}>
            <Search size={18} style={{ position: 'absolute', left: '14px', top: '14px', color: '#64748b' }} />
            <input
              type="text"
              placeholder="Search articles..."
              aria-label="Search articles by title or topic"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', padding: '12px 14px 12px 42px', background: '#ffffff', border: '1px solid var(--color-gray-200, #e2e8f0)', borderRadius: '8px', color: '#0f172a', boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '10px 18px',
                  borderRadius: '8px',
                  border: '1px solid ' + (activeCategory === cat ? '#0067f4' : 'var(--color-gray-200, #e2e8f0)'),
                  background: activeCategory === cat ? '#0067f4' : '#ffffff',
                  color: activeCategory === cat ? '#ffffff' : '#475569',
                  cursor: 'pointer',
                  fontWeight: '600',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Blog Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '30px' }}>
        {filteredPosts.map(post => {
          const BannerIcon = post.bannerIcon
          return (
            <div
              key={post.id}
              onClick={() => onSelectPost(post.slug)}
              className="spotlight-card"
              style={{
                background: '#ffffff',
                border: '1px solid var(--color-gray-200, #e2e8f0)',
                borderRadius: '16px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 4px 20px rgba(15, 23, 42, 0.05)',
                transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
                overflow: 'hidden'
              }}
            >
              {/* Visual Thumbnail Banner */}
              <div style={{ height: '140px', background: post.bannerGradient, padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.08em', color: post.bannerAccent, background: 'rgba(255, 255, 255, 0.1)', padding: '4px 10px', borderRadius: '999px', display: 'inline-block', marginBottom: '8px' }}>
                    {post.category}
                  </span>
                  <div style={{ color: '#ffffff', fontSize: '12px', opacity: 0.85, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={12} /> {post.readTime}
                  </div>
                </div>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.1)', border: `1px solid ${post.bannerAccent}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: post.bannerAccent }}>
                  <BannerIcon size={24} />
                </div>
              </div>

              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                <div>
                  <h2 style={{ fontSize: '1.28rem', fontWeight: '700', marginBottom: '12px', lineHeight: '1.4', color: 'var(--color-text-heading, #0f172a)' }}>
                    {post.title}
                  </h2>
                  <p style={{ color: 'var(--color-text-secondary, #475569)', fontSize: '0.94rem', lineHeight: '1.6', marginBottom: '20px' }}>
                    {post.excerpt}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '16px', borderTop: '1px solid var(--color-gray-200, #e2e8f0)' }}>
                  <img src={post.authorImage} alt={post.author} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #e2e8f0' }} />
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--color-text-heading, #0f172a)' }}>{post.author}</div>
                    <div style={{ color: '#64748b', fontSize: '0.78rem' }}>{post.authorRole}</div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
