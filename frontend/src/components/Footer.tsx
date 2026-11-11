import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-[#F8F3EF]">
      <div
        id="about"
        className="mx-auto grid max-w-[1200px] gap-6 border-b border-[#CDC2B9]/60 px-6 py-12 md:grid-cols-2 md:items-center"
      >
        <h2 className="font-serif text-2xl font-bold tracking-tight text-[#241F16]">
          Made for the love of reading.
        </h2>

        <p className="border-l border-[#CDC2B9] pl-6 text-sm leading-relaxed text-[#403223]">
          BookHub is a quiet corner for discovering something new.
          Browse a thoughtful selection, follow your curiosity, and enjoy
          the simple pleasure of finding your next book.
        </p>
      </div>

      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-5">
        <Link to="/" className="font-serif font-bold text-[#241F16]">
          BookHub
        </Link>

        <span className="text-xs text-[#AC9A8D]">
          A home for curious readers.
        </span>
      </div>
    </footer>
  )
}
