import { useEffect, useRef } from 'react'

export default function LazyVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      entries => {
        const entry = entries[0]
        if (!entry) return
        if (entry.isIntersecting) {
          if (!el.src) el.src = el.dataset.src || ''
          el.play().catch(() => {})
        } else {
          el.pause()
        }
      },
      { rootMargin: '20% 0px 20% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return <video ref={ref} data-src={src} muted loop playsInline preload="metadata" />
}
