import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Hero from './components/Hero'
import Solution from './components/Solution'
import AustralianMarket from './components/AustralianMarket'
import BusinessModel from './components/BusinessModel'
import WinWinModel from './components/WinWinModel'
import GrowthTrajectory from './components/GrowthTrajectory'
import Team from './components/Team'
import StrategicBacking from './components/StrategicBacking'
import InvestmentOpportunity from './components/InvestmentOpportunity'
import Contact from './components/Contact'
import Navigation from './components/Navigation'
import LoadingScreen from './components/LoadingScreen'
import SplashScreen from './components/SplashScreen'
import CurrentOptions from './components/CurrentOptions'
import ChatBot from './components/ChatBot'
import Launchpad from './components/Launchpad'
import PortfolioOS from './components/PortfolioOS'
import Pitch from './components/Pitch'
import BookCall from './components/BookCall'
import WebinarPage from './pages/webinar'

function App() {
  const [showSplash, setShowSplash] = useState(() => {
    const hasCompletedSplash = localStorage.getItem('hasCompletedSplash')
    return hasCompletedSplash !== 'true'
  })
  const [showLoading, setShowLoading] = useState(true)

  useEffect(() => {
    // Force set loading and splash to false for testing
    setShowLoading(false)
    setShowSplash(false)
    console.log('App state:', { showSplash, showLoading })
  }, [])

  const handleSplashComplete = () => {
    setShowSplash(false)
    localStorage.setItem('hasCompletedSplash', 'true')
  }

  // Add debug log to check if ChatBot is being rendered
  useEffect(() => {
    console.log('ChatBot should be visible:', !showLoading && !showSplash)
  }, [showLoading, showSplash])

  return (
    <Router>
      <div className="bg-[#0B1121] text-white min-h-screen">
        <Routes>
          {/* Original Landing Page */}
          <Route path="/" element={
            <>
              {showLoading && (
                <LoadingScreen onComplete={() => setShowLoading(false)} />
              )}
              
              {!showLoading && showSplash && (
                <SplashScreen onEnter={handleSplashComplete} />
              )}

              {!showLoading && !showSplash && (
                <>
                  <Navigation />
                  <Hero />
                  <CurrentOptions />
                  <Solution />
                  <AustralianMarket />
                  <BusinessModel />
                  <WinWinModel />
                  <GrowthTrajectory />
                  <Team />
                  <StrategicBacking />
                  <InvestmentOpportunity />
                  <Contact />
                </>
              )}
            </>
          } />

          {/* Launchpad and Portfolio Routes */}
          <Route path="/launchpad" element={<Launchpad />} />
          <Route path="/portfolio" element={<PortfolioOS />} />
          <Route path="/pitch" element={<Pitch />} />
          <Route path="/book-call" element={<BookCall />} />
          <Route path="/webinar" element={<WebinarPage />} />
        </Routes>

        {/* Force render ChatBot for testing */}
        <ChatBot />
      </div>
    </Router>
  )
}

export default App
