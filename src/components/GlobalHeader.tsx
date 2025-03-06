import { Link } from 'react-router-dom'

const GlobalHeader = ({ currentPage }: { currentPage: string }) => {
  return (
    <header className="fixed top-0 left-0 right-0 h-[72px] bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3">
          <img src="/Equihome Logo.png" alt="Equihome" className="h-8 w-auto" />
          <span className="text-lg font-semibold text-gray-900">Equihome</span>
        </Link>

        <Link
          to="/book-call"
          className="px-6 py-2.5 bg-sky-600 text-white font-medium rounded-lg hover:bg-sky-700 transition-colors"
        >
          Book a Call
        </Link>
      </div>
    </header>
  )
}

export default GlobalHeader 