import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts'

const AustralianMarket = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const growthData = [
    { year: '1994', Sydney: 4.2, SanFrancisco: 3.1, Miami: 2.9, LosAngeles: 3.0, London: 2.1, NewYork: 2.8, Tokyo: 1.9, GlobalAverage: 2.8 },
    { year: '1995', Sydney: 4.5, SanFrancisco: 3.3, Miami: 3.1, LosAngeles: 3.2, London: 2.3, NewYork: 3.0, Tokyo: 1.8, GlobalAverage: 2.9 },
    { year: '1996', Sydney: 4.8, SanFrancisco: 3.5, Miami: 3.3, LosAngeles: 3.4, London: 2.4, NewYork: 3.2, Tokyo: 1.7, GlobalAverage: 3.0 },
    { year: '1997', Sydney: 5.1, SanFrancisco: 3.8, Miami: 3.5, LosAngeles: 3.6, London: 2.6, NewYork: 3.4, Tokyo: 1.9, GlobalAverage: 3.1 },
    { year: '1998', Sydney: 5.4, SanFrancisco: 4.2, Miami: 3.7, LosAngeles: 3.8, London: 2.7, NewYork: 3.5, Tokyo: 1.8, GlobalAverage: 3.2 },
    { year: '1999', Sydney: 5.8, SanFrancisco: 4.6, Miami: 3.9, LosAngeles: 4.0, London: 2.8, NewYork: 3.7, Tokyo: 1.7, GlobalAverage: 3.3 },
    { year: '2000', Sydney: 6.2, SanFrancisco: 5.0, Miami: 4.1, LosAngeles: 4.2, London: 2.9, NewYork: 3.9, Tokyo: 1.8, GlobalAverage: 3.4 },
    { year: '2001', Sydney: 6.5, SanFrancisco: 4.8, Miami: 4.3, LosAngeles: 4.4, London: 3.0, NewYork: 3.8, Tokyo: 1.9, GlobalAverage: 3.3 },
    { year: '2002', Sydney: 6.8, SanFrancisco: 4.6, Miami: 4.5, LosAngeles: 4.6, London: 3.1, NewYork: 4.0, Tokyo: 1.8, GlobalAverage: 3.4 },
    { year: '2003', Sydney: 7.1, SanFrancisco: 4.8, Miami: 4.7, LosAngeles: 4.8, London: 3.2, NewYork: 4.2, Tokyo: 1.9, GlobalAverage: 3.5 },
    { year: '2004', Sydney: 7.4, SanFrancisco: 5.0, Miami: 4.9, LosAngeles: 5.0, London: 3.3, NewYork: 4.4, Tokyo: 2.0, GlobalAverage: 3.6 },
    { year: '2005', Sydney: 7.6, SanFrancisco: 5.2, Miami: 5.1, LosAngeles: 5.2, London: 3.2, NewYork: 4.6, Tokyo: 2.1, GlobalAverage: 3.7 },
    { year: '2006', Sydney: 7.8, SanFrancisco: 5.4, Miami: 5.3, LosAngeles: 5.4, London: 3.3, NewYork: 4.5, Tokyo: 2.2, GlobalAverage: 3.8 },
    { year: '2007', Sydney: 8.0, SanFrancisco: 5.6, Miami: 5.5, LosAngeles: 5.6, London: 3.4, NewYork: 4.3, Tokyo: 2.3, GlobalAverage: 3.7 },
    { year: '2008', Sydney: 7.8, SanFrancisco: 4.8, Miami: 4.2, LosAngeles: 4.4, London: 3.0, NewYork: 3.8, Tokyo: 2.2, GlobalAverage: 3.4 },
    { year: '2009', Sydney: 7.6, SanFrancisco: 4.2, Miami: 3.8, LosAngeles: 4.0, London: 2.8, NewYork: 3.5, Tokyo: 2.1, GlobalAverage: 3.2 },
    { year: '2010', Sydney: 7.8, SanFrancisco: 4.4, Miami: 4.0, LosAngeles: 4.2, London: 2.9, NewYork: 3.7, Tokyo: 2.2, GlobalAverage: 3.3 },
    { year: '2011', Sydney: 8.0, SanFrancisco: 4.6, Miami: 4.2, LosAngeles: 4.4, London: 3.0, NewYork: 3.9, Tokyo: 2.3, GlobalAverage: 3.4 },
    { year: '2012', Sydney: 8.2, SanFrancisco: 4.8, Miami: 4.4, LosAngeles: 4.6, London: 3.1, NewYork: 4.1, Tokyo: 2.4, GlobalAverage: 3.5 },
    { year: '2013', Sydney: 8.4, SanFrancisco: 5.0, Miami: 4.6, LosAngeles: 4.8, London: 3.2, NewYork: 4.3, Tokyo: 2.3, GlobalAverage: 3.6 },
    { year: '2014', Sydney: 8.6, SanFrancisco: 5.2, Miami: 4.8, LosAngeles: 5.0, London: 3.3, NewYork: 4.5, Tokyo: 2.4, GlobalAverage: 3.7 },
    { year: '2015', Sydney: 8.8, SanFrancisco: 5.4, Miami: 5.0, LosAngeles: 5.2, London: 3.2, NewYork: 4.4, Tokyo: 2.5, GlobalAverage: 3.6 },
    { year: '2016', Sydney: 8.6, SanFrancisco: 5.2, Miami: 4.8, LosAngeles: 5.0, London: 3.1, NewYork: 4.2, Tokyo: 2.4, GlobalAverage: 3.5 },
    { year: '2017', Sydney: 8.4, SanFrancisco: 5.0, Miami: 4.6, LosAngeles: 4.8, London: 3.0, NewYork: 4.0, Tokyo: 2.5, GlobalAverage: 3.4 },
    { year: '2018', Sydney: 8.2, SanFrancisco: 4.8, Miami: 4.4, LosAngeles: 4.6, London: 2.8, NewYork: 3.8, Tokyo: 2.5, GlobalAverage: 3.4 },
    { year: '2019', Sydney: 8.0, SanFrancisco: 4.6, Miami: 4.2, LosAngeles: 4.4, London: 2.9, NewYork: 4.1, Tokyo: 2.7, GlobalAverage: 3.3 },
    { year: '2020', Sydney: 7.8, SanFrancisco: 4.4, Miami: 4.0, LosAngeles: 4.2, London: 2.7, NewYork: 3.9, Tokyo: 2.4, GlobalAverage: 3.5 },
    { year: '2021', Sydney: 8.4, SanFrancisco: 4.8, Miami: 4.4, LosAngeles: 4.6, London: 3.0, NewYork: 4.3, Tokyo: 2.8, GlobalAverage: 3.7 },
    { year: '2022', Sydney: 8.6, SanFrancisco: 5.0, Miami: 4.6, LosAngeles: 4.8, London: 2.9, NewYork: 4.4, Tokyo: 2.9, GlobalAverage: 3.6 },
    { year: '2023', Sydney: 8.2, SanFrancisco: 4.8, Miami: 4.4, LosAngeles: 4.6, London: 2.8, NewYork: 4.2, Tokyo: 2.8, GlobalAverage: 3.4 }
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
    <section id="australian-market" ref={ref} className="bg-[#0B1121] py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-white mb-6">
            Australian Market Strength
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Leading global property growth with strong market fundamentals
          </p>
        </motion.div>

        {/* Key Market Advantages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8">
            <div className="text-4xl font-bold text-blue-400 mb-4">92%</div>
            <h3 className="text-xl font-semibold text-white mb-3">Home Ownership Dream</h3>
            <p className="text-gray-300">
              Of Australians aspire to own their home, creating sustained market demand and cultural stability
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8">
            <div className="text-4xl font-bold text-blue-400 mb-4">8.2%</div>
            <h3 className="text-xl font-semibold text-white mb-3">Annual Growth Rate</h3>
            <p className="text-gray-300">
              Sydney's residential property market outperforms major global cities consistently
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8">
            <div className="text-4xl font-bold text-blue-400 mb-4">AAA</div>
            <h3 className="text-xl font-semibold text-white mb-3">Stable Economy</h3>
            <p className="text-gray-300">
              One of only 9 countries with AAA credit rating from all major agencies
            </p>
          </div>
        </motion.div>

        {/* Historical Growth Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 mb-16"
        >
          <h3 className="text-2xl font-bold text-white mb-8">
            Historical Property Growth Rates
          </h3>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="year" 
                  stroke="#9CA3AF"
                  tick={{ fill: '#9CA3AF' }}
                />
                <YAxis 
                  stroke="#9CA3AF"
                  tick={{ fill: '#9CA3AF' }}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '0.5rem',
                    color: '#fff'
                  }}
                  formatter={(value) => [`${value}%`]}
                />
                <Legend 
                  verticalAlign="top" 
                  height={36}
                  wrapperStyle={{
                    paddingBottom: '20px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="Sydney" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={true}
                  activeDot={{ r: 8 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="SanFrancisco" 
                  stroke="#EF4444" 
                  strokeWidth={2}
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="Miami" 
                  stroke="#EC4899" 
                  strokeWidth={2}
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="LosAngeles" 
                  stroke="#F59E0B" 
                  strokeWidth={2}
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="London" 
                  stroke="#22C55E" 
                  strokeWidth={2}
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="NewYork" 
                  stroke="#A855F7" 
                  strokeWidth={2}
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="Tokyo" 
                  stroke="#64748B" 
                  strokeWidth={2}
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="GlobalAverage" 
                  stroke="#9CA3AF" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Market Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 mb-16"
        >
          <h3 className="text-2xl font-bold text-white mb-8">
            Market Focus: Sydney vs US Markets
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xl font-semibold text-white">Sydney Market</h4>
                  <p className="text-gray-300">Concentrated expertise in one major market</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-400">$580K</div>
                  <div className="text-sm text-gray-400">Avg. Home Equity</div>
                </div>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-blue-400" />
                  </div>
                  <p className="text-gray-300">Single regulatory framework</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-blue-400" />
                  </div>
                  <p className="text-gray-300">Deep local market knowledge</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-blue-400" />
                  </div>
                  <p className="text-gray-300">Streamlined operations</p>
                </li>
              </ul>
            </div>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xl font-semibold text-white">US Markets</h4>
                  <p className="text-gray-300">Complex multi-market operations</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-400">$320K</div>
                  <div className="text-sm text-gray-400">Avg. Home Equity</div>
                </div>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                  </div>
                  <p className="text-gray-300">50+ different state regulations</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                  </div>
                  <p className="text-gray-300">Complex market dynamics</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                  </div>
                  <p className="text-gray-300">Higher operational costs</p>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Recession Proof */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-3xl p-8 mb-16"
        >
          <h3 className="text-2xl font-bold text-white mb-8">
            Recession-Proof Market & Business Model
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-semibold text-white mb-6">Market Resilience</h4>
              <ul className="space-y-4">
                {recessionData.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-green-400" />
                    </div>
                    <div>
                      <span className="text-white font-semibold">{item.year}: {item.event}</span>
                      <p className="text-gray-300">{item.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-white mb-6">Recession-Proof Model</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-blue-400" />
                  </div>
                  <div>
                    <span className="text-white font-semibold">Counter-Cyclical Demand:</span>
                    <p className="text-gray-300">Higher demand for equity release during economic downturns</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-blue-400" />
                  </div>
                  <div>
                    <span className="text-white font-semibold">Asset-Backed Security:</span>
                    <p className="text-gray-300">Real estate provides intrinsic value protection</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-blue-400" />
                  </div>
                  <div>
                    <span className="text-white font-semibold">Long-Term Contracts:</span>
                    <p className="text-gray-300">Stable revenue streams independent of market cycles</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* US Investment Advantages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Why Australian Real Estate Card */}
          <div className="bg-[#0F172A] border border-blue-500/10 rounded-2xl overflow-hidden">
            <div className="border-b border-blue-500/10 p-6">
              <h3 className="text-2xl font-bold text-white">
                Why Australian Real Estate for US Investors?
              </h3>
            </div>
            
            <div className="p-6 space-y-6">
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                  <div>
                    <span className="block text-white font-medium mb-1">Market Maturity & Scale</span>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Sydney's property market value exceeds $2.9T, comparable to major US cities with concentrated growth potential
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                  <div>
                    <span className="block text-white font-medium mb-1">Regulatory Excellence</span>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      World's strongest banking system (ranked #1) with transparent property laws modeled after US system
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                  <div>
                    <span className="block text-white font-medium mb-1">Strategic Diversification</span>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Different economic cycles and time zones enable 24/7 portfolio balancing
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                  <div>
                    <span className="block text-white font-medium mb-1">Growth Catalysts</span>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Net migration of 400K+ annually, major infrastructure projects, and limited land release driving sustained demand
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                  <div>
                    <span className="block text-white font-medium mb-1">Economic Stability</span>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      AAA-rated economy with 32+ years of growth and strongest property rights protection globally
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Market Stability Card */}
          <div className="bg-[#0F172A] border border-blue-500/10 rounded-2xl overflow-hidden">
            <div className="border-b border-blue-500/10 p-6">
              <h3 className="text-2xl font-bold text-white">
                Market Stability Factors
              </h3>
            </div>
            
            <div className="p-6">
              <ul className="space-y-6">
                <li>
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    </div>
                    <span className="text-white font-semibold">Supply Constraints</span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed ml-12">
                    Only 6% of land is developable, creating natural value appreciation
                  </p>
                </li>
                <li>
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    </div>
                    <span className="text-white font-semibold">Market Transparency</span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed ml-12">
                    Ranked #3 globally for real estate transparency, ahead of US (#6) and UK (#8)
                  </p>
                </li>
                <li>
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    </div>
                    <span className="text-white font-semibold">Tech Hub Growth</span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed ml-12">
                    Sydney ranked #1 in Asia-Pacific for tech industry growth, driving premium housing demand
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AustralianMarket 