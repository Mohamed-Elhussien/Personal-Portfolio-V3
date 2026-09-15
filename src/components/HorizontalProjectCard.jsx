import React, { memo } from 'react'

const HorizontalProjectCard = memo(function HorizontalProjectCard({
  project,
  index,
  isActive,
  isPrev,
  isNext,
  isFirst,
  isLast,
  onSelect,
}) {
  // 3D rotation + scale + opacity — كلها CSS transitions (أسرع من Framer Motion)
  const rotateY = isPrev ? 8 : isNext ? -8 : 0
  const scale = isActive ? 1 : 0.9
  const opacity = isActive ? 1 : isPrev || isNext ? 0.5 : 0.3

  return (
    <div
      className={[
        'project-card flex-shrink-0 w-[70vw] h-[60vh] snap-center',
        isFirst ? 'ml-[15vw]' : '',
        isLast ? 'mr-[15vw]' : '',
      ].join(' ')}
    >
      <div
        className="w-full h-full rounded-3xl overflow-hidden relative bg-gray-900 cursor-pointer group"
        style={{
          perspective: 1000,
          transform: `scale3d(${scale}, ${scale}, 1) rotateY(${rotateY}deg) translateZ(0)`,
          opacity,
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease-out',
          willChange: 'transform, opacity',
          transformStyle: 'preserve-3d',
        }}
        onClick={() => onSelect(project)}
      >
        {/* ===== الصورة تملأ الكارت بالكامل (background) ===== */}
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Gradient overlay من تحت عشان النص يبان فوق الصورة */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/50 to-transparent" />

        {/* Featured Badge — الشمال فوق */}
        {project.featured && (
          <span className="absolute top-4 left-4 z-10 px-3 py-1.5 text-xs font-bold bg-blue-500 text-white rounded-full shadow-lg backdrop-blur-sm border border-blue-400/30">
            FEATURED
          </span>
        )}

        {/* رقم المشروع — overlay شفاف فوق الصورة */}
        <div className="absolute bottom-4 right-5 z-10 text-6xl md:text-7xl font-bold text-white/10 select-none pointer-events-none leading-none">
          {String(index + 1).padStart(2, '0')}
        </div>

        {/* ===== المحتوى — اسم المشروع + زرارين بس ===== */}
        <div className="absolute inset-x-0 bottom-0 z-10 p-6 md:p-8">
          {/* Title */}
          <div
            className="transition-all duration-350 ease-out"
            style={{
              transform: isActive ? 'translate3d(0, 0, 0)' : 'translate3d(0, 10px, 0)',
              opacity: isActive ? 1 : 0,
            }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {project.title}
            </h2>
          </div>

          {/*
            Buttons — بقوا <a> حقيقية بـ href مباشر بدل onClick + window.open.
            كده المتصفح بيتعامل معاهم صح تلقائيًا (right-click "افتح في تاب جديد"،
            middle-click، Ctrl+click، وaccessibility أفضل).
          */}
          <div
            className="transition-all duration-350 ease-out flex gap-3"
            style={{
              transform: isActive ? 'translate3d(0, 0, 0)' : 'translate3d(0, 15px, 0)',
              opacity: isActive ? 1 : 0,
              transitionDelay: '60ms',
            }}
          >
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold text-sm rounded-full transition-colors duration-200"
            >
              View Project
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="px-5 py-2.5 bg-gray-800 hover:bg-gray-700 active:bg-gray-600 text-white font-bold text-sm rounded-full transition-colors duration-200 border border-gray-700"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  )
})

export default HorizontalProjectCard