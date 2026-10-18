import React, { useState } from 'react';
import { CalendarPlus, Navigation, Clock, Check, Copy, MapPin } from 'lucide-react';
import { WEDDING_INVITATION_DATA } from '../data/weddingData';
import { generateIcsCalendarContent } from '../utils/weddingLogic';

export const CeremoniesAndVenue: React.FC = () => {
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [downloadedEvent, setDownloadedEvent] = useState<'reception' | 'muhurtham' | null>(null);

  const data = WEDDING_INVITATION_DATA;
  const fullAddress =
    'Arya Edigara Bhavana Sangha, Ashok Nagar Main Road, Beside Helipad, Police Quarters, Shivamogga - 577205';

  const handleDownloadCalendar = (eventKey: 'reception' | 'muhurtham') => {
    const icsContent = generateIcsCalendarContent(eventKey);
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Sowmya-Hritesh-${eventKey}-2026.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setDownloadedEvent(eventKey);
    setTimeout(() => setDownloadedEvent(null), 3000);
  };

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(fullAddress);
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2500);
    } catch {
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2500);
    }
  };

  return (
    <section
      id="ceremonies"
      className="py-12 sm:py-20 bg-[#F3ECE1] border-y border-[#E4D5B7]"
      aria-labelledby="ceremonies-heading"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
        {/* Section Heading */}
        <div className="mb-8 sm:mb-12 pb-6 border-b border-[#DFC9A6] flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#8B1E2F] font-semibold">
              02. Sacred Schedule &amp; Venue
            </p>
            <h2
              id="ceremonies-heading"
              className="text-2xl sm:text-4xl font-bold text-[#231416] font-display mt-1 tracking-tight"
            >
              Auspicious Ceremonies in Shivamogga
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#5B4338] leading-relaxed">
            Shalivahana Shaka 1948 · Karthika Masa · Shukla Paksha Dashami · Dhanur Lagna
          </p>
        </div>

        {/* Two Main Ceremonies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch mb-10 sm:mb-14">
          {/* Reception Card */}
          <div className="bg-[#FFFDF9] border border-[#DFC9A6] rounded-2xl p-5 sm:p-8 flex flex-col justify-between break-words">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#EFE6D5]">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#8B1E2F]">
                  Evening Celebration · ಆರತಕ್ಷತೆ
                </span>
                <span className="text-xs font-mono-tabular text-[#5B4338]">
                  Wednesday · 18-11-2026
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-[#231416] font-display mt-4 sm:mt-5">
                Wedding Reception
              </h3>

              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs sm:text-sm text-[#4A3531] font-medium">
                <Clock className="w-4 h-4 text-[#8B1E2F] shrink-0" />
                <span className="font-mono-tabular">18th November 2026</span>
                <span aria-hidden="true">·</span>
                <span>Wednesday</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#8B1E2F] font-semibold">7:00 pm onwards</span>
              </div>

              <p className="text-sm text-[#4A3531] mt-4 leading-relaxed">
                {data.events.reception.en.description}
              </p>

              <div className="mt-5 pt-4 border-t border-[#EFE6D5] text-xs text-[#6B544C] space-y-1.5 leading-relaxed">
                <p>
                  <strong className="text-[#231416]">Venue:</strong> Arya Edigara Bhavana Sangha,
                  Shivamogga
                </p>
                <p>
                  <strong className="text-[#231416]">Suggested Attire:</strong>{' '}
                  {data.events.reception.en.attire}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#EFE6D5] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => handleDownloadCalendar('reception')}
                className="w-full sm:w-auto min-h-[44px] px-4 py-2.5 text-xs font-semibold text-[#231416] bg-[#FAF6F0] border border-[#D5C3A1] rounded-xl hover:bg-[#EFE6D5] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                {downloadedEvent === 'reception' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#155E3B] shrink-0" />
                    <span>Saved Reception (.ics)</span>
                  </>
                ) : (
                  <>
                    <CalendarPlus className="w-3.5 h-3.5 text-[#8B1E2F] shrink-0" />
                    <span>Add Reception to Calendar</span>
                  </>
                )}
              </button>
              <a
                href="#venue"
                className="text-xs font-semibold text-[#8B1E2F] hover:underline text-center sm:text-right py-1"
              >
                View Hall Location →
              </a>
            </div>
          </div>

          {/* Muhurtham Card */}
          <div className="bg-[#FFFDF9] border-2 border-[#C69214] rounded-2xl p-5 sm:p-8 flex flex-col justify-between relative break-words">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#EFE6D5]">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#8B1E2F]">
                  Sacred Vedic Wedding · ಧನುರ್ ಲಗ್ನ ಶುಭ ಮುಹೂರ್ತ
                </span>
                <span className="text-xs font-mono-tabular text-[#5B4338]">
                  Thursday · 19-11-2026
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-[#8B1E2F] font-display mt-4 sm:mt-5">
                Auspicious Muhurtham
              </h3>

              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs sm:text-sm text-[#4A3531] font-medium">
                <Clock className="w-4 h-4 text-[#8B1E2F] shrink-0" />
                <span className="font-mono-tabular">19th November 2026</span>
                <span aria-hidden="true">·</span>
                <span>Thursday</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#8B1E2F] font-semibold font-mono-tabular">
                  9:15 am to 10:10 am
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-semibold text-[#231416]">Lagna: Dhanur</span>
              </div>

              <p className="text-sm text-[#4A3531] mt-4 leading-relaxed">
                {data.events.muhurtham.en.description}
              </p>

              <div className="mt-5 pt-4 border-t border-[#EFE6D5] text-xs text-[#6B544C] space-y-1.5 leading-relaxed">
                <p>
                  <strong className="text-[#231416]">Sacred Lagna:</strong> Dhanur Lagna (Karthika
                  Shukla Dashami)
                </p>
                <p>
                  <strong className="text-[#231416]">Suggested Attire:</strong>{' '}
                  {data.events.muhurtham.en.attire}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#EFE6D5] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => handleDownloadCalendar('muhurtham')}
                className="w-full sm:w-auto min-h-[44px] px-4 py-2.5 text-xs font-semibold text-[#FAF6F0] bg-[#8B1E2F] rounded-xl hover:bg-[#701624] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                {downloadedEvent === 'muhurtham' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#F6E29C] shrink-0" />
                    <span>Saved Muhurtham (.ics)</span>
                  </>
                ) : (
                  <>
                    <CalendarPlus className="w-3.5 h-3.5 text-[#F6E29C] shrink-0" />
                    <span>Add Muhurtham to Calendar</span>
                  </>
                )}
              </button>
              <a
                href="#venue"
                className="text-xs font-semibold text-[#8B1E2F] hover:underline text-center sm:text-right py-1"
              >
                Directions to Venue →
              </a>
            </div>
          </div>
        </div>

        {/* Venue & Location Guide (Pure Typography & Responsive Grid — Zero Images) */}
        <div
          id="venue"
          className="bg-[#FFFDF9] border border-[#DFC9A6] rounded-2xl p-5 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch break-words"
        >
          <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-widest text-[#8B1E2F] font-semibold">
                Wedding Mandapam &amp; Location Guide
              </p>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#231416] font-display leading-snug">
                Arya Edigara Bhavana Sangha
              </h3>
              <p className="text-xs sm:text-sm text-[#5B4338] font-kannada leading-relaxed">
                ಆರ್ಯ ಈಡಿಗರ ಭವನ ಸಂಘ · ಅಶೋಕನಗರ ಮುಖ್ಯ ರಸ್ತೆ, ಹೆಲಿಪ್ಯಾಡ್ ಹತ್ತಿರ, ಪೊಲೀಸ್ ಕ್ವಾರ್ಟರ್ಸ್, ಶಿವಮೊಗ್ಗ - 577205
              </p>
              <p className="text-sm sm:text-base text-[#231416] font-medium leading-relaxed">
                Ashok Nagar Main Road, Beside Helipad, Police Quarters, Shivamogga - 577205
              </p>
            </div>

            <div className="pt-4 border-t border-[#EFE6D5] flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${data.venue.en.googleMapsQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 text-xs font-semibold text-[#FAF6F0] bg-[#231416] rounded-xl hover:bg-[#3A2226] transition-colors flex items-center justify-center gap-2"
              >
                <Navigation className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <span>Open in Google Maps</span>
              </a>

              <button
                type="button"
                onClick={handleCopyAddress}
                className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 text-xs font-semibold text-[#231416] bg-[#FAF6F0] border border-[#D5C3A1] rounded-xl hover:bg-[#EFE6D5] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                {copiedAddress ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#155E3B] shrink-0" />
                    <span>Address Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#8B1E2F] shrink-0" />
                    <span>Copy Full Address</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Key Landmarks & Travel Distances (Clean Text Card — No Map Image) */}
          <div className="lg:col-span-5 bg-[#FAF6F0] border border-[#E4D5B7] rounded-xl p-5 sm:p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#8B1E2F] font-semibold">
                <MapPin className="w-4 h-4 text-[#8B1E2F] shrink-0" />
                <span>Key Landmarks &amp; Travel Distances</span>
              </div>

              <ul className="space-y-2.5 text-xs sm:text-sm text-[#4A3531] leading-relaxed">
                {data.venue.en.landmarks.map((landmark, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-[#8B1E2F] font-bold shrink-0">·</span>
                    <span>{landmark}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-[#E4D5B7] flex flex-wrap items-center justify-between gap-2 text-xs text-[#6B544C] font-mono-tabular">
              <span>PIN: 577205 · Ashok Nagar</span>
              <span>Nov 18 &amp; 19, 2026</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
