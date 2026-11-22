import { Rocket, ShieldCheck, Cloud } from 'lucide-react'
import './TrustTicker.css'

export default function TrustTicker() {
  const proofPoints = [
    {
      icon: Rocket,
      title: 'Iterative Agile Sprints',
      desc: 'Weekly milestone releases, interactive staging previews, and rapid continuous delivery.',
      badge: 'Speed & Agility'
    },
    {
      icon: ShieldCheck,
      title: 'Full Source Code Ownership',
      desc: '100% intellectual property transfer with complete Git repositories and root credentials.',
      badge: 'Zero Vendor Lock-In'
    },
    {
      icon: Cloud,
      title: 'Cloud Architecture',
      desc: 'Enterprise-grade microservices, multi-region AWS/Vercel redundancy, and 99.9% uptime SLA.',
      badge: 'Enterprise Scalability'
    }
  ]

  return (
    <section className="proof-points-section" aria-label="Core Engineering Pillars">
      <div className="container">
        <div className="proof-points-grid">
          {proofPoints.map((point, idx) => {
            const Icon = point.icon
            return (
              <div key={idx} className="proof-point-card">
                <div className="proof-point-header">
                  <div className="proof-point-icon-box">
                    <Icon size={20} />
                  </div>
                  <span className="proof-point-badge">{point.badge}</span>
                </div>
                <h3 className="proof-point-title">{point.title}</h3>
                <p className="proof-point-desc">{point.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
