import TaskList from './components/TaskList/TaskList'
import { useTasks } from './hooks/useTasks'
import './App.css'

function App() {
  // addTask / updateTask / deleteTask get wired to buttons in Milestone 4.
  const { tasks } = useTasks()

  return (
    <div className="app">
      <header className="app-header">
        <h1>Hackathon HQ</h1>
        <p className="app-tagline">Plan, track and ship your hackathon project.</p>
      </header>
      <main className="app-main">
        <section aria-labelledby="tasks-heading">
          <h2 id="tasks-heading" className="section-title">
            Tasks <span className="section-count">{tasks.length}</span>
          </h2>
          <TaskList tasks={tasks} />
        </section>
      </main>
    </div>
  )
}

export default App
