import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const MarketPosition = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const comparisonMatrix = [
    {
      title: "Traditional Equity Release",
      description: "High costs, complex terms",
      disadvantages: [
        "High interest rates",
        "Complex terms and conditions",
        "Limited flexibility",
        "Risk of foreclosure"
      ]
    },
    {
      title: "Equihome Solution",
      description: "Simple, transparent, flexible",
      highlighted: true,
      advantages: [
        "No monthly payments",
        "Simple terms",
        "Flexible exit options",
        "No risk of foreclosure"
      ]
    },
    {
      title: "Reverse Mortgage",
      description: "Expensive, risky option",
      disadvantages: [
        "Compound interest",
        "Age restrictions",
        "Property devaluation risk",
        "Complex eligibility criteria"
      ]
    }
  ]

  return (
    <section ref={ref} id="current-options" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6 text-gray-900">Market Comparison</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            How Equihome compares to traditional equity access options
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {comparisonMatrix.map((option, index) => (
            <motion.div
              key={option.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`fintech-card p-8 relative overflow-hidden ${
                option.highlighted ? 'ring-2 ring-sky-500' : ''
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${
                option.highlighted ? 'from-sky-50' : 'from-gray-50'
              } to-white opacity-50`} />

              <div className="relative z-10">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{option.title}</h3>
                <p className="text-gray-600 mb-6">{option.description}</p>

                <ul className="space-y-3">
                  {option.advantages ? (
                    option.advantages.map((advantage, i) => (
                      <li key={i} className="flex items-center text-gray-600">
                        <span className="w-2 h-2 bg-sky-500 rounded-full mr-2" />
                        {advantage}
                      </li>
                    ))
                  ) : (
                    option.disadvantages?.map((disadvantage, i) => (
                      <li key={i} className="flex items-center text-gray-600">
                        <span className="w-2 h-2 bg-red-400 rounded-full mr-2" />
                        {disadvantage}
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default MarketPosition 