import { useRef, useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import { Mail, Send, MapPin, Clock, CheckCircle, AlertCircle, MessageSquare } from 'lucide-react'

// ⚡ الـ 3 قيم دي بتيجي من حساب EmailJS بتاعك (dashboard.emailjs.com) وبتتقرا
// من ملف .env في جذر المشروع (شوف .env.example) — مفيش أي secret مكتوب هنا
// في الكود مباشرة، والملف .env مش بيتزود على Git أصلاً (موجود في .gitignore).
const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const INFO_CARDS = [
  { icon: Mail,    label: 'Email',    value: 'mohamedelhussien5@gmail.com',  sub: 'Typically replies within 24h',  color: '#8B5CF6', id: 'contact-info-email'    },
  { icon: MapPin,  label: 'Location', value: 'Egypt 🇪🇬',           sub: 'Open to remote worldwide',      color: '#06B6D4', id: 'contact-info-location' },
  { icon: Clock,   label: 'Timezone', value: 'EET (UTC +3)',         sub: 'Available 9am – 10pm',          color: '#22C55E', id: 'contact-info-timezone' },
]

export default function Contact() {
  const ref    = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true) },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const [form,   setForm]   = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle')
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.name.trim())    e.name    = 'Name is required'
    if (!form.email.trim())   e.email   = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email'
    return e
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setStatus('sending')

    // ⚡ لو الـ env vars مش متظبطة (مثلاً حد بيشغل المشروع محليًا من غير .env)،
    // منبقاش نظهر "تم الإرسال بنجاح" وهو كدب — بنطلع رسالة خطأ واضحة بدل كده.
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      console.error('EmailJS env vars missing — check your .env file (see .env.example).')
      setStatus('error')
      return
    }

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject || 'New message from your portfolio',
          message: form.message,
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      )
      setStatus('success')
    } catch (err) {
      console.error('EmailJS send failed:', err)
      setStatus('error')
    }
  }

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) setErrors(er => ({ ...er, [e.target.name]: '' }))
  }

  const inputBaseClass = "w-full px-4 py-3.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white/90 text-sm font-sans outline-none transition-all duration-300 focus:border-white/20 focus:ring-2 focus:ring-white/5"
  const inputErrorClass = "w-full px-4 py-3.5 bg-white/[0.04] border border-red-500 rounded-xl text-white/90 text-sm font-sans outline-none transition-all duration-300 shadow-[0_0_0_3px_rgba(239,68,68,0.15)]"

  return (
    <section
      id="contact"
      ref={ref}
      className="relative overflow-hidden py-28 bg-white/[0.01]"
    >
      <div className="orb orb-purple w-[450px] h-[450px] -bottom-[100px] -right-[100px] opacity-20" />
      <div className="orb orb-cyan w-[400px] h-[400px] top-0 -left-[120px] opacity-15" />

      <div className="section-container relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <span className="section-label inline-flex items-center gap-2 mb-4">
            <MessageSquare size={12} />
            Get in Touch
          </span>
          <h2 className="mt-4 text-[clamp(1.9rem,4vw,2.8rem)] font-extrabold text-white">
            Let&apos;s <span className="gradient-text">Work Together</span>
          </h2>
          <p className="text-slate-400 max-w-[520px] mx-auto mt-4 text-[0.95rem]">
            Have a project in mind or want to chat about opportunities? I&apos;d love to hear from you.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-stretch justify-between gap-12">
          {/* LEFT – Info cards */}
          <div
            className={`w-full lg:w-[38%] flex flex-col gap-6 transition-all duration-700 ease-out delay-150 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}`}
          >
            {INFO_CARDS.map(({ icon: Icon, label, value, sub, color, id }) => (
              <div
                key={id} 
                id={id}
                className="glass rounded-2xl px-6 py-5 flex items-center gap-4 transition-all duration-300 hover:translate-x-1.5 flex-1"
                style={{ '--hover-color': color }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = color }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '' }}
              >
                <div 
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${color}20`, border: `1px solid ${color}40` }}
                >
                  <Icon size={20} style={{ color }} />
                </div>
                <div>
                  <div className="text-[0.72rem] text-slate-500 uppercase tracking-[0.08em] mb-0.5">{label}</div>
                  <div className="text-[0.9rem] font-semibold text-white/90">{value}</div>
                  <div className="text-[0.75rem] text-slate-500">{sub}</div>
                </div>
              </div>
            ))}

            {/* Availability */}
            <div className="rounded-2xl px-6 py-5 bg-green-500/[0.08] border border-green-500/25 flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_10px_#22C55E] flex-shrink-0 animate-pulse" />
              <div>
                <div className="text-[0.88rem] font-semibold text-green-400">Currently Available</div>
                <div className="text-[0.78rem] text-slate-500">Open to freelance &amp; full-time roles</div>
              </div>
            </div>
          </div>

          {/* RIGHT – Form */}
          <div
            className={`w-full lg:w-[60%] transition-all duration-700 ease-out delay-300 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'}`}
          >
            <div className="glass-strong rounded-2xl p-9">
              {status === 'success' ? (
                <div className="text-center py-8 flex flex-col items-center gap-4">
                  <CheckCircle size={52} className="text-green-500" />
                  <h3 className="text-[1.3rem] font-bold text-white">Message Sent! 🎉</h3>
                  <p className="text-slate-400 max-w-[340px]">
                    Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                  </p>
                  <button 
                    className="btn-secondary mt-2 cursor-pointer border border-white/20 rounded-full px-6 py-2.5 bg-transparent text-white font-semibold hover:bg-white/5 transition-colors"
                    onClick={() => { setStatus('idle'); setForm({ name: '', email: '', subject: '', message: '' }) }}
                  >
                    Send Another
                  </button>
                </div>
              ) : status === 'error' ? (
                <div className="text-center py-8 flex flex-col items-center gap-4">
                  <AlertCircle size={52} className="text-red-500" />
                  <h3 className="text-[1.3rem] font-bold text-white">Message Failed to Send</h3>
                  <p className="text-slate-400 max-w-[340px]">
                    Something went wrong on our end. Please try again, or email me directly at{' '}
                    <a href="mailto:mohamedelhussien5@gmail.com" className="text-[var(--color-accent-light)] underline">
                      mohamedelhussien5@gmail.com
                    </a>.
                  </p>
                  <button
                    className="btn-secondary mt-2 cursor-pointer border border-white/20 rounded-full px-6 py-2.5 bg-transparent text-white font-semibold hover:bg-white/5 transition-colors"
                    onClick={() => setStatus('idle')}
                  >
                    Try Again
                  </button>
                </div>
              ) : (
                <form id="contact-form" onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                  {/* Name + Email */}
                  <div className="flex flex-col sm:flex-row gap-5">
                    <div className="flex-1">
                      <label htmlFor="contact-name" className="block text-[0.82rem] font-medium text-slate-400 mb-1.5">
                        Full Name <span className="text-purple-400">*</span>
                      </label>
                      <input 
                        id="contact-name" 
                        name="name" 
                        type="text" 
                        placeholder="John Doe" 
                        value={form.name} 
                        onChange={handleChange} 
                        className={errors.name ? inputErrorClass : inputBaseClass}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-[0.75rem] mt-1.5 flex items-center gap-1">
                          <AlertCircle size={12} />{errors.name}
                        </p>
                      )}
                    </div>
                    <div className="flex-1">
                      <label htmlFor="contact-email" className="block text-[0.82rem] font-medium text-slate-400 mb-1.5">
                        Email Address <span className="text-purple-400">*</span>
                      </label>
                      <input 
                        id="contact-email" 
                        name="email" 
                        type="email" 
                        placeholder="john@example.com" 
                        value={form.email} 
                        onChange={handleChange} 
                        className={errors.email ? inputErrorClass : inputBaseClass}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-[0.75rem] mt-1.5 flex items-center gap-1">
                          <AlertCircle size={12} />{errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="contact-subject" className="block text-[0.82rem] font-medium text-slate-400 mb-1.5">Subject</label>
                    <input 
                      id="contact-subject" 
                      name="subject" 
                      type="text" 
                      placeholder="Project inquiry / Job opportunity / Just saying hi!" 
                      value={form.subject} 
                      onChange={handleChange} 
                      className={inputBaseClass}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="contact-message" className="block text-[0.82rem] font-medium text-slate-400 mb-1.5">
                      Message 
                    </label>
                    <textarea
                      id="contact-message" 
                      name="message" 
                      rows={5}
                      placeholder="Tell me about your project, goals, and timeline…"
                      value={form.message} 
                      onChange={handleChange}
                      className={`${errors.message ? inputErrorClass : inputBaseClass} resize-y min-h-[130px]`}
                    />
                  </div>

                  {/* Submit */}
                  <button
  id="contact-submit"
  type="submit"
  className="btn-primary self-center lg:self-start disabled:opacity-70 disabled:cursor-not-allowed"
  disabled={status === 'sending'}
>
  <span>{status === 'sending' ? 'Sending…' : 'Send Message'}</span>
  <Send size={15} className="relative z-10" />
</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}