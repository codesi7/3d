import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Two26LogoSvg } from './BrandSvgs';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const strokePathRef = useRef<SVGPathElement>(null);
  const logoWrapRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setDone(true);
      onComplete();
      return;
    }

    const container = containerRef.current;
    const strokePath = strokePathRef.current;
    const logoWrap = logoWrapRef.current;
    if (!container || !strokePath || !logoWrap) return;

    const len = strokePath.getTotalLength();
    gsap.set(strokePath, { strokeDasharray: len, strokeDashoffset: len });
    gsap.set(logoWrap, { opacity: 0, scale: 0.92, y: 16 });

    const tl = gsap.timeline({
      onComplete: () => {
        setDone(true);
        onComplete();
      },
    });

    tl.to(strokePath, {
      strokeDashoffset: 0,
      duration: 0.72,
      ease: 'power2.inOut',
    })
      .to(
        logoWrap,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.4,
          ease: 'back.out(1.6)',
        },
        '-=0.35'
      )
      .to(container, {
        yPercent: -100,
        duration: 0.6,
        delay: 0.25,
        ease: 'power3.inOut',
      });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  if (done) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#f9e2e1]"
    >
      {/* Signature Two26 serpentine orange loader stroke */}
      <svg
        className="w-[90vw] max-w-[1100px] h-auto absolute pointer-events-none"
        viewBox="0 0 1451 1004"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          ref={strokePathRef}
          d="M9.5022 602.203C130.513 541.926 163.851 545.542 284.259 610.875C402.641 675.109 590.609 623.802 578.502 465.31C573.002 393.31 660.002 382.81 660.002 453.81C660.002 483.31 659.762 495.353 660.002 523.727C660.231 550.772 660.002 579.905 680.502 583.81C694.002 586.381 704.502 579.31 714.002 568.81C723.502 558.31 729.048 555.163 742.502 518.31C754.002 486.81 741.002 472.31 725.502 472.31C707.002 472.31 697.492 491.81 709.002 520.31C719.502 546.31 727.301 559.545 738.502 571.31C741.834 574.81 763.118 593.044 779.002 579.31C793.002 567.205 791.002 543.59 791.002 516.31C791.002 500.999 791.002 485.31 791.002 453.81C791.002 249.749 1224 388.703 1246.5 576.703C1256.82 662.894 1163 668.866 1163 619.703C1163 541.203 1350.5 512.703 1441 527.703"
          stroke="#FF5400"
          strokeWidth="19"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div ref={logoWrapRef} className="relative z-10 w-[12em] max-w-[60vw] mt-[8em]">
        <Two26LogoSvg color="#FF5400" />
      </div>
    </div>
  );
};
