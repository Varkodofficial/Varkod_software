import { useEffect, useState } from 'react'

const MIN_DURATION = 3000 // ms the loader stays on screen at minimum
const REDUCED_DURATION = 600 // shorter wait for users who prefer less motion
const EXIT_DURATION = 1000 // ms for the split-panel exit (matches loader.css)
const BAR_COUNT = 26

// Deterministic "barcode" heights, so the intro looks the same on every visit
const BARS = Array.from({ length: BAR_COUNT }, (_, i) => ({
  h: `${Math.round(24 + (Math.sin(i * 1.73) * 0.5 + 0.5) * 60 + (i % 3) * 6)}px`,
  d: `${i * 40}ms`,
}))

export default function Loader({ onFinish }) {
  const [loaded, setLoaded] = useState(() => document.readyState === 'complete')
  const [minTimeDone, setMinTimeDone] = useState(false)
  const [removed, setRemoved] = useState(false)

  // The loader leaves only when BOTH the minimum time has passed AND the page has loaded
  const exiting = loaded && minTimeDone

  // Lock scrolling while the intro is visible
  useEffect(() => {
    document.body.classList.add('is-loading')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const timer = setTimeout(
      () => setMinTimeDone(true),
      reduce ? REDUCED_DURATION : MIN_DURATION,
    )
    return () => {
      clearTimeout(timer)
      document.body.classList.remove('is-loading')
    }
  }, [])

  // Wait for the page's own load event if it hasn't fired yet
  useEffect(() => {
    if (loaded) return
    const onLoad = () => setLoaded(true)
    window.addEventListener('load', onLoad)
    return () => window.removeEventListener('load', onLoad)
  }, [loaded])

  // After the exit animation, unmount the loader
  useEffect(() => {
    if (!exiting) return
    const timer = setTimeout(() => {
      setRemoved(true)
      onFinish?.()
    }, EXIT_DURATION)
    return () => clearTimeout(timer)
  }, [exiting, onFinish])

  if (removed) return null

  return (
    <div
      className={`loader${exiting ? ' is-exiting' : ''}`}
      role="status"
      aria-label="Loading VARKOD"
    >
      <div className="loader__panel loader__panel--top" />
      <div className="loader__panel loader__panel--bottom" />

      <div className="loader__content">
        <div className="loader__stage">
          <div className="loader__bars">
            {BARS.map((bar, i) => (
              <span
                key={i}
                className="loader__bar"
                style={{ '--h': bar.h, '--d': bar.d }}
              />
            ))}
          </div>
          <span className="loader__scan" />
          <img
            className="loader__logo"
            src="/assets/images/varkod-logo.png"
            alt="VARKOD"
          />
        </div>

        <p className="loader__tag">One Bond One Vision</p>

        <div className="loader__progress">
          <span />
        </div>
      </div>
    </div>
  )
}
