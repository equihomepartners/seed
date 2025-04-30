import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaDollarSign, FaHome, FaChartLine, FaPercent, FaChartBar, FaExclamationTriangle, FaArrowDown, FaArrowUp } from 'react-icons/fa'

const CurrentOptions = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const options = [
    {
      title: "HELOC",
      subtitle: "Home Equity Line of Credit",
      icon: <FaDollarSign className="text-sky-600" />,
      details: [
        "Variable interest rates",
        "Monthly payments required",
        "Additional debt burden",
        "Credit score dependent"
      ]
    },
    {
      title: "Home Equity Loan",
      subtitle: "Traditional Second Mortgage",
      icon: <FaHome className="text-sky-600" />,
      details: [
        "Fixed interest rates",
        "Monthly payments required",
        "Long-term commitment",
        "Strict qualification"
      ]
    },
    {
      title: "Reverse Mortgage",
      subtitle: "Age-Based Equity Release",
      icon: <FaChartLine className="text-sky-600" />,
      details: [
        "Age restrictions (65+)",
        "Complex terms",
        "High costs",
        "Limited flexibility"
      ]
    }
  ]



  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6 text-gray-900">Current Options</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Traditional approaches to accessing home equity
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* US Market */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="fintech-card p-8"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center mr-4">
                <FaHome className="text-2xl text-sky-600" />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-gray-900">US Market</h4>
                <p className="text-gray-600">30-Year Fixed Rate Mortgages</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-sky-50 rounded-xl p-4">
                <div className="flex items-center text-sky-600 mb-2">
                  <FaChartBar className="mr-2" />
                  <span className="font-semibold">Predictable Payments</span>
                </div>
                <p className="text-gray-600">Fixed monthly payments for the entire loan term</p>
              </div>
              <div className="bg-sky-50 rounded-xl p-4">
                <div className="flex items-center text-sky-600 mb-2">
                  <FaPercent className="mr-2" />
                  <span className="font-semibold">Rate Stability</span>
                </div>
                <p className="text-gray-600">Interest rate locked for 30 years</p>
              </div>
            </div>
          </motion.div>

          {/* Australian Market */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="fintech-card p-8"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mr-4">
                <FaExclamationTriangle className="text-2xl text-red-500" />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-gray-900">Australian Market</h4>
                <p className="text-gray-600">Variable Rate Mortgages</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-red-50 rounded-xl p-4">
                <div className="flex items-center text-red-500 mb-2">
                  <FaArrowUp className="mr-2" />
                  <span className="font-semibold">Rising Payments</span>
                </div>
                <p className="text-gray-600">Monthly payments increase with interest rates</p>
              </div>
              <div className="bg-red-50 rounded-xl p-4">
                <div className="flex items-center text-red-500 mb-2">
                  <FaArrowDown className="mr-2" />
                  <span className="font-semibold">Payment Uncertainty</span>
                </div>
                <p className="text-gray-600">Variable rates create financial stress</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="fintech-card p-8 mb-12">
          <h4 className="text-2xl font-bold mb-4 text-center text-gray-900">The Mortgage Wall Challenge</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <h5 className="text-lg font-semibold mb-3 text-gray-900">Rising Rates Impact</h5>
              <p className="text-gray-600">Homeowners face increasing monthly payments as interest rates rise, creating financial strain</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <h5 className="text-lg font-semibold mb-3 text-gray-900">Limited Solutions</h5>
              <p className="text-gray-600">Current second mortgage options add to monthly payment burden instead of providing relief</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <h5 className="text-lg font-semibold mb-3 text-gray-900">Perfect Timing</h5>
              <p className="text-gray-600">When rates eventually drop, homeowners can refinance, providing natural exit opportunities</p>
            </div>
          </div>
        </div>

        <div className="fintech-card p-8 text-center mb-16">
          <h4 className="text-2xl font-bold mb-4 text-gray-900">Unprecedented Market Need</h4>
          <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
            The need for innovative equity release solutions is at an all-time high. Our product addresses homeowners'
            immediate needs without adding to their monthly burden, while benefiting from natural market cycles for exits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {options.map((option, index) => (
            <motion.div
              key={option.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="fintech-card p-8 relative overflow-hidden group hover:scale-105 transition-transform duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-sky-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center mb-6">
                  {option.icon}
                </div>
                <h3 className="text-2xl font-bold mb-2 text-gray-900">{option.title}</h3>
                <p className="text-gray-600 mb-6">{option.subtitle}</p>
                <div className="space-y-3">
                  {option.details.map((detail, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                      <p className="text-gray-600">{detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>


      </div>
    </section>
  )
}

export default CurrentOptions