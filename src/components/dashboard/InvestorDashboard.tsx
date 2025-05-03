import { useState, useEffect } from 'react'
import { FaLock, FaChartLine, FaBuilding, FaFileAlt, FaUsers, FaBrain, FaArrowRight, FaCalendar, FaDownload, FaPlay, FaNewspaper, FaLinkedin, FaGlobe, FaChartBar, FaMapMarkerAlt, FaCheck, FaHome, FaPhone, FaHandshake, FaKey, FaChartPie, FaComments, FaShieldAlt, FaDollarSign, FaCog, FaBell, FaUserCircle, FaClipboardList, FaRocket, FaChartArea, FaInfoCircle, FaLightbulb, FaQuestionCircle, FaClock } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'
import GlobalHeader from '../GlobalHeader'
import axios from 'axios'

type InvestorState = 'pre-interest' | 'interest-registered' | 'active'

interface DashboardMetric {
  label: string
  value: string
  change?: string
  icon: any
  color: string
}

interface ActionItem {
  title: string
  description: string
  status: 'pending' | 'in-progress' | 'completed'
  dueDate?: string
  action?: () => void
}

// Declare Tawk_API for TypeScript
declare global {
  interface Window {
    Tawk_API?: {
      toggle: () => void
    }
  }
}

interface StepProgress {
  businessPitchViewed: boolean
  portfolioOSViewed: boolean
  introCallScheduled: boolean
  interestRegistered: boolean
  lastVisited?: string
  visitHistory?: Array<{
    page: string
    timestamp: string
  }>
  scheduledCallDate?: string
}

