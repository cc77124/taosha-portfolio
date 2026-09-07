import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { EASE, reducedMotion } from '../lib/motion'

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    if (reducedMotion()) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.25 })

      tl.fromTo(
        '.hero-line',
        { yPercent: 132, scaleY: 0.55, transformOrigin: '50% 100%' },
        { yPercent: 0, scaleY: 1, duration: 1.6, ease: EASE, stagger: 0.16 },
      )
        .fromTo(
          '.hero-quote .cn',
          { y: 48, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.3, ease: EASE },
          0.9,
        )
        .fromTo(
          '.hero-quote .who',
          { y: 26, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.15, ease: EASE },
          1.15,
        )
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="hero" id="top" ref={rootRef}>
      <blockquote className="hero-quote">
        <p className="en">
          <span className="mask">
            <span className="mask-in hero-line">“Nothing great was</span>
          </span>
          <span className="mask">
            <span className="mask-in hero-line">ever achieved</span>
          </span>
          <span className="mask">
            <span className="mask-in hero-line">without enthusiasm.”</span>
          </span>
        </p>
        <p className="cn">没有热情，成就不了任何伟大的事。</p>
        <cite className="who">— Ralph Waldo Emerson 爱默生</cite>
      </blockquote>
    </section>
  )
}
