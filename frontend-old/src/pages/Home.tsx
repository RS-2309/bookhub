import { useState, type SubmitEvent } from 'react'
import { useAuth } from '../context/AuthContext'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import bookshelf from '../assets/bookshelf.avif'
import midnightLibrary from '../assets/midnight-library.avif'
import braidingSweetgrass from '../assets/braiding-sweetgrass.avif'
import anthropoceneReviewed from '../assets/anthropocene-reviewed.avif'

const categories = [
  { name: 'Fiction', icon: 'book' },
  { name: 'Non-Fiction', icon: 'flask' },
  { name: 'Science', icon: 'atom' },
  { name: 'Technology', icon: 'code' },
  { name: 'History', icon: 'column' },
  { name: 'Philosophy', icon: 'leaf' },
]

const books = [
  {
    title: 'The Midnight Library',
    image: midnightLibrary,
    alt: 'The Midnight Library book cover',
  },
  {
    title: 'Braiding Sweetgrass',
    image: braidingSweetgrass,
    alt: 'Braiding Sweetgrass book cover',
  },
  {
    title: 'The Anthropocene Reviewed',
    image: anthropoceneReviewed,
    alt: 'The Anthropocene Reviewed book cover',
  },
]

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-6 w-6 shrink-0"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m16 16 4 4" />
    </svg>
  )
}

function CategoryIcon({ name }: { name: string }) {
  const common = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className: 'h-7 w-7',
    viewBox: '0 0 24 24',
    'aria-hidden': true as const,
  }

  switch (name) {
    case 'book':
      return (
        <svg {...common}>
          <path d="M12 6C9 3 5 3 2 4v15c4-1 7 0 10 3 3-3 6-4 10-3V4c-3-1-7-1-10 2Z" />
          <path d="M12 6v16" />
        </svg>
      )

    case 'flask':
      return (
        <svg {...common}>
          <path d="M9 3h6M10 3v6l-6 10a1.5 1.5 0 0 0 1.3 2.2h13.4A1.5 1.5 0 0 0 20 19L14 9V3" />
          <path d="M7 16h10" />
        </svg>
      )

    case 'atom':
      return (
        <svg {...common}>
          <ellipse cx="12" cy="12" rx="10" ry="4" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
          <circle cx="12" cy="12" r="1" fill="currentColor" />
        </svg>
      )

    case 'code':
      return (
        <svg {...common}>
          <path d="m8 5-6 7 6 7M16 5l6 7-6 7" />
        </svg>
      )

    case 'column':
      return (
        <svg {...common}>
          <path d="M4 5h16M6 5v14M10 5v14M14 5v14M18 5v14M4 19h16M3 3h18" />
        </svg>
      )

    default:
      return (
        <svg {...common}>
          <path d="M21 3C11 3 5 7 4 14c0 3 2 5 5 5 7-1 11-7 12-16Z" />
          <path d="M3 21c4-7 8-10 14-14" />
        </svg>
      )
  }
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  
  //Temporary to check the login status
  const { user, isAuthenticated } = useAuth()

  console.log({ isAuthenticated, user })

  function handleSearch(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!searchQuery.trim()) return

    // Search functionality will be connected to the Django API.
    console.log('Searching for:', searchQuery)
  }

  return (
    <div className="min-h-screen bg-[#F8F3EF] text-[#241F16]">
      <Navbar />

      <main>
        {/* Search */}
        <section className="mx-auto max-w-[1200px] px-6 pt-8">
          <form
            id="search"
            onSubmit={handleSearch}
            className="flex h-[58px] items-center gap-4 rounded-full border border-[#93422B]/70 bg-[#F5F0EB] px-5 shadow-[0_3px_10px_rgba(64,50,35,0.05)] transition focus-within:border-[#9A481D] focus-within:ring-2 focus-within:ring-[#9A481D]/10"
          >
            <SearchIcon />

            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search titles, authors, or genres..."
              aria-label="Search books, authors, or genres"
              className="h-full min-w-0 flex-1 bg-transparent text-base text-[#403223] outline-none placeholder:text-[#AC9A8D]"
            />

            <button
              type="submit"
              aria-label="Search"
              className="sr-only"
            >
              Search
            </button>
          </form>
        </section>

        {/* Hero */}
        <section className="mx-auto grid max-w-[1200px] items-center gap-12 px-6 pb-12 pt-14 md:grid-cols-2 md:gap-16 md:py-14">
          <div>
            <p className="mb-5 text-[11px] font-bold tracking-[0.28em] text-[#9A481D]">
              A LITTLE ROOM FOR WONDER
            </p>

            <h1 className="max-w-[510px] font-serif text-4xl font-bold leading-[1.12] tracking-tight text-[#241F16] sm:text-5xl">
              Your next great read starts here.
            </h1>

            <p className="mt-5 max-w-[410px] text-base leading-relaxed text-[#403223]">
              Find stories to get lost in, ideas to sit with, and books
              worth sharing. Take your time — there&apos;s plenty to explore.
            </p>

            <a
              href="#discover"
              className="mt-6 inline-flex items-center gap-3 rounded-xl bg-[#9A481D] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#693520]"
            >
              Explore books
              <span aria-hidden="true">→</span>
            </a>
          </div>

          <div className="overflow-hidden rounded-[28px]">
            <img
              src={bookshelf}
              alt="A warm bookshelf filled with books and a trailing green plant"
              className="aspect-[1.35/1] w-full object-cover"
            />
          </div>
        </section>

        {/* Categories */}
        <section
          id="categories"
          className="mx-auto max-w-[1200px] px-6 pb-12"
        >
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2 className="font-serif text-2xl font-bold sm:text-3xl">
              Browse by category
            </h2>

            <a
              href="#discover"
              className="shrink-0 text-sm font-semibold text-[#9A481D] transition hover:text-[#693520]"
            >
              View all categories <span aria-hidden="true">→</span>
            </a>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((category) => (
              <button
                key={category.name}
                type="button"
                className="flex min-h-[90px] flex-col items-center justify-center gap-2 rounded-xl bg-[#F0E6DE] text-[#403223] transition hover:bg-[#E7D7CA] hover:text-[#93422B]"
              >
                <CategoryIcon name={category.icon} />
                <span className="font-serif text-sm font-semibold">
                  {category.name}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Recommended books */}
        <section id="discover" className="bg-[#F2EBE5]">
          <div className="mx-auto max-w-[1200px] px-6 py-12 sm:py-14">
            <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="mb-2 text-[11px] font-bold tracking-[0.25em] text-[#9A481D]">
                  THE BOOKSHELF
                </p>

                <h2 className="font-serif text-3xl font-bold tracking-tight">
                  Recommended for you
                </h2>
              </div>

              <p className="text-sm text-[#403223]">
                Thoughtful picks for curious minds.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {books.map((book) => (
                <article key={book.title} className="min-w-0">
                  <div className="overflow-hidden rounded-xl bg-[#F0E6DE]">
                    <img
                      src={book.image}
                      alt={book.alt}
                      className="aspect-[2/3] w-full object-cover"
                    />
                  </div>

                  <h3 className="mt-3 font-serif text-lg font-bold text-[#241F16]">
                    {book.title}
                  </h3>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
