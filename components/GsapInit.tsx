'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function GsapInit({ children }: { children: React.ReactNode }) {
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    // Page entrance animations
    const tl = gsap.timeline()

    tl.fromTo('.anim-header',
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
    )
    .fromTo('.anim-stats',
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: 'power2.out' },
      '-=0.2'
    )
    .fromTo('.anim-links',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
      '-=0.1'
    )
    .fromTo('.anim-category',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.15, ease: 'power2.out' },
      '-=0.1'
    )
    .fromTo('.anim-card',
      { opacity: 0, scale: 0.96 },
      { opacity: 1, scale: 1, duration: 0.35, stagger: 0.08, ease: 'power2.out' },
      '-=0.2'
    )
    .fromTo('.anim-footer',
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: 'power2.out' },
      '-=0.1'
    )
  }, [])

  return <>{children}</>
}
