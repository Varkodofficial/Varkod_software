import { founders } from '../config.js'

export default function Founders() {
  return (
    <section className="founders" id="team">
      <div className="container">
        <div className="founders__panel">
          <header className="founders__head" data-reveal>
            <div>
              <p className="founders__eyebrow">Founding team</p>
              <h2 className="founders__title">Meet the founders</h2>
            </div>
            <p className="founders__text">
              Four founders, one bond, one vision. Every project is led by the people
              who will also be there after launch.
            </p>
          </header>

          <div className="founders__grid">
            {founders.map((founder, i) => (
              <article
                className="founder"
                key={founder.photo}
                data-reveal
                style={{ '--d': `${i * 120}ms` }}
              >
                <div className="founder__frame">
                  <img
                    src={founder.photo}
                    alt={founder.name}
                    width="800"
                    height="1000"
                    loading="lazy"
                  />
                </div>

                <div className="founder__caption">
                  <h3 className="founder__name">{founder.name}</h3>
                  <p className="founder__role">{founder.role}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="founders__band" data-reveal>
            <p className="founders__band-title">One bond. One vision.</p>
            <p className="founders__band-text">Four founders · One standard</p>
          </div>
        </div>
      </div>
    </section>
  )
}