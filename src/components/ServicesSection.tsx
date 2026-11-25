import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import lottie, { AnimationItem } from 'lottie-web';
import { SERVICES, ServiceItem } from '../data/studioData';
import { MagneticHeading } from './MagneticHeading';

gsap.registerPlugin(ScrollTrigger);

const DESKTOP_PATH_D =
  'M1601 15C1241.24 56.6913 1025.14 308.977 1139.71 377.393C1191.45 408.29 1240.74 339.444 1181.39 282.059C1075.45 179.627 937.582 215.243 741.458 298.287C701.638 315.147 622.383 350.59 552.298 410.201C487.298 465.486 487.725 549.018 534.765 563.77C581.804 578.523 632.714 579.634 681.058 587.392C729.731 595.202 767.011 617.17 797.836 657.756C833.766 705.065 838.864 772.034 862.127 825.767C890.491 891.283 966.341 911.2 1033.5 915.638C1130.56 922.052 1195.74 891.215 1286.16 899.069C1347.7 904.414 1457.75 932.208 1466.92 1059.42C1477.81 1210.68 1340.4 1252.99 1221.76 1286.05C1118.2 1314.91 997.775 1397.54 862.127 1334.5C757.468 1285.86 666.411 1293.34 650.401 1384.21C634.391 1475.07 710.968 1532.13 837.283 1542.81C963.598 1553.5 1146.44 1534.93 1181.39 1676C1226.53 1858.21 954.075 1839.5 797.836 1839.5C661.891 1839.5 422.283 1807.72 385.5 1700C340.427 1568 635.939 1584.37 465.5 1917C414.516 2016.5 310 2165.31 15 2165.31';

const MOBILE_PATH_D =
  'M542.705 10C465.727 48.981 92.8237 79.5116 92.8237 185.592C92.8237 291.673 352.712 336 346.322 440.868C339.933 545.736 104.278 543.251 92.8237 652.131C79.6013 777.82 353.287 765.564 346.322 898.5C339.358 1031.44 63.9084 911.5 68 1046C72.0916 1180.5 335.245 1170.41 328.309 1279.59C320.5 1402.5 -37.4522 1513.46 -135.704 1545.09';

const ServiceLottie: React.FC<{ path: string; name: string }> = ({ path, name }) => {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let anim: AnimationItem | null = null;
    try {
      anim = lottie.loadAnimation({
        container: host,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path,
      });
    } catch {
      // Fallback handled cleanly via container sizing
    }
    return () => {
      anim?.destroy();
    };
  }, [path]);

  return (
    <div
      ref={hostRef}
      aria-label={`${name} illustration`}
      className="w-full h-full flex items-center justify-center"
    />
  );
};

