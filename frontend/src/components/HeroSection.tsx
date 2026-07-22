import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface HeroSectionProps {
  scrollProgress: number;
}

const HeroSection = ({ scrollProgress }: HeroSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (nameRef.current) {
      const chars = nameRef.current.querySelectorAll('.char');
      gsap.fromTo(
        chars,
        { opacity: 0, filter: 'blur(24px)', scale: 1.1 },
        {
          opacity: 1,
          filter: 'blur(0px)',
          scale: 1,
          duration: 1.2,
          stagger: 0.05,
          ease: 'power3.out',
          delay: 0.1,
        }
      );
    }
  }, []);

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fade out slightly, but don't move up.
  const opacity = Math.max(0.1, 1 - scrollProgress * 2);
  const translateY = 0;

  const getCharTransform = (wordIndex: number, charIndex: number) => {
    // Pseudo-random factors for beautiful chaotic scatter
    const seed = wordIndex * 10 + charIndex;
    const randomY = Math.sin(seed * 1.5) * 4; 
    const randomRotate = Math.cos(seed * 2.3) * 1.5; 
    const randomScale = Math.sin(seed * 3.1) * 0.02; 

    const wordLength = wordIndex === 0 ? firstName.length : lastName.length;
    
    let delayIndex: number;
    let direction: number;
    
    if (wordIndex === 0) {
      delayIndex = wordLength - 1 - charIndex;
      direction = 1;
    } else {
      delayIndex = charIndex;
      direction = -1;
    }
    
    const delayPixels = delayIndex * 30; 
    const activeScroll = Math.max(0, scrollY - delayPixels);
    
    const moveX = activeScroll * 6 * direction;
    const moveY = activeScroll * randomY;
    const rotate = activeScroll * randomRotate;
    const scale = Math.max(0.2, 1 - activeScroll * 0.002) + (activeScroll * randomScale);
    
    return `translate(${moveX}px, ${moveY}px) rotate(${rotate}deg) scale(${scale})`;
  };

  // Name with specific emerald characters
  const firstName = 'Rohit';
  const lastName = 'Gupta';
  const emeraldIndices = { first: [0, 2], last: [0, 2] }; // R, t, J, i

  return (
    <section
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-10 flex flex-col items-center justify-center"
      style={{ opacity, transform: `translateY(${translateY}px)` }}
    >
      {/* Main name */}
      <div
        ref={nameRef}
        className="flex flex-col items-center gap-2 font-display"
        style={{ perspective: '1000px' }}
      >
        <div className="flex">
          {firstName.split('').map((char, i) => (
            <span
              key={`first-${i}`}
              className={`char text-7xl md:text-9xl lg:text-[11rem] font-normal tracking-wide ${
                emeraldIndices.first.includes(i) ? 'char-emerald' : 'text-foreground'
              }`}
              style={{ display: 'inline-block', transform: getCharTransform(0, i) }}
            >
              {char}
            </span>
          ))}
        </div>
        <div className="flex">
          {lastName.split('').map((char, i) => (
            <span
              key={`last-${i}`}
              className={`char text-7xl md:text-9xl lg:text-[11rem] font-normal tracking-wide ${
                emeraldIndices.last.includes(i) ? 'char-emerald' : 'text-foreground'
              }`}
              style={{ display: 'inline-block', transform: getCharTransform(1, i) }}
            >
              {char}
            </span>
          ))}
        </div>
      </div>

      {/* Subtitle */}
      <div className="mt-8 overflow-hidden">
        <p
          className="animate-fade-in font-body text-sm tracking-[0.5em] text-foreground/50"
          style={{ animationDelay: '1.5s' }}
        >
          CREATIVE DEVELOPER
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-12 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
        style={{ opacity: Math.max(0, 1 - scrollProgress * 5) }}
      >
        <span className="font-body text-xs tracking-[0.3em] text-muted-foreground/50">
          SCROLL
        </span>
        <div className="h-12 w-[1px] overflow-hidden bg-muted/20">
          <div className="h-4 w-full animate-[float_2s_ease-in-out_infinite] bg-primary/50" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
