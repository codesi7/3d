import React, { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TESTIMONIALS } from '../data/studioData';
import { MagneticHeading } from './MagneticHeading';
import { NavArrowUpSvg } from './BrandSvgs';

const ANGLE_PALETTE = [-7.5, 6.8, -5.5, 8.2, -8.5];

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const animatingRef = useRef(false);

  const total = TESTIMONIALS.length;

  const positionCards = useCallback(
    (activeIdx: number, immediate = false) => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        const order = (i - activeIdx + total) % total;
        const zIndex = total - order;
        card.style.zIndex = String(zIndex);

        const targetProps = {
          x: 0,
          y: order * 4,
          rotation: i === activeIdx ? 0 : ANGLE_PALETTE[i % ANGLE_PALETTE.length],
          scale: i === activeIdx ? 1 : 0.96 - order * 0.015,
          opacity: 1,
        };

        if (immediate) {
          gsap.set(card, targetProps);
        } else {
          gsap.to(card, {
            ...targetProps,
            duration: 0.55,
            ease: 'power3.out',
            overwrite: 'auto',
          });
        }
      });
    },
    [total]
  );

  useEffect(() => {
    positionCards(0, true);
  }, [positionCards]);

  const advanceCard = useCallback(
    (direction: 1 | -1 = 1) => {
      if (animatingRef.current) return;
      animatingRef.current = true;

      const outgoing = cardsRef.current[currentIndex];
      const nextIdx = (currentIndex + direction + total) % total;

      if (outgoing) {
        gsap.to(outgoing, {
          x: direction === 1 ? -140 : 140,
          y: -45,
          rotation: direction === 1 ? -14 : 14,
          opacity: 0,
          duration: 0.32,
          ease: 'power2.in',
          onComplete: () => {
            setCurrentIndex(nextIdx);
            positionCards(nextIdx, false);
            gsap.fromTo(
              outgoing,
              { opacity: 0, x: 0, y: 20 },
              {
                opacity: 1,
                y: (total - 1) * 4,
                duration: 0.4,
                ease: 'power2.out',
                onComplete: () => {
                  animatingRef.current = false;
                },
              }
            );
          },
        });
      } else {
        setCurrentIndex(nextIdx);
        positionCards(nextIdx, false);
        animatingRef.current = false;
      }
    },
    [currentIndex, total, positionCards]
  );

  const jumpToCard = (targetIdx: number) => {
    if (targetIdx === currentIndex || animatingRef.current) return;
    setCurrentIndex(targetIdx);
    positionCards(targetIdx, false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const stage = stageRef.current;
    const cursor = cursorRef.current;
    if (!stage || !cursor) return;
    const rect = stage.getBoundingClientRect();
    gsap.to(cursor, {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      duration: 0.18,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };

  return (
    <section id="testimonials" className="w-full flex flex-col items-center pt-[6em] pb-[4em]">
      <div className="w-full flex flex-col items-center gap-[2.5em]">
        {/* Section Header */}
        <div className="w-full relative flex flex-col md:flex-row justify-center items-center px-[1.25em]">
          <div className="font-sans-body font-medium uppercase text-black text-[1.125em] leading-none md:absolute md:left-[1.25em] md:top-[0.3em] mb-[0.75em] md:mb-0">
            TESTIMONIALS
          </div>
          <MagneticHeading text="APPARENTLY, THEY LIKE US" maxWidth="6.5em" align="center" />
        </div>

        {/* Full-Viewport Vibrant Orange Stacked Card Stage */}
        <div className="w-full h-[92svh] min-h-[38em] max-h-[62em] p-[1.25em] max-sm:p-[0.5em]">
          <div
            ref={stageRef}
            onClick={() => advanceCard(1)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
            role="region"
            aria-label="Client testimonials card deck. Click to view next testimonial."
            className="two26-testimonial-stage select-none"
          >
            {/* Floating Mouse-Following Circular Arrow Indicator (Desktop) */}
            <div
              ref={cursorRef}
              aria-hidden="true"
              className={`hidden md:flex pointer-events-none absolute top-0 left-0 z-50 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black text-[#f8eee8] transition-opacity duration-200 ${
                isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
              }`}
              style={{ width: '3.75em', height: '3.75em' }}
            >
              <span className="rotate-90 flex items-center justify-center">
                <NavArrowUpSvg />
              </span>
            </div>

            {/* Stacked Cards */}
            <div className="relative w-full h-full grid place-items-center px-[1em]">
              {TESTIMONIALS.map((item, idx) => (
                <div
                  key={item.id}
                  ref={(el) => {
                    cardsRef.current[idx] = el;
                  }}
                  style={{ gridArea: '1 / 1' }}
                  className="will-change-transform"
                >
                  <div className="two26-testimonial-card">
                    <h3 className="font-display-dark text-[#ff5400] text-[3.2em] leading-[0.88] text-left w-full m-0">
                      {item.heading}
                    </h3>

                    <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-[2em]">
                      {/* Customer Photo + Name + Role */}
                      <div className="flex flex-col items-center gap-[0.9em] shrink-0">
                        <div
                          className="rounded-full overflow-hidden bg-[#f2e3da] border border-[#ff5400]/20"
                          style={{ width: '7.5em', height: '7.5em' }}
                        >
                          <img
                            src={item.avatar}
                            alt={item.name}
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex flex-col items-center gap-[0.35em] text-center">
                          <div className="font-display-dark text-[#ff5400] text-[1.5em] leading-none">
                            {item.name}
                          </div>
                          <div className="font-sans-body font-medium text-[#ff5400] text-[1em] leading-none">
                            {item.designation}
                          </div>
                        </div>
                      </div>

                      {/* Review Description */}
                      <p
                        className="font-sans-body text-[#ff5400] text-[1.45em] leading-[1.24] m-0 w-full"
                        style={{ maxWidth: '22.6em' }}
                      >
                        {item.quote}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Sidebar Horizontal Tick Indicators */}
            <div
              className="hidden md:flex flex-col items-end justify-center gap-[0.65em] absolute right-[3.5%] top-1/2 -translate-y-1/2 z-40"
              onClick={(e) => e.stopPropagation()}
            >
              {TESTIMONIALS.map((item, idx) => {
                const active = idx === currentIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => jumpToCard(idx)}
                    aria-label={`Show testimonial from ${item.name}`}
                    className="py-[0.3em] pl-[0.5em] cursor-pointer group focus-visible:outline-2 focus-visible:outline-white"
                  >
                    <span
                      className={`block h-[2.5px] rounded-full transition-all duration-300 ${
                        active
                          ? 'w-[2.2em] bg-[#fdf8f5]'
                          : 'w-[1.1em] bg-[#fdf8f5]/45 group-hover:bg-[#fdf8f5]/80'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Bottom Controls & Counter */}
            <div
              className="absolute bottom-[1.5em] left-1/2 -translate-x-1/2 z-40 flex items-center gap-[1em]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => advanceCard(-1)}
                aria-label="Previous testimonial"
                className="w-[2.5em] h-[2.5em] rounded-full bg-black/85 hover:bg-black text-[#fdf8f5] flex items-center justify-center cursor-pointer transition-transform active:scale-95"
              >
                <ChevronLeft className="w-[1.1em] h-[1.1em]" />
              </button>
              <span className="font-sans-body font-medium text-[#fdf8f5] text-[0.95em] tabular-nums tracking-wide">
                0{currentIndex + 1} / 0{total}
              </span>
              <button
                type="button"
                onClick={() => advanceCard(1)}
                aria-label="Next testimonial"
                className="w-[2.5em] h-[2.5em] rounded-full bg-black/85 hover:bg-black text-[#fdf8f5] flex items-center justify-center cursor-pointer transition-transform active:scale-95"
              >
                <ChevronRight className="w-[1.1em] h-[1.1em]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
