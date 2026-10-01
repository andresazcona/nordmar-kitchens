import { useEffect, useRef, useState } from 'react'

// Public assets respect Vite's base (GitHub Pages serves under /nordmar-kitchens/).
const A = `${import.meta.env.BASE_URL}assets/`

const MATERIALS = [
  {
    id: 'walnut',
    name: 'Nogal & Jura',
    img: A + 'mat-walnut.jpg',
    swatch: ['#5a3b26', '#d9cbb3'],
    cabinets: 'Nogal americano',
    stone: 'Caliza Jura',
    trim: 'Latón cepillado',
  },
  {
    id: 'oak',
    name: 'Roble ahumado',
    img: A + 'mat-oak.jpg',
    swatch: ['#3a2f27', '#6f6a63'],
    cabinets: 'Roble ahumado',
    stone: 'Cuarcita grafito',
    trim: 'Latón envejecido',
  },
  {
    id: 'ivory',
    name: 'Marfil & Calacatta',
    img: A + 'mat-ivory.jpg',
    swatch: ['#e9e1d3', '#f4f1ec'],
    cabinets: 'Laca marfil mate',
    stone: 'Mármol Calacatta',
    trim: 'Níquel pulido',
  },
  {
    id: 'graphite',
    name: 'Grafito & Nero',
    img: A + 'mat-graphite.jpg',
    swatch: ['#26292b', '#121212'],
    cabinets: 'Grafito texturizado',
    stone: 'Nero Marquina',
    trim: 'Acero negro',
  },
]

const STEPS = [
  {
    n: '01',
    tag: 'Semana 1 — 2',
    title: 'Diseño',
    text: 'Medimos tu espacio al milímetro y dibujamos cada módulo contigo. Ves la cocina en planos y renders antes de cortar una sola pieza.',
    details: ['Visita técnica y levantamiento láser del espacio', 'Dos propuestas de distribución', 'Renders fotorrealistas y planos de taller', 'Presupuesto cerrado, sin sorpresas'],
  },
  {
    n: '02',
    tag: 'Semana 3 — 6',
    title: 'Material',
    text: 'Eliges maderas, piedras y herrajes en nuestro showroom. Fabricamos todo en el taller propio, sin intermediarios ni piezas de catálogo.',
    details: ['Selección de muestras en showroom o en tu casa', 'Maderas certificadas y piedra natural por lote', 'Fabricación CNC + acabado a mano', 'Visita al taller para ver tu cocina antes de salir'],
  },
  {
    n: '03',
    tag: 'Semana 7 — 8',
    title: 'Instalación',
    text: 'Un solo equipo monta, nivela y ajusta hasta el último cajón. Entregamos limpio y con diez años de garantía en carpintería.',
    details: ['Protección completa de pisos y zonas comunes', 'Montaje, nivelación y ajuste de herrajes', 'Conexión de electrodomésticos con aliados certificados', 'Entrega con manual de cuidado y 10 años de garantía'],
  },
]

