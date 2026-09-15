// import { useEffect, useRef } from 'react'
// import Lenis from 'lenis'
// import gsap from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'

// gsap.registerPlugin(ScrollTrigger)

// export default function useLenis() {
//   const lenisRef = useRef(null)

//   useEffect(() => {
//     const lenis = new Lenis({
//       lerp: 0.08,
//       smoothWheel: true,
//       // ⚡ مهم: نقفل الـ raf loop الداخلي بتاع Lenis عشان يفضل
//       // فيه حلقة تحديث واحدة بس (اللي إحنا بنتحكم فيها يدويًا تحت
//       // عن طريق gsap.ticker). لو سبناها من غير كده، ممكن يشتغل
//       // اتنين raf loop مع بعض ويعملوا تصارع/تعليق في السكرول.
//       autoRaf: false,
//     })

//     lenisRef.current = lenis

//     // Sync Lenis with GSAP ScrollTrigger
//     lenis.on('scroll', ScrollTrigger.update)

//     // ⚡ خزّنا الـ function نفسها في متغيّر عشان نقدر نشيل
//     // نفس الـ reference بالظبط وقت الـ cleanup (قبل كده كنا
//     // بنحاول نشيل lenis.raf وهي مش نفس الفنكشن اللي اتضافت أصلاً،
//     // فكانت الحلقة القديمة بتفضل شغالة حتى بعد الـ unmount).
//     const update = (time) => {
//       lenis.raf(time * 1000)
//     }

//     gsap.ticker.add(update)
//     gsap.ticker.lagSmoothing(0)

//     return () => {
//       gsap.ticker.remove(update)
//       lenis.destroy()
//       lenisRef.current = null
//     }
//   }, [])

//   return lenisRef
// }