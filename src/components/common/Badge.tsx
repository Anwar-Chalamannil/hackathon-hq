import type { ReactNode } from 'react'
import './Badge.css'

export type BadgeTone = 'neutral' | 'blue' | 'amber' | 'green' | 'red'

interface BadgeProps {
  tone?: BadgeTone
  children: ReactNode
}

// A small coloured label. `tone` picks the colour; the text is up to the caller.
function Badge({ tone = 'neutral', children }: BadgeProps) {
  return <span className={`badge badge--${tone}`}>{children}</span>
}

export default Badge
