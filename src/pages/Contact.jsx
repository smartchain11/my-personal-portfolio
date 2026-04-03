import { useState, useEffect, useRef } from 'react'
import emailjs from '@emailjs/browser'
import './Contact.css'

// EmailJS Configuration
const EMAILJS_SERVICE_ID = 'service_hs0to6a'
const EMAILJS_TEMPLATE_ID = 'template_kteo1tp'
const EMAILJS_PUBLIC_KEY = '3WC_AxBIQ3Jy-1bgA'

function Contact() {
  const [loaded, setLoaded] = useState(false)
  const [sending, setSending] = useState(false)
  const [status, setStatus] = useState({ type: '', message: '' })
  const formRef = useRef()

  useEffect(() => {
    setLoaded(true)
  }, [])

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus({ type: '', message: '' })

    // Validate email format
    if (!validateEmail(formData.email)) {
      setStatus({ type: 'error', message: 'Please enter a valid email address (e.g., example@gmail.com)' })
      return
    }

    // Validate message length (minimum 100 characters)
    if (formData.message.trim().length < 100) {
      setStatus({ type: 'error', message: `Message must be at least 100 characters. Currently: ${formData.message.trim().length}/100` })
      return
    }

    setSending(true)

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      )
      
      setStatus({ type: 'success', message: 'Message sent successfully! I\'ll get back to you soon.' })
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      console.error('EmailJS error:', error)
      setStatus({ type: 'error', message: 'Failed to send message. Please try again or email me directly.' })
    } finally {
      setSending(false)
    }
  }

  return (
    <div className={`contact-page page ${loaded ? 'loaded' : ''}`}>
      <div className="container">
        <h1 className="section-title animate-item">Contact</h1>
        
        <div className="contact-grid">
          <div className="contact-info animate-item">
            <p className="contact-intro">
              I'm currently available for freelance work and new opportunities. 
              Feel free to reach out if you'd like to work together.
            </p>
            
            <div className="contact-details">
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <span>morenojundave@gmail.com</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>Philippines</span>
              </div>
            </div>

            <div className="social-links">
              <a href="https://github.com/smartchain11" target="_blank" rel="noopener noreferrer" className="social-link">
                <i className="fab fa-github"></i>
              </a>
              <a href="https://www.facebook.com/necry.raizen11" target="_blank" rel="noopener noreferrer" className="social-link">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://www.youtube.com/@necry_talkiexMorenoJD" target="_blank" rel="noopener noreferrer" className="social-link">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>

          <form ref={formRef} className="contact-form animate-item" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
              <span className={`char-count ${formData.message.trim().length >= 100 ? 'valid' : ''}`}>
                {formData.message.trim().length}/100 characters minimum
              </span>
            </div>
            
            {status.message && (
              <div className={`form-status ${status.type}`}>
                {status.message}
              </div>
            )}
            
            <button type="submit" className="btn btn-primary" disabled={sending}>
              {sending ? 'Sending...' : 'Send Message'}
              {!sending && <i className="fas fa-arrow-right"></i>}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact
