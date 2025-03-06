import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { FaSignOutAlt } from 'react-icons/fa'

const GlobalHeader = ({ currentPage }: { currentPage: string }) => {
  const navigate = useNavigate()
  const [userEmail, setUserEmail] = useState<string | null>(null)

  useEffect(() => {
    const email = localStorage.getItem('userEmail')
    setUserEmail(email)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('userEmail')
    localStorage.removeItem('lastVisitedPage')
    localStorage.removeItem('lastVisitedTime')
    navigate('/')
    window.location.reload()
  }

  return (
    <header className="fixed top-0 left-0 right-0 h-[72px] bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3">
          <img src="/Equihome Logo.png" alt="Equihome" className="h-8 w-auto" />
          <span className="text-lg font-semibold text-gray-900">Equihome</span>
        </Link>

        <div className="flex items-center space-x-4">
          {userEmail && (
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <FaSignOutAlt className="w-4 h-4" />
              <span>Logout</span>
            </button>
          )}
          <Link
            to="/book-call"
            className="px-6 py-2.5 bg-sky-600 text-white font-medium rounded-lg hover:bg-sky-700 transition-colors"
          >
            Book a Call
          </Link>
        </div>
      </div>
    </header>
  )
}

export default GlobalHeader 