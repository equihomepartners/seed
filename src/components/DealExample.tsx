import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

const DealExample = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [growthRate, setGrowthRate] = useState(8) // Default to 8% growth
  
  // Calculate returns based on growth rate
  const calculateReturns = () => {
    // Initial values
    const propertyValue = 1850000 // $1.85M property in growth corridor
    const investment = 500000    // $500K investment
    const equityShare = 0.35     // 35% equity share
    const years = 3             // 3 year term
    const annualInterestRate = 0.05 // 5% simple interest

    // Calculate simple interest
    const simpleInterest = investment * annualInterestRate * years

    // Calculate property appreciation
    const futurePropertyValue = propertyValue * Math.pow(1 + growthRate / 100, years)
    const totalAppreciation = futurePropertyValue - propertyValue
    const appreciationShare = totalAppreciation * equityShare

    // Calculate total return
    const totalReturn = simpleInterest + appreciationShare

    // Calculate IRR
    const irr = (Math.pow((investment + totalReturn) / investment, 1/years) - 1) * 100

    // Calculate multiple metrics
    const multipleOnInvestment = (investment + totalReturn) / investment
    const annualizedReturn = totalReturn / (investment * years) * 100

    return {
      interest: simpleInterest,
      appreciation: appreciationShare,
      total: totalReturn,
      irr: irr,
      multiple: multipleOnInvestment,
      annualizedReturn: annualizedReturn,
      futurePropertyValue: futurePropertyValue
    }
  }

  const returns = calculateReturns()
  
  const pieData = [
    { name: 'Simple Interest', value: returns.interest },
    { name: 'Appreciation Share', value: returns.appreciation }
  ]

  const COLORS = ['#3B82F6', '#60A5FA']

  return (
    <section ref={ref} className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16"
        >
          {/* Left Side - Property Details */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Case Study: Growth Corridor Property</h2>
            <div className="bg-white bg-opacity-5 rounded-lg p-8 mb-8">
              {/* Property Image Section */}
              <div className="relative mb-6">
                <div className="aspect-video rounded-lg overflow-hidden">
                  <img
                    src="/property-example.jpg"
                    alt="Modern family home in growth corridor"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Property Location Badge */}
                <div className="absolute top-4 left-4 bg-blue-500 bg-opacity-90 px-3 py-1 rounded-full text-sm font-medium">
                  Box Hill Growth Precinct
                </div>
                {/* Property Features */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-between text-sm">
                  <div className="bg-black bg-opacity-75 px-3 py-1 rounded-full">
                    4 Beds
                  </div>
                  <div className="bg-black bg-opacity-75 px-3 py-1 rounded-full">
                    3 Baths
                  </div>
                  <div className="bg-black bg-opacity-75 px-3 py-1 rounded-full">
                    2 Cars
                  </div>
                  <div className="bg-black bg-opacity-75 px-3 py-1 rounded-full">
                    580m²
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-4">Investment Highlights</h3>
              
              {/* Key Investment Details */}
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg">
                    <div className="text-gray-400 text-sm">Property Value</div>
                    <div className="text-xl font-bold">$1,850,000</div>
                  </div>
                  <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg">
                    <div className="text-gray-400 text-sm">Investment</div>
                    <div className="text-xl font-bold">$500,000</div>
                  </div>
                  <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg">
                    <div className="text-gray-400 text-sm">Equity Share</div>
                    <div className="text-xl font-bold">35%</div>
                  </div>
                  <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg">
                    <div className="text-gray-400 text-sm">Term</div>
                    <div className="text-xl font-bold">3 Years</div>
                  </div>
                </div>

                {/* Investment Structure */}
                <div>
                  <h4 className="text-lg font-semibold mb-3">Investment Structure</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      <span>5% Simple Interest (No Monthly Payments)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      <span>35% Share in Property Appreciation</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      <span>Exit Through Refinance or Sale</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Return Calculator */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Return Simulator</h2>
            <div className="bg-white bg-opacity-5 rounded-lg p-8">
              {/* Growth Rate Slider */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium">
                    Property Growth Rate (% p.a.)
                  </label>
                  <div className="text-2xl font-bold text-blue-500">
                    {growthRate}%
                  </div>
                </div>
                <input
                  type="range"
                  min="4"
                  max="12"
                  step="0.5"
                  value={growthRate}
                  onChange={(e) => setGrowthRate(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>Conservative (4%)</span>
                  <span>Historical Average (8%)</span>
                  <span>High Growth (12%)</span>
                </div>
              </div>

              {/* Return Metrics */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg">
                  <div className="text-gray-400 text-sm mb-1">Total Return</div>
                  <div className="text-2xl font-bold text-blue-500">
                    ${Math.round(returns.total).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-400">
                    {returns.multiple.toFixed(2)}x Multiple
                  </div>
                </div>
                <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg">
                  <div className="text-gray-400 text-sm mb-1">Annual IRR</div>
                  <div className="text-2xl font-bold text-blue-500">
                    {returns.irr.toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-400">
                    Annualized Return
                  </div>
                </div>
                <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg">
                  <div className="text-gray-400 text-sm mb-1">Simple Interest</div>
                  <div className="text-xl font-bold">
                    ${Math.round(returns.interest).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-400">
                    5% p.a. No Payments
                  </div>
                </div>
                <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg">
                  <div className="text-gray-400 text-sm mb-1">Appreciation Share</div>
                  <div className="text-xl font-bold">
                    ${Math.round(returns.appreciation).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-400">
                    35% of Growth
                  </div>
                </div>
              </div>

              {/* Return Breakdown Chart */}
              <div className="relative h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <div className="text-sm text-gray-400">Future Property Value</div>
                  <div className="text-xl font-bold">
                    ${Math.round(returns.futurePropertyValue).toLocaleString()}
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

export default DealExample 