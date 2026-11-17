import { useState, type SubmitEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

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

function EyeIcon({ visible }: { visible: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      className="h-6 w-6" aria-hidden="true">
      {visible ? (
        <>
          <path d="M3 3l18 18" />
          <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
          <path d="M9.9 5.2A10.8 10.8 0 0 1 12 5c5 0 8.3 4.2 9 7-.3 1.1-1.1 2.4-2.2 3.5" />
          <path d="M6.2 6.2C4.4 7.4 3.3 9.2 3 12c.7 2.8 4 7 9 7 1.1 0 2.1-.2 3-.6" />
        </>
      ) : (
        <>
          <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
          <circle cx="12" cy="12" r="3" />
        </>
      )}
    </svg>
  )
}

export default function Login() {
  const [primary, setPrimary] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()

    setError('')
    setIsSubmitting(true)

    try {
      await login(primary, password)

      navigate('/')
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
      <section className="w-full max-w-[494px] rounded-[28px] border border-[#e4d9d0] bg-white/90 px-7 py-9 shadow-[0_18px_35px_rgba(75,48,29,0.16)] sm:px-11 sm:py-10">

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

        {/* Login form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Primary */}
          <div className="flex h-[52px] items-center gap-4 rounded-[14px] border border-[#dedede] px-5 text-[#888888] transition focus-within:border-[#a64b1d] focus-within:ring-2 focus-within:ring-[#a64b1d]/10">
            <MailIcon />

            <input
              type="text"
              placeholder="Email/Username"
              aria-label="Email or Username"
              autoComplete="username"
              required
              value={primary}
              onChange={(event) => setPrimary(event.target.value)}
              className="h-full w-full bg-transparent text-[17px] text-[#333333] outline-none placeholder:text-[#888888]"
            />
          </div>

          {/* Password */}
          <div className="flex h-[52px] items-center gap-4 rounded-[14px] border border-[#dedede] px-5 text-[#888888] transition focus-within:border-[#a64b1d] focus-within:ring-2 focus-within:ring-[#a64b1d]/10">
            <LockIcon />

            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              aria-label="Password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="h-full w-full bg-transparent text-[17px] text-[#333333] outline-none placeholder:text-[#888888]"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="shrink-0 transition hover:text-[#a64b1d]"
            >
              <EyeIcon visible={showPassword} />
            </button>
          </div>

          {/* Forgot password */}
          <div className="flex justify-end">
            <button
              type="button"
              className="text-[16px] font-medium text-[#a64b1d] transition hover:text-[#783313]"
            >
              Forgot password?
            </button>
          </div>

          {error && (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          )}

          {/* Login button */}
          <button
            type="submit"
            disabled = {isSubmitting}
            className="h-[52px] w-full rounded-[14px] bg-[#ad5127] text-[17px] font-semibold text-white shadow-sm transition hover:bg-[#923f1c] active:scale-[0.99]"
          >
            {isSubmitting ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-[#e5e5e5]" />
          <span className="text-[15px] font-medium text-[#888888]">or</span>
          <div className="h-px flex-1 bg-[#e5e5e5]" />
        </div>

        {/* Create account */}
        <button
          type="button"
          className="h-[52px] w-full rounded-[14px] border-[1.5px] border-[#ad5127] text-[17px] font-semibold text-[#a64b1d] transition hover:bg-[#ad5127]/5 active:scale-[0.99]"
        >
          Create an account
        </button>

      </section>
    </main>
  )
}
