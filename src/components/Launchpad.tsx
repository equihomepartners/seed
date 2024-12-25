import { motion } from 'framer-motion'
import { FaLock, FaChartLine, FaBuilding, FaFileAlt, FaUsers, FaBrain, FaArrowRight, FaCalendar, FaDownload, FaPlay, FaNewspaper, FaLinkedin, FaGlobe, FaChartBar, FaMapMarkerAlt, FaCheck, FaHome, FaPhone, FaHandshake, FaKey, FaChartPie } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import GlobalHeader from './GlobalHeader'
import InvestmentBreakdownCard from './InvestmentBreakdownCard'

const InvestorJourney = () => {
  const userProgress = {
    businessOverview: localStorage.getItem('completed_business_overview') === 'true',
    portfolioOS: localStorage.getItem('completed_portfolio_os') === 'true',
    techDemo: localStorage.getItem('completed_tech_demo') === 'true',
    dealRoom: localStorage.getItem('completed_deal_room') === 'true'
  }

  const steps = [
    {
      icon: FaBuilding,
      title: "Business Pitch",
      description: "Full top-level breakdown of Equihome's vision, model and opportunity",
      action: "/pitch",
      isLocked: false,
      isCompleted: userProgress.businessOverview,
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      icon: FaPhone,
      title: "Investment Discussion",
      description: "Schedule a call to discuss investment opportunity",
      action: "/book-call",
      isLocked: false,
      isCompleted: userProgress.portfolioOS,
      gradient: "from-indigo-600 to-purple-600"
    },
    {
      icon: FaChartPie,
      title: "Portfolio OS",
      description: "View a simulation of our first $50M Sydney Portfolio",
      action: "/portfolio",
      isLocked: false,
      isCompleted: userProgress.techDemo,
      gradient: "from-purple-600 to-pink-600",
      info: "• Premium Sydney Houses\n• Return Scenarios\n• Portfolio Distribution"
    },
    {
      icon: FaBrain,
      title: "Tech Demo",
      description: "Experience our AI-driven platform and portfolio OS",
      action: userProgress.techDemo ? "/tech-demo" : "#",
      isLocked: !userProgress.techDemo,
      isCompleted: userProgress.techDemo,
      gradient: "from-pink-600 to-red-600",
      info: "• AI Underwriting Engine\n• Portfolio Intelligence\n• Market Predictions"
    },
    {
      icon: FaFileAlt,
      title: "Deal Room",
      description: "Access investment documents and financial models",
      action: userProgress.techDemo ? "/deal-room" : "#",
      isLocked: !userProgress.techDemo,
      isCompleted: userProgress.dealRoom,
      gradient: "from-red-600 to-orange-600",
      info: "• Financial Models\n• Term Sheets\n• Due Diligence Pack"
    }
  ]

  return (
    <div className="max-w-7xl mx-auto mb-16">
      <div className="relative">
        {/* Glowing line connector */}
        <div className="absolute top-16 left-1/2 h-[2px] bg-gradient-to-r from-blue-500/20 via-purple-500/40 to-pink-500/20 -translate-x-1/2 w-[calc(100%-160px)] blur-sm" />
        <div className="absolute top-16 left-1/2 h-[1px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 -translate-x-1/2 w-[calc(100%-160px)]" />
        
        <div className="flex gap-3 relative mb-16">
          {steps.map((step, index) => (
            <Link
              key={index}
              to={step.isLocked ? "#" : step.action}
              className={`relative ${step.isLocked ? 'cursor-not-allowed flex-1' : 'cursor-pointer'} ${
                step.isLocked ? 'flex-[0.5]' : 'flex-1'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur-xl" />
              <div className={`
                relative p-4 rounded-xl border transition-all backdrop-blur-xl h-full
                ${step.isLocked 
                  ? 'bg-[#0a0f1a]/50 border-blue-500/10 opacity-50' 
                  : step.isCompleted
                  ? 'bg-[#0a0f1a]/80 border-blue-500/40'
                  : 'bg-gradient-to-r border-transparent ' + step.gradient
                }
              `}>
                <div className="flex flex-col items-center text-center h-full">
                  <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center mb-3 relative
                    ${step.isLocked ? 'bg-blue-500/5' : 'bg-white/10 backdrop-blur-xl'}
                  `}>
                    {step.isLocked ? (
                      <FaLock className="text-xl text-blue-400/50" />
                    ) : (
                      <>
                        <step.icon className="text-xl text-white" />
                        {step.isCompleted && (
                          <div className="absolute -right-1 -top-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                            <FaCheck className="text-xs text-white" />
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  
                  <h3 className={`text-lg font-bold mb-2 ${
                    step.isLocked ? 'text-white/50' : 'text-white'
                  }`}>{step.title}</h3>
                  
                  <p className={`text-sm ${
                    step.isLocked ? 'text-gray-400/50' : 'text-white/80'
                  }`}>{step.description}</p>

                  {step.info && !step.isLocked && (
                    <div className="mt-3 text-xs text-left w-full">
                      {step.info.split('\n').map((line, i) => (
                        <div key={i} className="text-blue-300 mb-1">{line}</div>
                      ))}
                    </div>
                  )}

                  {!step.isLocked && !step.isCompleted && (
                    <motion.div 
                      className="mt-auto pt-3 flex items-center space-x-2 text-white text-sm"
                      whileHover={{ x: 5 }}
                    >
                      <span>Explore</span>
                      <FaArrowRight className="text-xs" />
                    </motion.div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Investment Breakdown Card */}
        <div className="mt-8">
          <InvestmentBreakdownCard />
        </div>
      </div>
    </div>
  )
}

const LaunchpadCard = ({ 
  title, 
  icon: Icon, 
  description, 
  isLocked, 
  onClick,
  to 
}: { 
  title: string
  icon: any
  description: string
  isLocked?: boolean
  onClick: () => void
  to?: string 
}) => {
  const navigate = useNavigate()

  const handleClick = () => {
    if (to) {
      navigate(to)
    } else {
      onClick()
    }
  }

  const cardVariants = {
    hover: { 
      scale: 1.02,
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  }

  const glowVariants = {
    hover: {
      opacity: 1,
      transition: { duration: 0.3 }
    }
  }

  const iconVariants = {
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: { duration: 0.3 }
    }
  }

  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      whileTap="tap"
      className="relative group cursor-pointer bg-[#111827] rounded-xl overflow-hidden border border-blue-500/20"
      onClick={handleClick}
    >
      {/* Glow Effect */}
      <motion.div
        variants={glowVariants}
        className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-blue-500/10 opacity-0"
      />
      
      {/* Card Content */}
      <div className="relative p-6 flex flex-col h-full">
        <div className="flex items-center space-x-3 mb-4">
          <motion.div
            variants={iconVariants}
            className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center"
          >
            <Icon className="text-2xl text-blue-400" />
          </motion.div>
          <div>
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            {isLocked ? (
              <span className="text-xs text-blue-400 flex items-center">
                <FaLock className="mr-1" /> Requires Call Booking
              </span>
            ) : (
              <span className="text-xs text-blue-400">Available Now</span>
            )}
          </div>
        </div>
        
        <p className="text-sm text-gray-400 mb-6 leading-relaxed">{description}</p>
        
        <div className="mt-auto">
          {isLocked ? (
            <Link
              to="/book-call"
              className="w-full px-4 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 text-blue-400 rounded-xl text-sm font-medium transition-all flex items-center justify-center space-x-2 group"
            >
              <span>Book Call to Access</span>
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : (
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-gray-400">
                <span>Access Status</span>
                <span className="text-green-400">Unlocked</span>
              </div>
              <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 background-animate"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

const MetricCard = ({ title, value, change }: { title: string, value: string, change?: string }) => (
  <div className="bg-[#111827] rounded-xl border border-blue-500/20 p-4">
    <h3 className="text-sm text-gray-400 mb-2">{title}</h3>
    <div className="text-xl font-bold text-white">{value}</div>
    {change && <span className="text-xs text-green-400">+{change}</span>}
  </div>
)

const PartnerLogo = ({ name }: { name: string }) => (
  <div className="bg-[#111827] rounded-xl border border-blue-500/20 p-4 flex items-center justify-center">
    <span className="text-gray-400">{name}</span>
  </div>
)

const ResourceCard = ({ title, type, date }: { title: string, type: string, date: string }) => (
  <div className="bg-[#111827] rounded-xl border border-blue-500/20 p-4 hover:border-blue-500/40 transition-colors cursor-pointer">
    <div className="flex items-center justify-between mb-2">
      <span className="text-xs text-blue-400">{type}</span>
      <span className="text-xs text-gray-400">{date}</span>
    </div>
    <h3 className="text-sm text-white">{title}</h3>
  </div>
)

const EventCard = ({ title, date, type }: { title: string, date: string, type: string }) => (
  <div className="bg-[#111827] rounded-xl border border-blue-500/20 p-4 hover:border-blue-500/40 transition-colors cursor-pointer">
    <div className="flex items-center space-x-3">
      <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
        <FaCalendar className="text-blue-400" />
      </div>
      <div>
        <h3 className="text-sm text-white mb-1">{title}</h3>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-blue-400">{type}</span>
          <span className="text-xs text-gray-400">{date}</span>
        </div>
      </div>
    </div>
  </div>
)

const ReferralCard = () => {
  const navigate = useNavigate()
  const [copied, setCopied] = useState(false)
  const userId = localStorage.getItem('userId')
  const referralLink = `seed.equihome.com.au/invest?referrer=${userId || 'direct'}`

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleEmailShare = () => {
    window.open(`mailto:?subject=Join%20Equihome%20Seed%20Round&body=I'd%20like%20to%20share%20this%20investment%20opportunity%20with%20you.%20Check%20out%20the%20deck:%20${referralLink}`)
  }

  const handleLinkedInShare = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${referralLink}`)
  }

  return (
    <div className="bg-[#111827] rounded-xl border border-blue-500/20 p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-blue-500/20 flex items-center justify-center">
          <FaUsers className="text-2xl text-green-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Share This Opportunity</h3>
          <p className="text-sm text-gray-400">Earn additional equity for successful referrals</p>
        </div>
      </div>

      {/* Incentives */}
      <div className="mb-6 bg-[#0a0f1a] rounded-lg p-4">
        <h4 className="text-sm font-semibold text-white mb-3">Referral Reward</h4>
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
            <div className="text-lg font-bold text-green-400">0.5%</div>
          </div>
          <div className="flex-1">
            <div className="text-sm text-white">Additional Equity</div>
            <div className="text-xs text-gray-400">For each successful referral</div>
          </div>
        </div>
        <div className="text-xs text-gray-400">
          No limit on number of referrals. Each successful referral adds to your equity position.
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-[#0a0f1a] rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Your Referral Link</span>
            <button 
              onClick={handleCopy}
              className="text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center space-x-1"
            >
              <span>{copied ? 'Copied!' : 'Copy'}</span>
              {copied && <FaCheck className="text-green-400" />}
            </button>
          </div>
          <div className="text-sm text-white font-mono bg-[#1a2234] p-2 rounded">
            {referralLink}
          </div>
        </div>

        <div className="flex space-x-2">
          <button 
            onClick={handleEmailShare}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500/20 to-blue-500/20 hover:from-green-500/30 hover:to-blue-500/30 text-green-400 rounded-xl text-sm font-medium transition-all flex items-center justify-center space-x-2 group"
          >
            <span>Share via Email</span>
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={handleLinkedInShare}
            className="px-4 py-3 bg-[#0a0f1a] text-blue-400 rounded-xl text-sm font-medium transition-all hover:bg-[#1a2234]"
          >
            <FaLinkedin className="text-xl" />
          </button>
        </div>

        <div className="text-xs text-center text-gray-400 mt-4">
          Track your referrals and rewards in your investor dashboard
        </div>
      </div>
    </div>
  )
}

const PlatformOSPreview = () => {
  const navigate = useNavigate()
  
  return (
    <div className="bg-[#111827] rounded-xl border border-blue-500/20 overflow-hidden">
      <div className="p-8 relative">
        {/* Background Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
        
        {/* Content */}
        <div className="relative">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
              <FaBrain className="text-3xl text-blue-400" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-2xl font-bold text-white">Platform OS</h3>
                <span className="px-2 py-1 bg-blue-500/10 rounded-full text-xs text-blue-400 font-medium">Enterprise</span>
              </div>
              <p className="text-gray-400 mt-1">Advanced Underwriting & Portfolio Intelligence System</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-[#0a0f1a] rounded-xl p-4">
              <h4 className="text-sm font-semibold text-white mb-3">Underwriting Engine</h4>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-2" />
                  Loan application analysis
                </li>
                <li className="flex items-center text-sm text-gray-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-2" />
                  Property valuation models
                </li>
                <li className="flex items-center text-sm text-gray-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-2" />
                  Risk assessment scoring
                </li>
              </ul>
            </div>

            <div className="bg-[#0a0f1a] rounded-xl p-4">
              <h4 className="text-sm font-semibold text-white mb-3">Portfolio Intelligence</h4>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mr-2" />
                  Current portfolio analysis
                </li>
                <li className="flex items-center text-sm text-gray-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mr-2" />
                  Portfolio risk balancing
                </li>
                <li className="flex items-center text-sm text-gray-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mr-2" />
                  Exposure management
                </li>
              </ul>
            </div>

            <div className="bg-[#0a0f1a] rounded-xl p-4">
              <h4 className="text-sm font-semibold text-white mb-3">Market Predictions</h4>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 mr-2" />
                  Future market modeling
                </li>
                <li className="flex items-center text-sm text-gray-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 mr-2" />
                  Growth area identification
                </li>
                <li className="flex items-center text-sm text-gray-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 mr-2" />
                  Investment opportunity scoring
                </li>
              </ul>
            </div>
          </div>

          <Link 
            to="/book-call"
            className="w-full px-6 py-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 text-blue-400 rounded-xl text-sm font-medium transition-all flex items-center justify-center space-x-3 group"
          >
            <FaLock className="text-sm" />
            <span>Book a Demo to Access Platform OS</span>
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  )
}

const Launchpad = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const startTime = Date.now()
    const userId = localStorage.getItem('userId')

    if (userId) {
      axios.post('http://localhost:3001/api/track-view', {
        userId,
        page: 'launchpad',
        duration: 0
      })

      return () => {
        const duration = Math.floor((Date.now() - startTime) / 1000)
        axios.post('http://localhost:3001/api/track-view', {
          userId,
          page: 'launchpad',
          duration
        })
      }
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

  return (
    <div className="min-h-screen bg-[#0B1121]">
      <GlobalHeader currentPage="launchpad" />
      
      {/* Fundraising Progress Bar */}
      <div className="fixed top-[72px] left-0 right-0 bg-[#0a0f1a]/80 backdrop-blur-sm border-b border-blue-500/10 z-40">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between text-sm mb-2">
            <div className="text-gray-400">Seed Round Progress</div>
            <div className="text-white font-medium">${(currentRaised / 1000000).toFixed(1)}M raised of $5M</div>
          </div>
          <div className="relative h-1.5 bg-[#1a2234] rounded-full overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
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
      <div className="pt-[72px]">
        <div className="min-h-screen bg-[#030712] bg-gradient-to-b from-blue-500/5 via-purple-500/5 to-pink-500/5 text-white">
          <div className="pt-24 px-8">
            <div className="max-w-7xl mx-auto mb-16">
              {/* Welcome Message */}
              <div className="text-center max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">Welcome to our Seed Round Launchpad</h1>
                <p className="text-white/60 text-lg">Complete each step to unlock the next stage of your investment journey.</p>
              </div>

              {/* Closing Notice */}
              <div className="mt-8 bg-[#0a0f1a]/60 backdrop-blur-xl border border-purple-500/20 rounded-xl p-4 text-center">
                <p className="text-white/90 font-medium flex items-center justify-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                  <span>Initial investor meetings closing January 31st, 2025 - Schedule your call to secure priority access</span>
                </p>
              </div>
            </div>

            {/* Investor Journey */}
            <InvestorJourney />

            {/* Additional Sections */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {/* Referral System */}
              <ReferralCard />

              {/* Upcoming Webinar */}
              <div className="bg-[#0a0f1a]/60 backdrop-blur-xl rounded-xl border border-purple-500/20 p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10" />
                <div className="relative">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <FaPlay className="text-2xl text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Upcoming Webinar</h3>
                      <p className="text-white/60">January 22nd, 11:00 AM AEDT</p>
                    </div>
                  </div>

                  <div className="bg-[#030712]/60 backdrop-blur-xl rounded-lg p-4 mb-6">
                    <h4 className="text-sm font-semibold text-white mb-3">What You'll Learn</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center text-sm text-white/80">
                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mr-2" />
                        Deep dive into our business model
                      </li>
                      <li className="flex items-center text-sm text-white/80">
                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mr-2" />
                        Investment opportunity overview
                      </li>
                      <li className="flex items-center text-sm text-white/80">
                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mr-2" />
                        Q&A with founding team
                      </li>
                    </ul>
                  </div>

                  <Link 
                    to="/webinar"
                    className="w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl text-sm font-medium transition-all flex items-center justify-center space-x-3 group hover:from-purple-600 hover:to-pink-600"
                  >
                    <span>Register for Webinar</span>
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="max-w-7xl mx-auto mb-16">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
                <div className="relative">
                  <h2 className="text-2xl font-bold text-white mb-4">Ready to Join Our Journey?</h2>
                  <p className="text-white/90 mb-6">Schedule your initial discussion to learn more about our seed round opportunity</p>
                  <Link
                    to="/book-call"
                    className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-blue-600 rounded-xl font-medium hover:bg-blue-50 transition-colors"
                  >
                    <span>Book Your Call Now</span>
                    <FaArrowRight />
                  </Link>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10">
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/40">© 2024 Equihome Partners</span>
                <div className="flex items-center space-x-4">
                  <button className="text-sm text-white/40 hover:text-white transition-colors">Support</button>
                  <button className="text-sm text-white/40 hover:text-white transition-colors">Privacy</button>
                  <button className="text-sm text-white/40 hover:text-white transition-colors">Terms</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Launchpad 