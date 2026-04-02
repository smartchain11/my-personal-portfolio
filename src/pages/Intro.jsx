import { useState, useEffect } from 'react'
import './Intro.css'

function Intro({ onComplete }) {
  const [displayText, setDisplayText] = useState('')
  const [showSubtitle, setShowSubtitle] = useState(false)
  const [showPrompt, setShowPrompt] = useState(false)
  const fullName = 'Jun Dave Moreno'

  useEffect(() => {
    let index = 0
    const typeInterval = setInterval(() => {
      if (index <= fullName.length) {
        setDisplayText(fullName.slice(0, index))
        index++
      } else {
        clearInterval(typeInterval)
        setTimeout(() => setShowSubtitle(true), 300)
        setTimeout(() => setShowPrompt(true), 800)
      }
    }, 100)

    return () => clearInterval(typeInterval)
  }, [])

  // Handle any click, tap, or keypress
  useEffect(() => {
    const handleInteraction = () => {
      if (showPrompt) {
        onComplete()
      }
    }

    const handleKeyPress = (e) => {
      if (showPrompt) {
        onComplete()
      }
    }

    window.addEventListener('click', handleInteraction)
    window.addEventListener('touchstart', handleInteraction)
    window.addEventListener('keydown', handleKeyPress)

    return () => {
      window.removeEventListener('click', handleInteraction)
      window.removeEventListener('touchstart', handleInteraction)
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [showPrompt, onComplete])

  return (
    <div className="intro">
      <div className="intro-bg">
        <div className="grid-lines"></div>
      </div>
      
      <div className="intro-content">
        <div className="intro-text">
          <h1 className="intro-name">
            {displayText}
            <span className="cursor">|</span>
          </h1>
          
          <p className={`intro-subtitle ${showSubtitle ? 'visible' : ''}`}>
            Developer • Designer • Creator
          </p>
        </div>
      </div>

      <div className={`intro-footer ${showPrompt ? 'visible' : ''}`}>
        <span>Press any key or click anywhere to continue</span>
        <div className="pulse-ring"></div>
      </div>
    </div>
  )
}

export default Intro
