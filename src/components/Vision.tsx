import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaHome, FaHeart, FaHandHoldingHeart, FaLightbulb } from 'react-icons/fa'

const Vision = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section ref={ref} className="min-h-screen flex flex-col justify-center py-20 px-4 bg-[#0B1121]">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6">Our Vision</h2>
          <p className="text-xl text-gray-400">Empowering homeowners to unlock their future, without compromising their present</p>
        </motion.div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-8 text-center mb-12">
            <h3 className="text-2xl font-bold mb-6">The Story Behind Equihome</h3>
            <p className="text-gray-300 text-lg leading-relaxed max-w-4xl mx-auto">
              We started Equihome because we saw Australian homeowners struggling with a fundamental problem: 
              They own valuable homes but can't access their equity without taking on more debt and higher monthly payments. 
              In today's rising interest rate environment, this creates an impossible choice between financial flexibility 
              and monthly affordability.
            </p>
          </div>
        </motion.div>

        {/* Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-[#111827] rounded-2xl p-8"
          >
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-6">
              <FaHandHoldingHeart className="text-blue-400 text-xl" />
            </div>
            <h4 className="text-xl font-bold mb-4">For Homeowners</h4>
            <p className="text-gray-300">
              We believe homeowners shouldn't have to choose between accessing their equity and maintaining 
              affordable monthly payments. Your home's value should work for you, not against you.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-[#111827] rounded-2xl p-8"
          >
            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-6">
              <FaLightbulb className="text-purple-400 text-xl" />
            </div>
            <h4 className="text-xl font-bold mb-4">Our Solution</h4>
            <p className="text-gray-300">
              We've created a revolutionary way to access home equity that doesn't add to your monthly burden. 
              No more choosing between your home's value and your monthly budget.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="bg-[#111827] rounded-2xl p-8"
          >
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
              <FaHeart className="text-green-400 text-xl" />
            </div>
            <h4 className="text-xl font-bold mb-4">Our Promise</h4>
            <p className="text-gray-300">
              We're committed to providing a transparent, fair, and flexible way for homeowners to access their 
              equity while maintaining their financial stability and peace of mind.
            </p>
          </motion.div>
        </div>

        {/* Impact Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="bg-[#111827] rounded-2xl p-8 text-center"
        >
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-6">Transforming Home Equity Access</h3>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              In a world where homeowners are increasingly pressured by rising rates and living costs, 
              we're building a future where your home's equity can be accessed without adding financial stress. 
              It's not just about providing a product – it's about giving homeowners the freedom to use their 
              equity while maintaining their financial wellbeing.
            </p>
            <div className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold">
              Join us in reshaping home equity access
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Vision 