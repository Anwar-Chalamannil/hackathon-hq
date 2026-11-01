// Turns a list of tasks into the numbers shown on the dashboard.
// It's a "pure function": same tasks in, same numbers out, no side effects.
// That makes it easy to test (Milestone 6) and safe to call on every render.
import type { Task } from '../types/task'
import { isOverdue, todayString } from './dates'

export interface TaskStats {
  total: number
  todo: number
  inProgress: number
  completed: number
  overdue: number
  percentComplete: number // 0–100, rounded
}

export function getTaskStats(tasks: Task[], today = todayString()): TaskStats {
  const stats: TaskStats = {
    total: tasks.length,
    todo: 0,
    inProgress: 0,
    completed: 0,
    overdue: 0,
    percentComplete: 0,
  }

  for (const task of tasks) {
    if (task.status === 'todo') stats.todo++
    if (task.status === 'in-progress') stats.inProgress++
    if (task.status === 'completed') stats.completed++
    if (isOverdue(task, today)) stats.overdue++
  }

  // Guard against dividing by zero when there are no tasks
  stats.percentComplete =
    stats.total === 0 ? 0 : Math.round((stats.completed / stats.total) * 100)

  return stats
}
