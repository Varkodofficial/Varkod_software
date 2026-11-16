
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { CONTACT_EMAIL } from '../config.js'
import useReveal from '../hooks/useReveal.js'
import { spotlightMove } from '../hooks/spotlight.js'
import Founders from './Founders.jsx'

const marqueeItems = [
  'One Bond',
  'One Vision',
  'Static Websites',
  'Dynamic Apps',
  'Business Systems',
  'Clean Code',
  'Built To Scale',
]

const services = [
  {
    title: 'Web applications',
    text: 'Fast, responsive React experiences that feel effortless on every screen, from phones to large monitors.',
    tags: ['React', 'Responsive', 'Fast loading'],
    size: 'wide',
  },
  {
    title: 'Business systems',
    text: 'Secure admin panels, dashboards and data workflows powered by MySQL and shaped around how your team works.',
    tags: ['MySQL', 'Admin panel'],
    size: 'narrow',
  },
  {
    title: 'Custom software',
    text: 'Tailor-made solutions designed from your real processes, never from a generic template.',
    tags: ['Tailored', 'Scalable'],
    size: 'narrow',
  },
  {
    title: 'Launch and support',
    text: 'We stay with you after launch with hosting, maintenance, security updates and room to grow.',
    tags: ['Hosting', 'Maintenance', 'Growth'],
    size: 'wide',
  },
]

// theme: 'cream' | 'dark' | 'outline' (picks the card colours in home-pillars.css)
const pillars = [
  {
    theme: 'cream',
    title: 'One bond, one standard',
    text: 'Four founders who care about the same outcome. Your project is never handed off to strangers.',
  },
  {
    theme: 'dark',
    title: 'Clean, secure foundations',
    text: 'Structured code, validated inputs and proper authentication from day one, not as an afterthought.',
  },
  {
    theme: 'outline',
    title: 'Built to grow',
    text: 'Start with what you need today and expand tomorrow without rebuilding the foundation.',
  },
]

// Sample case studies. Replace these with your real projects.
const showcase = [
  {
    mark: 'BK',
    type: 'Static website',
    title: 'Neighbourhood bakery website',
    line: 'Mobile-first menu, opening hours and click-to-call for a local bakery.',
    visual: 'a',
  },
  {
    mark: 'TC',
    type: 'Dynamic app',
    title: 'Tuition enrolment portal',
    line: 'Online batch enrolment with student login and an admin panel.',
    visual: 'b',
  },
  {
    mark: 'WS',
    type: 'Dynamic app',
    title: 'Warehouse stock manager',
    line: 'Live stock in and out, low-stock alerts and printable reports.',
    visual: 'c',
  },
  {
    mark: 'EV',
    type: 'Static website',
    title: 'One-week event landing page',
    line: 'A fast, shareable page with schedule and registration in one place.',
    visual: 'd',
  },
]

