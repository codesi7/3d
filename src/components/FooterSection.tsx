import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CtaArrowSvg, FooterGiantLogoSvg } from './BrandSvgs';
import { CtaButton } from './CtaButton';

gsap.registerPlugin(ScrollTrigger);

interface FooterSectionProps {
  onOpenContact: () => void;
  onNavigate: (sectionId: string) => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({
  onOpenContact,
  onNavigate,
}) => {
  const footerRef = useRef<HTMLElement>(null);
  const logoWrapRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { y: 45, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: footer,
              start: 'top 78%',
              once: true,
            },
          }
        );
      }

      if (logoWrapRef.current) {
        gsap.fromTo(
          logoWrapRef.current,
          { y: 60, scaleY: 0.88, opacity: 0 },
          {
            y: 0,
            scaleY: 1,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            transformOrigin: 'bottom center',
            scrollTrigger: {
              trigger: footer,
              start: 'top 65%',
              once: true,
            },
          }
        );
      }
    }, footer);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      id="contact"
      ref={footerRef}
      className="relative w-full min-h-[100svh] bg-[#ff5400] overflow-hidden flex flex-col justify-between"
    >
      {/* Subtle Signature Texture Overlay + Gradient */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-60 mix-blend-soft-light"
        aria-hidden="true"
      >
        <img
          src="/two26/images/footer-texture.svg"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{ backgroundImage: 'linear-gradient(#f7620400, #f76204)' }}
        aria-hidden="true"
      />

      {/* Footer Content Container */}
      <div className="relative z-10 w-full flex-1 flex flex-col justify-between p-[1.5em] md:p-[2em]">
        {/* Top Row: Left Headline + CTA + Email | Right Menus + Socials + Location */}
        <div className="w-full flex flex-col md:flex-row justify-between items-start gap-[3em] pt-[1.5em]">
          {/* Top Left */}
          <div className="flex flex-col items-start gap-[1.35em]" style={{ maxWidth: '24em' }}>
            <h2
              ref={headingRef}
              className="font-display-dark text-[#fdf8f5] text-[3.75em] leading-[1.02] font-normal m-0"
            >
              Okay, that&apos;s enough website
            </h2>

            <CtaButton label="Let's Talk" onClick={onOpenContact} variant="dark" />

            <div className="flex flex-col items-start gap-[0.35em] pt-[0.85em]">
              <span className="font-sans-body font-medium text-[#fdf8f5]/60 text-[1.125em] leading-none">
                Email us
              </span>
              <a
                href="mailto:bogdan@two26.studio?subject=Hey%20Two26!"
                className="font-sans-body font-medium text-[#fdf8f5] text-[1.25em] leading-[1.35] hover:underline underline-offset-4 transition-opacity hover:opacity-90"
              >
                bogdan@two26.studio
              </a>
            </div>
          </div>

          {/* Top Right */}
          <div className="flex flex-col justify-between items-start md:items-end gap-[3.5em] w-full md:w-auto md:min-w-[36%]">
            <div className="w-full flex flex-row justify-between items-start gap-[4em] md:gap-[8em]">
              {/* Main Menu */}
              <div className="flex flex-col items-start gap-[0.35em]">
                <span className="font-sans-body font-medium text-[#fdf8f5]/60 text-[1.125em] mb-[0.45em] leading-none">
                  Main Menu
                </span>
                <button
                  type="button"
                  onClick={() => onNavigate('projects')}
                  className="font-sans-body font-medium text-[#fdf8f5] text-[1.125em] leading-[1.45] hover:opacity-75 transition-opacity cursor-pointer"
                >
                  Work
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="font-sans-body font-medium text-[#fdf8f5] text-[1.125em] leading-[1.45] hover:opacity-75 transition-opacity cursor-pointer"
                >
                  About us
                </button>
              </div>

              {/* Social Links */}
              <div className="flex flex-col items-start gap-[0.55em]">
                {[
                  { label: 'Instagram', href: 'https://www.instagram.com/two26.studio/' },
                  { label: 'Behance', href: 'https://www.behance.net/two26studio' },
                  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/two26-studio/' },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group inline-flex items-center gap-[0.55em] font-sans-body font-medium text-[#fdf8f5] text-[1.125em] leading-[1.3] hover:opacity-80 transition-opacity"
                  >
                    <span>{social.label}</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]">
                      <CtaArrowSvg className="w-[0.65em] h-[0.65em]" />
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Bottom Metadata: Craft note + Bucharest, Romania */}
            <div className="w-full flex flex-row justify-between items-end gap-[3em]">
              <div className="font-sans-body font-medium text-[#fdf8f5] text-[1.125em] leading-[1.35]">
                <div>Handmade by humans.</div>
                <div>Well, digitally</div>
              </div>

              <div className="font-sans-body font-medium text-[#fdf8f5] text-[1.125em] leading-[1.35] text-right">
                <div>Bucharest,</div>
                <div>Romania</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Giant Full-Width TWO26 Wordmark + Copyright */}
        <div ref={logoWrapRef} className="w-full flex flex-col items-start gap-[1em] pt-[4em]">
          <div className="w-full">
            <FooterGiantLogoSvg />
          </div>
          <div className="font-sans-body font-medium text-[#fdf8f5] text-[0.8em]">
            © Copyright 2026 - Two26 Studio
          </div>
        </div>
      </div>
    </footer>
  );
};
