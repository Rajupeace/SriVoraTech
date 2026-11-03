import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { Award, Zap, ShieldCheck, CheckCircle2, Star } from 'lucide-react'
import './Achievements.css'

const metrics = [
  {
    number: '100%',
    label: 'Client Project Commitment',
    desc: 'Dedicated sprint milestones, transparent communication, and post-launch technical warranty on every build.',
    icon: Award,
    color: '#0067f4',
  },
  {
    number: '2–4 Wks',
    label: 'Rapid MVP Launch Sprint',
    desc: 'From initial architecture planning to live production release in record time without compromising code quality.',
    icon: Zap,
    color: '#8b5cf6',
  },
  {
    number: '99.9%',
    label: 'System Reliability Target',
    desc: 'Cloud architectures designed with automated failover, zero single-point-of-failure, and Docker orchestration.',
    icon: CheckCircle2,
    color: '#10b981',
  },
  {
    number: '100%',
    label: 'Full IP & Codebase Ownership',
    desc: 'Immediate transfer of all source code, git repositories, IP rights, and cloud deployment credentials to your business.',
    icon: ShieldCheck,
    color: '#ec4899',
  },
]

export default function Achievements() {
  const [ref, isVisible] = useScrollAnimation()

  return (
    <section className="achievements section" id="achievements">
      <div className="container">
        <div ref={ref} className={`animate-on-scroll ${isVisible ? 'visible' : ''}`}>
          <div className="achievements-badge">
            <Star size={14} />
            Proven Excellence
          </div>
          <h2 className="section-title">
            Our Core <span className="gradient-text">Engineering Standards</span>
          </h2>
          <p className="section-subtitle">
            Measurable commitments that reflect our focus on software quality, security, and long-term business value.
          </p>
        </div>

        <div className="achievements-metrics-grid">
          {metrics.map((m) => {
            const Icon = m.icon
            return (
              <div
                key={m.label}
                className="metric-card glass-card"
                style={{ '--metric-color': m.color }}
              >
                <div className="metric-icon-box" style={{ background: `${m.color}15`, color: m.color }}>
                  <Icon size={24} />
                </div>
                <h3 className="metric-number" style={{ color: m.color }}>{m.number}</h3>
                <h4 className="metric-label">{m.label}</h4>
                <p className="metric-desc">{m.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
