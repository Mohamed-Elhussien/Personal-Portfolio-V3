import { useRef, useEffect, useState, useCallback, useMemo } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import HorizontalProjectCard from './HorizontalProjectCard'
import ProjectModal from './ProjectModal'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { projects } from '../data/projects'

gsap.registerPlugin(ScrollTrigger)

// ⚡ موبايل بيغيّر innerHeight مع ظهور/اختفاء الـ address bar
// وده كان بيعمل refresh مزعج للـ ScrollTrigger
ScrollTrigger.config({ ignoreMobileResize: true })

export default function HorizontalProjects() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedProject, setSelectedProject] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const currentProject = useMemo(() => projects[activeIndex], [activeIndex])

  // ⚡ Optimized: بيمنع re-render لو الـ index نفسه
  const updateActiveIndex = useCallback((progress) => {
    const index = Math.round(progress * (projects.length - 1))
    setActiveIndex((prev) => (prev !== index ? index : prev))
  }, [])

  // Modal handlers — memoized
  const handleSelectProject = useCallback((project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedProject(null), 350)
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const mm = gsap.matchMedia()

    // ── Desktop: pin + scrub ──
    mm.add('(min-width: 1024px)', () => {
      // ⚡ قياس فعلي لعرض الكارت بدل افتراض ثابت 70vw
      // عشان لو الـ card الحقيقي مختلف (padding/max-width) الـ snap يفضل مظبوط
      const getCardStep = () => {
        const first = track.children[0]
        const gap = window.innerWidth * 0.05
        return first ? first.offsetWidth + gap : window.innerWidth * 0.75
      }
      const getTotalMove = () => (projects.length - 1) * getCardStep()
      const getScrollLength = () =>
        Math.max(1, projects.length - 1) * window.innerHeight

      const tween = gsap.fromTo(
        track,
        { x: 0 },
        {
          x: () => -getTotalMove(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${getScrollLength()}`,
            pin: true,
            pinSpacing: true,
            // ⚡ الحل الأساسي: رقم بدل true → لاج ناعم بين السكرول والحركة
            // وبيريّح الـ snap من القفزات
            scrub: prefersReducedMotion ? false : 1,
            anticipatePin: 1,
            // ⚡ شلنا fastScrollEnd — كانت بتسبب قفزات مفاجئة مع الـ snap
            invalidateOnRefresh: true,
            snap: {
              snapTo: (progress, self) => {
                // ⚡ الحل التاني: متعملش snap أول ما تدخل/تخرج من السكشن
                // ده اللي كان بيرميك فوق لما بتنزل جوا أول مشروع
                if (progress < 0.04 || progress > 0.96) return progress

                const step = 1 / (projects.length - 1)
                const rawIndex = progress / step
                const floorIndex = Math.floor(rawIndex)
                const frac = rawIndex - floorIndex
                const forwardThreshold = 0.3
                const backwardThreshold = 0.7

                let index
                if (self.direction === 1) {
                  index = frac > forwardThreshold ? floorIndex + 1 : floorIndex
                } else {
                  index = frac < backwardThreshold ? floorIndex : floorIndex + 1
                }

                index = Math.max(0, Math.min(projects.length - 1, index))
                return index * step
              },
              duration: { min: 0.2, max: 0.45 },
              delay: 0,
              ease: 'power2.out',
            },
            onUpdate: (self) => updateActiveIndex(self.progress),
          },
        }
      )

      // reset الترانسفورم لو رجعنا للديسكتوب بعد ما كنا في وضع الموبايل
      gsap.set(track, { clearProps: 'transform' })

      return () => {
        tween.scrollTrigger?.kill()
        tween.kill()
      }
    })

    // ── Mobile/Tablet: native horizontal scroll-snap ──
    mm.add('(max-width: 1023px)', () => {
      gsap.set(track, { clearProps: 'transform' })

      const getClosestIndex = () => {
        const children = Array.from(track.children)
        if (!children.length) return 0
        const center = track.scrollLeft + track.clientWidth / 2
        let closest = 0
        let minDist = Infinity
        children.forEach((child, i) => {
          const childCenter = child.offsetLeft + child.offsetWidth / 2
          const dist = Math.abs(childCenter - center)
          if (dist < minDist) { minDist = dist; closest = i }
        })
        return closest
      }

      let rafId = null
      const handleScroll = () => {
        if (rafId) cancelAnimationFrame(rafId)
        rafId = requestAnimationFrame(() => {
          const idx = getClosestIndex()
          setActiveIndex((prev) => (prev !== idx ? idx : prev))
        })
      }

      track.addEventListener('scroll', handleScroll, { passive: true })
      handleScroll()

      return () => {
        track.removeEventListener('scroll', handleScroll)
        if (rafId) cancelAnimationFrame(rafId)
      }
    })

    return () => mm.revert()
  }, [updateActiveIndex, prefersReducedMotion])

  // Background glow color
  const glowGradient = useMemo(() => {
    return currentProject?.color || 'from-purple-500 to-pink-500'
  }, [currentProject])

  // Progress width
  const progressWidth = useMemo(() => {
    return `${((activeIndex + 1) / projects.length) * 100}%`
  }, [activeIndex])

  return (
    <div id="projects" className="bg-gray-950 text-white">
      {/* Hero */}
      <section className="h-screen flex flex-col items-center justify-center">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
        >
          My Work
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-4 text-gray-400 text-lg"
        >
          Scroll down to explore ↓
        </motion.p>
      </section>

      {/* Horizontal Scroll Section */}
      <section
        ref={sectionRef}
        className="relative h-[70vh] lg:h-screen overflow-hidden bg-gray-950"
      >
        {/* Background Glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className={`w-[500px] h-[500px] rounded-full bg-gradient-to-br ${glowGradient} blur-3xl transition-opacity duration-700`}
            style={{ opacity: 0.08 }}
          />
        </div>

        {/* Progress Bar */}
        <div className="absolute top-28 left-1/2 -translate-x-1/2 w-48 h-1 bg-gray-800 rounded-full overflow-hidden z-50">
          <div
            className="h-full bg-white rounded-full transition-all duration-300 ease-out"
            style={{ width: progressWidth }}
          />
        </div>

        {/* Track
            ⚡ شلنا will-change-transform + touchAction من هنا:
            - touchAction: 'pan-x' كان بيمنع السكرول الرأسي على الموبايل
            - will-change على عنصر واسع جدًا بيستهلك ميموري، وGSAP بيضيفه تلقائي
              وقت الحركة على الديسكتوب */}
        <div
          ref={trackRef}
          className="no-scrollbar flex items-center h-full gap-[5vw] overflow-x-auto snap-x snap-mandatory lg:overflow-visible lg:snap-none"
        >
          {projects.map((project, i) => (
            <HorizontalProjectCard
              key={project.id}
              project={project}
              index={i}
              isActive={i === activeIndex}
              isPrev={i === activeIndex - 1}
              isNext={i === activeIndex + 1}
              isFirst={i === 0}
              isLast={i === projects.length - 1}
              onSelect={handleSelectProject}
            />
          ))}
        </div>
      </section>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  )
}