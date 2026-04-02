import { useState, useRef, useEffect } from 'react'
import Projects from './Projects'
import './BrowserWindow.css'

function BrowserWindow({ isActive, isMinimized, onClose, onMinimize, onFocus }) {
  const [position, setPosition] = useState({ x: 140, y: 120 })
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

  if (isMinimized) return null

  return (
    <div
      ref={windowRef}
      className={`browser-window ${isActive ? 'active' : ''}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: isActive ? 1000 : 1
      }}
      onClick={onFocus}
    >
      <div className="window-titlebar" onMouseDown={handleMouseDown}>
        <div className="titlebar-left">
          <i className="fab fa-chrome"></i>
          <span className="window-title">projects.html - Google Chrome</span>
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

      <div className="browser-toolbar">
        <button className="browser-btn">
          <i className="fas fa-arrow-left"></i>
        </button>
        <button className="browser-btn">
          <i className="fas fa-arrow-right"></i>
        </button>
        <button className="browser-btn">
          <i className="fas fa-redo"></i>
        </button>
        <button className="browser-btn">
          <i className="fas fa-home"></i>
        </button>
        <div className="browser-address">
          <i className="fas fa-globe"></i>
          <span>file:///C:/My%20Documents/My%20Portfolio/projects.html</span>
        </div>
      </div>

      <div className="browser-content">
        <Projects />
      </div>
    </div>
  )
}

export default BrowserWindow
