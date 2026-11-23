import { useState } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { 
  Sparkles, 
  Zap, 
  Globe, 
  Server, 
  Cloud, 
  Cpu, 
  Database, 
  Search, 
  X 
} from 'lucide-react'
import './TechStack.css'

// Authentic SVG Brand Logos
const ReactLogo = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="-11.5 -10.23174 23 20.46348" fill="none">
    <circle cx="0" cy="0" r="2.05" fill="#00d8ff"/>
    <g stroke="#00d8ff" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2"/>
      <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
      <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
    </g>
  </svg>
)

const NextLogo = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 180 180" fill="none">
    <circle cx="90" cy="90" r="90" fill="#0f172a"/>
    <path d="M149.508 157.438L69.102 54H54V125.973H66.602V69.754L139.73 164.717C143.142 162.464 146.417 159.986 149.508 157.438Z" fill="url(#next-grad)"/>
    <rect x="114" y="54" width="12" height="72" fill="#fff"/>
    <defs>
      <linearGradient id="next-grad" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
        <stop stopColor="#fff"/>
        <stop offset="1" stopColor="#fff" stopOpacity="0"/>
      </linearGradient>
    </defs>
  </svg>
)

const TSLogo = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 128 128">
    <rect width="128" height="128" rx="20" fill="#3178c6"/>
    <path fill="#fff" d="M68.7 82.5c2.3 3.9 6.2 6.5 11.2 6.5 4.6 0 7.8-2.3 7.8-5.8 0-4-3.5-5.5-9.6-8.2-9-3.9-14.8-8.8-14.8-18.7 0-9.8 7.7-17.1 19.3-17.1 7.8 0 13.9 2.7 18.2 9.5l-8.6 5.5c-2.3-3.9-5-5.3-9.5-5.3-4.6 0-7.3 2.5-7.3 5.5 0 3.7 3.2 5.2 9.6 8 9.5 4.1 15 8.9 15 19 0 11.4-8.8 17.5-20.9 17.5-10.4 0-17.8-4.4-21.8-11.7l11.4-5.7zM36.1 40.5h33.8v10.6H54.4v46.7H41.8V51.1H36.1V40.5z"/>
  </svg>
)

const TailwindLogo = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 54 33" fill="none">
    <path fillRule="evenodd" clipRule="evenodd" d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z" fill="#06B6D4"/>
  </svg>
)

const NodeLogo = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32">
    <path fill="#539E43" d="M16 2.5L2.8 10.1v15.2L16 32.9l13.2-7.6V10.1L16 2.5zm0 3.3l10.3 5.9v11.9L16 29.5 5.7 23.6V11.7L16 5.8z"/>
    <path fill="#539E43" d="M15.1 11.2v9.7h1.9v-9.7h-1.9zm-4.7 3.2v6.5h1.9v-6.5h-1.9zm9.5 0v6.5h1.9v-6.5h-1.9z"/>
  </svg>
)

const PythonLogo = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 128 128">
    <path fill="#3776AB" d="M63.6 7.5c-15.4 0-25.1 6.7-25.1 19.8v14.4h25.4v3.6H23.5C9.8 45.3 0 54.3 0 68.4c0 14.2 11.7 22.8 25.1 22.8h8.1V79.8c0-8.9 7.6-16.7 16.5-16.7h25.4c7.4 0 13.4-6.1 13.4-13.5V27.3c0-12.8-9.5-19.8-24.9-19.8zm-7.6 7.8c2.8 0 5.1 2.3 5.1 5.1s-2.3 5.1-5.1 5.1-5.1-2.3-5.1-5.1 2.3-5.1 5.1-5.1z"/>
    <path fill="#FFD43B" d="M64.4 120.5c15.4 0 25.1-6.7 25.1-19.8V86.3H64.1v-3.6h40.4c13.7 0 23.5-9 23.5-23.1 0-14.2-11.7-22.8-25.1-22.8h-8.1v11.4c0 8.9-7.6 16.7-16.5 16.7H52.9c-7.4 0-13.4 6.1-13.4 13.5v22.3c0 12.8 9.5 19.8 24.9 19.8zm7.6-7.8c-2.8 0-5.1-2.3-5.1-5.1s2.3-5.1 5.1-5.1 5.1 2.3 5.1 5.1-2.3 5.1-5.1 5.1z"/>
  </svg>
)

