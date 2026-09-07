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

  return <video ref={ref} src={src} muted loop playsInline preload="metadata" />
}
