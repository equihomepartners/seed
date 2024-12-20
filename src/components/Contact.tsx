import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [timer, setTimer] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  })

  useEffect(() => {
    const countdown = () => {
      const endDate = new Date('2025-01-15T23:59:59-05:00').getTime()
      const now = new Date().getTime()
      const distance = endDate - now

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setTimer({
        days: days.toString().padStart(2, '0'),
        hours: hours.toString().padStart(2, '0'),
        minutes: minutes.toString().padStart(2, '0'),
        seconds: seconds.toString().padStart(2, '0')
      })
    }

    countdown()
    const interval = setInterval(countdown, 1000)

    return () => clearInterval(interval)
  }, [])

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
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
          timePreference,
          message,
        }),
      })

      if (!response.ok) throw new Error('Failed to send')
      
      setSubmitStatus('success')
      setName('')
      setEmail('')
      setTimePreference('')
      setMessage('')
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" ref={ref} className="bg-[#0B1121] py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-white mb-6">
            Join Our Vision & Diversify Your Portfolio
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            First round of investor calls closing January 15th - secure your spot now
          </p>

          <div className="flex justify-center gap-8 mt-8">
            <div className="text-center">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 min-w-[100px]">
                <div className="text-3xl font-bold text-blue-400">{timer.days}</div>
                <div className="text-sm text-gray-400 mt-1">Days</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 min-w-[100px]">
                <div className="text-3xl font-bold text-blue-400">{timer.hours}</div>
                <div className="text-sm text-gray-400 mt-1">Hours</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 min-w-[100px]">
                <div className="text-3xl font-bold text-blue-400">{timer.minutes}</div>
                <div className="text-sm text-gray-400 mt-1">Minutes</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 min-w-[100px]">
                <div className="text-3xl font-bold text-blue-400">{timer.seconds}</div>
                <div className="text-sm text-gray-400 mt-1">Seconds</div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-[#0F172A] border border-blue-500/10 rounded-2xl shadow-xl overflow-hidden">
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-blue-500/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-blue-500/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="timePreference" className="block text-sm font-medium text-gray-300 mb-2">
                  Preferred Time (EST)
                </label>
                <select
                  id="timePreference"
                  value={timePreference}
                  onChange={(e) => setTimePreference(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-blue-500/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a time preference</option>
                  <option value="Dec 18-22: Early Morning (8AM-10AM EST)">Dec 18-22: Early Morning (8AM-10AM EST)</option>
                  <option value="Dec 18-22: Late Morning (10AM-12PM EST)">Dec 18-22: Late Morning (10AM-12PM EST)</option>
                  <option value="Dec 18-22: Early Afternoon (12PM-2PM EST)">Dec 18-22: Early Afternoon (12PM-2PM EST)</option>
                  <option value="Dec 18-22: Late Afternoon (2PM-4PM EST)">Dec 18-22: Late Afternoon (2PM-4PM EST)</option>
                  <option value="Dec 18-22: Evening (4PM-6PM EST)">Dec 18-22: Evening (4PM-6PM EST)</option>
                  <option value="Jan 2-5: Early Morning (8AM-10AM EST)">Jan 2-5: Early Morning (8AM-10AM EST)</option>
                  <option value="Jan 2-5: Late Morning (10AM-12PM EST)">Jan 2-5: Late Morning (10AM-12PM EST)</option>
                  <option value="Jan 2-5: Early Afternoon (12PM-2PM EST)">Jan 2-5: Early Afternoon (12PM-2PM EST)</option>
                  <option value="Jan 2-5: Late Afternoon (2PM-4PM EST)">Jan 2-5: Late Afternoon (2PM-4PM EST)</option>
                  <option value="Jan 2-5: Evening (4PM-6PM EST)">Jan 2-5: Evening (4PM-6PM EST)</option>
                  <option value="Jan 8-12: Early Morning (8AM-10AM EST)">Jan 8-12: Early Morning (8AM-10AM EST)</option>
                  <option value="Jan 8-12: Late Morning (10AM-12PM EST)">Jan 8-12: Late Morning (10AM-12PM EST)</option>
                  <option value="Jan 8-12: Early Afternoon (12PM-2PM EST)">Jan 8-12: Early Afternoon (12PM-2PM EST)</option>
                  <option value="Jan 8-12: Late Afternoon (2PM-4PM EST)">Jan 8-12: Late Afternoon (2PM-4PM EST)</option>
                  <option value="Jan 8-12: Evening (4PM-6PM EST)">Jan 8-12: Evening (4PM-6PM EST)</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message (Optional)
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 bg-white/5 border border-blue-500/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Any specific topics you'd like to discuss?"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-6 py-4 rounded-lg text-white font-medium transition-all ${
                  isSubmitting
                    ? 'bg-blue-500/50 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}
              >
                {isSubmitting ? 'Sending...' : 'Schedule Call'}
              </button>

              {submitStatus === 'success' && (
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <p className="text-green-400 text-sm text-center">
                    Request sent successfully! We'll get back to you soon.
                  </p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                  <p className="text-red-400 text-sm text-center">
                    Failed to send request. Please try again.
                  </p>
                </div>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact 