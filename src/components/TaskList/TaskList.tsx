import type { Task } from '../../types/task'
import TaskCard from './TaskCard'
import './TaskList.css'

interface TaskListProps {
  tasks: Task[]
}

function TaskList({ tasks }: TaskListProps) {
  if (tasks.length === 0) {
    return <p className="task-list__empty">No tasks yet.</p>
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        // `key` helps React track which card is which when the list changes
        <li key={task.id}>
          <TaskCard task={task} />
        </li>
      ))}
    </ul>
  )
}

export default TaskList
