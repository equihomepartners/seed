import { useEffect, useState } from 'react'

type SectionColors = {
  [key: string]: {
    main: string
    gradient: string
  }
}

const sectionColors: SectionColors = {
  'hero': {
    main: 'rgb(11, 17, 33)',
    gradient: 'rgba(30, 64, 175, 0.05)'
  },
  'current-options': {
    main: 'rgb(13, 19, 35)',
    gradient: 'rgba(30, 64, 175, 0.07)'
  },
  'solution': {
    main: 'rgb(15, 21, 37)',
    gradient: 'rgba(30, 64, 175, 0.08)'
  },
  'business-model': {
    main: 'rgb(17, 23, 39)',
    gradient: 'rgba(30, 64, 175, 0.09)'
  },
  'australian-market': {
    main: 'rgb(19, 25, 41)',
    gradient: 'rgba(30, 64, 175, 0.1)'
  },
  'win-win-win': {
    main: 'rgb(21, 27, 43)',
    gradient: 'rgba(30, 64, 175, 0.11)'
  },
  'growth-trajectory': {
    main: 'rgb(23, 29, 45)',
    gradient: 'rgba(30, 64, 175, 0.12)'
  },
  'team': {
    main: 'rgb(25, 31, 47)',
    gradient: 'rgba(30, 64, 175, 0.13)'
  },
  'partners': {
    main: 'rgb(27, 33, 49)',
    gradient: 'rgba(30, 64, 175, 0.14)'
  },
  'investment-opportunity': {
    main: 'rgb(29, 35, 51)',
    gradient: 'rgba(30, 64, 175, 0.15)'
  },
  'contact': {
    main: 'rgb(31, 37, 53)',
    gradient: 'rgba(30, 64, 175, 0.16)'
  }
}

const BackgroundController = () => {
  const [currentSection, setCurrentSection] = useState('hero')
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = window.scrollY / scrollHeight
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
            setCurrentSection(entry.target.id)
          }
        })
      },
      {
        threshold: [0.2],
        rootMargin: '-20% 0px'
      }
    )

    Object.keys(sectionColors).forEach((sectionId) => {
      const element = document.getElementById(sectionId)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  const getInterpolatedColor = () => {
    const sections = Object.keys(sectionColors)
    const sectionIndex = sections.indexOf(currentSection)
    const progress = scrollProgress * (sections.length - 1)
    
    const currentColor = sectionColors[currentSection].main
    const nextSection = sections[sectionIndex + 1]
    const nextColor = nextSection ? sectionColors[nextSection].main : currentColor

    return `linear-gradient(180deg, 
      ${currentColor} 0%,
      ${nextColor} 100%)`
  }

  return (
    <>
      {/* Main Background */}
      <div 
        className="fixed inset-0 -z-10"
        style={{ 
          background: getInterpolatedColor(),
          transition: 'background 2000ms cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        {/* Smooth Gradient Overlay */}
        <div 
          className="absolute inset-0 transition-opacity duration-2000"
          style={{
            background: `radial-gradient(
              circle at 50% ${50 + scrollProgress * 100}%,
              ${sectionColors[currentSection]?.gradient} 0%,
              transparent 70%
            )`
          }}
        />

        {/* Dynamic Gradient */}
        <div 
          className="absolute inset-0 transition-all duration-2000"
          style={{
            opacity: 0.4,
            background: `
              linear-gradient(${180 + scrollProgress * 360}deg,
                transparent 0%,
                ${sectionColors[currentSection]?.gradient} 50%,
                transparent 100%
              )
            `
          }}
        />

        {/* Moving Light Effect */}
        <div 
          className="absolute inset-0 transition-all duration-2000"
          style={{
            background: `
              radial-gradient(
                circle at ${50 + Math.sin(scrollProgress * Math.PI * 2) * 30}% ${50 + Math.cos(scrollProgress * Math.PI * 2) * 30}%,
                ${sectionColors[currentSection]?.gradient} 0%,
                transparent 60%
              )
            `
          }}
        />

        {/* Noise Texture */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.015] mix-blend-soft-light" />

        {/* Subtle Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/10" />
      </div>

      {/* Global Overlay */}
      <div 
        className="fixed inset-0 -z-5 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom,
            transparent,
            rgba(0,0,0,${0.05 + scrollProgress * 0.1})
          )`
        }}
      />
    </>
  )
}

export default BackgroundController 