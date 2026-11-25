import React, { useRef } from 'react';
import gsap from 'gsap';
import { CtaArrowSvg } from './BrandSvgs';

interface CtaButtonProps {
  label: string;
  onClick?: () => void;
  variant?: 'dark' | 'light';
  className?: string;
}

export const CtaButton: React.FC<CtaButtonProps> = ({
  label,
  onClick,
  variant = 'dark',
  className = '',
}) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const arrowLoopRef = useRef<gsap.core.Timeline | null>(null);

  const handleMouseEnter = () => {
    if (fillRef.current) {
      gsap.to(fillRef.current, {
        scale: 12,
        duration: 0.55,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }
    if (arrowRef.current) {
      gsap.set(arrowRef.current, { transformOrigin: 'center center' });
      arrowLoopRef.current?.kill();
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.2 });
      tl.to(arrowRef.current, {
        rotation: -25,
        duration: 0.22,
        ease: 'power2.out',
      }).to(arrowRef.current, {
        rotation: 0,
        duration: 0.4,
        ease: 'back.out(2.5)',
      });
      arrowLoopRef.current = tl;
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const currentX = Number(gsap.getProperty(btn, 'x')) || 0;
    const currentY = Number(gsap.getProperty(btn, 'y')) || 0;
    const originCenterX = rect.left - currentX + rect.width / 2;
    const originCenterY = rect.top - currentY + rect.height / 2;
    const deltaX = e.clientX - originCenterX;
    const deltaY = e.clientY - originCenterY;

    gsap.to(btn, {
      x: deltaX * 0.35,
      y: deltaY * 0.35,
      duration: 0.3,
      ease: 'power2.out',
      overwrite: 'auto',
    });

    const inners = [textRef.current, arrowRef.current].filter(Boolean);
    if (inners.length) {
      gsap.to(inners, {
        x: deltaX * 0.15,
        y: deltaY * 0.15,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }
  };

  const handleMouseLeave = () => {
    arrowLoopRef.current?.kill();
    arrowLoopRef.current = null;

    if (arrowRef.current) {
      gsap.to(arrowRef.current, {
        rotation: 0,
        x: 0,
        y: 0,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }
    if (textRef.current) {
      gsap.to(textRef.current, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'elastic.out(1.1, 0.4)',
        overwrite: 'auto',
      });
    }
    if (btnRef.current) {
      gsap.to(btnRef.current, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'elastic.out(1.1, 0.4)',
        overwrite: 'auto',
      });
    }
    if (fillRef.current) {
      gsap.to(fillRef.current, {
        scale: 1,
        duration: 0.45,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }
  };

  const isLight = variant === 'light';

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative inline-flex items-center justify-between rounded-full overflow-hidden cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5400] ${
        isLight
          ? 'bg-[#fdf8f5] border border-[#ff5400] text-[#ff5400]'
          : 'bg-black text-[#fdf8f5]'
      } ${className}`}
      style={{
        minWidth: '6.875em',
        padding: '0.1875em 0.1875em 0.1875em 1.25em',
      }}
    >
      <span
        ref={textRef}
        className={`relative z-20 font-sans-body font-medium whitespace-nowrap shrink-0 transition-colors duration-300 ${
          isLight ? 'text-[#ff5400] group-hover:text-[#fdf8f5]' : 'text-[#fdf8f5]'
        }`}
        style={{
          fontSize: '0.75em',
          paddingRight: '0.55em',
        }}
      >
        {label}
      </span>

      <span
        ref={arrowRef}
        className={`relative z-20 flex items-center justify-center rounded-full shrink-0 ${
          isLight ? 'bg-black text-[#ff5400]' : 'bg-[#ff5400] text-[#fdf8f5]'
        }`}
        style={{
          width: '1.875em',
          height: '1.875em',
        }}
      >
        <CtaArrowSvg />
      </span>

      {/* Expanding circle hover fill */}
      <span
        ref={fillRef}
        aria-hidden="true"
        className={`pointer-events-none absolute z-10 rounded-full ${
          isLight ? 'bg-black' : 'bg-[#ff5400]'
        }`}
        style={{
          width: '1.875em',
          height: '1.875em',
          right: '0.1875em',
        }}
      />
    </button>
  );
};
