import { useId } from 'react'
import Button from '../common/Button'
import {
  PRIORITY_LABELS,
  STATUS_LABELS,
  TASK_PRIORITIES,
  TASK_STATUSES,
  type TaskPriority,
  type TaskStatus,
} from '../../types/task'
import {
  hasActiveFilters,
  SORT_LABELS,
  SORT_OPTIONS,
  type SortOption,
  type TaskFilters,
} from '../../utils/taskFilters'
import './Filters.css'

interface FiltersProps {
  filters: TaskFilters
  sort: SortOption
  categories: string[]
  onFiltersChange: (filters: TaskFilters) => void
  onSortChange: (sort: SortOption) => void
  onClear: () => void
}

// Only shows the controls. The actual filtering happens in App, using
// filterTasks() and sortTasks() from utils/taskFilters.ts.
function Filters({
  filters,
  sort,
  categories,
  onFiltersChange,
  onSortChange,
  onClear,
}: FiltersProps) {
  const id = useId()

  // Copy the current filters and change just one field
  function update<K extends keyof TaskFilters>(key: K, value: TaskFilters[K]) {
    onFiltersChange({ ...filters, [key]: value })
  }

  return (
    <div className="filters" role="search">
      <div className="filters__search">
        <label htmlFor={`${id}-search`} className="visually-hidden">
          Search tasks
        </label>
        <input
          id={`${id}-search`}
          type="search"
          className="field-control"
          placeholder="Search tasks…"
          value={filters.search}
          onChange={(event) => update('search', event.target.value)}
        />
      </div>

      <div className="filters__selects">
        <div className="filters__field">
          <label htmlFor={`${id}-status`}>Status</label>
          <select
            id={`${id}-status`}
            className="field-control"
            value={filters.status}
            onChange={(event) => update('status', event.target.value as TaskStatus | 'all')}
          >
            <option value="all">All</option>
            {TASK_STATUSES.map((value) => (
              <option key={value} value={value}>
                {STATUS_LABELS[value]}
              </option>
            ))}
          </select>
        </div>

        <div className="filters__field">
          <label htmlFor={`${id}-priority`}>Priority</label>
          <select
            id={`${id}-priority`}
            className="field-control"
            value={filters.priority}
            onChange={(event) => update('priority', event.target.value as TaskPriority | 'all')}
          >
            <option value="all">All</option>
            {TASK_PRIORITIES.map((value) => (
              <option key={value} value={value}>
                {PRIORITY_LABELS[value]}
              </option>
            ))}
          </select>
        </div>

        <div className="filters__field">
          <label htmlFor={`${id}-category`}>Category</label>
          <select
            id={`${id}-category`}
            className="field-control"
            value={filters.category}
            onChange={(event) => update('category', event.target.value)}
          >
            <option value="all">All</option>
            {categories.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div className="filters__field">
          <label htmlFor={`${id}-sort`}>Sort by</label>
          <select
            id={`${id}-sort`}
            className="field-control"
            value={sort}
            onChange={(event) => onSortChange(event.target.value as SortOption)}
          >
            {SORT_OPTIONS.map((value) => (
              <option key={value} value={value}>
                {SORT_LABELS[value]}
              </option>
            ))}
          </select>
        </div>
      </div>

      {hasActiveFilters(filters) && (
        <Button variant="ghost" size="sm" className="filters__clear" onClick={onClear}>
          Clear filters
        </Button>
      )}
    </div>
  )
}

export default Filters
