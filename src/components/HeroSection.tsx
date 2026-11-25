import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface HeroSectionProps {
  ready: boolean;
}

const MARQUEE_REPEATS = Array.from({ length: 10 }, () => 'LET’S MAKE IT MAKE SENSE  •  GOOD LOOKS INCLUDED  •  ').join('');

export const HeroSection: React.FC<HeroSectionProps> = ({ ready }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);
  const pill1Ref = useRef<HTMLDivElement>(null);
  const pill2Ref = useRef<HTMLDivElement>(null);
  const pill3Ref = useRef<HTMLDivElement>(null);
  const leftPathRef = useRef<SVGPathElement>(null);
  const rightPathRef = useRef<SVGPathElement>(null);
  const marqueeBgRef = useRef<SVGPathElement>(null);
  const marqueeMaskRef = useRef<SVGPathElement>(null);
  const textPathRef = useRef<SVGTextPathElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize marquee loop continuously
    const tp = textPathRef.current;
    let rafId = 0;
    let offset = 0;
    const speed = 1.15;
    const loopDistance = 1280;

    const animateMarquee = () => {
      offset -= speed;
      if (offset <= -loopDistance) {
        offset += loopDistance;
      }
      if (tp) {
        tp.setAttribute('startOffset', `${offset}px`);
      }
      rafId = requestAnimationFrame(animateMarquee);
    };

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReduced) {
      rafId = requestAnimationFrame(animateMarquee);
    }

    return () => cancelAnimationFrame(rafId);
  }, []);

  useEffect(() => {
    const leftPath = leftPathRef.current;
    const rightPath = rightPathRef.current;
    const marqueeBg = marqueeBgRef.current;
    const marqueeMask = marqueeMaskRef.current;
    const lines = [line1Ref.current, line2Ref.current, line3Ref.current].filter(Boolean);
    const pills = [pill2Ref.current, pill1Ref.current, pill3Ref.current].filter(Boolean);

    if (leftPath) {
      const len = leftPath.getTotalLength();
      gsap.set(leftPath, { strokeDasharray: len, strokeDashoffset: len });
    }
    if (rightPath) {
      const len = rightPath.getTotalLength();
      gsap.set(rightPath, { strokeDasharray: len, strokeDashoffset: len });
    }
    if (marqueeBg) {
      const len = marqueeBg.getTotalLength();
      gsap.set(marqueeBg, { strokeDasharray: len, strokeDashoffset: -len });
    }
    if (marqueeMask) {
      const len = marqueeMask.getTotalLength();
      gsap.set(marqueeMask, { strokeDasharray: len, strokeDashoffset: -len });
    }

    if (!ready) {
      gsap.set(lines, { yPercent: 115, opacity: 0 });
      gsap.set(pills, { scale: 0.6, opacity: 0, y: 18 });
      if (videoWrapRef.current) {
        gsap.set(videoWrapRef.current, { opacity: 0, y: 24 });
      }
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // 1. Headline line-by-line mask reveal
    tl.to(lines, {
      yPercent: 0,
      opacity: 1,
      duration: 0.85,
      stagger: 0.1,
      ease: 'power4.out',
    });

    // 2. Left & Right organic hand-drawn SVG strokes draw in
    if (leftPath) {
      tl.to(
        leftPath,
        {
          strokeDashoffset: 0,
          duration: 1.25,
          ease: 'power2.inOut',
        },
        0.15
      );
    }
    if (rightPath) {
      tl.to(
        rightPath,
        {
          strokeDashoffset: 0,
          duration: 1.25,
          ease: 'power2.inOut',
        },
        0.22
      );
    }

    // 3. Three tilted black pills pop in with playful bounce
    tl.to(
      pills,
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'back.out(1.8)',
      },
      0.35
    );

    // 4. Center hero video fades in smoothly
    if (videoWrapRef.current) {
      tl.to(
        videoWrapRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        },
        0.35
      );
    }

    // 5. Curved orange marquee ribbon sweeps in from right to left
    if (marqueeBg && marqueeMask) {
      tl.to(
        [marqueeBg, marqueeMask],
        {
          strokeDashoffset: 0,
          duration: 1.15,
          ease: 'power3.inOut',
        },
        0.45
      );
    }

    return () => {
      tl.kill();
    };
  }, [ready]);

  return (
    <section id="hero" ref={sectionRef} className="w-full flex justify-center items-start">
      <div className="two26-hero-wrapper">
        {/* Left organic orange SVG swirl */}
        <div
          className="pointer-events-none absolute left-0 top-[35%] -translate-y-1/2 z-0 flex justify-center items-center"
          style={{ maxWidth: '12.5em', maxHeight: '35.625em' }}
          aria-hidden="true"
        >
          <div className="relative -left-[25%] w-full h-full">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 229 599"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ overflow: 'visible' }}
            >
              <path
                ref={leftPathRef}
                d="M33.502 584.112C104.502 557.112 147.911 474.964 143.002 393.612C139.502 335.612 106.002 281.612 59.0025 252.612C7.82072 221.032 -4.20053 385.572 52.5031 405.612C140.218 436.612 225.002 369.112 212.002 252.612C208.376 220.111 192.539 178.612 152.002 121.612C117.866 73.6124 42.0029 11.6124 42.0029 11.6124"
                stroke="#FF5400"
                strokeWidth="30"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Right organic orange SVG swirl */}
        <div
          className="pointer-events-none absolute right-0 top-[25%] -translate-y-1/2 z-0 flex justify-center items-center"
          style={{ maxWidth: '20.1875em', maxHeight: '28.75em' }}
          aria-hidden="true"
        >
          <div className="relative -right-[25%] w-full h-full">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 354 487"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ overflow: 'visible' }}
            >
              <path
                ref={rightPathRef}
                d="M250.687 12.2982C192.69 52.7982 114.69 199.814 245.687 315.798C376.684 431.783 364.19 140.889 235.187 83.2982C153.19 46.6926 54.8365 106.798 30.1893 172.298C-59.5565 410.798 277.687 471.798 277.687 471.798"
                stroke="#FF5400"
                strokeWidth="30"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Headline + 3 Tilted Black Tags */}
        <div
          className="relative z-10 w-full flex flex-col items-center px-[1em]"
          style={{ maxWidth: '64em', marginBottom: '2em' }}
        >
          <h1 className="two26-hero-heading relative z-[2] select-none">
            <span className="block overflow-hidden">
              <span ref={line1Ref} className="block">
                LOOKING
              </span>
            </span>
            <span className="block overflow-hidden">
              <span ref={line2Ref} className="block">
                SUSPICIOUSLY
              </span>
            </span>
            <span className="block overflow-hidden">
              <span ref={line3Ref} className="block">
                GOOD
              </span>
            </span>
          </h1>

          {/* Pill Two: Independent studio */}
          <div
            ref={pill2Ref}
            className="two26-hero-pill top-[14%] right-[32%] md:right-[39%] rotate-[3deg] max-sm:text-[0.75em] max-sm:top-[16%] max-sm:right-[10%]"
          >
            <span className="two26-hero-pill-text">Independent studio</span>
          </div>

          {/* Pill One: Branding & design */}
          <div
            ref={pill1Ref}
            className="two26-hero-pill top-[40%] left-[8%] md:left-[15%] -rotate-[7deg] max-sm:text-[0.75em] max-sm:top-[52%] max-sm:left-[4%]"
          >
            <span className="two26-hero-pill-text">Branding &amp; design</span>
          </div>

          {/* Pill Three: No funny business */}
          <div
            ref={pill3Ref}
            className="two26-hero-pill -bottom-[7%] right-[8%] md:right-[12%] -rotate-[5deg] max-sm:text-[0.75em] max-sm:-bottom-[14%] max-sm:right-[6%]"
          >
            <span className="two26-hero-pill-text">No funny business</span>
          </div>
        </div>

        {/* Center Hero Video Loop (mix-blend-mode: darken seamlessly blends light video bg onto blush pink) */}
        <div
          ref={videoWrapRef}
          className="relative z-10 w-full flex justify-center items-end overflow-hidden"
          style={{ maxWidth: 'var(--size-container)' }}
        >
          <div
            className="w-full relative overflow-hidden flex justify-center items-end"
            style={{
              minHeight: '36em',
              maxHeight: '40em',
              mixBlendMode: 'darken',
            }}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-contain max-h-[40em] max-md:max-h-[22em]"
              aria-label="Two26 Studio animated hero illustration"
            >
              <source src="/two26/videos/hero.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        {/* Curved Orange Ribbon Marquee SVG */}
        <div
          className="w-full flex justify-center items-center font-display-dark -mt-[4em] md:-mt-[6em] relative z-20"
          aria-label="Let's make it make sense, good looks included"
        >
          <svg
            viewBox="0 0 1440 370"
            preserveAspectRatio="xMidYMid meet"
            className="w-full h-auto block"
            style={{ overflow: 'visible' }}
          >
            <defs>
              <path
                id="two26-hero-marquee-curve"
                d="M-43.0867 292.81C179.631 174.299 464.078 116.458 712.699 90.6403C934.59 67.5984 1166.5 74.6231 1436.89 105.117 L 5000 507"
                fill="none"
              />
              <mask id="two26-hero-marquee-mask" maskUnits="userSpaceOnUse">
                <path
                  ref={marqueeMaskRef}
                  d="M-43.0867 292.81C179.631 174.299 464.078 116.458 712.699 90.6403C934.59 67.5984 1166.5 74.6231 1436.89 105.117"
                  stroke="#FFFFFF"
                  strokeWidth="220"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </mask>
            </defs>

            {/* Orange Curved Ribbon Stroke */}
            <path
              ref={marqueeBgRef}
              d="M-43.0867 292.81C179.631 174.299 464.078 116.458 712.699 90.6403C934.59 67.5984 1166.5 74.6231 1436.89 105.117"
              stroke="#FF5400"
              strokeWidth="154"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />

            {/* Scrolling Text along the curve */}
            <g mask="url(#two26-hero-marquee-mask)">
              <text
                className="two26-hero-marquee-text font-display-dark"
                fill="#FDF8F5"
                dominantBaseline="central"
                fontSize="80"
                fontWeight="400"
                style={{ letterSpacing: '0.03em', userSelect: 'none' }}
              >
                <textPath
                  ref={textPathRef}
                  href="#two26-hero-marquee-curve"
                  startOffset="0"
                >
                  {MARQUEE_REPEATS}
                </textPath>
              </text>
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
};
