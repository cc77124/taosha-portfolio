import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Loader from './components/Loader'
import Header from './components/Header'
import Hero from './components/Hero'
import Work from './components/Work'
import About from './components/About'
import CtaBand from './components/CtaBand'
import End from './components/End'

import './lib/scroll'
import './lib/motion'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [revealed, setRevealed] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09 })
    window.__lenis = lenis
    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)

    return () => {
      window.removeEventListener('load', onLoad)
      gsap.ticker.remove(raf)
      lenis.destroy()
      window.__lenis = undefined
    }
  }, [])

  useEffect(() => {
    const lenis = window.__lenis
    if (!lenis) return
    if (revealed) {
      lenis.start()
    } else {
      window.scrollTo(0, 0)
      lenis.stop()
    }
  }, [revealed])

  return (
    <>
      {!loaded && (
        <Loader onReveal={() => setRevealed(true)} onDone={() => setLoaded(true)} />
      )}
      <div className="nav-blur" aria-hidden="true" />
      <Header start={revealed} />
      <main>
        <Hero start={revealed} />
        <Work />
        <About />
        <CtaBand />
        <End />
      </main>
    </>
  )
}
