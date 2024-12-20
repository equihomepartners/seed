import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface CallSchedulerProps {
  isOpen: boolean
  onClose: () => void
}

const CallScheduler = ({ isOpen, onClose }: CallSchedulerProps) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [timePreference, setTimePreference] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/schedule-call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          company,
          timePreference,
          message,
        }),
      })

      if (!response.ok) throw new Error('Failed to send')
      
      setSubmitStatus('success')
      setTimeout(() => {
        onClose()
        // Reset form
        setName('')
        setEmail('')
        setCompany('')
        setTimePreference('')
        setMessage('')
        setSubmitStatus('idle')
      }, 2000)
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg z-50"
          >
            <div className="bg-[#0F172A] border border-blue-500/10 rounded-2xl shadow-xl overflow-hidden">
              <div className="border-b border-blue-500/10 p-6 flex justify-between items-center">
                <h3 className="text-2xl font-bold text-white">Schedule a Call</h3>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-2 bg-white/5 border border-blue-500/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 bg-white/5 border border-blue-500/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-4 py-2 bg-white/5 border border-blue-500/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your company name"
                  />
                </div>

                <div>
                  <label htmlFor="timePreference" className="block text-sm font-medium text-gray-300 mb-1">
                    Preferred Time (Sydney Time)
                  </label>
                  <select
                    id="timePreference"
                    value={timePreference}
                    onChange={(e) => setTimePreference(e.target.value)}
                    required
                    className="w-full px-4 py-2 bg-white/5 border border-blue-500/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a time preference</option>
                    <option value="Early Morning (8AM-10AM)">Early Morning (8AM-10AM)</option>
                    <option value="Late Morning (10AM-12PM)">Late Morning (10AM-12PM)</option>
                    <option value="Early Afternoon (12PM-2PM)">Early Afternoon (12PM-2PM)</option>
                    <option value="Late Afternoon (2PM-4PM)">Late Afternoon (2PM-4PM)</option>
                    <option value="Evening (4PM-6PM)">Evening (4PM-6PM)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                    Message (Optional)
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 bg-white/5 border border-blue-500/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Any specific topics you'd like to discuss?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-6 py-3 rounded-lg text-white font-medium transition-all ${
                    isSubmitting
                      ? 'bg-blue-500/50 cursor-not-allowed'
                      : 'bg-blue-500 hover:bg-blue-600'
                  }`}
                >
                  {isSubmitting ? 'Sending...' : 'Schedule Call'}
                </button>

                {submitStatus === 'success' && (
                  <p className="text-green-400 text-sm text-center">
                    Request sent successfully! We'll get back to you soon.
                  </p>
                )}

                {submitStatus === 'error' && (
                  <p className="text-red-400 text-sm text-center">
                    Failed to send request. Please try again.
                  </p>
                )}
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default CallScheduler 