import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ResumeSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const documentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (documentRef.current && sectionRef.current) {
      gsap.fromTo(
        documentRef.current,
        { opacity: 0, y: 100, rotateX: -30 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, []);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = 'https://ik.imagekit.io/0wmauyftj/resume/resume1.pdf%20(1).pdf';
    link.download = 'Rohit Resume.pdf';
    link.click();
  };

  return (
    <section
      ref={sectionRef}
      className="relative z-20 flex min-h-screen items-center justify-center bg-transparent px-6 py-32 text-white"
    >
      <div className="mx-auto max-w-4xl text-center">
        {/* Section label */}
        <span className="font-body text-xs tracking-[0.5em] text-emerald-400 font-medium">
          05 — RESUME
        </span>

        {/* Document visualization */}
        <div
          ref={documentRef}
          className="group mx-auto mt-16 cursor-pointer"
          style={{ perspective: '1000px' }}
          onClick={handleDownload}
        >
          {/* Paper effect: Default border hidden, only border & shadow on hover */}
          <div className="relative mx-auto h-[400px] w-[280px] overflow-hidden rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-md p-8 transition-all duration-500 group-hover:border-emerald-500 group-hover:shadow-[0_0_50px_rgba(16,185,129,0.2)] md:h-[500px] md:w-[350px]">
            {/* Content lines */}
            <div className="space-y-6 text-left">
              {/* Header */}
              <div className="space-y-2">
                <div className="h-6 w-32 rounded bg-emerald-500/30" />
                <div className="h-2 w-24 rounded bg-white/20" />
              </div>

              {/* Sections */}
              {[1, 2, 3].map((section) => (
                <div key={section} className="space-y-2">
                  <div className="h-3 w-20 rounded bg-emerald-500/20" />
                  <div className="h-2 w-full rounded bg-white/10" />
                  <div className="h-2 w-4/5 rounded bg-white/10" />
                  <div className="h-2 w-3/5 rounded bg-white/10" />
                </div>
              ))}
            </div>

            {/* Hover overlay with Emerald styling */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="font-display text-lg tracking-wider text-emerald-400 font-semibold">
                Download PDF
              </span>
            </div>
          </div>

          {/* Emerald Shadow Accent */}
          <div className="mx-auto mt-6 h-4 w-[200px] rounded-full bg-emerald-500/10 blur-xl transition-all duration-500 group-hover:bg-emerald-500/30 md:w-[250px]" />
        </div>

        {/* Download button styled with emerald theme */}
        <button
          onClick={handleDownload}
          className="mt-12 inline-flex items-center gap-3 rounded-full bg-emerald-500 px-8 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:scale-105 hover:bg-emerald-400 shadow-lg shadow-emerald-500/20 pointer-events-auto"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Download Resume
        </button>

        <p className="mt-6 font-body text-xs text-neutral-400">
          Last updated: January 2026 • PDF Format
        </p>
      </div>
    </section>
  );
};

export default ResumeSection;