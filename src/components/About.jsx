import { useEffect, useRef, useState } from 'react'
import { User, MapPin, Calendar, Coffee } from 'lucide-react'

const STATS = [
  { number: '2+',  label: 'Years Experience', icon: Calendar },
  { number: '20+', label: 'Projects Built',   icon: Coffee   },
  { number: '8+', label: 'Technologies',     icon: User     },
  { number: '∞',   label: 'Lines of Code',    icon: MapPin   },
]

const INFO_ITEMS = [
  { label: 'Name',     value: 'Mohamed Elhussien' },
  { label: 'Role',     value: 'MERN Stack Developer' },
  { label: 'Location', value: 'Egypt 🇪🇬' },
  { label: 'Email',    value: 'Mohamedelhussien5@gmail.com' },
  { label: 'Status',   value: '✅ Available for hire' },
]

function useInView(ref, threshold = 0.2) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref, threshold])
  return inView
}

export default function About() {
  const sectionRef = useRef(null)
  const inView     = useInView(sectionRef)

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden py-28"
    >
      {/* Background orbs */}
      <div className="orb orb-cyan top-[10%] -right-24 w-96 h-96 opacity-25" />
      <div className="orb orb-purple bottom-[5%] -left-20 w-80 h-80 opacity-20" />

      <div className="section-container">
        {/* Section header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ease-out ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <span className="section-label mb-4">
            <User size={12} />
            About Me
          </span>
          <h2 className="mt-4 text-4xl lg:text-5xl font-extrabold text-[var(--color-text-primary)]">
            Who I <span className="gradient-text">Am</span>
          </h2>
          <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto mt-4 text-base">
            Passionate about crafting experiences that live at the intersection of design and code.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-14">
          {/* ── LEFT: Bio + Info ── */}
          <div
            className={`w-full lg:w-1/2 flex flex-col gap-7 transition-all duration-700 ease-out delay-150 ${
              inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            {/* Avatar + name card */}
            <div className="glass-strong rounded-2xl p-8 flex items-center gap-6">
              {/* Avatar */}
              <div className="w-20 h-20 rounded-full shrink-0 bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-cyan)] flex items-center justify-center text-3xl font-extrabold text-white border-[3px] border-white/15 shadow-[0_0_30px_var(--color-accent-glow)]">
                ME
              </div>
              <div className="min-w-0">
                <h3 className="text-xl font-bold text-[var(--color-text-primary)] truncate">
                  Mohamed Elhussien
                </h3>
                <p className="text-[var(--color-accent-light)] text-sm font-medium">
                  MERN Stack Developer
                </p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-blink inline-block" />
                  <span className="text-[var(--color-text-muted)] text-xs">Open to opportunities</span>
                </div>
              </div>
            </div>

            {/* Bio paragraphs */}
            <div className="flex flex-col gap-4">
              <p className="text-[var(--color-text-secondary)] text-base leading-relaxed">
                I&apos;m a <span className="text-[var(--color-accent-light)] font-semibold">MERN Stack Developer</span> who transforms
                design concepts into fast, accessible, and visually stunning digital products end-to-end. I live for the details —
                the micro-animation that delights, the layout that guides, the color that communicates.
              </p>
              <p className="text-[var(--color-text-secondary)] text-base leading-relaxed">
                My core stack revolves around <span className="text-[var(--color-cyan)] font-semibold">React, Node.js, and MongoDB</span>, but I&apos;m always
                expanding my toolkit. When I&apos;m not coding, you&apos;ll find me exploring design systems or contributing to open-source.
              </p>
            </div>

            {/* Info table */}
            <div className="glass rounded-xl p-6 flex flex-col gap-3">
              {INFO_ITEMS.map(({ label, value }) => (
                <div
                  key={label}
                  className="flex justify-between items-center pb-2.5 border-b border-[var(--color-border)] last:border-b-0 last:pb-0"
                >
                  <span className="text-[var(--color-text-muted)] text-xs uppercase tracking-widest">{label}</span>
                  <span className="text-[var(--color-text-primary)] text-sm font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Stats Grid ── */}
          <div
            className={`w-full lg:w-1/2 flex flex-col gap-7 transition-all duration-700 ease-out delay-300 ${
              inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            {/* Stats 2×2 grid */}
            <div className="grid grid-cols-2 gap-4">
              {STATS.map(({ number, label, icon: Icon }, i) => (
                                <div
                  key={label}
                  className={`stat-card ${
                    inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                  }`}
                  style={{ transitionDelay: `${400 + i * 100}ms` }}
                >
                  <div className="w-11 h-11 rounded-xl bg-[var(--color-accent-dim)] flex items-center justify-center mb-3">
                    <Icon size={20} className="text-[var(--color-accent-light)]" />
                  </div>
                  <div className="stat-number">{number}</div>
                  <div className="stat-label">{label}</div>
                </div>
              ))}
            </div>

            {/* Philosophy quote */}
            <div className="glass-strong rounded-2xl p-8 border-l-[3px] border-[var(--color-accent)] relative overflow-hidden">
              <div className="absolute top-4 right-6 text-7xl leading-none text-[var(--color-accent-dim)] font-serif select-none pointer-events-none">
                &ldquo;
              </div>
              <p className="text-base italic text-[var(--color-text-secondary)] leading-relaxed relative z-10">
                Clean code isn&apos;t just about working software — it&apos;s about crafting experiences that users
                fall in love with, one pixel at a time.
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-8 h-0.5 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-cyan)]" />
                <span className="text-xs font-semibold text-[var(--color-accent-light)]">Mohamed Elhussien</span>
              </div>
            </div>

            {/* CTA row */}
            <div className="flex gap-4 flex-wrap justify-center lg:justify-start">
              <a
                href="#contact"
                className="btn-primary"
                id="about-cta-contact"
                onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
              >
                <span>Let&apos;s Connect</span>
              </a>
              <a
                href="#projects"
                className="btn-secondary"
                id="about-cta-projects"
                onClick={e => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }) }}
              >
                See My Work
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}