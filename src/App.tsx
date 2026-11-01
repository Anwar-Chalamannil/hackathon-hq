import { useState } from 'react'
import Button from './components/common/Button'
import Modal from './components/common/Modal'
import TaskForm from './components/TaskForm/TaskForm'
import TaskList from './components/TaskList/TaskList'
import { useTasks } from './hooks/useTasks'
import type { NewTask, Task } from './types/task'
import './App.css'

function App() {
  const { tasks, addTask, updateTask, deleteTask } = useTasks()

  // Which popups are open. `null` means "closed".
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null)

  // Unique category names, for the form's suggestions
  const categories = [...new Set(tasks.map((task) => task.category))].sort()

  function openCreateForm() {
    setEditingTask(null)
    setIsFormOpen(true)
  }

  function openEditForm(task: Task) {
    setEditingTask(task)
    setIsFormOpen(true)
  }

  function closeForm() {
    setIsFormOpen(false)
    setEditingTask(null)
  }

  function handleFormSubmit(values: NewTask) {
    if (editingTask) {
      updateTask(editingTask.id, values)
    } else {
      addTask(values)
    }
    closeForm()
  }

  function confirmDelete() {
    if (taskToDelete) deleteTask(taskToDelete.id)
    setTaskToDelete(null)
  }

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <h1>Hackathon HQ</h1>
          <p className="app-tagline">Plan, track and ship your hackathon project.</p>
        </div>
        <Button variant="primary" onClick={openCreateForm}>
          + New task
        </Button>
      </header>

      <main className="app-main">
        <section aria-labelledby="tasks-heading">
          <h2 id="tasks-heading" className="section-title">
            Tasks <span className="section-count">{tasks.length}</span>
          </h2>
          <TaskList
            tasks={tasks}
            onStatusChange={(id, status) => updateTask(id, { status })}
            onEdit={openEditForm}
            onDelete={setTaskToDelete}
          />
        </section>
      </main>

      <Modal open={isFormOpen} title={editingTask ? 'Edit task' : 'New task'} onClose={closeForm}>
        <TaskForm
          initialTask={editingTask ?? undefined}
          categories={categories}
          onSubmit={handleFormSubmit}
          onCancel={closeForm}
        />
      </Modal>

      <Modal open={taskToDelete !== null} title="Delete task?" onClose={() => setTaskToDelete(null)}>
        <p className="confirm-text">
          “{taskToDelete?.title}” will be permanently deleted. This can’t be undone.
        </p>
        <div className="confirm-actions">
          <Button data-autofocus onClick={() => setTaskToDelete(null)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default App
