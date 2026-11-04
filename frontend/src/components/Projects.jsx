import { useState } from 'react'
import { Link } from 'react-router-dom'
import useReveal from '../hooks/useReveal.js'
import { spotlightMove } from '../hooks/spotlight.js'

// Sample case studies. Replace these with your real projects.
// theme: 'paper' | 'forest' | 'lime' | 'split'
const projects = [
  {
    id: 1,
    type: 'Static',
    theme: 'paper',
    mark: 'BK',
    title: 'Neighbourhood bakery website',
    client: 'Local food business',
    challenge:
      'Customers kept calling to ask for opening hours and today’s menu, and the old page was hard to read on phones.',
    built: ['Mobile-first one-page website', 'Menu section and opening hours', 'Map link and click-to-call button', 'Simple contact form'],
    stack: ['React', 'Vite', 'CSS'],
  },
  {
    id: 2,
    type: 'Dynamic',
    theme: 'forest',
    mark: 'TC',
    title: 'Tuition centre enrolment portal',
    client: 'Education provider',
    challenge:
      'Students joined batches through phone calls and paper forms, which made tracking seats slow and error-prone.',
    built: ['Online enrolment and batch selection', 'Student and staff login', 'Admin panel to manage batches and seats', 'Confirmation emails after enrolment'],
    stack: ['React', 'Express', 'MySQL'],
  },
  {
    id: 3,
    type: 'Dynamic',
    theme: 'lime',
    mark: 'WS',
    title: 'Warehouse stock manager',
    client: 'Small distribution team',
    challenge: 'Stock levels lived in spreadsheets, so fast-moving items ran out without any warning.',
    built: ['Product records with categories', 'Stock in and stock out log', 'Low-stock alerts on the dashboard', 'Printable monthly reports'],
    stack: ['React', 'Express', 'MySQL'],
  },
  {
    id: 4,
    type: 'Static',
    theme: 'split',
    mark: 'EV',
    title: 'One-week event landing page',
    client: 'Community event',
    challenge:
      'The event needed a fast, shareable page within a week, with the schedule and registration in one place.',
    built: ['Single-page site with schedule and speakers', 'Registration link and countdown', 'Fast loading on mobile networks', 'Clean social preview when shared'],
    stack: ['React', 'Vite'],
  },
]

const filters = [
  { value: 'All', label: 'All work' },
  { value: 'Static', label: 'Static websites' },
  { value: 'Dynamic', label: 'Dynamic apps' },
]

export default function Projects() {
  useReveal()
  const [filter, setFilter] = useState('All')
  const [openId, setOpenId] = useState(null)

  const visible = filter === 'All' ? projects : projects.filter((p) => p.type === filter)

  const changeFilter = (value) => {
    setFilter(value)
    setOpenId(null)
  }

  return (
    <main>
      {/* ---------- HERO ---------- */}
      <section className="pj-hero">
        <div className="container">
          <p className="eyebrow">Our work</p>
          <h1 className="pj-hero__title">
            Case studies that show how we think.
          </h1>
          <p className="pj-hero__text">
            Each project starts with a real problem. Open a card to see what we found, what we
            built and which tools we chose.
          </p>
        </div>
      </section>

      {/* ---------- FILTER + GRID ---------- */}
      <section className="pj-list">
        <div className="container">
          <div className="pj-tabs" role="tablist">
            {filters.map((f) => (
              <button
                key={f.value}
                type="button"
                role="tab"
                aria-selected={filter === f.value}
                className={`pj-tab${filter === f.value ? ' is-active' : ''}`}
                onClick={() => changeFilter(f.value)}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="pj-grid">
            {visible.map((project, i) => {
              const isOpen = openId === project.id
              const isFeatured = filter === 'All' && i === 0

              return (
                // The wrapper carries the reveal animation. React never changes its class,
                // so the card stays visible when it opens or the filter changes.
                <div
                  key={project.id}
                  className="pj-slot"
                  data-reveal
                  data-featured={isFeatured ? 'true' : undefined}
                  style={{ '--d': `${i * 100}ms` }}
                >
                  <article
                    className={`pc-card pc-card--${project.theme} spot${isOpen ? ' is-open' : ''}`}
                    onPointerMove={spotlightMove}
                  >
                    <header className="pc-head">
                      <span className="pc-chip">
                        {project.type === 'Static' ? 'Static website' : 'Dynamic app'}
                      </span>
                      <span className="pc-num">{String(project.id).padStart(2, '0')}</span>
                    </header>

                    <div className="pc-mark" aria-hidden="true">{project.mark}</div>

                    <div className="pc-body">
                      <h2 className="pc-title">{project.title}</h2>
                      <p className="pc-client">{project.client}</p>
                      <p className="pc-summary">{project.challenge}</p>

                      <div className="pc-more">
                        <div className="pc-more__inner">
                          <p className="pc-label">What we built</p>
                          <ul className="pc-list">
                            {project.built.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                          <ul className="pc-tags">
                            {project.stack.map((tool) => (
                              <li key={tool}>{tool}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="pc-toggle"
                        aria-expanded={isOpen}
                        onClick={() => setOpenId(isOpen ? null : project.id)}
                      >
                        {isOpen ? 'Close case study' : 'Open case study'}
                        <span aria-hidden="true">→</span>
                      </button>
                    </div>
                  </article>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="pj-cta">
        <div className="container pj-cta__inner" data-reveal>
          <h2 className="pj-cta__title">Have a project in mind?</h2>
          <p className="section__text">
            Tell us what you want to build. It could be the next case study we share here.
          </p>
          <Link to="/contact" className="btn btn--solid">
            Start your project <span className="btn__arrow">→</span>
          </Link>
        </div>
      </section>
    </main>
  )
}