import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <section id="hero" className="min-h-[calc(100vh-72px)] relative overflow-hidden flex items-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50 to-white opacity-50" />

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900"
            >
              Unlocking Australia's<br />
              <span className="text-sky-500">$5.5T</span> Home<br />
              Equity Market
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed"
            >
              Providing seamless equity access with no monthly payments to homeowners across Australia - creating a win-win for homeowners and investors alike.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap items-center gap-8"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-sky-500" />
                <span className="text-gray-700">No Monthly Payments</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-sky-500" />
                <span className="text-gray-700">Institutional Grade</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-sky-500" />
                <span className="text-gray-700">AI-Driven Platform</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap gap-6"
            >
              <Link to="/book-call" className="fintech-button-primary">
                Book Investment Call
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-fintech-lg">
              <img
                src="/sydney-splash.jpg"
                alt="Sydney Harbour"
                className="w-full h-full object-cover object-center"
                loading="eager"
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Stats Cards */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-fintech-md p-4 border border-gray-100">
              <div className="text-sm text-gray-600">Target AUM</div>
              <div className="text-xl font-semibold text-gray-900">$2B+</div>
            </div>
            <div className="absolute -top-6 -right-6 bg-white rounded-lg shadow-fintech-md p-4 border border-gray-100">
              <div className="text-sm text-gray-600">IRR Target</div>
              <div className="text-xl font-semibold text-gray-900">16%+</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero 