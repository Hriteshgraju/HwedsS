/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Menu, X, ArrowDownRight, CalendarPlus } from 'lucide-react';
import {
  calculateCountdown,
  generateIcsCalendarContent,
  type CountdownState,
} from './utils/weddingLogic';
import { WEDDING_INVITATION_DATA } from './data/weddingData';
import { InvitationSection } from './components/InvitationSection';
import { CeremoniesAndVenue } from './components/CeremoniesAndVenue';
import {
  HeroTemplePortal,
  ScrollTempleGateSection,
} from './components/TempleDoorScrollExperience';

export default function App() {
  const [countdown, setCountdown] = useState<CountdownState>(() =>
    calculateCountdown(Date.now())
  );
  const [language, setLanguage] = useState<'en' | 'kn'>('en');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCountdown(calculateCountdown(Date.now()));
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const handleSaveMuhurthamIcs = () => {
    const icsContent = generateIcsCalendarContent('muhurtham');
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Sowmya-Hritesh-Muhurtham-2026.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const padTwo = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6F0] text-[#231416] overflow-x-hidden">
      {/* Strict 3-Zone Top Bar — Mobile Friendly & Responsive */}
      <header className="sticky top-0 z-40 min-h-14 bg-[#FAF6F0]/95 backdrop-blur-xs border-b border-[#E4D5B7] px-4 sm:px-8 py-2 flex items-center justify-between gap-3 sm:gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          className="text-base sm:text-xl font-bold tracking-tight text-[#8B1E2F] font-display whitespace-nowrap shrink-0"
        >
          Sowmya &amp; Hritesh
        </a>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav
          aria-label="Primary"
          className="hidden md:flex items-center gap-6 text-sm font-medium text-[#4A3531]"
        >
          <a
            href="#invitation"
            className="hover:text-[#8B1E2F] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Invitation
          </a>
          <a
            href="#ceremonies"
            className="hover:text-[#8B1E2F] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Ceremonies
          </a>
          <a
            href="#venue"
            className="hover:text-[#8B1E2F] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Venue
          </a>
          <a
            href="#lineage"
            className="hover:text-[#8B1E2F] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Family Lineage
          </a>
        </nav>

        {/* Zone 3: 1 primary action + mobile menu trigger */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleSaveMuhurthamIcs}
            className="min-h-[40px] px-3 sm:px-4 py-2 text-xs font-semibold text-[#FAF6F0] bg-[#8B1E2F] rounded-lg hover:bg-[#701624] transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <CalendarPlus className="w-3.5 h-3.5 text-[#F6E29C] shrink-0" />
            <span className="hidden xs:inline sm:inline">Save Muhurtham Date</span>
            <span className="xs:hidden sm:hidden">Save Date</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center text-[#231416] hover:text-[#8B1E2F] rounded-lg cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile navigation"
          className="md:hidden bg-[#FFFDF9] border-b border-[#E4D5B7] px-4 py-3 flex flex-col gap-1 text-sm font-semibold text-[#231416]"
        >
          <a
            href="#invitation"
            onClick={() => setMobileMenuOpen(false)}
            className="min-h-[44px] px-2 flex items-center hover:text-[#8B1E2F] rounded-lg"
          >
            01. Sacred Patrika (Bilingual Invitation)
          </a>
          <a
            href="#ceremonies"
            onClick={() => setMobileMenuOpen(false)}
            className="min-h-[44px] px-2 flex items-center hover:text-[#8B1E2F] rounded-lg"
          >
            02. Reception &amp; Muhurtham Schedule
          </a>
          <a
            href="#venue"
            onClick={() => setMobileMenuOpen(false)}
            className="min-h-[44px] px-2 flex items-center hover:text-[#8B1E2F] rounded-lg"
          >
            03. Shivamogga Venue &amp; Directions
          </a>
          <a
            href="#lineage"
            onClick={() => setMobileMenuOpen(false)}
            className="min-h-[44px] px-2 flex items-center hover:text-[#8B1E2F] rounded-lg"
          >
            04. Bride &amp; Groom Family Lineage
          </a>
        </nav>
      )}

      <main id="top" className="flex-1">
        {/* 3D Scroll-Driven Temple Sanctum Doorway Wrapping the Image-Free Hero & Countdown */}
        <HeroTemplePortal>
          <section className="py-8 sm:py-14 px-4 sm:px-8 max-w-[1200px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
              {/* Left Column (7 cols): Sacred Wedding Proposition & Typographic Hierarchy */}
              <div className="lg:col-span-7 flex flex-col justify-between bg-[#FFFDF9] border border-[#E4D5B7] rounded-2xl p-5 sm:p-10 shadow-xs break-words">
                <div className="space-y-4 sm:space-y-5">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold text-[#8B1E2F] leading-relaxed">
                    <span>{WEDDING_INVITATION_DATA.invocation.en}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-kannada">{WEDDING_INVITATION_DATA.invocation.kn}</span>
                  </div>

                  <h1
                    className="font-display font-bold text-[#231416] tracking-tight leading-[1.1]"
                    style={{ fontSize: 'clamp(2.1rem, 4.2vw, 3.75rem)', textWrap: 'balance' }}
                  >
                    <span className="block text-xs sm:text-base font-sans font-semibold text-[#8B1E2F] tracking-normal mb-1.5">
                      Chi. Sou. Sowmya H (B.E) &amp; Chi. Ry. Hritesh G. Raju (B.E)
                    </span>
                    Sowmya H <span className="italic font-normal text-[#C69214]">&amp;</span>{' '}
                    Hritesh G. Raju
                  </h1>

                  <p className="text-sm sm:text-base text-[#4A3531] leading-relaxed">
                    <strong>Smt. M. Radhamma &amp; Late Sri T. Hanumahai</strong> (Seekayanahalli,
                    Devanahalli) and{' '}
                    <strong>Smt. Mani Bai &amp; Sri Govindaraju N (Ex. Army)</strong> (Shakthidhama,
                    Shivamogga) cordially invite your gracious presence with family and friends to
                    bless the sacred union of their children.
                  </p>

                  <div className="pt-3 space-y-2.5 text-xs sm:text-sm text-[#231416] border-t border-[#EFE6D5] leading-relaxed">
                    <div className="flex items-start gap-2.5">
                      <Calendar className="w-4 h-4 text-[#8B1E2F] shrink-0 mt-0.5" />
                      <span>
                        <strong>Reception:</strong> Wed, 18 Nov 2026 · 7:00 pm onwards
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Calendar className="w-4 h-4 text-[#8B1E2F] shrink-0 mt-0.5" />
                      <span>
                        <strong>Muhurtham:</strong> Thu, 19 Nov 2026 · 9:15 am – 10:10 am · Lagna:
                        Dhanur
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-[#8B1E2F] shrink-0 mt-0.5" />
                      <span>
                        <strong>Venue:</strong> Arya Edigara Bhavana Sangha, Ashok Nagar Main Road,
                        Beside Helipad, Police Quarters, Shivamogga - 577205
                      </span>
                    </div>
                  </div>
                </div>

                {/* Single Primary CTA + Quiet Secondary Link — Mobile-Wrapped */}
                <div className="pt-6 mt-6 border-t border-[#EFE6D5] flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
                  <a
                    href="#invitation"
                    className="w-full sm:w-auto min-h-[44px] px-6 py-3 text-xs sm:text-sm font-semibold text-[#FAF6F0] bg-[#8B1E2F] rounded-xl hover:bg-[#701624] transition-colors flex items-center justify-center"
                  >
                    Read Sacred Patrika
                  </a>
                  <a
                    href="#ceremonies"
                    className="w-full sm:w-auto min-h-[44px] px-4 py-3 text-xs sm:text-sm font-semibold text-[#231416] hover:text-[#8B1E2F] transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>View Schedule &amp; Shivamogga Venue</span>
                    <ArrowDownRight className="w-4 h-4 text-[#8B1E2F] shrink-0" />
                  </a>
                </div>
              </div>

              {/* Right Column (5 cols): Sacred Shubhamastu Panchanga & Kalyana Mandapam Card (Zero Images) */}
              <div className="lg:col-span-5 bg-gradient-to-b from-[#2A0E13] via-[#3B141C] to-[#1E0A0E] text-[#FAF6F0] border-2 border-[#C69214]/70 rounded-2xl p-5 sm:p-8 flex flex-col justify-between shadow-md relative overflow-hidden break-words">
                <div className="pointer-events-none absolute inset-2.5 border border-[#D4AF37]/30 rounded-xl" />

                <div className="relative z-10 space-y-4">
                  <div className="border-b border-[#D4AF37]/30 pb-3.5">
                    <p className="text-xs text-[#F6E29C] font-kannada leading-relaxed">
                      ಶುಭಮಸ್ತು · ಸ್ವಸ್ತಿಶ್ರೀ ವಿಜಯಾಭ್ಯುದಯ ಶಾಲಿವಾಹನ ಶಕೆ 1948
                    </p>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#FAF6F0] font-display mt-1">
                      Sacred Dhanur Lagna Muhurtham
                    </h2>
                  </div>

                  <p className="text-xs sm:text-sm text-[#EFE6D5]/90 leading-relaxed font-kannada">
                    ಶ್ರೀ ಪರಾಭವ ನಾಮ ಸಂವತ್ಸರದ ದಕ್ಷಿಣಾಯಣ ಕಾರ್ತೀಕ ಮಾಸ ಶುಕ್ಲ ಪಕ್ಷ ದಶಮಿ ದಿನಾಂಕ 19-11-2026ನೇ ಗುರುವಾರ ಬೆಳಿಗ್ಗೆ 9.15 ರಿಂದ 10.10 ಗಂಟೆಯೊಳಗೆ ಸಲ್ಲುವ ಧನುರ್ ಲಗ್ನದ ಶುಭ ಮುಹೂರ್ತದಲ್ಲಿ
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 pt-2">
                    <div className="bg-[#18070A]/75 border border-[#D4AF37]/35 rounded-xl p-3.5">
                      <p className="text-[11px] uppercase tracking-wider text-[#F6E29C] font-semibold">
                        01. Evening Reception · ಆರತಕ್ಷತೆ
                      </p>
                      <p className="text-sm font-bold text-[#FAF6F0] mt-0.5 font-mono-tabular">
                        Wed, 18th Nov 2026 · 7:00 PM
                      </p>
                    </div>

                    <div className="bg-[#18070A]/75 border border-[#D4AF37]/55 rounded-xl p-3.5">
                      <p className="text-[11px] uppercase tracking-wider text-[#F6E29C] font-semibold">
                        02. Sacred Muhurtham · ಧನುರ್ ಲಗ್ನ
                      </p>
                      <p className="text-sm font-bold text-[#FAF6F0] mt-0.5 font-mono-tabular">
                        Thu, 19th Nov 2026 · 9:15 – 10:10 AM
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 pt-5 mt-5 border-t border-[#D4AF37]/30">
                  <p className="text-xs uppercase tracking-wider text-[#F6E29C] font-semibold">
                    Kalyana Mandapam · Shivamogga
                  </p>
                  <p className="text-base sm:text-lg font-bold text-[#FAF6F0] font-display mt-0.5">
                    Arya Edigara Bhavana Sangha
                  </p>
                  <p className="text-xs text-[#EFE6D5]/85 mt-0.5 leading-relaxed">
                    Ashok Nagar Main Road, Beside Helipad, Police Quarters, Shivamogga - 577205
                  </p>
                </div>
              </div>
            </div>

            {/* Full-Width Live Countdown Strip Below the Hero Split */}
            <div
              className="mt-6 sm:mt-8 bg-[#231416] text-[#FAF6F0] border border-[#C69214]/45 rounded-2xl p-5 sm:p-8 break-words"
              aria-label="Countdown to Wedding Muhurtham"
              data-testid="wedding-countdown"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-center">
                <div className="lg:col-span-5 space-y-1 text-center lg:text-left">
                  <p className="text-xs uppercase tracking-widest text-[#F6E29C] font-semibold">
                    Auspicious Dhanur Lagna Countdown
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#FAF6F0]">
                    Counting Down to Our Muhurtham
                  </h2>
                  <p className="text-xs text-[#EFE6D5]/80">
                    Thursday, 19th November 2026 · 9:15 AM IST · Shivamogga
                  </p>
                </div>

                <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  <div className="bg-[#2E1A1D] border border-[#C69214]/35 rounded-xl p-3.5 sm:p-4 text-center">
                    <p
                      className="text-2xl sm:text-4xl font-bold text-[#F6E29C] font-mono-tabular"
                      data-testid="countdown-days"
                    >
                      {countdown.days}
                    </p>
                    <p className="text-xs text-[#EFE6D5]/80 mt-1">Days</p>
                  </div>

                  <div className="bg-[#2E1A1D] border border-[#C69214]/35 rounded-xl p-3.5 sm:p-4 text-center">
                    <p
                      className="text-2xl sm:text-4xl font-bold text-[#FAF6F0] font-mono-tabular"
                      data-testid="countdown-hours"
                    >
                      {padTwo(countdown.hours)}
                    </p>
                    <p className="text-xs text-[#EFE6D5]/80 mt-1">Hours</p>
                  </div>

                  <div className="bg-[#2E1A1D] border border-[#C69214]/35 rounded-xl p-3.5 sm:p-4 text-center">
                    <p
                      className="text-2xl sm:text-4xl font-bold text-[#FAF6F0] font-mono-tabular"
                      data-testid="countdown-minutes"
                    >
                      {padTwo(countdown.minutes)}
                    </p>
                    <p className="text-xs text-[#EFE6D5]/80 mt-1">Minutes</p>
                  </div>

                  <div className="bg-[#2E1A1D] border border-[#C69214]/35 rounded-xl p-3.5 sm:p-4 text-center">
                    <p
                      className="text-2xl sm:text-4xl font-bold text-[#F6E29C] font-mono-tabular"
                      data-testid="countdown-seconds"
                    >
                      {padTwo(countdown.seconds)}
                    </p>
                    <p className="text-xs text-[#EFE6D5]/80 mt-1">Seconds</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </HeroTemplePortal>

        {/* Subtle Editorial Section Ribbon — Mobile Wrapped */}
        <div className="bg-[#EFE6D5] border-y border-[#DFC9A6] py-3 px-4 text-center">
          <p className="text-xs font-medium text-[#5B4338] tracking-wide leading-relaxed break-words">
            || Sri Lakshmi Thimmaraya Swamy Prasanna || &nbsp;·&nbsp; Chi. Sou. Sowmya H (B.E) Weds
            Chi. Ry. Hritesh G. Raju (B.E) &nbsp;·&nbsp; Reception: 18-11-2026 (7:00 PM)
            &nbsp;·&nbsp; Muhurtham: 19-11-2026 (9:15 AM – 10:10 AM, Dhanur Lagna)
          </p>
        </div>

        {/* 01. Traditional Bilingual Wedding Invitation Section with Scroll Temple Door Reveal */}
        <ScrollTempleGateSection
          gateTitle="Sanctum Dwara I · Sacred Wedding Patrika"
          gateSubtitle="Temple Doors Part as You Scroll"
        >
          <InvitationSection language={language} onLanguageChange={setLanguage} />
        </ScrollTempleGateSection>

        {/* 02. Ceremonies Schedule & Shivamogga Venue Guide with Scroll Temple Door Reveal */}
        <ScrollTempleGateSection
          gateTitle="Sanctum Dwara II · Muhurtham & Shivamogga Venue"
          gateSubtitle="Arya Edigara Bhavana Sangha"
        >
          <CeremoniesAndVenue />
        </ScrollTempleGateSection>
      </main>

      {/* Quiet Editorial Footer — Mobile Wrapped */}
      <footer className="bg-[#231416] text-[#EFE6D5] py-10 sm:py-12 px-4 sm:px-8 border-t border-[#C69214]/30 break-words">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8">
          <div className="space-y-1.5">
            <p className="text-xs text-[#F6E29C] font-semibold">
              || Sri Lakshmi Thimmaraya Swamy Prasanna ||
            </p>
            <p className="text-lg sm:text-xl font-bold text-[#FAF6F0] font-display">
              Chi. Sou. Sowmya H &amp; Chi. Ry. Hritesh G. Raju
            </p>
            <p className="text-xs text-[#EFE6D5]/80 leading-relaxed">
              With Best Compliments From: Late Sri Thimmarayappa Family, Relatives &amp; Friends ·
              Smt. Jayashree &amp; Sri Harish Kumar H.S.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-[#EFE6D5]/80">
            <a href="#invitation" className="hover:text-[#F6E29C] transition-colors py-1">
              Sacred Patrika
            </a>
            <a href="#ceremonies" className="hover:text-[#F6E29C] transition-colors py-1">
              Muhurtham Schedule
            </a>
            <a href="#venue" className="hover:text-[#F6E29C] transition-colors py-1">
              Shivamogga Venue
            </a>
            <a href="#lineage" className="hover:text-[#F6E29C] transition-colors py-1">
              Family Lineage
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
