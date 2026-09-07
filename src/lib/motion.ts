import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CustomEase } from 'gsap/CustomEase'

gsap.registerPlugin(ScrollTrigger, CustomEase)
CustomEase.create('silky', '0.16, 1, 0.3, 1')

export const EASE = 'silky'

export const reducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches
