import './Desktop.css'

function Desktop({ onIconClick }) {
  return (
    <div className="xp-desktop">
      <div className="desktop-icons">
        <div
          className="desktop-icon"
          onDoubleClick={() => onIconClick('portfolio-folder')}
        >
          <div className="icon-image">
            <i className="fas fa-folder" style={{ color: '#FFD93D' }}></i>
          </div>
          <div className="icon-label">My Portfolio</div>
        </div>
      </div>
    </div>
  )
}

export default Desktop
