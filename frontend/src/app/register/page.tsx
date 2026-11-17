
"use client"

import { useState, type SubmitEvent } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'

function BookIcon() {
  return (
    <svg
      viewBox="0 0 80 52"
      fill="none"
      className="h-12 w-20 text-[#a64b1d]"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M40 43 C30 32 17 30 5 34 L11 6 C22 2 34 7 40 17" />
      <path d="M40 43 C50 32 63 30 75 34 L69 6 C58 2 46 7 40 17" />
      <path d="M40 17 V48" />
      <path d="M8 39 C20 36 31 39 40 48 C49 39 60 36 72 39" />
    </svg>
  )
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      className="h-6 w-6" aria-hidden="true">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      className="h-6 w-6" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      className="h-6 w-6" aria-hidden="true">
      <rect x="4" y="10" width="16" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      <path d="M12 14v3" />
    </svg>
  )
}

export default function Register() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { register } = useAuth()
  const router = useRouter()

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()

    setError('')
    setIsSubmitting(true)

    try {
      await register({
        username,
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        display_name: displayName,
      })

      router.push('/')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.error ||
          'Something went wrong. Please try again.'
        )
      } else {
        setError('Something went wrong. Please try again.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(ellipse_at_0%_0%,#d2c2ac_0%,#e9ded2_34%,#ffffff_76%)] px-5 py-10">
      <section className="w-full max-w-[700px] rounded-[28px] border border-[#e4d9d0] bg-white/90 px-7 py-9 shadow-[0_18px_35px_rgba(75,48,29,0.16)] sm:px-11 sm:py-10">

        {/* Branding */}
        <header className="mb-9 flex flex-col items-center text-center">
          <BookIcon />

          <h1 className="mt-2 font-serif text-[48px] font-bold leading-tight tracking-tight text-[#321b10] sm:text-[54px]">
            BookHub
          </h1>

          <p className="mt-1 max-w-[350px] text-[18px] leading-relaxed text-[#666666]">
            Discover, explore, and keep track of books you love.
          </p>
        </header>

        {/* Registration form */}
        <form onSubmit={handleSubmit} className="space-y-4">

        <div className="grid grid-cols-2 gap-4">
            {/* First name */}
            <div className="flex h-[52px] max-w-[300px] items-center gap-4 rounded-[14px] border border-[#dedede] px-5 text-[#888888] transition focus-within:border-[#a64b1d] focus-within:ring-2 focus-within:ring-[#a64b1d]/10">
                <UserIcon />

                <input
                type="text"
                placeholder="First name"
                aria-label="First name"
                autoComplete="given-name"
                required
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                className="h-full w-full bg-transparent text-[17px] text-[#333333] outline-none placeholder:text-[#888888]"
                />
            </div>

            {/* Last name */}
            <div className="flex h-[52px] max-w-[300px] items-center gap-4 rounded-[14px] border border-[#dedede] px-5 text-[#888888] transition focus-within:border-[#a64b1d] focus-within:ring-2 focus-within:ring-[#a64b1d]/10">
                <UserIcon />

                <input
                type="text"
                placeholder="Last name"
                aria-label="Last name"
                autoComplete="family-name"
                required
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                className="h-full w-full bg-transparent text-[17px] text-[#333333] outline-none placeholder:text-[#888888]"
                />
            </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
            {/* Display name */}
            <div className="flex h-[52px] items-center gap-4 rounded-[14px] border border-[#dedede] px-5 text-[#888888] transition focus-within:border-[#a64b1d] focus-within:ring-2 focus-within:ring-[#a64b1d]/10">
                <UserIcon />

                <input
                type="text"
                placeholder="Display name"
                aria-label="Display name"
                autoComplete="nickname"
                required
                value={displayName}
                onChange={(event) => setDisplayName(event.target.value)}
                className="h-full w-full bg-transparent text-[17px] text-[#333333] outline-none placeholder:text-[#888888]"
                />
            </div>

            {/* Username */}
            <div className="flex h-[52px] items-center gap-4 rounded-[14px] border border-[#dedede] px-5 text-[#888888] transition focus-within:border-[#a64b1d] focus-within:ring-2 focus-within:ring-[#a64b1d]/10">
                <UserIcon />

                <input
                type="text"
                placeholder="Username"
                aria-label="Username"
                autoComplete="username"
                required
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="h-full w-full bg-transparent text-[17px] text-[#333333] outline-none placeholder:text-[#888888]"
                />
            </div>
        </div>

          {/* Email */}
          <div className="flex h-[52px] items-center gap-4 rounded-[14px] border border-[#dedede] px-5 text-[#888888] transition focus-within:border-[#a64b1d] focus-within:ring-2 focus-within:ring-[#a64b1d]/10">
            <MailIcon />

            <input
              type="email"
              placeholder="Email"
              aria-label="Email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="h-full w-full bg-transparent text-[17px] text-[#333333] outline-none placeholder:text-[#888888]"
            />
          </div>

          {/* Password */}
          <div className="flex h-[52px] items-center gap-4 rounded-[14px] border border-[#dedede] px-5 text-[#888888] transition focus-within:border-[#a64b1d] focus-within:ring-2 focus-within:ring-[#a64b1d]/10">
            <LockIcon />

            <input
              type="password"
              placeholder="Password"
              aria-label="Password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="h-full w-full bg-transparent text-[17px] text-[#333333] outline-none placeholder:text-[#888888]"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          )}

          {/* Register button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="h-[52px] w-full rounded-[14px] bg-[#ad5127] text-[17px] font-semibold text-white shadow-sm transition hover:bg-[#923f1c] active:scale-[0.99]"
          >
            {isSubmitting ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-[#e5e5e5]" />
          <span className="text-[15px] font-medium text-[#888888]">or</span>
          <div className="h-px flex-1 bg-[#e5e5e5]" />
        </div>

        {/* Login */}
        <Link
          href="/login"
          className="flex h-[52px] w-full items-center justify-center rounded-[14px] border-[1.5px] border-[#ad5127] text-[17px] font-semibold text-[#a64b1d] transition hover:bg-[#ad5127]/5 active:scale-[0.99]"
        >
          Log in
        </Link>

      </section>
    </main>
  )
}
