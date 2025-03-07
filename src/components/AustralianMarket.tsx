import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts'

const AustralianMarket = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const data = [
    { year: 1994, Sydney: 3.2, SanFrancisco: 2.1, Miami: 2.8, LosAngeles: 2.4, London: 1.9, NewYork: 2.1, Tokyo: 1.2, GlobalAverage: 2.2 },
    { year: 1995, Sydney: 4.1, SanFrancisco: 2.8, Miami: 3.2, LosAngeles: 2.9, London: 2.4, NewYork: 2.6, Tokyo: 0.9, GlobalAverage: 2.7 },
    { year: 1996, Sydney: 5.8, SanFrancisco: 3.9, Miami: 4.1, LosAngeles: 3.8, London: 3.2, NewYork: 3.4, Tokyo: 0.7, GlobalAverage: 3.6 },
    { year: 1997, Sydney: 7.2, SanFrancisco: 5.6, Miami: 5.3, LosAngeles: 4.9, London: 4.8, NewYork: 4.2, Tokyo: 0.5, GlobalAverage: 4.6 },
    { year: 1998, Sydney: -2.1, SanFrancisco: 7.8, Miami: 6.2, LosAngeles: 5.7, London: 6.2, NewYork: 5.8, Tokyo: -1.2, GlobalAverage: 4.1 },
    { year: 1999, Sydney: 8.4, SanFrancisco: 9.9, Miami: 7.4, LosAngeles: 7.2, London: 8.9, NewYork: 7.9, Tokyo: -1.8, GlobalAverage: 6.8 },
    { year: 2000, Sydney: 12.8, SanFrancisco: 14.2, Miami: 8.9, LosAngeles: 9.8, London: 11.2, NewYork: 9.7, Tokyo: -2.1, GlobalAverage: 9.2 },
    { year: 2001, Sydney: 9.6, SanFrancisco: 8.1, Miami: 10.2, LosAngeles: 11.4, London: 13.5, NewYork: 8.4, Tokyo: -2.4, GlobalAverage: 8.4 },
    { year: 2002, Sydney: 15.2, SanFrancisco: 6.4, Miami: 12.8, LosAngeles: 13.9, London: 15.8, NewYork: 7.2, Tokyo: -2.8, GlobalAverage: 9.8 },
    { year: 2003, Sydney: 18.9, SanFrancisco: 7.2, Miami: 15.4, LosAngeles: 18.2, London: 17.2, NewYork: 8.9, Tokyo: -1.9, GlobalAverage: 12.0 },
    { year: 2004, Sydney: 8.2, SanFrancisco: 12.8, Miami: 24.6, LosAngeles: 23.4, London: 12.4, NewYork: 12.8, Tokyo: -1.2, GlobalAverage: 13.3 },
    { year: 2005, Sydney: 2.3, SanFrancisco: 15.9, Miami: 28.2, LosAngeles: 25.8, London: 8.9, NewYork: 15.6, Tokyo: -0.8, GlobalAverage: 13.7 },
    { year: 2006, Sydney: 4.8, SanFrancisco: 8.2, Miami: 12.4, LosAngeles: 14.2, London: 19.2, NewYork: 12.4, Tokyo: -0.4, GlobalAverage: 10.1 },
    { year: 2007, Sydney: 8.2, SanFrancisco: -2.8, Miami: -4.8, LosAngeles: -8.9, London: 23.8, NewYork: 8.2, Tokyo: -0.2, GlobalAverage: 3.4 },
    { year: 2008, Sydney: -3.2, SanFrancisco: -18.9, Miami: -22.4, LosAngeles: -24.8, London: -12.4, NewYork: -9.2, Tokyo: -0.6, GlobalAverage: -13.1 },
    { year: 2009, Sydney: 4.8, SanFrancisco: -12.4, Miami: -18.2, LosAngeles: -14.2, London: 2.8, NewYork: -8.4, Tokyo: -1.2, GlobalAverage: -6.7 },
    { year: 2010, Sydney: 9.2, SanFrancisco: 2.8, Miami: -5.4, LosAngeles: -2.8, London: 8.9, NewYork: 2.4, Tokyo: -1.8, GlobalAverage: 1.9 },
    { year: 2011, Sydney: 0.8, SanFrancisco: 8.2, Miami: 2.1, LosAngeles: 1.2, London: 12.4, NewYork: 6.8, Tokyo: -2.1, GlobalAverage: 4.2 },
    { year: 2012, Sydney: 3.4, SanFrancisco: 12.8, Miami: 8.9, LosAngeles: 7.2, London: 8.9, NewYork: 8.2, Tokyo: -1.4, GlobalAverage: 6.9 },
    { year: 2013, Sydney: 11.4, SanFrancisco: 12.2, Miami: 10.8, LosAngeles: 18.8, London: 7.2, NewYork: 8.5, Tokyo: 2.8, GlobalAverage: 8.9 },
    { year: 2014, Sydney: 13.9, SanFrancisco: 14.3, Miami: 11.2, LosAngeles: 14.3, London: 16.8, NewYork: 6.1, Tokyo: 2.3, GlobalAverage: 9.8 },
    { year: 2015, Sydney: 12.8, SanFrancisco: 10.7, Miami: 8.9, LosAngeles: 7.8, London: 12.4, NewYork: 5.7, Tokyo: 2.2, GlobalAverage: 7.2 },
    { year: 2016, Sydney: 15.5, SanFrancisco: 5.7, Miami: 11.5, LosAngeles: 6.9, London: -2.1, NewYork: 3.8, Tokyo: 1.9, GlobalAverage: 5.4 },
    { year: 2017, Sydney: 12.1, SanFrancisco: 8.9, Miami: 9.2, LosAngeles: 8.2, London: 3.5, NewYork: 4.2, Tokyo: 2.1, GlobalAverage: 6.3 },
    { year: 2018, Sydney: -8.9, SanFrancisco: -0.1, Miami: 5.3, LosAngeles: 5.8, London: -0.8, NewYork: 3.9, Tokyo: 2.0, GlobalAverage: 3.2 },
    { year: 2019, Sydney: -4.8, SanFrancisco: 1.2, Miami: 3.6, LosAngeles: 1.1, London: 1.2, NewYork: 2.8, Tokyo: 1.5, GlobalAverage: 2.1 },
    { year: 2020, Sydney: 2.7, SanFrancisco: -3.8, Miami: 7.1, LosAngeles: 2.4, London: 4.1, NewYork: -2.9, Tokyo: 0.8, GlobalAverage: 2.2 },
    { year: 2021, Sydney: 25.8, SanFrancisco: 18.2, Miami: 24.2, LosAngeles: 19.2, London: 7.5, NewYork: 15.8, Tokyo: 1.2, GlobalAverage: 14.8 },
    { year: 2022, Sydney: -12.3, SanFrancisco: -10.4, Miami: 8.2, LosAngeles: -5.2, London: -6.3, NewYork: -8.4, Tokyo: -0.9, GlobalAverage: -4.2 },
    { year: 2023, Sydney: 6.9, SanFrancisco: -4.2, Miami: 3.8, LosAngeles: -2.1, London: -3.5, NewYork: -2.8, Tokyo: 0.2, GlobalAverage: 0.5 }
  ];

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
      event: 'COVID-19 Pandemic',
      description: 'Property values experienced significant growth during this period, particularly in premium locations',
      year: '2020'
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
            <div className="text-center">
              <div className="text-4xl font-bold text-sky-600 mb-4">6.9%</div>
              <div className="text-gray-900 font-medium">Historical Growth</div>
              <div className="text-sm text-gray-600">10-year CAGR</div>
            </div>
            <p className="text-gray-600">
              Over the past decade, Australian residential property has delivered <span className="text-sky-600 font-semibold">6.9% p.a.</span> capital growth
            </p>
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

        {/* Global Market Comparison Graph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="fintech-card p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Global Market Growth Comparison</h3>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Sydney's consistent outperformance vs major global markets (10-year historical growth rates)
              </p>
            </div>
            <div className="h-[500px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart 
                  data={data}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis 
                    dataKey="year" 
                    tick={{ fill: '#4B5563' }}
                    axisLine={{ stroke: '#9CA3AF' }}
                    interval={2}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis 
                    tick={{ fill: '#4B5563' }}
                    axisLine={{ stroke: '#9CA3AF' }}
                    tickFormatter={(value) => `${value}%`}
                    domain={[-30, 30]}
                    allowDataOverflow={true}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E5E7EB',
                      borderRadius: '0.5rem',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                    formatter={(value) => [`${value}%`]}
                    labelStyle={{ color: '#111827', fontWeight: 600 }}
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={60}
                    wrapperStyle={{
                      paddingTop: '20px',
                      borderTop: '1px solid #E5E7EB'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="Sydney" 
                    stroke="#0EA5E9" 
                    strokeWidth={3}
                    dot={{ fill: '#0EA5E9', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 8 }}
                    name="Sydney"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="SanFrancisco" 
                    stroke="#6366F1" 
                    strokeWidth={2}
                    dot={{ fill: '#6366F1', strokeWidth: 2, r: 3 }}
                    name="San Francisco" 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="Miami" 
                    stroke="#EC4899" 
                    strokeWidth={2}
                    dot={{ fill: '#EC4899', strokeWidth: 2, r: 3 }}
                    name="Miami" 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="LosAngeles" 
                    stroke="#8B5CF6" 
                    strokeWidth={2}
                    dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 3 }}
                    name="Los Angeles" 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="London" 
                    stroke="#10B981" 
                    strokeWidth={2}
                    dot={{ fill: '#10B981', strokeWidth: 2, r: 3 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="NewYork" 
                    stroke="#F59E0B" 
                    strokeWidth={2}
                    dot={{ fill: '#F59E0B', strokeWidth: 2, r: 3 }}
                    name="New York" 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="Tokyo" 
                    stroke="#6B7280" 
                    strokeWidth={2}
                    dot={{ fill: '#6B7280', strokeWidth: 2, r: 3 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="GlobalAverage" 
                    stroke="#EF4444" 
                    strokeWidth={2}
                    dot={{ fill: '#EF4444', strokeWidth: 2, r: 3 }}
                    name="Global Average"
                    strokeDasharray="5 5"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

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
                    <span className="text-sky-600 font-semibold">6.9% p.a.</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-sky-500 h-2 rounded-full" style={{ width: '86%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Target Premium Markets</span>
                    <span className="text-sky-600 font-semibold">8.0% p.a.</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-sky-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
                <div className="pt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Premium Market Advantage</span>
                    <span className="text-emerald-600 font-semibold">+1.1%</span>
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
                <p className="text-gray-600">Net migration of 1M+ annually, major infrastructure projects, and limited land release driving sustained demand</p>
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
                      <p className="text-gray-600">Focus on areas with strong supply-demand fundamentals and limited new supply</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-sky-500 rounded-full mt-2" />
                      <p className="text-gray-600">Target areas with 8% p.a. growth based on aggregate market data</p>
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