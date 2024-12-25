import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import SplashScreen from './components/SplashScreen'
import Launchpad from './components/Launchpad'
import BookCall from './components/BookCall'
import BusinessInfo from './components/BusinessInfo'
import PortfolioOS from './components/PortfolioOS'

function App() {
  const [hasCompletedSplash, setHasCompletedSplash] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const splashCompleted = localStorage.getItem('hasCompletedSplash') === 'true'
    const sessionActive = localStorage.getItem('sessionActive') === 'true'
    setHasCompletedSplash(splashCompleted && sessionActive)
    setIsLoading(false)
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
            hasCompletedSplash ? (
              <Navigate to="/launchpad" replace />
            ) : (
              <SplashScreen onComplete={() => setHasCompletedSplash(true)} />
            )
          }
        />
        <Route
          path="/launchpad"
          element={
            hasCompletedSplash ? (
              <Launchpad />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/book-call"
          element={
            hasCompletedSplash ? (
              <BookCall />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/business-info"
          element={
            hasCompletedSplash ? (
              <BusinessInfo />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/portfolio-os"
          element={
            hasCompletedSplash ? (
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
