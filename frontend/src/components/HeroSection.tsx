import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Lightfall from './Lightfall';

interface HeroSectionProps {
  scrollProgress: number;
}

const HeroSection = ({ scrollProgress }: HeroSectionProps) => {
  const heroRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Intersection Observer for Lightfall performance optimization
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setPaused(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  // Track window scroll for character scatter effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initial load entry animation for characters
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

  const opacity = Math.max(0.1, 1 - scrollProgress * 2);

  const firstName = 'Rohit';
  const lastName = 'Gupta';
  const emeraldIndices = { first: [0, 2], last: [0, 2] }; // R, t, J, i / matching indices

  const getCharTransform = (wordIndex: number, charIndex: number) => {
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

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden bg-black flex flex-col items-center justify-center"
      style={{ transform: 'translateZ(0)', willChange: 'transform', opacity }}
    >
      {/* Background Lightfall Effect with Emerald Theme Palette */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Lightfall
          paused={paused}
          colors={['#10B981', '#065F46', '#34D399']}
          backgroundColor="#022C22"
          speed={0.25}
          streakCount={2}
          streakWidth={0.7}
          streakLength={0.9}
          glow={0.8}
          density={0.3}
          twinkle={0.3}
          zoom={1.8}
          backgroundGlow={0.25}
          opacity={0.8}
          mouseInteraction={false}
        />
      </div>

      {/* Dark Overlay for depth */}
      <div className="absolute inset-0 bg-black/50 z-1 pointer-events-none" />

      {/* Main Content & Scroll-driven Character Scatter */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center">
        {/* Main Name */}
        <div
          ref={nameRef}
          className="flex flex-col items-center gap-2 font-display uppercase"
          style={{ perspective: '1000px' }}
        >
          <div className="flex">
            {firstName.split('').map((char, i) => (
              <span
                key={`first-${i}`}
                className={`char text-7xl md:text-9xl lg:text-[11rem] font-normal tracking-wide ${
                  emeraldIndices.first.includes(i) ? 'char-emerald text-emerald-500' : 'text-foreground'
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
                  emeraldIndices.last.includes(i) ? 'char-emerald text-emerald-500' : 'text-foreground'
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
            className="animate-fade-in font-body text-sm tracking-[0.50em] text-emerald-400 font-medium"
            style={{ animationDelay: '1.5s' }}
          >
            CREATIVE DEVELOPER
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-12 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 pointer-events-none"
        style={{ opacity: Math.max(0, 1 - scrollProgress * 5) }}
      >
        <span className="font-body text-xs tracking-[0.3em] text-neutral-400">
          SCROLL
        </span>
        <div className="h-12 w-[1px] overflow-hidden bg-white/20">
          <div className="h-4 w-full animate-[float_2s_ease-in-out_infinite] bg-emerald-500" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;