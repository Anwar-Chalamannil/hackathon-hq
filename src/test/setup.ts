// Runs before every test file.
import '@testing-library/jest-dom/vitest' // adds matchers like toBeInTheDocument()
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

afterEach(() => {
  cleanup() // remove anything a test rendered
  localStorage.clear() // each test starts with empty storage
})

// jsdom (our fake browser) may not implement the dialog's showModal()/close().
// If it doesn't, add simple versions so the Modal component works in tests.
if (typeof HTMLDialogElement.prototype.showModal !== 'function') {
  HTMLDialogElement.prototype.showModal = function () {
    this.open = true
  }
  HTMLDialogElement.prototype.close = function () {
    this.open = false
    this.dispatchEvent(new Event('close'))
  }
}
