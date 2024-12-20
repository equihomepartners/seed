import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaClock, FaHome, FaDollarSign, FaFileAlt, FaCalendarAlt, FaChartLine } from 'react-icons/fa'

const Solution = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const comparison = {
    traditional: {
      title: "Traditional Process",
      icon: <FaClock className="text-red-500" />,
      points: [
        {
          icon: <FaDollarSign />,
          text: "Monthly payments required",
          description: "Additional financial burden"
        },
        {
          icon: <FaFileAlt />,
          text: "Additional debt burden",
          description: "Impacts borrowing capacity"
        },
        {
          icon: <FaCalendarAlt />,
          text: "30+ day approval",
          description: "Complex application process"
        },
        {
          icon: <FaFileAlt />,
          text: "Complex documentation",
          description: "Extensive paperwork needed"
        }
      ]
    },
    equihome: {
      title: "Equihome Solution",
      icon: <FaHome className="text-blue-500" />,
      points: [
        {
          icon: <FaDollarSign />,
          text: "No monthly payments",
          description: "Keep your cash flow"
        },
        {
          icon: <FaChartLine />,
          text: "Share in appreciation",
          description: "We share in property growth"
        },
        {
          icon: <FaCalendarAlt />,
          text: "10 year term",
          description: "Exit whenever you want"
        },
        {
          icon: <FaCalendarAlt />,
          text: "Access in < 21 days",
          description: "Fast, streamlined process"
        }
      ]
    }
  }

  return (
    <section ref={ref} id="solution" className="min-h-screen flex flex-col items-center justify-center py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl font-bold mb-6">A Better Way Forward</h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Providing seamless access to home equity without the burden of monthly payments
        </p>
      </motion.div>

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Traditional Process */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gray-900 bg-opacity-50 rounded-2xl p-8 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent" />
          <div className="relative z-10">
            <div className="flex items-center mb-8">
              {comparison.traditional.icon}
              <h3 className="text-2xl font-bold ml-4">{comparison.traditional.title}</h3>
            </div>
            <div className="space-y-6">
              {comparison.traditional.points.map((point, index) => (
                <motion.div
                  key={point.text}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex items-start"
                >
                  <div className="w-10 h-10 rounded-full bg-red-500 bg-opacity-20 flex items-center justify-center shrink-0 mr-4">
                    {point.icon}
                  </div>
                  <div>
                    <div className="font-semibold">{point.text}</div>
                    <div className="text-sm text-gray-400">{point.description}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Equihome Solution */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gray-900 bg-opacity-50 rounded-2xl p-8 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent" />
          <div className="relative z-10">
            <div className="flex items-center mb-8">
              {comparison.equihome.icon}
              <h3 className="text-2xl font-bold ml-4">{comparison.equihome.title}</h3>
            </div>
            <div className="space-y-6">
              {comparison.equihome.points.map((point, index) => (
                <motion.div
                  key={point.text}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex items-start"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-500 bg-opacity-20 flex items-center justify-center shrink-0 mr-4">
                    {point.icon}
                  </div>
                  <div>
                    <div className="font-semibold">{point.text}</div>
                    <div className="text-sm text-gray-400">{point.description}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Solution 