import { useEffect, useState } from 'react'
import './Skills.css'

function Skills() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  const techLogos = [
    { name: 'HTML5', icon: 'fab fa-html5', color: '#e34f26' },
    { name: 'CSS3', icon: 'fab fa-css3-alt', color: '#1572b6' },
    { name: 'JavaScript', icon: 'fab fa-js-square', color: '#f7df1e' },
    { name: 'React', icon: 'fab fa-react', color: '#61dafb' },
    { name: 'Node.js', icon: 'fab fa-node-js', color: '#339933' },
    { name: 'Python', icon: 'fab fa-python', color: '#3776ab' },
    { name: 'Java', icon: 'fab fa-java', color: '#007396' },
    { name: 'PHP', icon: 'fab fa-php', color: '#777bb4' },
    { name: 'Laravel', icon: 'fab fa-laravel', color: '#ff2d20' },
    { name: 'Bootstrap', icon: 'fab fa-bootstrap', color: '#7952b3' },
    { name: 'Git', icon: 'fab fa-git-alt', color: '#f05032' },
    { name: 'GitHub', icon: 'fab fa-github', color: '#ffffff' },
    { name: 'Figma', icon: 'fab fa-figma', color: '#f24e1e' },
    { name: 'Linux', icon: 'fab fa-linux', color: '#fcc624' },
    { name: 'Docker', icon: 'fab fa-docker', color: '#2496ed' },
    { name: 'Database', icon: 'fas fa-database', color: '#4479a1' },
  ]

  const skills = [
    {
      category: 'Frontend',
      items: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Vite', 'Tailwind CSS', 'Bootstrap']
    },
    {
      category: 'Backend',
      items: ['PHP', 'Node.js', 'Express', 'Laravel', 'REST APIs', 'MySQL']
    },
    {
      category: 'Languages',
      items: ['C', 'C++', 'C#', 'Java', 'Python', 'Assembly x86_64']
    },
    {
      category: 'Tools & Others',
      items: ['Git', 'Figma', 'VS Code', '.NET', 'Spring Boot', 'Network Troubleshooting']
    }
  ]

  return (
    <div className={`skills-page page ${loaded ? 'loaded' : ''}`}>
      {/* Marquee Tech Logos */}
      <div className="tech-marquee-wrapper">
        <div className="tech-marquee">
          <div className="tech-marquee-content">
            {[...techLogos, ...techLogos].map((tech, index) => (
              <div key={index} className="tech-logo-item">
                <i className={tech.icon} style={{ color: tech.color }}></i>
                <span>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="tech-marquee reverse">
          <div className="tech-marquee-content">
            {[...techLogos, ...techLogos].reverse().map((tech, index) => (
              <div key={index} className="tech-logo-item">
                <i className={tech.icon} style={{ color: tech.color }}></i>
                <span>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container">
        <h1 className="section-title animate-item">Skills</h1>
        
        <div className="skills-grid">
          {skills.map((skillGroup, index) => (
            <div 
              key={index} 
              className="skill-category animate-item"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <h3 className="category-title">{skillGroup.category}</h3>
              <div className="skill-tags">
                {skillGroup.items.map((skill, skillIndex) => (
                  <span key={skillIndex} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="expertise-section animate-item">
          <h2 className="expertise-title">Areas of Expertise</h2>
          <div className="expertise-grid">
            <div className="expertise-item">
              <div className="expertise-icon">
                <i className="fas fa-tools"></i>
              </div>
              <h4>System Servicing</h4>
              <p>Hardware diagnostics, system repair, installation and maintenance</p>
            </div>
            <div className="expertise-item">
              <div className="expertise-icon">
                <i className="fas fa-network-wired"></i>
              </div>
              <h4>Networking</h4>
              <p>LAN/WAN configuration, router management, troubleshooting</p>
            </div>
            <div className="expertise-item">
              <div className="expertise-icon">
                <i className="fas fa-code"></i>
              </div>
              <h4>Web Development</h4>
              <p>Full-stack development with modern frameworks and tools</p>
            </div>
            <div className="expertise-item">
              <div className="expertise-icon">
                <i className="fas fa-mobile-alt"></i>
              </div>
              <h4>UI/UX Design</h4>
              <p>Mobile and web interface design using Figma</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Skills
