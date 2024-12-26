import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaCalendar, FaClock, FaUsers, FaPlay, FaArrowRight } from 'react-icons/fa'

const WebinarRegistration = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  // Event details
  const eventDetails = {
    title: 'Equihome | Seed Webinar',
    date: 'January 22nd, 2025',
    startTime: '11:00 AM AEDT',
    endTime: '12:00 PM AEDT',
    estTime: '7:00 PM EST (Previous Day)',
    meetLink: 'https://meet.google.com/doa-bzyb-eex',
    phoneNumber: '+1 617-675-4444',
    pin: '666 337 971 0308#',
    // Calendar event details for Google Calendar link
    googleCalendarUrl: `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Equihome | Seed Webinar')}&dates=20250122T000000Z/20250122T010000Z&details=${encodeURIComponent('Join us for the Equihome Seed Investment Webinar\n\nVideo link: https://meet.google.com/doa-bzyb-eex\nPhone: +1 617-675-4444\nPIN: 666 337 971 0308#\n\nHosted by Co-Founders of Equihome Partners')}&location=${encodeURIComponent('Google Meet')}`
  }

  // Convert time to user's local timezone
  const getLocalTime = () => {
    const sydneyTime = new Date('2025-01-22T11:00:00+11:00')
    const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      timeZoneName: 'short'
    }
    return new Intl.DateTimeFormat(undefined, options).format(sydneyTime)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Store registration in localStorage
      const userId = localStorage.getItem('userId')
      const progress = JSON.parse(localStorage.getItem('investorProgress') || '{}')
      
      // Update progress to include webinar registration
      const updatedProgress = {
        ...progress,
        webinarRegistered: true,
        webinarRegistrationData: {
          name,
          email,
          company,
          registrationDate: new Date().toISOString(),
          eventDetails
        }
      }
      
      localStorage.setItem('investorProgress', JSON.stringify(updatedProgress))
      
      // Track the registration in visit history
      const visitHistory = progress.visitHistory || []
      visitHistory.push({
        page: 'webinar-registration',
        timestamp: new Date().toISOString()
      })
      
      localStorage.setItem('investorProgress', JSON.stringify({
        ...updatedProgress,
        visitHistory
      }))

      setSubmitStatus('success')
    } catch (error) {
      setSubmitStatus('error')
      console.error('Registration error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Success screen with event details
  const SuccessScreen = () => (
    <div className="space-y-6">
      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4">Thank you for registering, {name.split(' ')[0]}!</h3>
        
        <div className="space-y-4 mb-6">
          <div className="bg-[#0a0f1a] rounded-lg p-4">
            <h4 className="text-lg font-medium text-white mb-2">Event Details</h4>
            <p className="text-gray-300">Date: {eventDetails.date}</p>
            <p className="text-gray-300">Time: {eventDetails.startTime} - {eventDetails.endTime}</p>
            <p className="text-gray-300">EST: {eventDetails.estTime}</p>
            <p className="text-purple-400">Your local time: {getLocalTime()}</p>
          </div>

          <div className="bg-[#0a0f1a] rounded-lg p-4">
            <h4 className="text-lg font-medium text-white mb-2">How to Join</h4>
            <p className="text-gray-300 mb-2">1. Click the "Add to Google Calendar" button below</p>
            <p className="text-gray-300 mb-2">2. Join via video link:</p>
            <a href={eventDetails.meetLink} target="_blank" rel="noopener noreferrer" 
              className="text-purple-400 hover:text-purple-300 break-all">
              {eventDetails.meetLink}
            </a>
            <p className="text-gray-300 mt-4 mb-1">Or join by phone:</p>
            <p className="text-gray-300">{eventDetails.phoneNumber}</p>
            <p className="text-gray-300">PIN: {eventDetails.pin}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={eventDetails.googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-purple-500 hover:bg-purple-600 text-white font-medium transition-colors"
          >
            <FaCalendar className="mr-2" />
            Add to Google Calendar
          </a>
          <button
            onClick={() => {
              const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:20250122T000000Z
DTEND:20250122T010000Z
SUMMARY:Equihome | Seed Webinar
DESCRIPTION:Join us for the Equihome Seed Investment Webinar\\n\\nVideo link: ${eventDetails.meetLink}\\nPhone: ${eventDetails.phoneNumber}\\nPIN: ${eventDetails.pin}\\n\\nHosted by Co-Founders of Equihome Partners
LOCATION:Google Meet
END:VEVENT
END:VCALENDAR`;
              const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
              const link = document.createElement('a');
              link.href = window.URL.createObjectURL(blob);
              link.download = 'equihome_webinar.ics';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#1a1f2d] hover:bg-[#252a3d] text-white font-medium transition-colors"
          >
            <FaCalendar className="mr-2" />
            Download for Other Calendars
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <section ref={ref} className="min-h-screen py-24 bg-[#0B1121]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6">Investment Webinar</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join our exclusive webinar to learn about the future of property investment
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Webinar Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-[#111827] rounded-2xl p-8 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent" />
            <div className="relative z-10">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <FaPlay className="text-2xl text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Webinar Details</h3>
                  <p className="text-purple-400">{eventDetails.date}</p>
                </div>
              </div>

              <div className="space-y-6 mb-8">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                    <FaClock className="text-purple-400" />
                  </div>
                  <div>
                    <div className="font-medium text-white">Time</div>
                    <div className="text-gray-400">{eventDetails.startTime} - {eventDetails.endTime}</div>
                    <div className="text-sm text-purple-400">{eventDetails.estTime}</div>
                    <div className="text-sm text-purple-400">({getLocalTime()} your local time)</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                    <FaUsers className="text-purple-400" />
                  </div>
                  <div>
                    <div className="font-medium text-white">Hosted by</div>
                    <div className="text-gray-400">Co-Founders</div>
                    <div className="text-sm text-purple-400">Equihome Partners</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                    <FaCalendar className="text-purple-400" />
                  </div>
                  <div>
                    <div className="font-medium text-white">How to Join</div>
                    <div className="text-gray-400">Click "Yes" on the calendar invite</div>
                    <div className="text-sm text-purple-400">Google Meet link will be provided</div>
                  </div>
                </div>
              </div>

              <div className="bg-[#0a0f1a] rounded-xl p-6">
                <h4 className="text-lg font-bold text-white mb-4">What You'll Learn</h4>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-2" />
                    Deep dive into our business model
                  </li>
                  <li className="flex items-center text-gray-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-2" />
                    Investment opportunity overview
                  </li>
                  <li className="flex items-center text-gray-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-2" />
                    Q&A with founding team
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Registration Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-[#111827] rounded-2xl p-8 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent" />
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-8">Register Now</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-purple-500/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-purple-500/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Company (Optional)
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-purple-500/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter your company name"
                  />
                </div>

                <div className="space-y-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full px-6 py-4 rounded-lg text-white font-medium transition-all flex items-center justify-center space-x-2 ${
                      isSubmitting
                        ? 'bg-purple-500/50 cursor-not-allowed'
                        : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                    }`}
                  >
                    <span>{isSubmitting ? 'Registering...' : 'Register'}</span>
                    {!isSubmitting && <FaArrowRight className="text-sm" />}
                  </button>

                  {submitStatus === 'success' && <SuccessScreen />}

                  {submitStatus === 'error' && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                      <p className="text-red-400 text-sm text-center">
                        Registration failed. Please try again.
                      </p>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default WebinarRegistration
