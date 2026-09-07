import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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

  return (
    <>
      <div className="nav-blur" aria-hidden="true" />
      <Header />
      <main>
        <Hero />
        <Work />
        <About />
        <CtaBand />
        <End />
      </main>
    </>
  )
}
