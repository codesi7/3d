import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Two26LogoSvg } from './BrandSvgs';
import { CtaButton } from './CtaButton';

interface NavbarProps {
  onOpenContact: () => void;
  onNavigate: (sectionId: string) => void;
}

const STROKE_PATH_D =
  'M0 21.5571C0 21.5571 6.56744 2.8501 15.4762 4.44988C25.7691 6.2982 5.66141 21.3471 12.5002 29.1915C22.9246 41.1486 29.3907 -7.93025 42.4603 1.12139C53.3211 8.6432 27.1823 26.7575 37.6982 34.7461C50.754 44.6641 58.0718 -7.92618 67.2619 5.59531C72.4564 13.2381 57.9637 30.3713 67.2619 30.3713C70.8333 30.3713 75 19.753 75 19.753';

const NavStrokeButton: React.FC<{ label: string; onClick: () => void }> = ({
  label,
  onClick,
}) => {
  const pathRef = useRef<SVGPathElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const length = path.getTotalLength();
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
      strokeWidth: 0,
    });
    const tl = gsap.timeline({ paused: true, defaults: { ease: 'power1.inOut' } });
    tl.to(path, {
      strokeDashoffset: 0,
      strokeWidth: 26,
      duration: 0.45,
    });
    tlRef.current = tl;
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => tlRef.current?.timeScale(1).play()}
      onMouseLeave={() => tlRef.current?.timeScale(1.4).reverse()}
      className="two26-nav-btn focus-visible:outline-2 focus-visible:outline-[#ff5400]"
    >
      <span className="navlink-text">{label}</span>
      <span className="stroke-fill" aria-hidden="true">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 75 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ overflow: 'visible' }}
          preserveAspectRatio="none"
        >
          <path
            ref={pathRef}
            d={STROKE_PATH_D}
            stroke="currentColor"
            strokeWidth="24"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
  );
};

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact, onNavigate }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const mobileDrawerRef = useRef<HTMLDivElement>(null);
  const mobileLinksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const drawer = mobileDrawerRef.current;
    const links = mobileLinksRef.current;
    if (!drawer || !links) return;

    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      gsap.set(drawer, { display: 'flex', pointerEvents: 'auto' });
      gsap.to(drawer, { opacity: 1, duration: 0.35, ease: 'power2.out' });
      gsap.fromTo(
        links.children,
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.07, duration: 0.45, ease: 'power3.out', delay: 0.1 }
      );
    } else {
      document.body.style.overflow = '';
      gsap.to(drawer, {
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
          gsap.set(drawer, { display: 'none', pointerEvents: 'none' });
        },
      });
    }
  }, [menuOpen]);

  const handleMobileNav = (target: string) => {
    setMenuOpen(false);
    setTimeout(() => onNavigate(target), 180);
  };

  return (
    <>
      <header className="two26-header">
        <nav className="two26-navbar-wrap" aria-label="Main navigation">
          {/* Left links (Desktop) */}
          <div className="hidden md:flex items-center gap-[0.5em]" style={{ minWidth: '17.25em' }}>
            <NavStrokeButton label="Work" onClick={() => onNavigate('projects')} />
            <NavStrokeButton label="About us" onClick={() => onNavigate('about')} />
          </div>

          {/* Center Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('hero');
            }}
            className="block shrink-0 transition-transform duration-300 hover:scale-[1.03]"
            style={{ width: '7.9375em' }}
            aria-label="Two26 Studio home"
          >
            <Two26LogoSvg color="#FF5400" />
          </a>

          {/* Right studio hours + CTA (Desktop) & Hamburger (Mobile) */}
          <div
            className="flex items-center justify-end gap-[3.5em]"
            style={{ minWidth: '17.25em' }}
          >
            <div
              className="hidden md:block font-sans-body font-medium text-black leading-[1.2]"
              style={{ maxWidth: '7.2em', fontSize: '0.875em' }}
            >
              Monday–Friday 10:00 – 17:00
            </div>

            <div className="hidden md:block">
              <CtaButton label="Let's Talk" onClick={onOpenContact} />
            </div>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menuOpen}
              className="md:hidden relative z-[1001] flex flex-col justify-center items-center w-[2.6em] h-[2.6em] rounded-full bg-[#fdf8f5] border border-black/10 cursor-pointer"
            >
              <span
                className={`block w-[1.15em] h-[2px] bg-[#ff5400] transition-transform duration-300 ${
                  menuOpen ? 'translate-y-[3px] rotate-45' : '-translate-y-[3px]'
                }`}
              />
              <span
                className={`block w-[1.15em] h-[2px] bg-[#ff5400] transition-transform duration-300 ${
                  menuOpen ? '-translate-y-[1px] -rotate-45' : 'translate-y-[3px]'
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Fullscreen Pink Drawer */}
      <div
        ref={mobileDrawerRef}
        className="md:hidden fixed inset-0 z-[998] hidden flex-col justify-between px-[1.5em] pt-[6.5em] pb-[2.5em]"
        style={{ backgroundColor: 'rgba(249, 226, 225, 0.96)', opacity: 0 }}
      >
        <div ref={mobileLinksRef} className="flex flex-col items-start gap-[1.5em]">
          <button
            type="button"
            onClick={() => handleMobileNav('projects')}
            className="font-display text-[3.75em] leading-[0.9] uppercase text-[#ff5400] cursor-pointer"
          >
            Work
          </button>
          <button
            type="button"
            onClick={() => handleMobileNav('about')}
            className="font-display text-[3.75em] leading-[0.9] uppercase text-[#ff5400] cursor-pointer"
          >
            About us
          </button>
          <button
            type="button"
            onClick={() => handleMobileNav('services')}
            className="font-display text-[3.75em] leading-[0.9] uppercase text-[#ff5400] cursor-pointer"
          >
            Services
          </button>
          <button
            type="button"
            onClick={() => handleMobileNav('faq')}
            className="font-display text-[3.75em] leading-[0.9] uppercase text-[#ff5400] cursor-pointer"
          >
            FAQ
          </button>
          <div className="pt-[1em]">
            <CtaButton
              label="Let's Talk"
              onClick={() => {
                setMenuOpen(false);
                setTimeout(onOpenContact, 180);
              }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-[0.35em] text-black/80 font-sans-body text-[0.95em]">
          <span className="font-medium">Monday–Friday 10:00 – 17:00</span>
          <span>Bucharest, Romania</span>
        </div>
      </div>
    </>
  );
};
