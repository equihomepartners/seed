import { Link } from 'react-router-dom'
import { FaArrowRight, FaChevronDown } from 'react-icons/fa'
import { useState, useEffect } from 'react'

const GlobalHeader = ({ currentPage }: { currentPage: string }) => {
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  useEffect(() => {
    const email = localStorage.getItem('userEmail')
    if (email) {
      setUserEmail(email)
    }
  }, [])

  const handleSignOut = () => {
    localStorage.removeItem('userEmail')
    localStorage.removeItem('sessionActive')
    localStorage.removeItem('userId')
    localStorage.removeItem('hasCompletedSplash')
    window.location.reload()
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[#020817]/95 backdrop-blur-xl border-b border-blue-500/20">
      <div className="h-0.5 w-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20" />
      <div className="max-w-7xl mx-auto py-3 px-4 sm:px-6">
        <div className="flex items-center justify-between">
          {/* Left Section: Logo & Navigation */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <img src="/Equihome Logo.png" alt="Equihome" className="h-6" />
              <span className="text-white text-lg sm:text-xl ml-3 font-light">equihome</span>
              <span className="text-white text-lg sm:text-xl font-light">partners</span>
            </div>
            
            <div className="hidden sm:block h-6 w-px bg-white/10" />
            
            <div className="hidden sm:flex items-center space-x-4">
              {currentPage !== 'launchpad' && (
                <Link 
                  to="/launchpad" 
                  className="flex items-center space-x-2 px-2.5 py-1.5 bg-blue-500/10 hover:bg-blue-500/20 rounded-lg border border-blue-500/20 transition-colors"
                >
                  <span className="text-sm text-blue-400">Back to Launchpad</span>
                </Link>
              )}
              <span className="text-white/80 text-lg font-light">
                {currentPage === 'launchpad' ? 'Launchpad' : 
                 currentPage === 'book-call' ? 'Book Call' : 
                 currentPage === 'portfolio-os' ? 'Portfolio OS' : 'Business Info'}
              </span>
            </div>
          </div>

          {/* Right Section: Stats & User */}
          <div className="flex items-center space-x-4">
            {/* Fund Stats - Hide on mobile, show on tablet and up */}
            <div className="hidden sm:flex space-x-2">
              <div className="px-3 py-1.5 bg-[#111827]/60 backdrop-blur-xl rounded-lg border border-blue-500/20">
                <span className="text-xs text-white/60 block mb-0.5">Fund Size</span>
                <div className="text-sm font-bold text-white">$500M</div>
              </div>
              <div className="px-3 py-1.5 bg-[#111827]/60 backdrop-blur-xl rounded-lg border border-blue-500/20">
                <span className="text-xs text-white/60 block mb-0.5">Launch</span>
                <div className="text-sm font-bold text-white">July 2025</div>
              </div>
              <div className="px-3 py-1.5 bg-[#111827]/60 backdrop-blur-xl rounded-lg border border-green-500/20">
                <span className="text-xs text-white/60 block mb-0.5">Raise</span>
                <div className="text-sm font-bold text-green-400">$5M</div>
              </div>
            </div>

            {/* User Section */}
            <div className="flex items-center space-x-3">
              {currentPage !== 'book-call' && (
                <Link
                  to="/book-call"
                  className="hidden sm:flex px-3 py-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg shadow-purple-500/20 items-center space-x-2 text-sm"
                >
                  <span>Book a Call</span>
                  <FaArrowRight className="text-xs" />
                </Link>
              )}
              
              {userEmail && (
                <div className="flex items-center space-x-2">
                  <Link 
                    to="/dashboard"
                    className="flex items-center space-x-2 px-3 py-1.5 bg-blue-500/10 hover:bg-blue-500/20 rounded-lg border border-blue-500/20 transition-colors"
                  >
                    <span className="text-sm text-blue-400">Your Dashboard</span>
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="px-3 py-1.5 text-sm text-red-400 hover:bg-[#1a2234] rounded-lg transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GlobalHeader 