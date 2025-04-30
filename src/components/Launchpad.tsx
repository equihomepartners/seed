import { motion } from 'framer-motion'
import { FaLock, FaChartLine, FaBuilding, FaFileAlt, FaUsers, FaBrain, FaArrowRight, FaCalendar, FaDownload, FaPlay, FaNewspaper, FaLinkedin, FaGlobe, FaChartBar, FaMapMarkerAlt, FaCheck, FaHome, FaPhone, FaHandshake, FaKey, FaChartPie, FaUser, FaEnvelope, FaUnlock } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import GlobalHeader from './GlobalHeader'
import InvestmentBreakdownCard from './InvestmentBreakdownCard'
import { IconType } from 'react-icons'
import { useInView } from 'react-intersection-observer'

interface Step {
  icon: IconType;
  title: string;
  description: string;
  action: string;
  isLocked: boolean;
  gradient?: string;
  info?: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'https://equihome-seed-api-pnk9i.ondigitalocean.app/api'

const Launchpad = () => {
  const navigate = useNavigate()
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [isRequestingAccess, setIsRequestingAccess] = useState(false)
  const [hasDealRoomAccess, setHasDealRoomAccess] = useState(false)
  const [isCheckingAccess, setIsCheckingAccess] = useState(true)
  const [subscriptionStatus, setSubscriptionStatus] = useState(() => {
    const status = localStorage.getItem('newsletterStatus')
    return status ? JSON.parse(status) : { isSubscribed: false }
  })

  // Check if user has access to Deal Room
  useEffect(() => {
    const checkAccess = async () => {
      setIsCheckingAccess(true);
      const userEmail = localStorage.getItem('userEmail');

      if (!userEmail) {
        setHasDealRoomAccess(false);
        setIsCheckingAccess(false);
        return;
      }

      try {
        // First check localStorage for offline functionality
        const approvedUsers = JSON.parse(localStorage.getItem('approvedUsers') || '[]');
        const hasLocalAccess = approvedUsers.some((user: any) =>
          user.email === userEmail && user.accessType === 'dealRoom'
        );

        if (hasLocalAccess) {
          setHasDealRoomAccess(true);
          setIsCheckingAccess(false);
          return;
        }

        // Then check with the server
        const response = await fetch(`/api/check-access?email=${encodeURIComponent(userEmail)}&resourceType=dealRoom`);

        if (response.ok) {
          const data = await response.json();
          setHasDealRoomAccess(data.hasAccess);

          // If has access, update localStorage for offline functionality
          if (data.hasAccess) {
            const approvedUsers = JSON.parse(localStorage.getItem('approvedUsers') || '[]');
            if (!approvedUsers.some((user: any) => user.email === userEmail && user.accessType === 'dealRoom')) {
              approvedUsers.push({
                email: userEmail,
                name: localStorage.getItem('userName') || 'User',
                accessType: 'dealRoom',
                approvedAt: data.since || new Date().toISOString()
              });
              localStorage.setItem('approvedUsers', JSON.stringify(approvedUsers));
            }
          }
        } else {
          // If API fails, default to no access
          setHasDealRoomAccess(false);
        }
      } catch (error) {
        console.error('Error checking access:', error);
        setHasDealRoomAccess(false);
      } finally {
        setIsCheckingAccess(false);
      }
    };

    checkAccess();
  }, []);

  const steps: Step[] = [
    {
      icon: FaBuilding,
      title: "Business Pitch",
      description: "Full top-level breakdown of Equihome's vision, model and opportunity",
      action: "/pitch",
      isLocked: false,
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      icon: FaPhone,
      title: "Investment Discussion",
      description: "Schedule a call to discuss investment opportunity",
      action: "/book-call",
      isLocked: false,
      gradient: "from-indigo-600 to-purple-600"
    },
    {
      icon: FaChartPie,
      title: "Portfolio OS",
      description: "View a simulation of our first $50M Sydney Portfolio",
      action: "/portfolio-os",
      isLocked: false,
      gradient: "from-purple-600 to-pink-600",
      info: "• Premium Sydney Houses\n• Return Scenarios\n• Portfolio Distribution"
    },
    {
      icon: FaBrain,
      title: "Tech Demo",
      description: "Experience our AI-driven platform and portfolio OS",
      action: "#",
      isLocked: true,
      gradient: "from-pink-600 to-red-600",
      info: "• AI Underwriting Engine\n• Portfolio Intelligence\n• Market Predictions"
    },
    {
      icon: FaFileAlt,
      title: "Deal Room",
      description: "Access investment documents and financial models",
      action: "#",
      isLocked: true,
      gradient: "from-red-600 to-orange-600",
      info: "• Financial Models\n• Term Sheets\n• Due Diligence Pack"
    }
  ]

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubscribing(true)

    try {
      // Get existing subscribers or initialize empty array
      const existingSubscribers = JSON.parse(localStorage.getItem('newsletterSubscribers') || '[]')

      // Check if email already exists
      if (!existingSubscribers.some((sub: any) => sub.email === newsletterEmail)) {
        // Add new subscriber
        const newSubscriber = {
          email: newsletterEmail,
          subscribedAt: new Date().toISOString()
        }

        existingSubscribers.push(newSubscriber)
        localStorage.setItem('newsletterSubscribers', JSON.stringify(existingSubscribers))

        // Update subscription status
        const status = {
          isSubscribed: true,
          nextNewsletter: 'January 21st, 2025'
        }
        localStorage.setItem('newsletterStatus', JSON.stringify(status))
        setSubscriptionStatus(status)

        // Clear input
        setNewsletterEmail('')
        alert('Thank you for subscribing! Our first newsletter will be sent on January 21st, 2025.')
      } else {
        alert('This email is already subscribed to our newsletter. The next newsletter will be sent on January 21st, 2025.')
      }
    } catch (error) {
      console.error('Error subscribing to newsletter:', error)
      alert('There was an error subscribing to the newsletter. Please try again.')
    } finally {
      setIsSubscribing(false)
    }
  }

