import { useEffect, useState } from 'react'
import './Projects.css'

function Projects() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  const webProjects = [
    {
      title: 'Kali Linux Portfolio',
      description: 'A unique portfolio website with Kali Linux terminal theme.',
      tags: ['HTML', 'CSS', 'JavaScript'],
      link: 'https://kali-linux-portfolio-virid.vercel.app/',
      icon: 'fas fa-globe',
      image: 'https://via.placeholder.com/600x400/1a1a1a/333333?text=Kali+Linux'
    },
    {
      title: 'Final Project 1',
      description: 'Web application project showcasing frontend development skills.',
      tags: ['HTML', 'CSS', 'JavaScript'],
      link: 'https://necrymoreno-final-proj1.vercel.app/',
      icon: 'fas fa-globe',
      image: 'https://via.placeholder.com/600x400/1a1a1a/333333?text=Final+Project'
    },
    {
      title: 'Final Boss RDBMS',
      description: 'Database management system project with full CRUD operations.',
      tags: ['PHP', 'MySQL', 'Bootstrap'],
      link: 'https://final-boss-rdbms.vercel.app/',
      icon: 'fas fa-database',
      image: 'https://via.placeholder.com/600x400/1a1a1a/333333?text=RDBMS+Project'
    }
  ]

  const figmaProjects = [
    {
      title: 'UI/UX Design Project',
      description: 'Modern user interface design with clean aesthetics.',
      link: 'https://www.figma.com/design/5AeMFNe3DlgWSRPqztVBsJ/Untitled?m=auto&t=ZFE4bbztlP0jRojN-1',
      icon: 'fab fa-figma',
      image: 'https://via.placeholder.com/600x400/1a1a1a/333333?text=Figma+Design+1'
    },
    {
      title: 'Activity 4 - Mobile Design',
      description: 'Mobile-first responsive design activity.',
      link: 'https://www.figma.com/design/aMCqloIduPPJroiCzEBklN/ACTIVITY-4?m=auto&t=ZFE4bbztlP0jRojN-1',
      icon: 'fab fa-figma',
      image: 'https://via.placeholder.com/600x400/1a1a1a/333333?text=Activity+4'
    },
    {
      title: 'Activity 3 - Web Design',
      description: 'Web interface design and prototyping activity.',
      link: 'https://www.figma.com/design/agqF3rk1S5jbxrXD1okFqk/ACTIVITY-3?m=auto&t=ZFE4bbztlP0jRojN-1',
      icon: 'fab fa-figma',
      image: 'https://via.placeholder.com/600x400/1a1a1a/333333?text=Activity+3'
    }
  ]

  return (
    <div className={`projects-page page ${loaded ? 'loaded' : ''}`}>
      <div className="container">
        <h1 className="section-title animate-item">Projects</h1>
        <p className="projects-intro animate-item">
          A selection of my web development projects and UI/UX designs.
        </p>
        
        <h2 className="projects-category animate-item">
          <i className="fas fa-code"></i> Web Development
        </h2>
        <div className="projects-grid">
          {webProjects.map((project, index) => (
            <a 
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              key={index} 
              className="project-card animate-item"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <div className="project-type-badge">
                <i className={project.icon}></i>
              </div>
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className="project-overlay">
                  <div className="project-actions">
                    <span className="project-link">
                      <i className="fas fa-external-link-alt"></i>
                      <span>View Live</span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="project-content">
                <h3 className="project-title">
                  <i className={project.icon}></i>
                  {project.title}
                </h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="project-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>

        <h2 className="projects-category animate-item">
          <i className="fab fa-figma"></i> UI/UX Designs
        </h2>
        <div className="projects-grid figma-grid">
          {figmaProjects.map((project, index) => (
            <a 
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              key={index} 
              className="project-card figma-card animate-item"
              style={{ animationDelay: `${0.5 + index * 0.1}s` }}
            >
              <div className="project-type-badge figma-badge">
                <i className={project.icon}></i>
              </div>
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className="project-overlay">
                  <div className="project-actions">
                    <span className="project-link figma-link">
                      <i className="fab fa-figma"></i>
                      <span>Open in Figma</span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="project-content">
                <h3 className="project-title">
                  <i className={project.icon}></i>
                  {project.title}
                </h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tags">
                  <span className="project-tag figma-tag">Figma</span>
                  <span className="project-tag figma-tag">UI/UX</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Projects
