import classNames from "classnames"
import React, { DetailedHTMLProps, LabelHTMLAttributes } from "react"
import { InputHTMLAttributes } from "react"

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: 'email' | 'text' | 'password'
  name: string
  label?: string
  error?: string
  additionalClasses?: string
}

export const TextInput = React.forwardRef<HTMLInputElement,  TextInputProps>((props: TextInputProps, ref) => {

  const inputClasses = classNames(
    'w-full',
    'border', 
    'border-border',
    'p-md',
    'rounded-md',
    {
      'border-red-500': props.error
    },
    {
      'bg-red-100': props.error
    },
    props.additionalClasses
  )

  // TODO: Change color to the proper token
  return ( 
    <div className="form-field w-full pt-sm first-of-type:pt-0">
      <label className="block font-bold" htmlFor={props.name.replaceAll(' ', '')}>
        { props.label }
      </label>   
      <input 
        id={props.name?.replaceAll(' ', '')}
        className={inputClasses} 
        ref={ref} {...props}
        aria-invalid={props.error ? 'true' : 'false'}
      />
      <span className="block text-red-500" role="alert">{ props.error }</span>
    </div>
  )
})

