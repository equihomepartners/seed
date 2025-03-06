import { useEffect } from 'react'
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

const Pitch = () => {
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
      <div className="pt-[72px]">
        <div className="max-w-7xl mx-auto">
          <section id="hero" className="bg-white">
            <Hero />
          </section>
          <section id="problem-solution" className="bg-gray-50">
            <Vision />
          </section>
          <section id="current-options" className="bg-white">
            <CurrentOptions />
          </section>
          <section id="solution" className="bg-gray-50">
            <Solution />
          </section>
          <section id="australian-market" className="bg-white">
            <AustralianMarket />
          </section>
          <section id="us-model" className="bg-gray-50">
            <USModel />
          </section>
          <section id="business-model" className="bg-white">
            <BusinessModel />
          </section>
          <section id="win-win" className="bg-gray-50">
            <WinWinModel />
          </section>
          <section id="growth-trajectory" className="bg-white">
            <GrowthTrajectory />
          </section>
          <section id="team" className="bg-gray-50">
            <Team />
          </section>
          <section id="strategic-backing" className="bg-white">
            <StrategicBacking />
          </section>
          <section id="investment-opportunity" className="bg-gray-50">
            <InvestmentOpportunity />
          </section>
        </div>
      </div>
    </div>
  )
}

export default Pitch 