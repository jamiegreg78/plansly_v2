import classNames from "classnames"

export interface ButtonProps {
  primary?: boolean
  text: string
  additionalClasses?: string
  type?: 'submit'
  onClick?: () => void
}

export default function Button(
    {primary, text, additionalClasses, onClick, type}: ButtonProps
  ) {

  const buttonClasses = classNames(
    'w-full',
    'border',
    'rounded-md',
    'font-bold',
    'p-md',
    'border-brand-primary',
    additionalClasses,

    { 'bg-brand-primary' : primary},
    { 'text-white' : primary },

    { 'text-brand-primary': !primary }
  )
  
  return (
    <button type={type || 'button'} onClick={onClick} className={buttonClasses}>{text}</button>
  )
}
