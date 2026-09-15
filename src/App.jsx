import { Suspense, lazy } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'

// 🔥 تحميل المكون بـ lazy عشان Suspense يشتغل صح
const HorizontalProjects = lazy(() => import('./components/HorizontalProjects.jsx'))

// UI بسيط للتحميل والخطأ لعدم وجود ملفات منفصلة لهم
const SectionLoader = () => (
  <div className="py-20 text-center text-gray-400">جاري تحميل المشاريع...</div>
)

const SectionError = () => (
  <div className="py-20 text-center text-red-400">حدث خطأ أثناء تحميل هذا الجزء.</div>
)

export default function App() {
  return (
    <div className="relative overflow-x-hidden" style={{ background: 'var(--color-bg-primary)' }}>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        
        {/* تركيب الـ ErrorBoundary والـ Suspense */}
        <ErrorBoundary fallback={<SectionError />}>
          <Suspense fallback={<SectionLoader />}>
            <HorizontalProjects />
          </Suspense>
        </ErrorBoundary>

        <Contact />
      </main>
      <Footer />
    </div>
  )
}