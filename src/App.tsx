import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import SplashScreen from './components/SplashScreen'
import Launchpad from './components/Launchpad'
import BookCall from './components/BookCall'
import BusinessInfo from './components/BusinessInfo'
import PortfolioOS from './components/PortfolioOS'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      const sessionActive = localStorage.getItem('sessionActive') === 'true'
      const userEmail = localStorage.getItem('userEmail')
      setIsAuthenticated(sessionActive && !!userEmail)
      setIsLoading(false)
    }

    checkAuth()
    window.addEventListener('storage', checkAuth)
    return () => window.removeEventListener('storage', checkAuth)
  }, [])

  if (isLoading) {
    return null
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/launchpad" replace />
            ) : (
              <SplashScreen />
            )
          }
        />
        <Route
          path="/launchpad"
          element={
            isAuthenticated ? (
              <Launchpad />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/book-call"
          element={
            isAuthenticated ? (
              <BookCall />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/business-info"
          element={
            isAuthenticated ? (
              <BusinessInfo />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/portfolio-os"
          element={
            isAuthenticated ? (
              <PortfolioOS />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
