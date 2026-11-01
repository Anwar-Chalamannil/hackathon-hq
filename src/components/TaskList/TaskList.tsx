import type { ReactNode } from 'react'
import type { Task, TaskStatus } from '../../types/task'
import TaskCard from './TaskCard'
import './TaskList.css'

interface TaskListProps {
  tasks: Task[]
  onStatusChange: (id: string, status: TaskStatus) => void
  onEdit: (task: Task) => void
  onDelete: (task: Task) => void
  emptyMessage?: ReactNode // what to show when the list is empty
}

function TaskList({
  tasks,
  onStatusChange,
  onEdit,
  onDelete,
  emptyMessage = 'No tasks yet.',
}: TaskListProps) {
  if (tasks.length === 0) {
    return <div className="task-list__empty">{emptyMessage}</div>
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        // `key` helps React track which card is which when the list changes
        <li key={task.id}>
          <TaskCard
            task={task}
            onStatusChange={(status) => onStatusChange(task.id, status)}
            onEdit={() => onEdit(task)}
            onDelete={() => onDelete(task)}
          />
        </li>
      ))}
    </ul>
  )
}

export default TaskList
