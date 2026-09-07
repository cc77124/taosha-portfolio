import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { EASE, reducedMotion } from '../lib/motion'
import { scrollToId } from '../lib/scroll'

export default function CtaBand() {
  const ref = useRef<HTMLAnchorElement>(null)

  useLayoutEffect(() => {
    if (reducedMotion()) return
    const el = ref.current
    if (!el) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: 'top 80%', once: true },
        defaults: { ease: EASE },
      })

      tl.fromTo(
        el,
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 1.2 },
      )
        .fromTo(
          '.cta-heading .mask-in',
          { yPercent: 118, scaleY: 0.6, transformOrigin: '50% 100%' },
          { yPercent: 0, scaleY: 1, duration: 1.35, stagger: 0.14 },
          0.55,
        )
        .fromTo(
          '.cta-side',
          { y: 34, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.1 },
          0.9,
        )
        .fromTo(
          '.cta-icon',
          { y: 18, opacity: 0, rotate: -14 },
          { y: 0, opacity: 1, rotate: 0, duration: 1 },
          1.05,
        )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <a
      className="cta-band"
      id="cta"
      href="mailto:cc826028995@qq.com"
      ref={ref}
      onClick={e => {
        e.preventDefault()
        scrollToId('contact')
      }}
    >
      <h2 className="cta-heading">
        <span className="mask">
          <span className="mask-in">请联系我</span>
        </span>
        <span className="mask">
          <span className="mask-in en">Let's talk.</span>
        </span>
      </h2>

      <div className="cta-side">
        <p className="cta-contact">
          Tel：13168851370
          <br />
          WeChat：cc826028995
          <br />
          Guangzhou, China
        </p>
        <span className="cta-icon" aria-hidden="true">
          ↗
        </span>
      </div>
    </a>
  )
}