  useEffect(() => {
    const startTime = Date.now()
    const userId = localStorage.getItem('userId')

    if (userId) {
      // Remove tracking code since it's now handled by PageTracker
      return () => {
        const duration = Math.floor((Date.now() - startTime) / 1000)
        // Remove tracking code since it's now handled by PageTracker
      }
    }
  }, [])

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <div className="min-h-screen bg-white">
      <GlobalHeader currentPage="launchpad" />

      {/* Main Content */}
      <div className="pt-[72px]">
        <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50">
          <div className="pt-24 px-8">
            <div className="max-w-7xl mx-auto mb-16 relative">
              {/* Decorative elements */}
              <div className="absolute inset-0 -z-10">
                <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-sky-400/10 to-transparent rounded-full blur-3xl" />
                <div className="absolute bottom-10 right-10 w-72 h-72 bg-gradient-to-br from-indigo-400/10 to-transparent rounded-full blur-3xl" />
              </div>

              {/* Welcome Message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-3xl mx-auto"
              >
                {/* Logo */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="mb-8"
                >
                  <img src="/Equihome Logo.png" alt="Equihome" className="h-16 mx-auto" />
                </motion.div>

                <div className="inline-block mb-6">
                  <div className="flex items-center space-x-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-sky-100 shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm font-medium text-gray-600">Seed Round Now Open</span>
                  </div>
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent mb-6">
                  Welcome to our Seed Round Launchpad
                </h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-xl text-gray-600 leading-relaxed"
                >
                  Your guided investment portal to explore our $5M seed round opportunity. Access our business pitch, portfolio technology, and schedule private discussions with our team.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="mt-8 flex justify-center space-x-4"
                >
                  <Link
                    to="/pitch"
                    className="px-8 py-3 bg-gradient-to-r from-sky-600 to-indigo-600 text-white rounded-xl font-medium hover:from-sky-700 hover:to-indigo-700 transition-all shadow-lg shadow-sky-600/20 hover:shadow-xl hover:shadow-sky-600/30"
                  >
                    View Pitch
                  </Link>
                  <Link
                    to="/book-call"
                    className="px-8 py-3 bg-white text-sky-600 rounded-xl font-medium hover:bg-sky-50 transition-all border border-sky-200 shadow-sm"
                  >
                    Book a Call
                  </Link>
                </motion.div>
              </motion.div>
            </div>

            {/* Investment Steps */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
              {/* Business Pitch */}
              <Link to="/pitch" className="group">
                <div className="fintech-card p-8 h-full transition-all duration-300 hover:shadow-lg">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">Business Pitch</h3>
                    <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center">
                      <svg className="w-6 h-6 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6">Explore our vision, market opportunity, and growth trajectory.</p>
                  <div className="text-sky-600 group-hover:text-sky-700">View Pitch →</div>
                </div>
              </Link>

              {/* Portfolio OS */}
              <div className="relative">
                <div className="fintech-card p-8 h-full bg-white cursor-not-allowed">
                  <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] rounded-xl flex items-center justify-center">
                    <div className="flex flex-col items-center text-center px-4">
                      <FaLock className="text-3xl text-sky-400 mb-2" />
                      <span className="text-sky-600 font-medium">Book a Call for Access</span>
                      <span className="text-gray-500 text-sm mt-1">Preview our AI-powered platform</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-800">Portfolio OS</h3>
                    <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center">
                      <svg className="w-6 h-6 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6">Experience our AI-powered portfolio management platform.</p>
                  <div className="text-sky-500">View Demo →</div>
                </div>
              </div>

              {/* Deal Room */}
              <div className="relative">
                <div className="fintech-card p-8 h-full bg-white">
                  {isCheckingAccess ? (
                    // Loading state while checking access
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-[0.5px] rounded-xl flex items-center justify-center">
                      <div className="flex flex-col items-center text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-sky-600 mb-3"></div>
                        <span className="text-sky-600 font-medium">Checking access...</span>
                      </div>
                    </div>
                  ) : !hasDealRoomAccess ? (
                    // Request access overlay if user doesn't have access
                    <div
                      className="absolute inset-0 bg-gradient-to-br from-sky-600/60 to-indigo-600/60 backdrop-blur-[0.5px] rounded-xl flex items-center justify-center cursor-pointer transition-all hover:from-sky-700/70 hover:to-indigo-700/70 group"
                      onClick={async () => {
                        if (isRequestingAccess) return; // Prevent multiple clicks

                        const userEmail = localStorage.getItem('userEmail');
                        if (!userEmail) {
                          alert('Please log in to request access.');
                          return;
                        }

                        // Set loading state
                        setIsRequestingAccess(true);

                        // Prepare request data
                        const requestData = {
                          email: userEmail,
                          name: localStorage.getItem('userName') || 'Investor',
                          requestType: 'dealRoom'
                        };

                        try {
                          // Send API request
                          const response = await fetch('/api/request-access', {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(requestData)
                          });

                          const data = await response.json();

                          if (response.ok) {
                            // Store request in localStorage for tracking
                            const existingRequests = JSON.parse(localStorage.getItem('accessRequests') || '[]');
                            existingRequests.push({
                              ...requestData,
                              timestamp: new Date().toISOString(),
                              status: 'pending',
                              requestId: data.requestId
                            });
                            localStorage.setItem('accessRequests', JSON.stringify(existingRequests));

                            // Show success message
                            alert('Your access request has been sent to sujay@equihome.com.au. You will be notified when access is granted.');
                          } else {
                            throw new Error(data.message || 'Failed to send request');
                          }
                        } catch (error) {
                          console.error('Error sending access request:', error);

                          // Fallback to client-side simulation if API fails
                          const existingRequests = JSON.parse(localStorage.getItem('accessRequests') || '[]');
                          existingRequests.push({
                            ...requestData,
                            timestamp: new Date().toISOString(),
                            status: 'pending'
                          });
                          localStorage.setItem('accessRequests', JSON.stringify(existingRequests));

                          alert('Your access request has been recorded. You will be notified when access is granted.');
                        } finally {
                          // Reset loading state
                          setIsRequestingAccess(false);
                        }
                      }}
                    >
                      <div className="flex flex-col items-center text-center px-6 py-6 transform transition-transform group-hover:scale-105 bg-gradient-to-br from-sky-800/40 to-indigo-800/40 rounded-lg backdrop-blur-md">
                        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-3">
                          {isRequestingAccess ? (
                            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
                          ) : (
                            <FaKey className="text-2xl text-white" />
                          )}
                        </div>
                        <span className="text-white font-bold text-lg mb-1">
                          {isRequestingAccess ? 'Sending Request...' : 'Request Access'}
                        </span>
                        <span className="text-white/90 text-sm mb-3">Get exclusive access to our deal room</span>
                        <button
                          className={`px-5 py-1.5 bg-white rounded-full font-medium transition-colors shadow-lg text-sm ${isRequestingAccess ? 'opacity-70 cursor-not-allowed' : 'text-sky-600 hover:bg-sky-50'}`}
                          disabled={isRequestingAccess}
                        >
                          {isRequestingAccess ? 'Processing...' : 'Request Now'}
                        </button>
                      </div>
                    </div>
                  ) : null}

                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-800">Deal Room</h3>
                    <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center">
                      {hasDealRoomAccess ? (
                        <FaUnlock className="w-6 h-6 text-green-600" />
                      ) : (
                        <svg className="w-6 h-6 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6">Access detailed financials and due diligence materials.</p>
                  {hasDealRoomAccess ? (
                    <div
                      className="text-green-600 font-medium cursor-pointer hover:underline"
                      onClick={() => navigate('/deal-room')}
                    >
                      Enter Deal Room →
                    </div>
                  ) : (
                    <div className="text-sky-500">
                      Enter Deal Room →
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Additional Sections */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
              {/* Referral System */}
              <div className="fintech-card p-8 border-2 border-green-500/20 bg-gradient-to-br from-green-500/10 to-transparent">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                    <FaUsers className="text-2xl text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Share & Get Rewarded</h3>
                    <p className="text-sm text-gray-600">Receive exclusive rewards for each successful referral</p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="relative">
                    <input
                      type="text"
                      readOnly
                      value={`${window.location.origin}/launchpad?ref=${localStorage.getItem('userId') || ''}`}
                      className="w-full px-4 py-3 bg-white/60 border border-green-200 rounded-lg text-gray-700 pr-24"
                    />
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(`${window.location.origin}/launchpad?ref=${localStorage.getItem('userId') || ''}`);
                        alert('Referral link copied to clipboard!');
                      }}
                      className="absolute right-2 top-2 px-4 py-1 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-700 transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                  <p className="text-sm text-gray-500">Share your unique referral link with potential investors. You'll receive special rewards for each successful referral who completes an investment.</p>
                </div>
              </div>

              {/* Upcoming Webinar */}
              <div className="fintech-card p-6 border-2 border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-transparent">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                    <FaCalendar className="text-2xl text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Launch Preparation</h3>
                    <p className="text-sm text-gray-600">Working on exciting updates</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-600">Our team is working hard behind the scenes to prepare for launch. While there are no upcoming webinars at the moment, we'll notify you as soon as new events are scheduled.</p>
                  <div className="flex items-center space-x-2 text-purple-600">
                    <FaUsers className="text-lg" />
                    <span className="text-sm font-medium">Join our waitlist for future events</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="max-w-7xl mx-auto mb-16">
              <div className="bg-gradient-to-r from-sky-500 to-blue-600 rounded-xl p-8 text-center">
                <h2 className="text-2xl font-semibold text-white mb-4">Ready to Join Our Journey?</h2>
                <p className="text-white/90 mb-6">Schedule your initial discussion to learn more about our seed round opportunity</p>
                <Link
                  to="/book-call"
                  className="inline-block px-8 py-4 bg-white text-sky-600 rounded-xl font-medium hover:bg-sky-50 transition-colors"
                >
                  Book Your Call Now
                </Link>
              </div>
            </div>

            {/* Newsletter Section */}
            <div className="relative overflow-hidden">
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: 'url("/sydney-splash.jpg")' }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-sky-900/90 via-sky-800/80 to-sky-900/90" />
              </div>

              <div className="relative max-w-7xl mx-auto px-4 py-24">
                <div className="max-w-xl mx-auto text-center">
                  <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
                  <p className="text-lg text-sky-100 mb-8">
                    Get the latest updates on investment opportunities and market insights.
                  </p>
                  <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-sky-200/20 text-white placeholder-sky-200 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
                      required
                    />
                    <button
                      type="submit"
                      className="w-full bg-sky-500 text-white px-8 py-3 rounded-xl hover:bg-sky-400 transition-colors"
                    >
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-50 border-t border-gray-200">
              <div className="max-w-7xl mx-auto px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 uppercase mb-4">Our Vision</h3>
                    <p className="text-gray-600 text-sm">
                      To revolutionize real estate investment through cutting-edge technology, making property ownership more accessible, transparent, and efficient for everyone.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 uppercase mb-4">Our Mission</h3>
                    <p className="text-gray-600 text-sm">
                      Empowering investors with innovative PropTech solutions that streamline the investment process and maximize returns through data-driven insights and automation.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 uppercase mb-4">Contact Us</h3>
                    <div className="space-y-2">
                      <p className="flex items-center space-x-2 text-sm">
                        <FaUser className="text-sky-600" />
                        <span className="text-gray-600">Sujay Namburi</span>
                      </p>
                      <p className="flex items-center space-x-2 text-sm">
                        <FaPhone className="text-sky-600" />
                        <a href="tel:+15713761551" className="text-gray-600 hover:text-sky-600 transition-colors">
                          +1 (571) 376-1551
                        </a>
                      </p>
                      <p className="flex items-center space-x-2 text-sm">
                        <FaEnvelope className="text-sky-600" />
                        <a href="mailto:sujay@equihome.com.au" className="text-gray-600 hover:text-sky-600 transition-colors">
                          sujay@equihome.com.au
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-200 text-center">
                  <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} EquiHome. All rights reserved.</p>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Launchpad