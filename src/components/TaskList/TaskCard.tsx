import Badge, { type BadgeTone } from '../common/Badge'
import {
  PRIORITY_LABELS,
  STATUS_LABELS,
  type Task,
  type TaskPriority,
  type TaskStatus,
} from '../../types/task'
import { formatDueDate, isOverdue } from '../../utils/dates'
import './TaskCard.css'

// Which colour each status / priority gets.
const STATUS_TONES: Record<TaskStatus, BadgeTone> = {
  todo: 'neutral',
  'in-progress': 'blue',
  completed: 'green',
}

const PRIORITY_TONES: Record<TaskPriority, BadgeTone> = {
  low: 'neutral',
  medium: 'amber',
  high: 'red',
}

interface TaskCardProps {
  task: Task
}

function TaskCard({ task }: TaskCardProps) {
  const overdue = isOverdue(task)
  const completed = task.status === 'completed'

  return (
    <article className={`task-card${completed ? ' task-card--completed' : ''}`}>
      <div className="task-card__badges">
        <Badge tone={STATUS_TONES[task.status]}>{STATUS_LABELS[task.status]}</Badge>
        <Badge tone={PRIORITY_TONES[task.priority]}>
          {PRIORITY_LABELS[task.priority]} priority
        </Badge>
      </div>

      <h3 className="task-card__title">{task.title}</h3>

      {task.description && <p className="task-card__description">{task.description}</p>}

      <footer className="task-card__footer">
        <span className="task-card__category">{task.category}</span>
        {task.dueDate && (
          <span className={`task-card__due${overdue ? ' task-card__due--overdue' : ''}`}>
            {/* <time> tells browsers and screen readers this is a date */}
            {overdue ? 'Overdue · ' : 'Due '}
            <time dateTime={task.dueDate}>{formatDueDate(task.dueDate)}</time>
          </span>
        )}
      </footer>
    </article>
  )
}

export default TaskCard
