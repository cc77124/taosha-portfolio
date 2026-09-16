import { useEffect, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { EASE, reducedMotion } from '../lib/motion'

export default function End() {
  const rootRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    const io = new IntersectionObserver(
      entries => {
        const entry = entries[0]
        if (!entry) return
        if (entry.isIntersecting) {
          el.play().catch(() => {})
        } else {
          el.pause()
        }
      },
      { rootMargin: '10% 0px 10% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useLayoutEffect(() => {
    if (reducedMotion()) return
    const section = rootRef.current
    if (!section) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: 'top 72%', once: true },
        defaults: { ease: EASE },
      })

      tl.fromTo(
        '.end-word-big',
        { yPercent: 62, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.6, stagger: 0.16 },
      ).fromTo(
        '.end-word-cap',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, stagger: 0.16 },
        0.85,
      )

      gsap.fromTo(
        '.end-words',
        { yPercent: 38 },
        {
          yPercent: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: true,
          },
        },
      )
      gsap.fromTo(
        '.end-video',
        { scale: 1.16 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'center center',
            scrub: true,
          },
        },
      )
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <>
      <section className="end" id="contact" ref={rootRef}>
        <video ref={videoRef} className="end-video" src="/media/end.mp4" muted loop playsInline preload="metadata" />
        <div className="end-overlay" aria-hidden="true" />

        <div className="end-words">
          <div className="end-word end-word-left">
            <span className="end-word-big">Tao</span>
            <p className="end-word-cap">
              Visual Designer <span className="end-cap-year">2026</span>
            </p>
          </div>
          <div className="end-word end-word-right">
            <span className="end-word-big">Sha</span>
            <p className="end-word-cap">Focus On Creating Designs</p>
          </div>
        </div>
      </section>
    </>
  )
}
