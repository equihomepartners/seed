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

      <div className="container mx-auto px-4 pt-32 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
            >
              <div>Unlocking</div>
              <div>Australia's</div>
              <div><span className="text-blue-500">$5.5T</span></div>
              <div>Home Equity</div>
              <div>Market</div>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed"
            >
              Revolutionizing home equity access through an innovative financial product, technology, and partnerships - creating a win-win-win for homeowners, investors, and the market.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap gap-6 text-lg text-blue-400"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span>No Monthly Payments</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span>10 Year Term</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span>Exit Whenever</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-8 pt-4"
            >
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold text-blue-500">$5M</div>
                <div className="text-sm text-gray-400">Capital Raise</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold text-blue-500">18x</div>
                <div className="text-sm text-gray-400">Target Return Multiple</div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative lg:pt-12"
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