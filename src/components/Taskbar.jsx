import './Taskbar.css'

function Taskbar({ openWindows, activeWindow, minimizedWindows, onTaskbarClick, showStart, onStartClick, onStartItemClick }) {
  const getTime = () => {
    const now = new Date()
    return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  }

  const getWindowTitle = (windowId) => {
    if (windowId === 'portfolio-folder') return 'My Portfolio'
    if (windowId.includes('browser-projects')) return 'projects.html - Google Chrome'
    if (windowId.includes('about.doc')) return 'about.doc'
    if (windowId.includes('skills.doc')) return 'skills.doc'
    if (windowId.includes('resume.pdf')) return 'resume.pdf'
    if (windowId.includes('contact.doc')) return 'contact.doc'
    return 'Window'
  }

  return (
    <>
      {showStart && (
        <div className="start-menu">
          <div className="start-header">
            <div className="start-user">
              <i className="fas fa-user-circle"></i>
              <span>Portfolio User</span>
            </div>
          </div>
          <div className="start-items">
            <div className="start-item" onClick={() => onStartItemClick('portfolio-folder')}>
              <i className="fas fa-folder"></i>
              <span>My Portfolio</span>
            </div>
            <div className="start-separator"></div>
            <div className="start-item">
              <i className="fas fa-cog"></i>
              <span>Control Panel</span>
            </div>
            <div className="start-item">
              <i className="fas fa-question-circle"></i>
              <span>Help and Support</span>
            </div>
          </div>
          <div className="start-footer">
            <div className="start-item shutdown">
              <i className="fas fa-power-off"></i>
              <span>Turn Off Computer</span>
            </div>
          </div>
        </div>
      )}

      <div className="xp-taskbar">
        <button className="start-button" onClick={onStartClick}>
          <img src="https://i.imgur.com/R4zSvU0.png" alt="Start" />
          <span>start</span>
        </button>

        <div className="taskbar-tasks">
          {openWindows.map((windowId) => (
            <button
              key={windowId}
              className={`task-button ${activeWindow === windowId && !minimizedWindows.includes(windowId) ? 'active' : ''}`}
              onClick={() => onTaskbarClick(windowId)}
            >
              <span>{getWindowTitle(windowId)}</span>
            </button>
          ))}
        </div>

        <div className="system-tray">
          <i className="fas fa-volume-up"></i>
          <i className="fas fa-network-wired"></i>
          <div className="tray-clock">{getTime()}</div>
        </div>
      </div>
    </>
  )
}

export default Taskbar
