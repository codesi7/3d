import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ABOUT_COPY =
  'We believe creative work needs focus. That’s why we keep our team tight and our involvement high, so every project gets our full attention. We build brands from scratch or make them better.';

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const pill1Ref = useRef<HTMLDivElement>(null);
  const pill2Ref = useRef<HTMLDivElement>(null);
  const pill3Ref = useRef<HTMLDivElement>(null);

  const words = ABOUT_COPY.split(' ');

  useEffect(() => {
    const section = sectionRef.current;
    const pinned = pinnedRef.current;
    if (!section || !pinned) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const wordEls = wordsRef.current.filter(Boolean) as HTMLSpanElement[];
    const pills = [pill2Ref.current, pill1Ref.current, pill3Ref.current].filter(
      Boolean
    ) as HTMLDivElement[];

    const ctx = gsap.context(() => {
      gsap.set(wordEls, { opacity: 0.18 });
      gsap.set(pills, { opacity: 0, scale: 0.6, y: 24 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 15%',
          end: '+=110%',
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      // Highlight words sequentially across scroll
      tl.to(
        wordEls,
        {
          opacity: 1,
          stagger: 0.035,
          duration: 0.25,
          ease: 'none',
        },
        0
      );

      // Pop in the 3 signature orange pills at staggered scroll progress
      if (pills[0]) {
        tl.to(
          pills[0],
          { opacity: 1, scale: 1, y: 0, duration: 0.28, ease: 'back.out(1.7)' },
          0.25
        );
      }
      if (pills[1]) {
        tl.to(
          pills[1],
          { opacity: 1, scale: 1, y: 0, duration: 0.28, ease: 'back.out(1.7)' },
          0.52
        );
      }
      if (pills[2]) {
        tl.to(
          pills[2],
          { opacity: 1, scale: 1, y: 0, duration: 0.28, ease: 'back.out(1.7)' },
          0.78
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="w-full flex justify-center items-center py-[4em]"
    >
      <div
        ref={pinnedRef}
        className="w-full flex justify-center items-center px-[1.25em] relative"
        style={{
          minHeight: '88svh',
          maxWidth: 'var(--size-container)',
        }}
      >
        <div className="relative w-full flex flex-col justify-center items-center gap-[1.8em]">
          <div className="font-sans-body font-medium uppercase text-black text-center text-[1.125em] leading-none tracking-[0.02em]">
            A BIT ABOUT US
          </div>

          <p className="two26-about-para relative z-[2]">
            {words.map((word, idx) => (
              <React.Fragment key={idx}>
                <span
                  ref={(el) => {
                    wordsRef.current[idx] = el;
                  }}
                  className="inline-block will-change-[opacity]"
                >
                  {word}
                </span>
                {idx < words.length - 1 ? ' ' : ''}
              </React.Fragment>
            ))}
          </p>

          {/* Second Pill: Professional overthinkers */}
          <div
            ref={pill2Ref}
            className="two26-about-pill top-[14%] right-[8%] md:right-[12%] -rotate-[4deg] max-sm:text-[0.72em] max-sm:top-[-4%] max-sm:right-[2%]"
          >
            <span className="font-sans-body font-medium text-[#fdf8f5] text-[1em] whitespace-nowrap">
              Professional overthinkers
            </span>
          </div>

          {/* First Pill: Nerding out on design */}
          <div
            ref={pill1Ref}
            className="two26-about-pill top-[55%] left-[6%] md:left-[14%] rotate-[5deg] max-sm:text-[0.72em] max-sm:top-[48%] max-sm:left-[0%]"
          >
            <span className="font-sans-body font-medium text-[#fdf8f5] text-[1em] whitespace-nowrap">
              Nerding out on design
            </span>
          </div>

          {/* Third Pill: Allergic to generic */}
          <div
            ref={pill3Ref}
            className="two26-about-pill bottom-[8%] right-[10%] md:right-[18%] -rotate-[4.5deg] max-sm:text-[0.72em] max-sm:-bottom-[10%] max-sm:right-[4%]"
          >
            <span className="font-sans-body font-medium text-[#fdf8f5] text-[1em] whitespace-nowrap">
              Allergic to generic
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