const InvestorDashboard = () => {
  const location = useLocation()

  // Initialize progress from localStorage or default values
  const [stepProgress, setStepProgress] = useState<StepProgress>(() => {
    const saved = localStorage.getItem('investorProgress')
    return saved ? JSON.parse(saved) : {
      businessPitchViewed: false,
      portfolioOSViewed: false,
      introCallScheduled: false,
      interestRegistered: false,
      visitHistory: []
    }
  })

  const [investorState, setInvestorState] = useState<InvestorState>('pre-interest')
  const [showInterestForm, setShowInterestForm] = useState(false)
  const [showProfileSettings, setShowProfileSettings] = useState(false)
  const [selectedSection, setSelectedSection] = useState('overview')
  const [showSettings, setShowSettings] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState(true)

  // User profile state
  const [profile, setProfile] = useState({
    email: localStorage.getItem('userEmail') || 'Unknown User',
    company: 'Smith Investments',
    investorType: 'Sophisticated Investor',
    preferredInstrument: 'SAFE',
    targetAmount: '$250,000',
    investmentTimeline: 'Q1 2024'
  })

  // Dashboard metrics based on investor state
  const getDashboardMetrics = (): DashboardMetric[] => {
    switch (investorState) {
      case 'active':
        return [
          {
            label: 'Investment Amount',
            value: '$250,000',
            icon: FaDollarSign,
            color: 'blue'
          },
          {
            label: 'Projected ROI',
            value: '22.5x',
            change: '+2.5x',
            icon: FaChartLine,
            color: 'green'
          },
          {
            label: 'Documents Completed',
            value: '8/10',
            icon: FaFileAlt,
            color: 'purple'
          },
          {
            label: 'Next Meeting',
            value: 'Jan 22',
            icon: FaCalendar,
            color: 'pink'
          }
        ]
      case 'interest-registered':
        return [
          {
            label: 'Verification Status',
            value: '2/3 Complete',
            icon: FaShieldAlt,
            color: 'blue'
          },
          {
            label: 'Documents Pending',
            value: '3',
            icon: FaFileAlt,
            color: 'purple'
          },
          {
            label: 'Time to Complete',
            value: '48 hours',
            icon: FaClock,
            color: 'orange'
          }
        ]
      default:
        return []
    }
  }

  // Action items based on investor state
  const getActionItems = (): ActionItem[] => {
    switch (investorState) {
      case 'active':
        return [
          {
            title: 'Review Term Sheet',
            description: 'Final review of investment terms required',
            status: 'pending',
            dueDate: 'Jan 25, 2024'
          },
          {
            title: 'Schedule Technical Demo',
            description: 'Book a session to see our platform in action',
            status: 'in-progress'
          },
          {
            title: 'Complete KYC',
            description: 'Identity verification process',
            status: 'completed'
          }
        ]
      case 'interest-registered':
        return [
          {
            title: 'Complete Investor Profile',
            description: 'Add your investment preferences and experience',
            status: 'pending'
          },
          {
            title: 'Upload Required Documents',
            description: 'Proof of sophisticated investor status needed',
            status: 'in-progress'
          }
        ]
      default:
        return []
    }
  }

  // Track route changes and update progress
  useEffect(() => {
    const trackPageView = () => {
      switch (location.pathname) {
        case '/pitch':
          updateProgress('businessPitchViewed')
          break
        case '/portfolio-os':
          updateProgress('portfolioOSViewed')
          break
        case '/book-call':
          updateProgress('introCallScheduled')
          break
        case '/register-interest':
          updateProgress('interestRegistered')
          break
      }
    }

    // Check if we're returning from one of the tracked pages
    if (location.pathname === '/dashboard') {
      const saved = localStorage.getItem('investorProgress')
      if (saved) {
        setStepProgress(JSON.parse(saved))
      }
    } else {
      trackPageView()
    }
  }, [location.pathname])

  // Function to update progress and save to localStorage
  const updateProgress = async (key: string) => {
    const newProgress = { ...stepProgress, [key]: true }
    setStepProgress(newProgress)
    localStorage.setItem('investorProgress', JSON.stringify(newProgress))

    const userId = localStorage.getItem('userId')
    if (userId) {
      try {
        await axios.post('https://equihome-seed-api-pnk9i.ondigitalocean.app/api/track/progress', {
          userId,
          progress: newProgress
        })
      } catch (error) {
        console.error('Error updating progress:', error)
      }
    }
  }

  // Function to get progress status text
  const getProgressStatus = () => {
    const total = 4 // Total number of steps
    const completed = Object.values(stepProgress).filter(v => v === true).length
    return `${completed} of ${total} steps completed`
  }

  const handleSignOut = () => {
    localStorage.clear()
    window.location.href = '/'
  }

  const renderSettingsMenu = () => (
    <div className="absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-[#111827] ring-1 ring-black ring-opacity-5">
      <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="settings-menu">
        <div className="px-4 py-2 text-sm text-gray-400 border-b border-gray-700">Notification Preferences</div>
        <button
          onClick={() => setEmailNotifications(!emailNotifications)}
          className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-blue-500/10 flex items-center justify-between"
          role="menuitem"
        >
          Investment Updates
          <span className="text-xs text-gray-500">(Coming Soon)</span>
        </button>
        <button
          className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-blue-500/10 flex items-center justify-between"
          role="menuitem"
        >
          Due Diligence Alerts
          <span className="text-xs text-gray-500">(Coming Soon)</span>
        </button>
        <button
          className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-blue-500/10 flex items-center justify-between"
          role="menuitem"
        >
          Meeting Reminders
          <span className="text-xs text-gray-500">(Coming Soon)</span>
        </button>
        <div className="border-t border-gray-700 mt-2"></div>
        <div className="px-4 py-2 text-sm text-gray-400">Account Settings</div>
        <button
          className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-blue-500/10 flex items-center justify-between"
          role="menuitem"
        >
          Change Password
          <span className="text-xs text-gray-500">(Coming Soon)</span>
        </button>
        <button
          className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-blue-500/10 flex items-center justify-between"
          role="menuitem"
        >
          Two-Factor Auth
          <span className="text-xs text-gray-500">(Coming Soon)</span>
        </button>
        <div className="border-t border-gray-700 mt-2"></div>
        <button
          onClick={handleSignOut}
          className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10"
          role="menuitem"
        >
          Sign Out
        </button>
      </div>
    </div>
  )

  const renderWelcomeGuide = () => (
    <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl p-8 border border-blue-500/20 mb-12">
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
          <FaLightbulb className="text-2xl text-blue-400" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Welcome to Your Investment Journey</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300">
              We've designed this dashboard to guide you through every step of your investment journey with EquiHome. Here's what you can do:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-[#111827] rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <FaInfoCircle className="text-blue-400" />
                  <h4 className="font-medium text-white">Getting Started</h4>
                </div>
                <ul className="text-sm text-gray-400 space-y-2">
                  <li>• Review our business pitch and financial projections</li>
                  <li>• Schedule an introductory call with our team</li>
                  <li>• Register your investment interest</li>
                </ul>
              </div>
              <div className="bg-[#111827] rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <FaQuestionCircle className="text-blue-400" />
                  <h4 className="font-medium text-white">Need Help?</h4>
                </div>
                <ul className="text-sm text-gray-400 space-y-2">
                  <li>• Book a call with our investment team</li>
                  <li>• Access our comprehensive FAQ section</li>
                  <li>• Email us at support@equihome.com.au</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderDashboardContent = () => {
    switch (selectedSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {getDashboardMetrics().map((metric, index) => (
                <div key={index} className="bg-[#111827] rounded-xl p-6 border border-blue-500/20">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-xl bg-${metric.color}-500/10 flex items-center justify-center`}>
                      <metric.icon className={`text-2xl text-${metric.color}-400`} />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">{metric.label}</div>
                      <div className="text-xl font-bold text-white">{metric.value}</div>
                      {metric.change && (
                        <div className="text-xs text-green-400">{metric.change}</div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Items */}
            <div className="bg-[#111827] rounded-xl p-6 border border-blue-500/20">
              <h3 className="text-lg font-semibold text-white mb-4">Action Items</h3>
              <div className="space-y-4">
                {getActionItems().map((item, index) => (
                  <div key={index} className="bg-[#0a0f1a] rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-white font-medium">{item.title}</h4>
                        <p className="text-sm text-gray-400">{item.description}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        {item.dueDate && (
                          <div className="text-sm text-gray-400">Due: {item.dueDate}</div>
                        )}
                        <div className={`
                          px-3 py-1 rounded-full text-xs font-medium
                          ${item.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                            item.status === 'in-progress' ? 'bg-blue-500/20 text-blue-400' :
                            'bg-orange-500/20 text-orange-400'}
                        `}>
                          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {investorState === 'active' && (
              <>
                {/* Investment Timeline */}
                <div className="bg-[#111827] rounded-xl p-6 border border-blue-500/20">
                  <h3 className="text-lg font-semibold text-white mb-4">Investment Timeline</h3>
                  <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-500/20" />
                    <div className="space-y-6">
                      <div className="relative pl-10">
                        <div className="absolute left-2 w-4 h-4 rounded-full bg-green-500 -translate-x-1/2" />
                        <div className="text-sm text-gray-400">Dec 16, 2023</div>
                        <div className="text-white">Interest Registration</div>
                      </div>
                      <div className="relative pl-10">
                        <div className="absolute left-2 w-4 h-4 rounded-full bg-green-500 -translate-x-1/2" />
                        <div className="text-sm text-gray-400">Dec 20, 2023</div>
                        <div className="text-white">Due Diligence Access Granted</div>
                      </div>
                      <div className="relative pl-10">
                        <div className="absolute left-2 w-4 h-4 rounded-full bg-blue-500 -translate-x-1/2" />
                        <div className="text-sm text-gray-400">Jan 22, 2024</div>
                        <div className="text-white">Technical Demo Scheduled</div>
                      </div>
                      <div className="relative pl-10">
                        <div className="absolute left-2 w-4 h-4 rounded-full bg-gray-500 -translate-x-1/2" />
                        <div className="text-sm text-gray-400">Jan 31, 2024</div>
                        <div className="text-white">Investment Closing</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Portfolio Analytics */}
                <div className="bg-[#111827] rounded-xl p-6 border border-blue-500/20">
                  <h3 className="text-lg font-semibold text-white mb-4">Portfolio Analytics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-[#0a0f1a] rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-400 mb-2">ROI Projection</h4>
                      {/* Add chart component here */}
                      <div className="h-48 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg" />
                    </div>
                    <div className="bg-[#0a0f1a] rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-400 mb-2">Investment Breakdown</h4>
                      {/* Add chart component here */}
                      <div className="h-48 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg" />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )
      case 'documents':
        return (
          <div className="bg-[#111827] rounded-xl p-6 border border-blue-500/20">
            <h3 className="text-lg font-semibold text-white mb-4">Document Center</h3>
            {/* Add document management UI */}
          </div>
        )
      case 'settings':
        return (
          <div className="bg-[#111827] rounded-xl p-6 border border-blue-500/20">
            <h3 className="text-lg font-semibold text-white mb-6">Profile Settings</h3>
            <form className="space-y-6">
              {/* Profile settings form */}
            </form>
          </div>
        )
      default:
        return null
    }
  }

  // Update the Investment Journey section to show history
  const renderStepWithHistory = (
    key: keyof StepProgress,
    label: string,
    route: string
  ) => {
    const isCompleted = stepProgress[key]
    const lastVisit = stepProgress.visitHistory?.find(h => h.page === key)
    const scheduledDate = stepProgress.scheduledCallDate

    return (
      <Link
        to={route}
        className="flex items-center space-x-2 text-sm hover:bg-[#1a2234] p-2 rounded-lg transition-colors cursor-pointer group"
      >
        {isCompleted ? (
          <div className="flex items-center space-x-2">
            <FaCheck className="text-green-400" />
            {key === 'introCallScheduled' && scheduledDate && (
              <span className="text-xs text-blue-400">
                Meeting: {new Date(scheduledDate).toLocaleDateString()} at {new Date(scheduledDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            )}
            {key !== 'introCallScheduled' && lastVisit && (
              <span className="text-xs text-gray-500">
                {new Date(lastVisit.timestamp).toLocaleDateString()}
              </span>
            )}
          </div>
        ) : (
          <div className="w-4 h-4 rounded-full border-2 border-gray-500 group-hover:border-blue-400 transition-colors" />
        )}
        <span className={`${isCompleted ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300'}`}>
          {label}
        </span>
        <FaArrowRight className="ml-auto text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
      </Link>
    )
  }

  return (
    <div className="min-h-screen bg-[#0B1121]">
      <GlobalHeader currentPage="dashboard" />

      {/* Fundraising Progress Bar */}
      <div className="fixed top-[72px] left-0 right-0 bg-[#0a0f1a]/80 backdrop-blur-sm border-b border-blue-500/10 z-40">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between text-sm mb-2">
            <div className="text-gray-400">Seed Round Progress</div>
            <div className="text-white font-medium">$0.6M raised of $5M</div>
          </div>
          <div className="relative h-1.5 bg-[#1a2234] rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-500"
              style={{ width: '12%' }}
            />
          </div>
          <div className="flex items-center justify-between text-xs mt-2">
            <div className="text-gray-500">Dec 16, 2024</div>
            <div className="text-gray-400">37 days remaining</div>
            <div className="text-gray-500">Jan 31, 2025</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-[180px] px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Dashboard Header */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Investor Dashboard</h1>
              <p className="text-gray-400">Welcome back, {profile.email}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-blue-500/10"
                >
                  <FaBell className="text-xl" />
                </button>
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-[#111827] ring-1 ring-black ring-opacity-5">
                    <div className="p-4">
                      <p className="text-gray-400 text-sm">No new notifications</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="relative">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-blue-500/10"
                >
                  <FaCog className="text-xl" />
                </button>
                {showSettings && renderSettingsMenu()}
              </div>
            </div>
          </div>

          {/* Welcome Guide */}
          {renderWelcomeGuide()}

          {/* Investment Journey - Enhanced */}
          <div className="bg-[#111827] rounded-xl p-8 border border-blue-500/20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Your Investment Journey</h3>
              <div className="text-sm text-gray-400">Current Stage: Pre-Registration</div>
            </div>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-500/20" />
              <div className="space-y-8">
                <div className="relative pl-10">
                  <div className="absolute left-2 w-4 h-4 rounded-full bg-green-500 -translate-x-1/2" />
                  <div className="bg-[#0a0f1a] rounded-lg p-6">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="text-lg font-medium text-white">1. Initial Interest</div>
                      <div className="px-3 py-1 rounded-full text-xs bg-blue-500/20 text-blue-400">Current Stage</div>
                    </div>
                    <p className="text-gray-400 mb-4">Begin your journey by exploring our opportunity and registering your interest.</p>
                    <div className="space-y-3">
                      {renderStepWithHistory(
                        'businessPitchViewed',
                        'Review business pitch and financials',
                        '/pitch'
                      )}
                      {renderStepWithHistory(
                        'portfolioOSViewed',
                        'View Portfolio OS demo',
                        '/portfolio-os'
                      )}
                      {renderStepWithHistory(
                        'introCallScheduled',
                        'Schedule an introductory call',
                        '/book-call'
                      )}
                      {renderStepWithHistory(
                        'interestRegistered',
                        'Complete interest registration form',
                        '/register-interest'
                      )}
                    </div>
                  </div>
                </div>

                <div className="relative pl-10">
                  <div className="absolute left-2 w-4 h-4 rounded-full bg-gray-500 -translate-x-1/2" />
                  <div className="bg-[#0a0f1a] rounded-lg p-6 opacity-75">
                    <div className="text-lg font-medium text-white mb-2">2. Due Diligence</div>
                    <p className="text-gray-400 mb-4">Access comprehensive materials and evaluate the opportunity.</p>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 text-sm p-2">
                        <FaLock className="text-gray-500" />
                        <span className="text-gray-400">Access deal room documents</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm p-2">
                        <FaLock className="text-gray-500" />
                        <span className="text-gray-400">Schedule technical demo</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm p-2">
                        <FaLock className="text-gray-500" />
                        <span className="text-gray-400">Review legal documentation</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative pl-10">
                  <div className="absolute left-2 w-4 h-4 rounded-full bg-gray-500 -translate-x-1/2" />
                  <div className="bg-[#0a0f1a] rounded-lg p-6 opacity-75">
                    <div className="text-lg font-medium text-white mb-2">3. Investment Setup</div>
                    <p className="text-gray-400 mb-4">Complete necessary documentation and verify your investor status.</p>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 text-sm">
                        <FaLock className="text-gray-500" />
                        <span className="text-gray-400">Complete KYC verification</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <FaLock className="text-gray-500" />
                        <span className="text-gray-400">Sign investment agreement</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <FaLock className="text-gray-500" />
                        <span className="text-gray-400">Set up payment details</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative pl-10">
                  <div className="absolute left-2 w-4 h-4 rounded-full bg-gray-500 -translate-x-1/2" />
                  <div className="bg-[#0a0f1a] rounded-lg p-6 opacity-75">
                    <div className="text-lg font-medium text-white mb-2">4. Active Investment</div>
                    <p className="text-gray-400 mb-4">Monitor your investment and stay updated on company progress.</p>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 text-sm">
                        <FaLock className="text-gray-500" />
                        <span className="text-gray-400">Access investor updates</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <FaLock className="text-gray-500" />
                        <span className="text-gray-400">View performance metrics</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <FaLock className="text-gray-500" />
                        <span className="text-gray-400">Participate in investor events</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Resources Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-[#111827] rounded-xl p-6 border border-blue-500/20">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                  <FaFileAlt className="text-2xl text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Resources</h3>
                  <p className="text-sm text-gray-400">Essential documents and guides</p>
                </div>
              </div>
              <div className="space-y-3">
                <Link to="/pitch" className="block p-3 rounded-lg bg-[#0a0f1a] text-gray-300 hover:text-white transition-colors">
                  <div className="flex items-center justify-between">
                    <span>Business Pitch</span>
                    <FaArrowRight className="text-blue-400" />
                  </div>
                </Link>
                <div className="block p-3 rounded-lg bg-[#0a0f1a] text-gray-400">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span>Tech Demo</span>
                      <FaLock className="text-sm text-blue-400" />
                    </div>
                  </div>
                </div>
                <div className="block p-3 rounded-lg bg-[#0a0f1a] text-gray-400">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span>Financial Models</span>
                      <FaLock className="text-sm text-blue-400" />
                    </div>
                  </div>
                </div>
                <div className="block p-3 rounded-lg bg-[#0a0f1a] text-gray-400">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span>Company Structure</span>
                      <FaLock className="text-sm text-blue-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#111827] rounded-xl p-6 border border-blue-500/20">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                  <FaHandshake className="text-2xl text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Support</h3>
                  <p className="text-sm text-gray-400">Get help when you need it</p>
                </div>
              </div>
              <div className="space-y-3">

                <Link to="/book-call" className="block p-3 rounded-lg bg-[#0a0f1a] text-gray-300 hover:text-white transition-colors">
                  <div className="flex items-center justify-between">
                    <span>Schedule a Call</span>
                    <FaArrowRight className="text-blue-400" />
                  </div>
                </Link>
                <a
                  href="mailto:sujay@equihome.com.au"
                  className="block p-3 rounded-lg bg-[#0a0f1a] text-gray-300 hover:text-white transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span>Contact Team</span>
                    <FaArrowRight className="text-blue-400" />
                  </div>
                </a>
              </div>
            </div>

            <div className="bg-[#111827] rounded-xl p-6 border border-blue-500/20">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                  <FaRocket className="text-2xl text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Next Steps</h3>
                  <p className="text-sm text-gray-400">Move your investment forward</p>
                </div>
              </div>
              <div className="space-y-3">
                {!stepProgress.businessPitchViewed && (
                  <Link to="/pitch" className="block p-3 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors">
                    <div className="flex items-center justify-between">
                      <span>Review Business Pitch</span>
                      <FaArrowRight />
                    </div>
                  </Link>
                )}
                {stepProgress.businessPitchViewed && !stepProgress.introCallScheduled && (
                  <Link to="/book-call" className="block p-3 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors">
                    <div className="flex items-center justify-between">
                      <span>Schedule Introduction Call</span>
                      <FaArrowRight />
                    </div>
                  </Link>
                )}
                {stepProgress.introCallScheduled && !stepProgress.interestRegistered && (
                  <Link to="/register-interest" className="block p-3 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors">
                    <div className="flex items-center justify-between">
                      <span>Register Interest</span>
                      <FaArrowRight />
                    </div>
                  </Link>
                )}
                {stepProgress.interestRegistered && (
                  <div className="p-3 rounded-lg bg-green-500/20 text-green-400">
                    <div className="flex items-center justify-between">
                      <span>All steps completed!</span>
                      <FaCheck />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InvestorDashboard