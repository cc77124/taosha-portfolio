import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { EASE, reducedMotion } from '../lib/motion'
import ScrubVideo from './ScrubVideo'
import { scrollToId } from '../lib/scroll'

type Props = {
  start: boolean
}

export default function Hero({ start }: Props) {
  const rootRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    if (!start || reducedMotion()) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 })

      tl.fromTo(
        '.hero-line',
        { yPercent: 132, scaleY: 0.55, transformOrigin: '50% 100%' },
        { yPercent: 0, scaleY: 1, duration: 1.6, ease: EASE, stagger: 0.16 },
      )
        .fromTo(
          '.hero-tag',
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.05, ease: EASE },
          0.15,
        )
        .fromTo(
          '.hero-side .cn',
          { y: 34, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.25, ease: EASE },
          0.85,
        )
        .fromTo(
          '.hero-side .who',
          { y: 22, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.1, ease: EASE },
          1.0,
        )
        .fromTo(
          '.hero-cta',
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.1, ease: EASE },
          1.15,
        )
    }, rootRef)
    return () => ctx.revert()
  }, [start])

  return (
    <section className="hero" id="top" ref={rootRef}>
      <ScrubVideo src="/media/topvid.mp4" poster="/media/topvid-poster.jpg" />
      <div className="hero-copy">
        <div className="hero-left">
          <p className="hero-tag">Taosha · Designer / AIGC Creator</p>
          <h1 className="hero-title">
            <span className="mask">
              <span className="mask-in hero-line">“Nothing great was</span>
            </span>
            <span className="mask">
              <span className="mask-in hero-line">ever achieved</span>
            </span>
            <span className="mask">
              <span className="mask-in hero-line">without enthusiasm.”</span>
            </span>
          </h1>
        </div>
        <div className="hero-side">
          <p className="cn">没有热情，成就不了任何伟大的事。</p>
          <cite className="who">— Ralph Waldo Emerson 爱默生</cite>
          <button type="button" className="hero-cta" onClick={() => scrollToId('gzjj')}>
            Explore Selected Work
            <span className="cta-arrow" aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </section>
  )
}
