import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { PROJECTS, ProjectItem } from '../data/studioData';
import { CtaButton } from './CtaButton';

interface ProjectModalProps {
  project: ProjectItem | null;
  archiveOpen: boolean;
  onClose: () => void;
  onSelectProject: (project: ProjectItem) => void;
  onOpenContact: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  archiveOpen,
  onClose,
  onSelectProject,
  onOpenContact,
}) => {
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const isOpen = Boolean(project) || archiveOpen;

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const categories = ['All', ...Array.from(new Set(PROJECTS.map((p) => p.category)))];
  const filteredProjects =
    categoryFilter === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === categoryFilter);

  const currentIdx = project ? PROJECTS.findIndex((p) => p.id === project.id) : -1;
  const prevProject =
    currentIdx >= 0 ? PROJECTS[(currentIdx - 1 + PROJECTS.length) % PROJECTS.length] : null;
  const nextProject =
    currentIdx >= 0 ? PROJECTS[(currentIdx + 1) % PROJECTS.length] : null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={project ? `${project.name} case study` : 'All Two26 Studio projects'}
      className="fixed inset-0 z-[9990] bg-black/55 backdrop-blur-sm flex items-center justify-center p-[0.75em] md:p-[1.5em]"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[74em] max-h-[92svh] overflow-y-auto rounded-[1.25em] bg-[#f8eee8] text-black shadow-2xl border border-black/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Modal Top Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between gap-[1em] px-[1.5em] py-[1.1em] bg-[#f8eee8]/95 backdrop-blur-md border-b border-black/10">
          <div className="flex items-center gap-[0.85em] min-w-0">
            {project ? (
              <>
                <img
                  src={project.logoImg}
                  alt={`${project.name} mark`}
                  className="w-[2.2em] h-[2.2em] object-contain rounded-[0.45em] bg-[#fdf8f5] p-[0.2em]"
                />
                <div className="min-w-0">
                  <div className="font-display-dark text-[1.45em] leading-none uppercase truncate">
                    {project.name}
                  </div>
                  <div className="font-sans-body text-[0.8em] font-medium uppercase text-[#ff5400] mt-[0.2em]">
                    {project.category} · {project.year}
                  </div>
                </div>
              </>
            ) : (
              <div>
                <div className="font-display-dark text-[1.75em] leading-none uppercase text-[#ff5400]">
                  Selected Works Archive
                </div>
                <div className="font-sans-body text-[0.85em] text-black/65 mt-[0.2em]">
                  Every featured Two26 Studio project in one place
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="inline-flex items-center gap-[0.45em] px-[1.1em] py-[0.5em] rounded-full bg-black text-[#fdf8f5] hover:bg-[#ff5400] transition-colors font-sans-body font-medium text-[0.85em] cursor-pointer shrink-0"
          >
            <X className="w-[1em] h-[1em]" />
            <span>Close</span>
          </button>
        </div>

        {/* Project Detail Case Study View */}
        {project ? (
          <div className="p-[1.5em] md:p-[2.5em] flex flex-col gap-[2.25em]">
            {/* Visual Showcase Pair */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[1.25em]">
              <div className="rounded-[1em] overflow-hidden bg-[#e9ded6] aspect-[4/5]">
                <img
                  src={project.mainImg}
                  alt={`${project.name} primary showcase`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-[1em] overflow-hidden bg-[#e9ded6] aspect-[4/5]">
                <img
                  src={project.hoverImg}
                  alt={`${project.name} brand identity application`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Project Story & Deliverables */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-[2em] pt-[0.5em]">
              <div className="md:col-span-4 flex flex-col gap-[0.85em]">
                <div className="font-sans-body font-medium uppercase text-[#ff5400] text-[0.9em]">
                  Deliverables
                </div>
                <div className="font-sans-body text-[1em] text-black/80 leading-[1.6]">
                  {project.deliverables.join(' · ')}
                </div>
                <div className="pt-[0.75em]">
                  <CtaButton
                    label="Start a project"
                    onClick={() => {
                      onClose();
                      setTimeout(onOpenContact, 150);
                    }}
                  />
                </div>
              </div>

              <div className="md:col-span-8 flex flex-col gap-[1.5em]">
                <h3 className="font-display-dark text-[#ff5400] text-[2.2em] md:text-[2.8em] leading-[1.02] m-0">
                  {project.summary}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[1.5em] pt-[0.5em] border-t border-black/10">
                  <div>
                    <div className="font-sans-body font-medium uppercase text-black/55 text-[0.85em] mb-[0.45em]">
                      The Challenge
                    </div>
                    <p className="font-sans-body text-[1em] leading-[1.55] text-black/85 m-0">
                      {project.challenge}
                    </p>
                  </div>
                  <div>
                    <div className="font-sans-body font-medium uppercase text-black/55 text-[0.85em] mb-[0.45em]">
                      Our Approach
                    </div>
                    <p className="font-sans-body text-[1em] leading-[1.55] text-black/85 m-0">
                      {project.approach}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Prev / Next Project Footer */}
            {prevProject && nextProject && (
              <div className="flex items-center justify-between pt-[1.5em] border-t border-black/10">
                <button
                  type="button"
                  onClick={() => onSelectProject(prevProject)}
                  className="inline-flex items-center gap-[0.55em] font-sans-body font-medium text-[0.95em] text-black hover:text-[#ff5400] transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-[1em] h-[1em]" />
                  <span>{prevProject.name}</span>
                </button>
                <button
                  type="button"
                  onClick={() => onSelectProject(nextProject)}
                  className="inline-flex items-center gap-[0.55em] font-sans-body font-medium text-[0.95em] text-black hover:text-[#ff5400] transition-colors cursor-pointer"
                >
                  <span>{nextProject.name}</span>
                  <ArrowRight className="w-[1em] h-[1em]" />
                </button>
              </div>
            )}
          </div>
        ) : (
          /* All Projects Archive Filterable View */
          <div className="p-[1.5em] md:p-[2.25em] flex flex-col gap-[1.75em]">
            {/* Filter Controls */}
            <div className="flex flex-wrap items-center gap-[0.5em]">
              {categories.map((cat) => {
                const active = cat === categoryFilter;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-[1.15em] py-[0.5em] rounded-full font-sans-body font-medium text-[0.85em] transition-colors cursor-pointer whitespace-nowrap ${
                      active
                        ? 'bg-[#ff5400] text-[#fdf8f5]'
                        : 'bg-[#fdf8f5] text-black border border-black/10 hover:border-[#ff5400]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Archive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1.5em]">
              {filteredProjects.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectProject(item)}
                  className="group text-left flex flex-col gap-[0.75em] cursor-pointer focus-visible:outline-2 focus-visible:outline-[#ff5400] rounded-[1em]"
                >
                  <div className="w-full aspect-[4/5] rounded-[0.9em] overflow-hidden bg-[#e9ded6] relative">
                    <img
                      src={item.mainImg}
                      alt={item.name}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-[0.5em] px-[0.25em]">
                    <div>
                      <div className="font-display-dark text-[1.4em] leading-none uppercase text-black group-hover:text-[#ff5400] transition-colors">
                        {item.name}
                      </div>
                      <div className="font-sans-body text-[0.8em] font-medium uppercase text-[#ff5400] mt-[0.25em]">
                        {item.category} · {item.year}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
