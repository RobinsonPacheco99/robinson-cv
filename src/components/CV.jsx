import { useState, useEffect, useMemo, useRef, useCallback } from 'react'

const cvData = {
  name: 'Robinson Pacheco',
  title: 'Egresado de Ingeniería en TI',
  location: 'Pasaje, El Oro, Ecuador',
  contact: [
    { label: 'robinpacheco87@gmail.com', title: 'Correo', icon: 'mail', href: 'mailto:robinpacheco87@gmail.com?subject=Contacto%20desde%20tu%20CV' },
    { label: 'LinkedIn', title: 'LinkedIn', icon: 'linkedin', href: 'https://www.linkedin.com/in/robinson-pacheco-062656325/' },
  ],
  summary:
    'Egresado de Ingeniería en TI enfocado en el desarrollo de software moderno. Utilizo asistentes de Inteligencia Artificial para optimizar código y potenciar mi productividad. Combino bases sólidas en front-end y bases de datos con conocimientos prácticos en QA, garantizando así productos robustos y funcionales.',
  experience: [
    {
      company: 'Gobierno Autónomo Descentralizado de Pasaje (GAD Pasaje)',
      role: 'Prácticas',
      tasks: [
        'Apoyo en el desarrollo básico y mantenimiento de aplicaciones internas, colaborando en la configuración de entornos de servidor local y ajustes en el backend utilizando Node.js.',
        'Asistencia en la integración de componentes front-end (con frameworks como Angular) y en la conexión con bases de datos como MongoDB y PostgreSQL.',
        'Realización de pruebas de regresión y automatización básica con Selenium para verificar la estabilidad del código y reportar errores tras las actualizaciones.',
        'Administración de la plataforma GLPI para mantener un inventario riguroso de componentes y equipos tecnológicos del municipio.',
      ],
    },
  ],
  projects: [
    { name: 'App Restaurante', desc: 'Sistema de gestión de pedidos y menús para restaurantes.', icon: 'utensils' },
    { name: 'App Bancaria', desc: 'Plataforma de operaciones bancarias y gestión de cuentas.', icon: 'bank' },
    { name: 'App Tienda de Ropa', desc: 'E-commerce para venta de ropa con carrito de compras.', icon: 'shirt' },
  ],
  education: [
    {
      degree: 'Ingeniería en Tecnologías de la Información',
      institution: 'Universidad Técnica de Machala',
      period: 'Egresado',
    },
  ],
  certificates: [
    { name: 'Fundamentos de Python 1', file: '/Fundamentos de Python 1.pdf' },
    { name: 'Gestión de Amenazas Cibernéticas', file: '/Gestión de Amenazas Cibernéticas.pdf' },
    { name: 'Partner NDG Linux Unhatched', file: '/Partner NDG Linux Unhatched.pdf' },
    { name: 'Certificado de prácticas pre-profesionales GAD de Pasaje', file: '/Certificado de prácticas pre-profesionales GAD de pasaje.pdf' },
  ],
  skills: [
    'Desarrollo Front-end',
    'Gestión de bases de datos',
    'Desarrollo asistido por IA',
    'Pruebas de calidad (QA)',
    'Consultas SQL',
  ],
  languages: [
    { language: 'Español', level: 'Nativo', pct: 100 },
  ],
}

const sections = [
  { id: 'about', label: 'Sobre mí' },
  { id: 'experience', label: 'Experiencia' },
  { id: 'projects', label: 'Proyectos' },
  { id: 'education', label: 'Formación' },
  { id: 'skills', label: 'Habilidades' },
]

/** Respeta la preferencia del sistema: si el usuario pidió menos movimiento, apagamos los efectos. */
function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced
}

function CursorGlow() {
  const ref = useRef(null)
  useEffect(() => {
    let frame = null
    const onMove = (e) => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = null
        if (ref.current) ref.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])
  return <div className="cursor-glow" ref={ref} aria-hidden="true" />
}

