import { useEffect, useId, useRef, type ReactNode } from 'react'
import './Modal.css'

interface ModalProps {
  open: boolean
  title: string
  onClose: () => void
  children: ReactNode
}

// Uses the browser's built-in <dialog> element. It gives us for free:
// a dark backdrop, closing with Esc, and keeping keyboard focus inside the popup.
function Modal({ open, title, onClose, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId() // a unique id to link the dialog to its heading

  // React controls `open`; this effect tells the real <dialog> to match it.
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) {
      dialog.showModal()
      // showModal() focuses the first button (the × close button), so pressing
      // Enter would close the popup. Move focus to the element the content
      // marked with data-autofocus instead, if there is one.
      dialog.querySelector<HTMLElement>('[data-autofocus]')?.focus()
    }
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={dialogRef}
      className="modal"
      aria-labelledby={titleId}
      onClose={onClose} // fires when the user presses Esc
      onClick={(event) => {
        // A click directly on <dialog> (not its content) is a click on the backdrop
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="modal__content">
        <header className="modal__header">
          <h2 id={titleId} className="modal__title">
            {title}
          </h2>
          <button type="button" className="modal__close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </header>
        {open && children}
      </div>
    </dialog>
  )
}

export default Modal
