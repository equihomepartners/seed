import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaHome, FaDollarSign, FaChartLine, FaUsers, FaCalendarAlt, FaCheckCircle, FaTimesCircle } from 'react-icons/fa'

const MarketPosition = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const comparisonMatrix = [
    {
      title: "Traditional Mortgage",
      icon: <FaDollarSign className="text-gray-400" />,
      features: [
        { label: "Monthly Payments", value: "Required", negative: true },
        { label: "Interest Rate", value: "7-8%", negative: true },
        { label: "Additional Debt", value: "Yes", negative: true },
        { label: "Credit Dependent", value: "Yes", negative: true }
      ]
    },
    {
      title: "Reverse Mortgage",
      icon: <FaHome className="text-gray-400" />,
      features: [
        { label: "Age Restriction", value: "65+", negative: true },
        { label: "Terms", value: "Complex", negative: true },
        { label: "Costs", value: "High", negative: true },
        { label: "Flexibility", value: "Limited", negative: true }
      ]
    },
    {
      title: "Equihome",
      icon: <FaChartLine className="text-blue-500" />,
      features: [
        { label: "Monthly Payments", value: "None", negative: false },
        { label: "Age Requirement", value: "Any", negative: false },
        { label: "Terms", value: "Flexible", negative: false },
        { label: "Appreciation Share", value: "Fair", negative: false }
      ],
      highlighted: true
    }
  ]

  return (
    <section ref={ref} id="current-options" className="min-h-screen flex flex-col items-center justify-center py-20 px-4 bg-[#0B1121]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl font-bold mb-6">Current Problems</h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Traditional equity access options create significant challenges for homeowners
        </p>
      </motion.div>

      {/* Comparison Matrix */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {comparisonMatrix.map((option, index) => (
          <motion.div
            key={option.title}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className={`bg-gray-900 bg-opacity-50 rounded-2xl p-8 relative overflow-hidden group ${
              option.highlighted ? 'ring-2 ring-blue-500' : ''
            }`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${
              option.highlighted ? 'from-blue-500/10' : 'from-gray-800/30'
            } to-transparent group-hover:scale-110 transition-transform duration-500`} />
            <div className="relative z-10">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-2xl mr-4">
                  {option.icon}
                </div>
                <h3 className="text-2xl font-bold">{option.title}</h3>
              </div>
              <div className="space-y-4">
                {option.features.map((feature) => (
                  <div key={feature.label} className="flex items-center justify-between">
                    <span className="text-gray-300">{feature.label}</span>
                    <div className="flex items-center">
                      <span className={feature.negative ? 'text-red-400' : 'text-green-400'}>
                        {feature.value}
                      </span>
                      {feature.negative ? (
                        <FaTimesCircle className="text-red-400 ml-2" />
                      ) : (
                        <FaCheckCircle className="text-green-400 ml-2" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Win-Win Model */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="w-full max-w-4xl bg-gray-900 bg-opacity-50 rounded-2xl p-8"
      >
        <h3 className="text-3xl font-bold text-center mb-8">Win-Win Model</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="w-16 h-16 rounded-full bg-blue-500 bg-opacity-20 flex items-center justify-center text-3xl mx-auto mb-4">
              <FaHome className="text-blue-500" />
            </div>
            <h4 className="text-xl font-bold mb-2">Property Appreciation</h4>
            <p className="text-gray-300">Benefit from market growth</p>
          </div>
          <div>
            <div className="w-16 h-16 rounded-full bg-blue-500 bg-opacity-20 flex items-center justify-center text-3xl mx-auto mb-4">
              <FaChartLine className="text-blue-500" />
            </div>
            <h4 className="text-xl font-bold mb-2">Shared Returns</h4>
            <p className="text-gray-300">Fair value distribution</p>
          </div>
          <div>
            <div className="w-16 h-16 rounded-full bg-blue-500 bg-opacity-20 flex items-center justify-center text-3xl mx-auto mb-4">
              <FaUsers className="text-blue-500" />
            </div>
            <h4 className="text-xl font-bold mb-2">Aligned Interests</h4>
            <p className="text-gray-300">Success for all parties</p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default MarketPosition 