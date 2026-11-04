import { useEffect } from 'react'
import { CONTACT_EMAIL, founders } from '../config.js'

// Big background word for each founder (keep in the same order as config.js)
const bigNames = ['KAVIN', 'RAAGUL', 'VAISHNAVA', 'RITHIK']

const missionVision = [
  {
    label: 'Our mission',
    text: 'To build software that is reliable, secure and simple to use, so that businesses and everyday people can trust the tools they depend on.',
  },
  {
    label: 'Our vision',
    text: 'To become a software partner that businesses grow with for years, not just for one launch.',
  },
]

const values = ['Ownership', 'Clarity', 'Quality', 'Long-term thinking']

const strengths = [
  {
    title: 'Different strengths, one direction',
    text: 'Our founders come from public service and administration, web development, systems engineering and planning. Those different paths give us a wider view of every problem we solve.',
  },
  {
    title: 'Clear ownership at every level',
    text: 'Each founder leads a clear area: direction, finance, delivery, and information and marketing. Every commitment has a name attached to it.',
  },
  {
    title: 'Built to last',
    text: 'We write clean, secure code and plan for growth from the start. We stay with you beyond launch, improving and supporting the system as your business grows.',
  },
]

export default function About() {
  // Reveal sections as they scroll into view
  useEffect(() => {
    const targets = document.querySelectorAll('[data-reveal]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    )
    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <main className="about">
      {/* ---------- HERO ---------- */}
      <section className="about-hero">
        <div className="container about-hero__grid">
          <div className="about-hero__copy">
            <p className="eyebrow about-hero__eyebrow">About VARKOD</p>
            <h1 className="about-hero__title">
              Four founders.
              <br />
              One bond.
              <br />
              One vision.
            </h1>
            <p className="about-hero__lead">
              VARKOD Software Solution was started by four founders who believe good
              software should be dependable, beautifully built and easy for people to use.
              We bring different strengths to the table, and that difference is what makes
              our team strong.
            </p>
          </div>

          <div className="about-hero__visual" aria-hidden="true">
            <span className="about-hero__glow" />
            <span className="about-hero__ring" />
            <span className="about-hero__slash" />
            <span className="about-hero__slash about-hero__slash--b" />
            <img
              className="about-hero__mark"
              src="/assets/images/varkod-logo.png"
              alt=""
            />
            <span className="about-hero__chip">Four founders · One bond</span>
          </div>
        </div>
      </section>

      {/* ---------- STORY ---------- */}
      <section className="about-section">
        <div className="container about-story">
          <header data-reveal>
            <p className="eyebrow">Our story</p>
            <h2 className="about-title">Started by four. Built on trust.</h2>
          </header>

          <div className="about-story__text" data-reveal>
            <p>
              VARKOD began with a simple conviction: good software should work as well
              for the people using it as it does for the business that owns it. Four
              founders came together to turn that conviction into a company. Each of us
              brings a different path and a different way of seeing problems, and we have
              chosen to build on that difference.
            </p>
            <p>
              We are a web and software team. We design and develop modern web
              applications with React, and build the systems behind them on MySQL, with
              a focus on clean structure, security and performance from the first line of
              code.
            </p>
            <p>
              Starting a company is a decision to stay accountable. We work openly, we
              review each other&apos;s work, and we stay with every project after launch.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- MISSION, VISION, VALUES ---------- */}
      <section className="about-section about-section--tint">
        <div className="container">
          <div className="about-cards">
            {missionVision.map((item, i) => (
              <article
                className="about-card"
                key={item.label}
                data-reveal
                style={{ '--d': `${i * 120}ms` }}
              >
                <p className="about-card__label">{item.label}</p>
                <p className="about-card__text">{item.text}</p>
              </article>
            ))}

            <article className="about-card" data-reveal style={{ '--d': '240ms' }}>
              <p className="about-card__label">Our values</p>
              <ul className="values">
                {values.map((value) => (
                  <li key={value}>{value}</li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* ---------- TEAM ---------- */}
      <section className="about-section" id="team">
        <div className="container">
          <header className="about-team__head" data-reveal>
            <p className="eyebrow">The team</p>
            <h2 className="about-title">Meet the four founders</h2>
            <p className="about-text">
              Each founder brings a different background and a clear area of
              responsibility.
            </p>
          </header>

          <div className="about-team">
            {founders.map((founder, i) => (
              <article className="profile" key={founder.photo} data-reveal>
                {/* Full-width name behind the person */}
                <p className="profile__bigname" aria-hidden="true">
                  {bigNames[i]}
                </p>

                <div className="profile__body">
                  <div className="profile__left">
                    <p className="profile__index">0{i + 1}</p>
                    <h3 className="profile__name">{founder.name}</h3>
                    <p className="profile__role">{founder.role}</p>
                    <p className="profile__focus">{founder.bio}</p>
                  </div>

                  {/* Photo in front, head overlaps the letters */}
                  <div className="profile__photo">
                    <img
                      src={founder.photo}
                      alt={founder.name}
                      width="800"
                      height="900"
                      loading="lazy"
                    />
                  </div>

                  <div className="profile__right">
                    <div className="profile__bg">
                      <p className="profile__bg-label">Professional background</p>
                      <p>{founder.background}</p>
                    </div>

                    <a
                      href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
                        `Message for ${founder.name}`,
                      )}`}
                      className="btn btn--solid profile__cta"
                    >
                      Message the founder <span className="btn__arrow">→</span>
                    </a>
                  </div>

                  <ul className="profile__chips">
                    {founder.traits.map((trait) => (
                      <li key={trait}>{trait}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- STRENGTH ---------- */}
      <section className="about-section about-section--tint">
        <div className="container">
          <header data-reveal>
            <p className="eyebrow">Why we are strong</p>
            <h2 className="about-title">One team. Three promises.</h2>
          </header>

          <div className="strengths">
            {strengths.map((item, i) => (
              <article
                className="strength"
                key={item.title}
                data-reveal
                style={{ '--d': `${i * 120}ms` }}
              >
                <span className="strength__num">0{i + 1}</span>
                <h3 className="strength__title">{item.title}</h3>
                <p className="strength__text">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CALL TO ACTION ---------- */}
      <section className="cta">
        <div className="container cta__inner" data-reveal>
          <p className="eyebrow">Work with us</p>
          <h2 className="cta__title">
            Let&apos;s build something
            <br />
            that lasts.
          </h2>
          <p className="section__text">
            Tell us about your idea. We will come back with a clear plan and honest next
            steps.
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