import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { FAQS } from '../data/studioData';
import { FaqBrandMarkSvg } from './BrandSvgs';
import { MagneticHeading } from './MagneticHeading';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const qRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const aRefs = useRef<(HTMLDivElement | null)[]>([]);
  const logoRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const getOpenWidth = () => (window.innerWidth >= 992 ? '56%' : '82%');

    FAQS.forEach((_, idx) => {
      const qEl = qRefs.current[idx];
      const aEl = aRefs.current[idx];
      const logoEl = logoRefs.current[idx];
      const isOpen = idx === openIndex;

      if (qEl) {
        gsap.to(qEl, {
          width: isOpen ? getOpenWidth() : '100%',
          borderWidth: isOpen ? 1 : 0,
          duration: 0.45,
          ease: 'power3.out',
          overwrite: 'auto',
        });
      }

      if (aEl) {
        if (isOpen) {
          gsap.set(aEl, { display: 'flex', overflow: 'hidden' });
          gsap.to(aEl, {
            height: 'auto',
            opacity: 1,
            scale: 1,
            duration: 0.48,
            ease: 'back.out(1.2)',
            overwrite: 'auto',
            onComplete: () => {
              gsap.set(aEl, { overflow: 'visible' });
            },
          });
        } else {
          gsap.to(aEl, {
            height: 0,
            opacity: 0,
            scale: 0.86,
            duration: 0.32,
            ease: 'power2.inOut',
            overwrite: 'auto',
            onComplete: () => {
              gsap.set(aEl, { display: 'none' });
            },
          });
        }
      }

      if (logoEl) {
        gsap.to(logoEl, {
          scale: isOpen ? 1 : 0,
          duration: isOpen ? 0.45 : 0.25,
          delay: isOpen ? 0.1 : 0,
          ease: isOpen ? 'back.out(1.8)' : 'power2.in',
          overwrite: 'auto',
        });
      }
    });
  }, [openIndex]);

  const handleToggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="faq" className="w-full flex justify-center py-[6em] md:py-[9em]">
      <div
        className="w-full flex flex-col md:flex-row justify-between items-start gap-[2.5em] px-[1.25em]"
        style={{ maxWidth: 'var(--size-container)' }}
      >
        {/* Left Sticky Column: Heading + Oreo/Oliver Sleeping Cat SVG */}
        <div className="w-full md:w-[40%] md:sticky md:top-[5.5em] flex flex-col justify-between items-start gap-[3em] md:min-h-[82svh]">
          <div className="flex flex-col items-start gap-[1.25em]">
            <div className="font-sans-body font-medium uppercase text-black text-[1.125em] leading-none">
              Frequently Asked Questions
            </div>
            <MagneticHeading text="THINGS YOU MIGHT ASK" maxWidth="5.2em" align="left" />
          </div>

          <div className="w-full max-w-[34em] hidden md:block">
            <img
              src="/two26/images/faq-cat.svg"
              alt="Sleeping Two26 studio cat illustration"
              loading="lazy"
              referrerPolicy="no-referrer"
              className="w-full h-auto block"
            />
          </div>
        </div>

        {/* Right Chat-Bubble Accordion Column */}
        <div className="w-full md:w-[58%] flex flex-col gap-[1em] pt-[1em] md:pt-[3em]">
          {FAQS.map((item, idx) => {
            const isOpen = idx === openIndex;
            return (
              <div key={item.id} className="w-full flex flex-col gap-[0.55em]">
                {/* Question Bubble */}
                <button
                  ref={(el) => {
                    qRefs.current[idx] = el;
                  }}
                  type="button"
                  onClick={() => handleToggle(idx)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${item.id}`}
                  className="two26-question-bubble text-left focus-visible:outline-2 focus-visible:outline-[#ff5400]"
                  style={{
                    width: idx === 0 ? '56%' : '100%',
                    borderWidth: idx === 0 ? '1px' : '0px',
                  }}
                >
                  <span className="font-sans-body font-medium text-black text-[1.125em] leading-[1.25]">
                    {item.question}
                  </span>
                </button>

                {/* Answer Bubble + Two26 Circular Orange Avatar */}
                <div
                  id={`faq-panel-${item.id}`}
                  ref={(el) => {
                    aRefs.current[idx] = el;
                  }}
                  className="w-full flex justify-end items-end gap-[0.6em] origin-bottom-right"
                  style={{
                    display: idx === 0 ? 'flex' : 'none',
                    height: idx === 0 ? 'auto' : 0,
                    opacity: idx === 0 ? 1 : 0,
                  }}
                >
                  <div className="two26-answer-bubble">
                    <p className="font-sans-body text-black text-[1.125em] leading-[1.34] m-0">
                      {item.answer}
                    </p>
                  </div>

                  <div
                    ref={(el) => {
                      logoRefs.current[idx] = el;
                    }}
                    className="rounded-full bg-[#ff5400] shrink-0 flex items-center justify-center"
                    style={{ width: '3.5em', height: '3.5em' }}
                    aria-hidden="true"
                  >
                    <FaqBrandMarkSvg />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
