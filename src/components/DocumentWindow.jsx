import { useState, useRef, useEffect } from 'react'
import About from './About'
import Skills from './Skills'
import Contact from './Contact'
import './DocumentWindow.css'

function DocumentWindow({ title, fileType, content, isActive, isMinimized, onClose, onMinimize, onFocus }) {
  const [position, setPosition] = useState({ x: 160, y: 140 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const windowRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        })
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, dragOffset])

  const handleMouseDown = (e) => {
    if (e.target.closest('.window-controls')) return
    const rect = windowRef.current.getBoundingClientRect()
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
    setIsDragging(true)
    onFocus()
  }

  const getIcon = () => {
    if (fileType === 'pdf') return 'fas fa-file-pdf'
    if (fileType === 'word') return 'fas fa-file-word'
    return 'fas fa-file'
  }

  const renderContent = () => {
    if (content === 'about') return <About />
    if (content === 'skills') return <Skills />
    if (content === 'contact') return <Contact />
    if (content === 'resume') return (
      <div className="resume-content">
        <h1>Professional Resume</h1>
        <div className="resume-section">
          <h2>Personal Information</h2>
          <p><strong>Name:</strong> Your Name</p>
          <p><strong>Email:</strong> your.email@example.com</p>
          <p><strong>Phone:</strong> +1 (555) 123-4567</p>
          <p><strong>Location:</strong> City, Country</p>
        </div>
        <div className="resume-section">
          <h2>Professional Summary</h2>
          <p>Experienced developer with expertise in modern web technologies...</p>
        </div>
        <div className="resume-section">
          <h2>Education</h2>
          <p><strong>Bachelor of Science in Computer Science</strong></p>
          <p>University Name, 2018-2022</p>
        </div>
        <div className="resume-section">
          <h2>Work Experience</h2>
          <p><strong>Senior Developer</strong> - Company Name (2022-Present)</p>
          <p>• Developed and maintained web applications</p>
          <p>• Led team of developers on major projects</p>
        </div>
      </div>
    )
    return <div>Content not found</div>
  }

  if (isMinimized) return null

  return (
    <div
      ref={windowRef}
      className={`document-window ${isActive ? 'active' : ''} ${fileType}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: isActive ? 1000 : 1
      }}
      onClick={onFocus}
    >
      <div className="window-titlebar" onMouseDown={handleMouseDown}>
        <div className="titlebar-left">
          <i className={getIcon()}></i>
          <span className="window-title">{title}</span>
        </div>
        <div className="window-controls">
          <button className="window-btn minimize" onClick={onMinimize}>
            <span>_</span>
          </button>
          <button className="window-btn maximize">
            <span>□</span>
          </button>
          <button className="window-btn close" onClick={onClose}>
            <span>✕</span>
          </button>
        </div>
      </div>

      {fileType === 'word' && (
        <div className="word-toolbar">
          <button className="word-btn"><i className="fas fa-file"></i></button>
          <button className="word-btn"><i className="fas fa-save"></i></button>
          <button className="word-btn"><i className="fas fa-print"></i></button>
          <span className="toolbar-separator">|</span>
          <button className="word-btn"><i className="fas fa-bold"></i></button>
          <button className="word-btn"><i className="fas fa-italic"></i></button>
          <button className="word-btn"><i className="fas fa-underline"></i></button>
        </div>
      )}

      {fileType === 'pdf' && (
        <div className="pdf-toolbar">
          <button className="pdf-btn"><i className="fas fa-search-plus"></i></button>
          <button className="pdf-btn"><i className="fas fa-search-minus"></i></button>
          <span className="toolbar-separator">|</span>
          <span className="page-indicator">Page 1 of 1</span>
          <span className="toolbar-separator">|</span>
          <button className="pdf-btn"><i className="fas fa-print"></i></button>
          <button className="pdf-btn"><i className="fas fa-download"></i></button>
        </div>
      )}

      <div className={`document-content ${fileType}`}>
        {renderContent()}
      </div>
    </div>
  )
}

export default DocumentWindow
