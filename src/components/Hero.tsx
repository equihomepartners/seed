import { motion } from 'framer-motion'

const Hero = () => {
  return (
    <section id="hero" className="min-h-screen bg-[#0B1121] relative overflow-hidden flex items-center">
      {/* Background Stars */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-wide leading-tight mb-8"
            >
              Unlocking Australia's<br />
              <span className="text-blue-500">$5.5T</span> Home<br />
              Equity Market
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed mb-12"
            >
              Providing seamless equity access with no monthly payments to homeowners across Australia - creating a win-win for homeowners and investors alike.
            </motion.p>

            <div className="flex flex-wrap items-center gap-8 mb-16">
              <div className="flex items-center gap-3">
                <span className="text-blue-400">•</span>
                <span>No Monthly Payments</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-blue-400">•</span>
                <span>10 Year Term</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-blue-400">•</span>
                <span>Exit Whenever</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 rounded-lg px-6 py-3 inline-block mb-16">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-semibold">
                AI/ML Driven Underwriting & Valuation System
              </span>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="bg-blue-500/10 rounded-xl p-6">
                <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">$5M</div>
                <div className="text-gray-400">
                  Operational Raise<br />
                  (Current Round)
                </div>
              </div>
              <div className="bg-blue-500/10 rounded-xl p-6">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">8-26x+</div>
                  <div className="text-sm text-gray-400">
                    Target Return<br />
                    (5-7 Years)
                  </div>
                </div>
              </div>
              <div className="bg-purple-500/10 rounded-xl p-6">
                <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">$500M</div>
                <div className="text-gray-400">
                  Sovereign Fund<br />
                  Commitment
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative hidden lg:block"
          >
            <div className="w-full aspect-square relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4/5 h-4/5">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    {/* House outline */}
                    <path
                      d="M50 10 L90 35 L90 85 L10 85 L10 35 Z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="0.5"
                      className="text-blue-500"
                    />
                    {/* Door */}
                    <rect
                      x="35"
                      y="50"
                      width="30"
                      height="35"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="0.5"
                      className="text-blue-500"
                    />
                    {/* Equity sections */}
                    <path
                      d="M10 85 L90 85 L90 70 L10 70 Z"
                      fill="currentColor"
                      className="text-blue-500/20"
                    />
                    <path
                      d="M10 70 L90 70 L90 55 L10 55 Z"
                      fill="currentColor"
                      className="text-blue-500/30"
                    />
                    <path
                      d="M10 55 L90 55 L90 40 L10 40 Z"
                      fill="currentColor"
                      className="text-blue-500/40"
                    />
                  </svg>
                </div>
              </div>
              {/* Navigation dots */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-2">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-blue-500' : 'bg-gray-600'}`} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero 