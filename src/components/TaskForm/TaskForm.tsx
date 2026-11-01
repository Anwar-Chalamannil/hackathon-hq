import { useId, useState, type FormEvent } from 'react'
import Button from '../common/Button'
import {
  PRIORITY_LABELS,
  STATUS_LABELS,
  TASK_PRIORITIES,
  TASK_STATUSES,
  type NewTask,
  type Task,
  type TaskPriority,
  type TaskStatus,
} from '../../types/task'
import './TaskForm.css'

interface TaskFormProps {
  initialTask?: Task // given when editing, missing when creating
  categories: string[] // existing categories, offered as suggestions
  onSubmit: (values: NewTask) => void
  onCancel: () => void
}

const TITLE_MAX = 120

// One form for both "create" and "edit". It keeps its own copy of the values
// while you type, and only hands them to the parent when you press Save.
function TaskForm({ initialTask, categories, onSubmit, onCancel }: TaskFormProps) {
  const [title, setTitle] = useState(initialTask?.title ?? '')
  const [description, setDescription] = useState(initialTask?.description ?? '')
  const [status, setStatus] = useState<TaskStatus>(initialTask?.status ?? 'todo')
  const [priority, setPriority] = useState<TaskPriority>(initialTask?.priority ?? 'medium')
  const [category, setCategory] = useState(initialTask?.category ?? '')
  const [dueDate, setDueDate] = useState(initialTask?.dueDate ?? '')
  const [titleError, setTitleError] = useState('')

  const id = useId() // prefix so label/input ids are unique on the page

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault() // stop the browser from reloading the page

    const trimmedTitle = title.trim()
    if (!trimmedTitle) {
      setTitleError('Please give the task a title.')
      return
    }

    onSubmit({
      title: trimmedTitle,
      description: description.trim(),
      status,
      priority,
      category: category.trim() || 'General',
      dueDate: dueDate || undefined, // empty date input means "no due date"
    })
  }

  return (
    <form className="task-form" onSubmit={handleSubmit} noValidate>
      <div className="task-form__field">
        <label htmlFor={`${id}-title`}>Title</label>
        <input
          id={`${id}-title`}
          className="field-control"
          value={title}
          maxLength={TITLE_MAX}
          data-autofocus
          aria-invalid={titleError ? true : undefined}
          aria-describedby={titleError ? `${id}-title-error` : undefined}
          onChange={(event) => {
            setTitle(event.target.value)
            if (titleError) setTitleError('')
          }}
        />
        {titleError && (
          <p id={`${id}-title-error`} className="task-form__error" role="alert">
            {titleError}
          </p>
        )}
      </div>

      <div className="task-form__field">
        <label htmlFor={`${id}-description`}>
          Description <span className="task-form__optional">(optional)</span>
        </label>
        <textarea
          id={`${id}-description`}
          className="field-control"
          rows={3}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>

      <div className="task-form__row">
        <div className="task-form__field">
          <label htmlFor={`${id}-status`}>Status</label>
          <select
            id={`${id}-status`}
            className="field-control"
            value={status}
            onChange={(event) => setStatus(event.target.value as TaskStatus)}
          >
            {TASK_STATUSES.map((value) => (
              <option key={value} value={value}>
                {STATUS_LABELS[value]}
              </option>
            ))}
          </select>
        </div>

        <div className="task-form__field">
          <label htmlFor={`${id}-priority`}>Priority</label>
          <select
            id={`${id}-priority`}
            className="field-control"
            value={priority}
            onChange={(event) => setPriority(event.target.value as TaskPriority)}
          >
            {TASK_PRIORITIES.map((value) => (
              <option key={value} value={value}>
                {PRIORITY_LABELS[value]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="task-form__row">
        <div className="task-form__field">
          <label htmlFor={`${id}-category`}>Category</label>
          {/* <datalist> gives suggestions but still lets you type a new category */}
          <input
            id={`${id}-category`}
            className="field-control"
            list={`${id}-categories`}
            placeholder="General"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          />
          <datalist id={`${id}-categories`}>
            {categories.map((name) => (
              <option key={name} value={name} />
            ))}
          </datalist>
        </div>

        <div className="task-form__field">
          <label htmlFor={`${id}-due`}>
            Due date <span className="task-form__optional">(optional)</span>
          </label>
          <input
            id={`${id}-due`}
            className="field-control"
            type="date"
            value={dueDate}
            onChange={(event) => setDueDate(event.target.value)}
          />
        </div>
      </div>

      <div className="task-form__actions">
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="submit" variant="primary">
          {initialTask ? 'Save changes' : 'Create task'}
        </Button>
      </div>
    </form>
  )
}

export default TaskForm
