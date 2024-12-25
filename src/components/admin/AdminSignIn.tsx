import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaLock } from 'react-icons/fa'

const AdminSignIn = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      // Simple admin validation
      if (email.toLowerCase() === 'sujay@equihome.com.au' && password === 'equihome2024') {
        // Clear any existing session
        localStorage.clear()
        
        // Set admin session
        localStorage.setItem('adminAuthenticated', 'true')
        localStorage.setItem('adminEmail', email)
        localStorage.setItem('sessionActive', 'true')
        
        // Force page reload to update all components
        window.location.href = '/admin'
      } else {
        setError('Invalid credentials')
      }
    } catch (error) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0B1121] flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FaLock className="text-3xl text-blue-400" />
          </div>
          <h2 className="text-3xl font-bold text-white">Admin Access</h2>
          <p className="mt-2 text-gray-400">Restricted to authorized personnel only</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-[#111827] border border-blue-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your admin email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-[#111827] border border-blue-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full px-6 py-3 bg-blue-500 text-white rounded-lg font-medium transition-colors ${
              isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
            }`}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400">
          This is a restricted area. Unauthorized access is prohibited.
        </p>
      </div>
    </div>
  )
}

export default AdminSignIn 