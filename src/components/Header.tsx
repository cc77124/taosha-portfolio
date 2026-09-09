import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { EASE, reducedMotion } from '../lib/motion'
import { scrollToId } from '../lib/scroll'

type Props = {
  start: boolean
}

export default function Header({ start }: Props) {
  const ref = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    if (!start || reducedMotion()) return
    const el = ref.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: -22, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: EASE, delay: 0.55 },
      )
    })
    return () => ctx.revert()
  }, [start])

  return (
    <header className="site-header" ref={ref}>
      <a
        className="site-name"
        href="#top"
        onClick={e => {
          e.preventDefault()
          window.__lenis ? window.__lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
      >
        <span className="site-name-cn">陶沙</span>
        <span className="site-name-en">Tao Sha</span>
      </a>

      <nav className="site-nav" aria-label="主导航">
        <button
          className="nav-pill"
          onClick={() => scrollToId('work')}
        >
          <span className="dot" aria-hidden="true" />
          作品 Work
        </button>
        <a
          className="nav-pill-mark"
          href="#top"
          aria-label="回到顶部"
          onClick={e => {
            e.preventDefault()
            window.__lenis ? window.__lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        >
          ///
        </a>
        <button
          className="nav-pill"
          onClick={() => scrollToId('about')}
        >
          <span className="dot" aria-hidden="true" />
          关于 About
        </button>
      </nav>

      <div className="site-social">
        <a
          className="social-link"
          href="#cta"
          onClick={e => {
            e.preventDefault()
            scrollToId('cta', { center: true })
          }}
        >
          电话 Tel
        </a>
        <a
          className="social-link hide-m"
          href="#cta"
          onClick={e => {
            e.preventDefault()
            scrollToId('cta', { center: true })
          }}
        >
          微信 WeChat
        </a>
      </div>
    </header>
  )
}
