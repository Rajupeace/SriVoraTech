import { useEffect, useRef, useState } from 'react'

export function useScrollAnimation(options = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Immediate check if element is already inside or near viewport on mount
    const checkImmediate = () => {
      const rect = element.getBoundingClientRect()
      if (rect.top <= window.innerHeight * 0.95 && rect.bottom >= 0) {
        setIsVisible(true)
        return true
      }
      return false
    }

    if (checkImmediate()) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(element)
        }
      },
      {
        threshold: options.threshold !== undefined ? options.threshold : 0.02,
        rootMargin: options.rootMargin || '100px 0px 50px 0px',
      }
    )

    observer.observe(element)

    // Safety fallback: if user scrolls or navigates, ensure reveal occurs
    const handleScrollCheck = () => {
      if (checkImmediate()) {
        observer.disconnect()
        window.removeEventListener('scroll', handleScrollCheck)
      }
    }
    window.addEventListener('scroll', handleScrollCheck, { passive: true })

    // Absolute timeout fallback so content never remains permanently stuck at low opacity
    const fallbackTimer = setTimeout(() => {
      setIsVisible(true)
      observer.disconnect()
      window.removeEventListener('scroll', handleScrollCheck)
    }, 1500)

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScrollCheck)
      clearTimeout(fallbackTimer)
    }
  }, [])

  return [ref, isVisible]
}
