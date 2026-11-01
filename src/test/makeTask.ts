import type { Task } from '../types/task'

// Builds a task for tests. Pass only the fields a test cares about.
export function makeTask(overrides: Partial<Task> = {}): Task {
  return {
    id: crypto.randomUUID(),
    title: 'Test task',
    description: '',
    status: 'todo',
    priority: 'medium',
    category: 'General',
    createdAt: '2026-11-01T10:00:00.000Z',
    updatedAt: '2026-11-01T10:00:00.000Z',
    ...overrides,
  }
}
