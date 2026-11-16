
import { Link, useLocation } from 'react-router-dom'

// Temporary page for routes we have not designed yet
export default function ComingSoon() {
  const { pathname } = useLocation()

  const pageName =
    pathname
      .split('/')
      .filter(Boolean)
      .pop()
      ?.replace(/[-_]+/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase()) || 'Page'

  return (
    <main className="coming-soon">
      <div className="container coming-soon__inner">
        <p className="eyebrow">Coming next</p>
        <h1 className="display coming-soon__title">{pageName}</h1>
        <p className="section__text">
          This page is being crafted with the same care as everything else we build.
        </p>
        <Link to="/" className="btn btn--ghost">
          Back to home
        </Link>
      </div>
    </main>
  )
}
