import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaHome, FaHeart, FaHandHoldingHeart, FaLightbulb } from 'react-icons/fa'

const Vision = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section ref={ref} className="min-h-screen flex flex-col justify-center py-20 px-4">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-8">
            <div className="flex items-center space-x-2 px-4 py-2 bg-sky-50 rounded-full border border-sky-100">
              <div className="w-2 h-2 rounded-full bg-sky-500" />
              <span className="text-sm font-medium text-sky-600">Problem/Solution</span>
            </div>
          </div>
          <h2 className="text-5xl font-bold mb-6 text-gray-900">Transforming Home Equity</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Creating a win-win solution for homeowners and investors through innovative financial technology
          </p>
        </motion.div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <div className="bg-sky-50 rounded-2xl p-8 text-center mb-12 border border-sky-100">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">The Story Behind Equihome</h3>
            <p className="text-gray-600 text-lg leading-relaxed max-w-4xl mx-auto">
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
            className="fintech-card p-8"
          >
            <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center mb-6">
              <FaHome className="text-2xl text-sky-600" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-gray-900">For Homeowners</h3>
            <p className="text-gray-600">
              Access your home equity without taking on debt or monthly payments. Keep living in your home while unlocking its value.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="fintech-card p-8"
          >
            <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center mb-6">
              <FaHandHoldingHeart className="text-2xl text-sky-600" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-gray-900">For Investors</h3>
            <p className="text-gray-600">
              Unique access to Australia's premier residential real estate market. Participate in property appreciation without buying assets or taking on debt. Benefit from strong market fundamentals, high barriers to entry, and inflation protection in one of the world's strongest real estate markets.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="fintech-card p-8"
          >
            <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center mb-6">
              <FaLightbulb className="text-2xl text-sky-600" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-gray-900">Our Innovation</h3>
            <p className="text-gray-600">
              AI-driven platform that makes home equity investments scalable, efficient, and profitable for all parties.
            </p>
          </motion.div>
        </div>

        {/* Investment Opportunity Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-sky-50 rounded-2xl p-8 mb-16 border border-sky-100"
        >
          <h3 className="text-2xl font-bold mb-6 text-gray-900 text-center">Pioneering a New Asset Class</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-900">Market Fundamentals</h4>
              <ul className="space-y-3 text-gray-600">
                <li>• World-renowned residential market with consistent capital growth</li>
                <li>• High barriers to entry protect asset values and returns</li>
                <li>• Strong population growth and limited housing supply</li>
                <li>• Stable regulatory environment and property rights</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-900">Investment Advantages</h4>
              <ul className="space-y-3 text-gray-600">
                <li>• Direct exposure to residential appreciation without property ownership</li>
                <li>• No stamp duty or property management costs</li>
                <li>• Natural inflation hedge through property value correlation</li>
                <li>• Institutional-grade investment structure and reporting</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
        >
          <div className="fintech-card p-6 text-center">
            <div className="text-3xl font-bold text-sky-600 mb-2">$7T</div>
            <div className="text-sm text-gray-600">Total Market Size</div>
          </div>
          <div className="fintech-card p-6 text-center">
            <div className="text-3xl font-bold text-sky-600 mb-2">16%+</div>
            <div className="text-sm text-gray-600">Target IRR</div>
          </div>
          <div className="fintech-card p-6 text-center">
            <div className="text-3xl font-bold text-sky-600 mb-2">$2B+</div>
            <div className="text-sm text-gray-600">Target AUM</div>
          </div>
          <div className="fintech-card p-6 text-center">
            <div className="text-3xl font-bold text-sky-600 mb-2">$500M</div>
            <div className="text-sm text-gray-600">Initial Commitment</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Vision 