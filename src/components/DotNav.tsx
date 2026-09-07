import { useEffect, useState } from 'react'
import { projects } from '../data/projects'
import { scrollToId } from '../lib/scroll'

export default function DotNav() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const io = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: '-30% 0px -55% 0px' },
    )
    projects.forEach(p => {
      const el = document.getElementById(p.id)
      if (el) io.observe(el)
    })

    const workEl = document.getElementById('work')
    const ioWork = new IntersectionObserver(
      entries => {
        setShow(entries[0].isIntersecting)
      },
      { rootMargin: '-10% 0px -20% 0px' },
    )
    if (workEl) ioWork.observe(workEl)

    return () => {
      io.disconnect()
      ioWork.disconnect()
    }
  }, [])

  return (
    <nav className={`dot-nav ${show ? 'is-show' : ''}`} aria-label="项目导航">
      {projects.map(project => (
        <button
          key={project.id}
          className={`dot-nav-link ${activeId === project.id ? 'is-active' : ''}`}
          onClick={() => scrollToId(project.id)}
        >
          {project.title}
        </button>
      ))}
    </nav>
  )
}
