import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { Award, Zap, ShieldCheck, CheckCircle2, Star } from 'lucide-react'
import './Achievements.css'

const metrics = [
  {
    number: 'Dedicated',
    label: 'Engineering Focus',
    desc: 'Structured sprint milestones, direct engineer communication, and post-launch technical warranty on every build.',
    icon: Award,
    color: '#0067f4',
  },
  {
    number: '2–4 Wks',
    label: 'Target MVP Sprint',
    desc: 'From initial architecture planning to working preview deployment via agile bi-weekly development cycles.',
    icon: Zap,
    color: '#8b5cf6',
  },
  {
    number: '99.9%',
    label: 'Architecture Uptime Target',
    desc: 'Cloud architectures designed with automated failover, health monitoring, and Docker containerization.',
    icon: CheckCircle2,
    color: '#10b981',
  },
  {
    number: '100%',
    label: 'Full IP & Code Ownership',
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
            Engineering Standards
          </div>
          <h2 className="section-title">
            Our Core <span className="gradient-text">Engineering Standards</span>
          </h2>
          <p className="section-subtitle">
            Commitments that reflect our focus on software quality, security, and transparent client partnership.
          </p>
        </div>

        <div className="achievements-metrics-grid">
          {metrics.map((m) => {
            const Icon = m.icon
            return (
              <div
                key={m.label}
                className="achievement-metric-card"
                style={{ '--metric-color': m.color }}
              >
                <div className="metric-icon-box" style={{ background: `${m.color}15`, color: m.color }}>
                  <Icon size={24} />
                </div>
                <div className="metric-content">
                  <div className="metric-number" style={{ color: m.color }}>{m.number}</div>
                  <div className="metric-label">{m.label}</div>
                  <p className="metric-desc">{m.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
