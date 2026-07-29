import React, { useState } from 'react'
import SEO from './SEO'
import { Clock, User, Tag, ArrowRight, BookOpen, Search, CheckCircle } from 'lucide-react'
import './CareersPage.css' // Re-use styling variables

export const BLOG_POSTS = [
  {
    id: 'nextjs-15-seo-guide',
    slug: 'nextjs-15-seo-guide',
    title: 'How to Achieve 100/100 Lighthouse SEO Score in Next.js 15 and React 19',
    excerpt: 'A complete step-by-step guide to Core Web Vitals, server components, dynamic metadata generation, and JSON-LD schema integration.',
    category: 'Web Development',
    tags: ['Next.js', 'React', 'SEO', 'Performance'],
    author: 'Badisa Srikanth',
    authorRole: 'Founder & CEO, SriVoraTech',
    authorImage: '/badisa_srikanth.jpg',
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
    author: 'Garapati Sai Manindra',
    authorRole: 'Chief Technology Officer (CTO)',
    authorImage: '/sai_manindra.jpg',
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
    author: 'Badisa Vamsi Krishna',
    authorRole: 'Co-Founder & COO',
    authorImage: '/vamsi_krishna.jpg',
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
    <div className="blog-hub-page" style={{ padding: '60px 24px 100px', maxWidth: '1200px', margin: '0 auto', color: '#f8fafc' }}>
      <SEO pathname="/blog" breadcrumbs={[{ name: 'Home', url: '/' }, { name: 'Blog', url: '/blog' }]} />

      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <span style={{ color: '#10b981', fontWeight: '700', textTransform: 'uppercase', tracking: '1px', fontSize: '0.85rem' }}>Insights &amp; Innovation</span>
        <h1 style={{ fontSize: '2.8rem', fontWeight: '800', margin: '12px 0 16px', background: 'linear-gradient(135deg, #fff 0%, #cbd5e1 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          SriVoraTech Technical Engineering Blog
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto' }}>
          Deep dives into AI engineering, React/Next.js performance, cloud DevOps, and technical SEO written by our founding team.
        </p>

        {/* Search & Category Bar */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '30px', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', width: '320px' }}>
            <Search size={18} style={{ position: 'absolute', left: '14px', top: '14px', color: '#64748b' }} />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', padding: '12px 14px 12px 42px', background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '10px 18px',
                  borderRadius: '8px',
                  border: '1px solid ' + (activeCategory === cat ? '#10b981' : 'rgba(255,255,255,0.1)'),
                  background: activeCategory === cat ? 'rgba(16,185,129,0.15)' : 'rgba(15,23,42,0.6)',
                  color: activeCategory === cat ? '#10b981' : '#cbd5e1',
                  cursor: 'pointer',
                  fontWeight: '600'
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
        {filteredPosts.map(post => (
          <div
            key={post.id}
            onClick={() => onSelectPost(post.slug)}
            className="spotlight-card"
            style={{
              padding: '28px',
              background: 'rgba(15, 23, 42, 0.7)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '16px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justify: 'space-between',
              transition: 'transform 0.2s ease, border-color 0.2s ease'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '0.82rem', color: '#94a3b8' }}>
                <span style={{ color: '#10b981', fontWeight: '700' }}>{post.category}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={14} /> {post.readTime}</span>
              </div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: '700', marginBottom: '12px', lineHeight: '1.4' }}>{post.title}</h2>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '20px' }}>{post.excerpt}</p>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <img src={post.authorImage} alt={post.author} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{post.author}</div>
                  <div style={{ color: '#64748b', fontSize: '0.78rem' }}>{post.authorRole}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
