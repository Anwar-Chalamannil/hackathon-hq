import { describe, expect, it } from 'vitest'
import { makeTask } from '../test/makeTask'
import type { Task } from '../types/task'
import { DEFAULT_FILTERS, filterTasks, hasActiveFilters, sortTasks } from './taskFilters'

const titles = (list: Task[]) => list.map((task) => task.title)

const tasks = [
  makeTask({ title: 'Design logo', category: 'Design', priority: 'low', status: 'todo' }),
  makeTask({
    title: 'Write pitch',
    description: 'Three minutes',
    category: 'Pitch',
    priority: 'high',
    status: 'completed',
  }),
  makeTask({ title: 'API routes', category: 'Backend', priority: 'medium', status: 'in-progress' }),
]

describe('filterTasks', () => {
  it('returns every task with the default filters', () => {
    expect(filterTasks(tasks, DEFAULT_FILTERS)).toHaveLength(3)
  })

  it('searches title, description and category, ignoring case', () => {
    expect(titles(filterTasks(tasks, { ...DEFAULT_FILTERS, search: 'PITCH' }))).toEqual(['Write pitch'])
    expect(titles(filterTasks(tasks, { ...DEFAULT_FILTERS, search: 'minutes' }))).toEqual(['Write pitch'])
    expect(titles(filterTasks(tasks, { ...DEFAULT_FILTERS, search: 'backend' }))).toEqual(['API routes'])
  })

  it('filters by status, priority and category', () => {
    expect(titles(filterTasks(tasks, { ...DEFAULT_FILTERS, status: 'in-progress' }))).toEqual(['API routes'])
    expect(titles(filterTasks(tasks, { ...DEFAULT_FILTERS, priority: 'low' }))).toEqual(['Design logo'])
    expect(titles(filterTasks(tasks, { ...DEFAULT_FILTERS, category: 'Design' }))).toEqual(['Design logo'])
  })

  it('combines filters (a task must match all of them)', () => {
    expect(filterTasks(tasks, { ...DEFAULT_FILTERS, status: 'completed', category: 'Design' })).toEqual([])
  })
})

describe('hasActiveFilters', () => {
  it('is false for defaults and for a search of only spaces', () => {
    expect(hasActiveFilters(DEFAULT_FILTERS)).toBe(false)
    expect(hasActiveFilters({ ...DEFAULT_FILTERS, search: '   ' })).toBe(false)
  })

  it('is true when anything is set', () => {
    expect(hasActiveFilters({ ...DEFAULT_FILTERS, priority: 'high' })).toBe(true)
  })
})

describe('sortTasks', () => {
  const dated = [
    makeTask({ title: 'No date', priority: 'high', createdAt: '2026-11-03T00:00:00.000Z' }),
    makeTask({
      title: 'Later',
      priority: 'low',
      dueDate: '2026-11-20',
      createdAt: '2026-11-01T00:00:00.000Z',
    }),
    makeTask({
      title: 'Sooner',
      priority: 'high',
      dueDate: '2026-11-05',
      createdAt: '2026-11-02T00:00:00.000Z',
    }),
  ]

  it('sorts newest first', () => {
    expect(titles(sortTasks(dated, 'newest'))).toEqual(['No date', 'Sooner', 'Later'])
  })

  it('sorts by due date, with undated tasks last', () => {
    expect(titles(sortTasks(dated, 'due-date'))).toEqual(['Sooner', 'Later', 'No date'])
  })

  it('sorts by priority, breaking ties by due date', () => {
    expect(titles(sortTasks(dated, 'priority'))).toEqual(['Sooner', 'No date', 'Later'])
  })

  it('does not change the original array', () => {
    const before = titles(dated)
    sortTasks(dated, 'due-date')
    expect(titles(dated)).toEqual(before)
  })
})
