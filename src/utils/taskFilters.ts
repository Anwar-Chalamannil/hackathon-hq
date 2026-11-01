// Search, filter and sort: pure functions that take a task list and return
// a NEW list. The original list (and what's saved) is never changed.
import type { Task, TaskPriority, TaskStatus } from '../types/task'

export interface TaskFilters {
  search: string
  status: TaskStatus | 'all'
  priority: TaskPriority | 'all'
  category: string // a category name, or 'all'
}

export const DEFAULT_FILTERS: TaskFilters = {
  search: '',
  status: 'all',
  priority: 'all',
  category: 'all',
}

export const SORT_OPTIONS = ['newest', 'due-date', 'priority'] as const
export type SortOption = (typeof SORT_OPTIONS)[number]

export const SORT_LABELS: Record<SortOption, string> = {
  newest: 'Newest first',
  'due-date': 'Due date',
  priority: 'Priority',
}

export function hasActiveFilters(filters: TaskFilters): boolean {
  return (
    filters.search.trim() !== '' ||
    filters.status !== 'all' ||
    filters.priority !== 'all' ||
    filters.category !== 'all'
  )
}

export function filterTasks(tasks: Task[], filters: TaskFilters): Task[] {
  // Lowercase both sides so "PITCH" finds "Draft the pitch"
  const query = filters.search.trim().toLowerCase()

  return tasks.filter((task) => {
    if (filters.status !== 'all' && task.status !== filters.status) return false
    if (filters.priority !== 'all' && task.priority !== filters.priority) return false
    if (filters.category !== 'all' && task.category !== filters.category) return false

    if (query) {
      const text = `${task.title} ${task.description} ${task.category}`.toLowerCase()
      if (!text.includes(query)) return false
    }

    return true
  })
}

const PRIORITY_RANK: Record<TaskPriority, number> = { high: 0, medium: 1, low: 2 }

// Earlier due dates first; tasks with no due date go to the end.
function compareDueDates(a: Task, b: Task): number {
  if (a.dueDate === b.dueDate) return 0
  if (!a.dueDate) return 1
  if (!b.dueDate) return -1
  return a.dueDate < b.dueDate ? -1 : 1
}

export function sortTasks(tasks: Task[], sort: SortOption): Task[] {
  // .sort() changes the array it's called on, so sort a copy
  const sorted = [...tasks]

  switch (sort) {
    case 'newest':
      return sorted.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    case 'due-date':
      return sorted.sort(compareDueDates)
    case 'priority':
      // High first; equal priorities are ordered by due date
      return sorted.sort(
        (a, b) => PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority] || compareDueDates(a, b),
      )
  }
}
