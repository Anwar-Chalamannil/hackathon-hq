// Component tests: render the whole app in a fake browser and use it
// like a person would: find things by their visible text, click, type.
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

function savedTitles(): string[] {
  const saved: { title: string }[] = JSON.parse(localStorage.getItem('hackathon-hq:tasks') ?? '[]')
  return saved.map((task) => task.title)
}

function visibleTaskTitles(): string[] {
  // Task titles are the only level-3 headings on the page
  return screen.getAllByRole('heading', { level: 3 }).map((heading) => heading.textContent ?? '')
}

describe('App', () => {
  it('shows the sample tasks on the first visit', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: 'Sketch the main screens' })).toBeInTheDocument()
  })

  it('creates a task through the form and saves it', () => {
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: '+ New task' }))
    fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Write the tests' } })
    fireEvent.click(screen.getByRole('button', { name: 'Create task' }))

    expect(screen.getByRole('heading', { name: 'Write the tests' })).toBeInTheDocument()
    expect(savedTitles()).toContain('Write the tests')
  })

  it('refuses to create a task without a title', () => {
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: '+ New task' }))
    fireEvent.click(screen.getByRole('button', { name: 'Create task' }))

    expect(screen.getByRole('alert')).toHaveTextContent('Please give the task a title.')
  })

  it('deletes a task only after confirming', () => {
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: 'Delete Sketch the main screens' }))
    expect(savedTitles()).toContain('Sketch the main screens') // not deleted yet

    fireEvent.click(screen.getByRole('button', { name: 'Delete' })) // the confirm button

    expect(screen.queryByRole('heading', { name: 'Sketch the main screens' })).not.toBeInTheDocument()
    expect(savedTitles()).not.toContain('Sketch the main screens')
  })

  it('narrows the list when searching and filtering', () => {
    render(<App />)

    fireEvent.change(screen.getByPlaceholderText('Search tasks…'), { target: { value: 'pitch' } })
    expect(visibleTaskTitles()).toEqual(['Draft the 3-minute pitch'])

    fireEvent.change(screen.getByLabelText('Status'), { target: { value: 'completed' } })
    expect(screen.getByText('No tasks match your filters.')).toBeInTheDocument()

    fireEvent.click(screen.getAllByRole('button', { name: 'Clear filters' })[0])
    expect(visibleTaskTitles()).toHaveLength(5)
  })
})
