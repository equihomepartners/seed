import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts'

const AustralianMarket = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const historicalData = [
    { year: 1995, Sydney: 4.5, SanFrancisco: 3.8, Miami: 3.5, LosAngeles: 3.2, London: 3.0, NewYork: 3.1, Tokyo: 2.8, GlobalAverage: 2.5 },
    { year: 1997, Sydney: 5.2, SanFrancisco: 4.1, Miami: 3.8, LosAngeles: 3.5, London: 3.2, NewYork: 3.3, Tokyo: 2.9, GlobalAverage: 2.7 },
    { year: 2023, Sydney: 8.2, SanFrancisco: 5.1, Miami: 4.8, LosAngeles: 4.5, London: 3.8, NewYork: 4.0, Tokyo: 3.5, GlobalAverage: 3.2 }
  ]

  const marketComparisonData = [
    { 
      name: 'Sydney',
      avgEquity: 580000,
      marketCoverage: 85,
      description: 'One major market to master'
    },
    { 
      name: 'US Average',
      avgEquity: 320000,
      marketCoverage: 35,
      description: '50+ markets to understand'
    }
  ]

  const recessionData = [
    { 
      year: '1991',
      event: 'Last Australian Recession',
      description: '32+ years of continuous economic growth'
    },
    {
      year: '2008',
      event: 'Global Financial Crisis',
      description: 'Australia: Only G20 nation to avoid recession'
    },
    {
      year: '2020',
      event: 'COVID-19 Pandemic',
      description: 'Property values remained stable, quick recovery'
    }
  ]

  return (
    <section ref={ref} className="py-32 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-block mb-8">
            <div className="flex items-center space-x-2 px-4 py-2 bg-sky-50 rounded-full border border-sky-100">
              <div className="w-2 h-2 rounded-full bg-sky-500" />
              <span className="text-sm font-medium text-sky-600">Market Analysis</span>
            </div>
          </div>
          <h2 className="text-5xl font-bold mb-6 text-gray-900">Australian Market Strength</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Leading global property growth with strong market fundamentals</p>
        </motion.div>

        {/* Key Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="fintech-card p-8"
          >
            <div className="text-4xl font-bold text-sky-600 mb-4">92%</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Home Ownership Dream</h3>
            <p className="text-gray-600">Of Australians aspire to own their home, creating sustained market demand and value stability</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="fintech-card p-8"
          >
            <div className="text-4xl font-bold text-sky-600 mb-4">8.2%</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Annual Growth Rate</h3>
            <p className="text-gray-600">Sydney's residential property market outperforms major global cities consistently</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="fintech-card p-8"
          >
            <div className="text-4xl font-bold text-sky-600 mb-4">AAA</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Stable Economy</h3>
            <p className="text-gray-600">One of only 9 countries with AAA credit rating from all major agencies</p>
          </motion.div>
        </div>

        {/* Sydney Market Deep Dive Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">Sydney Market Deep Dive: General vs Target Market</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Growth Rates Comparison */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="fintech-card p-8"
            >
              <h4 className="text-xl font-medium text-sky-800 mb-6">Growth Rates</h4>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">General Sydney</span>
                    <span className="text-sky-600 font-semibold">8.2% p.a.</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-sky-500 h-2 rounded-full" style={{ width: '82%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Target Premium Markets</span>
                    <span className="text-sky-600 font-semibold">10.5% p.a.</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-sky-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
                <div className="pt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Premium Market Advantage</span>
                    <span className="text-emerald-600 font-semibold">+2.3%</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Our target premium markets consistently outperform the general Sydney market</p>
                </div>
              </div>
            </motion.div>

            {/* Market Fundamentals */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="fintech-card p-8"
            >
              <h4 className="text-xl font-medium text-sky-800 mb-6">Market Fundamentals</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Avg Property Value</span>
                    <div>
                      <div className="text-gray-600">General: $1.2M</div>
                      <div className="text-sky-600 font-semibold">Target: $2.5M+</div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Owner Equity</span>
                    <div>
                      <div className="text-gray-600">General: 45%</div>
                      <div className="text-sky-600 font-semibold">Target: 70%+</div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Market Liquidity</span>
                    <div>
                      <div className="text-gray-600">General: 45 days</div>
                      <div className="text-sky-600 font-semibold">Target: 28 days</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Unit Economics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="fintech-card p-8"
            >
              <h4 className="text-xl font-medium text-sky-800 mb-6">Unit Economics</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Avg Transaction Size</span>
                    <div>
                      <div className="text-gray-600">General: $200K</div>
                      <div className="text-sky-600 font-semibold">Target: $500K+</div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Default Risk</span>
                    <div>
                      <div className="text-gray-600">General: 1.2%</div>
                      <div className="text-sky-600 font-semibold">Target: 0.3%</div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Processing Time</span>
                    <div>
                      <div className="text-gray-600">General: 45 days</div>
                      <div className="text-sky-600 font-semibold">Target: 15 days</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Market Stability */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="fintech-card p-8"
            >
              <h4 className="text-xl font-medium text-sky-800 mb-6">Market Stability</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Price Volatility</span>
                    <div>
                      <div className="text-gray-600">General: Medium</div>
                      <div className="text-sky-600 font-semibold">Target: Very Low</div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Supply Constraints</span>
                    <div>
                      <div className="text-gray-600">General: Moderate</div>
                      <div className="text-sky-600 font-semibold">Target: Severe</div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Demographic Stability</span>
                    <div>
                      <div className="text-gray-600">General: Medium</div>
                      <div className="text-sky-600 font-semibold">Target: High</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Recession Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="fintech-card p-8 mb-16"
        >
          <h3 className="text-2xl font-semibold text-gray-900 mb-8">Economic Stability Timeline</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recessionData.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-sky-50 to-white rounded-2xl -z-10" />
                <div className="text-4xl font-bold text-sky-600 mb-4">{item.year}</div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">{item.event}</h4>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why Australian Real Estate for US Investors? & Market Stability Factors */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="fintech-card p-8"
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-8">Why Australian Real Estate for US Investors?</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-3">Market Maturity & Scale</h4>
                <p className="text-gray-600">Sydney's property market value exceeds $3.3T, comparable to major US cities with concentrated growth potential</p>
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-3">Regulatory Excellence</h4>
                <p className="text-gray-600">World's strongest banking system ranked #1 with transparent property laws modeled after US system</p>
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-3">Strategic Diversification</h4>
                <p className="text-gray-600">Different economic cycles and time zones enable 24/7 portfolio balancing</p>
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-3">Growth Catalysts</h4>
                <p className="text-gray-600">Net migration of 400k+ annually, major infrastructure projects, and limited land release driving sustained demand</p>
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-3">Economic Stability</h4>
                <p className="text-gray-600">AAA-rated economy with 32+ years of growth and strongest property rights protection globally</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="fintech-card p-8"
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-8">Market Stability Factors</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-3">Supply Constraints</h4>
                <p className="text-gray-600">Land not at risk of overproduction, creating natural value appreciation</p>
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-3">Market Transparency</h4>
                <p className="text-gray-600">Ranked #3 globally for real estate transparency, ahead of US (#4) and UK (#5)</p>
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-3">Tech Hub Growth</h4>
                <p className="text-gray-600">Sydney ranked #1 in Asia-Pacific for tech industry growth, driving premium housing demand</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Investment Thesis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mt-32 relative"
        >
          {/* Enhanced background with pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-sky-50/50 via-white to-sky-50/50 rounded-3xl -z-10">
            <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'url("/grid-pattern.svg")' }} />
          </div>
          
          <div className="max-w-7xl mx-auto px-8 py-16">
            <div className="text-center mb-16">
              <div className="inline-block mb-8">
                <div className="flex items-center space-x-2 px-4 py-2 bg-sky-50 rounded-full border border-sky-100">
                  <div className="w-2 h-2 rounded-full bg-sky-500" />
                  <span className="text-sm font-medium text-sky-600">Investment Strategy</span>
                </div>
              </div>
              <h2 className="text-5xl font-bold mb-6 text-gray-900">Investment Thesis</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Strategic approach to maximizing returns in Australia's premium property market
              </p>
            </div>
            
            {/* Market Opportunity Section */}
            <div className="mb-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-semibold text-sky-800 mb-6">Premium Market Strategy</h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-8">
                    Our fund targets premium Sydney suburbs with proven track records of superior returns and market stability.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-sky-500 rounded-full mt-2" />
                      <p className="text-gray-600">Focus on properties valued $2.5M+ in established premium suburbs</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-sky-500 rounded-full mt-2" />
                      <p className="text-gray-600">Target areas with 10.5% p.a. growth vs market average of 8.2%</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-sky-500 rounded-full mt-2" />
                      <p className="text-gray-600">Properties with 70%+ owner equity and strong market liquidity</p>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <img src="/sydney region map.jpg" alt="Sydney Premium Markets" className="rounded-xl shadow-lg w-full" />
                </div>
              </div>
            </div>

            {/* Investment Strategy Section */}
            <div className="mb-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <div className="bg-white rounded-xl shadow-lg p-8">
                    <div className="grid grid-cols-1 gap-6">
                      <div className="p-4 bg-sky-50 rounded-lg border border-sky-100">
                        <h4 className="font-semibold text-gray-900 mb-2">Risk-Adjusted Returns</h4>
                        <p className="text-sm text-gray-600">16%+ IRR target with strong downside protection</p>
                      </div>
                      <div className="p-4 bg-sky-50 rounded-lg border border-sky-100">
                        <h4 className="font-semibold text-gray-900 mb-2">Portfolio Diversification</h4>
                        <p className="text-sm text-gray-600">Geographic and property-type allocation strategy</p>
                      </div>
                      <div className="p-4 bg-sky-50 rounded-lg border border-sky-100">
                        <h4 className="font-semibold text-gray-900 mb-2">Value Creation</h4>
                        <p className="text-sm text-gray-600">Active management and market timing strategies</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <h3 className="text-2xl font-semibold text-sky-800 mb-6">Investment Strategy</h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-8">
                    Our investment approach combines market expertise with rigorous analysis to deliver superior risk-adjusted returns.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-sky-500 rounded-full mt-2" />
                      <p className="text-gray-600">Strategic property selection in high-growth corridors</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-sky-500 rounded-full mt-2" />
                      <p className="text-gray-600">Focus on areas with strong infrastructure development</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-sky-500 rounded-full mt-2" />
                      <p className="text-gray-600">Active portfolio management for optimal returns</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Technology Platform Section */}
            <div className="mb-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-semibold text-sky-800 mb-6">Technology-Enabled Execution</h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-8">
                    Our proprietary platform enhances traditional investment strategies with advanced analytics and automation.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-sky-500 rounded-full mt-2" />
                      <p className="text-gray-600">AI-driven market analysis and opportunity identification</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-sky-500 rounded-full mt-2" />
                      <p className="text-gray-600">Automated underwriting reducing processing time by 90%</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-sky-500 rounded-full mt-2" />
                      <p className="text-gray-600">Real-time portfolio monitoring and risk management</p>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <img src="/portfolio-management.svg" alt="Portfolio Management Platform" className="rounded-xl shadow-lg w-full" />
                </div>
              </div>
            </div>

            {/* Risk Management Section */}
            <div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <img src="/automated-underwriting.svg" alt="Risk Management Process" className="rounded-xl shadow-lg w-full" />
                </div>
                <div className="order-1 lg:order-2">
                  <h3 className="text-2xl font-semibold text-sky-800 mb-6">Risk Management</h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-8">
                    Comprehensive risk management framework ensuring portfolio stability and investor protection.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-sky-500 rounded-full mt-2" />
                      <p className="text-gray-600">Multi-factor risk assessment for each investment</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-sky-500 rounded-full mt-2" />
                      <p className="text-gray-600">Continuous market monitoring and portfolio rebalancing</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-sky-500 rounded-full mt-2" />
                      <p className="text-gray-600">Strong focus on capital preservation and steady returns</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AustralianMarket 