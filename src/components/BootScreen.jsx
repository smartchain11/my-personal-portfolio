import { useState, useEffect } from 'react'
import './BootScreen.css'

function BootScreen() {
  const [loadingProgress, setLoadingProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 2
      })
    }, 80)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="boot-screen">
      <div className="boot-content">
        <div className="xp-logo">
          <div className="logo-text">
            <span className="windows-text">Microsoft</span>
            <span className="xp-text">Windows XP</span>
          </div>
          <div className="logo-tagline">Professional</div>
        </div>

        <div className="loading-container">
          <div className="loading-bar">
            <div className="loading-bar-track">
              <div 
                className="loading-bar-fill"
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>
          </div>
          <div className="loading-text">Starting Windows...</div>
        </div>

        <div className="boot-footer">
          <div className="copyright">Copyright © Microsoft Corporation</div>
        </div>
      </div>
    </div>
  )
}

export default BootScreen