const PROJECTS = [
  {
    title: 'Apartamento Rosales', place: 'Bogotá', type: 'Apartamento', img: A + 'portfolio-1.jpg',
    area: '18 m²', weeks: '7 semanas', year: 2025, materials: 'Laca blanca mate · Roble blanco · Calacatta',
    text: 'Una cocina sin tiradores para un apartamento de líneas limpias. La isla de roble blanco funciona como barra de desayuno y oculta el almacenamiento de diario.',
  },
  {
    title: 'Casa del Valle', place: 'Sopó', type: 'Casa', img: A + 'portfolio-2.jpg',
    area: '32 m²', weeks: '9 semanas', year: 2025, materials: 'Laca verde salvia · Bloque de nogal · Zellige',
    text: 'Restauramos las vigas originales y diseñamos gabinetes shaker en verde salvia. La isla de bloque de nogal es el centro de una casa donde siempre hay alguien cocinando.',
  },
  {
    title: 'Penthouse Altos', place: 'Medellín', type: 'Penthouse', img: A + 'portfolio-3.jpg',
    area: '28 m²', weeks: '8 semanas', year: 2024, materials: 'Grafito · Nero Marquina · Acero negro',
    text: 'Una isla monolítica de Nero Marquina frente a la ciudad. Todo lo técnico queda escondido en una pared de columnas para que la vista sea la protagonista.',
  },
  {
    title: 'Casa Guaymaral', place: 'Chía', type: 'Casa', img: A + 'portfolio-4.jpg',
    area: '40 m²', weeks: '10 semanas', year: 2024, materials: 'Nogal · Cuarcita clara · Roble natural',
    text: 'Cocina, comedor y jardín en un solo espacio abierto para una familia de cinco. La isla tiene cuatro puestos y una zona de cajones para los niños.',
  },
  {
    title: 'Estudio Chapinero', place: 'Bogotá', type: 'Apartamento', img: A + 'portfolio-5.jpg',
    area: '12 m²', weeks: '6 semanas', year: 2025, materials: 'Roble ahumado · Terrazo marfil · Níquel',
    text: 'Una cocina tipo pasillo donde cada centímetro trabaja. El tragaluz y el terrazo claro hacen que un espacio de 12 m² se sienta amplio.',
  },
  {
    title: 'Villa Alba', place: 'Barichara', type: 'Villa', img: A + 'portfolio-6.jpg',
    area: '35 m²', weeks: '10 semanas', year: 2023, materials: 'Laca marfil · Travertino · Terracota',
    text: 'Una casa de descanso con alma mediterránea. Travertino en encimeras y salpicadero, piso de terracota artesanal y una ventana en arco sobre el fregadero.',
  },
]
const FILTERS = ['Todos', 'Apartamento', 'Casa', 'Penthouse', 'Villa']
const MARQUEE = ['Nogal americano', 'Caliza Jura', 'Roble ahumado', 'Mármol Calacatta', 'Nero Marquina', 'Latón cepillado', 'Travertino', 'Laca marfil']

// Heading whose words rise out of a mask when its .reveal parent becomes visible.
function Title({ as: Tag = 'h2', text }) {
  return (
    <Tag className="split">
      {text.split(' ').map((w, i) => (
        <span className="mask" key={i}><span style={{ '--w': i }}>{w}</span></span>
      ))}
    </Tag>
  )
}

function tilt(e) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--rx', `${((e.clientY - r.top) / r.height - 0.5) * -10}deg`)
  e.currentTarget.style.setProperty('--ry', `${((e.clientX - r.left) / r.width - 0.5) * 12}deg`)
}
function untilt(e) {
  e.currentTarget.style.setProperty('--rx', '0deg')
  e.currentTarget.style.setProperty('--ry', '0deg')
}