const AWSLogo = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64">
    <rect width="64" height="64" rx="14" fill="#232F3E"/>
    <path fill="#FF9900" d="M14 41c8.5 5 18 6 26.5 2.5 1.5-.6 2.5-.2 2 .8-.7 1.5-7.5 5.5-16 5.5-8.8 0-14.8-4.5-15.8-6.2-.5-.8.3-1.6 1.3-1.4l2-1.2zm28.8-1.5c1.4-.4 3.8-1 4.2-1.2.5-.2.8.1.5.6-1 1.7-2.7 3.5-4 4.5-.4.3-.8.2-.7-.3l-.4-2.8.4-.8z"/>
    <path fill="#FFF" d="M19 28.5c0-4.5 3-7.5 7.5-7.5 3 0 5 1.5 6 3.5V21.5h4v15h-4v-2.5c-1 2-3 3.5-6 3.5-4.5 0-7.5-3.5-7.5-9zm13.5 0c0-3-2-5-4.5-5s-4.5 2-4.5 5 2 5 4.5 5 4.5-2 4.5-5z"/>
  </svg>
)

const DockerLogo = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#0284c7">
    <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.186.185.186m0 2.714h2.118a.186.186 0 00.186-.185V6.289a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.186v1.888c0 .102.082.185.185.185m-2.955 0h2.119a.186.186 0 00.186-.185V6.289a.186.186 0 00-.186-.186H8.074a.185.185 0 00-.185.186v1.888c0 .102.083.185.185.185m0 2.716h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186H8.074a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.955 0h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186H5.12a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.955 0h2.12a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.12a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m16.892-1.78c-.524-.367-1.409-.452-2.155-.262-.164.042-.315.093-.45.152-.352-1.396-1.503-2.39-2.906-2.584l-.326-.045-.2.26c-.464.606-.826 1.488-.934 2.278h-.463a.186.186 0 00-.186.186v1.888c0 .102.083.185.186.185h6.666c.24-.002.56-.05 1.01-.284.603-.315.932-.82.883-1.3-.037-.367-.324-.627-.853-.874m-6.49 4.394h-17.7a.64.64 0 00-.638.638 7.37 7.37 0 002.26 5.344 11.233 11.233 0 008.08 3.19c5.96 0 10.457-3.69 11.758-9.172h-3.76z"/>
  </svg>
)

const AILogo = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 2L14.4 7.6L20 10L14.4 12.4L12 18L9.6 12.4L4 10L9.6 7.6L12 2Z" fill="url(#ai-grad)"/>
    <path d="M19 16L20.2 18.8L23 20L20.2 21.2L19 24L17.8 21.2L15 20L17.8 18.8L19 16Z" fill="#ec4899"/>
    <defs>
      <linearGradient id="ai-grad" x1="4" y1="2" x2="20" y2="18" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ec4899"/>
        <stop offset="1" stopColor="#8b5cf6"/>
      </linearGradient>
    </defs>
  </svg>
)

const PandasLogo = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32">
    <rect x="4" y="4" width="10" height="10" rx="3" fill="#130754"/>
    <rect x="18" y="4" width="10" height="10" rx="3" fill="#FFD43B"/>
    <rect x="4" y="18" width="10" height="10" rx="3" fill="#E70488"/>
    <rect x="18" y="18" width="10" height="10" rx="3" fill="#0067F4"/>
  </svg>
)

