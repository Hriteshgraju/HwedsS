import React, { useEffect, useState, useRef } from 'react';
import { ChevronsDown, RotateCcw } from 'lucide-react';
import { computeTempleDoorKinematics } from '../utils/weddingLogic';

interface HeroTemplePortalProps {
  children: React.ReactNode;
}

/**
 * Full-stage 3D South Indian Temple Sanctum Doorway (Kalyana Mandapam Dwara)
 * that works across both mobile and desktop viewports, opening smoothly from closed (0)
 * to frame the outer margins without covering text, and parting 100% as the user scrolls.
 */
export const HeroTemplePortal: React.FC<HeroTemplePortalProps> = ({ children }) => {
  const [scrollOpenRatio, setScrollOpenRatio] = useState(0);
  const [ceremonyOpenRatio, setCeremonyOpenRatio] = useState(0.04);
  const [isReplaying, setIsReplaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 1280);
    };
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  // Smooth entrance animation from closed sanctum (0.04) to outer margin frame (0.94 on mobile/tablet, 0.88 on wide desktop)
  // so the carved temple doors frame the page edges without covering any text!
  useEffect(() => {
    let frameId: number;
    const start = performance.now();
    const duration = 1350;
    const targetRest = window.innerWidth < 1280 ? 0.95 : 0.88;

    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setCeremonyOpenRatio(0.04 + eased * (targetRest - 0.04));
      if (t < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };
    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, []);

  // Scroll-driven 3D door opening: scrolling down parts the temple doors completely to 1.0
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY || 0;
      const ratio = Math.min(1, Math.max(0, y / 260));
      setScrollOpenRatio(ratio);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const triggerDoorReplay = () => {
    if (isReplaying) return;
    setIsReplaying(true);
    setCeremonyOpenRatio(0);
    const start = performance.now();
    const duration = 1850;
    const targetRest = isMobile ? 0.95 : 0.88;

    const tick = (now: number) => {
      const elapsed = now - start;
      if (elapsed < 260) {
        setCeremonyOpenRatio(0);
        requestAnimationFrame(tick);
        return;
      }
      const t = Math.min(1, (elapsed - 260) / (duration - 260));
      const eased = 1 - Math.pow(1 - t, 3);
      setCeremonyOpenRatio(eased * targetRest);
      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        setIsReplaying(false);
      }
    };
    requestAnimationFrame(tick);
  };

  const kinematics = computeTempleDoorKinematics(
    ceremonyOpenRatio,
    isReplaying ? 0 : scrollOpenRatio,
    isMobile
  );

  return (
    <div className="relative overflow-hidden">
      {/* Top Carved Temple Gopuram Torana Bar — Mobile-Wrapped & Responsive */}
      <div className="relative z-30 bg-gradient-to-b from-[#2A0E13] via-[#3D151C] to-[#231416] border-b-2 border-[#D4AF37] px-4 sm:px-8 py-3 shadow-md">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
          <p className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-[#F6E29C] leading-snug break-words">
            Kalyana Mandapam Sanctum · Scroll Down to Open the Temple Doors
          </p>

          <button
            type="button"
            onClick={triggerDoorReplay}
            className="w-full sm:w-auto min-h-[40px] px-3.5 py-1.5 text-xs font-semibold text-[#231416] bg-[#F6E29C] hover:bg-[#D4AF37] rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>Replay Temple Door Opening</span>
          </button>
        </div>
      </div>

      {/* 3D Perspective Stage Hosting Left & Right Carved Rosewood Temple Doors on ALL Viewports */}
      <div className="relative" style={{ perspective: '1600px' }}>
        {/* Golden Sanctum Light Spill from behind the parting doors */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
          style={{
            opacity: kinematics.sanctumGlowOpacity,
            background:
              'radial-gradient(circle at 50% 45%, rgba(246, 226, 156, 0.38), rgba(35, 20, 22, 0.68) 78%)',
          }}
        />

        {/* LEFT CARVED TEMPLE SANCTUM DOOR (Visible on both Mobile & Desktop) */}
        <div
          aria-hidden="true"
          data-testid="temple-door-left"
          style={{
            transformOrigin: 'left center',
            transform: `translateX(-${kinematics.doorSlidePct}%) rotateY(${kinematics.doorAngleDeg}deg)`,
            transition: isReplaying ? 'none' : 'transform 110ms ease-out',
          }}
          className="pointer-events-none flex absolute inset-y-0 left-0 w-1/2 z-30 bg-gradient-to-r from-[#260D11] via-[#3B151B] to-[#4A1B22] border-r-2 sm:border-r-4 border-[#D4AF37] shadow-2xl flex-col justify-between p-2 sm:p-4"
        >
          <div className="w-full h-full border border-[#D4AF37]/75 rounded-lg p-2 sm:p-3 grid grid-rows-3 gap-2 sm:gap-3 bg-[#2B0F14]/95">
            {[0, 1, 2].map((row) => (
              <div
                key={row}
                className="border border-[#D4AF37]/60 rounded-md bg-gradient-to-br from-[#3D161D] to-[#220B0F] flex items-center justify-end pr-3 sm:pr-8 relative overflow-hidden"
              >
                <div className="w-8 h-8 sm:w-14 sm:h-14 rounded-full border-2 border-[#D4AF37]/85 bg-[#4E1C24] flex items-center justify-center shadow-inner">
                  <div className="w-4 h-4 sm:w-8 sm:h-8 rounded-full border border-[#F6E29C] bg-[#D4AF37]/25" />
                </div>
              </div>
            ))}
          </div>

          {/* Heavy Brass Sanctum Door Ring Knocker on Center Seam */}
          <div className="absolute right-1.5 sm:right-3 top-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#D4AF37] border border-[#FFF3C4]" />
            <div className="w-6 h-6 sm:w-9 sm:h-9 -mt-1 rounded-full border-2 sm:border-4 border-[#F6E29C] shadow-md" />
          </div>
        </div>

        {/* RIGHT CARVED TEMPLE SANCTUM DOOR (Visible on both Mobile & Desktop) */}
        <div
          aria-hidden="true"
          data-testid="temple-door-right"
          style={{
            transformOrigin: 'right center',
            transform: `translateX(${kinematics.doorSlidePct}%) rotateY(-${kinematics.doorAngleDeg}deg)`,
            transition: isReplaying ? 'none' : 'transform 110ms ease-out',
          }}
          className="pointer-events-none flex absolute inset-y-0 right-0 w-1/2 z-30 bg-gradient-to-l from-[#260D11] via-[#3B151B] to-[#4A1B22] border-l-2 sm:border-l-4 border-[#D4AF37] shadow-2xl flex-col justify-between p-2 sm:p-4"
        >
          <div className="w-full h-full border border-[#D4AF37]/75 rounded-lg p-2 sm:p-3 grid grid-rows-3 gap-2 sm:gap-3 bg-[#2B0F14]/95">
            {[0, 1, 2].map((row) => (
              <div
                key={row}
                className="border border-[#D4AF37]/60 rounded-md bg-gradient-to-bl from-[#3D161D] to-[#220B0F] flex items-center justify-start pl-3 sm:pl-8 relative overflow-hidden"
              >
                <div className="w-8 h-8 sm:w-14 sm:h-14 rounded-full border-2 border-[#D4AF37]/85 bg-[#4E1C24] flex items-center justify-center shadow-inner">
                  <div className="w-4 h-4 sm:w-8 sm:h-8 rounded-full border border-[#F6E29C] bg-[#D4AF37]/25" />
                </div>
              </div>
            ))}
          </div>

          {/* Heavy Brass Sanctum Door Ring Knocker on Center Seam */}
          <div className="absolute left-1.5 sm:left-3 top-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#D4AF37] border border-[#FFF3C4]" />
            <div className="w-6 h-6 sm:w-9 sm:h-9 -mt-1 rounded-full border-2 sm:border-4 border-[#F6E29C] shadow-md" />
          </div>
        </div>

        {/* Hero Content Revealed Inside the Parting Temple Doors */}
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  );
};

interface ScrollTempleGateSectionProps {
  children: React.ReactNode;
  gateTitle: string;
  gateSubtitle: string;
}

/**
 * Scroll-Linked Temple Sanctum Gate that parts its ornate rosewood-and-gold doors
 * dynamically as the user scrolls each major section into the viewport.
 */
export const ScrollTempleGateSection: React.FC<ScrollTempleGateSectionProps> = ({
  children,
  gateTitle,
  gateSubtitle,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [openProgress, setOpenProgress] = useState(0.28);

  useEffect(() => {
    const updateScrollGate = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      const raw = (vh * 0.96 - rect.top) / (vh * 0.45);
      const clamped = Math.min(1, Math.max(0.2, raw));
      setOpenProgress(clamped);
    };

    window.addEventListener('scroll', updateScrollGate, { passive: true });
    window.addEventListener('resize', updateScrollGate);
    updateScrollGate();
    return () => {
      window.removeEventListener('scroll', updateScrollGate);
      window.removeEventListener('resize', updateScrollGate);
    };
  }, []);

  const angle = openProgress * 90;
  const slidePct = openProgress * 100;

  return (
    <div ref={containerRef} className="relative overflow-hidden" style={{ perspective: '1600px' }}>
      {/* Ornate Temple Arch Header Strip — Clean Unboxed Text with Hairline Dividers */}
      <div
        aria-hidden="true"
        className="max-w-[1200px] mx-auto px-4 sm:px-8 pt-6 flex items-center justify-center gap-3 text-xs text-[#8B1E2F] font-semibold"
      >
        <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C69214] to-[#8B1E2F] hidden sm:block" />
        <div className="flex flex-wrap items-center justify-center gap-1.5 text-center leading-relaxed break-words">
          <ChevronsDown className="w-3.5 h-3.5 text-[#C69214] shrink-0" />
          <span>{gateTitle}</span>
          <span className="text-[#6B544C]">· {gateSubtitle}</span>
        </div>
        <span className="h-px flex-1 bg-gradient-to-l from-transparent via-[#C69214] to-[#8B1E2F] hidden sm:block" />
      </div>

      {/* Left Scroll-Driven Section Temple Door */}
      <div
        aria-hidden="true"
        style={{
          transformOrigin: 'left center',
          transform: `translateX(-${slidePct}%) rotateY(${angle}deg)`,
          opacity: Math.max(0, 1 - openProgress * 0.92),
          transition: 'transform 90ms linear, opacity 120ms linear',
        }}
        className="pointer-events-none absolute inset-y-0 left-0 w-1/2 z-30 bg-gradient-to-r from-[#260D11] via-[#3E161D] to-[#521D26] border-r-2 sm:border-r-4 border-[#D4AF37] shadow-2xl flex items-center justify-end pr-4 sm:pr-8 p-3 sm:p-6"
      >
        <div className="w-12 h-12 sm:w-20 sm:h-20 rounded-full border-2 border-[#F6E29C]/75 bg-[#321016] flex items-center justify-center">
          <div className="w-6 h-6 sm:w-10 sm:h-10 rounded-full border border-[#D4AF37] bg-[#D4AF37]/30" />
        </div>
      </div>

      {/* Right Scroll-Driven Section Temple Door */}
      <div
        aria-hidden="true"
        style={{
          transformOrigin: 'right center',
          transform: `translateX(${slidePct}%) rotateY(-${angle}deg)`,
          opacity: Math.max(0, 1 - openProgress * 0.92),
          transition: 'transform 90ms linear, opacity 120ms linear',
        }}
        className="pointer-events-none absolute inset-y-0 right-0 w-1/2 z-30 bg-gradient-to-l from-[#260D11] via-[#3E161D] to-[#521D26] border-l-2 sm:border-l-4 border-[#D4AF37] shadow-2xl flex items-center justify-start pl-4 sm:pl-8 p-3 sm:p-6"
      >
        <div className="w-12 h-12 sm:w-20 sm:h-20 rounded-full border-2 border-[#F6E29C]/75 bg-[#321016] flex items-center justify-center">
          <div className="w-6 h-6 sm:w-10 sm:h-10 rounded-full border border-[#D4AF37] bg-[#D4AF37]/30" />
        </div>
      </div>

      {/* Section Content */}
      <div
        style={{
          transform: `scale(${0.97 + openProgress * 0.03})`,
          transition: 'transform 120ms ease-out',
        }}
      >
        {children}
      </div>
    </div>
  );
};
