import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS, ProjectItem } from '../data/studioData';
import { MagneticHeading } from './MagneticHeading';
import { ProjectArrowSvg } from './BrandSvgs';
import { CtaButton } from './CtaButton';

gsap.registerPlugin(ScrollTrigger);

interface SelectedWorksProps {
  onSelectProject: (project: ProjectItem) => void;
  onSeeAllProjects: () => void;
}

const BRUSH_PATH_D =
  'M25.002 153.857C25.002 153.857 151.002 -28.0122 236.002 40.3572C351.002 132.857 -86.2292 534.598 62.5019 617.857C173.257 679.857 466.502 -70.1428 646.002 40.3572C889.446 190.221 -74.3269 862.107 151.002 983.857C337.002 1084.36 526.502 453.148 665.002 551.357C803.502 649.566 415.502 926.187 501.002 983.857C586.502 1041.53 703.002 794.357 703.002 794.357';

const ProjectCard: React.FC<{
  project: ProjectItem;
  index: number;
  onSelect: (project: ProjectItem) => void;
}> = ({ project, index, onSelect }) => {
  const cardRef = useRef<HTMLElement>(null);
  const brushPathRef = useRef<SVGPathElement>(null);
  const hoverImgRef = useRef<HTMLImageElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const hoverTlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const brush = brushPathRef.current;
    const hoverImg = hoverImgRef.current;
    if (!brush || !hoverImg) return;

    const len = brush.getTotalLength();
    gsap.set(brush, {
      strokeDasharray: len,
      strokeDashoffset: len,
      strokeWidth: 160,
      opacity: 0,
    });
    gsap.set(hoverImg, { opacity: 0, scale: 1.07 });

    const tl = gsap.timeline({ paused: true });
    tl.set(brush, { opacity: 1 })
      .to(
        brush,
        {
          strokeDashoffset: 0,
          duration: 0.48,
          ease: 'power2.inOut',
        },
        0
      )
      .to(
        hoverImg,
        {
          opacity: 1,
          scale: 1,
          duration: 0.45,
          ease: 'power2.out',
        },
        0.16
      )
      .to(
        brush,
        {
          opacity: 0,
          duration: 0.25,
          ease: 'power1.out',
        },
        0.38
      );

    hoverTlRef.current = tl;

    return () => {
      tl.kill();
    };
  }, []);

  const handleEnter = () => {
    hoverTlRef.current?.timeScale(1).play();
    if (arrowRef.current) {
      gsap.to(arrowRef.current, {
        rotation: 45,
        scale: 1.08,
        duration: 0.35,
        ease: 'back.out(2)',
      });
    }
  };

  const handleLeave = () => {
    hoverTlRef.current?.timeScale(1.35).reverse();
    if (arrowRef.current) {
      gsap.to(arrowRef.current, {
        rotation: 0,
        scale: 1,
        duration: 0.35,
        ease: 'power2.out',
      });
    }
  };

  return (
    <article
      ref={cardRef}
      data-project-card
      onClick={() => onSelect(project)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(project);
        }
      }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      tabIndex={0}
      role="button"
      aria-label={`View ${project.name} case study (${project.category})`}
      className="two26-project-card group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff5400] rounded-[1em]"
      style={{ transitionDelay: `${(index % 3) * 60}ms` }}
    >
      {/* Image Stack with Brand-Color Brush Wipe Reveal */}
      <div className="two26-project-img-wrapper bg-[#e9ded6]">
        {/* Base Image */}
        <img
          src={project.mainImg}
          alt={`${project.name} branding cover`}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />

        {/* Hover Image */}
        <img
          ref={hoverImgRef}
          src={project.hoverImg}
          alt={`${project.name} branding detail`}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-center z-[3] will-change-[opacity,transform]"
        />

        {/* Brand-Colored Brush Stroke Overlay SVG */}
        <div
          className="pointer-events-none absolute inset-0 z-[4]"
          style={{ color: project.accentColor }}
          aria-hidden="true"
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 728 1020"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
          >
            <path
              ref={brushPathRef}
              d={BRUSH_PATH_D}
              stroke="currentColor"
              strokeWidth="160"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Bottom Project Detail Row */}
      <div className="flex items-center justify-between gap-[0.85em] w-full pt-[1em] pr-[0.5em] pb-[0.5em]">
        <div className="flex items-center gap-[0.85em] min-w-0">
          {/* Brand Logo Badge */}
          <div className="w-[3em] h-[3em] shrink-0 rounded-[0.65em] overflow-hidden bg-[#fdf8f5] border border-black/5 flex items-center justify-center p-[0.25em]">
            <img
              src={project.logoImg}
              alt={`${project.name} logo`}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="flex flex-col gap-[0.45em] min-w-0">
            <h3 className="font-display-dark text-black uppercase text-[1.5em] leading-[0.85] truncate">
              {project.name}
            </h3>
            <div className="font-sans-body font-medium text-[#ff5400] uppercase text-[0.875em] leading-none truncate">
              {project.category}
            </div>
          </div>
        </div>

        {/* Circular Orange Arrow Button */}
        <div
          ref={arrowRef}
          className="flex items-center justify-center rounded-full bg-[#ff5400] text-[#f9e2e1] shrink-0"
          style={{ width: '2.15em', height: '2.15em', padding: '0.6em' }}
          aria-hidden="true"
        >
          <ProjectArrowSvg />
        </div>
      </div>
    </article>
  );
};

export const SelectedWorks: React.FC<SelectedWorksProps> = ({
  onSelectProject,
  onSeeAllProjects,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Card clip-path scroll reveal
      const cards = gsap.utils.toArray<HTMLElement>('[data-project-card]');
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          {
            clipPath: 'inset(14% 10% 14% 10% round 1.5em)',
            opacity: 0,
            y: 40,
          },
          {
            clipPath: 'inset(0% 0% 0% 0% round 0em)',
            opacity: 1,
            y: 0,
            duration: 0.85,
            delay: (i % 3) * 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              once: true,
            },
          }
        );
      });

      // Projects-end heading & pills reveal
      if (endRef.current) {
        const endHeading = endRef.current.querySelector('[data-projects-end-heading]');
        const endPills = endRef.current.querySelectorAll('[data-projects-end-pill]');
        const endBtn = endRef.current.querySelector('[data-projects-end-btn]');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: endRef.current,
            start: 'top 78%',
            once: true,
          },
        });

        if (endHeading) {
          tl.fromTo(
            endHeading,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.75, ease: 'power3.out' }
          );
        }
        if (endPills.length) {
          tl.fromTo(
            endPills,
            { scale: 0.5, opacity: 0, y: 20 },
            { scale: 1, opacity: 1, y: 0, stagger: 0.1, duration: 0.55, ease: 'back.out(1.8)' },
            '-=0.35'
          );
        }
        if (endBtn) {
          tl.fromTo(
            endBtn,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
            '-=0.25'
          );
        }
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="w-full pt-[4em] pb-[6em]">
      <div className="w-full flex flex-col items-center gap-[2.75em]">
        {/* Section Header */}
        <div className="w-full relative flex flex-col md:flex-row justify-center items-center px-[1.25em]">
          <div className="font-sans-body font-medium uppercase text-black text-[1.125em] leading-none md:absolute md:left-[1.25em] md:top-[0.3em] mb-[0.75em] md:mb-0">
            Featured Projects
          </div>
          <MagneticHeading text="Selected Works" maxWidth="5.2em" align="center" />
        </div>

        {/* 6 Featured Projects Grid */}
        <div className="w-full px-[1.25em]">
          <div className="two26-projects-grid">
            {PROJECTS.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onSelect={onSelectProject}
              />
            ))}
          </div>
        </div>

        {/* Projects End Teaser Block */}
        <div
          ref={endRef}
          className="relative w-full flex flex-col items-center justify-center py-[6em] md:py-[8em] px-[1.25em] overflow-hidden"
        >
          <div className="relative flex flex-col items-center justify-center gap-[2.75em] w-full max-w-[56em]">
            {/* Tilted Floating Tags */}
            <div
              data-projects-end-pill
              className="hidden md:inline-flex items-center justify-center bg-black rounded-full px-[1.5em] py-[0.6em] absolute -top-[1.5em] right-[7em] -rotate-[5deg]"
            >
              <span className="font-sans-body font-medium text-[#f9e2e1] text-[1em] whitespace-nowrap">
                The plot thickens
              </span>
            </div>

            <div
              data-projects-end-pill
              className="hidden md:inline-flex items-center justify-center bg-black rounded-full px-[1.5em] py-[0.6em] absolute top-[8em] left-[1em] rotate-[3deg]"
            >
              <span className="font-sans-body font-medium text-[#f9e2e1] text-[1em] whitespace-nowrap">
                Very convenient
              </span>
            </div>

            <div
              data-projects-end-pill
              className="hidden md:inline-flex items-center justify-center bg-black rounded-full px-[1.5em] py-[0.6em] absolute bottom-[6em] right-[2em] rotate-[5deg]"
            >
              <span className="font-sans-body font-medium text-[#f9e2e1] text-[1em] whitespace-nowrap">
                There’s more
              </span>
            </div>

            <h3 data-projects-end-heading className="two26-projects-end-para">
              WE COULD KEEP GOING, BUT THERE’S A WHOLE PAGE FOR THAT.
            </h3>

            {/* Mobile compact tag row */}
            <div className="flex md:hidden flex-wrap justify-center gap-[0.5em]">
              {['The plot thickens', 'Very convenient', 'There’s more'].map((tag) => (
                <span
                  key={tag}
                  className="bg-black text-[#f9e2e1] rounded-full px-[1.1em] py-[0.45em] font-sans-body font-medium text-[0.85em]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div data-projects-end-btn>
              <CtaButton label="See all projects" onClick={onSeeAllProjects} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
