import { describe, expect, it } from 'vitest'
import { makeTask } from '../test/makeTask'
import { getTaskStats } from './taskStats'

describe('getTaskStats', () => {
  it('returns all zeros for an empty list (and does not divide by zero)', () => {
    expect(getTaskStats([])).toEqual({
      total: 0,
      todo: 0,
      inProgress: 0,
      completed: 0,
      overdue: 0,
      percentComplete: 0,
    })
  })

  it('counts tasks by status, overdue tasks and percent complete', () => {
    const tasks = [
      makeTask({ status: 'todo', dueDate: '2026-11-01' }), // overdue
      makeTask({ status: 'in-progress' }),
      makeTask({ status: 'completed', dueDate: '2026-11-01' }), // late but done: not overdue
    ]

    expect(getTaskStats(tasks, '2026-11-10')).toEqual({
      total: 3,
      todo: 1,
      inProgress: 1,
      completed: 1,
      overdue: 1,
      percentComplete: 33, // 1 of 3, rounded
    })
  })
})
