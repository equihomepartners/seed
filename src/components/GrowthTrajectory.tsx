import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaCheck } from 'react-icons/fa'

const GrowthTrajectory = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const timeline = [
    {
      year: "2024",
      quarter: "Q3-Q4",
      status: "Completed",
      items: [
        {
          title: "Fund Setup",
          description: "Initial fund commitments and documentation"
        },
        {
          title: "Platform Development",
          description: "Alpha investment platform"
        },
        {
          title: "Strategic Partnerships",
          description: "Key industry relationships"
        }
      ]
    },
    {
      year: "2025",
      quarter: "Q1-Q2",
      status: "Current",
      items: [
        {
          title: "Seed Round",
          description: "$2M operational capital raise"
        },
        {
          title: "Team Expansion",
          description: "Key hires in tech and operations"
        },
        {
          title: "Fund Preparation",
          description: "Final agreements and launch prep"
        }
      ]
    },
    {
      year: "2025",
      quarter: "Q3",
      items: [
        {
          title: "Official Launch",
          description: "First $100M drawdown"
        },
        {
          title: "Revenue Generation",
          description: "Management fee initiation"
        },
        {
          title: "Loan Deployment",
          description: "Initial property investments"
        }
      ]
    },
    {
      year: "2026",
      items: [
        {
          title: "Fund Scaling",
          description: "Multiple fund structures"
        },
        {
          title: "Portfolio Growth",
          description: "Expanded LP partnerships"
        },
        {
          title: "Track Record",
          description: "First loan exits and returns"
        }
      ]
    }
  ]

  return (
    <section ref={ref} id="growth-trajectory" className="min-h-screen py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-8">
            <div className="flex items-center space-x-2 px-4 py-2 bg-sky-50 rounded-full border border-sky-100">
              <div className="w-2 h-2 rounded-full bg-sky-500" />
              <span className="text-sm font-medium text-sky-600">Growth Plan</span>
            </div>
          </div>
          <h2 className="text-5xl font-bold mb-6 text-gray-900">Growth Trajectory</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Clear path to becoming Australia's leading residential fund manager
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 transform -translate-x-1/2" />

          {/* Timeline Items */}
          {timeline.map((phase, index) => (
            <div key={phase.year} className="relative flex items-center mb-16 md:mb-24">
              {/* Line Connector (Mobile) */}
              <div className="md:hidden absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />

              {/* Content */}
              <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                <div className={`fintech-card p-8 relative overflow-hidden group hover:scale-105 transition-transform duration-300 ${
                  phase.status === "Projected Exit Year" ? 'ring-2 ring-sky-500/50' : ''
                }`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${
                    phase.status === "Projected Exit Year" 
                      ? 'from-sky-50 to-transparent' 
                      : 'from-sky-50 to-transparent'
                  } opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-8">
                      <div className="space-y-1">
                        <div className="text-2xl font-bold text-gray-900">{phase.year}</div>
                        {phase.quarter && (
                          <div className="text-sky-600 font-medium">{phase.quarter}</div>
                        )}
                        {phase.status && (
                          <div className={`text-sm font-medium ${
                            phase.status === 'Current' ? 'text-sky-600' :
                            phase.status === 'Completed' ? 'text-green-600' :
                            'text-gray-600'
                          }`}>
                            {phase.status}
                          </div>
                        )}
                      </div>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={inView ? { scale: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.8 + index * 0.2 }}
                        className={`w-8 h-8 rounded-full ${
                          phase.status === "Current" ? 'bg-sky-500' :
                          phase.status === "Completed" ? 'bg-green-500' :
                          'bg-gray-200'
                        } flex items-center justify-center`}
                      >
                        {phase.status === "Current" ? (
                          <div className="w-2 h-2 rounded-full bg-white animate-ping" />
                        ) : phase.status === "Completed" ? (
                          <FaCheck className="text-white" />
                        ) : (
                          <FaCheck className="text-gray-400" />
                        )}
                      </motion.div>
                    </div>

                    <div className="space-y-6">
                      {phase.items.map((item, i) => (
                        <motion.div
                          key={item.title}
                          initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                          animate={inView ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.5, delay: 1 + i * 0.1 }}
                          className="flex items-start gap-3"
                        >
                          <div className="w-1.5 h-1.5 bg-sky-500 rounded-full mt-[0.6rem] shrink-0" />
                          <div className="space-y-2">
                            <div className="font-medium text-gray-900 leading-tight">{item.title}</div>
                            <div className="text-gray-600 leading-normal">{item.description}</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default GrowthTrajectory 