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
  const [voiceReady, setVoiceReady] = useState(true)
  const hasSpoken = useRef(false)

  const aboutText = `Hello! I'm Jun Dave Moreno, also known as Necry Talkie. I'm a 23-year-old Information Technology student at ADSSU, currently in my 3rd year of BSIT. I was born on August 2, 2002, and I'm passionate about technology, web development, and system servicing. I specialize in computer system servicing, networking troubleshooting, and full-stack development. I enjoy creating responsive web applications and mobile app designs using modern technologies. I am based in San Francisco, Agusan Del Sur, Philippines. Feel free to explore my portfolio and connect with me!`

  const speak = () => {
    if (!('speechSynthesis' in window) || hasSpoken.current) return false

    const voices = window.speechSynthesis.getVoices()
    if (voices.length === 0) {
      setVoiceReady(false)
      return false
    }

    setVoiceReady(true)
    hasSpoken.current = true
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(aboutText)
    utterance.rate = 0.95
    utterance.pitch = 0.9
    utterance.volume = 1

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
    return true
  }

  const handlePlayVoice = () => {
    hasSpoken.current = false
    if (!('speechSynthesis' in window)) return
    const voices = window.speechSynthesis.getVoices()
    if (voices.length > 0) {
      speak()
    } else {
      window.speechSynthesis.onvoiceschanged = () => {
        speak()
        window.speechSynthesis.onvoiceschanged = null
      }
      window.speechSynthesis.getVoices()
    }
  }

  useEffect(() => {
    setLoaded(true)

    let retries = 0
    const trySpeak = () => {
      if (speak()) return
      if (retries < 3) {
        retries++
        setTimeout(trySpeak, 800)
      } else {
        window.speechSynthesis.onvoiceschanged = () => {
          speak()
          window.speechSynthesis.onvoiceschanged = null
        }
        window.speechSynthesis.getVoices()
      }
    }
    setTimeout(trySpeak, 500)
    
    const targets = { age: 23, year: 3, languages: 10 }
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
      window.speechSynthesis.cancel()
    }
  }, [])

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark'
    if (currentTheme !== theme) {
      setIsTransitioning(true)
      const t1 = setTimeout(() => {
        setTheme(currentTheme)
        const t2 = setTimeout(() => setIsTransitioning(false), 300)
        return () => clearTimeout(t2)
      }, 150)
      return () => clearTimeout(t1)
    }
  }, [theme])

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark'
      if (currentTheme !== theme) {
        setTheme(currentTheme)
      }
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [theme])

  const currentImage = theme === 'light' ? '/imageforwhite.png' : '/imageforblack.jpg'

  return (
    <div className={`about-page page ${loaded ? 'loaded' : ''}`}>
      <div className="container">
        <div className="about-header">
          <h1 className="section-title animate-item">About Me</h1>
          <div className="about-voice-controls animate-item">
            {isSpeaking ? (
              <div className="speaking-indicator">
                <i className="fas fa-volume-up"></i>
                <span>Playing...</span>
                <div className="sound-waves">
                  <span></span><span></span><span></span>
                </div>
              </div>
            ) : (
              <button className={`voice-btn ${!voiceReady ? 'disabled' : ''}`} onClick={handlePlayVoice} disabled={!voiceReady}>
                <i className={`fas ${voiceReady ? 'fa-play' : 'fa-exclamation-circle'}`}></i>
                <span>{voiceReady ? 'Play Introduction' : 'Speech Unavailable'}</span>
              </button>
            )}
          </div>
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
              currently in my 3rd year of BSIT. Born on August 2, 2002, I'm passionate about 
              technology, web development, and system servicing.
            </p>
            
            <p className="about-text animate-item">
              I specialize in computer system servicing, networking troubleshooting, and 
              full-stack development. I enjoy creating responsive web applications and mobile 
              app designs using modern technologies.
            </p>

            <div className="about-address animate-item">
              <h3><i className="fas fa-map-marker-alt"></i> Location</h3>
              <p>Philippines, Agusan Del Sur, San Francisco</p>
            </div>

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
