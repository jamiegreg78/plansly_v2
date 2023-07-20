import { createClientComponentClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import React from "react"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"

export default async function AuthLayout({
      children
  }) {

  const supabase = createServerComponentClient({cookies})
  const { data: {session}} = await supabase.auth.getSession()

  if (session) {
    redirect('/')
  }
  return (
    <div className='w-full h-full flex p-md gap-4'>
      <div className="w-full h-full grid p-md place-items-center">
        {children}
      </div>
      <div className="hidden lg:block w-full h-full bg-brand-primary rounded-lg"></div>
    </div>
  )
}
