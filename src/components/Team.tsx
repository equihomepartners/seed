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
      role: "Chairman of the Board",
      subtitle: "Executive Leadership",
      linkedin: "#",
      experience: [
        "Co-founder of Unison, pioneer in Home Equity Investments",
        "Built largest US company in the industry",
        "Inspired global market expansion including US and Canada"
      ]
    },
    {
      name: "Sujay Namburi",
      role: "Co-Founder",
      subtitle: "Tech & Operations",
      linkedin: "#",
      experience: [
        "Real estate and tech background",
        "Platform architecture",
        "Data analytics expertise"
      ]
    },
    {
      name: "Taurian Charles",
      role: "Co-Founder",
      subtitle: "Fund Management & CFO",
      linkedin: "#",
      experience: [
        "Financial markets expertise",
        "Investment strategy",
        "Risk management"
      ]
    }
  ]

  return (
    <section ref={ref} id="team" className="py-32 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl font-bold mb-6 text-gray-900">Team</h2>
          <p className="text-xl text-gray-600">Led by pioneers of the home equity investment industry</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="fintech-card p-8 relative overflow-hidden border border-gray-200"
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                    <p className="text-sky-600">{member.role}</p>
                    <p className="text-gray-600">{member.subtitle}</p>
                  </div>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-600 hover:text-sky-500"
                  >
                    <FaLinkedin className="text-xl" />
                  </a>
                </div>

                <ul className="space-y-2">
                  {member.experience.map((item, i) => (
                    <li key={i} className="flex items-center text-gray-600">
                      <span className="w-1.5 h-1.5 bg-sky-500 rounded-full mr-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Team 