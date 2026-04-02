import { useState, useRef, useEffect } from 'react'
import './Window.css'

function Window({ title, icon, children, isActive, isMinimized, onClose, onMinimize, onFocus }) {
  const [position, setPosition] = useState({ x: 100, y: 80 })
  const [size, setSize] = useState({ width: 700, height: 500 })
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
      className={`xp-window ${isActive ? 'active' : ''}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        zIndex: isActive ? 1000 : 1
      }}
      onClick={onFocus}
    >
      <div className="window-titlebar" onMouseDown={handleMouseDown}>
        <div className="titlebar-left">
          {icon && <i className={`fas fa-${icon}`}></i>}
          <span className="window-title">{title}</span>
        </div>
        <div className="window-controls">
          <button className="window-btn minimize" onClick={onMinimize} title="Minimize">
            <span>_</span>
          </button>
          <button className="window-btn maximize" title="Maximize">
            <span>□</span>
          </button>
          <button className="window-btn close" onClick={onClose} title="Close">
            <span>✕</span>
          </button>
        </div>
      </div>
      <div className="window-content">
        {children}
      </div>
    </div>
  )
}

export default Window
