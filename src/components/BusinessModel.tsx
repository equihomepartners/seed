import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaCogs, FaMoneyBillWave, FaChartLine, FaRocket, FaUsers, FaHandshake, FaBuilding } from 'react-icons/fa'
import { useState } from 'react'

const BusinessModel = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [activeSection, setActiveSection] = useState<string | null>(null)

  const valueDrivers = [
    {
      title: "AUM Growth",
      value: "$2B+ target",
      icon: <FaChartLine />,
      description: "Aggressive but achievable growth trajectory"
    },
    {
      title: "Revenue Scaling",
      value: "125% YoY",
      icon: <FaMoneyBillWave />,
      description: "Strong revenue growth from multiple streams"
    },
    {
      title: "Technology Platform",
      value: "Proprietary",
      icon: <FaCogs />,
      description: "Scalable investment management system"
    },
    {
      title: "Market Position",
      value: "Category Leader",
      icon: <FaRocket />,
      description: "Less than 1% of $7T market opportunity"
    },
    {
      title: "Brand",
      value: "Industry Leaders",
      icon: <FaUsers />,
      description: "Strong credibility in property and finance"
    }
  ]

  return (
    <section ref={ref} id="business-model" className="min-h-screen py-20 px-4 bg-white">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <div className="inline-block mb-8">
          <div className="flex items-center space-x-2 px-4 py-2 bg-sky-50 rounded-full border border-sky-100">
            <div className="w-2 h-2 rounded-full bg-sky-500" />
            <span className="text-sm font-medium text-sky-600">Business Model</span>
          </div>
        </div>
        <h2 className="text-5xl font-bold mb-6 text-gray-900">Business, Fund, and Operations Model</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Fund capital is deployed directly to homeowners, while our operational company has a separate share pool currently open for investment
        </p>
      </motion.div>

      {/* Investment Structure */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
        {/* Operations Company */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="fintech-card p-8 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-sky-50 to-transparent" />
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center">
                <FaRocket className="text-sky-600 text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Operations Company</h3>
            </div>
            <p className="text-sky-600 mb-2">$5M early-stage equity investment opportunity</p>
            {/* Key Metrics */}
            <div className="space-y-6">
              <div className="fintech-card p-6">
                <h4 className="text-lg font-bold text-gray-900 mb-4">Revenue Streams</h4>
                <ul className="space-y-3">
                  <li className="flex items-center justify-between">
                    <span className="text-gray-600">Origination Fees</span>
                    <span className="text-sky-600 font-bold">2-3%</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-gray-600">Management Fees</span>
                    <span className="text-sky-600 font-bold">1.5-2%</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-gray-600">Performance Fees</span>
                    <span className="text-sky-600 font-bold">15-20%</span>
                  </li>
                </ul>
              </div>

              <div className="fintech-card p-6">
                <h4 className="text-lg font-bold text-gray-900 mb-4">Investment Returns</h4>
                <ul className="space-y-3">
                  <li className="flex items-center justify-between">
                    <span className="text-gray-600">Return on Investment</span>
                    <span className="text-sky-600 font-bold">8-26x+ ROI</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-gray-600">Investment Period</span>
                    <span className="text-sky-600 font-bold">5-7 years</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-gray-600">Target Exit Value</span>
                    <span className="text-sky-600 font-bold">$600M</span>
                  </li>
                </ul>
              </div>

              <div className="bg-sky-50 rounded-xl p-6 border border-sky-200">
                <h4 className="text-lg font-bold text-gray-900 mb-2">Current Raise</h4>
                <div className="text-2xl font-bold text-sky-600">$5M Operational Capital</div>
                <p className="text-gray-600 mt-2">Funding platform development and team expansion</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Fund Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="fintech-card p-8 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-sky-50 to-transparent" />
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center">
                <FaBuilding className="text-sky-600 text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Fund</h3>
            </div>
            <p className="text-sky-600 mb-2">For institutional investors ($10M+ commitment)</p>
            <p className="text-gray-600 mb-6">Capital deployed directly to homeowners, not company equity</p>
            {/* Key Metrics */}
            <div className="space-y-6">
              <div className="fintech-card p-6">
                <h4 className="text-lg font-bold text-gray-900 mb-4">Investment Terms</h4>
                <ul className="space-y-3">
                  <li className="flex items-center justify-between">
                    <span className="text-gray-600">Target IRR</span>
                    <span className="text-sky-600 font-bold">16%+</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-gray-600">Investment Period</span>
                    <span className="text-sky-600 font-bold">7-10 years</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-gray-600">Distributions</span>
                    <span className="text-sky-600 font-bold">Quarterly</span>
                  </li>
                </ul>
              </div>

              <div className="fintech-card p-6">
                <h4 className="text-lg font-bold text-gray-900 mb-4">Portfolio Strategy</h4>
                <ul className="space-y-3">
                  <li className="flex items-center justify-between">
                    <span className="text-gray-600">Target AUM</span>
                    <span className="text-sky-600 font-bold">$2B+</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-gray-600">Property Type</span>
                    <span className="text-sky-600 font-bold">Premium</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-gray-600">Geographic Focus</span>
                    <span className="text-sky-600 font-bold">Major Cities</span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <h4 className="text-lg font-bold text-gray-900 mb-2">Committed Capital</h4>
                <div className="text-2xl font-bold text-green-600">$500M Initial Commitment</div>
                <p className="text-gray-600 mt-2">First $100M deployment in Q3 2025</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Value Drivers */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="w-full max-w-6xl mx-auto"
      >
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-3xl font-bold text-center mb-4 text-gray-900"
        >
          Operational Value Drivers
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center text-gray-600 mb-16"
        >
          Key drivers maximizing company value for optimal exit at $600M
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {valueDrivers.map((driver, index) => (
            <motion.div
              key={driver.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="fintech-card p-6 group hover:scale-105 transition-transform duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-sky-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 mb-4">
                  {driver.icon}
                </div>
                <h4 className="text-lg font-bold mb-2 text-gray-900">{driver.title}</h4>
                <p className="text-sky-600 text-lg font-bold mb-2">{driver.value}</p>
                <p className="text-sm text-gray-600">{driver.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default BusinessModel