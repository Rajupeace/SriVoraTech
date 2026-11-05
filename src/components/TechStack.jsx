import { useState } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { 
  Code2, 
  Cpu, 
  Database, 
  Cloud, 
  Layers, 
  Sparkles, 
  Zap, 
  Server,
  Globe,
  Terminal,
  Search,
  X,
  CheckCircle2
} from 'lucide-react'
import './TechStack.css'

const categories = [
  { id: 'all', label: 'All Technologies', icon: Sparkles },
  { id: 'frontend', label: 'Frontend', icon: Globe },
  { id: 'backend', label: 'Backend & APIs', icon: Server },
  { id: 'cloud', label: 'Cloud & DevOps', icon: Cloud },
  { id: 'ai', label: 'AI & Data', icon: Cpu },
  { id: 'database', label: 'Databases', icon: Database },
]

const technologies = [
  // Frontend
  {
    id: 'react',
    name: 'React.js',
    category: 'frontend',
    desc: 'Component-driven UI architecture for high-speed dynamic web applications and portals.',
    icon: Code2,
    badge: 'Frontend',
    color: '#0067f4',
    tier: 'Primary UI Stack',
    useCase: 'Interactive SPAs & Client Dashboards',
    tags: ['UI Framework', 'Hooks', 'Vite', 'Component-Driven'],
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'frontend',
    desc: 'Server-side rendering, App Router, and static site generation optimized for SEO performance.',
    icon: Globe,
    badge: 'Frontend',
    color: '#8b5cf6',
    tier: 'SSR & Jamstack',
    useCase: 'Production Web Platforms & E-Commerce',
    tags: ['Server Components', 'SSR / SSG', 'Edge Caching'],
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'frontend',
    desc: 'Strictly typed JavaScript ensuring type safety, maintainability, and enterprise code quality.',
    icon: Terminal,
    badge: 'Frontend',
    color: '#3178c6',
    tier: 'Core Language',
    useCase: 'Full-Stack Type Contracts & Scalability',
    tags: ['Static Typing', 'Refactoring Safety', 'Interfaces'],
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'frontend',
    desc: 'Utility-first responsive styling framework for consistent, accessible design systems.',
    icon: Layers,
    badge: 'Frontend',
    color: '#06b6d4',
    tier: 'Design System',
    useCase: 'Rapid Responsive UI & Mobile Layouts',
    tags: ['Responsive Design', 'Utility Classes', 'Design Tokens'],
  },

  // Backend & APIs
  {
    id: 'nodejs',
    name: 'Node.js & Express',
    category: 'backend',
    desc: 'Event-driven, asynchronous backend runtime for scalable microservices and REST APIs.',
    icon: Server,
    badge: 'Backend',
    color: '#10b981',
    tier: 'Core Backend',
    useCase: 'High-Throughput APIs & Event Services',
    tags: ['Async I/O', 'REST APIs', 'JWT Auth', 'WebSockets'],
  },
  {
    id: 'python',
    name: 'Python & FastAPI',
    category: 'backend',
    desc: 'Modern, high-performance web framework for AI integration, data processing, and APIs.',
    icon: Terminal,
    badge: 'Backend',
    color: '#eab308',
    tier: 'AI & Data Services',
    useCase: 'Machine Learning Pipelines & AI Agents',
    tags: ['Async Python', 'Pydantic Types', 'Swagger Docs'],
  },

  // Cloud & DevOps
  {
    id: 'aws',
    name: 'Amazon Web Services',
    category: 'cloud',
    desc: 'Enterprise cloud infrastructure: EC2, S3, RDS, Lambda, CloudFront, and VPC networking.',
    icon: Cloud,
    badge: 'Cloud',
    color: '#f97316',
    tier: 'Primary Cloud',
    useCase: 'Multi-Region Architecture & File Storage',
    tags: ['S3 Buckets', 'RDS Scaling', 'CloudFront CDN'],
  },
  {
    id: 'docker',
    name: 'Docker & Containers',
    category: 'cloud',
    desc: 'Containerization for predictable, isolated environments across development, staging, and production.',
    icon: Layers,
    badge: 'DevOps',
    color: '#0284c7',
    tier: 'Containerization',
    useCase: 'Reproducible Deployments & Microservices',
    tags: ['Container Images', 'Docker Compose', 'CI/CD Ready'],
  },

  // AI & Data
  {
    id: 'llm',
    name: 'LLM Orchestration & RAG',
    category: 'ai',
    desc: 'Integration with frontier LLMs (Gemini, Claude, GPT) combined with vector search for custom context.',
    icon: Cpu,
    badge: 'Artificial Intelligence',
    color: '#ec4899',
    tier: 'Applied AI',
    useCase: 'RAG Retrieval, AI Agents & Chatbots',
    tags: ['Vector Embeddings', 'Prompt Engineering', 'LangChain'],
  },
  {
    id: 'data-processing',
    name: 'Pandas & Scientific Python',
    category: 'ai',
    desc: 'Data transformation, analytics aggregation, and automated reporting pipelines.',
    icon: Database,
    badge: 'Data Engineering',
    color: '#6366f1',
    tier: 'Analytics',
    useCase: 'Business Intelligence & Automated Reports',
    tags: ['Data Cleaning', 'Aggregation', 'Analytics APIs'],
  },

  // Databases
  {
    id: 'postgres',
    name: 'PostgreSQL',
    category: 'database',
    desc: 'ACID-compliant relational database for structured enterprise data, transactions, and integrity.',
    icon: Database,
    badge: 'Database',
    color: '#336791',
    tier: 'Relational Store',
    useCase: 'ERP Data, User Records & Financials',
    tags: ['ACID Compliance', 'Complex Joins', 'Indexed Queries'],
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'database',
    desc: 'Document-oriented NoSQL database optimized for flexible schemas, catalogs, and logs.',
    icon: Database,
    badge: 'Database',
    color: '#22c55e',
    tier: 'Document Store',
    useCase: 'Content Catalogs, Logs & JSON Schemas',
    tags: ['Flexible Schemas', 'Aggregation Pipelines', 'Atlas Cloud'],
  },
  {
    id: 'redis',
    name: 'Redis',
    category: 'database',
    desc: 'In-memory key-value data store used for sub-millisecond caching, session storage, and rate limiting.',
    icon: Zap,
    badge: 'Database',
    color: '#ef4444',
    tier: 'In-Memory Cache',
    useCase: 'Rate Limiting, Session Stores & Fast Cache',
    tags: ['Memory Cache', 'Token Bucket', 'Pub/Sub Events'],
  },
]

