import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setOpen(false)

  return (
    <header
      className={`nav${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}
    >
      <div className="container nav__inner">
        <Link to="/" className="nav__brand" onClick={closeMenu}>
          <img src="/assets/images/varkod-logo.png" alt="" className="nav__logo" />
          <span className="nav__name">VARKOD</span>
        </Link>

        <nav aria-label="Main navigation">
          <ul id="nav-links" className="nav__links">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `nav__link${isActive ? ' is-active' : ''}`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <Link to="/contact" className="btn btn--ghost nav__cta" onClick={closeMenu}>
          Let&apos;s talk
        </Link>

        <button
          type="button"
          className="nav__toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="nav-links"
          onClick={() => setOpen((prev) => !prev)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}
