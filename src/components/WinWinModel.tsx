import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaHome, FaChartLine, FaUsers, FaMoneyBillWave, FaHandshake, FaRocket } from 'react-icons/fa'

const WinWinModel = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const stakeholders = [
    {
      title: "Homeowners Win",
      color: "sky",
      icon: <FaHome className="text-sky-600" />,
      benefits: [
        "Access equity without payments",
        "Stay in their home",
        "Maintain ownership",
        "Financial flexibility"
      ],
      position: { x: "5%", y: "35%" }
    },
    {
      title: "Fund Investors Win",
      color: "green",
      icon: <FaChartLine className="text-green-600" />,
      benefits: [
        "Exposure to premium market",
        "Asset-backed security",
        "Strong returns (16%+ IRR)",
        "Portfolio diversification"
      ],
      position: { x: "75%", y: "5%" }
    },
    {
      title: "Operational Investors Win",
      color: "indigo",
      icon: <FaRocket className="text-indigo-600" />,
      benefits: [
        "Early-stage equity",
        "12-18x multiple potential",
        "Proven business model",
        "Massive market opportunity"
      ],
      position: { x: "75%", y: "65%" }
    }
  ]

  return (
    <section ref={ref} id="win-win-win" className="min-h-screen flex flex-col items-center justify-center py-20 px-4 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <div className="inline-block mb-8">
          <div className="flex items-center space-x-2 px-4 py-2 bg-sky-50 rounded-full border border-sky-100">
            <div className="w-2 h-2 rounded-full bg-sky-500" />
            <span className="text-sm font-medium text-sky-600">Value Creation</span>
          </div>
        </div>
        <h2 className="text-5xl font-bold mb-6 text-gray-900">Win-Win-Win Model</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Creating value for all stakeholders through aligned interests
        </p>
      </motion.div>

      <div className="w-full max-w-7xl">
        {/* Interconnected Circles */}
        <div className="relative h-[40rem] mb-16">
          {/* Connection Lines */}
          <svg
            className="absolute inset-0 w-full h-full"
            style={{ zIndex: 0 }}
          >
            <defs>
              <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#22C55E" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22C55E" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#6366F1" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="lineGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6366F1" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <motion.path
              d="M500,375 L900,175"
              stroke="url(#lineGradient1)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
            <motion.path
              d="M900,175 L900,575"
              stroke="url(#lineGradient2)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 1.5, delay: 1 }}
            />
            <motion.path
              d="M900,575 L500,375"
              stroke="url(#lineGradient3)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 1.5, delay: 1.5 }}
            />
          </svg>

          {/* Stakeholder Cards */}
          {stakeholders.map((stakeholder, index) => (
            <motion.div
              key={stakeholder.title}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="absolute w-96 group"
              style={{
                left: stakeholder.position.x,
                top: stakeholder.position.y,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div className="fintech-card p-8 relative overflow-hidden">
                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div className={`w-12 h-12 rounded-full bg-${stakeholder.color}-100 flex items-center justify-center mr-4`}>
                      {stakeholder.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{stakeholder.title}</h3>
                  </div>

                  <div className="space-y-4">
                    {stakeholder.benefits.map((benefit, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
                        className="flex items-center text-gray-600"
                      >
                        <div className={`w-1.5 h-1.5 bg-${stakeholder.color}-600 rounded-full mr-3`} />
                        {benefit}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <div className="flex items-center justify-center space-x-4">
            <FaHandshake className="text-2xl text-sky-600" />
            <div className="text-xl font-medium text-gray-900">Aligned Interests Drive Sustainable Growth</div>
            <FaMoneyBillWave className="text-2xl text-green-600" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default WinWinModel 