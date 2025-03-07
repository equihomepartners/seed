import { useEffect, useRef } from 'react'
import { FaDownload } from 'react-icons/fa'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
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

  const generatePDF = async () => {
    if (!contentRef.current) return

    // Show loading state
    const loadingToast = document.createElement('div')
    loadingToast.className = 'fixed top-4 right-4 bg-sky-600 text-white px-6 py-3 rounded-lg shadow-lg z-50'
    loadingToast.textContent = 'Generating PDF...'
    document.body.appendChild(loadingToast)

    try {
      const sections = contentRef.current.querySelectorAll('section')
      const pdf = new jsPDF('p', 'mm', 'a4', true)
      const margin = 20 // Increased margin for better spacing
      let currentPage = 0

      // Get the hero section for the cover page
      const heroSection = sections[0]
      if (heroSection) {
        const canvas = await html2canvas(heroSection, {
          useCORS: true,
          logging: false,
          background: '#FFFFFF'
        })

        const imgData = canvas.toDataURL('image/jpeg', 1.0)
        const imgWidth = pdf.internal.pageSize.width
        const imgHeight = (canvas.height * imgWidth) / canvas.width

        // Add cover page without margins for full bleed
        pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight)
        currentPage++
      }

      // Process remaining sections (skip the hero section since we used it as cover)
      for (const section of Array.from(sections).slice(1)) {
        const canvas = await html2canvas(section, {
          useCORS: true,
          logging: false,
          background: '#FFFFFF'
        })

        const imgData = canvas.toDataURL('image/jpeg', 1.0)
        const imgWidth = pdf.internal.pageSize.width - (margin * 2)
        const imgHeight = (canvas.height * imgWidth) / canvas.width

        // Add new page for each section with margins
        pdf.addPage()
        pdf.addImage(imgData, 'JPEG', margin, margin, imgWidth, imgHeight)
        currentPage++
      }

      // Save the PDF
      pdf.save('Equihome-Pitch-Deck.pdf')
      
      // Show success message
      loadingToast.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50'
      loadingToast.textContent = 'PDF downloaded successfully!'
      setTimeout(() => {
        document.body.removeChild(loadingToast)
      }, 3000)
    } catch (error) {
      console.error('Error generating PDF:', error)
      loadingToast.className = 'fixed top-4 right-4 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg z-50'
      loadingToast.textContent = 'Error generating PDF. Please try again.'
      setTimeout(() => {
        document.body.removeChild(loadingToast)
      }, 3000)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <GlobalHeader currentPage="pitch" onDownloadPDF={generatePDF} />
      
      {/* Main Content */}
      <div className="pt-[72px]" ref={contentRef}>
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