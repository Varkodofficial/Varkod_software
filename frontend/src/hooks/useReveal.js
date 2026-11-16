
import { useEffect } from 'react'

// Reveals [data-reveal] elements as they enter the viewport.
// Also observes elements added dynamically to the page.
export default function useReveal() {
  useEffect(() => {
    // Fallback for browsers without IntersectionObserver support
    if (!('IntersectionObserver' in window)) {
      document
        .querySelectorAll('[data-reveal]')
        .forEach((el) => el.classList.add('is-visible'))

      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      },
    )

    // Observe all elements that have not yet been revealed
    const watchNewElements = () => {
      document
        .querySelectorAll('[data-reveal]:not(.is-visible)')
        .forEach((el) => observer.observe(el))
    }

    watchNewElements()

    // Detect dynamically added elements
    const mutations = new MutationObserver(() => {
      watchNewElements()
    })

    mutations.observe(document.body, {
      childList: true,
      subtree: true,
    })

    return () => {
      mutations.disconnect()
      observer.disconnect()
    }
  }, [])
}
