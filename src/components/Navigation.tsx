import { useEffect, useState } from 'react'

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('hero')

  const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'solution', label: 'Solution' },
    { id: 'australian-market', label: 'Market' },
    { id: 'business-model', label: 'Business Model' },
    { id: 'win-win-win', label: 'Win-Win-Win' },
    { id: 'growth-trajectory', label: 'Growth' },
    { id: 'team', label: 'Team' },
    { id: 'strategic-backing', label: 'Partners' },
    { id: 'investment-opportunity', label: 'Investment' }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-40% 0px',
        threshold: 0.1
      }
    )

    sections.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <img 
              src="/Equihome Full Logo.png" 
              alt="Equihome" 
              className="h-10 transform scale-90 origin-left" 
            />
            <div className="hidden lg:flex items-center space-x-6">
              {sections.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => {
                    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className={`text-sm font-medium transition-colors hover:text-blue-500 ${
                    activeSection === id
                      ? 'text-blue-500'
                      : 'text-gray-600'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <button
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Schedule a Call
            </button>
          </div>
        </div>
      </nav>

      {/* Side Navigation Dots */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-2">
        {sections.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => {
              document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              activeSection === id 
                ? 'bg-blue-500 scale-125' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            title={label}
          />
        ))}
      </div>
    </>
  )
}

export default Navigation 