export const ServicesSection: React.FC = () => {
  const bodyRef = useRef<HTMLDivElement>(null);
  const desktopDarkPathRef = useRef<SVGPathElement>(null);
  const mobileDarkPathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const body = bodyRef.current;
    if (!body) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const desktopPath = desktopDarkPathRef.current;
      const mobilePath = mobileDarkPathRef.current;
      const paths = [desktopPath, mobilePath].filter(Boolean) as SVGPathElement[];

      paths.forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });

      const layers = gsap.utils.toArray<HTMLElement>('[data-service-layer]');
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: body,
          start: 'top 70%',
          end: 'bottom 72%',
          scrub: 1.1,
          invalidateOnRefresh: true,
        },
      });

      // Draw orange winding path smoothly from top to bottom
      paths.forEach((p) => {
        masterTl.to(p, { strokeDashoffset: 0, ease: 'none', duration: 1 }, 0);
      });

      // Expand each service Lottie + pop in its tilted description pill as the path reaches it
      const total = layers.length;
      layers.forEach((layer, index) => {
        const lottieBox = layer.querySelector<HTMLElement>('[data-service-lottie]');
        const pill = layer.querySelector<HTMLElement>('[data-service-pill]');
        const point = total > 1 ? (index / (total - 1)) * 0.85 : 0;

        if (lottieBox) {
          gsap.set(lottieBox, {
            width: 0,
            scale: 0,
            opacity: 0,
            transformOrigin: 'center center',
          });
          masterTl.to(
            lottieBox,
            {
              width: '7.25em',
              scale: 1,
              opacity: 1,
              duration: 0.14,
              ease: 'back.out(1.7)',
            },
            point
          );
        }

        if (pill) {
          gsap.set(pill, {
            scale: 0,
            opacity: 0,
            rotation: 4,
            transformOrigin: 'center center',
          });
          masterTl.to(
            pill,
            {
              scale: 1,
              opacity: 1,
              rotation: -5,
              duration: 0.14,
              ease: 'back.out(1.6)',
            },
            point + 0.04
          );
        }
      });
    }, body);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" className="w-full flex flex-col items-center pt-[6em] pb-[6em] overflow-hidden">
      <div className="w-full flex flex-col items-center gap-[5em]">
        {/* Section Header */}
        <div className="w-full relative flex flex-col md:flex-row justify-center items-center px-[1.25em]">
          <div className="font-sans-body font-medium uppercase text-black text-[1.125em] leading-none md:absolute md:left-[1.25em] md:top-[0.3em] mb-[0.75em] md:mb-0">
            Our Services
          </div>
          <MagneticHeading text="THIS IS OUR THING" maxWidth="5.2em" align="center" />
        </div>

        {/* Winding SVG Ribbon + 7 Service Layers */}
        <div
          ref={bodyRef}
          className="relative w-full flex flex-col items-center justify-center"
          style={{ maxWidth: 'var(--size-container)' }}
        >
          {/* Desktop Winding Path (Background muted + Foreground scroll-drawn solid orange) */}
          <div className="hidden md:block relative w-full pointer-events-none select-none" aria-hidden="true">
            {/* Muted 25% track */}
            <svg
              width="100%"
              height="auto"
              viewBox="0 0 1616 2187"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto block opacity-25"
              style={{ overflow: 'visible' }}
            >
              <path
                d={DESKTOP_PATH_D}
                stroke="#FF5400"
                strokeWidth="16"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {/* Active Scroll-Drawn Path */}
            <svg
              width="100%"
              height="auto"
              viewBox="0 0 1616 2187"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto block absolute inset-0"
              style={{ overflow: 'visible' }}
            >
              <path
                ref={desktopDarkPathRef}
                d={DESKTOP_PATH_D}
                stroke="#FF5400"
                strokeWidth="16"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {/* Start & End Portal Badges */}
            <div className="absolute right-[0.4%] top-[0.1%] w-[2.1em]">
              <svg viewBox="0 0 33 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="20.5" cy="34.5" rx="12.5" ry="3.5" fill="black" />
                <ellipse cx="12.5" cy="18" rx="12" ry="17.5" fill="#FF5400" stroke="black" />
              </svg>
            </div>
            <div className="absolute left-[0.4%] bottom-[0.2%] w-[2.1em]">
              <svg viewBox="0 0 33 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="12.5" cy="34.5" rx="12.5" ry="3.5" fill="black" />
                <ellipse cx="20.5" cy="18" rx="12" ry="17.5" fill="#FF5400" stroke="black" />
              </svg>
            </div>
          </div>

          {/* Mobile Winding Path */}
          <div className="block md:hidden relative w-full pointer-events-none select-none" aria-hidden="true">
            <svg
              width="100%"
              height="auto"
              viewBox="0 0 407 1556"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto block opacity-25"
            >
              <path d={MOBILE_PATH_D} stroke="#FF5400" strokeWidth="18" strokeLinecap="round" />
            </svg>
            <svg
              width="100%"
              height="auto"
              viewBox="0 0 407 1556"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto block absolute inset-0"
            >
              <path
                ref={mobileDarkPathRef}
                d={MOBILE_PATH_D}
                stroke="#FF5400"
                strokeWidth="18"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* 7 Service Layers Positioned Along the Winding Path */}
          <div className="absolute inset-0 z-10 flex flex-col justify-between items-center py-[6em] md:py-[9em] px-[1.25em]">
            {SERVICES.map((service: ServiceItem) => (
              <div
                key={service.id}
                data-service-layer
                className="w-full flex flex-col items-center justify-center relative"
              >
                <div className={`two26-service-block ${service.className}`}>
                  <span className="two26-service-text">{service.wordLeft}</span>

                  <div
                    data-service-lottie
                    className="shrink-0 overflow-hidden flex items-center justify-center"
                    style={{ width: '7.25em', height: '5.5em' }}
                  >
                    <ServiceLottie
                      path={service.lottiePath}
                      name={`${service.wordLeft} ${service.wordRight ?? ''}`.trim()}
                    />
                  </div>

                  {service.wordRight && (
                    <span className="two26-service-text">{service.wordRight}</span>
                  )}

                  {/* Tilted Description Pill (Desktop) */}
                  <div data-service-pill className="two26-service-para-pill">
                    <p className="font-sans-body font-medium text-[#ff5400] text-[0.875em] leading-[1.2] m-0">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Mobile readable description below service title */}
                <p className="md:hidden mt-[0.65em] max-w-[24em] text-center font-sans-body font-medium text-[#ff5400] bg-[#fdf8f5]/95 border border-[#ff5400]/40 rounded-full px-[1.1em] py-[0.5em] text-[0.85em] leading-[1.25]">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
