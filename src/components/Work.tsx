import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { EASE, reducedMotion } from '../lib/motion'
import DotNav from './DotNav'
import LazyVideo from './LazyVideo'
import { projects, type Project } from '../data/projects'

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card" id={project.id}>
      <div className="project-info">
        <div className="project-title-block">
          <span className="active-dot" aria-hidden="true" />
          <h3 className="project-title">
            <span className="mask">
              <span className="mask-in">{project.title}</span>
            </span>
          </h3>
          <p className="project-sub">{project.titleEn}</p>
          <div className="project-tags">
            <span className="pill-no">No.{project.index}</span>
            <span className="pill-year">{project.year}</span>
          </div>
        </div>

        <div className="col-desc">
          <p className="info-label">Explanation</p>
          <p className="project-desc">{project.desc}</p>
        </div>

        <div className="col-tools">
          <p className="info-label">Tools</p>
          <div className="pill-tools">
            {project.tools.map(tool => (
              <span key={tool} className="pill-tool">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="media-grid">
        {project.media.map((item, i) => (
          <figure className="media-frame" key={item.src}>
            {item.type === 'video' ? (
              <LazyVideo src={item.src} />
            ) : (
              <img src={item.src} alt={`${project.title} 作品图 ${i + 1}`} loading="lazy" />
            )}
          </figure>
        ))}
      </div>
    </article>
  )
}

export default function Work() {
  const rootRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    if (reducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.project-card').forEach(card => {
        const frames = card.querySelectorAll('.media-frame')

        const tl = gsap.timeline({
          scrollTrigger: { trigger: card, start: 'top 80%', once: true },
          defaults: { ease: EASE },
        })

        tl.fromTo(
          card.querySelector('.project-title .mask-in'),
          { xPercent: -108 },
          { xPercent: 0, duration: 1.45 },
        )
          .fromTo(
            card.querySelectorAll('.project-sub, .project-tags'),
            { x: -36, opacity: 0 },
            { x: 0, opacity: 1, duration: 1.15, stagger: 0.12 },
            0.28,
          )
          .fromTo(
            card.querySelectorAll('.col-desc, .col-tools'),
            { y: 48, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, stagger: 0.14 },
            0.4,
          )
          .fromTo(
            card.querySelector('.media-grid'),
            { y: 96 },
            { y: 0, duration: 1.8 },
            0.32,
          )

        frames.forEach((frame, i) => {
          const fromRight = i % 2 === 1
          const at = 0.42 + i * 0.11
          tl.fromTo(
            frame,
            { clipPath: fromRight ? 'inset(0% 0% 0% 100%)' : 'inset(0% 100% 0% 0%)' },
            { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5 },
            at,
          ).fromTo(
            frame.querySelectorAll('img, video'),
            { xPercent: fromRight ? 14 : -14, scale: 1.08 },
            { xPercent: 0, scale: 1, duration: 1.5 },
            at,
          )
        })
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="work" id="work" ref={rootRef}>
      <DotNav />

      {projects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </section>
  )
}