const PostgresLogo = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64">
    <rect width="64" height="64" rx="14" fill="#336791"/>
    <path fill="#fff" d="M32 12c-11 0-20 9-20 20s9 20 20 20 20-9 20-20-9-20-20-20zm0 36c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16zm-5-22v12h4V32h6c2.2 0 4-1.8 4-4s-1.8-4-4-4h-10zm4 4h6c.6 0 1 .4 1 1s-.4 1-1 1h-6v-2z"/>
  </svg>
)

const MongoLogo = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#22c55e">
    <path d="M12.001 0c-.267 0-.533.093-.746.28L4.35 6.275a3.864 3.864 0 00-1.488 3.037v5.376c0 1.187.545 2.308 1.488 3.037l6.905 5.995c.426.37 1.066.37 1.492 0l6.905-5.995a3.864 3.864 0 001.488-3.037V9.312a3.864 3.864 0 00-1.488-3.037L12.747.28A1.127 1.127 0 0012.001 0zm0 2.296l5.748 4.992a1.864 1.864 0 01.718 1.465v5.376c0 .573-.263 1.115-.718 1.465L12 20.586l-5.748-4.992a1.864 1.864 0 01-.718-1.465V8.753c0-.573.263-1.115.718-1.465L12 2.296z"/>
    <path d="M12 4.5l-3.5 7.5 3.5 7.5 3.5-7.5L12 4.5z"/>
  </svg>
)

