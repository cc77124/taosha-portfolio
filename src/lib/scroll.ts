import type Lenis from 'lenis'

declare global {
  interface Window {
    __lenis?: Lenis
  }
}

export function scrollToId(id: string, options?: { center?: boolean }) {
  const el = document.getElementById(id)
  if (!el) return
  if (window.__lenis) {
    let offset = -64
    if (options?.center) {
      offset = -Math.max(0, (window.innerHeight - el.offsetHeight) / 2)
    }
    window.__lenis.scrollTo(el, { offset })
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: options?.center ? 'center' : 'start' })
  }
}
