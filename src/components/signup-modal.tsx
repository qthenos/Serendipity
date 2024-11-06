"use client"

import React, { useEffect } from "react"
import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react"
import { useRouter } from "next/navigation"



const SignupModal = () => {
  const { session } = useSessionContext()
  const router = useRouter()

  const supabaseClient = useSupabaseClient()


  return (
    <Auth
      supabaseClient={supabaseClient}
      providers={["github"]}
      magicLink={true}
      appearance={{
        theme: ThemeSupa,
        variables: {
          default: {
            colors: {
              brand: "# 04040",
              brandAccent: "#22c55e",
            },
          },
        },
      }}
      theme="dark"
    />
  )
}

export default SignupModal