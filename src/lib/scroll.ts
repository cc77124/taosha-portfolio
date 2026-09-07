import type Lenis from 'lenis'

declare global {
  interface Window {
    __lenis?: Lenis
  }
}

export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  if (window.__lenis) {
    window.__lenis.scrollTo(el, { offset: -64 })
  } else {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
