import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaCalendar, FaEnvelope, FaPhone, FaArrowRight } from 'react-icons/fa'

const CallToAction = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const contactInfo = {
    email: "invest@equihome.com.au",
    phone: "+61 2 1234 5678",
    calendar: "Schedule a meeting"
  }

  const nextSteps = [
    {
      title: "Initial Discussion",
      description: "Learn more about the opportunity"
    },
    {
      title: "Due Diligence",
      description: "Access detailed financials and projections"
    },
    {
      title: "Investment Terms",
      description: "Review and finalize investment structure"
    }
  ]

  return (
    <section ref={ref} id="cta" className="min-h-screen flex flex-col items-center justify-center py-20 px-4 bg-[#0B1121]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl font-bold mb-6">Join Our Journey</h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Be part of transforming Australia's home equity market
        </p>
      </motion.div>

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-[#111827] rounded-2xl p-8 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent" />
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-8">Get in Touch</h3>
            
            <div className="space-y-6">
              <a
                href={`mailto:${contactInfo.email}`}
                className="flex items-center gap-4 p-4 bg-black/20 rounded-xl hover:bg-black/30 transition-colors duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">
                  <FaEnvelope className="text-xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email Us</p>
                  <p className="text-lg font-medium">{contactInfo.email}</p>
                </div>
              </a>

              <a
                href={`tel:${contactInfo.phone}`}
                className="flex items-center gap-4 p-4 bg-black/20 rounded-xl hover:bg-black/30 transition-colors duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">
                  <FaPhone className="text-xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Call Us</p>
                  <p className="text-lg font-medium">{contactInfo.phone}</p>
                </div>
              </a>

              <a
                href="#"
                className="flex items-center gap-4 p-4 bg-black/20 rounded-xl hover:bg-black/30 transition-colors duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">
                  <FaCalendar className="text-xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Book a Meeting</p>
                  <p className="text-lg font-medium">{contactInfo.calendar}</p>
                </div>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-[#111827] rounded-2xl p-8 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent" />
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-8">Next Steps</h3>
            
            <div className="space-y-6">
              {nextSteps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-4 p-4 bg-black/20 rounded-xl group hover:bg-black/30 transition-colors duration-300"
                >
                  <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                    <span className="text-xl font-bold">{index + 1}</span>
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-lg font-medium">{step.title}</h4>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                  <FaArrowRight className="text-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-center mt-16"
      >
        <p className="text-gray-400 mb-8">
          Ready to explore the opportunity? Let's connect and discuss how you can be part of our growth story.
        </p>
        <button
          onClick={() => window.location.href = `mailto:${contactInfo.email}`}
          className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-lg font-semibold transition-colors duration-300"
        >
          Contact Us Now
        </button>
      </motion.div>
    </section>
  )
}

export default CallToAction 