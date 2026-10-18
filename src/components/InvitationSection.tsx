import React, { useState } from 'react';
import { Printer, ScrollText } from 'lucide-react';
import { WEDDING_INVITATION_DATA } from '../data/weddingData';

interface InvitationSectionProps {
  language: 'en' | 'kn';
  onLanguageChange: (lang: 'en' | 'kn') => void;
}

export const InvitationSection: React.FC<InvitationSectionProps> = ({
  language,
  onLanguageChange,
}) => {
  const [viewMode, setViewMode] = useState<'active' | 'side-by-side'>('active');
  const data = WEDDING_INVITATION_DATA;

  const handlePrintCard = () => {
    window.print();
  };

  const renderCardSide = (lang: 'en' | 'kn') => {
    const isKn = lang === 'kn';
    return (
      <article
        className={`relative bg-[#FFFDF9] border-2 border-[#C69214]/45 rounded-2xl p-5 sm:p-10 shadow-xs text-center flex flex-col justify-between overflow-hidden ${
          isKn ? 'font-kannada' : ''
        }`}
      >
        {/* Subtle Inner Hairline Frame */}
        <div className="pointer-events-none absolute inset-2 sm:inset-3 border border-[#8B1E2F]/20 rounded-xl" />

        <div className="space-y-5 relative z-10 break-words">
          {/* Sacred Invocation */}
          <p className="text-xs sm:text-sm font-medium tracking-wide text-[#5B4338] leading-relaxed">
            {data.invocation[lang]}
          </p>

          {/* Hosts (Bride's Parents) */}
          <div className="space-y-1.5">
            <h3 className="text-lg sm:text-xl font-bold text-[#8B1E2F] font-display leading-snug">
              {data.hosts[lang].names}
            </h3>
            <p className="text-xs sm:text-sm text-[#4A3531] italic leading-relaxed">
              {data.hosts[lang].lineage}
            </p>
            <p className="text-xs text-[#6B544C] max-w-md mx-auto leading-relaxed">
              {data.hosts[lang].addressLine1} {data.hosts[lang].addressLine2}
            </p>
          </div>

          {/* Kannada Shaka Panchanga Note */}
          <p className="text-xs sm:text-sm text-[#4A3531] max-w-lg mx-auto leading-relaxed border-y border-[#E4D5B7] py-3">
            {isKn ? data.panchanga.kn : data.hosts.en.invitationProse}
          </p>

          {/* Bride Name */}
          <div className="py-1">
            <p className="text-xs text-[#8B1E2F] font-medium">
              {data.bride[lang].prefix}
            </p>
            <h4 className="text-2xl sm:text-4xl font-bold text-[#8B1E2F] font-display tracking-tight mt-0.5 leading-tight">
              {data.bride[lang].name}{' '}
              <span className="text-sm sm:text-base font-normal text-[#6B544C]">
                {data.bride[lang].qualification}
              </span>
            </h4>
          </div>

          {/* Sacred Weds Divider */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 text-[#C69214]" aria-hidden="true">
            <span className="h-px w-10 sm:w-14 bg-[#E4D5B7]" />
            <span className="text-xs uppercase tracking-widest text-[#8B1E2F] font-semibold">
              {isKn ? 'ಜೊತೆ' : 'Weds'}
            </span>
            <span className="h-px w-10 sm:w-14 bg-[#E4D5B7]" />
          </div>

          {/* Groom Name & Parents */}
          <div className="space-y-1">
            <p className="text-xs text-[#8B1E2F] font-medium">
              {data.groom[lang].prefix}
            </p>
            <h4 className="text-2xl sm:text-4xl font-bold text-[#8B1E2F] font-display tracking-tight leading-tight">
              {data.groom[lang].name}{' '}
              <span className="text-sm sm:text-base font-normal text-[#6B544C]">
                {data.groom[lang].qualification}
              </span>
            </h4>
            <p className="text-xs sm:text-sm font-semibold text-[#231416] pt-1 leading-relaxed">
              {data.groom[lang].parents}
            </p>
            <p className="text-xs text-[#6B544C] leading-relaxed">{data.groom[lang].address}</p>
          </div>

          {/* Date & Venue */}
          <div className="pt-2 space-y-1">
            <p className="text-xs sm:text-sm text-[#4A3531]">
              {data.venue[lang].dateHeader}
            </p>
            <h5 className="text-xl sm:text-2xl font-bold text-[#8B1E2F] font-display leading-snug">
              {data.venue[lang].hallName}
            </h5>
            <p className="text-xs sm:text-sm text-[#4A3531] leading-relaxed">
              {data.venue[lang].addressLine1}
            </p>
            <p className="text-xs sm:text-sm font-medium text-[#231416]">
              {data.venue[lang].addressLine2}
            </p>
          </div>

          {/* Awaiting Your Gracious Presence */}
          <div className="pt-2 space-y-1">
            <p className="text-xs sm:text-sm font-semibold text-[#8B1E2F] italic">
              {data.awaitingPresence[lang].heading}
            </p>
            <p className="text-xs sm:text-sm font-medium text-[#231416] leading-relaxed">
              {data.awaitingPresence[lang].line1}
            </p>
            <p className="text-xs sm:text-sm font-medium text-[#231416] leading-relaxed">
              {data.awaitingPresence[lang].line2}
            </p>
          </div>

          {/* Reception, Sacred Lagna & Muhurtham Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-stretch pt-4 border-t border-[#E4D5B7]">
            <div className="border border-[#C69214]/50 rounded-lg p-3.5 bg-[#FAF6F0]/60 flex flex-col justify-center">
              <p className="text-sm font-bold text-[#8B1E2F] font-display">
                {data.events.reception[lang].title}
              </p>
              <p className="text-xs font-medium text-[#231416] mt-0.5 font-mono-tabular">
                {data.events.reception[lang].date} · {data.events.reception[lang].day}
              </p>
              <p className="text-xs text-[#4A3531] mt-0.5">
                {data.events.reception[lang].time}
              </p>
            </div>

            <div className="border border-[#E4D5B7] rounded-lg p-3.5 bg-[#FAF6F0]/40 flex flex-col items-center justify-center">
              <p className="text-[11px] uppercase tracking-wider text-[#8B1E2F] font-semibold">
                {isKn ? 'ಶುಭ ಮುಹೂರ್ತ' : 'Sacred Lagna'}
              </p>
              <p className="text-xs sm:text-sm font-bold text-[#231416] mt-1">
                {data.events.muhurtham[lang].lagna}
              </p>
              <p className="text-[11px] text-[#6B544C] mt-0.5">
                {isKn ? 'ಕಾರ್ತೀಕ ಶುಕ್ಲ ದಶಮಿ' : 'Karthika Shukla Dashami'}
              </p>
            </div>

            <div className="border border-[#C69214]/50 rounded-lg p-3.5 bg-[#FAF6F0]/60 flex flex-col justify-center">
              <p className="text-sm font-bold text-[#8B1E2F] font-display">
                {data.events.muhurtham[lang].title}
              </p>
              <p className="text-xs font-medium text-[#231416] mt-0.5 font-mono-tabular">
                {data.events.muhurtham[lang].date} · {data.events.muhurtham[lang].day}
              </p>
              <p className="text-xs text-[#4A3531] mt-0.5">
                {data.events.muhurtham[lang].time}
              </p>
            </div>
          </div>

          {/* Best Compliments Footer */}
          <div className="pt-3 border-t border-[#E4D5B7]/60">
            <p className="text-xs font-semibold text-[#8B1E2F]">
              {data.compliments[lang].heading}
            </p>
            <p className="text-xs text-[#231416] mt-0.5 leading-relaxed">
              {data.compliments[lang].line}
            </p>
          </div>
        </div>
      </article>
    );
  };

  return (
    <section
      id="invitation"
      className="py-12 sm:py-20 px-4 sm:px-8 max-w-[1200px] mx-auto"
      aria-labelledby="invitation-heading"
    >
      {/* Section Header — Wrapped for Mobile */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 sm:mb-10 pb-6 border-b border-[#E4D5B7]">
        <div>
          <p className="text-xs uppercase tracking-widest text-[#8B1E2F] font-semibold">
            01. Sacred Wedding Patrika
          </p>
          <h2
            id="invitation-heading"
            className="text-2xl sm:text-4xl font-bold text-[#231416] font-display mt-1 tracking-tight"
          >
            Traditional Wedding Invitation
          </h2>
          <p className="text-sm text-[#5B4338] mt-1.5 max-w-2xl leading-relaxed">
            Extracted word-for-word from our family wedding card in both English and Kannada.
          </p>
        </div>

        {/* Interactive Controls: Mobile-Wrapped Language & Side-by-Side Selector + Print */}
        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 w-full lg:w-auto">
          <div
            className="grid grid-cols-1 sm:flex sm:flex-wrap items-center gap-1.5 p-1.5 bg-[#EFE6D5] rounded-xl border border-[#DFC9A6] w-full sm:w-auto"
            role="group"
            aria-label="Invitation language selector"
          >
            <button
              type="button"
              onClick={() => {
                onLanguageChange('en');
                setViewMode('active');
              }}
              className={`min-h-[42px] px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors text-center cursor-pointer ${
                language === 'en' && viewMode === 'active'
                  ? 'bg-[#8B1E2F] text-[#FAF6F0] shadow-xs'
                  : 'text-[#4A3531] hover:text-[#231416]'
              }`}
            >
              English Card
            </button>
            <button
              type="button"
              onClick={() => {
                onLanguageChange('kn');
                setViewMode('active');
              }}
              className={`min-h-[42px] px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors text-center font-kannada cursor-pointer ${
                language === 'kn' && viewMode === 'active'
                  ? 'bg-[#8B1E2F] text-[#FAF6F0] shadow-xs'
                  : 'text-[#4A3531] hover:text-[#231416]'
              }`}
            >
              ಕನ್ನಡ ಪತ್ರಿಕೆ (Kannada)
            </button>
            <button
              type="button"
              onClick={() => setViewMode('side-by-side')}
              className={`min-h-[42px] px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                viewMode === 'side-by-side'
                  ? 'bg-[#8B1E2F] text-[#FAF6F0] shadow-xs'
                  : 'text-[#4A3531] hover:text-[#231416]'
              }`}
            >
              <ScrollText className="w-3.5 h-3.5 shrink-0" />
              <span>Bilingual Spread</span>
            </button>
          </div>

          <button
            type="button"
            onClick={handlePrintCard}
            className="w-full sm:w-auto min-h-[44px] px-4 py-2.5 text-xs font-semibold text-[#231416] bg-[#FFFDF9] border border-[#D5C3A1] rounded-xl hover:bg-[#F3ECE1] transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-[#8B1E2F] shrink-0" />
            <span>Print Invitation</span>
          </button>
        </div>
      </div>

      {/* Panchanga Ribbon */}
      <div className="mb-8 px-4 py-3.5 rounded-xl bg-[#F3ECE1] border border-[#E4D5B7] text-center">
        <p className="text-xs sm:text-sm text-[#4A3531] font-medium leading-relaxed break-words">
          {language === 'kn' ? data.panchanga.kn : data.panchanga.en}
        </p>
      </div>

      {/* Invitation Card Display */}
      {viewMode === 'side-by-side' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {renderCardSide('en')}
          {renderCardSide('kn')}
        </div>
      ) : (
        <div className="max-w-3xl mx-auto">{renderCardSide(language)}</div>
      )}

      {/* Family Lineage Summary Strip */}
      <div
        id="lineage"
        className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-[#E4D5B7]"
      >
        <div className="bg-[#FFFDF9] border border-[#E4D5B7] rounded-2xl p-5 sm:p-6 break-words">
          <p className="text-xs uppercase tracking-wider text-[#8B1E2F] font-semibold">
            Bride’s Family · Devanahalli
          </p>
          <h3 className="text-xl font-bold text-[#231416] font-display mt-1">
            Chi. Sou. Sowmya H, B.E
          </h3>
          <p className="text-sm text-[#4A3531] mt-2 leading-relaxed">
            Beloved daughter of <strong>Smt. M. Radhamma &amp; Late Sri T. Hanumahai</strong> (S/o.
            Smt. Thimmakka &amp; Late Sri Thimmarayappa). Warmly invited with{' '}
            <strong>Smt. Jayashree &amp; Sri Harish Kumar H.S.</strong>
          </p>
          <p className="text-xs text-[#6B544C] mt-3 leading-relaxed">
            Seekayanahalli · Vishwanathapura Post · Kundana Hobli · Devanahalli Taluk · Bangalore
            Rural - 562110
          </p>
        </div>

        <div className="bg-[#FFFDF9] border border-[#E4D5B7] rounded-2xl p-5 sm:p-6 break-words">
          <p className="text-xs uppercase tracking-wider text-[#8B1E2F] font-semibold">
            Groom’s Family · Shivamogga
          </p>
          <h3 className="text-xl font-bold text-[#231416] font-display mt-1">
            Chi. Ry. Hritesh G. Raju, B.E
          </h3>
          <p className="text-sm text-[#4A3531] mt-2 leading-relaxed">
            Beloved son of <strong>Smt. Mani Bai &amp; Sri Govindaraju N (Ex. Army)</strong>.
            Welcoming relatives and friends to celebrate in the heart of Shivamogga.
          </p>
          <p className="text-xs text-[#6B544C] mt-3 leading-relaxed">
            Shakthidhama · Virupina Koppa · Shivamogga - 577204
          </p>
        </div>
      </div>
    </section>
  );
};
