import { useEffect } from 'react'

// Shows [data-reveal] elements as they scroll into view.
// It also watches for elements added later (for example, when a filter changes).
export default function useReveal() {
  useEffect(() => {
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

    // Start watching every hidden [data-reveal] element on the page
    const watchNewElements = () => {
      document
        .querySelectorAll('[data-reveal]:not(.is-visible)')
        .forEach((el) => observer.observe(el))
    }

    watchNewElements()

    // Re-check whenever the page changes, so new cards get watched too
    const mutations = new MutationObserver(watchNewElements)
    mutations.observe(document.body, { childList: true, subtree: true })

    return () => {
      mutations.disconnect()
      observer.disconnect()
    }
  }, [])
}