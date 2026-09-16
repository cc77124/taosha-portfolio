import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { EASE, reducedMotion } from '../lib/motion'

export type LightboxItem = {
  src: string
  alt: string
}

type Props = {
  title: string
  items: LightboxItem[]
  index: number
  onClose: () => void
  onIndex: (i: number) => void
}

export default function Lightbox({ title, items, index, onClose, onIndex }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const [closing, setClosing] = useState(false)

  const prev = () => onIndex((index - 1 + items.length) % items.length)
  const next = () => onIndex((index + 1) % items.length)

  const requestClose = () => {
    if (closing) return
    if (reducedMotion()) return onClose()
    setClosing(true)
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.45,
      ease: EASE,
      onComplete: onClose,
    })
  }

  useEffect(() => {
    window.__lenis?.stop()
    return () => {
      window.__lenis?.start()
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') requestClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  useLayoutEffect(() => {
    if (reducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.55, ease: EASE },
      )
      gsap.fromTo(
        '.lightbox-stage',
        { opacity: 0, y: 42 },
        { opacity: 1, y: 0, duration: 0.95, ease: EASE, delay: 0.08 },
      )
    })
    return () => ctx.revert()
  }, [])

  const firstRun = useRef(true)
  useLayoutEffect(() => {
    if (firstRun.current) {
      firstRun.current = false
      return
    }
    if (reducedMotion()) return
    gsap.fromTo(
      imgRef.current,
      { opacity: 0, scale: 0.965 },
      { opacity: 1, scale: 1, duration: 0.7, ease: EASE },
    )
  }, [index])

  const item = items[index]

  return (
    <div
      className="lightbox"
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} 作品放大视图`}
      onClick={e => {
        if (e.target === overlayRef.current) requestClose()
      }}
    >
      <button className="lb-close" onClick={requestClose} aria-label="关闭放大视图">
        ✕
      </button>

      {items.length > 1 && (
        <>
          <button className="lb-nav lb-prev" onClick={prev} aria-label="上一张">
            ←
          </button>
          <button className="lb-nav lb-next" onClick={next} aria-label="下一张">
            →
          </button>
        </>
      )}

      <figure className="lightbox-stage">
        <img
          className="lightbox-img"
          ref={imgRef}
          src={item.src}
          alt={item.alt}
          draggable={false}
        />
        <figcaption className="lb-cap">
          <span className="lb-title">{title}</span>
          <span className="lb-count">
            {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
          </span>
        </figcaption>
      </figure>
    </div>
  )
}
