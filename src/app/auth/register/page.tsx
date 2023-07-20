'use client'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { TextInput } from '@/components/inputs/TextInput';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AuthError } from '@supabase/supabase-js';
import ErrorAlert from '@/components/ErrorAlert';
import { AnimatePresence } from 'framer-motion';

type RegisterForm = {
  email: string
  password: string
  confirmPassword: string
}

export default function RegisterPage() {
  const [formError, setFormError] = useState<AuthError | null>(null)

  const router = useRouter()
  const { handleSubmit, control, getValues,  formState: { errors } } = useForm<RegisterForm>()
  const supabase = createClientComponentClient()
  
  const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
    setFormError(null)

    const {data: user, error} = await supabase.auth.signUp({
      email: data.email,
      password: data.password
    })

    if (error || !user.user?.identities?.length) {
      setFormError(error)
    } else {
      console.log(user)
    }
  }
  
  return (
    <form
      role='form' 
      id="registrationForm"
      onSubmit={handleSubmit(onSubmit)}
      className='w-full max-w-lg'
    >
      <AnimatePresence>
        {
          formError !== null && <ErrorAlert message={formError?.message}/> 
        }
      </AnimatePresence>
      <Controller 
        control={control}
        rules={{
            required: true,
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Please enter a valid email'
            }
          }
        }
        name="email"
        render={({ field: { onChange, onBlur } }) => (
          <TextInput 
            name="Email"
            label='Email'
            onChange={onChange}
            onBlur={onBlur}
            type='email'
            error={errors.email?.message}
            required
          />
        )}
      />
      <Controller 
        control={control}
        name="password"
        rules={{
            required: true,
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters long'
            }
          }
        }
        render={({ field: { onChange, onBlur } }) => (
          <TextInput 
            name="Password"
            label='Password'
            onChange={onChange}
            onBlur={onBlur}
            type='password'
            error={errors.password?.message}
            required
          />
        )}
      />
      <Controller 
        control={control}
        name="confirmPassword"
        rules={{
            required: true,
            validate: {
              confirmPasswordEqual: value => (value === getValues('password') || "Passwords must match")
            }
          }
        }
        render={({ field: { onChange, onBlur } }) => (
          <TextInput 
            name="ConfirmPassword"
            label='Confirm Password'
            onChange={onChange}
            onBlur={onBlur}
            type='password'
            error={errors.confirmPassword?.message}
            required
          />
        )}
      />
    <Button 
      primary
      text="Create Account"
      additionalClasses='mt-sm'
      type='submit'
      onClick={() => handleSubmit(onSubmit)}
    />
    <Button 
      text="Log In"
      additionalClasses='mt-sm'
      onClick={() => router.push('/auth/login')}
    />
    </form>
  )
}
