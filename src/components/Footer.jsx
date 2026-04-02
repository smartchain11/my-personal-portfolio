import './Footer.css'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer-container">
        <p>&copy; {currentYear} Moreno, Jun Dave. All rights reserved.</p>
        <div className="footer-social">
          <a href="#" className="social-icon"><i className="fab fa-github"></i></a>
          <a href="#" className="social-icon"><i className="fab fa-linkedin"></i></a>
          <a href="#" className="social-icon"><i className="fab fa-facebook"></i></a>
          <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
