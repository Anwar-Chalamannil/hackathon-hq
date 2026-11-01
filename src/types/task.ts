// The shape of our data. Every other file imports these types,
// so TypeScript can warn us if we use a task the wrong way.

// `as const` makes these exact, read-only lists. We use them both as
// types (below) and as real values (e.g. to build <select> options later).
export const TASK_STATUSES = ['todo', 'in-progress', 'completed'] as const
export const TASK_PRIORITIES = ['low', 'medium', 'high'] as const

// "One of the values in the list above", e.g. 'todo' | 'in-progress' | 'completed'
export type TaskStatus = (typeof TASK_STATUSES)[number]
export type TaskPriority = (typeof TASK_PRIORITIES)[number]

// Human-friendly text for the UI. `Record` forces us to cover every value.
export const STATUS_LABELS: Record<TaskStatus, string> = {
  todo: 'To Do',
  'in-progress': 'In Progress',
  completed: 'Completed',
}

export const PRIORITY_LABELS: Record<TaskPriority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
}

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  category: string
  dueDate?: string // 'YYYY-MM-DD', the same format <input type="date"> uses
  createdAt: string // ISO timestamp, e.g. '2026-11-01T18:30:00.000Z'
  updatedAt: string
}

// What the user fills in when creating a task. The app adds the rest.
export type NewTask = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>

// When editing, any subset of those fields can change.
export type TaskChanges = Partial<NewTask>
