import { GitBranch, Mail, Code2, Heart, ArrowUp } from 'lucide-react'
import { Facebook, LinkedIn } from './icons/BrandIcons'

const SOCIAL_LINKS = [
  { icon: GitBranch, href: 'https://github.com/Mohamed-Elhussien',   label: 'GitHub',   id: 'footer-social-github'   },
  { icon: LinkedIn,  href: 'https://www.linkedin.com/in/mohamed-elhussien-ahmed/', label: 'LinkedIn', id: 'footer-social-linkedin' },
  { icon: Facebook,  href: 'https://www.facebook.com/mohamed.elhussien.52/', label: 'Facebook', id: 'footer-social-facebook' },
  { icon: Mail,      href: 'mailto:mohamedelhussien5@gmail.com', label: 'Email', id: 'footer-social-email' },
]

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      role="contentinfo"
      className="relative border-t border-white/[0.08] bg-black/25 overflow-hidden"
    >
      {/* Top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/5 h-px bg-gradient-to-r from-transparent via-purple-500 to-cyan-500 to-transparent" />

      <div className="section-container py-16">
        {/* Centered content */}
        <div className="flex flex-col items-center text-center">
          
          {/* Logo */}
          <div className="flex items-center gap-3 mb-6">
            <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Code2 size={20} className="text-white" />
            </span>
            <span className="text-xl font-bold text-white">
              Elhussien<span className="text-purple-400">.</span>
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-slate-400 max-w-md leading-relaxed mb-8">
            MERN Stack Developer crafting pixel-perfect, high-performance web experiences with modern tools and a passion for beautiful design.
          </p>

          {/*
            Social icons — بنستخدم نفس كلاس "social-link" المستخدم في
            Hero.jsx بدل ما نكرر نفس الشكل بـ Tailwind utilities يدويًا.
            ده اللي كان سبب مشكلة الـ hover (الدايرة والأيقونة مش متزامنين)،
            لأن الكلاس الجاهز مظبوط صح ومختبر بالفعل في الهيرو.
          */}
          <div className="flex items-center gap-3 mb-10">
            {SOCIAL_LINKS.map(({ icon: Icon, href, label, id }) => (
              <a
                key={id}
                id={id}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="social-link"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>

          {/* CTA */}
          <a
            href="#contact"
            onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="btn-primary inline-flex items-center gap-2 px-6 py-3 text-sm mb-10"
            id="footer-cta"
          >
            <span>Let&apos;s Work Together</span>
            <Mail size={15} />
          </a>

          {/* Divider */}
          <div className="w-full max-w-xs h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent mb-8" />

          {/* Copyright */}
          <p className="text-xs text-slate-500 flex items-center gap-1.5">
            © {year} Mohamed Elhussien · Crafted with{' '}
            <Heart size={12} className="text-pink-500 fill-pink-500" />{' '}
            and lots of ☕
          </p>
        </div>

        {/* Scroll to top — floating button */}
        <button
          id="scroll-to-top"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 w-11 h-11 rounded-full bg-white/[0.06] border border-white/[0.1] backdrop-blur-md text-slate-400 flex items-center justify-center cursor-pointer transition-all duration-300 hover:border-purple-500/50 hover:text-purple-400 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/20 z-50"
        >
          <ArrowUp size={18} />
        </button>
      </div>
    </footer>
  )
}