import { useState, useEffect } from 'react'
import { Menu, X, Code2 } from 'lucide-react'

const LINKS = [
  { label: 'Home',     href: '#home'    },
  { label: 'About',    href: '#about'   },
  { label: 'Skills',   href: '#skills'  },
  { label: 'Projects', href: '#projects'},
  { label: 'Contact',  href: '#contact' },
]

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [activeLink, setActive]   = useState('#home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ⚡ Scrollspy قائم على موضع السكرول بدل IntersectionObserver.
  // السبب: IntersectionObserver بمعيار "نسبة الظهور" (threshold) بيفشل
  // مع سكاشن ارتفاعها أكبر بكتير من الشاشة (زي Projects بسبب الـ GSAP pin،
  // اللي ارتفاعه الكلي كذا ضعف الشاشة) - رياضيًا مستحيل توصل لنسبة الظهور
  // المطلوبة لسكشن أطول من الشاشة بكتير. الطريقة دي بتشتغل بمقارنة موضع
  // (offsetTop) كل سكشن مع نقطة تفعيل قريبة من أعلى الشاشة، فبتشتغل صح
  // بغض النظر عن ارتفاع السكشن.
  useEffect(() => {
    let ticking = false

    const updateActive = () => {
      const sections = LINKS
        .map(l => document.getElementById(l.href.slice(1)))
        .filter(Boolean)

      if (sections.length === 0) {
        ticking = false
        return
      }

      // نقطة التفعيل: شوية تحت أعلى الشاشة، عشان السكشن يتفعّل
      // أول ما يبدأ ياخد المساحة الرئيسية من الشاشة
      const activationLine = window.scrollY + window.innerHeight * 0.35

      let current = sections[0]
      for (const sec of sections) {
        if (sec.offsetTop <= activationLine) {
          current = sec
        }
      }

      setActive('#' + current.id)
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateActive)
        ticking = true
      }
    }

    // تحديث أولي فور التركيب
    updateActive()

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    // ⚡ سكشن Projects بيتحمل lazy، فلما يظهر فعليًا لازم نعيد حساب
    // مواضع كل السكاشن (offsetTop) لأنها بتتغيّر بمجرد ما يتضاف للصفحة.
    // بس مفيش داعي إننا نفضل نراقب الـ body كله طول عمر الصفحة —
    // أول ما سكشن Projects يتحمل ويستقر، بنقفل الـ observer فورًا.
    const mutationObserver = new MutationObserver(() => {
      updateActive()
      if (document.getElementById('projects')) {
        mutationObserver.disconnect()
      }
    })
    mutationObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      mutationObserver.disconnect()
    }
  }, [])

  const handleLinkClick = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    setActive(href)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      role="banner"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#080b14]/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20' 
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="section-container mx-auto px-4 max-w-7xl">
        <nav
          className="flex justify-between items-center h-[70px]"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <a
            href="#home"
            onClick={e => handleLinkClick(e, '#home')}
            className="flex items-center gap-2 font-bold text-lg text-[var(--color-text-primary)] no-underline"
            aria-label="Mohamed Elhussien — Home"
          >
            <span className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-[var(--color-accent)] to-[#06B6D4] flex items-center justify-center">
              <Code2 size={18} color="#fff" />
            </span>
            <span>
              Elhussien<span className="text-[var(--color-accent-light)]">.</span>
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
            {LINKS.map(l => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={e => handleLinkClick(e, l.href)}
                  className={`nav-link ${activeLink === l.href ? 'active' : ''}`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#contact"
              onClick={e => handleLinkClick(e, '#contact')}
              className="btn-primary py-[0.55rem] px-[1.4rem] text-[0.82rem]"
              id="nav-cta"
            >
              <span>Hire Me</span>
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            id="mobile-menu-toggle"
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-[10px] border border-[var(--color-border)] bg-[var(--color-bg-card)] text-[var(--color-text-primary)] cursor-pointer"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden glass border-t border-white/10 p-6 bg-[#080b14]/90 backdrop-blur-lg">
          <ul className="list-none m-0 p-0 flex flex-col gap-5">
            {LINKS.map(l => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={e => handleLinkClick(e, l.href)}
                  className={`nav-link text-lg ${activeLink === l.href ? 'active' : ''}`}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href="#contact"
                onClick={e => handleLinkClick(e, '#contact')}
                className="btn-primary w-full block text-center"
                id="nav-cta-mobile"
              >
                <span>Hire Me</span>
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}