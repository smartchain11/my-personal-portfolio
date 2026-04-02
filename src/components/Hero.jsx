import { useState, useEffect } from 'react'
import './Hero.css'

function Hero() {
  const [bootText, setBootText] = useState([])
  const [showContent, setShowContent] = useState(false)
  const [text, setText] = useState('')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  const phrases = [
    'BSIT_STUDENT.exe',
    'FULL_STACK_DEV.sys',
    'SYSTEM_TECH.dll',
    'NETWORK_SPEC.bin',
    'UI_UX_DESIGN.bat'
  ]

  const bootSequence = [
    'BIOS VERSION 2002.08.02',
    'CPU: Intel Core i23 @ 2.3GHz',
    'RAM: 32GB DDR5',
    'INITIALIZING SYSTEM...',
    'LOADING PORTFOLIO.SYS............... [OK]',
    'CHECKING CREDENTIALS................ [OK]',
    'MOUNTING /dev/skills................ [OK]',
    'STARTING NETWORK_SERVICES........... [OK]',
    'BOOTING USER: MORENO, JUN DAVE',
    ''
  ]

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index < bootSequence.length) {
        setBootText(prev => [...prev, bootSequence[index]])
        index++
      } else {
        clearInterval(interval)
        setTimeout(() => setShowContent(true), 500)
      }
    }, 150)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!showContent) return
    
    const currentPhrase = phrases[phraseIndex]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(currentPhrase.substring(0, text.length + 1))
        if (text === currentPhrase) {
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        setText(currentPhrase.substring(0, text.length - 1))
        if (text === '') {
          setIsDeleting(false)
          setPhraseIndex((phraseIndex + 1) % phrases.length)
        }
      }
    }, isDeleting ? 50 : 100)

    return () => clearTimeout(timeout)
  }, [text, isDeleting, phraseIndex, showContent])

  return (
    <section className="hero" id="home">
      <div className="boot-screen">
        {bootText.map((line, index) => (
          <div key={index} className="boot-line">{line}</div>
        ))}
      </div>

      {showContent && (
        <div className="hero-content">
          <div className="hero-header">
            <div className="system-info">
              ╔════════════════════════════════════════════════════════════╗
              <br />
              ║  SYSTEM INITIALIZATION COMPLETE                            ║
              <br />
              ║  USER PROFILE LOADED: MORENO, JUN DAVE                     ║
              <br />
              ╚════════════════════════════════════════════════════════════╝
            </div>
          </div>

          <h1 className="hero-title">
            <span className="prompt">C:\USERS\MORENO&gt;</span> <span className="command">WHOAMI</span>
          </h1>
          
          <div className="hero-output">
            <p className="output-line">NAME: MORENO, JUN DAVE</p>
            <p className="output-line">STATUS: BSIT STUDENT | 2ND YEAR</p>
            <p className="output-line">LOCATION: ADSSU (FORMERLY ASSCAT)</p>
            <p className="output-line">ROLE: <span className="typing-text">{text}</span><span className="cursor">█</span></p>
          </div>

          <div className="command-line">
            <p>C:\USERS\MORENO&gt; DIR /COMMANDS</p>
          </div>

          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary">[VIEW_WORK.exe]</a>
            <a href="#contact" className="btn btn-secondary">[CONTACT.bat]</a>
          </div>

          <div className="social-links">
            <p className="network-label">║ NETWORK CONNECTIONS:</p>
            <div className="connections">
              <a href="#" className="social-icon" title="GitHub"><i className="fab fa-github"></i> GITHUB</a>
              <a href="#" className="social-icon" title="LinkedIn"><i className="fab fa-linkedin"></i> LINKEDIN</a>
              <a href="#" className="social-icon" title="Twitter"><i className="fab fa-twitter"></i> TWITTER</a>
              <a href="#" className="social-icon" title="Dribbble"><i className="fab fa-dribbble"></i> DRIBBBLE</a>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Hero
