// The ONLY file that knows where tasks are saved.
// Today that's the browser's localStorage; later we'll swap these two
// functions for Supabase and the rest of the app won't need to change.
import type { Task } from '../types/task'

const STORAGE_KEY = 'hackathon-hq:tasks'

/**
 * Returns the saved tasks, or `null` if nothing has been saved yet
 * (first visit). Corrupted data is treated as "nothing saved".
 */
export function loadTasks(): Task[] | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw === null) return null

    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as Task[]) : null
  } catch {
    // Invalid JSON, or storage blocked (e.g. some private browsing modes)
    return null
  }
}

export function saveTasks(tasks: Task[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  } catch (error) {
    // Storage full or blocked: keep the app working, just warn.
    console.warn('Could not save tasks', error)
  }
}
