import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaLinkedin } from 'react-icons/fa'

const Team = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const teamMembers = [
    {
      name: "Ian Morgan Charles",
      title: "Chairman & Co-Founder of Unison",
      role: "Executive Leadership",
      points: [
        "Pioneer of home equity investments since 2004",
        "Built Unison to $10B+ portfolio",
        "Created the entire asset class"
      ],
      linkedin: "https://www.linkedin.com/in/ian-morgan-charles-6b0a1b1/",
      company: {
        name: "Unison",
        url: "https://www.unison.com"
      }
    },
    {
      name: "Sujay Namburi",
      title: "Co-Founder",
      role: "Tech & Operations",
      points: [
        "Real estate and tech background",
        "Platform architecture",
        "Data analytics expertise"
      ],
      linkedin: "https://www.linkedin.com/in/sujay-namburi-b5b3b31b/"
    },
    {
      name: "Taurian Charles",
      title: "Co-Founder",
      role: "Fund Management & CFO",
      points: [
        "Financial markets expertise",
        "Investment strategy",
        "Risk management"
      ],
      linkedin: "https://www.linkedin.com/in/taurian-charles-b3b3b31b/"
    }
  ]

  return (
    <section ref={ref} id="team" className="min-h-screen py-20 px-4 bg-[#0B1121]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6">Team</h2>
          <p className="text-xl text-gray-400">Led by pioneers of the home equity investment industry</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`bg-[#111827] rounded-2xl p-8 relative overflow-hidden group hover:scale-105 transition-transform duration-300 ${
                index === 0 ? 'md:transform md:scale-110 md:z-10 ring-2 ring-blue-500/20' : ''
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                    <p className="text-blue-400 font-medium mb-1">{member.title}</p>
                    <p className="text-gray-400">{member.role}</p>
                  </div>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <FaLinkedin size={24} />
                  </a>
                </div>

                <div className="space-y-3">
                  {member.points.map((point, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <p className="text-gray-300">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Team 