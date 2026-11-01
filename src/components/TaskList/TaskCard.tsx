import Badge, { type BadgeTone } from '../common/Badge'
import Button from '../common/Button'
import {
  PRIORITY_LABELS,
  STATUS_LABELS,
  TASK_STATUSES,
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
  onStatusChange: (status: TaskStatus) => void
  onEdit: () => void
  onDelete: () => void
}

function TaskCard({ task, onStatusChange, onEdit, onDelete }: TaskCardProps) {
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

      <div className="task-card__actions">
        <select
          className="field-control task-card__status"
          value={task.status}
          aria-label={`Status of ${task.title}`}
          onChange={(event) => onStatusChange(event.target.value as TaskStatus)}
        >
          {TASK_STATUSES.map((value) => (
            <option key={value} value={value}>
              {STATUS_LABELS[value]}
            </option>
          ))}
        </select>
        <Button size="sm" variant="ghost" onClick={onEdit} aria-label={`Edit ${task.title}`}>
          Edit
        </Button>
        <Button size="sm" variant="ghost" onClick={onDelete} aria-label={`Delete ${task.title}`}>
          Delete
        </Button>
      </div>
    </article>
  )
}

export default TaskCard
