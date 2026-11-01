import type { BadgeTone } from '../common/Badge'
import './StatCard.css'

interface StatCardProps {
  label: string
  value: number
  tone?: BadgeTone // reuses the badge colours for the accent stripe
}

function StatCard({ label, value, tone = 'neutral' }: StatCardProps) {
  return (
    <div className={`stat-card stat-card--${tone}`}>
      <span className="stat-card__value">{value}</span>
      <span className="stat-card__label">{label}</span>
    </div>
  )
}

export default StatCard
