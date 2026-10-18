export interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMs: number;
  isPast: boolean;
  phase: 'upcoming' | 'reception_day' | 'wedding_day' | 'married';
}

// Muhurtham: Thursday, 19th November 2026 at 9:15 AM IST (UTC+05:30)
export const MUHURTHAM_ISO = '2026-11-19T09:15:00+05:30';
export const MUHURTHAM_END_ISO = '2026-11-19T10:10:00+05:30';
// Reception: Wednesday, 18th November 2026 at 7:00 PM IST (UTC+05:30)
export const RECEPTION_ISO = '2026-11-18T19:00:00+05:30';

export function calculateCountdown(
  nowMs: number,
  targetMs: number = new Date(MUHURTHAM_ISO).getTime(),
  receptionMs: number = new Date(RECEPTION_ISO).getTime(),
  muhurthamEndMs: number = new Date(MUHURTHAM_END_ISO).getTime()
): CountdownState {
  const diff = targetMs - nowMs;

  let phase: CountdownState['phase'] = 'upcoming';
  if (nowMs >= muhurthamEndMs) {
    phase = 'married';
  } else if (nowMs >= targetMs && nowMs < muhurthamEndMs) {
    phase = 'wedding_day';
  } else if (nowMs >= receptionMs && nowMs < targetMs) {
    phase = 'reception_day';
  }

  if (diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalMs: 0,
      isPast: true,
      phase,
    };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    days,
    hours,
    minutes,
    seconds,
    totalMs: diff,
    isPast: false,
    phase,
  };
}

export interface TempleDoorKinematics {
  effectiveOpen: number;
  doorAngleDeg: number;
  doorSlidePct: number;
  sanctumGlowOpacity: number;
}

/**
 * Pure function computing 3D temple sanctum door kinematics from ceremony & scroll ratios
 * across both mobile and desktop viewports so that at rest the carved doors frame the outer
 * viewport margins without obstructing a single character of text.
 */
export function computeTempleDoorKinematics(
  ceremonyRatio: number,
  scrollRatio: number,
  isMobileViewport: boolean
): TempleDoorKinematics {
  const clampedCeremony = Math.min(1, Math.max(0, ceremonyRatio));
  const clampedScroll = Math.min(1, Math.max(0, scrollRatio));
  const effectiveOpen = Math.min(1, clampedCeremony + clampedScroll * (1 - clampedCeremony));

  // When effectiveOpen reaches 1.0, doors slide 100% outward.
  // At rest after initial opening (ceremonyRatio ~ 0.90 desktop / 0.94 mobile),
  // doors sit cleanly inside the outer viewport padding/margins without covering text.
  const maxSlide = isMobileViewport ? 100 : 98;
  const maxAngle = isMobileViewport ? 84 : 80;

  return {
    effectiveOpen,
    doorAngleDeg: Number((effectiveOpen * maxAngle).toFixed(2)),
    doorSlidePct: Number((effectiveOpen * maxSlide).toFixed(2)),
    sanctumGlowOpacity: Number(Math.max(0, 0.85 - effectiveOpen * 0.85).toFixed(3)),
  };
}

export function generateIcsCalendarContent(eventKey: 'reception' | 'muhurtham'): string {
  const isReception = eventKey === 'reception';
  const dtStart = isReception ? '20261118T133000Z' : '20261119T034500Z';
  const dtEnd = isReception ? '20261118T170000Z' : '20261119T044000Z';
  const summary = isReception
    ? 'Wedding Reception: Chi. Sou. Sowmya H & Chi. Ry. Hritesh G. Raju'
    : 'Wedding Muhurtham (Dhanur Lagna): Chi. Sou. Sowmya H & Chi. Ry. Hritesh G. Raju';
  const description = isReception
    ? 'Wedding Reception of Chi. Sou. Sowmya H (B.E) and Chi. Ry. Hritesh G. Raju (B.E). 7:00 PM IST onwards at Arya Edigara Bhavana Sangha, Shivamogga.'
    : 'Auspicious Wedding Muhurtham (Dhanur Lagna, 9:15 AM to 10:10 AM IST) of Chi. Sou. Sowmya H (B.E) and Chi. Ry. Hritesh G. Raju (B.E) at Arya Edigara Bhavana Sangha, Shivamogga.';

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//SowmyaAndHriteshWedding//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:sowmya-hritesh-${eventKey}-2026@wedding.invitation`,
    'DTSTAMP:20261017T120000Z',
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description}`,
    'LOCATION:Arya Edigara Bhavana Sangha\\, Ashok Nagar Main Road\\, Beside Helipad\\, Police Quarters\\, Shivamogga - 577205',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}
