import React, { useEffect, useRef } from 'react';
import { SHOWCASE_SLIDES } from '../data/studioData';

export const ShowcaseMarquee: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const wrapper = wrapperRef.current;
    if (!track || !wrapper) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let rafId = 0;
    let x = 0;
    let baseSpeed = 1.85;
    let boost = 0;
    let lastScrollY = window.scrollY;
    let isHovered = false;

    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY;
      lastScrollY = currentY;
      boost = Math.max(-14, Math.min(14, boost + delta * 0.14));
    };

    const onEnter = () => {
      isHovered = true;
    };
    const onLeave = () => {
      isHovered = false;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    wrapper.addEventListener('mouseenter', onEnter);
    wrapper.addEventListener('mouseleave', onLeave);

    const tick = () => {
      const halfWidth = track.scrollWidth / 2;
      if (halfWidth > 0) {
        const targetSpeed = isHovered ? baseSpeed * 0.35 : baseSpeed;
        boost *= 0.92;
        x -= targetSpeed + boost;

        if (x <= -halfWidth) x += halfWidth;
        if (x > 0) x -= halfWidth;

        track.style.transform = `translate3d(${x}px, 0, 0)`;

        // Subtle proximity inverse scale (center slides slightly scaled down/up gracefully)
        const viewportCenter = window.innerWidth / 2;
        const slideEls = track.children;
        for (let i = 0; i < slideEls.length; i++) {
          const slide = slideEls[i] as HTMLElement;
          const rect = slide.getBoundingClientRect();
          const slideCenter = rect.left + rect.width / 2;
          const distNorm = Math.min(1, Math.abs(slideCenter - viewportCenter) / (window.innerWidth * 0.65));
          const scale = 0.92 + distNorm * 0.08;
          slide.style.transform = `scale(${scale.toFixed(4)})`;
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      wrapper.removeEventListener('mouseenter', onEnter);
      wrapper.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  // Duplicate slides twice for seamless infinite loop
  const loopedSlides = [...SHOWCASE_SLIDES, ...SHOWCASE_SLIDES];

  return (
    <section
      className="w-full py-[5em] md:py-[8em] overflow-hidden"
      aria-label="Studio visual showcase"
    >
      <div ref={wrapperRef} className="w-full overflow-hidden relative">
        <div
          ref={trackRef}
          className="flex flex-row items-center gap-[0.5em] w-max will-change-transform"
        >
          {loopedSlides.map((slide, idx) => (
            <div
              key={`${slide.id}-${idx}`}
              className="shrink-0 overflow-hidden bg-[#f2e3da] will-change-transform"
              style={{
                width: '31.25em',
                height: '31.25em',
                borderRadius: '0.75em',
              }}
            >
              {slide.type === 'video' ? (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster={slide.poster}
                  className="w-full h-full object-cover"
                  aria-label={slide.alt}
                >
                  <source src={slide.src} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={slide.src}
                  alt={slide.alt}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
