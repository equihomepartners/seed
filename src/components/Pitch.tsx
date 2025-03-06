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
      const margin = 10
      let currentPage = 1

      // Add cover page
      pdf.setFillColor(240, 249, 255) // sky-50
      pdf.rect(0, 0, pdf.internal.pageSize.width, pdf.internal.pageSize.height, 'F')
      pdf.setFontSize(24)
      pdf.setTextColor(2, 132, 199) // sky-600
      pdf.text('Equihome', margin, 30)
      pdf.setFontSize(16)
      pdf.setTextColor(51, 65, 85) // slate-700
      pdf.text('Investment Pitch Deck', margin, 45)
      pdf.setFontSize(12)
      pdf.text(`Generated on ${new Date().toLocaleDateString()}`, margin, 60)
      
      // Add table of contents
      pdf.addPage()
      currentPage++
      pdf.setFontSize(18)
      pdf.setTextColor(2, 132, 199)
      pdf.text('Table of Contents', margin, 20)
      pdf.setFontSize(12)
      pdf.setTextColor(51, 65, 85)
      
      let tocY = 35
      const sections_list = [
        'Executive Summary',
        'Vision & Problem',
        'Current Market Options',
        'Our Solution',
        'Australian Market',
        'US Model Validation',
        'Business Model',
        'Win-Win Model',
        'Growth Trajectory',
        'Team',
        'Strategic Backing',
        'Investment Opportunity'
      ]
      
      sections_list.forEach((section, index) => {
        pdf.text(`${index + 1}. ${section}`, margin, tocY)
        tocY += 10
      })

      // Process each section
      for (const section of Array.from(sections)) {
        const canvas = await html2canvas(section, {
          scale: 2,
          useCORS: true,
          logging: false
        })

        const imgData = canvas.toDataURL('image/jpeg', 1.0)
        const imgWidth = pdf.internal.pageSize.width - (margin * 2)
        const imgHeight = (canvas.height * imgWidth) / canvas.width

        if (currentPage > 1) {
          pdf.addPage()
        }

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
      <GlobalHeader currentPage="pitch" />
      
      {/* Download Button */}
      <button
        onClick={generatePDF}
        className="fixed bottom-8 right-8 bg-sky-600 hover:bg-sky-700 text-white p-4 rounded-full shadow-lg z-50 transition-transform hover:scale-105 active:scale-95"
        aria-label="Download Pitch Deck"
      >
        <FaDownload className="text-xl" />
      </button>
      
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