function countUp(el) {
  const target = Number(el.dataset.count)
  const prefix = el.dataset.prefix || ''
  const t0 = performance.now()
  const step = (t) => {
    const k = Math.min(1, (t - t0) / 1600)
    el.textContent = prefix + Math.round(target * (1 - Math.pow(1 - k, 3)))
    if (k < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

// Native <dialog>: Esc, focus trap and backdrop for free.
function Modal({ open, onClose, className = '', children }) {
  const ref = useRef(null)
  useEffect(() => {
    const d = ref.current
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open])
  return (
    <dialog ref={ref} className={`modal ${className}`} onClose={onClose} onClick={(e) => e.target === ref.current && onClose()}>
      <button className="modal__x" onClick={onClose} aria-label="Cerrar">✕</button>
      {open && children}
    </dialog>
  )
}

// Demo form: validates, shows success, sends nothing.
function ContactForm({ topic, onDone }) {
  const [sent, setSent] = useState(null)
  if (sent) {
    return (
      <div className="form__done">
        <span className="form__check">✓</span>
        <h3>Gracias, {sent}.</h3>
        <p>Recibimos tu solicitud. Un diseñador te escribe en menos de 24 horas para agendar la visita técnica.</p>
        <button className="btn" onClick={onDone}>Listo</button>
      </div>
    )
  }
  return (
    <form
      className="form"
      onSubmit={(e) => {
        e.preventDefault()
        setSent(new FormData(e.currentTarget).get('name').split(' ')[0])
      }}
    >
      <p className="eyebrow">Visita técnica sin costo</p>
      <h3>Cuéntanos de tu cocina</h3>
      <div className="form__grid">
        <label>Nombre<input name="name" required autoComplete="name" placeholder="Tu nombre" /></label>
        <label>Correo<input name="email" type="email" required autoComplete="email" placeholder="tu@correo.com" /></label>
        <label>Teléfono<input name="phone" type="tel" autoComplete="tel" placeholder="300 000 0000" /></label>
        <label>Ciudad<input name="city" placeholder="Bogotá" /></label>
        <label>Tipo de espacio
          <select name="type" defaultValue="Apartamento">
            {FILTERS.slice(1).map((f) => <option key={f}>{f}</option>)}
          </select>
        </label>
        <label>Fecha preferida<input name="date" type="date" /></label>
        <label className="form__full">Mensaje
          <textarea name="msg" rows="3" defaultValue={topic ? `Me interesa: ${topic}. ` : ''} placeholder="Medidas aproximadas, estilo, presupuesto…" />
        </label>
      </div>
      <button className="btn form__submit">Enviar solicitud</button>
      <p className="form__note">Demo: este formulario no envía datos.</p>
    </form>
  )
}

export default function App() {
  const heroRef = useRef(null)
  const stageRef = useRef(null)
  const meterRef = useRef(null)
  const [built, setBuilt] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [material, setMaterial] = useState(MATERIALS[0])
  const [prev, setPrev] = useState(null)
  const [filter, setFilter] = useState('Todos')
  const [menu, setMenu] = useState(false)
  const [project, setProject] = useState(null)
  const [step, setStep] = useState(null)
  const [contact, setContact] = useState(null) // null = closed, otherwise { topic }
  const openContact = (topic = '') => { setProject(null); setStep(null); setMenu(false); setContact({ topic }) }

  // New material opens as a circle from the clicked button.
  const pick = (e, m) => {
    if (m.id === material.id) return
    const r = e.currentTarget.getBoundingClientRect()
    stageRef.current.style.setProperty('--cx', `${r.left + r.width / 2}px`)
    stageRef.current.style.setProperty('--cy', `${r.top + r.height / 2}px`)
    setPrev(material.id)
    setMaterial(m)
  }

  // Scroll progress of the hero -> CSS var --p (0..1). No re-render per frame.
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const el = heroRef.current
      const total = el.offsetHeight - window.innerHeight
      const p = Math.min(1, Math.max(0, -el.getBoundingClientRect().top / total))
      el.style.setProperty('--p', p.toFixed(4))
      meterRef.current.textContent = `${Math.round(Math.min(1, p / 0.6) * 100)}%`
      setBuilt(p > 0.72)
      setScrolled(window.scrollY > 40)
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  // Fade + lift every .reveal element once it enters the viewport.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (!e.isIntersecting) return
        e.target.classList.add('is-visible')
        e.target.querySelectorAll('[data-count]').forEach(countUp)
        io.unobserve(e.target)
      }),
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const shown = filter === 'Todos' ? PROJECTS : PROJECTS.filter((p) => p.type === filter)

  return (
    <>
      <header className={`nav ${scrolled || menu ? 'nav--solid' : ''} ${menu ? 'nav--open' : ''}`}>
        <a href="#top" className="logo" onClick={() => setMenu(false)}>NORDMAR<span>atelier</span></a>
        <nav className="nav__links" onClick={(e) => e.target.tagName === 'A' && setMenu(false)}>
          <a href="#proceso">Proceso</a>
          <a href="#proyectos">Proyectos</a>
          <a href="#contacto">Contacto</a>
          <button className="btn nav__menu-cta" onClick={() => openContact()}>Agendar visita</button>
        </nav>
        <button className="btn btn--ghost nav__cta" onClick={() => openContact()}>Agendar visita</button>
        <button className="nav__burger" aria-label="Menú" aria-expanded={menu} onClick={() => setMenu(!menu)}>
          <span /><span />
        </button>
      </header>

      <main id="top">
        {/* HERO: scroll fills the empty room with the kitchen */}
        <section className={`hero ${built ? 'is-built' : ''}`} ref={heroRef}>
          <div className="hero__sticky">
            <div className="hero__stage">
              <img src={A + 'hero-empty.jpg'} alt="Espacio vacío antes de la cocina" className="hero__img hero__empty" />
              <div className="hero__kitchen" ref={stageRef}>
                {MATERIALS.map((m) => (
                  <img
                    key={m.id}
                    src={m.img}
                    alt={`Cocina en ${m.name}`}
                    className={`hero__img ${m.id === material.id ? 'is-active' : m.id === prev ? 'is-prev' : ''}`}
                  />
                ))}
              </div>
            </div>
            <div className="hero__shade" />

            <div className="hero__intro">
              <p className="eyebrow load" style={{ '--w': 0 }}>Cocinas a medida · Taller propio</p>
              <h1 className="split load">
                {['Desliza', 'para', 'armar', 'la', 'cocina'].map((w, i) => (
                  <span className="mask" key={w}><span style={{ '--w': i + 1 }}>{w}</span></span>
                ))}
              </h1>
              <p className="hero__sub load" style={{ '--w': 7 }}>Cada pieza se diseña para tu espacio. Nada de catálogo.</p>
            </div>

            <div className="hero__meter">
              <span>Ajuste</span>
              <strong ref={meterRef}>0%</strong>
              <i />
            </div>

            <div className="hero__built">
              <p className="eyebrow">Configurador en vivo</p>
              <h2 className="split">
                {['Hecha', 'a', 'tu', 'medida.'].map((w, i) => (
                  <span className="mask" key={w}><span style={{ '--w': i }}>{w}</span></span>
                ))}
              </h2>
            </div>

            <div className="picker" aria-hidden={!built}>
              <div className="picker__options" role="radiogroup" aria-label="Material">
                {MATERIALS.map((m) => (
                  <button
                    key={m.id}
                    role="radio"
                    aria-checked={m.id === material.id}
                    tabIndex={built ? 0 : -1}
                    className={`picker__opt ${m.id === material.id ? 'is-active' : ''}`}
                    onClick={(e) => pick(e, m)}
                  >
                    <span className="swatch">
                      <i style={{ background: m.swatch[0] }} />
                      <i style={{ background: m.swatch[1] }} />
                    </span>
                    {m.name}
                  </button>
                ))}
              </div>
              <dl className="picker__spec" key={material.id}>
                <div><dt>Gabinetes</dt><dd>{material.cabinets}</dd></div>
                <div><dt>Encimera</dt><dd>{material.stone}</dd></div>
                <div><dt>Herrajes</dt><dd>{material.trim}</dd></div>
                <button className="btn picker__quote" tabIndex={built ? 0 : -1} onClick={() => openContact(`acabado ${material.name}`)}>
                  Cotizar este acabado
                </button>
              </dl>
            </div>

            <div className="hero__hint"><span />Desliza</div>
          </div>
        </section>

        <section className="stats">
          {[[180, '+', 'cocinas entregadas'], [12, '', 'años de taller'], [10, '', 'años de garantía'], [1, '', 'solo equipo, de inicio a fin']].map(([n, pre, l], i) => (
            <div className="stat reveal" style={{ '--d': i }} key={l}>
              <strong data-count={n} data-prefix={pre}>{pre}0</strong>
              <span>{l}</span>
            </div>
          ))}
        </section>

        <div className="marquee" aria-hidden="true">
          <div className="marquee__track">
            {[...MARQUEE, ...MARQUEE].map((t, i) => <span key={i}>{t}<i>✦</i></span>)}
          </div>
        </div>

        <section className="process" id="proceso">
          <div className="section-head reveal">
            <p className="eyebrow">Cómo trabajamos</p>
            <Title text="Tres pasos, un solo taller." />
          </div>
          <div className="process__grid">
            {STEPS.map((s, i) => (
              <article className="reveal reveal--rise" style={{ '--d': i }} key={s.n}>
                <button className="card" onMouseMove={tilt} onMouseLeave={untilt} onClick={() => setStep(s)}>
                  <p className="card__tag"><span>{s.n}</span> {s.tag}</p>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  <span className="card__more">Ver detalle +</span>
                  <b className="card__num">{s.n}</b>
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="work" id="proyectos">
          <div className="section-head reveal">
            <p className="eyebrow">Proyectos recientes</p>
            <Title text="Cocinas que ya viven." />
          </div>
          <div className="filters reveal">
            {FILTERS.map((f) => (
              <button key={f} className={`chip ${f === filter ? 'is-active' : ''}`} onClick={() => setFilter(f)}>
                {f}
              </button>
            ))}
          </div>
          <div className="work__grid reveal">
            {shown.map((p, i) => (
              <figure className="project" style={{ '--i': i }} key={`${filter}-${p.title}`}>
                <button className="project__img" onClick={() => setProject(p)} aria-label={`Ver ${p.title}`}>
                  <img src={p.img} alt={p.title} loading="lazy" />
                  <span className="project__view">Ver proyecto →</span>
                </button>
                <figcaption onClick={() => setProject(p)}>
                  <span>{p.title}</span>
                  <small>{p.type} · {p.place}</small>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="cta" id="contacto">
          <div className="cta__inner reveal">
            <p className="eyebrow">Visita técnica sin costo</p>
            <Title text="Empecemos por medir tu espacio." />
            <p>Agenda una visita y en dos semanas tienes el diseño completo de tu cocina.</p>
            <button className="btn" onClick={() => openContact()}>Agendar visita</button>
          </div>
        </section>
      </main>

      <Modal open={!!project} onClose={() => setProject(null)} className="modal--project">
        {project && (
          <>
            <img className="modal__img" src={project.img} alt={project.title} />
            <div className="modal__body">
              <p className="eyebrow">{project.type} · {project.place} · {project.year}</p>
              <h3>{project.title}</h3>
              <p className="modal__text">{project.text}</p>
              <dl className="modal__facts">
                <div><dt>Área</dt><dd>{project.area}</dd></div>
                <div><dt>Tiempo</dt><dd>{project.weeks}</dd></div>
                <div><dt>Materiales</dt><dd>{project.materials}</dd></div>
              </dl>
              <button className="btn" onClick={() => openContact(`una cocina como ${project.title}`)}>Quiero una así</button>
            </div>
          </>
        )}
      </Modal>

      <Modal open={!!step} onClose={() => setStep(null)} className="modal--step">
        {step && (
          <div className="modal__body">
            <p className="eyebrow"><span className="gold">{step.n}</span> · {step.tag}</p>
            <h3>{step.title}</h3>
            <p className="modal__text">{step.text}</p>
            <ul className="modal__list">
              {step.details.map((d) => <li key={d}>{d}</li>)}
            </ul>
            <button className="btn" onClick={() => openContact()}>Empezar mi proyecto</button>
          </div>
        )}
      </Modal>

      <Modal open={!!contact} onClose={() => setContact(null)} className="modal--form">
        {contact && <ContactForm topic={contact.topic} onDone={() => setContact(null)} />}
      </Modal>

      <footer className="footer">
        <span className="logo">NORDMAR<span>atelier</span></span>
        <span>Taller y showroom · Bogotá</span>
        <span>© {new Date().getFullYear()} Nordmar Atelier</span>
      </footer>
    </>
  )
}
