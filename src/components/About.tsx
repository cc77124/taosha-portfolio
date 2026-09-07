import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { EASE, reducedMotion } from '../lib/motion'

export default function About() {
  const rootRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    if (reducedMotion()) return
    const ctx = gsap.context(() => {
      const photoTrigger = {
        trigger: '.about-grid',
        start: 'top 75%',
        once: true,
      } as const

      gsap.fromTo(
        '.about-photo-wrap',
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 1.5, ease: EASE, scrollTrigger: photoTrigger },
      )
      gsap.fromTo(
        '.about-photo',
        { scale: 1.38 },
        { scale: 1.05, duration: 1.8, ease: EASE, scrollTrigger: photoTrigger },
      )

      gsap.utils.toArray<HTMLElement>('.about-block').forEach(block => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: block, start: 'top 82%', once: true },
          defaults: { ease: EASE },
        })
        tl.fromTo(
          block.querySelector('.about-block-title .mask-in'),
          { yPercent: 118, scaleY: 0.6, transformOrigin: '50% 100%' },
          { yPercent: 0, scaleY: 1, duration: 1.35 },
        ).fromTo(
          block.querySelector('.about-text'),
          { y: 44, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.25 },
          0.22,
        )
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="about" id="about" ref={rootRef}>
      <div className="about-grid">
        <div className="about-photo-wrap">
          <img className="about-photo" src="/about/photo.webp" alt="陶沙 Tao Sha 个人照片" />
        </div>

        <div className="about-copy">
          <div className="about-block">
            <h3 className="about-block-title">
              <span className="mask">
                <span className="mask-in">Who I Am</span>
              </span>
            </h3>
            <p className="about-text">
              我是<span className="hl">陶沙</span>，来自广州，从事设计工作已有
              <span className="hl"> 8 年</span>，主要负责电商设计、品牌设计方面的工作。从一开始，我就对学习和提升这项技艺充满热情——探索不同的风格、技巧，以及如何根据每个品牌的实际需求来运用这些方法，致力于帮助各类品牌创作出更具人性化且更具目的性的作品。
            </p>
          </div>

          <div className="about-block">
            <h3 className="about-block-title">
              <span className="mask">
                <span className="mask-in">Philosophy</span>
              </span>
            </h3>
            <p className="about-text">
              与时俱进，顺应人工智能与短视频快节奏生活的趋势。我的目标始终是创造出独具特色、能让人们快速真正记住的东西。我们应该积极接受新鲜事物，拓展自己的能力边界，拥抱
              AI，不做抱怨的“纺织女工”。而且，我确实认为幽默也是一种设计手段。
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
