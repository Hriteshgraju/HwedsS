import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateCountdown,
  computeTempleDoorKinematics,
  generateIcsCalendarContent,
  MUHURTHAM_ISO,
} from './weddingLogic.ts';

test('calculateCountdown accurately computes remaining days, hours, minutes, and seconds before Muhurtham', () => {
  const target = new Date(MUHURTHAM_ISO).getTime();
  const sampleNow = target - (10 * 86400 + 5 * 3600 + 30 * 60 + 15) * 1000;
  const res = calculateCountdown(sampleNow, target);

  assert.equal(res.days, 10);
  assert.equal(res.hours, 5);
  assert.equal(res.minutes, 30);
  assert.equal(res.seconds, 15);
  assert.equal(res.isPast, false);
  assert.equal(res.phase, 'upcoming');
});

test('calculateCountdown transitions to reception_day and married phases accurately', () => {
  const receptionDuring = new Date('2026-11-18T20:00:00+05:30').getTime();
  const resReception = calculateCountdown(receptionDuring);
  assert.equal(resReception.phase, 'reception_day');
  assert.equal(resReception.isPast, false);

  const afterMuhurtham = new Date('2026-11-19T11:00:00+05:30').getTime();
  const resMarried = calculateCountdown(afterMuhurtham);
  assert.equal(resMarried.phase, 'married');
  assert.equal(resMarried.isPast, true);
  assert.equal(resMarried.days, 0);
});

test('computeTempleDoorKinematics smoothly interpolates 3D door opening for mobile and desktop viewports', () => {
  const closedState = computeTempleDoorKinematics(0, 0, false);
  assert.equal(closedState.effectiveOpen, 0);
  assert.equal(closedState.doorAngleDeg, 0);
  assert.equal(closedState.doorSlidePct, 0);

  const scrolledState = computeTempleDoorKinematics(0.9, 1, true);
  assert.equal(scrolledState.effectiveOpen, 1);
  assert.equal(scrolledState.doorAngleDeg, 84);
  assert.equal(scrolledState.doorSlidePct, 100);
});

test('generateIcsCalendarContent returns valid RFC 5545 calendar data with Shivamogga venue', () => {
  const ics = generateIcsCalendarContent('muhurtham');
  assert.ok(ics.startsWith('BEGIN:VCALENDAR'));
  assert.ok(ics.includes('Arya Edigara Bhavana Sangha'));
  assert.ok(ics.includes('Dhanur Lagna'));
  assert.ok(ics.endsWith('END:VCALENDAR'));
});
