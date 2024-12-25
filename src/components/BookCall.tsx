import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import GlobalHeader from './GlobalHeader'
import { FaLock, FaHandshake, FaClock, FaUsers, FaRocket, FaCheckCircle } from 'react-icons/fa'

interface FormData {
  name: string
  email: string
  company: string
  investmentRange: string
}

const BookCall: React.FC = () => {
  const [step, setStep] = useState<number>(1)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    investmentRange: ''
  })

  // Initialize with stored email if available
  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail')
    if (storedEmail) {
      setFormData(prev => ({ ...prev, email: storedEmail }))
    }
  }, [])

  // Calculate progress percentage
  const totalRound = 5000000 // $5M
  const currentRaised = 550000 // $550K
  const progressPercentage = (currentRaised / totalRound) * 100

  // Calculate days remaining
  const endDate = new Date('2025-01-31')
  const startDate = new Date('2024-12-16')
  const today = new Date()
  const daysRemaining = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

  useEffect(() => {
    // Add Calendly event listener
    const handleCalendlyEvent = (e: any) => {
      if (e.data.event === 'calendly.event_scheduled') {
        // Get the scheduled date from the event
        const scheduledDate = new Date(e.data.payload.event.start_time).toISOString()
        
        // Track that a call has been scheduled with the actual date
        const currentProgress = JSON.parse(localStorage.getItem('investorProgress') || '{}')
        const updatedProgress = {
          ...currentProgress,
          introCallScheduled: true,
          scheduledCallDate: scheduledDate,
          lastVisited: new Date().toISOString(),
          visitHistory: [
            ...(currentProgress.visitHistory || []),
            {
              page: 'introCallScheduled',
              timestamp: new Date().toISOString(),
              scheduledDate: scheduledDate
            }
          ]
        }
        localStorage.setItem('investorProgress', JSON.stringify(updatedProgress))
      }
    }

    window.addEventListener('message', handleCalendlyEvent)
    return () => window.removeEventListener('message', handleCalendlyEvent)
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStep(2)
    
    // Store the form data
    localStorage.setItem('bookingData', JSON.stringify(formData))
    // Remove the progress tracking from here since we'll do it when the call is actually scheduled
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-[#0B1121]">
      <GlobalHeader currentPage="book-call" />
      
      {/* Fundraising Progress Bar */}
      <div className="fixed top-[72px] left-0 right-0 bg-[#0a0f1a]/80 backdrop-blur-sm border-b border-blue-500/10 z-40">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between text-sm mb-2">
            <div className="text-gray-400">Seed Round Progress</div>
            <div className="text-white font-medium">${(currentRaised / 1000000).toFixed(1)}M raised of $5M</div>
          </div>
          <div className="relative h-1.5 bg-[#1a2234] rounded-full overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
          <div className="flex items-center justify-between text-xs mt-2">
            <div className="text-gray-500">Dec 16, 2024</div>
            <div className="text-gray-400">{daysRemaining} days remaining</div>
            <div className="text-gray-500">Jan 31, 2025</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-[180px] pb-16 px-6">
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-6xl mx-auto"
            >
              {/* Form content remains the same */}
              <div className="text-center mb-12">
                <motion.h1 
                  className="text-4xl font-light text-white mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Schedule Your Investment Discussion
                </motion.h1>
                <motion.p 
                  className="text-xl text-gray-400 max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Join us for an exclusive discussion about our seed round and discover how we're revolutionizing property investment.
                </motion.p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left Column - Investment Summary */}
                <div className="space-y-8">
                  {/* Key Investment Points */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-8 rounded-2xl border border-blue-500/20 backdrop-blur-xl"
                  >
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                        <FaRocket className="text-2xl text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-medium text-white">Investment Summary</h3>
                        <p className="text-blue-400">Key Details</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-[#0a0f1a]/60 rounded-lg">
                        <span className="text-gray-400">Round Size</span>
                        <span className="text-white font-medium">$5M</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-[#0a0f1a]/60 rounded-lg">
                        <span className="text-gray-400">Minimum Investment</span>
                        <span className="text-white font-medium">$50,000</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Target Return</span>
                        <span className="text-white font-medium">8-26x+ ROI</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-[#0a0f1a]/60 rounded-lg">
                        <span className="text-gray-400">Investment Timeline</span>
                        <span className="text-white font-medium">5-7 Years</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* What to Expect */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-[#1a2234]/60 rounded-2xl p-8 border border-blue-500/10"
                  >
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                        <FaHandshake className="text-2xl text-blue-400" />
                      </div>
                      <h3 className="text-xl font-medium text-white">What to Expect</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                          <FaClock className="text-blue-400" />
                        </div>
                        <div>
                          <div className="text-white font-medium mb-1">30-Minute Discussion</div>
                          <p className="text-sm text-gray-400">Focused conversation about your investment interests and our opportunity</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                          <FaUsers className="text-blue-400" />
                        </div>
                        <div>
                          <div className="text-white font-medium mb-1">Meet the Team</div>
                          <p className="text-sm text-gray-400">Direct access to key team members for detailed discussions</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                          <FaLock className="text-blue-400" />
                        </div>
                        <div>
                          <div className="text-white font-medium mb-1">Deal Room Access</div>
                          <p className="text-sm text-gray-400">Full access to detailed financials and documentation</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Right Column - Form */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="bg-[#1a2234]/80 p-8 rounded-2xl border border-blue-500/10 backdrop-blur-xl">
                    <h2 className="text-2xl font-light text-white mb-8">Schedule Your Discussion</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full bg-[#0d1117] border border-blue-500/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/30 transition-colors"
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Work Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full bg-[#0d1117] border border-blue-500/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/30 transition-colors"
                          placeholder="Enter your work email"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Company</label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full bg-[#0d1117] border border-blue-500/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/30 transition-colors"
                          placeholder="Enter your company name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Investment Range</label>
                        <select
                          name="investmentRange"
                          value={formData.investmentRange}
                          onChange={handleChange}
                          required
                          className="w-full bg-[#0d1117] border border-blue-500/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/30 transition-colors"
                        >
                          <option value="">Select investment range</option>
                          <option value="50k-100k">$50,000 - $100,000</option>
                          <option value="100k-250k">$100,000 - $250,000</option>
                          <option value="250k-500k">$250,000 - $500,000</option>
                          <option value="500k+">$500,000+</option>
                        </select>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg shadow-purple-500/20"
                      >
                        Continue to Calendar
                      </button>
                    </form>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="calendar"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.5 }}
                  className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center"
                >
                  <FaCheckCircle className="text-3xl text-green-400" />
                </motion.div>
                <h2 className="text-3xl font-light text-white mb-4">Select Your Preferred Time</h2>
                <p className="text-gray-400">Choose a time that works best for you to discuss your investment opportunity.</p>
              </div>

              {/* Calendly inline widget */}
              <div className="rounded-2xl overflow-hidden border border-blue-500/10 bg-[#1a2234]/80 backdrop-blur-xl">
                <iframe
                  src={`https://calendly.com/equihomeseed/seed?embed_domain=${window.location.host}&embed_type=inline&background_color=0a0f1a&text_color=ffffff&primary_color=3b82f6&name=${encodeURIComponent(formData.name)}&email=${encodeURIComponent(formData.email)}`}
                  width="100%"
                  height="700"
                  frameBorder="0"
                  title="Schedule a call"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default BookCall 