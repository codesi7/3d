import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Check, Copy, X } from 'lucide-react';
import { Two26LogoSvg } from './BrandSvgs';

interface ContactOverlayProps {
  open: boolean;
  onClose: () => void;
}

const TRANSITION_PATH_D =
  'M372.5 886C372.5 886 879.181 886 855 766.5C801.982 504.5 19.5 1042.52 19.5 646.5C19.5 316.5 952.535 583.56 978 318.5C1000 89.5 193.6 431.263 111 221C34.6544 26.6589 565 19 565 19';

export const ContactOverlay: React.FC<ContactOverlayProps> = ({ open, onClose }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const bgPathRef = useRef<SVGPathElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const catRef = useRef<HTMLDivElement>(null);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setVisible(true);
      document.body.style.overflow = 'hidden';
    } else if (visible) {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open, visible]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!visible) return;
    const overlay = overlayRef.current;
    const path = bgPathRef.current;
    const content = contentRef.current;
    const cat = catRef.current;
    if (!overlay || !path || !content || !cat) return;

    const len = path.getTotalLength();

    if (open) {
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
      gsap.set(content, { opacity: 0, y: 28 });
      gsap.set(cat, { yPercent: 100, opacity: 0 });

      const tl = gsap.timeline();
      tl.to(path, {
        strokeDashoffset: 0,
        duration: 0.72,
        ease: 'power2.inOut',
      })
        .to(
          content,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power3.out',
          },
          0.3
        )
        .to(
          cat,
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.65,
            ease: 'back.out(1.2)',
          },
          0.42
        );
    } else {
      const tl = gsap.timeline({
        onComplete: () => {
          setVisible(false);
        },
      });
      tl.to([content, cat], {
        opacity: 0,
        y: 20,
        duration: 0.25,
        ease: 'power2.in',
      }).to(
        path,
        {
          strokeDashoffset: len,
          duration: 0.45,
          ease: 'power2.inOut',
        },
        0.1
      );
    }
  }, [open, visible]);

  const handleCopy = (email: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email).catch(() => {});
    }
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 1800);
  };

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Contact Two26 Studio"
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
    >
      {/* Signature Brush-Wipe Orange Background SVG */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 998 901"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-full block"
          style={{ overflow: 'visible' }}
        >
          <path
            ref={bgPathRef}
            d={TRANSITION_PATH_D}
            stroke="#FF5400"
            strokeWidth="1600"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Top Contact Navbar */}
      <div className="fixed top-0 left-0 right-0 z-30 flex justify-between items-center p-[1.25em]">
        <div style={{ width: '7.9375em' }}>
          <Two26LogoSvg color="#F8EEE8" />
        </div>

        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-[0.55em] bg-[#fdf8f5] hover:bg-black hover:text-[#fdf8f5] text-black rounded-full px-[1.25em] py-[0.55em] font-sans-body font-medium text-[0.9em] cursor-pointer transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-white"
        >
          <X className="w-[1em] h-[1em]" />
          <span>Close</span>
        </button>
      </div>

      {/* Main Contact Content */}
      <div
        ref={contentRef}
        className="relative z-20 w-full max-w-[82em] px-[1.5em] md:px-[3em] flex flex-col md:flex-row justify-between items-start md:items-center gap-[3em]"
      >
        {/* Left Giant Typography */}
        <div className="w-full md:w-[56%] flex flex-col items-start md:items-center select-none">
          <h2 className="font-display text-[#f8eee8] uppercase text-[4.5em] md:text-[7.2em] font-bold leading-[0.82] m-0">
            <span className="block">want to</span>
            <span className="block md:translate-x-[0.35em]">start</span>
            <span className="block md:-translate-x-[0.35em]">a new</span>
            <span className="block md:translate-x-[0.2em]">project?</span>
          </h2>
          <p className="font-display text-[#f8eee8]/45 text-[2.2em] md:text-[3.1em] font-bold leading-none mt-[0.3em] md:translate-x-[0.8em] m-0">
            or just say hello!
          </p>
        </div>

        {/* Right Inquiries & Job Emails */}
        <div className="w-full md:w-[44%] flex flex-col items-start gap-[2.5em] md:gap-[3.5em]">
          <div className="flex flex-col items-start gap-[0.65em]">
            <div className="font-sans-body font-medium text-[#f8eee8]/75 text-[1.125em] leading-none">
              Inquiries &amp; Commissions
            </div>
            <div className="flex items-center gap-[0.75em] flex-wrap">
              <a
                href="mailto:bogdan@two26.studio?subject=New%20Project%20Inquiry"
                className="font-display-dark text-[#fdf8f5] text-[2.1em] md:text-[2.75em] leading-none hover:opacity-80 transition-opacity"
              >
                bogdan@two26.studio
              </a>
              <button
                type="button"
                onClick={() => handleCopy('bogdan@two26.studio')}
                aria-label="Copy bogdan@two26.studio"
                className="inline-flex items-center justify-center w-[2.2em] h-[2.2em] rounded-full border border-[#fdf8f5]/40 text-[#fdf8f5] hover:bg-[#fdf8f5] hover:text-[#ff5400] transition-colors cursor-pointer"
              >
                {copiedEmail === 'bogdan@two26.studio' ? (
                  <Check className="w-[0.95em] h-[0.95em]" />
                ) : (
                  <Copy className="w-[0.95em] h-[0.95em]" />
                )}
              </button>
            </div>
          </div>

          <div className="flex flex-col items-start gap-[0.65em]">
            <div className="font-sans-body font-medium text-[#f8eee8]/75 text-[1.125em] leading-none">
              Job Applications
            </div>
            <div className="flex items-center gap-[0.75em] flex-wrap">
              <a
                href="mailto:diana@two26.studio?subject=Job%20Application"
                className="font-display-dark text-[#fdf8f5] text-[2.1em] md:text-[2.75em] leading-none hover:opacity-80 transition-opacity"
              >
                diana@two26.studio
              </a>
              <button
                type="button"
                onClick={() => handleCopy('diana@two26.studio')}
                aria-label="Copy diana@two26.studio"
                className="inline-flex items-center justify-center w-[2.2em] h-[2.2em] rounded-full border border-[#fdf8f5]/40 text-[#fdf8f5] hover:bg-[#fdf8f5] hover:text-[#ff5400] transition-colors cursor-pointer"
              >
                {copiedEmail === 'diana@two26.studio' ? (
                  <Check className="w-[0.95em] h-[0.95em]" />
                ) : (
                  <Copy className="w-[0.95em] h-[0.95em]" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Social Pills */}
      <a
        href="https://www.linkedin.com/company/two26-studio/"
        target="_blank"
        rel="noreferrer noopener"
        className="fixed bottom-[1.5em] left-[1.5em] z-30 inline-flex items-center justify-center border border-[#fdf8f5] rounded-full px-[1.35em] py-[0.65em] text-[#f8eee8] font-sans-body font-medium text-[1.1em] hover:bg-[#fdf8f5] hover:text-[#ff5400] transition-colors"
      >
        Linkedin
      </a>

      <a
        href="https://www.instagram.com/two26.studio/"
        target="_blank"
        rel="noreferrer noopener"
        className="fixed bottom-[1.5em] right-[1.5em] z-30 inline-flex items-center justify-center border border-[#fdf8f5] rounded-full px-[1.35em] py-[0.65em] text-[#f8eee8] font-sans-body font-medium text-[1.1em] hover:bg-[#fdf8f5] hover:text-[#ff5400] transition-colors"
      >
        Instagram
      </a>

      {/* Peeking Cat Vector Illustration at Bottom */}
      <div
        ref={catRef}
        className="pointer-events-none fixed bottom-0 right-[16%] max-md:right-[50%] max-md:translate-x-1/2 z-10"
        style={{ height: '24em', maxHeight: '42svh' }}
        aria-hidden="true"
      >
        <img
          src="/two26/images/contact-cat.svg"
          alt=""
          className="h-full w-auto object-contain block"
        />
      </div>
    </div>
  );
};
