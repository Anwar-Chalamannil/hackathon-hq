// A custom hook: one place that owns the task list and the actions on it.
// Components call `useTasks()` and never touch storage directly.
import { useEffect, useState } from 'react'
import { createSampleTasks } from '../data/sampleTasks'
import { loadTasks, saveTasks } from '../services/taskStorage'
import type { NewTask, Task, TaskChanges } from '../types/task'

export function useTasks() {
  // Passing a function means it only runs once, on the first render,
  // instead of re-reading storage every time the component re-renders.
  const [tasks, setTasks] = useState<Task[]>(
    () => loadTasks() ?? createSampleTasks(),
  )

  // Whenever `tasks` changes, save it. This is what makes data survive a reload.
  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  function addTask(newTask: NewTask) {
    const now = new Date().toISOString()
    const task: Task = {
      ...newTask,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    }
    // Always build a NEW array instead of changing the old one;
    // that's how React notices something changed.
    setTasks((current) => [task, ...current])
  }

  function updateTask(id: string, changes: TaskChanges) {
    const now = new Date().toISOString()
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, ...changes, updatedAt: now } : task,
      ),
    )
  }

  function deleteTask(id: string) {
    setTasks((current) => current.filter((task) => task.id !== id))
  }

  // Handy for demos: refill an empty board with the example tasks
  function addSampleTasks() {
    setTasks((current) => [...current, ...createSampleTasks()])
  }

  return { tasks, addTask, updateTask, deleteTask, addSampleTasks }
}
