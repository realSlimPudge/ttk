"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(event.currentTarget)
    const username = formData.get("username") as string
    const password = formData.get("password") as string

    try {
      // Here you would typically make an API call to authenticate the user
      // For example:
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ username, password }),
      // })

      // if (!response.ok) throw new Error('Login failed')

      // Simulate successful login
      console.log("Logging in with:", { username, password })

      // Redirect to dashboard after successful login
      router.push("/dashboard")
    } catch (err) {
      setError("Invalid username or password")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>Enter your credentials to access your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Input
                    id="username"
                    name="username"
                    placeholder="Enter your username"
                    required
                    disabled={isLoading}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Enter your account username</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    required
                    disabled={isLoading}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Enter your account password</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Button variant="link" className="p-0" asChild>
            <Link href="/register">Register</Link>
          </Button>
        </p>
      </CardFooter>
    </Card>
  )
}

