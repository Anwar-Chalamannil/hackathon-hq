// Example tasks shown on the very first visit, so the app isn't empty.
// Due dates are relative to today, so there's always one overdue task to show.
import type { Task } from '../types/task'

// Returns a 'YYYY-MM-DD' string `days` from today, in local time.
function daysFromToday(days: number): string {
  const date = new Date()
  date.setDate(date.getDate() + days)
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}

export function createSampleTasks(): Task[] {
  const now = new Date().toISOString()
  const base = { createdAt: now, updatedAt: now }

  return [
    {
      ...base,
      id: crypto.randomUUID(),
      title: 'Read the judging criteria',
      description: 'List every criterion and how many points it is worth.',
      status: 'completed',
      priority: 'high',
      category: 'Research',
      dueDate: daysFromToday(-2),
    },
    {
      ...base,
      id: crypto.randomUUID(),
      title: 'Interview 3 potential users',
      description: 'Confirm the problem is real before building.',
      status: 'in-progress',
      priority: 'high',
      category: 'Research',
      dueDate: daysFromToday(-1),
    },
    {
      ...base,
      id: crypto.randomUUID(),
      title: 'Sketch the main screens',
      description: 'Dashboard, task list and task form, on paper first.',
      status: 'todo',
      priority: 'medium',
      category: 'Design',
      dueDate: daysFromToday(1),
    },
    {
      ...base,
      id: crypto.randomUUID(),
      title: 'Draft the 3-minute pitch',
      description: 'Problem, solution, live demo, impact, team.',
      status: 'todo',
      priority: 'medium',
      category: 'Pitch',
      dueDate: daysFromToday(3),
    },
    {
      ...base,
      id: crypto.randomUUID(),
      title: 'Set up the GitHub repo',
      description: '',
      status: 'todo',
      priority: 'low',
      category: 'Setup',
    },
  ]
}
