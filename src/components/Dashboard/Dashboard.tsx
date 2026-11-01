import type { Task } from '../../types/task'
import { getTaskStats } from '../../utils/taskStats'
import StatCard from './StatCard'
import './Dashboard.css'

interface DashboardProps {
  tasks: Task[]
}

function Dashboard({ tasks }: DashboardProps) {
  // Stats are calculated from tasks every render, never stored separately,
  // so they can't get out of sync with the real list.
  const stats = getTaskStats(tasks)

  return (
    <section className="dashboard" aria-labelledby="dashboard-heading">
      <h2 id="dashboard-heading" className="section-title">
        Overview
      </h2>

      <div className="dashboard__progress">
        <div className="dashboard__progress-text">
          <span className="dashboard__percent">{stats.percentComplete}%</span>
          <span className="dashboard__progress-label">
            {stats.completed} of {stats.total} tasks completed
          </span>
        </div>
        {/* role="progressbar" + aria-value* lets screen readers announce progress */}
        <div
          className="dashboard__bar"
          role="progressbar"
          aria-label="Project progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={stats.percentComplete}
        >
          <div className="dashboard__bar-fill" style={{ width: `${stats.percentComplete}%` }} />
        </div>
      </div>

      <div className="dashboard__stats">
        <StatCard label="Total tasks" value={stats.total} />
        <StatCard label="To Do" value={stats.todo} />
        <StatCard label="In Progress" value={stats.inProgress} tone="blue" />
        <StatCard label="Completed" value={stats.completed} tone="green" />
        <StatCard label="Overdue" value={stats.overdue} tone={stats.overdue > 0 ? 'red' : 'neutral'} />
      </div>
    </section>
  )
}

export default Dashboard