function Particles() {
  const particles = useMemo(() =>
    Array.from({ length: 26 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 3 + 2,
      duration: Math.random() * 25 + 20,
      delay: Math.random() * 15,
    })),
  [])
  return (
    <div className="particles" aria-hidden="true">
      {particles.map(p => (
        <span
          key={p.id}
          className="particle"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

function Blobs() {
  const blobs = [
    { id: 1, top: '8%', left: '12%', size: 420, dur: 26 },
    { id: 2, top: '58%', left: '68%', size: 480, dur: 34 },
    { id: 3, top: '80%', left: '18%', size: 300, dur: 22 },
    { id: 4, top: '28%', left: '82%', size: 260, dur: 30 },
  ]
  return (
    <div className="bg-blobs" aria-hidden="true">
      {blobs.map(b => (
        <div
          key={b.id}
          className="blob"
          style={{ top: b.top, left: b.left, width: b.size, height: b.size, animationDuration: `${b.dur}s` }}
        />
      ))}
    </div>
  )
}

function Typewriter({ text, enabled }) {
  const [display, setDisplay] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!enabled) {
      setDisplay(text)
      setDone(true)
      return
    }
    setDisplay('')
    setDone(false)
    let i = 0
    const interval = setInterval(() => {
      i += 1
      setDisplay(text.slice(0, i))
      if (i >= text.length) {
        clearInterval(interval)
        setDone(true)
      }
    }, 45)
    return () => clearInterval(interval)
  }, [text, enabled])

  // El texto completo queda siempre en el DOM para lectores de pantalla.
  return (
    <span className="typewriter">
      <span aria-hidden="true">{display}{!done && <span className="caret" />}</span>
      <span className="sr-only">{text}</span>
    </span>
  )
}

function TiltCard({ children, enabled }) {
  const ref = useRef(null)

  const handleMove = (e) => {
    const el = ref.current
    if (!el || !enabled) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width) * 100}%`)
    el.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height) * 100}%`)
    el.style.transform = `perspective(700px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-6px)`
  }

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = ''
  }

  return (
    <div ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave} className="tilt-card">
      {children}
    </div>
  )
}

function StatCard({ number, label, animate }) {
  const ref = useRef(null)
  const [count, setCount] = useState(animate ? 0 : number)

  useEffect(() => {
    if (!animate) { setCount(number); return }
    const el = ref.current
    if (!el) return
    let interval = null
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      obs.disconnect()
      let current = 0
      const step = Math.ceil(number / 30)
      interval = setInterval(() => {
        current += step
        if (current >= number) {
          setCount(number)
          clearInterval(interval)
        } else {
          setCount(current)
        }
      }, 40)
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => {
      obs.disconnect()
      if (interval) clearInterval(interval)
    }
  }, [number, animate])

  return (
    <div className="stat-card" ref={ref}>
      <span className="stat-number">{count}</span>
      <span className="stat-label">{label}</span>
    </div>
  )
}

/* Iconos de trazo sobre una rejilla de 24: mismo grosor y remates redondeados
   para que todos se lean como una sola familia. Los de marca van rellenos. */
const icons = {
  mail: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </>
  ),
  linkedin: {
    filled: true,
    body: <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" />,
  },
  pin: (
    <>
      <path d="M20 10c0 4.99-5.54 10.19-7.4 11.8a1 1 0 0 1-1.2 0C9.54 20.19 4 14.99 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  sparkle: <path d="M12 3l1.9 4.6L18.5 9.5l-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9z" />,
  code: (
    <>
      <path d="m16 18 6-6-6-6" />
      <path d="m8 6-6 6 6 6" />
    </>
  ),
  utensils: (
    <>
      <path d="M3 2v7a3 3 0 0 0 3 3 3 3 0 0 0 3-3V2" />
      <path d="M6 12v10" />
      <path d="M18 2a3 3 0 0 0-3 3v6h6V5a3 3 0 0 0-3-3" />
      <path d="M18 11v11" />
    </>
  ),
  bank: (
    <>
      <path d="m2 8 10-5 10 5" />
      <path d="M4 10h16" />
      <path d="M6 10v8" />
      <path d="M10 10v8" />
      <path d="M14 10v8" />
      <path d="M18 10v8" />
      <path d="M3 22h18" />
    </>
  ),
  shirt: <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />,
  graduation: (
    <>
      <path d="M21.4 10.92a1 1 0 0 0 0-1.84L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.84l8.57 3.9a2 2 0 0 0 1.66 0z" />
      <path d="M22 10v6" />
      <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
    </>
  ),
  award: (
    <>
      <circle cx="12" cy="8" r="6" />
      <path d="M15.48 12.89 17 22l-5-3-5 3 1.52-9.11" />
    </>
  ),
  download: (
    <>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="m7 10 5 5 5-5" />
      <path d="M12 15V3" />
    </>
  ),
  arrowDown: (
    <>
      <path d="M12 5v14" />
      <path d="m19 12-7 7-7-7" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </>
  ),
  moon: <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z" />,
}

