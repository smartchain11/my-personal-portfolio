import { useEffect, useRef, useState } from 'react'
import './Skills.css'

function Skills() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  const skills = [
    {
      icon: 'fas fa-tools',
      title: 'Computer System Servicing',
      description: 'Hardware Diagnostics, System Repair, Installation & Configuration, Maintenance',
      progress: 85
    },
    {
      icon: 'fas fa-network-wired',
      title: 'Networking',
      description: 'Network Troubleshooting, Network Setup, LAN/WAN Configuration, Router Management',
      progress: 80
    },
    {
      icon: 'fab fa-figma',
      title: 'Mobile App Design',
      description: 'Figma, UI/UX Design, Prototyping, Mobile Interface Design',
      progress: 75
    },
    {
      icon: 'fab fa-html5',
      title: 'Web Development',
      description: 'HTML, CSS, JavaScript, ReactJS, Vite, Bootstrap, Tailwind CSS',
      progress: 88
    },
    {
      icon: 'fas fa-code',
      title: 'Backend & Databases',
      description: 'PHP, MySQL, Node.js, Express, REST APIs, Laravel',
      progress: 82
    },
    {
      icon: 'fas fa-terminal',
      title: 'Programming Languages',
      description: 'C, C++, C#, Java, Assembly x86_64, Spring Boot, .NET Framework',
      progress: 78
    }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section className="skills" id="skills" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">Skills & Expertise</h2>
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div key={index} className="skill-card" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="skill-icon">
                <i className={skill.icon}></i>
              </div>
              <h3>{skill.title}</h3>
              <p>{skill.description}</p>
              <div className="skill-bar">
                <div 
                  className="skill-progress" 
                  style={{ width: isVisible ? `${skill.progress}%` : '0%' }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
