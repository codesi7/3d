import React, { useRef } from 'react';
import gsap from 'gsap';

interface MagneticHeadingProps {
  text: string;
  maxWidth?: string;
  align?: 'center' | 'left';
  className?: string;
}

export const MagneticHeading: React.FC<MagneticHeadingProps> = ({
  text,
  maxWidth = '5em',
  align = 'center',
  className = '',
}) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const frontRef = useRef<HTMLHeadingElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;

    if (frontRef.current) {
      gsap.to(frontRef.current, {
        x: relX * 14,
        y: relY * 10,
        duration: 0.45,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }
    if (shadowRef.current) {
      gsap.to(shadowRef.current, {
        x: -relX * 10 + 4,
        y: -relY * 8 + 4,
        duration: 0.55,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }
  };

  const handleMouseLeave = () => {
    if (frontRef.current) {
      gsap.to(frontRef.current, {
        x: 0,
        y: 0,
        duration: 0.85,
        ease: 'elastic.out(1, 0.4)',
        overwrite: 'auto',
      });
    }
    if (shadowRef.current) {
      gsap.to(shadowRef.current, {
        x: 0,
        y: 0,
        duration: 0.85,
        ease: 'elastic.out(1, 0.4)',
        overwrite: 'auto',
      });
    }
  };

  return (
    <div
      ref={wrapRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative inline-flex justify-center items-center cursor-default select-none ${className}`}
    >
      <h2
        ref={frontRef}
        className="two26-section-heading"
        style={{
          maxWidth,
          textAlign: align,
        }}
      >
        {text}
      </h2>
      <div
        ref={shadowRef}
        aria-hidden="true"
        className="two26-section-heading-shadow"
        style={{
          maxWidth,
          textAlign: align,
          transform: 'translate(3px, 3px)',
        }}
      >
        {text}
      </div>
    </div>
  );
};
