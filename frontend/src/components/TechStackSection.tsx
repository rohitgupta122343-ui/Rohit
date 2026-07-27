import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TechItem {
  name: string;
  category: string;
  icon: string;
  invert?: boolean;
}

const techStack: TechItem[] = [
  // Frontend & UI
  { name: 'React', category: 'Frontend Architecture', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Next.js', category: 'Full-Stack Framework', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', invert: true },
  { name: 'TypeScript', category: 'Type-Safe Logic', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'Tailwind CSS', category: 'Design System', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'Redux', category: 'State Management', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg' },
  
  // Backend & APIs
  { name: 'Node.js', category: 'Backend Runtime', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Express', category: 'API Framework', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', invert: true },
  { name: 'GraphQL', category: 'Data Query Layer', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg' },
  { name: 'Python', category: 'Backend & Scripting', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  
  // Databases & Storage
  { name: 'PostgreSQL', category: 'Relational DB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'MongoDB', category: 'NoSQL Database', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name: 'Redis', category: 'Caching & Queue', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
  
  // DevOps & Cloud
  { name: 'Docker', category: 'Containerization', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'AWS', category: 'Cloud Infrastructure', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
  { name: 'Git', category: 'Version Control', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'Linux', category: 'System & Server', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
  
  // AI & Systems
  { name: 'LangChain', category: 'AI Orchestration', icon: 'https://avatars.githubusercontent.com/u/126733545?v=4' },
  { name: 'Java', category: 'Enterprise Logic', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { name: 'C++', category: 'High Performance', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
];

const TechStackSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const outerRingRef = useRef<HTMLDivElement>(null);
  const innerRingRef = useRef<HTMLDivElement>(null);
  const outerTweenRef = useRef<gsap.core.Tween | null>(null);
  const innerTweenRef = useRef<gsap.core.Tween | null>(null);

  const [activeTech, setActiveTech] = useState<TechItem | null>(null);

  // GSAP continuous rotation tweens setup
  useEffect(() => {
    const ctx = gsap.context(() => {
      outerTweenRef.current = gsap.to(outerRingRef.current, {
        rotation: 360,
        duration: 120,
        ease: 'none',
        repeat: -1,
      });

      innerTweenRef.current = gsap.to(innerRingRef.current, {
        rotation: -360,
        duration: 90,
        ease: 'none',
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = (tech: TechItem) => {
    setActiveTech(tech);
    if (outerTweenRef.current && innerTweenRef.current) {
      gsap.to([outerTweenRef.current, innerTweenRef.current], {
        timeScale: 0,
        duration: 0.6,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }
  };

  const handleMouseLeave = () => {
    setActiveTech(null);
    if (outerTweenRef.current && innerTweenRef.current) {
      gsap.to([outerTweenRef.current, innerTweenRef.current], {
        timeScale: 1,
        duration: 0.8,
        ease: 'power2.in',
        overwrite: 'auto',
      });
    }
  };

  const mid = Math.ceil(techStack.length / 2);
  const outerRing = techStack.slice(0, mid);
  const innerRing = techStack.slice(mid);

  return (
    <section
      ref={sectionRef}
      className="relative z-20 flex min-h-screen flex-col items-center justify-center overflow-hidden px-3 py-12 sm:px-6 sm:py-24 md:py-28"
    >
      <div className="relative mx-auto w-full max-w-6xl">
        {/* Top Minimal Label */}
        <div className="mb-3 text-center md:mb-6 md:text-left">
          <span className="font-body text-[9px] tracking-[0.3em] text-muted-foreground/60 uppercase sm:text-xs sm:tracking-[0.5em]">
            02 — CORE COMPETENCY & ECOSYSTEM
          </span>
        </div>

        {/* Section Heading */}
        <div className="relative z-10 text-center">
          <h2 className="font-display text-2xl font-medium tracking-wide text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
            Professional <span className="text-emerald-500">Tech Stack</span>
          </h2>
          <p className="mx-auto mt-2 max-w-xl font-body text-[11px] text-muted-foreground sm:text-sm md:mt-4 md:text-base">
            An extensive engineering arsenal spanning full-stack frameworks, enterprise architectures, cloud infrastructure, and advanced AI tooling.
          </p>
        </div>

        {/* Interactive Dual-Orbit Canvas Container */}
        <div className="relative mx-auto mt-6 flex aspect-square w-[96vw] max-w-[330px] items-center justify-center sm:mt-14 sm:w-full sm:max-w-[500px] md:max-w-[580px] lg:max-w-[640px]">
          <div className="relative h-full w-full flex items-center justify-center">
            {/* Orbital Rings */}
            <div className="absolute inset-2 rounded-full border border-white/15 pointer-events-none" />
            <div className="absolute inset-[15%] rounded-full border border-white/10 pointer-events-none" />
            <div className="absolute inset-[30%] rounded-full border border-white/10 pointer-events-none" />
            <div className="absolute inset-[40%] sm:inset-[42%] rounded-full border border-emerald-500/30 pointer-events-none" />

            {/* Central Display */}
            <div className="pointer-events-none absolute inset-[40%] sm:inset-[42%] z-40 flex flex-col items-center justify-center rounded-full border border-emerald-500/40 bg-black/95 text-center shadow-2xl p-2 transition-all duration-300">
              {activeTech ? (
                <div className="flex flex-col items-center px-1">
                  <span className="font-body text-[11px] font-semibold text-white tracking-wide sm:text-sm md:text-base line-clamp-1">
                    {activeTech.name}
                  </span>
                  <span className="mt-0.5 font-body text-[8px] text-emerald-400 sm:text-[11px] line-clamp-1">
                    {activeTech.category}
                  </span>
                </div>
              ) : (
                <span className="font-body text-[8px] tracking-wider text-muted-foreground/60 uppercase sm:text-[10px]">
                  Enterprise Grade
                </span>
              )}
            </div>

            {/* Outer Orbit Container */}
            <div ref={outerRingRef} className="absolute inset-2 z-25 pointer-events-none">
              {outerRing.map((tech) => {
                const i = techStack.indexOf(tech);
                const angle = (i / outerRing.length) * Math.PI * 2;
                const radiusX = 45;
                const radiusY = 45;
                const x = 50 + Math.cos(angle) * radiusX;
                const y = 50 + Math.sin(angle) * radiusY;

                return (
                  <div
                    key={`outer-${tech.name}`}
                    className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                    style={{ left: `${x}%`, top: `${y}%` }}
                  >
                    <div
                      onMouseEnter={() => handleMouseEnter(tech)}
                      onMouseLeave={handleMouseLeave}
                      onTouchEnd={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (activeTech?.name === tech.name) {
                          handleMouseLeave();
                        } else {
                          handleMouseEnter(tech);
                        }
                      }}
                      style={{ transform: 'rotate(0deg)' }}
                      className="relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black/95 transition-transform duration-300 active:scale-110 hover:scale-125 hover:border-emerald-500 hover:bg-black sm:h-11 sm:w-11 md:h-14 md:w-14 shadow-xl"
                    >
                      <img
                        src={tech.icon}
                        alt={tech.name}
                        style={{ transform: 'inherit' }}
                        className={`h-3.5 w-3.5 object-contain sm:h-5 sm:w-5 md:h-7 md:w-7 transition-all duration-300 pointer-events-none ${
                          tech.invert ? 'brightness-0 invert' : ''
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Inner Orbit Container */}
            <div ref={innerRingRef} className="absolute inset-[15%] z-20 pointer-events-none">
              {innerRing.map((tech) => {
                const i = techStack.indexOf(tech);
                const angle = ((i - outerRing.length) / innerRing.length) * Math.PI * 2;
                const radiusX = 35;
                const radiusY = 35;
                const x = 50 + Math.cos(angle) * radiusX;
                const y = 50 + Math.sin(angle) * radiusY;

                return (
                  <div
                    key={`inner-${tech.name}`}
                    className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                    style={{ left: `${x}%`, top: `${y}%` }}
                  >
                    <div
                      onMouseEnter={() => handleMouseEnter(tech)}
                      onMouseLeave={handleMouseLeave}
                      onTouchEnd={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (activeTech?.name === tech.name) {
                          handleMouseLeave();
                        } else {
                          handleMouseEnter(tech);
                        }
                      }}
                      style={{ transform: 'rotate(0deg)' }}
                      className="relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black/95 transition-transform duration-300 active:scale-110 hover:scale-125 hover:border-emerald-500 hover:bg-black sm:h-11 sm:w-11 md:h-14 md:w-14 shadow-xl"
                    >
                      <img
                        src={tech.icon}
                        alt={tech.name}
                        style={{ transform: 'inherit' }}
                        className={`h-3.5 w-3.5 object-contain sm:h-5 sm:w-5 md:h-7 md:w-7 transition-all duration-300 pointer-events-none ${
                          tech.invert ? 'brightness-0 invert' : ''
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Central Emerald Ambient Radial Glow */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: '50%',
              height: '50%',
              background: 'radial-gradient(circle, rgba(16, 185, 129, 0.28) 0%, transparent 70px)',
            }}
          />
        </div>
      </div>
    </section>
  );
};

export class TechStackSectionClass {}
export default TechStackSection;