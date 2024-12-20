import { useState } from 'react'
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

function App() {
  const [showSplash, setShowSplash] = useState(true)
  const [showLoading, setShowLoading] = useState(true)

  return (
    <div className="bg-[#0B1121] text-white relative">
      {showLoading && (
        <LoadingScreen onComplete={() => setShowLoading(false)} />
      )}
      
      {!showLoading && showSplash && (
        <SplashScreen onEnter={() => setShowSplash(false)} />
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
    </div>
  )
}

export default App
