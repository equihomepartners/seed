import React, { useState, useEffect } from 'react'
import { FaUsers, FaCalendar, FaNewspaper, FaChartLine, FaSignOutAlt, FaPlay } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

interface UserActivity {
  userId: string
  email: string
  lastActive: string
  createdAt?: string
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

const API_URL = process.env.REACT_APP_API_URL || 'https://equihome-seed-api-pnk9i.ondigitalocean.app/api'

const AdminDashboard = () => {
  const navigate = useNavigate()
  const [userActivities, setUserActivities] = useState<UserActivity[]>([])
  const [newsletterSubscribers, setNewsletterSubscribers] = useState<NewsletterSubscriber[]>([])
  const [userSignIns, setUserSignIns] = useState<UserSignIn[]>([])
  const [selectedTab, setSelectedTab] = useState('overview')
  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    activeUsers: 0,
    scheduledCalls: 0,
    registeredInterest: 0,
    webinarRegistrations: 0,
    newsletterSubscribers: 0
  })
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError('')

        // Super simple fetch without any auth
        const response = await fetch(`${API_URL}/admin/user-activity`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        })

        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }

        const data = await response.json()
        setUserActivities(data || [])
        
        // Calculate metrics from the user activities
        const metrics = {
          totalUsers: data.length,
          activeUsers: data.filter((u: any) => new Date(u.lastActive) > new Date(Date.now() - 24*60*60*1000)).length,
          scheduledCalls: data.filter((u: any) => u.progress?.introCallScheduled).length,
          registeredInterest: data.filter((u: any) => u.progress?.interestRegistered).length,
          webinarRegistrations: data.filter((u: any) => u.progress?.webinarRegistered).length,
          newsletterSubscribers: data.filter((u: any) => u.progress?.newsletterSubscribed).length
        }
        setMetrics(metrics)

      } catch (error) {
        console.error('Error:', error)
        setError('Failed to load data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B1121] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0B1121] flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    )
  }

  const getOverviewStats = () => {
    return {
      totalUsers: metrics.totalUsers,
      activeUsers: metrics.activeUsers,
      scheduledCalls: metrics.scheduledCalls,
      registeredInterest: userActivities.filter(u => u.progress.interestRegistered).length,
      webinarRegistrations: metrics.webinarRegistrations,
      newsletterSubscribers: metrics.newsletterSubscribers
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
                <th className="pb-4">Last Active</th>
                <th className="pb-4">Newsletter Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {userActivities.sort((a, b) => new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime()).map((user) => {
                const isSubscribed = newsletterSubscribers.some(sub => sub.email.toLowerCase() === user.email.toLowerCase())
                return (
                  <tr key={user.userId} className="border-t border-blue-500/10">
                    <td className="py-4 text-white">{user.email}</td>
                    <td className="py-4 text-gray-400">
                      {new Date(user.createdAt || user.lastActive).toLocaleString()}
                    </td>
                    <td className="py-4 text-gray-400">
                      {new Date(user.lastActive).toLocaleString()}
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
    // Clear all storage
    localStorage.clear();
    sessionStorage.clear();
    
    // Clear all cookies
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    
    // Redirect to splash screen
    window.location.href = '/';
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

        <div className="space-y-6">
          <div className="flex space-x-4 border-b border-blue-500/20">
            <button
              onClick={() => setSelectedTab('overview')}
              className={`px-4 py-2 text-sm font-medium ${
                selectedTab === 'overview'
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setSelectedTab('signins')}
              className={`px-4 py-2 text-sm font-medium ${
                selectedTab === 'signins'
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              Sign-ins
            </button>
            <button
              onClick={() => setSelectedTab('newsletter')}
              className={`px-4 py-2 text-sm font-medium ${
                selectedTab === 'newsletter'
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              Newsletter Subscribers
            </button>
          </div>

          {selectedTab === 'overview' && renderOverview()}
          {selectedTab === 'signins' && renderUserSignIns()}
          {selectedTab === 'newsletter' && renderNewsletterSubscribers()}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard 