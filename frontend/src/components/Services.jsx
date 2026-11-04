import { Link } from 'react-router-dom'
import useReveal from '../hooks/useReveal.js'
import { spotlightMove } from '../hooks/spotlight.js'

const services = [
  {
    index: '01',
    tag: 'Fast and light',
    title: 'Static websites',
    text: 'Clean, quick-loading pages for brands, portfolios, events and landing pages. Easy to keep up to date and easy for search engines to read.',
    best: 'Brochure sites, portfolios, event pages',
    points: ['Responsive', 'Search-friendly', 'Low running cost'],
  },
  {
    index: '02',
    tag: 'Data-driven',
    title: 'Dynamic web apps',
    text: 'Sites that respond to users and change with data. Logins, dashboards, bookings, order tracking and admin panels.',
    best: 'Portals, booking sites, member areas',
    points: ['Secure login', 'MySQL database', 'Admin panel'],
  },
  {
    index: '03',
    tag: 'Run your operations',
    title: 'Business systems',
    text: 'Software for stock, billing, staff records, customers and reports, designed around how your team already works.',
    best: 'Inventory, billing, staff management',
    points: ['Role-based access', 'Printable reports', 'Easy to extend'],
  },
  {
    index: '04',
    tag: 'Built for you',
    title: 'Custom software',
    text: 'When off-the-shelf tools do not fit, we design and build the software your process needs, from a clear plan to a working product.',
    best: 'Anything your process needs',
    points: ['Scoped from your processes', 'Clean, documented code'],
  },
  {
    index: '05',
    tag: 'We stay with you',
    title: 'Launch and support',
    text: 'Hosting setup, testing, deployment, maintenance, security updates and new features as your business grows.',
    best: 'Every project, from day one',
    points: ['Deployment', 'Security checks', 'Support plans'],
  },
]

const steps = [
  { title: 'Listen', text: 'We learn your goals, your customers and the problem you want solved.' },
  { title: 'Plan', text: 'We agree on scope, timeline and cost in plain language before any code is written.' },
  { title: 'Design', text: 'You see screens and flows early, so changes are quick and cheap.' },
  { title: 'Build', text: 'We build in stages and test on real phones and browsers.' },
  { title: 'Launch', text: 'We deploy, train your team and keep improving with you.' },
]

const marqueeItems = [
  'Static websites',
  'Dynamic web apps',
  'Business systems',
  'Custom software',
  'Launch and support',
]

export default function Services() {
  useReveal()

  return (
    <main>
      {/* ---------- HERO ---------- */}
      <section className="svc-hero">
        <div className="container">
          <p className="eyebrow" data-reveal>What we do</p>
          <h1 className="svc-hero__title" data-reveal>
            Services built around <em>how you work.</em>
          </h1>
          <p className="svc-hero__text" data-reveal>
            Whether you need a fast website that presents your brand or a secure system
            that runs your daily work, we plan it with you, build it cleanly and stay with
            you after launch.
          </p>
          <div className="svc-hero__actions" data-reveal>
            <Link to="/contact" className="btn btn--solid">
              Start a project <span className="btn__arrow">→</span>
            </Link>
            <Link to="/projects" className="btn btn--ghost">
              See our case studies
            </Link>
          </div>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i}>
              {item}
              <i className="marquee__dot" />
            </span>
          ))}
        </div>
      </div>

      {/* ---------- SERVICE CARDS ---------- */}
      <section className="section">
        <div className="container">
          <div className="svc-grid">
            {services.map((service, i) => (
              <article
                className="svc-card spot"
                key={service.title}
                data-reveal
                style={{ '--d': `${i * 100}ms` }}
                onPointerMove={spotlightMove}
              >
                <span className="svc-card__index">{service.index}</span>
                <p className="svc-card__tag">{service.tag}</p>
                <h2 className="svc-card__title">{service.title}</h2>
                <p className="svc-card__text">{service.text}</p>
                <p className="svc-card__best">
                  <span>Best for: </span>
                  {service.best}
                </p>
                <ul className="svc-card__points">
                  {service.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <span className="svc-card__line" aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- STATIC VS DYNAMIC ---------- */}
      <section className="svc-versus">
        <div className="container">
          <header className="svc-versus__head" data-reveal>
            <p className="eyebrow">Choosing the right approach</p>
            <h2 className="section__title">Static or dynamic? We will help you decide.</h2>
          </header>

          <div className="svc-versus__grid">
            <article className="svc-side" data-reveal>
              <p className="svc-side__label">Static website</p>
              <h3 className="svc-side__title">Information first</h3>
              <dl>
                <div className="svc-side__row">
                  <dt>Loads</dt>
                  <dd>Very fast, because every page is ready in advance.</dd>
                </div>
                <div className="svc-side__row">
                  <dt>Content</dt>
                  <dd>Updated now and then, not every day.</dd>
                </div>
                <div className="svc-side__row">
                  <dt>Users</dt>
                  <dd>Visitors read and browse, without accounts.</dd>
                </div>
                <div className="svc-side__row">
                  <dt>Best for</dt>
                  <dd>Brands, portfolios, landing pages and events.</dd>
                </div>
              </dl>
            </article>

            <article className="svc-side svc-side--dark" data-reveal style={{ '--d': '120ms' }}>
              <p className="svc-side__label">Dynamic application</p>
              <h3 className="svc-side__title">Action first</h3>
              <dl>
                <div className="svc-side__row">
                  <dt>Loads</dt>
                  <dd>Pages are built from live data, so they stay current.</dd>
                </div>
                <div className="svc-side__row">
                  <dt>Content</dt>
                  <dd>Your team manages it through an admin panel.</dd>
                </div>
                <div className="svc-side__row">
                  <dt>Users</dt>
                  <dd>Visitors sign in, book, order or track things.</dd>
                </div>
                <div className="svc-side__row">
                  <dt>Best for</dt>
                  <dd>Portals, dashboards, booking and business systems.</dd>
                </div>
              </dl>
            </article>
          </div>
        </div>
      </section>

      {/* ---------- PROCESS ---------- */}
      <section className="section">
        <div className="container">
          <header data-reveal>
            <p className="eyebrow">How we work</p>
            <h2 className="section__title">From first call to live product.</h2>
          </header>

          <ol className="svc-process" data-reveal>
            <span className="svc-process__line" aria-hidden="true" />
            {steps.map((step, i) => (
              <li className="svc-step" key={step.title}>
                <span className="svc-step__dot">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="svc-step__title">{step.title}</h3>
                <p className="svc-step__text">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="svc-cta">
        <div className="container svc-cta__inner" data-reveal>
          <h2 className="svc-cta__title">Not sure which service you need?</h2>
          <p className="section__text">
            Tell us about your goals and we will suggest the right approach, with no obligation.
          </p>
          <Link to="/contact" className="btn btn--solid">
            Talk to our founders <span className="btn__arrow">→</span>
          </Link>
        </div>
      </section>
    </main>
  )
}