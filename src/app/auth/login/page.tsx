'use client'
import Button from "@/components/Button";
import ErrorAlert from "@/components/ErrorAlert";
import { TextInput } from "@/components/inputs/TextInput";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { AuthError } from "@supabase/supabase-js";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

interface LoginForm {
  email: string
  password: string
}
export default function LoginPage() {
  const [formError, setFormError] = useState<AuthError | null>(null)
  const router = useRouter()
  const { handleSubmit, control, formState: { errors } } = useForm<LoginForm>()
  const supabase = createClientComponentClient()
  
  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    setFormError(null)
    const {data: user, error} = await supabase.auth.signInWithPassword(data)

    if (error) {
      setFormError(error)
    } else {
      console.log(user)
    }
  }

  return (
    <form 
      role="form" 
      id="loginForm"
      className="w-full max-w-lg"
      onSubmit={handleSubmit(onSubmit)}
    >
      <AnimatePresence>
        { formError !== null && <ErrorAlert message={formError?.message} />}
      </AnimatePresence>
    
      <Controller 
        control={control}
        rules={{required: {
            value: true,
            message: 'Please enter your email'
        }}}
        name="email"
        render={({ field: { onChange, onBlur }}) => (
          <TextInput 
            name="Email"
            label="Email"
            onChange={onChange}
            onBlur={onBlur}
            type="email" 
            error={errors.email?.message}
            required
          />
        )}
      />
      <Controller 
        control={control}
        rules={{required: {
            value: true,
            message: 'Please enter your password'
        }}}
        name="password"
        render={({ field: { onChange, onBlur }}) => (
          <TextInput 
            name="Password"
            label="Password"
            onChange={onChange}
            onBlur={onBlur}
            type="password"
            error={errors.password?.message}
            required
          />
        )}
      />
      <Button 
        primary
        text="Log In"
        additionalClasses="mt-sm"
        onClick={() => handleSubmit(onSubmit)}
        type="submit"
        />
      <Button 
        text="Create Account" 
        additionalClasses="mt-sm"
        onClick={() => router.push('/auth/register')}/>
    </form>
  )
}
