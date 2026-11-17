import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProfileDropdown() {
  const { user, logout } = useAuth()

  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const initials = user?.display_name
    ?.trim()
    .split(/\s+/)
    .map((name) => name[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  async function handleLogout() {
    try {
      await logout()
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Open profile menu"
        className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-[#93422B] text-sm font-semibold text-white transition hover:ring-4 hover:ring-[#93422B]/15"
      >
        {user?.profile_picture ? (
          <img
            src={user.profile_picture}
            alt="Profile"
            className="h-full w-full object-cover"
          />
        ) : (
          initials || (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="1.8" className="h-5 w-5">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21a8 8 0 0 1 16 0" />
            </svg>
          )
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-3 w-64 overflow-hidden rounded-2xl border border-[#CDC2B9] bg-[#F8F3EF] shadow-xl">

          {/* User information */}
          <div className="border-b border-[#CDC2B9]/60 px-5 py-4">
            <p className="font-semibold text-[#241F16]">
              {user?.display_name || user?.username}
            </p>
            <p className="mt-1 truncate text-sm text-[#AC9A8D]">
              {user?.email}
            </p>
          </div>

          {/* Menu */}
          <div className="p-2">
            <Link
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="block rounded-xl px-4 py-2.5 text-sm text-[#403223] transition hover:bg-[#F0E6DE]"
            >
              My Profile
            </Link>

            <Link
              to="/library"
              onClick={() => setIsOpen(false)}
              className="block rounded-xl px-4 py-2.5 text-sm text-[#403223] transition hover:bg-[#F0E6DE]"
            >
              My Library
            </Link>

            <Link
              to="/settings"
              onClick={() => setIsOpen(false)}
              className="block rounded-xl px-4 py-2.5 text-sm text-[#403223] transition hover:bg-[#F0E6DE]"
            >
              Settings
            </Link>
          </div>

          <div className="border-t border-[#CDC2B9]/60 p-2">
            <button
              type="button"
              onClick={handleLogout}
              className="w-full rounded-xl px-4 py-2.5 text-left text-sm font-medium text-[#93422B] transition hover:bg-[#F0E6DE]"
            >
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
