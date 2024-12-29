import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaChartLine, FaShieldAlt, FaHome, FaChartBar, FaMapMarkerAlt, FaChartPie, 
         FaArrowUp, FaArrowDown, FaInfoCircle, FaGlobeAmericas, FaSearchLocation,
         FaHandHoldingUsd, FaPercentage, FaHistory, FaLock, FaUnlock, FaBrain } from 'react-icons/fa'
import GlobalHeader from './GlobalHeader'
import { useEffect } from 'react'

const PortfolioOS: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  // Track page view
  useEffect(() => {
    const currentProgress = JSON.parse(localStorage.getItem('investorProgress') || '{}')
    const updatedProgress = {
      ...currentProgress,
      portfolioOSViewed: true,
      lastVisited: new Date().toISOString()
    }
    localStorage.setItem('investorProgress', JSON.stringify(updatedProgress))
  }, [])

  // Portfolio performance metrics
  const portfolioMetrics = {
    targetSize: '$50M',
    averageLoanSize: '$250K',
    propertyRange: '$2M-3M',
    targetLTV: '50%',
    expectedIRR: '16-18%',
    exitWindow: '2-5 years'
  }

  // Market metrics
  const marketMetrics = {
    marketSize: '$5.5T',
    annualGrowth: '8.5%',
    stabilityIndex: '92%',
    demandScore: '95%'
  }

  // Calculate progress percentage
  const totalRound = 5000000 // $5M
  const currentRaised = 700000 // $700K
  const progressPercentage = (currentRaised / totalRound) * 100

  // Calculate days remaining
  const endDate = new Date('2025-01-31')
  const startDate = new Date('2024-12-16')
  const today = new Date()
  const daysRemaining = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#020817] via-[#041434] to-[#061C4C]" ref={ref}>
      <GlobalHeader currentPage="portfolio-os" />
      
      {/* Fundraising Progress Bar */}
      <div className="fixed top-[72px] left-0 right-0 bg-[#020817]/95 backdrop-blur-xl border-b border-blue-500/30 z-40">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <div className="text-blue-200">Seed Round Progress</div>
            <div className="text-white font-medium">${(currentRaised / 1000000).toFixed(1)}M raised of $5M</div>
          </div>
          <div className="relative h-2.5 bg-[#041434] rounded-full overflow-hidden shadow-inner">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 rounded-full transition-all duration-500 shadow-lg"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-xs mt-2">
            <div className="text-blue-300">Dec 16, 2024</div>
            <div className="text-teal-400 font-medium">{daysRemaining} days remaining</div>
            <div className="text-blue-300">Jan 31, 2025</div>
          </div>
        </div>
      </div>

      <div className="pt-[180px] pb-24">
        <div className="max-w-7xl mx-auto px-8">
          {/* Title Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-24"
          >
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent drop-shadow-lg">
              Portfolio Strategy & Analysis
            </h1>
            <p className="text-lg text-blue-200 max-w-3xl mx-auto leading-relaxed">
              Our data-driven approach to building a premium Sydney residential portfolio,
              optimized for strong returns and capital protection.
            </p>
          </motion.div>

          {/* Key Portfolio Metrics Dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
          >
            {/* Portfolio Size & Composition */}
            <div className="bg-gradient-to-br from-[#020817] to-[#041434] rounded-2xl border border-blue-500/30 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-cyan-500/30">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                  <FaChartPie className="text-2xl text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Portfolio Size</h3>
                  <p className="text-sm text-gray-400">Target Deployment</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-[#020817] rounded-xl p-4 shadow-inner backdrop-blur-xl border border-cyan-500/10">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-blue-200">Total Size</span>
                    <span className="text-2xl font-bold text-cyan-400">{portfolioMetrics.targetSize}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-blue-400">Average Loan</span>
                    <span className="text-white">{portfolioMetrics.averageLoanSize}</span>
                  </div>
                </div>
                <div className="bg-[#020817] rounded-xl p-4 shadow-inner backdrop-blur-xl border border-cyan-500/10">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-blue-400">Property Range</span>
                    <span className="text-white">{portfolioMetrics.propertyRange}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-blue-400">Target LTV</span>
                    <span className="text-green-400">{portfolioMetrics.targetLTV}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Market Strength */}
            <div className="bg-gradient-to-br from-[#020817] to-[#041434] rounded-2xl border border-blue-500/30 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-cyan-500/30">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <FaGlobeAmericas className="text-2xl text-purple-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Market Strength</h3>
                  <p className="text-sm text-gray-400">Sydney Premium Market</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-[#020817] rounded-xl p-4 shadow-inner backdrop-blur-xl border border-cyan-500/10">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-blue-200">Market Size</span>
                    <span className="text-2xl font-bold text-purple-400">{marketMetrics.marketSize}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-blue-400">Annual Growth</span>
                    <span className="text-green-400">+{marketMetrics.annualGrowth}</span>
                  </div>
                </div>
                <div className="bg-[#020817] rounded-xl p-4 shadow-inner backdrop-blur-xl border border-cyan-500/10">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-blue-400">Market Stability</span>
                    <span className="text-white">{marketMetrics.stabilityIndex}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-blue-400">Demand Score</span>
                    <span className="text-green-400">{marketMetrics.demandScore}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Return Profile */}
            <div className="bg-gradient-to-br from-[#020817] to-[#041434] rounded-2xl border border-blue-500/30 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-cyan-500/30">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <FaChartLine className="text-2xl text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Return Profile</h3>
                  <p className="text-sm text-gray-400">Expected Performance</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-[#020817] rounded-xl p-4 shadow-inner backdrop-blur-xl border border-cyan-500/10">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-blue-200">Target IRR</span>
                    <span className="text-2xl font-bold text-green-400">{portfolioMetrics.expectedIRR}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-blue-400">Exit Window</span>
                    <span className="text-white">{portfolioMetrics.exitWindow}</span>
                  </div>
                </div>
                <div className="bg-[#020817] rounded-xl p-4 shadow-inner backdrop-blur-xl border border-cyan-500/10 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20" />
                  <div className="relative">
                    <div className="text-sm font-semibold text-white mb-2">Return Components</div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-blue-400">Appreciation Share</span>
                      <span className="text-green-400">8-10%</span>
                    </div>
                    <div className="flex items-center justify-between text-xs mt-1">
                      <span className="text-blue-400">Interest Rate</span>
                      <span className="text-blue-400">8-10%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Portfolio Simulation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-20"
          >
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent drop-shadow-lg">
                Portfolio Simulation
              </h2>
              <div className="h-px flex-grow mx-8 bg-gradient-to-r from-blue-500/20 to-transparent" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* First $50M Portfolio */}
              <div className="bg-gradient-to-br from-[#020817] to-[#041434] rounded-2xl border border-blue-500/30 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-cyan-500/30">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                    <FaChartPie className="text-2xl text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">First $50M Portfolio</h3>
                    <p className="text-sm text-gray-400">Target Allocation</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-[#020817] rounded-xl p-4 shadow-inner backdrop-blur-xl border border-cyan-500/10">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-400 mb-1">Properties</div>
                        <div className="text-2xl font-bold text-white">200</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400 mb-1">Avg. Size</div>
                        <div className="text-2xl font-bold text-cyan-400">$250K</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400 mb-1">Target LTV</div>
                        <div className="text-2xl font-bold text-green-400">50%</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400 mb-1">Property Range</div>
                        <div className="text-2xl font-bold text-purple-400">$2-3M</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#020817] rounded-xl p-4 shadow-inner backdrop-blur-xl border border-cyan-500/10">
                    <h4 className="text-sm font-semibold text-white mb-3">Geographic Distribution</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-400">Eastern Suburbs</span>
                          <span className="text-cyan-400">35%</span>
                        </div>
                        <div className="h-1.5 bg-[#020817] rounded-full overflow-hidden">
                          <div className="h-full w-[35%] bg-cyan-400 rounded-full" />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-400">North Shore</span>
                          <span className="text-green-400">30%</span>
                        </div>
                        <div className="h-1.5 bg-[#020817] rounded-full overflow-hidden">
                          <div className="h-full w-[30%] bg-green-400 rounded-full" />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-400">Northern Beaches</span>
                          <span className="text-purple-400">20%</span>
                        </div>
                        <div className="h-1.5 bg-[#020817] rounded-full overflow-hidden">
                          <div className="h-full w-[20%] bg-purple-400 rounded-full" />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-400">Inner West</span>
                          <span className="text-yellow-400">15%</span>
                        </div>
                        <div className="h-1.5 bg-[#020817] rounded-full overflow-hidden">
                          <div className="h-full w-[15%] bg-yellow-400 rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scenario Analysis */}
              <div className="bg-gradient-to-br from-[#020817] to-[#041434] rounded-2xl border border-blue-500/30 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-cyan-500/30">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                    <FaChartLine className="text-2xl text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Scenario Analysis</h3>
                    <p className="text-sm text-gray-400">5-Year Return Projections</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-[#020817] rounded-xl p-4 shadow-inner backdrop-blur-xl border border-cyan-500/10">
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <div>
                            <div className="text-sm text-white">Best Case</div>
                            <div className="text-xs text-gray-400">Strong market growth</div>
                          </div>
                          <div className="text-lg font-bold text-green-400">22-24% IRR</div>
                        </div>
                        <div className="h-1.5 bg-[#020817] rounded-full overflow-hidden">
                          <div className="h-full w-[95%] bg-gradient-to-r from-green-500 to-green-400 rounded-full" />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <div>
                            <div className="text-sm text-white">Base Case</div>
                            <div className="text-xs text-gray-400">Normal market conditions</div>
                          </div>
                          <div className="text-lg font-bold text-cyan-400">16-18% IRR</div>
                        </div>
                        <div className="h-1.5 bg-[#020817] rounded-full overflow-hidden">
                          <div className="h-full w-[75%] bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full" />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <div>
                            <div className="text-sm text-white">Conservative</div>
                            <div className="text-xs text-gray-400">Slower growth period</div>
                          </div>
                          <div className="text-lg font-bold text-yellow-400">12-14% IRR</div>
                        </div>
                        <div className="h-1.5 bg-[#020817] rounded-full overflow-hidden">
                          <div className="h-full w-[60%] bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full" />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <div>
                            <div className="text-sm text-white">Recession</div>
                            <div className="text-xs text-gray-400">Market downturn</div>
                          </div>
                          <div className="text-lg font-bold text-purple-400">8-10% IRR</div>
                        </div>
                        <div className="h-1.5 bg-[#020817] rounded-full overflow-hidden">
                          <div className="h-full w-[40%] bg-gradient-to-r from-purple-500 to-purple-400 rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Comparative Analysis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-20"
          >
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent drop-shadow-lg">
                Comparative Analysis
              </h2>
              <div className="h-px flex-grow mx-8 bg-gradient-to-r from-blue-500/20 to-transparent" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Returns Comparison */}
              <div className="bg-gradient-to-br from-[#020817] to-[#041434] rounded-2xl border border-blue-500/30 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-cyan-500/30">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                    <FaChartBar className="text-2xl text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Returns Comparison</h3>
                    <p className="text-sm text-gray-400">5-Year Historical Returns</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-[#020817] rounded-xl p-4 shadow-inner backdrop-blur-xl border border-cyan-500/10">
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-white">Equihome Portfolio</span>
                          <span className="text-green-400">16-18%</span>
                        </div>
                        <div className="h-2 bg-[#020817] rounded-full overflow-hidden">
                          <div className="h-full w-[85%] bg-gradient-to-r from-green-500 to-green-400 rounded-full" />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">US Real Estate</span>
                          <span className="text-cyan-400">12-14%</span>
                        </div>
                        <div className="h-2 bg-[#020817] rounded-full overflow-hidden">
                          <div className="h-full w-[65%] bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full" />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">Private Equity</span>
                          <span className="text-purple-400">15-20%</span>
                        </div>
                        <div className="h-2 bg-[#020817] rounded-full overflow-hidden">
                          <div className="h-full w-[80%] bg-gradient-to-r from-purple-500 to-purple-400 rounded-full" />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">Global REITs</span>
                          <span className="text-yellow-400">8-10%</span>
                        </div>
                        <div className="h-2 bg-[#020817] rounded-full overflow-hidden">
                          <div className="h-full w-[45%] bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full" />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">ASX200</span>
                          <span className="text-red-400">8-10%</span>
                        </div>
                        <div className="h-2 bg-[#020817] rounded-full overflow-hidden">
                          <div className="h-full w-[45%] bg-gradient-to-r from-red-500 to-red-400 rounded-full" />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">Fixed Income</span>
                          <span className="text-cyan-400">4-5%</span>
                        </div>
                        <div className="h-2 bg-[#020817] rounded-full overflow-hidden">
                          <div className="h-full w-[25%] bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full" />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">Cash/Term Deposits</span>
                          <span className="text-orange-400">3-4%</span>
                        </div>
                        <div className="h-2 bg-[#020817] rounded-full overflow-hidden">
                          <div className="h-full w-[20%] bg-gradient-to-r from-orange-500 to-orange-400 rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Risk-Return Profile */}
              <div className="bg-gradient-to-br from-[#020817] to-[#041434] rounded-2xl border border-blue-500/30 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-cyan-500/30">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                    <FaShieldAlt className="text-2xl text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Risk-Return Profile</h3>
                    <p className="text-sm text-gray-400">Comparative Risk Assessment</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-[#020817] rounded-xl p-4 shadow-inner backdrop-blur-xl border border-cyan-500/10">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-white">Equihome Portfolio</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-400">Risk Level:</span>
                            <span className="text-xs text-green-400">Very Low</span>
                          </div>
                        </div>
                        <div className="flex space-x-1">
                          <div className="h-1.5 w-full bg-green-400 rounded-full" />
                          <div className="h-1.5 w-full bg-[#020817] rounded-full" />
                          <div className="h-1.5 w-full bg-[#020817] rounded-full" />
                          <div className="h-1.5 w-full bg-[#020817] rounded-full" />
                          <div className="h-1.5 w-full bg-[#020817] rounded-full" />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-400">US Real Estate</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-400">Risk Level:</span>
                            <span className="text-xs text-cyan-400">Medium</span>
                          </div>
                        </div>
                        <div className="flex space-x-1">
                          <div className="h-1.5 w-full bg-cyan-400 rounded-full" />
                          <div className="h-1.5 w-full bg-cyan-400 rounded-full" />
                          <div className="h-1.5 w-full bg-cyan-400 rounded-full" />
                          <div className="h-1.5 w-full bg-[#020817] rounded-full" />
                          <div className="h-1.5 w-full bg-[#020817] rounded-full" />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-400">Private Equity</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-400">Risk Level:</span>
                            <span className="text-xs text-red-400">Very High</span>
                          </div>
                        </div>
                        <div className="flex space-x-1">
                          <div className="h-1.5 w-full bg-red-400 rounded-full" />
                          <div className="h-1.5 w-full bg-red-400 rounded-full" />
                          <div className="h-1.5 w-full bg-red-400 rounded-full" />
                          <div className="h-1.5 w-full bg-red-400 rounded-full" />
                          <div className="h-1.5 w-full bg-red-400 rounded-full" />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-400">Global REITs</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-400">Risk Level:</span>
                            <span className="text-xs text-yellow-400">High</span>
                          </div>
                        </div>
                        <div className="flex space-x-1">
                          <div className="h-1.5 w-full bg-yellow-400 rounded-full" />
                          <div className="h-1.5 w-full bg-yellow-400 rounded-full" />
                          <div className="h-1.5 w-full bg-yellow-400 rounded-full" />
                          <div className="h-1.5 w-full bg-yellow-400 rounded-full" />
                          <div className="h-1.5 w-full bg-[#020817] rounded-full" />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-400">ASX200</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-400">Risk Level:</span>
                            <span className="text-xs text-purple-400">High</span>
                          </div>
                        </div>
                        <div className="flex space-x-1">
                          <div className="h-1.5 w-full bg-purple-400 rounded-full" />
                          <div className="h-1.5 w-full bg-purple-400 rounded-full" />
                          <div className="h-1.5 w-full bg-purple-400 rounded-full" />
                          <div className="h-1.5 w-full bg-purple-400 rounded-full" />
                          <div className="h-1.5 w-full bg-[#020817] rounded-full" />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-400">Fixed Income</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-400">Risk Level:</span>
                            <span className="text-xs text-cyan-400">Low</span>
                          </div>
                        </div>
                        <div className="flex space-x-1">
                          <div className="h-1.5 w-full bg-cyan-400 rounded-full" />
                          <div className="h-1.5 w-full bg-cyan-400 rounded-full" />
                          <div className="h-1.5 w-full bg-[#020817] rounded-full" />
                          <div className="h-1.5 w-full bg-[#020817] rounded-full" />
                          <div className="h-1.5 w-full bg-[#020817] rounded-full" />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-400">Cash/Term Deposits</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-400">Risk Level:</span>
                            <span className="text-xs text-orange-400">Very Low</span>
                          </div>
                        </div>
                        <div className="flex space-x-1">
                          <div className="h-1.5 w-full bg-orange-400 rounded-full" />
                          <div className="h-1.5 w-full bg-[#020817] rounded-full" />
                          <div className="h-1.5 w-full bg-[#020817] rounded-full" />
                          <div className="h-1.5 w-full bg-[#020817] rounded-full" />
                          <div className="h-1.5 w-full bg-[#020817] rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Market Analysis Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-20"
          >
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent drop-shadow-lg">
                Sydney Premium Market Analysis
              </h2>
              <div className="h-px flex-grow mx-8 bg-gradient-to-r from-blue-500/20 to-transparent" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Market Map */}
              <div className="bg-gradient-to-br from-[#020817] to-[#041434] rounded-2xl border border-blue-500/30 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-cyan-500/30">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Target Areas</h3>
                    <p className="text-sm text-gray-400">Premium Sydney Locations</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="px-3 py-1 bg-cyan-500/20 rounded-full">
                      <span className="text-xs text-cyan-400">5 Regions</span>
                    </div>
                  </div>
                </div>
                
                <div className="aspect-video bg-[#020817] rounded-xl p-4 relative overflow-hidden">
                  {/* Placeholder gradient map */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10" />
                  <div className="relative h-full flex items-center justify-center">
                    <div className="text-center">
                      <FaMapMarkerAlt className="text-4xl text-cyan-400 mx-auto mb-4" />
                      <p className="text-sm text-gray-400">Interactive map coming soon</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-4">
                  <div className="bg-[#020817] rounded-lg p-3">
                    <div className="text-sm text-white mb-1">Eastern Suburbs</div>
                    <div className="text-xs text-gray-400">Median: $2.6M</div>
                  </div>
                  <div className="bg-[#020817] rounded-lg p-3">
                    <div className="text-sm text-white mb-1">North Shore</div>
                    <div className="text-xs text-gray-400">Median: $2.4M</div>
                  </div>
                  <div className="bg-[#020817] rounded-lg p-3">
                    <div className="text-sm text-white mb-1">Northern Beaches</div>
                    <div className="text-xs text-gray-400">Median: $2.2M</div>
                  </div>
                  <div className="bg-[#020817] rounded-lg p-3">
                    <div className="text-sm text-white mb-1">Inner West</div>
                    <div className="text-xs text-gray-400">Median: $2.0M</div>
                  </div>
                </div>
              </div>

              {/* Market Metrics */}
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-[#020817] to-[#041434] rounded-2xl border border-blue-500/30 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-cyan-500/30">
                  <h3 className="text-lg font-semibold text-white mb-4">Market Performance</h3>
                  <div className="space-y-4">
                    {[
                      { year: '2020', value: '5.2%' },
                      { year: '2021', value: '25.8%' },
                      { year: '2022', value: '12.4%' },
                      { year: '2023', value: '8.5%' },
                      { year: '2024F', value: '9.2%' }
                    ].map((data) => (
                      <div key={data.year} className="relative">
                        <div className="flex justify-between text-sm text-gray-400 mb-2">
                          <span>{data.year}</span>
                          <span>{data.value}</span>
                        </div>
                        <div className="h-2 bg-[#020817] rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${parseFloat(data.value)}0%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-cyan-500 to-blue-400"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#020817] to-[#041434] rounded-2xl border border-blue-500/30 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-cyan-500/30">
                  <h3 className="text-lg font-semibold text-white mb-4">Market Strength Indicators</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#020817] rounded-xl p-4 shadow-inner backdrop-blur-xl border border-cyan-500/10">
                      <div className="text-2xl font-bold text-green-400 mb-1">99.2%</div>
                      <div className="text-sm text-gray-400">Occupancy Rate</div>
                    </div>
                    <div className="bg-[#020817] rounded-xl p-4 shadow-inner backdrop-blur-xl border border-cyan-500/10">
                      <div className="text-2xl font-bold text-cyan-400 mb-1">0.8%</div>
                      <div className="text-sm text-gray-400">Supply Growth</div>
                    </div>
                    <div className="bg-[#020817] rounded-xl p-4 shadow-inner backdrop-blur-xl border border-cyan-500/10">
                      <div className="text-2xl font-bold text-purple-400 mb-1">72%</div>
                      <div className="text-sm text-gray-400">Owner Occupied</div>
                    </div>
                    <div className="bg-[#020817] rounded-xl p-4 shadow-inner backdrop-blur-xl border border-cyan-500/10">
                      <div className="text-2xl font-bold text-yellow-400 mb-1">AAA</div>
                      <div className="text-sm text-gray-400">Location Rating</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Underwriting & Technology Framework */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-20"
          >
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent drop-shadow-lg">
                Intelligent Portfolio Selection
              </h2>
              <div className="h-px flex-grow mx-8 bg-gradient-to-r from-blue-500/20 to-transparent" />
            </div>

            {/* Technology Core */}
            <div className="bg-gradient-to-br from-[#020817] to-[#041434] rounded-2xl border border-blue-500/30 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-cyan-500/30 mb-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <FaBrain className="text-2xl text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Intelligent Asset Selection</h3>
                  <p className="text-sm text-gray-400">Data-Driven Decision Making</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#020817] rounded-xl p-4 shadow-inner backdrop-blur-xl border border-cyan-500/10">
                  <h4 className="text-sm font-semibold text-green-400 mb-3">Market Analysis</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center text-xs text-gray-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 mr-2" />
                      Price trend prediction
                    </li>
                    <li className="flex items-center text-xs text-gray-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 mr-2" />
                      Supply-demand modeling
                    </li>
                    <li className="flex items-center text-xs text-gray-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 mr-2" />
                      Growth pattern detection
                    </li>
                  </ul>
                </div>
                <div className="bg-[#020817] rounded-xl p-4 shadow-inner backdrop-blur-xl border border-cyan-500/10">
                  <h4 className="text-sm font-semibold text-green-400 mb-3">Risk Assessment</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center text-xs text-gray-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 mr-2" />
                      Market cycle analysis
                    </li>
                    <li className="flex items-center text-xs text-gray-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 mr-2" />
                      Volatility measurement
                    </li>
                    <li className="flex items-center text-xs text-gray-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 mr-2" />
                      Risk factor scoring
                    </li>
                  </ul>
                </div>
                <div className="bg-[#020817] rounded-xl p-4 shadow-inner backdrop-blur-xl border border-cyan-500/10">
                  <h4 className="text-sm font-semibold text-green-400 mb-3">Portfolio Optimization</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center text-xs text-gray-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 mr-2" />
                      Return maximization
                    </li>
                    <li className="flex items-center text-xs text-gray-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 mr-2" />
                      Risk diversification
                    </li>
                    <li className="flex items-center text-xs text-gray-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 mr-2" />
                      Portfolio rebalancing
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Asset Selection Process */}
              <div className="bg-gradient-to-br from-[#020817] to-[#041434] rounded-2xl border border-blue-500/30 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-cyan-500/30">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                    <FaChartBar className="text-2xl text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Asset Selection Process</h3>
                    <p className="text-sm text-gray-400">Data-Driven Property Analysis</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-[#020817] rounded-xl p-4 shadow-inner backdrop-blur-xl border border-cyan-500/10">
                    <h4 className="text-sm font-semibold text-white mb-3">Key Metrics</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center text-xs text-gray-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mr-2" />
                        Historical growth rates
                      </li>
                      <li className="flex items-center text-xs text-gray-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mr-2" />
                        Land value ratio
                      </li>
                      <li className="flex items-center text-xs text-gray-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mr-2" />
                        Market fundamentals
                      </li>
                      <li className="flex items-center text-xs text-gray-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mr-2" />
                        Supply constraints
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Portfolio Theory */}
              <div className="bg-gradient-to-br from-[#020817] to-[#041434] rounded-2xl border border-blue-500/30 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-cyan-500/30">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                    <FaChartLine className="text-2xl text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Portfolio Theory</h3>
                    <p className="text-sm text-gray-400">Risk-Optimized Returns</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-[#020817] rounded-xl p-4 shadow-inner backdrop-blur-xl border border-cyan-500/10">
                    <h4 className="text-sm font-semibold text-white mb-3">Strategy</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center text-xs text-gray-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mr-2" />
                        Geographic diversification
                      </li>
                      <li className="flex items-center text-xs text-gray-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mr-2" />
                        Market driver diversity
                      </li>
                      <li className="flex items-center text-xs text-gray-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mr-2" />
                        Risk-return optimization
                      </li>
                      <li className="flex items-center text-xs text-gray-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mr-2" />
                        Efficient frontier targeting
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Portfolio Strategy Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-20"
          >
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent drop-shadow-lg">
                Portfolio Strategy
              </h2>
              <div className="h-px flex-grow mx-8 bg-gradient-to-r from-blue-500/20 to-transparent" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Investment Approach */}
              <div className="bg-gradient-to-br from-[#020817] to-[#041434] rounded-2xl border border-blue-500/30 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-cyan-500/30">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                    <FaSearchLocation className="text-2xl text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Investment Approach</h3>
                    <p className="text-sm text-gray-400">Research-Backed Selection</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-[#020817] rounded-xl p-4 shadow-inner backdrop-blur-xl border border-cyan-500/10">
                    <h4 className="text-sm font-semibold text-white mb-2">Property Selection</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center text-xs text-gray-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mr-2" />
                        Premium houses in established areas
                      </li>
                      <li className="flex items-center text-xs text-gray-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mr-2" />
                        Strong historical price growth
                      </li>
                      <li className="flex items-center text-xs text-gray-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mr-2" />
                        High owner-occupier ratios
                      </li>
                    </ul>
                  </div>
                  <div className="bg-[#020817] rounded-xl p-4 shadow-inner backdrop-blur-xl border border-cyan-500/10">
                    <h4 className="text-sm font-semibold text-white mb-2">Market Analysis</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center text-xs text-gray-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400 mr-2" />
                        Supply-demand dynamics
                      </li>
                      <li className="flex items-center text-xs text-gray-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400 mr-2" />
                        Infrastructure development
                      </li>
                      <li className="flex items-center text-xs text-gray-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400 mr-2" />
                        Demographic trends
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Portfolio Construction */}
              <div className="bg-gradient-to-br from-[#020817] to-[#041434] rounded-2xl border border-blue-500/30 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-cyan-500/30">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                    <FaHandHoldingUsd className="text-2xl text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Portfolio Construction</h3>
                    <p className="text-sm text-gray-400">Optimized Allocation</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-[#020817] rounded-xl p-4 shadow-inner backdrop-blur-xl border border-cyan-500/10">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm text-white">Eastern Suburbs</span>
                      <span className="text-xs text-purple-400">35%</span>
                    </div>
                    <div className="h-1.5 bg-[#020817] rounded-full overflow-hidden">
                      <div className="h-full w-[35%] bg-purple-400 rounded-full" />
                    </div>
                  </div>
                  <div className="bg-[#020817] rounded-xl p-4 shadow-inner backdrop-blur-xl border border-cyan-500/10">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm text-white">North Shore</span>
                      <span className="text-xs text-blue-400">30%</span>
                    </div>
                    <div className="h-1.5 bg-[#020817] rounded-full overflow-hidden">
                      <div className="h-full w-[30%] bg-blue-400 rounded-full" />
                    </div>
                  </div>
                  <div className="bg-[#020817] rounded-xl p-4 shadow-inner backdrop-blur-xl border border-cyan-500/10">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm text-white">Northern Beaches</span>
                      <span className="text-xs text-green-400">20%</span>
                    </div>
                    <div className="h-1.5 bg-[#020817] rounded-full overflow-hidden">
                      <div className="h-full w-[20%] bg-green-400 rounded-full" />
                    </div>
                  </div>
                  <div className="bg-[#020817] rounded-xl p-4 shadow-inner backdrop-blur-xl border border-cyan-500/10">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm text-white">Inner West</span>
                      <span className="text-xs text-yellow-400">15%</span>
                    </div>
                    <div className="h-1.5 bg-[#020817] rounded-full overflow-hidden">
                      <div className="h-full w-[15%] bg-yellow-400 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Return Optimization */}
              <div className="bg-gradient-to-br from-[#020817] to-[#041434] rounded-2xl border border-blue-500/30 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-cyan-500/30">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                    <FaPercentage className="text-2xl text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Return Optimization</h3>
                    <p className="text-sm text-gray-400">Value Creation</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-[#020817] rounded-xl p-4 shadow-inner backdrop-blur-xl border border-cyan-500/10">
                    <h4 className="text-sm font-semibold text-white mb-2">Appreciation Share</h4>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-400">Historical Average</span>
                      <span className="text-sm text-green-400">8-10% p.a.</span>
                    </div>
                    <div className="text-xs text-gray-400">
                      Based on premium Sydney house price appreciation
                    </div>
                  </div>
                  <div className="bg-[#020817] rounded-xl p-4 shadow-inner backdrop-blur-xl border border-cyan-500/10">
                    <h4 className="text-sm font-semibold text-white mb-2">Interest Rate</h4>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-400">Target Return</span>
                      <span className="text-sm text-blue-400">8-10% p.a.</span>
                    </div>
                    <div className="text-xs text-gray-400">
                      Through strategic interest rate management
                    </div>
                  </div>
                  <div className="bg-[#020817] rounded-xl p-4 shadow-inner backdrop-blur-xl border border-cyan-500/10">
                    <h4 className="text-sm font-semibold text-white mb-2">Combined IRR</h4>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-400">Expected Range</span>
                      <span className="text-sm text-purple-400">16-18% p.a.</span>
                    </div>
                    <div className="text-xs text-gray-400">
                      Total portfolio return potential
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Risk Management Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mb-20"
          >
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent drop-shadow-lg">
                Risk Management
              </h2>
              <div className="h-px flex-grow mx-8 bg-gradient-to-r from-blue-500/20 to-transparent" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Protection Framework */}
              <div className="bg-gradient-to-br from-[#020817] to-[#041434] rounded-2xl border border-blue-500/30 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-cyan-500/30">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                      <FaShieldAlt className="text-2xl text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Protection Framework</h3>
                      <p className="text-sm text-gray-400">Multi-Layer Security</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-[#020817] rounded-xl p-4 shadow-inner backdrop-blur-xl border border-cyan-500/10">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                        <FaLock className="text-green-400" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white">Conservative LTV</h4>
                        <p className="text-xs text-gray-400">50% maximum loan-to-value ratio provides significant equity buffer</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#020817] rounded-xl p-4 shadow-inner backdrop-blur-xl border border-cyan-500/10">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                        <FaHome className="text-purple-400" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white">Premium Properties</h4>
                        <p className="text-xs text-gray-400">Focus on high-quality houses in established areas</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#020817] rounded-xl p-4 shadow-inner backdrop-blur-xl border border-cyan-500/10">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                        <FaMapMarkerAlt className="text-yellow-400" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white">Location Quality</h4>
                        <p className="text-xs text-gray-400">Strong historical performance and limited supply</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Market Cycle Protection */}
              <div className="bg-gradient-to-br from-[#020817] to-[#041434] rounded-2xl border border-blue-500/30 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-cyan-500/30">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                      <FaHistory className="text-2xl text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Market Cycle Protection</h3>
                      <p className="text-sm text-gray-400">Downside Management</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-[#020817] rounded-xl p-4 shadow-inner backdrop-blur-xl border border-cyan-500/10">
                    <h4 className="text-sm font-semibold text-white mb-3">Historical Performance</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-400">GFC (2008-2009)</span>
                          <span className="text-green-400">-5.2%</span>
                        </div>
                        <div className="h-1.5 bg-[#020817] rounded-full overflow-hidden">
                          <div className="h-full w-[5.2%] bg-green-400 rounded-full" />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-400">COVID (2020)</span>
                          <span className="text-blue-400">-2.1%</span>
                        </div>
                        <div className="h-1.5 bg-[#020817] rounded-full overflow-hidden">
                          <div className="h-full w-[2.1%] bg-blue-400 rounded-full" />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-400">Rate Hikes (2022)</span>
                          <span className="text-purple-400">-3.5%</span>
                        </div>
                        <div className="h-1.5 bg-[#020817] rounded-full overflow-hidden">
                          <div className="h-full w-[3.5%] bg-purple-400 rounded-full" />
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 text-xs text-gray-400">
                      Premium Sydney houses showed minimal drawdown in major market events
                    </div>
                  </div>
                  <div className="bg-[#020817] rounded-xl p-4 shadow-inner backdrop-blur-xl border border-cyan-500/10">
                    <h4 className="text-sm font-semibold text-white mb-2">Recovery Periods</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-400">GFC Recovery</span>
                        <span className="text-xs text-green-400">14 months</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-400">COVID Recovery</span>
                        <span className="text-xs text-blue-400">6 months</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-400">Rate Hike Recovery</span>
                        <span className="text-xs text-purple-400">9 months</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default PortfolioOS 