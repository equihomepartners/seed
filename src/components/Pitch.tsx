import { useEffect, useRef } from 'react'
import Hero from './Hero'
import Vision from './Vision'
import Solution from './Solution'
import AustralianMarket from './AustralianMarket'
import BusinessModel from './BusinessModel'
import WinWinModel from './WinWinModel'
import GrowthTrajectory from './GrowthTrajectory'
import Team from './Team'
import StrategicBacking from './StrategicBacking'
import InvestmentOpportunity from './InvestmentOpportunity'
import CurrentOptions from './CurrentOptions'
import GlobalHeader from './GlobalHeader'
import USModel from './USModel'
import TechnologyPlatform from './TechnologyPlatform'

const Pitch = () => {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Track that the pitch has been viewed
    const currentProgress = JSON.parse(localStorage.getItem('investorProgress') || '{}')
    const updatedProgress = {
      ...currentProgress,
      businessPitchViewed: true,
      lastVisited: new Date().toISOString(),
      visitHistory: [
        ...(currentProgress.visitHistory || []),
        {
          page: 'businessPitchViewed',
          timestamp: new Date().toISOString()
        }
      ]
    }
    localStorage.setItem('investorProgress', JSON.stringify(updatedProgress))

    // Scroll to top
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <GlobalHeader currentPage="pitch" />
      
      {/* Main Content */}
      <div ref={contentRef} className="pt-[72px]">
        <Hero />
        <Vision />
        <Solution />
        <AustralianMarket />
        <TechnologyPlatform />
        <USModel />
        <BusinessModel />
        <WinWinModel />
        <GrowthTrajectory />
        <Team />
        <StrategicBacking />
        <InvestmentOpportunity />
        <CurrentOptions />
      </div>
    </div>
  )
}

export default Pitch 