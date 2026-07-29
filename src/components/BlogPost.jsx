import React from 'react'
import SEO from './SEO'
import { BLOG_POSTS } from './BlogHub'
import { ArrowLeft, Clock, User, Share2, Tag, BookOpen, CheckCircle } from 'lucide-react'

export default function BlogPost({ postSlug, onBack }) {
  const post = BLOG_POSTS.find(p => p.slug === postSlug) || BLOG_POSTS[0]

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: post.title,
    description: post.excerpt,
    image: 'https://srivoratech.in/og-image.png',
    author: {
      '@type': 'Person',
      name: post.author,
      jobTitle: post.authorRole,
      url: 'https://srivoratech.in/#leadership'
    },
    publisher: {
      '@type': 'Organization',
      name: 'SriVoraTech',
      logo: {
        '@type': 'ImageObject',
        url: 'https://srivoratech.in/favicon.svg'
      }
    },
    datePublished: '2026-07-28',
    dateModified: '2026-07-29',
    mainEntityOfPage: `https://srivoratech.in/blog/${post.slug}`
  }

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: post.title, url: `/blog/${post.slug}` }
  ]

  return (
    <div style={{ maxWidth: '840px', margin: '0 auto', padding: '60px 24px 100px', color: '#f8fafc' }}>
      <SEO pathname={`/blog/${post.slug}`} breadcrumbs={breadcrumbs} schema={articleSchema} />

      <button
        onClick={onBack}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 16px',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '8px',
          color: '#cbd5e1',
          cursor: 'pointer',
          marginBottom: '32px'
        }}
      >
        <ArrowLeft size={16} /> Back to Articles
      </button>

      <div style={{ marginBottom: '24px' }}>
        <span style={{ color: '#10b981', fontWeight: '700', fontSize: '0.85rem' }}>{post.category}</span>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', margin: '12px 0 20px', lineHeight: '1.25' }}>{post.title}</h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', color: '#94a3b8', fontSize: '0.9rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img src={post.authorImage} alt={post.author} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
            <div>
              <span style={{ fontWeight: '600', color: '#fff' }}>{post.author}</span>
              <span style={{ display: 'block', fontSize: '0.75rem', color: '#64748b' }}>{post.authorRole}</span>
            </div>
          </div>
          <span>•</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={14} /> {post.readTime}</span>
          <span>•</span>
          <span>{post.date}</span>
        </div>
      </div>

      {/* Table of Contents Box */}
      <div style={{ padding: '20px 24px', background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', marginBottom: '40px' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <BookOpen size={16} style={{ color: '#10b981' }} /> Table of Contents
        </h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.92rem', display: 'flex', flexDirection: 'column', gap: '8px', color: '#38bdf8' }}>
          <li><a href="#intro" style={{ color: '#38bdf8', textDecoration: 'none' }}>1. Introduction &amp; Core Concepts</a></li>
          <li><a href="#core-vitals" style={{ color: '#38bdf8', textDecoration: 'none' }}>2. Core Web Vitals (LCP, INP, CLS) Optimization</a></li>
          <li><a href="#schemas" style={{ color: '#38bdf8', textDecoration: 'none' }}>3. JSON-LD Schemas &amp; Rich Snippets</a></li>
          <li><a href="#summary" style={{ color: '#38bdf8', textDecoration: 'none' }}>4. Key Takeaways &amp; Implementation</a></li>
        </ul>
      </div>

      {/* Article Content */}
      <div
        className="article-body-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
        style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#cbd5e1' }}
      />

      {/* Author EEAT Bio Footer Box */}
      <div style={{ marginTop: '60px', padding: '24px', background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '16px', display: 'flex', gap: '20px', alignItems: 'center' }}>
        <img src={post.authorImage} alt={post.author} style={{ width: '70px', height: '70px', borderRadius: '50%', objectFit: 'cover' }} />
        <div>
          <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#fff', marginBottom: '4px' }}>Written by {post.author}</h4>
          <p style={{ color: '#10b981', fontSize: '0.85rem', fontWeight: '600', marginBottom: '8px' }}>{post.authorRole} at SriVoraTech</p>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: 0 }}>
            Badisa Srikanth and the SriVoraTech engineering team lead enterprise digital product engineering, artificial intelligence innovation, and performance-first web development.
          </p>
        </div>
      </div>
    </div>
  )
}