const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M7 17L17 7M9 7h8v8"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default function Home() {
  useReveal()
  const visualRef = useRef(null)

  // Gentle 3D tilt of the logo that follows the mouse (desktop only)
  const handlePointerMove = (e) => {
    const el = visualRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()

    if (!rect.width || !rect.height) return

    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    el.style.setProperty('--ry', `${(x * 14).toFixed(2)}deg`)
    el.style.setProperty('--rx', `${(-y * 12).toFixed(2)}deg`)
  }

  const handlePointerLeave = () => {
    const el = visualRef.current
    if (!el) return

    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
  }

  return (
    <main>
      {/* ---------- HERO ---------- */}
      <section className="hero" id="top">
        <div className="container hero__grid">
          <div className="hero__copy">
            <p className="eyebrow hero__eyebrow">
              VARKOD Software Solution
            </p>

            <h1 className="hero__title">
              <span className="line">
                <span style={{ '--i': 0 }}>We engineer</span>
              </span>
              <span className="line">
                <span style={{ '--i': 1 }}>software that</span>
              </span>
              <span className="line">
                <span style={{ '--i': 2 }}>
                  <em>lasts.</em>
                </span>
              </span>
            </h1>

            <p className="hero__lead">
              Four founders. One standard. We design, build and support web platforms
              that are fast, secure and built to grow with your business, from the
              first line of code to the day you scale.
            </p>

            <div className="hero__actions">
              <a href={`mailto:${CONTACT_EMAIL}`} className="btn btn--solid">
                Start your project <span className="btn__arrow">→</span>
              </a>

              <Link to="/projects" className="btn btn--ghost">
                View our work
              </Link>
            </div>

            <ul className="hero__meta">
              <li>Founder-led</li>
              <li>Secure by design</li>
              <li>Built to scale</li>
            </ul>
          </div>

          <div
            className="hero__visual"
            ref={visualRef}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
          >
            <div className="hero__halo" aria-hidden="true" />

            <div className="hero__logo-float">
              <img
                className="hero__logo"
                src="/assets/images/varkod-logo.png"
                alt="VARKOD logo"
                width="602"
                height="396"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </div>

            <div className="hero__badge" aria-hidden="true">
              <svg className="hero__badge-ring" viewBox="0 0 200 200">
                <defs>
                  <path
                    id="badge-circle"
                    d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0"
                  />
                </defs>
                <text>
                  <textPath
                    href="#badge-circle"
                    textLength="486"
                    lengthAdjust="spacing"
                  >
                    VARKOD SOFTWARE SOLUTION • ONE BOND ONE VISION •
                  </textPath>
                </text>
              </svg>

              <svg
                className="hero__badge-arrow"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M7 17L17 7M9 7h8v8"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- MARQUEE ---------- */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={`${item}-${i}`}>
              {item}
              <i className="marquee__dot" />
            </span>
          ))}
        </div>
      </div>

      {/* ---------- SERVICES (bento cards) ---------- */}
      <section className="section" id="services">
        <div className="container">
          <header className="section__head" data-reveal>
            <p className="eyebrow">What we build</p>
            <h2 className="section__title">
              Built for ambition.
              <br />
              Engineered for reliability.
            </h2>
          </header>

          <div className="bento">
            {services.map((service, i) => (
              <article
                key={service.title}
                className={`bento__card bento__card--${service.size} spot`}
                data-reveal
                style={{ '--d': `${i * 120}ms` }}
                onPointerMove={spotlightMove}
              >
                <div className="bento__top">
                  <span className="bento__index">0{i + 1}</span>
                  <span className="bento__arrow">
                    <Arrow />
                  </span>
                </div>

                <h3 className="bento__title">{service.title}</h3>
                <p className="bento__text">{service.text}</p>

                <ul className="bento__tags">
                  {service.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- WHY VARKOD (cards) ---------- */}
      <section className="section section--split" id="why">
        <div className="container">
          <div data-reveal>
            <p className="eyebrow">Why VARKOD</p>
            <h2 className="section__title">
              Four minds.
              <br />
              One bond. One vision.
            </h2>
          </div>

          <div className="pillar-grid">
            {pillars.map((pillar, i) => (
              <article
                className={`pillar-card pillar-card--${pillar.theme} spot`}
                key={pillar.title}
                data-reveal
                style={{ '--d': `${i * 140}ms` }}
                onPointerMove={spotlightMove}
              >
                <span className="pillar-card__num">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="pillar-card__title">{pillar.title}</h3>
                <p className="pillar-card__text">{pillar.text}</p>
                <span className="pillar-card__bar" aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- FOUNDERS ---------- */}
      <Founders />

      {/* ---------- PROJECTS SHOWCASE (horizontal track) ---------- */}
      <section className="showcase" id="projects">
        <div className="container">
          <header className="showcase__head" data-reveal>
            <div>
              <p className="eyebrow">Selected work</p>
              <h2 className="section__title">
                Case studies
                <br />
                from our desk.
              </h2>
            </div>

            <Link to="/projects" className="showcase__all">
              View all case studies <span>→</span>
            </Link>
          </header>

          <div
            className="showcase__track"
            role="list"
            aria-label="Case studies"
          >
            {showcase.map((project, i) => (
              <article
                key={project.title}
                role="listitem"
                className="showcase__card"
                data-reveal
                style={{ '--d': `${i * 120}ms` }}
              >
                <div
                  className={`showcase__visual showcase__visual--${project.visual}`}
                  aria-hidden="true"
                >
                  <span className="showcase__mark">{project.mark}</span>
                </div>

                <div className="showcase__body">
                  <p className="showcase__type">{project.type}</p>
                  <h3 className="showcase__title">{project.title}</h3>
                  <p className="showcase__line">{project.line}</p>
                </div>
              </article>
            ))}
          </div>

          <p className="showcase__hint" aria-hidden="true">
            Scroll sideways to see more →
          </p>
        </div>
      </section>

      {/* ---------- CALL TO ACTION ---------- */}
      <section className="cta" id="contact">
        <div className="container cta__inner" data-reveal>
          <p className="eyebrow">Let&apos;s build together</p>

          <h2 className="cta__title">
            Ready to build
            <br />
            something that lasts?
          </h2>

          <p className="section__text">
            Share your idea with us. We will come back with a clear plan, a realistic
            timeline and honest next steps.
          </p>

          <div className="cta__actions">
            <a href={`mailto:${CONTACT_EMAIL}`} className="btn btn--solid">
              Start the conversation <span className="btn__arrow">→</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
