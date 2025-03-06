import { Link } from 'react-router-dom'
import { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 safe-padding">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/launchpad" className="hidden sm:flex items-center space-x-2 px-3 py-2 bg-sky-50 hover:bg-sky-100 rounded-lg border border-sky-200 transition-colors">
              <span className="text-sm text-sky-600">Go to Launchpad</span>
            </Link>
            <div className="flex items-center ml-0 sm:ml-6">
              <Link to="/">
                <img src="/Equihome Logo.png" alt="Equihome" className="h-8" />
              </Link>
              <span className="text-gray-900 text-xl sm:text-2xl ml-3 font-light">equihome</span>
              <span className="text-gray-900 text-xl sm:text-2xl font-light">partners</span>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-sky-50 transition-colors"
          >
            {isMenuOpen ? (
              <FaTimes className="text-gray-900 text-xl" />
            ) : (
              <FaBars className="text-gray-900 text-xl" />
            )}
          </button>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/pitch" className="text-gray-600 hover:text-gray-900 transition-colors">Business Info</Link>
            <Link to="/portfolio-os" className="text-gray-600 hover:text-gray-900 transition-colors">Portfolio OS</Link>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <Link to="/pitch" className="text-gray-600 hover:text-gray-900 transition-colors">Business Info</Link>
              <Link to="/portfolio-os" className="text-gray-600 hover:text-gray-900 transition-colors">Portfolio OS</Link>
              <Link to="/launchpad" className="text-sky-600 hover:text-sky-700 transition-colors">Go to Launchpad</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation 