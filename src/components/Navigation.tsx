import { Link } from 'react-router-dom'

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#111827]/80 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/launchpad" className="flex items-center space-x-2 px-3 py-2 bg-blue-500/10 hover:bg-blue-500/20 rounded-lg border border-blue-500/20 transition-colors">
              <span className="text-sm text-blue-400">Go to Launchpad</span>
            </Link>
            <div className="flex items-center ml-6">
              <Link to="/">
                <img src="/Equihome Logo.png" alt="Equihome" className="h-8" />
              </Link>
              <span className="text-white text-2xl ml-3 font-light">equihome</span>
              <span className="text-white text-2xl font-light">partners</span>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/pitch" className="text-gray-300 hover:text-white transition-colors">Business Info</Link>
            <Link to="/portfolio" className="text-gray-300 hover:text-white transition-colors">Portfolio OS</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation 