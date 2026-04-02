import { useEffect, useState } from 'react'
import './About.css'

function About() {
  const [loaded, setLoaded] = useState(false)
  const [counts, setCounts] = useState({ age: 0, year: 0, languages: 0 })
  const [theme, setTheme] = useState(() => {
    return document.documentElement.getAttribute('data-theme') || 'dark'
  })
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    setLoaded(true)
    
    // Watch for theme changes
    const checkTheme = () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark'
      if (currentTheme !== theme) {
        setIsTransitioning(true)
        setTimeout(() => {
          setTheme(currentTheme)
          setTimeout(() => setIsTransitioning(false), 300)
        }, 150)
      }
    }

    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    
    // Also check periodically as backup
    const interval = setInterval(checkTheme, 100)
    
    const targets = { age: 23, year: 2, languages: 10 }
    const duration = 2000
    const steps = 60
    const stepTime = duration / steps
    
    let step = 0
    const timer = setInterval(() => {
      step++
      setCounts({
        age: Math.min(Math.round((step / steps) * targets.age), targets.age),
        year: Math.min(Math.round((step / steps) * targets.year), targets.year),
        languages: Math.min(Math.round((step / steps) * targets.languages), targets.languages)
      })
      if (step >= steps) clearInterval(timer)
    }, stepTime)

    return () => {
      clearInterval(timer)
      clearInterval(interval)
      observer.disconnect()
    }
  }, [theme])

  const currentImage = theme === 'light' ? '/image/imageforwhite.png' : '/image/imageforblack.jpg'

  return (
    <div className={`about-page page ${loaded ? 'loaded' : ''}`}>
      <div className="container">
        <h1 className="section-title animate-item">About Me</h1>
        
        <div className="about-grid">
          <div className="about-image animate-item">
            <div className="image-container">
              <div className={`image-wrapper ${isTransitioning ? 'transitioning' : ''}`}>
                <img 
                  src={currentImage} 
                  alt="Jun Dave Moreno" 
                  className="about-photo"
                  key={theme}
                />
                <div className="glasses-indicator">
                  <i className={theme === 'light' ? 'fas fa-sun' : 'fas fa-moon'}></i>
                  <span>{theme === 'light' ? 'Sunglasses Mode' : 'Glasses Mode'}</span>
                </div>
              </div>
              <div className="image-frame"></div>
              <div className="image-frame-2"></div>
            </div>
          </div>
          
          <div className="about-content">
            <h2 className="about-subtitle animate-item">
              IT Student & Developer based in Philippines
            </h2>
            
            <p className="about-text animate-item">
              I'm a 23-year-old Information Technology student at ADSSU (formerly ASSCAT), 
              currently in my 2nd year of BSIT. Born on August 2, 2002, I'm passionate about 
              technology, web development, and system servicing.
            </p>
            
            <p className="about-text animate-item">
              I specialize in computer system servicing, networking troubleshooting, and 
              full-stack development. I enjoy creating responsive web applications and mobile 
              app designs using modern technologies.
            </p>

            <div className="about-stats animate-item">
              <div className="stat-item">
                <span className="stat-number">{counts.age}</span>
                <span className="stat-label">Years Old</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{counts.year}</span>
                <span className="stat-label">Year Level</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{counts.languages}+</span>
                <span className="stat-label">Technologies</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
