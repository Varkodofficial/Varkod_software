import { Link } from 'react-router-dom'
import { CONTACT_EMAIL, PHONE_NUMBER } from '../config.js'

export default function Footer() {
  const phoneHref = `tel:${PHONE_NUMBER.replace(/\s+/g, '')}`

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <img src="/assets/images/varkod-logo.png" alt="" className="footer__logo" />
          <div>
            <p className="footer__name">VARKOD Software Solution</p>
            <p className="footer__tag">One bond. One vision.</p>
          </div>
        </div>

        <div className="footer__contact">
          <p className="footer__label">Get in touch</p>
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          <a href={phoneHref}>{PHONE_NUMBER}</a>
        </div>

        <nav className="footer__nav" aria-label="Footer navigation">
          <p className="footer__label">Explore</p>
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        <p className="footer__copy">
          © {new Date().getFullYear()} VARKOD Software Solution. All rights reserved.
        </p>
      </div>
    </footer>
  )
}