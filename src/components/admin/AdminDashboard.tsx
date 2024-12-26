import React, { useState, useEffect } from 'react'
import { FaUsers, FaCalendar, FaNewspaper, FaChartLine, FaSignOutAlt, FaPlay } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

interface UserActivity {
  userId: string
  email: string
  lastActive: string
  progress: {
    businessPitchViewed: boolean
    portfolioOSViewed: boolean
    introCallScheduled: boolean
    interestRegistered: boolean
    webinarRegistered?: boolean
    scheduledCallDate?: string
  }
  visitHistory: Array<{
    page: string
    timestamp: string
  }>
}

interface NewsletterSubscriber {
  email: string
  subscribedAt: string
}

interface UserSignIn {
  email: string
  signInTime: string
  userId: string
}

const AdminDashboard = () => {
  const navigate = useNavigate()
  const [userActivities, setUserActivities] = useState<UserActivity[]>([])
  const [newsletterSubscribers, setNewsletterSubscribers] = useState<NewsletterSubscriber[]>([])
  const [userSignIns, setUserSignIns] = useState<UserSignIn[]>([])
  const [selectedTab, setSelectedTab] = useState('overview')

  useEffect(() => {
    // Fetch data from localStorage for demo
    const fetchData = () => {
      const activities: UserActivity[] = []
      const subscribers: NewsletterSubscriber[] = JSON.parse(localStorage.getItem('newsletterSubscribers') || '[]')
      const signIns: UserSignIn[] = JSON.parse(localStorage.getItem('userSignIns') || '[]')

      // Iterate through localStorage to find user data
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key?.startsWith('user_')) {
          const userData = JSON.parse(localStorage.getItem(key) || '{}')
          const progress = JSON.parse(localStorage.getItem('investorProgress_' + key.split('_')[1]) || '{}')
          
          activities.push({
            userId: key.split('_')[1],
            email: userData.email,
            lastActive: userData.lastActive || 'Unknown',
            progress: progress,
            visitHistory: progress.visitHistory || []
          })
        }
      }

      setUserActivities(activities)
      setNewsletterSubscribers(subscribers)
      setUserSignIns(signIns)
    }

    fetchData()
    const interval = setInterval(fetchData, 30000) // Refresh every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const getOverviewStats = () => {
    return {
      totalUsers: userSignIns.length,
      activeUsers: userActivities.filter(u => new Date(u.lastActive).getTime() > Date.now() - 24 * 60 * 60 * 1000).length,
      scheduledCalls: userActivities.filter(u => u.progress.introCallScheduled).length,
      registeredInterest: userActivities.filter(u => u.progress.interestRegistered).length,
      webinarRegistrations: userActivities.filter(u => u.progress.webinarRegistered).length,
      newsletterSubscribers: newsletterSubscribers.length
    }
  }

  const renderOverview = () => {
    const stats = getOverviewStats()

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
          <div className="bg-[#111827] rounded-xl p-6 border border-blue-500/20">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <FaUsers className="text-2xl text-blue-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Total Users</div>
                <div className="text-2xl font-bold text-white">{stats.totalUsers}</div>
              </div>
            </div>
          </div>

          <div className="bg-[#111827] rounded-xl p-6 border border-blue-500/20">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                <FaCalendar className="text-2xl text-green-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Scheduled Calls</div>
                <div className="text-2xl font-bold text-white">{stats.scheduledCalls}</div>
              </div>
            </div>
          </div>

          <div className="bg-[#111827] rounded-xl p-6 border border-blue-500/20">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <FaChartLine className="text-2xl text-purple-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Registered Interest</div>
                <div className="text-2xl font-bold text-white">{stats.registeredInterest}</div>
              </div>
            </div>
          </div>

          <div className="bg-[#111827] rounded-xl p-6 border border-blue-500/20">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center">
                <FaPlay className="text-2xl text-pink-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Webinar Signups</div>
                <div className="text-2xl font-bold text-white">{stats.webinarRegistrations}</div>
              </div>
            </div>
          </div>

          <div className="bg-[#111827] rounded-xl p-6 border border-blue-500/20">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
                <FaNewspaper className="text-2xl text-orange-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Newsletter Subs</div>
                <div className="text-2xl font-bold text-white">{stats.newsletterSubscribers}</div>
              </div>
            </div>
          </div>

          <div className="bg-[#111827] rounded-xl p-6 border border-blue-500/20">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                <FaUsers className="text-2xl text-cyan-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Active Users</div>
                <div className="text-2xl font-bold text-white">{stats.activeUsers}</div>
              </div>
            </div>
          </div>
        </div>

        {/* User Activity Table */}
        <div className="bg-[#111827] rounded-xl border border-blue-500/20 overflow-hidden">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Recent User Activity</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-400">
                    <th className="pb-4">Email</th>
                    <th className="pb-4">Last Active</th>
                    <th className="pb-4">Progress</th>
                    <th className="pb-4">Call Status</th>
                    <th className="pb-4">Webinar</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {userActivities.map((user, index) => (
                    <tr key={user.userId} className="border-t border-blue-500/10">
                      <td className="py-4 text-white">{user.email}</td>
                      <td className="py-4 text-gray-400">
                        {new Date(user.lastActive).toLocaleDateString()}
                      </td>
                      <td className="py-4">
                        <div className="flex space-x-2">
                          {user.progress.businessPitchViewed && (
                            <span className="px-2 py-1 bg-blue-500/20 rounded-full text-xs text-blue-400">Pitch</span>
                          )}
                          {user.progress.portfolioOSViewed && (
                            <span className="px-2 py-1 bg-purple-500/20 rounded-full text-xs text-purple-400">Portfolio</span>
                          )}
                          {user.progress.interestRegistered && (
                            <span className="px-2 py-1 bg-green-500/20 rounded-full text-xs text-green-400">Registered</span>
                          )}
                        </div>
                      </td>
                      <td className="py-4">
                        {user.progress.introCallScheduled ? (
                          <span className="text-green-400">
                            {user.progress.scheduledCallDate ? 
                              new Date(user.progress.scheduledCallDate).toLocaleDateString() :
                              'Scheduled'
                            }
                          </span>
                        ) : (
                          <span className="text-gray-400">Not Scheduled</span>
                        )}
                      </td>
                      <td className="py-4">
                        {user.progress.webinarRegistered ? (
                          <span className="text-pink-400">Registered</span>
                        ) : (
                          <span className="text-gray-400">Not Registered</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderNewsletterSubscribers = () => (
    <div className="bg-[#111827] rounded-xl border border-blue-500/20 overflow-hidden">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Newsletter Subscribers</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-400">
                <th className="pb-4">Email</th>
                <th className="pb-4">Subscribed Date</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {newsletterSubscribers.map((subscriber, index) => (
                <tr key={index} className="border-t border-blue-500/10">
                  <td className="py-4 text-white">{subscriber.email}</td>
                  <td className="py-4 text-gray-400">
                    {new Date(subscriber.subscribedAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderUserSignIns = () => (
    <div className="bg-[#111827] rounded-xl border border-blue-500/20 overflow-hidden">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Sign-ins</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-400">
                <th className="pb-4">Email</th>
                <th className="pb-4">Sign-in Time</th>
                <th className="pb-4">Newsletter Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {userSignIns.sort((a, b) => new Date(b.signInTime).getTime() - new Date(a.signInTime).getTime()).map((signIn, index) => {
                const isSubscribed = newsletterSubscribers.some(sub => sub.email.toLowerCase() === signIn.email.toLowerCase())
                return (
                  <tr key={index} className="border-t border-blue-500/10">
                    <td className="py-4 text-white">{signIn.email}</td>
                    <td className="py-4 text-gray-400">
                      {new Date(signIn.signInTime).toLocaleString()}
                    </td>
                    <td className="py-4">
                      {isSubscribed ? (
                        <span className="px-2 py-1 bg-green-500/20 rounded-full text-xs text-green-400">Subscribed</span>
                      ) : (
                        <span className="px-2 py-1 bg-gray-500/20 rounded-full text-xs text-gray-400">Not Subscribed</span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const handleSignOut = () => {
    // Clear all session data
    localStorage.removeItem('adminAuthenticated')
    localStorage.removeItem('adminEmail')
    localStorage.removeItem('sessionActive')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('userId')
    
    // Force page reload to clear React state
    window.location.href = '/admin/signin'
  }

  return (
    <div className="min-h-screen bg-[#0B1121] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-gray-400 mt-2">Monitor user activity and engagement</p>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center space-x-2 px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
          >
            <FaSignOutAlt />
            <span>Sign Out</span>
          </button>
        </div>

        <div className="mb-8">
          <nav className="flex space-x-4">
            <button
              onClick={() => setSelectedTab('overview')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedTab === 'overview'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setSelectedTab('signins')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedTab === 'signins'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Sign-ins
            </button>
            <button
              onClick={() => setSelectedTab('newsletter')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedTab === 'newsletter'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Newsletter Subscribers
            </button>
          </nav>
        </div>

        <div className="space-y-8">
          {selectedTab === 'overview' && renderOverview()}
          {selectedTab === 'signins' && renderUserSignIns()}
          {selectedTab === 'newsletter' && renderNewsletterSubscribers()}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard 