import { describe, expect, it } from 'vitest'
import { makeTask } from '../test/makeTask'
import { loadTasks, saveTasks } from './taskStorage'

describe('taskStorage', () => {
  it('returns null when nothing has been saved yet', () => {
    expect(loadTasks()).toBeNull()
  })

  it('loads exactly what was saved', () => {
    const tasks = [makeTask({ title: 'Saved task' })]
    saveTasks(tasks)
    expect(loadTasks()).toEqual(tasks)
  })

  it('returns null instead of crashing when the saved data is broken', () => {
    localStorage.setItem('hackathon-hq:tasks', '{not valid json')
    expect(loadTasks()).toBeNull()

    localStorage.setItem('hackathon-hq:tasks', '{"not": "an array"}')
    expect(loadTasks()).toBeNull()
  })
})
