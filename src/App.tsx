import { useTasks } from './hooks/useTasks'
import { PRIORITY_LABELS, STATUS_LABELS } from './types/task'
import './App.css'

function App() {
  const { tasks, addTask, updateTask, deleteTask } = useTasks()

  // TEMPORARY (Milestone 2): a bare-bones list to prove the data layer works.
  // Milestone 3 replaces this with real task cards.
  function addTestTask() {
    addTask({
      title: `Test task ${tasks.length + 1}`,
      description: '',
      status: 'todo',
      priority: 'low',
      category: 'Test',
    })
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Hackathon HQ</h1>
        <p className="app-tagline">Plan, track and ship your hackathon project.</p>
      </header>
      <main className="app-main">
        <p>
          {tasks.length} tasks. <button onClick={addTestTask}>Add test task</button>
        </p>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <strong>{task.title}</strong> · {STATUS_LABELS[task.status]} ·{' '}
              {PRIORITY_LABELS[task.priority]} · {task.category}
              {task.dueDate && ` · due ${task.dueDate}`}{' '}
              <button onClick={() => updateTask(task.id, { status: 'completed' })}>
                Complete
              </button>{' '}
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}

export default App
