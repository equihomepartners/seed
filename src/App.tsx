import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import SplashScreen from './components/SplashScreen'
import Launchpad from './components/Launchpad'
import BookCall from './components/BookCall'
import BusinessInfo from './components/BusinessInfo'
import PortfolioOS from './components/PortfolioOS'
import InvestorDashboard from './components/dashboard/InvestorDashboard'
import ChatBot from './components/ChatBot'
import Pitch from './components/Pitch'
import InterestRegistration from './components/forms/InterestRegistration'
import AdminDashboard from './components/admin/AdminDashboard'
import AdminSignIn from './components/admin/AdminSignIn'
import WebinarRegistration from './components/WebinarRegistration'
import PageTracker from './components/PageTracker'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      const sessionActive = localStorage.getItem('sessionActive') === 'true'
      const userEmail = localStorage.getItem('userEmail')
      const adminAuthenticated = localStorage.getItem('adminAuthenticated') === 'true'
      const adminEmail = localStorage.getItem('adminEmail')?.toLowerCase() === 'sujay@equihome.com.au'

      setIsAuthenticated(sessionActive && !!userEmail)
      setIsAdminAuthenticated(adminAuthenticated && adminEmail)
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
      {isAuthenticated && <PageTracker />}
      <Routes>
        {/* Admin Routes */}
        <Route
          path="/admin/signin"
          element={
            !isAdminAuthenticated ? (
              <AdminSignIn />
            ) : (
              <Navigate to="/admin" replace />
            )
          }
        />
        <Route
          path="/admin"
          element={
            isAdminAuthenticated ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/admin/signin" replace />
            )
          }
        />

        {/* Regular User Routes */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Launchpad />
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
        <Route
          path="/pitch"
          element={
            isAuthenticated ? (
              <Pitch />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <InvestorDashboard />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/register-interest"
          element={
            isAuthenticated ? (
              <InterestRegistration />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/webinar"
          element={
            isAuthenticated ? (
              <WebinarRegistration />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {isAuthenticated && <ChatBot />}
    </Router>
  )
}

export default App
