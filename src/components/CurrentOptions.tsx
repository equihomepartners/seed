import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaDollarSign, FaHome, FaChartLine, FaClock, FaPercent, FaUserClock } from 'react-icons/fa'

const CurrentOptions = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const options = [
    {
      title: "HELOC",
      subtitle: "Home Equity Line of Credit",
      icon: <FaDollarSign className="text-blue-500" />,
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
      icon: <FaHome className="text-blue-500" />,
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
      icon: <FaChartLine className="text-blue-500" />,
      details: [
        "Age restrictions (65+)",
        "Complex terms",
        "High costs",
        "Limited flexibility"
      ]
    }
  ]

  const similarProducts = [
    {
      title: "Traditional Equity Release",
      icon: <FaClock className="text-gray-400" />,
      details: [
        "30-45 day processing time",
        "Manual paperwork",
        "No technology integration",
        "Higher interest rates (8-12%)"
      ]
    },
    {
      title: "Peer-to-Peer Lending",
      icon: <FaUserClock className="text-gray-400" />,
      details: [
        "Limited market reach",
        "High default risk",
        "Variable terms",
        "Complex approval process"
      ]
    },
    {
      title: "Private Lenders",
      icon: <FaPercent className="text-gray-400" />,
      details: [
        "High interest rates (12-15%)",
        "Short term only",
        "Limited scalability",
        "Inconsistent availability"
      ]
    }
  ]

  return (
    <section ref={ref} id="current-options" className="min-h-screen flex flex-col justify-center py-20 px-4 bg-[#0B1121]">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6">Current Options</h2>
          <p className="text-xl text-gray-400">Traditional approaches to accessing home equity</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {options.map((option, index) => (
            <motion.div
              key={option.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-[#111827] rounded-2xl p-8 relative overflow-hidden group hover:scale-105 transition-transform duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-6">
                  {option.icon}
                </div>
                <h3 className="text-2xl font-bold mb-2">{option.title}</h3>
                <p className="text-gray-400 mb-6">{option.subtitle}</p>
                <div className="space-y-3">
                  {option.details.map((detail, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      <p className="text-gray-300">{detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mb-16"
        >
          <h3 className="text-3xl font-bold mb-4">Similar Products in Market</h3>
          <p className="text-xl text-gray-400 mb-8">
            Despite existing solutions, the market size allows for multiple players
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {similarProducts.map((product, index) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-[#111827] rounded-2xl p-8 relative overflow-hidden group hover:scale-105 transition-transform duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-gray-500/20 flex items-center justify-center mb-6">
                  {product.icon}
                </div>
                <h3 className="text-2xl font-bold mb-6">{product.title}</h3>
                <div className="space-y-3">
                  {product.details.map((detail, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-500" />
                      <p className="text-gray-300">{detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold mb-4">Market Opportunity</h3>
          <p className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto">
            With over $5.5 trillion in home equity across Australia and growing demand for flexible financing solutions, 
            there's significant room for innovative, technology-driven platforms that offer faster processing, 
            better terms, and improved customer experience.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default CurrentOptions 