import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaCogs, FaRocket, FaChartLine, FaUsers, FaHandshake, FaBuilding, FaCheck } from 'react-icons/fa'

const GrowthTrajectory = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const timeline = [
    {
      year: "2024",
      status: "Completed",
      icon: <FaCheck className="text-green-500" />,
      items: [
        {
          title: "$500M fund commitment secured",
          description: "Institutional backing"
        },
        {
          title: "Platform development",
          description: "Core technology build"
        },
        {
          title: "Partnerships established",
          description: "Strategic alignments"
        }
      ]
    },
    {
      year: "2024-2025",
      quarter: "Q4 - Early Q1",
      status: "Current",
      icon: <FaCogs className="text-blue-500" />,
      items: [
        {
          title: "$5M operational raise",
          description: "Growth capital"
        },
        {
          title: "Official fund structuring",
          description: "Legal framework and compliance setup"
        },
        {
          title: "Team expansion",
          description: "Key hires and capabilities"
        }
      ]
    },
    {
      year: "2025",
      quarter: "Q3",
      icon: <FaChartLine className="text-purple-500" />,
      items: [
        {
          title: "Fund launch",
          description: "Initial deployment"
        },
        {
          title: "First $50M deployment",
          description: "Portfolio acquisition"
        },
        {
          title: "Full operations",
          description: "Market entry"
        }
      ]
    },
    {
      year: "2031",
      status: "Projected Exit Year",
      icon: <FaBuilding className="text-amber-500" />,
      items: [
        {
          title: "$2B+ AUM",
          description: "Portfolio growth"
        },
        {
          title: "National expansion",
          description: "Market coverage"
        },
        {
          title: "Market leader",
          description: "Industry dominance"
        }
      ]
    }
  ]

  return (
    <section ref={ref} id="growth-trajectory" className="min-h-screen flex flex-col items-center justify-center py-20 px-4 bg-[#0B1121]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl font-bold mb-6">Growth Journey</h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Strategic expansion and market penetration roadmap
        </p>
      </motion.div>

      <div className="w-full max-w-6xl relative">
        {/* Timeline Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500/20 via-blue-500/20 to-purple-500/20 transform -translate-x-1/2" />

        {/* Timeline Items */}
        <div className="space-y-24">
          {timeline.map((phase, index) => (
            <motion.div
              key={phase.year + (phase.quarter || '')}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`flex ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } gap-8 items-center relative`}
            >
              {/* Content Card */}
              <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                <div className={`bg-[#111827] rounded-2xl p-8 relative overflow-hidden group hover:scale-105 transition-transform duration-300 ${
                  phase.status === "Projected Exit Year" ? 'ring-2 ring-blue-500/50' : ''
                }`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${
                    phase.status === "Projected Exit Year" 
                      ? 'from-blue-500/20 to-transparent' 
                      : 'from-blue-500/10 to-transparent'
                  } opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <div className="text-2xl font-bold">{phase.year}</div>
                        {phase.quarter && (
                          <div className="text-blue-400">{phase.quarter}</div>
                        )}
                        {phase.status && (
                          <div className={`text-${
                            phase.status === 'Current' ? 'blue' :
                            phase.status === 'Completed' ? 'green' :
                            'gray'
                          }-400`}>
                            {phase.status}
                          </div>
                        )}
                      </div>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={inView ? { scale: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.8 + index * 0.2 }}
                        className={`w-8 h-8 rounded-full ${
                          phase.status === "Current" ? 'bg-blue-500' :
                          phase.status === "Completed" ? 'bg-green-500' :
                          'bg-gray-700'
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

                    <div className="space-y-4">
                      {phase.items.map((item, i) => (
                        <motion.div
                          key={item.title}
                          initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                          animate={inView ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.5, delay: 1 + i * 0.1 }}
                          className="flex items-start gap-3"
                        >
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 shrink-0" />
                          <div>
                            <div className="font-medium">{item.title}</div>
                            <div className="text-sm text-gray-400">{item.description}</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:w-1/2" /> {/* Spacer */}
            </motion.div>
          ))}
        </div>

        {/* Progress Indicator */}
        <motion.div
          initial={{ height: '0%' }}
          animate={inView ? { height: '100%' } : {}}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 via-blue-500 to-gray-500/20 transform -translate-x-1/2"
          style={{ transformOrigin: 'top' }}
        />
      </div>
    </section>
  )
}

export default GrowthTrajectory 