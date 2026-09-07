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
          { yPercent: 118, scaleY: 0.6, transformOrigin: '50% 100%' },
          { yPercent: 0, scaleY: 1, duration: 1.35 },
        )
          .fromTo(
            card.querySelectorAll('.project-sub, .project-tags'),
            { y: 26, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.05, stagger: 0.1 },
            0.2,
          )
          .fromTo(
            card.querySelector('.col-desc'),
            { y: 36, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.05 },
            0.3,
          )
          .fromTo(
            card.querySelector('.col-tools'),
            { y: 36, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.05 },
            0.4,
          )
          .fromTo(
            frames,
            { clipPath: 'inset(14% 10% 14% 10%)' },
            { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, stagger: 0.09 },
            0.45,
          )
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