export default function TechStack() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [ref, isVisible] = useScrollAnimation()

  const filteredTechnologies = technologies.filter((tech) => {
    const matchesCategory = activeCategory === 'all' || tech.category === activeCategory
    const matchesSearch = 
      tech.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <section ref={ref} className="tech-stack section" id="tech-stack">
      <div className="container">
        <div className={`animate-on-scroll ${isVisible ? 'visible' : ''}`}>
          <div className="tech-badge">
            <Sparkles size={14} />
            Verified Technology Stack
          </div>
          <h2 className="section-title">
            Modern, Proven & <span className="gradient-text">Battle-Tested</span>
          </h2>
          <p className="section-subtitle">
            We build with industry-standard frameworks, scalable databases, and enterprise cloud infrastructure selected for long-term reliability.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="tech-controls">
          <div className="tech-search-wrapper">
            <Search size={16} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search technologies, tags, or use cases..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="tech-search-input"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="clear-search-btn" aria-label="Clear search">
                <X size={14} />
              </button>
            )}
          </div>

          <div className="tech-categories-pills">
            {categories.map((cat) => {
              const Icon = cat.icon
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`tech-cat-btn ${activeCategory === cat.id ? 'active' : ''}`}
                >
                  <Icon size={14} />
                  <span>{cat.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Tech Grid */}
        <div className="tech-grid">
          {filteredTechnologies.map((tech, idx) => {
            const Icon = tech.icon

            return (
              <div 
                key={tech.id} 
                className={`tech-card animate-on-scroll delay-${(idx % 4) + 1} ${isVisible ? 'visible' : ''}`}
                style={{ 
                  '--tech-accent': tech.color, 
                  '--delay': `${0.04 + idx * 0.04}s` 
                }}
              >
                <div 
                  className="tech-top-accent-line" 
                  style={{ background: tech.color }} 
                />

                <div className="tech-card-header">
                  <div 
                    className="tech-icon-wrapper" 
                    style={{ 
                      background: `${tech.color}14`, 
                      color: tech.color, 
                      borderColor: `${tech.color}30` 
                    }}
                  >
                    <Icon size={24} />
                  </div>
                  <div className="tech-meta">
                    <span 
                      className="tech-badge" 
                      style={{ 
                        color: tech.color, 
                        borderColor: `${tech.color}30`, 
                        background: `${tech.color}0f` 
                      }}
                    >
                      {tech.badge}
                    </span>
                    <span className="tech-tier-chip" style={{ color: tech.color }}>
                      {tech.tier}
                    </span>
                  </div>
                </div>

                <h3 className="tech-name">{tech.name}</h3>
                <p className="tech-desc">{tech.desc}</p>

                <div className="tech-use-case">
                  <span className="use-case-label">Primary Application:</span>
                  <span className="use-case-text">{tech.useCase}</span>
                </div>

                <div className="tech-tags">
                  {tech.tags.map((tag) => (
                    <span key={tag} className="tech-tag">
                      <Zap size={10} style={{ color: tech.color }} />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
