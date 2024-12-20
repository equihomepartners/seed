import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaChartLine, FaBuilding, FaHandshake, FaCog, FaLock, FaChartBar } from 'react-icons/fa'

const FundOverview = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const stages = [
    {
      icon: <FaCog className="text-3xl text-blue-500" />,
      title: "Operational Capital",
      status: "Current Stage",
      description: "Establishing fund structure and technology platform",
      items: [
        "Legal framework and compliance",
        "Technology development",
        "Team expansion",
        "Institutional partnerships"
      ]
    },
    {
      icon: <FaLock className="text-3xl text-green-500" />,
      title: "Capital Commitment",
      status: "Q2 2024",
      description: "Securing institutional backing",
      items: [
        "$500M committed capital",
        "Strategic partnerships",
        "Risk management framework",
        "Portfolio strategy finalization"
      ]
    },
    {
      icon: <FaChartBar className="text-3xl text-purple-500" />,
      title: "Fund Launch",
      status: "Q3 2025",
      description: "Initial portfolio deployment",
      items: [
        "$50M first drawdown",
        "25-30 premium properties",
        "Active portfolio management",
        "Performance tracking"
      ]
    }
  ]

  const revenueStreams = [
    {
      icon: <FaChartLine />,
      title: "Management Fee",
      value: "2% p.a.",
      description: "Steady income from AUM"
    },
    {
      icon: <FaBuilding />,
      title: "Transaction Fee",
      value: "3%",
      description: "Property acquisition fees"
    },
    {
      icon: <FaHandshake />,
      title: "Performance Fee",
      value: "20%",
      description: "Above hurdle rate"
    }
  ]

  return (
    <section ref={ref} className="min-h-screen flex flex-col items-center justify-center py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl font-bold mb-6">Operational Excellence</h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Building a scalable platform for institutional-grade home equity investments
        </p>
      </motion.div>

      {/* Roadmap */}
      <div className="w-full max-w-6xl mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stages.map((stage, index) => (
            <motion.div
              key={stage.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-gray-900 bg-opacity-50 rounded-2xl p-8 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800/30 to-transparent group-hover:scale-110 transition-transform duration-500" />
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  {stage.icon}
                  <div className="ml-4">
                    <h3 className="text-xl font-bold">{stage.title}</h3>
                    <span className="text-sm text-blue-400">{stage.status}</span>
                  </div>
                </div>
                <p className="text-gray-300 mb-4">{stage.description}</p>
                <ul className="space-y-2">
                  {stage.items.map((item, i) => (
                    <li key={i} className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3" />
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Revenue Model */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="w-full max-w-6xl"
      >
        <h3 className="text-3xl font-bold mb-8 text-center">Revenue Streams</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {revenueStreams.map((stream, index) => (
            <div key={stream.title} className="bg-gray-900 bg-opacity-50 rounded-2xl p-8 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-500 bg-opacity-20 mb-4">
                {stream.icon}
              </div>
              <h4 className="text-xl font-bold mb-2">{stream.title}</h4>
              <div className="text-3xl font-bold text-blue-500 mb-2">{stream.value}</div>
              <p className="text-gray-300">{stream.description}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default FundOverview 