const RedisLogo = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64">
    <rect width="64" height="64" rx="14" fill="#ef4444"/>
    <path fill="#fff" d="M18 22l14-7 14 7-14 7-14-7zm0 10l14 7 14-7v6l-14 7-14-7v-6zm0 10l14 7 14-7v6l-14 7-14-7v-6z"/>
  </svg>
)

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
    desc: 'Component-driven UI architecture for high-speed dynamic web applications and client portals.',
    Logo: ReactLogo,
    color: '#0067f4',
    tier: 'Primary UI Stack',
    useCase: 'Interactive SPAs & Client Dashboards',
    tags: ['UI Framework', 'Hooks', 'Vite', 'Component-Driven'],
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'frontend',
    desc: 'Server-side rendering, App Router, and static generation optimized for SEO performance.',
    Logo: NextLogo,
    color: '#0f172a',
    tier: 'SSR & Jamstack',
    useCase: 'Production Web Platforms & E-Commerce',
    tags: ['Server Components', 'SSR / SSG', 'Edge Caching'],
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'frontend',
    desc: 'Strictly typed JavaScript ensuring type safety, maintainability, and enterprise code quality.',
    Logo: TSLogo,
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
    Logo: TailwindLogo,
    color: '#06b6d4',
    tier: 'Design System',
    useCase: 'Rapid Responsive UI & Mobile Layouts',
    tags: ['Responsive Design', 'Utility Classes', 'Design Tokens'],
  },
  {
    id: 'react-native',
    name: 'React Native',
    category: 'frontend',
    desc: 'Cross-platform mobile applications for iOS and Android sharing a unified enterprise TypeScript codebase.',
    Logo: ReactLogo,
    color: '#0284c7',
    tier: 'Mobile Engineering',
    useCase: 'iOS & Android Hybrid Apps',
    tags: ['Cross-Platform', 'Native Modules', 'Fast Refresh'],
  },

  // Backend & APIs
  {
    id: 'nodejs',
    name: 'Node.js & Express',
    category: 'backend',
    desc: 'Event-driven, asynchronous backend runtime for scalable microservices and REST APIs.',
    Logo: NodeLogo,
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
    Logo: PythonLogo,
    color: '#eab308',
    tier: 'AI & Data Services',
    useCase: 'Machine Learning Pipelines & AI Agents',
    tags: ['Async Python', 'Pydantic Types', 'Swagger Docs'],
  },
  {
    id: 'nestjs',
    name: 'NestJS & GraphQL',
    category: 'backend',
    desc: 'Progressive TypeScript framework for modular enterprise microservices and type-safe APIs.',
    Logo: TSLogo,
    color: '#e0234e',
    tier: 'Enterprise Backend',
    useCase: 'Scalable Microservices & GraphQL APIs',
    tags: ['Dependency Injection', 'GraphQL', 'Microservices'],
  },

  // Cloud & DevOps
  {
    id: 'aws',
    name: 'Amazon Web Services',
    category: 'cloud',
    desc: 'Enterprise cloud infrastructure: EC2, S3, RDS, Lambda, CloudFront, and VPC networking.',
    Logo: AWSLogo,
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
    Logo: DockerLogo,
    color: '#0284c7',
    tier: 'Containerization',
    useCase: 'Reproducible Deployments & Microservices',
    tags: ['Container Images', 'Docker Compose', 'CI/CD Ready'],
  },
  {
    id: 'github-actions',
    name: 'CI/CD & GitHub Actions',
    category: 'cloud',
    desc: 'Automated test execution, linting, Docker builds, and zero-downtime deployment pipelines.',
    Logo: DockerLogo,
    color: '#2088ff',
    tier: 'DevOps Automation',
    useCase: 'Continuous Delivery & Automated Testing',
    tags: ['Automated Testing', 'Docker Builds', 'Zero-Downtime'],
  },

  // AI & Data
  {
    id: 'llm',
    name: 'LLM Orchestration & RAG',
    category: 'ai',
    desc: 'Integration with frontier LLMs (Gemini, Claude, GPT) combined with vector search for custom context.',
    Logo: AILogo,
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
    Logo: PandasLogo,
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
    Logo: PostgresLogo,
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
    Logo: MongoLogo,
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
    Logo: RedisLogo,
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
        <div className={`animate-on-scroll ${isVisible ? 'visible' : ''}`} style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div className="tech-badge-top">
            <Sparkles size={14} className="badge-zap" />
            Verified Technology Stack
          </div>
          <h2 className="section-title">
            Modern, Proven &amp; <span className="gradient-text">Battle-Tested</span>
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
              aria-label="Search technologies, tags, or use cases"
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

        {/* Live Filter Indicator */}
        <div className="tech-status-summary">
          <span className="tech-count-badge">
            Showing <strong>{filteredTechnologies.length}</strong> of <strong>{technologies.length}</strong> Technologies
          </span>
          {searchQuery && (
            <span className="tech-query-badge">
              Keyword: &ldquo;{searchQuery}&rdquo;
            </span>
          )}
        </div>

        {/* Tech Grid or Empty State */}
        {filteredTechnologies.length === 0 ? (
          <div className="tech-empty-state">
            <div className="tech-empty-icon-box">
              <Sparkles size={28} className="empty-sparkle-icon" />
            </div>
            <h3 className="tech-empty-title">No technologies found matching &ldquo;{searchQuery}&rdquo;</h3>
            <p className="tech-empty-desc">
              Try searching for alternative keywords (e.g., &ldquo;React&rdquo;, &ldquo;API&rdquo;, &ldquo;Cloud&rdquo;, &ldquo;Docker&rdquo;) or reset your filters.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
              className="tech-empty-reset-btn"
            >
              Reset Search &amp; Filters
            </button>
          </div>
        ) : (
          <div className="tech-cards-grid">
            {filteredTechnologies.map((tech, idx) => {
              const Logo = tech.Logo

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
                        background: '#ffffff',
                        borderColor: `${tech.color}40`,
                        boxShadow: `0 4px 14px ${tech.color}15`
                      }}
                    >
                      <Logo size={26} />
                    </div>
                    <div className="tech-meta">
                      <span className="tech-tier-chip" style={{ color: tech.color, background: `${tech.color}12`, borderColor: `${tech.color}30` }}>
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
        )}
      </div>
    </section>
  )
}
