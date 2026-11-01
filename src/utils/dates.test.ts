import { describe, expect, it } from 'vitest'
import { makeTask } from '../test/makeTask'
import { formatDueDate, isOverdue, toDateString, todayString } from './dates'

describe('toDateString', () => {
  it('formats a date as YYYY-MM-DD with zero padding', () => {
    expect(toDateString(new Date(2026, 0, 5))).toBe('2026-01-05') // month 0 = January
  })
})

describe('isOverdue', () => {
  const today = '2026-11-10'

  it('is true when the due date has passed and the task is not completed', () => {
    expect(isOverdue(makeTask({ dueDate: '2026-11-09' }), today)).toBe(true)
  })

  it('is false when the task is due today or later', () => {
    expect(isOverdue(makeTask({ dueDate: '2026-11-10' }), today)).toBe(false)
    expect(isOverdue(makeTask({ dueDate: '2026-12-01' }), today)).toBe(false)
  })

  it('is false for completed tasks, even if late', () => {
    expect(isOverdue(makeTask({ dueDate: '2026-11-01', status: 'completed' }), today)).toBe(false)
  })

  it('is false when there is no due date', () => {
    expect(isOverdue(makeTask(), today)).toBe(false)
  })
})

describe('formatDueDate', () => {
  it('says "today" and "tomorrow" for those days', () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)

    expect(formatDueDate(todayString())).toBe('today')
    expect(formatDueDate(toDateString(tomorrow))).toBe('tomorrow')
  })

  it('shows other dates with the day number', () => {
    expect(formatDueDate('2026-03-15', '2026-11-10')).toContain('15')
  })
})
