import type { ButtonHTMLAttributes } from 'react'
import './Button.css'

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost'

// Accepts every normal <button> prop (onClick, disabled, type...) plus `variant`.
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: 'md' | 'sm'
}

function Button({
  variant = 'secondary',
  size = 'md',
  type = 'button', // default 'button' so it never submits a form by accident
  className = '',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`button button--${variant} button--${size} ${className}`.trim()}
      {...rest}
    />
  )
}

export default Button