/** Se dimensiona con font-size (1em) y toma el color del texto que lo rodea. */
function Icon({ name }) {
  const icon = icons[name]
  if (!icon) return null
  const filled = icon.filled === true
  return (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      aria-hidden="true"
      fill={filled ? 'currentColor' : 'none'}
      stroke={filled ? 'none' : 'currentColor'}
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {filled ? icon.body : icon}
    </svg>
  )
}

function ThemeToggle({ dark, onToggle }) {
  const label = dark ? 'Activar modo claro' : 'Activar modo oscuro'
  return (
    <button className="theme-toggle" onClick={onToggle} title={label} aria-label={label}>
      <Icon name={dark ? 'sun' : 'moon'} />
    </button>
  )
}

function ScrollProgress() {
  const ref = useRef(null)
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0
      if (ref.current) ref.current.style.width = `${pct}%`
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])
  return <div className="scroll-progress" ref={ref} aria-hidden="true" />
}

function Nav({ activeSection, scrollTo, initials, shortName, dark, onToggleTheme }) {
  return (
    <div className="nav-wrap">
      <nav className="nav-bar" aria-label="Secciones del CV">
        <button
          className="nav-brand"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Volver al inicio"
        >
          <span className="brand-avatar" aria-hidden="true">{initials}</span>
          <span className="brand-name">{shortName}</span>
        </button>

        <div className="nav-links">
          {sections.map((s, i) => (
            <button
              key={s.id}
              className={`nav-btn ${activeSection === s.id ? 'active' : ''}`}
              onClick={() => scrollTo(s.id)}
              aria-current={activeSection === s.id ? 'true' : undefined}
              style={{ animationDelay: `${0.1 + i * 0.07}s` }}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="nav-actions">
          <ThemeToggle dark={dark} onToggle={onToggleTheme} />
          <a href="/Curriculum .pdf" download className="btn btn-primary btn-nav">
            <span className="btn-icon"><Icon name="download" /></span>
            <span className="btn-label">Descargar CV</span>
          </a>
        </div>
      </nav>
    </div>
  )
}

function CV() {
  const [photoError, setPhotoError] = useState(false)
  const [activeSection, setActiveSection] = useState('about')
  const [dark, setDark] = useState(() => localStorage.getItem('theme') !== 'light')
  const reducedMotion = useReducedMotion()
  const {
    name, title, location, contact, summary,
    experience, projects, education, certificates, skills, languages,
  } = cvData

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - 90
    window.scrollTo({ top, behavior: 'smooth' })
    setActiveSection(id)
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
          obs.unobserve(entry.target)
        }
      })
    }, { threshold: 0.15 })
    document.querySelectorAll('.section').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActiveSection(entry.target.id)
      })
    }, { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' })
    sections.forEach(s => {
      const el = document.getElementById(s.id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  const initials = name.split(' ').map(n => n[0]).join('')

  // Mueve el halo del hero con el puntero.
  const handleHeroMove = useCallback((e) => {
    if (reducedMotion) return
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--hx', `${((e.clientX - rect.left) / rect.width) * 100}%`)
    el.style.setProperty('--hy', `${((e.clientY - rect.top) / rect.height) * 100}%`)
  }, [reducedMotion])

  return (
    <>
      <ScrollProgress />
      {!reducedMotion && (
        <>
          <CursorGlow />
          <Particles />
          <Blobs />
        </>
      )}

      <Nav
        activeSection={activeSection}
        scrollTo={scrollTo}
        initials={initials}
        shortName={name.split(' ')[0]}
        dark={dark}
        onToggleTheme={() => setDark(d => !d)}
      />

      <header className="hero" onMouseMove={handleHeroMove}>
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-spotlight" aria-hidden="true" />

        <div className="hero-photo-wrap">
          {photoError ? (
            <div className="photo-big initials">{initials}</div>
          ) : (
            <img className="photo-big" src="/foto.jpg" alt={`Foto de ${name}`} onError={() => setPhotoError(true)} />
          )}
          <span className="photo-badge"><Icon name="code" /></span>
        </div>

        <div className="hero-identity">
          <span className="hello-chip"><Icon name="sparkle" /> Hola, soy</span>
          <h1 className="hero-name gradient-text">{name}</h1>
          <p className="hero-role"><Typewriter text={title} enabled={!reducedMotion} /></p>
        </div>

        {/* Solo ubicación: las vías de contacto viven una sola vez, en el pie. */}
        <span className="location-pill">
          <span className="contact-icon"><Icon name="pin" /></span>
          {location}
        </span>

      </header>

      <main>
        <section id="about" className="section" aria-labelledby="about-title">
          <h2 className="section-title" id="about-title">Sobre mí</h2>
          <div className="section-body">
            <p className="summary-text">{summary}</p>
            <div className="stats">
              <StatCard number={projects.length} label="Proyectos" animate={!reducedMotion} />
              <StatCard number={certificates.length} label="Certificados" animate={!reducedMotion} />
              <StatCard number={skills.length} label="Habilidades" animate={!reducedMotion} />
            </div>
          </div>
        </section>

        <section id="experience" className="section" aria-labelledby="experience-title">
          <h2 className="section-title" id="experience-title">Experiencia</h2>
          <div className="section-body">
            <div className="timeline">
              {experience.map(exp => (
                <article key={exp.company} className="timeline-item">
                  <div className="timeline-dot" aria-hidden="true" />
                  <div className="timeline-content">
                    <div className="timeline-header"><strong>{exp.role}</strong></div>
                    <em>{exp.company}</em>
                    <ul className="task-list">
                      {exp.tasks.map(task => <li key={task}>{task}</li>)}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="section" aria-labelledby="projects-title">
          <h2 className="section-title" id="projects-title">Proyectos</h2>
          <div className="section-body">
            <div className="projects-grid">
              {projects.map(proj => (
                <TiltCard key={proj.name} enabled={!reducedMotion}>
                  <article className="project-card">
                    <div className="project-glow" aria-hidden="true" />
                    <div className="project-icon"><Icon name={proj.icon} /></div>
                    <h3>{proj.name}</h3>
                    <p>{proj.desc}</p>
                  </article>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>

        <section id="education" className="section" aria-labelledby="education-title">
          <h2 className="section-title" id="education-title">Formación</h2>
          <div className="section-body">
            {education.map(edu => (
              <article key={edu.degree} className="edu-card">
                <div className="edu-icon"><Icon name="graduation" /></div>
                <div>
                  <strong>{edu.degree}</strong>
                  <em>{edu.institution}</em>
                  <span className="period">{edu.period}</span>
                </div>
              </article>
            ))}
            <h3 className="sub-heading">Certificados</h3>
            <div className="cert-grid">
              {certificates.map(cert => (
                <a key={cert.name} href={cert.file} target="_blank" rel="noopener noreferrer" className="cert-badge">
                  <span className="cert-icon"><Icon name="award" /></span>
                  {cert.name}
                  <span className="cert-dl"><Icon name="arrowDown" /></span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="section" aria-labelledby="skills-title">
          <h2 className="section-title" id="skills-title">Habilidades</h2>
          <div className="section-body">
            {reducedMotion ? (
              <div className="skills-list">
                {skills.map(skill => <span key={skill} className="skill-tag">{skill}</span>)}
              </div>
            ) : (
              <div className="skills-marquee">
                <div className="skills-track">
                  {skills.map(skill => <span key={skill} className="skill-tag">{skill}</span>)}
                </div>
                <div className="skills-track" aria-hidden="true">
                  {skills.map(skill => <span key={`dup-${skill}`} className="skill-tag">{skill}</span>)}
                </div>
              </div>
            )}

            <h3 className="sub-heading">Idiomas</h3>
            <div className="languages-list">
              {languages.map(lang => (
                <div key={lang.language} className="lang-item">
                  <strong>{lang.language}</strong>
                  <div
                    className="lang-bar"
                    role="progressbar"
                    aria-valuenow={lang.pct}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`Nivel de ${lang.language}: ${lang.level}`}
                  >
                    <div className="lang-fill" style={{ width: `${lang.pct}%` }} />
                  </div>
                  <span>{lang.level}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="cv-footer">
        <p className="footer-text">Conecta conmigo a través de:</p>
        <ul className="contact-list">
          {contact.map(item => (
            <li key={item.title}>
              <a
                className="contact-item"
                href={item.href}
                title={item.title}
                aria-label={item.title}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                <span className="contact-icon"><Icon name={item.icon} /></span>
                <span className="sr-only">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </footer>
    </>
  )
}

export default CV
