import { useState } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { Clock, TrendingDown, Users, Puzzle, ShieldAlert, AlertTriangle, CheckCircle2, RotateCw } from 'lucide-react'
import './Challenges.css'

const challenges = [
  {
    icon: <Clock size={22} />,
    problem: 'Slow Time-to-Market',
    problemDesc: 'Traditional agency cycles take months, delaying crucial market validation and customer acquisition.',
    solution: 'Agile Milestone Delivery',
    solutionDesc: 'We ship clean, production-grade code in structured bi-weekly sprints aligned with your release goals.',
    stat: 'Sprint-Based',
    statLabel: 'Agile Velocity',
  },
  {
    icon: <TrendingDown size={22} />,
    problem: 'Inconsistent Quality & Bugs',
    problemDesc: 'Fragmented code with zero documentation leads to high technical debt and costly rebuilds.',
    solution: 'Full Type-Safety & Automated CI/CD',
    solutionDesc: 'Built with TypeScript, automated test suites, strict linting, and systematic code reviews.',
    stat: 'Zero-Debt',
    statLabel: 'Clean Architecture',
  },
  {
    icon: <Users size={22} />,
    problem: 'Hiring & Retaining Risks',
    problemDesc: 'Recruiting full-time engineers incurs long recruitment delays, overhead, and onboarding friction.',
    solution: 'Dedicated Engineering Pods',
    solutionDesc: 'Access experienced full-stack developers, AI engineers, and UI/UX designers with flexible engagements.',
    stat: 'Flexible',
    statLabel: 'Scalable Pods',
  },
  {
    icon: <Puzzle size={22} />,
    problem: 'Scalability Bottlenecks',
    problemDesc: 'Monoliths built without foresight fail under traffic spikes and concurrent load.',
    solution: 'Cloud-Native Auto Scaling',
    solutionDesc: 'Containerized services and serverless functions engineered on AWS with load balancing and multi-AZ resilience.',
    stat: 'Multi-AZ',
    statLabel: 'Elastic Scaling',
  },
  {
    icon: <ShieldAlert size={22} />,
    problem: 'Security Vulnerabilities',
    problemDesc: 'Neglecting security exposes business logic and sensitive customer data to unauthorized access.',
    solution: 'Enterprise Security by Design',
    solutionDesc: 'Role-based access control, encrypted secrets management, and OWASP Top 10 security standards.',
    stat: 'OWASP',
    statLabel: 'Defense Standards',
  },
  {
    icon: <AlertTriangle size={22} />,
    problem: 'Poor UI/UX & High Churn',
    problemDesc: 'Confusing user journeys cause high bounce rates and abandonment across key workflows.',
    solution: 'Modern Figma UI/UX & Design Systems',
    solutionDesc: 'Intuitive user journeys, accessible components, and modern responsive layouts that keep users engaged.',
    stat: 'WCAG 2.1',
    statLabel: 'Design Standards',
  },
]

function ChallengeCard({ item, idx, isFlipped, toggleFlip }) {
  return (
    <div
      className="challenge-card-wrapper"
      onClick={() => toggleFlip(idx)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          toggleFlip(idx)
        }
      }}
    >
      <div className={`challenge-card-flipper ${isFlipped ? 'flipped' : ''}`}>
        {/* FRONT — Problem side */}
        <div className="challenge-card challenge-front">
          <div className="challenge-problem-side">
            <div className="problem-pill">Problem</div>
            <div className="challenge-icon-box">{item.icon}</div>
            <h3 className="problem-title">{item.problem}</h3>
            <p className="problem-desc">{item.problemDesc}</p>
          </div>
          <div className="card-flip-hint">
            <RotateCw size={13} /> Click to see solution
          </div>
        </div>

        {/* BACK — Solution side */}
        <div className="challenge-card challenge-back">
          <div className="challenge-solution-side">
            <div className="solution-pill">
              <CheckCircle2 size={12} /> Solution
            </div>
            <h4 className="solution-title">{item.solution}</h4>
            <p className="solution-desc">{item.solutionDesc}</p>
            <div className="solution-stat-chip">
              <strong className="stat-value">{item.stat}</strong>
              <span className="stat-label">{item.statLabel}</span>
            </div>
          </div>
          <div className="card-flip-hint back-hint">
            <RotateCw size={13} /> Flip back
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Challenges() {
  const [ref, isVisible] = useScrollAnimation()
  const [flippedCards, setFlippedCards] = useState({})

  const toggleFlip = (idx) => {
    setFlippedCards(prev => ({ ...prev, [idx]: !prev[idx] }))
  }

  const solvedCount = Object.values(flippedCards).filter(Boolean).length

  return (
    <section className="challenges section" id="challenges">
      <div className="container">
        <div ref={ref} className={`animate-on-scroll ${isVisible ? 'visible' : ''}`}>
          <div className="challenges-badge-top">
            <AlertTriangle size={14} />
            Overcoming Roadblocks
          </div>
          <h2 className="section-title">
            The Problems We <span className="gradient-text">Solve</span>
          </h2>
          <p className="section-subtitle">
            How SriVoraTech transforms common digital engineering bottlenecks into unfair competitive advantages.
            <span className="flip-hint">Click any card to reveal our solution →</span>
          </p>

          {/* Progress tracker */}
          <div className="challenges-progress-bar">
            <div className="progress-fill" style={{ width: `${(solvedCount / challenges.length) * 100}%` }} />
            <span className="progress-label">
              <CheckCircle2 size={13} /> {solvedCount} / {challenges.length} Solutions Revealed
            </span>
          </div>
        </div>

        <div className="challenges-grid">
          {challenges.map((item, idx) => (
            <ChallengeCard
              key={item.problem}
              item={item}
              idx={idx}
              isFlipped={!!flippedCards[idx]}
              toggleFlip={toggleFlip}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
