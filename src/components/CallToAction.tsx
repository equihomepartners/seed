import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaCalendar, FaEnvelope, FaPhone, FaArrowRight, FaClock, FaMapMarkerAlt } from 'react-icons/fa'
import { useState } from 'react'

const CallToAction = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

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
        setName('')
        setEmail('')
        setCompany('')
        setTimePreference('')
        setMessage('')
      }, 2000)
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const benefits = [
    {
      icon: FaCalendar,
      title: "Personalized Demo",
      description: "Get a walkthrough of our platform tailored to your needs"
    },
    {
      icon: FaClock,
      title: "Flexible Timing",
      description: "Choose from multiple time slots that work best for you"
    },
    {
      icon: FaMapMarkerAlt,
      title: "Sydney Time Zone",
      description: "All times are in Sydney local time (AEST/AEDT)"
    }
  ]

  return (
    <section ref={ref} className="min-h-screen flex flex-col items-center justify-center py-20 px-4 bg-[#0B1121]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-bold mb-6">Schedule a Call</h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Book a personalized demo to explore how EquiHome can transform your property investment journey
        </p>
      </motion.div>

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-[#111827] rounded-2xl p-8 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent" />
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-8">Why Book a Call?</h3>
            
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-4 p-4 bg-black/20 rounded-xl group hover:bg-black/30 transition-colors duration-300"
                >
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">
                    <benefit.icon className="text-xl" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium">{benefit.title}</h4>
                    <p className="text-gray-400">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 space-y-6">
              <div className="flex items-center gap-4 p-4 bg-black/20 rounded-xl">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">
                  <FaEnvelope className="text-xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email Us</p>
                  <p className="text-lg font-medium">invest@equihome.com.au</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-black/20 rounded-xl">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">
                  <FaPhone className="text-xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Call Us</p>
                  <p className="text-lg font-medium">+61 2 1234 5678</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Booking Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-[#111827] rounded-2xl p-8 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent" />
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-8">Book Your Demo</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
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
                <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                  Company (Optional)
                </label>
                <input
                  type="text"
                  id="company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-blue-500/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your company name"
                />
              </div>

              <div>
                <label htmlFor="timePreference" className="block text-sm font-medium text-gray-300 mb-2">
                  Preferred Time (Sydney Time)
                </label>
                <select
                  id="timePreference"
                  value={timePreference}
                  onChange={(e) => setTimePreference(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-blue-500/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message (Optional)
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
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

export default CallToAction 