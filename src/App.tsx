import { useState } from 'react'
import Button from './components/common/Button'
import Modal from './components/common/Modal'
import Dashboard from './components/Dashboard/Dashboard'
import Filters from './components/Filters/Filters'
import TaskForm from './components/TaskForm/TaskForm'
import TaskList from './components/TaskList/TaskList'
import { useTasks } from './hooks/useTasks'
import type { NewTask, Task } from './types/task'
import {
  DEFAULT_FILTERS,
  filterTasks,
  hasActiveFilters,
  sortTasks,
  type SortOption,
  type TaskFilters,
} from './utils/taskFilters'
import './App.css'

function App() {
  const { tasks, addTask, updateTask, deleteTask, addSampleTasks } = useTasks()

  // Which popups are open. `null` means "closed".
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null)

  const [filters, setFilters] = useState<TaskFilters>(DEFAULT_FILTERS)
  const [sort, setSort] = useState<SortOption>('newest')

  // Unique category names, for the form's suggestions and the category filter
  const categories = [...new Set(tasks.map((task) => task.category))].sort()

  // Derived from tasks + filters + sort on every render (like the dashboard stats)
  const visibleTasks = sortTasks(filterTasks(tasks, filters), sort)
  const isFiltered = hasActiveFilters(filters)

  // If you delete the last task in the filtered category, keep that category
  // in the dropdown so the filter still shows what's selected
  const filterCategories =
    filters.category === 'all' || categories.includes(filters.category)
      ? categories
      : [...categories, filters.category]

  function clearFilters() {
    setFilters(DEFAULT_FILTERS)
  }

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
        <Dashboard tasks={tasks} />

        <section aria-labelledby="tasks-heading">
          <h2 id="tasks-heading" className="section-title">
            Tasks{' '}
            <span className="section-count">
              {isFiltered ? `${visibleTasks.length} of ${tasks.length}` : tasks.length}
            </span>
          </h2>
          {/* Screen readers announce changes inside role="status" automatically */}
          <p role="status" className="visually-hidden">
            {isFiltered ? `Showing ${visibleTasks.length} of ${tasks.length} tasks` : ''}
          </p>
          <Filters
            filters={filters}
            sort={sort}
            categories={filterCategories}
            onFiltersChange={setFilters}
            onSortChange={setSort}
            onClear={clearFilters}
          />
          <TaskList
            tasks={visibleTasks}
            onStatusChange={(id, status) => updateTask(id, { status })}
            onEdit={openEditForm}
            onDelete={setTaskToDelete}
            emptyMessage={
              isFiltered ? (
                <>
                  <p>No tasks match your filters.</p>
                  <Button size="sm" onClick={clearFilters}>
                    Clear filters
                  </Button>
                </>
              ) : (
                <>
                  <p className="empty-title">No tasks yet</p>
                  <p>Break your hackathon project into small tasks to track progress.</p>
                  <div className="empty-actions">
                    <Button variant="primary" onClick={openCreateForm}>
                      + New task
                    </Button>
                    <Button onClick={addSampleTasks}>Add sample tasks</Button>
                  </div>
                </>
              )
            }
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
