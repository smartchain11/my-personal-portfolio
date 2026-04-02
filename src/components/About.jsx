import { useEffect, useRef, useState } from 'react'
import './About.css'

function About() {
  const [isVisible, setIsVisible] = useState(false)
  const [stats, setStats] = useState({ age: 0, year: 0, languages: 0 })
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (isVisible) {
      const targets = { age: 23, year: 2, languages: 10 }
      const duration = 2000
      const increment = 16

      const animateCounter = (key, target) => {
        const steps = duration / increment
        const stepValue = target / steps
        let current = 0

        const timer = setInterval(() => {
          current += stepValue
          if (current >= target) {
            setStats(prev => ({ ...prev, [key]: target }))
            clearInterval(timer)
          } else {
            setStats(prev => ({ ...prev, [key]: Math.floor(current) }))
          }
        }, increment)
      }

      animateCounter('age', targets.age)
      animateCounter('year', targets.year)
      animateCounter('languages', targets.languages)
    }
  }, [isVisible])

  return (
    <section className="about" id="about" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-image">
            <div className="image-wrapper">
              <img src="https://via.placeholder.com/400" alt="Profile Picture" />
              <div className="image-overlay"></div>
            </div>
          </div>
          <div className="about-text">
            <h3>BSIT Student & Developer</h3>
            <p>I'm a 23-year-old Information Technology student at ADSSU (formerly ASSCAT), currently in my 2nd year of BSIT. Born on August 2, 2002, I'm passionate about technology, web development, and system servicing.</p>
            <p>I specialize in computer system servicing, networking troubleshooting, and full-stack development. I enjoy creating responsive web applications and mobile app designs using modern technologies. Always eager to learn and apply new programming concepts to real-world projects.</p>
            <div className="about-stats">
              <div className="stat-item">
                <span className="stat-number">{stats.age}</span>
                <span className="stat-label">Years Old</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{stats.year}</span>
                <span className="stat-label">Year Level</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{stats.languages}</span>
                <span className="stat-label">Languages Known</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
