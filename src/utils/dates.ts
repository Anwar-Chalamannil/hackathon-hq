// Small date helpers. We store due dates as 'YYYY-MM-DD' strings, which
// have a handy property: comparing them as text also compares them as dates
// ('2026-11-02' < '2026-11-10' is true).
import type { Task } from '../types/task'

// Turns a Date into 'YYYY-MM-DD' using the user's LOCAL time.
// (toISOString() would use UTC, which can be a day off in Qatar at night.)
export function toDateString(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}

export function todayString(): string {
  return toDateString(new Date())
}

// A task is overdue if its due date has passed and it isn't finished yet.
export function isOverdue(task: Task, today = todayString()): boolean {
  return task.dueDate !== undefined && task.status !== 'completed' && task.dueDate < today
}

// '2026-11-02' -> 'today', 'tomorrow', or e.g. 'Mon, 2 Nov'
export function formatDueDate(dueDate: string, today = todayString()): string {
  if (dueDate === today) return 'today'

  const [year, month, day] = dueDate.split('-').map(Number)
  const date = new Date(year, month - 1, day) // months start at 0 in JavaScript

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  if (dueDate === toDateString(tomorrow)) return 'tomorrow'

  return date.toLocaleDateString(undefined, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  })
}
