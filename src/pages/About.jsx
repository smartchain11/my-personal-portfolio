import { useEffect, useState, useRef } from 'react'
import './About.css'

function About() {
  const [loaded, setLoaded] = useState(false)
  const [counts, setCounts] = useState({ age: 0, year: 0, languages: 0 })
  const [theme, setTheme] = useState(() => {
    return document.documentElement.getAttribute('data-theme') || 'dark'
  })
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const hasSpoken = useRef(false)

  const aboutText = `
    Hello! I'm Jun Dave Moreno, also known as Necry Talkie.
    I'm a 23-year-old Information Technology student at ADSSU, currently in my 2nd year of BSIT.
    I was born on August 2, 2002, and I'm passionate about technology, web development, and system servicing.
    I specialize in computer system servicing, networking troubleshooting, and full-stack development.
    I enjoy creating responsive web applications and mobile app designs using modern technologies.
    Feel free to explore my portfolio and connect with me!
  `

  const speak = () => {
    if ('speechSynthesis' in window && !hasSpoken.current) {
      hasSpoken.current = true
      
      // Cancel any ongoing speech
      window.speechSynthesis.cancel()

      const utterance = new SpeechSynthesisUtterance(aboutText)
      utterance.rate = 0.95
      utterance.pitch = 0.9  // Lower pitch for male voice
      utterance.volume = 1

      // Try to get a Filipino voice, fallback to English male
      const voices = window.speechSynthesis.getVoices()
      const filipinoVoice = voices.find(voice => 
        voice.lang.includes('fil') || 
        voice.lang.includes('tl') ||
        voice.name.toLowerCase().includes('filipino') ||
        voice.name.toLowerCase().includes('tagalog')
      )
      
      const maleVoice = voices.find(voice => 
        voice.name.toLowerCase().includes('male') ||
        voice.name.includes('David') ||
        voice.name.includes('Mark') ||
        voice.name.includes('James') ||
        voice.name.includes('Google US English Male')
      ) || voices.find(voice => voice.lang.includes('en-US'))
      
      if (filipinoVoice) {
        utterance.voice = filipinoVoice
      } else if (maleVoice) {
        utterance.voice = maleVoice
      }

      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      utterance.onerror = () => setIsSpeaking(false)

      window.speechSynthesis.speak(utterance)
    }
  }

  useEffect(() => {
    setLoaded(true)
    
    // Load voices and auto-play
    if ('speechSynthesis' in window) {
      const loadVoicesAndSpeak = () => {
        const voices = window.speechSynthesis.getVoices()
        if (voices.length > 0) {
          setTimeout(speak, 500) // Small delay for smooth transition
        }
      }

      // Voices might load async
      if (window.speechSynthesis.getVoices().length > 0) {
        setTimeout(speak, 500)
      } else {
        window.speechSynthesis.onvoiceschanged = loadVoicesAndSpeak
      }
    }
    
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
      window.speechSynthesis.cancel()
    }
  }, [theme])

  const currentImage = theme === 'light' ? '/imageforwhite.png' : '/imageforblack.jpg'

  return (
    <div className={`about-page page ${loaded ? 'loaded' : ''}`}>
      <div className="container">
        <div className="about-header">
          <h1 className="section-title animate-item">About Me</h1>
          {isSpeaking && (
            <div className="speaking-indicator animate-item">
              <i className="fas fa-volume-up"></i>
              <span>Speaking...</span>
              <div className="sound-waves">
                <span></span><span></span><span></span>
              </div>
            </div>
          )}
        </div>
        
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
