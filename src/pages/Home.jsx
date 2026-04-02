import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <div className={`home page ${loaded ? 'loaded' : ''}`}>
      <div className="container">
        <div className="home-content">
          <div className="home-text">
            <p className="home-greeting animate-item">Hello, I'm</p>
            <h1 className="home-name animate-item">Jun Dave<br />Moreno</h1>
            <p className="home-title animate-item">
              Full Stack Developer & IT Student
            </p>
            <p className="home-description animate-item">
              Passionate about creating elegant solutions through code. 
              Currently pursuing BSIT at ADSSU while building modern web applications.
            </p>
            <div className="home-buttons animate-item">
              <Link to="/projects" className="btn btn-filled">
                View Projects
              </Link>
              <Link to="/contact" className="btn">
                Get in Touch
              </Link>
            </div>
          </div>
          
          <div className="home-visual animate-item">
            <div className="profile-image-container">
              <img src="/image/ouhmm.png" alt="Jun Dave Moreno" className="profile-image" />
              <div className="profile-border"></div>
              <div className="profile-border-2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
