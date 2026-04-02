import './ThemeToggle.css'

function ThemeToggle({ theme, toggleTheme }) {
  return (
    <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
      <div className="toggle-track">
        <i className="fas fa-sun sun-icon"></i>
        <i className="fas fa-moon moon-icon"></i>
        <div className={`toggle-thumb ${theme}`}></div>
      </div>
    </button>
  )
}

export default ThemeToggle
