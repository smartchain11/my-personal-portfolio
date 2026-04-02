import { useState, useRef, useEffect } from 'react'
import './FolderWindow.css'

function FolderWindow({ title, isActive, isMinimized, onClose, onMinimize, onFocus, onFileOpen }) {
  const [position, setPosition] = useState({ x: 120, y: 100 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const windowRef = useRef(null)

  const files = [
    { name: 'about.doc', icon: 'fas fa-file-word', color: '#2B579A', type: 'word' },
    { name: 'skills.doc', icon: 'fas fa-file-word', color: '#2B579A', type: 'word' },
    { name: 'projects.html', icon: 'fas fa-chrome', color: '#4285F4', type: 'html' },
    { name: 'resume.pdf', icon: 'fas fa-file-pdf', color: '#E53935', type: 'pdf' },
    { name: 'contact.doc', icon: 'fas fa-file-word', color: '#2B579A', type: 'word' }
  ]

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
      className={`folder-window ${isActive ? 'active' : ''}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: isActive ? 1000 : 1
      }}
      onClick={onFocus}
    >
      <div className="window-titlebar" onMouseDown={handleMouseDown}>
        <div className="titlebar-left">
          <i className="fas fa-folder"></i>
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

      <div className="folder-toolbar">
        <button className="toolbar-btn">
          <i className="fas fa-arrow-left"></i> Back
        </button>
        <button className="toolbar-btn">
          <i className="fas fa-arrow-right"></i> Forward
        </button>
        <button className="toolbar-btn">
          <i className="fas fa-arrow-up"></i>
        </button>
        <div className="folder-address">
          <i className="fas fa-folder"></i>
          <span>C:\My Documents\My Portfolio</span>
        </div>
      </div>

      <div className="folder-content">
        <div className="file-grid">
          {files.map((file, index) => (
            <div
              key={index}
              className="file-item"
              onDoubleClick={() => onFileOpen(file.name)}
            >
              <div className="file-icon">
                <i className={file.icon} style={{ color: file.color }}></i>
              </div>
              <div className="file-name">{file.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="folder-statusbar">
        {files.length} object(s)
      </div>
    </div>
  )
}

export default FolderWindow
