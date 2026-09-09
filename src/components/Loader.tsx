import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { EASE, reducedMotion } from '../lib/motion'

type Props = {
  onReveal: () => void
  onDone: () => void
}

export default function Loader({ onReveal, onDone }: Props) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [skip, setSkip] = useState(false)

  useEffect(() => {
    if (reducedMotion()) {
      setSkip(true)
      onReveal()
      onDone()
      return
    }

    const revealRef = onReveal
    const doneRef = onDone

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: EASE } })

      tl.fromTo(
        '.loader-name-in',
        { yPercent: 130 },
        { yPercent: 0, duration: 1.0 },
        0.1,
      )
        .fromTo('.loader-sep', { scale: 0 }, { scale: 1, duration: 0.55 }, 0.5)
        .fromTo(
          '.loader-line-fill',
          { scaleX: 0 },
          { scaleX: 1, duration: 1.35 },
          0.32,
        )
        .add(() => revealRef(), '+=0.22')
        .to(
          rootRef.current,
          { yPercent: -100, duration: 1.0 },
          '+=0.02',
        )
        .to(
          '.loader-inner',
          { y: -46, opacity: 0, duration: 0.65 },
          '<',
        )
        .add(() => doneRef())
    }, rootRef)

    return () => ctx.revert()
  }, [])

  if (skip) return null

  return (
    <div className="loader" ref={rootRef} aria-hidden="true">
      <div className="loader-inner">
        <p className="loader-name">
          <span className="mask">
            <span className="mask-in loader-name-in">TaoSha</span>
          </span>
          <span className="loader-sep">·</span>
          <span className="mask">
            <span className="mask-in loader-name-in">Design</span>
          </span>
        </p>
        <span className="loader-line">
          <span className="loader-line-fill" />
        </span>
      </div>
    </div>
  )
}
