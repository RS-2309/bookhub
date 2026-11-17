import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import ProfileDropdown from './ProfileDropdown'
import logo from '../assets/bookhub-logo.svg'

export default function Navbar() {
  const { isAuthenticated, isLoading } = useAuth()

  return (
    <header className="border-b border-[#CDC2B9]/50 bg-[#F8F3EF]">
      <nav className="mx-auto flex h-[68px] max-w-[1200px] items-center justify-between px-6">
        <Link to="/" aria-label="BookHub home">
          <img src={logo} alt="BookHub" className="w-[145px]" />
        </Link>

        <div className="hidden items-center gap-9 text-sm font-medium text-[#403223] md:flex">
          <a href="#discover" className="transition hover:text-[#93422B]">
            Discover
          </a>
          <a href="#categories" className="transition hover:text-[#93422B]">
            Categories
          </a>
          <a href="#about" className="transition hover:text-[#93422B]">
            About
          </a>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#search"
            aria-label="Go to search"
            className="mr-2 rounded-full p-2 text-[#403223] transition hover:bg-[#F0E6DE]"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="1.8" className="h-5 w-5">
              <circle cx="11" cy="11" r="7" />
              <path d="m16 16 4 4" />
            </svg>
          </a>

          {!isLoading && (
            isAuthenticated ? (
              <ProfileDropdown />
            ) : (
              <>
                <Link
                  to="/login"
                  className="rounded-xl border border-[#93422B] px-4 py-2 text-sm font-semibold text-[#93422B] transition hover:bg-[#F0E6DE]"
                >
                  Log in
                </Link>

                <Link
                  to="/register"
                  className="rounded-xl bg-[#9A481D] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#693520]"
                >
                  Register
                </Link>
              </>
            )
          )}
        </div>
      </nav>
    </header>
  )
}
