import './Projects.css'

function Projects() {
  const projects = [
    {
      title: 'Project Title 1',
      description: 'Brief description of your project. Add your web domain and download links.',
      image: 'https://via.placeholder.com/600x400/667eea/ffffff?text=Project+1',
      tags: ['ReactJS', 'Vite', 'Java'],
      liveUrl: '#',
      downloadUrl: '#'
    },
    {
      title: 'Project Title 2',
      description: 'Brief description of your project. Add your web domain and download links.',
      image: 'https://via.placeholder.com/600x400/f093fb/ffffff?text=Project+2',
      tags: ['PHP', 'MySQL', 'Bootstrap'],
      liveUrl: '#',
      downloadUrl: '#'
    },
    {
      title: 'Project Title 3',
      description: 'Brief description of your project. Add your web domain and download links.',
      image: 'https://via.placeholder.com/600x400/4facfe/ffffff?text=Project+3',
      tags: ['C#', '.NET', 'SQL Server'],
      liveUrl: '#',
      downloadUrl: '#'
    },
    {
      title: 'Project Title 4',
      description: 'Brief description of your project. Add your web domain and download links.',
      image: 'https://via.placeholder.com/600x400/a8e063/ffffff?text=Project+4',
      tags: ['Java', 'Spring Boot', 'React'],
      liveUrl: '#',
      downloadUrl: '#'
    },
    {
      title: 'Project Title 5',
      description: 'Brief description of your project. Add your web domain and download links.',
      image: 'https://via.placeholder.com/600x400/ff6b6b/ffffff?text=Project+5',
      tags: ['C++', 'Qt', 'SQLite'],
      liveUrl: '#',
      downloadUrl: '#'
    },
    {
      title: 'Project Title 6',
      description: 'Brief description of your project. Add your web domain and download links.',
      image: 'https://via.placeholder.com/600x400/ffd93d/ffffff?text=Project+6',
      tags: ['HTML', 'CSS', 'JavaScript'],
      liveUrl: '#',
      downloadUrl: '#'
    }
  ]

  return (
    <section className="projects" id="projects">
      <div className="container">
        <h2 className="section-title">My Projects</h2>
        <p className="projects-subtitle">Explore my web applications and downloadable frameworks</p>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="project-image">
                <img src={project.image} alt={project.title} />
              </div>
              <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="tag">{tag}</span>
                  ))}
                </div>
                <div className="project-actions">
                  <a href={project.liveUrl} className="project-btn" target="_blank" rel="noopener noreferrer">
                    <i className="fas fa-globe"></i> Live Demo
                  </a>
                  <a href={project.downloadUrl} className="project-btn" download>
                    <i className="fas fa-file-archive"></i> Download
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
