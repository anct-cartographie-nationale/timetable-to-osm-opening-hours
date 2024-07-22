/* eslint-disable @typescript-eslint/naming-convention */

import { Schedule } from '../utilities';
import { toTimetableOpeningHours } from './to-timetable-opening-hours';

describe('horaires presenter', (): void => {
  it('should get time table opening hours from osm opening hours, open every working day', (): void => {
    const openingHours: string = 'Mo-Fr 09:00-12:00,14:00-18:30';
    const date: Date = new Date('2022-07-22T09:00:00.000Z');

    const timetableOpeningHours: Schedule = toTimetableOpeningHours(date)(openingHours);

    expect(timetableOpeningHours).toStrictEqual({
      Mo: {
        am: { startTime: '09:00', endTime: '12:00', isOpen: true },
        pm: { startTime: '14:00', endTime: '18:30', isOpen: true }
      },
      Tu: {
        am: { startTime: '09:00', endTime: '12:00', isOpen: true },
        pm: { startTime: '14:00', endTime: '18:30', isOpen: true }
      },
      We: {
        am: { startTime: '09:00', endTime: '12:00', isOpen: true },
        pm: { startTime: '14:00', endTime: '18:30', isOpen: true }
      },
      Th: {
        am: { startTime: '09:00', endTime: '12:00', isOpen: true },
        pm: { startTime: '14:00', endTime: '18:30', isOpen: true }
      },
      Fr: {
        am: { startTime: '09:00', endTime: '12:00', isOpen: true },
        pm: { startTime: '14:00', endTime: '18:30', isOpen: true }
      },
      Sa: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: null, endTime: null, isOpen: false }
      },
      Su: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: null, endTime: null, isOpen: false }
      }
    });
  });

  it('should get time table opening hours from osm opening hours, open every day', (): void => {
    const openingHours: string = 'Mo-Su 09:00-12:00,14:00-18:30';
    const date: Date = new Date('2022-07-22T09:00:00.000Z');

    const timetableOpeningHours: Schedule = toTimetableOpeningHours(date)(openingHours);

    expect(timetableOpeningHours).toStrictEqual({
      Mo: {
        am: { startTime: '09:00', endTime: '12:00', isOpen: true },
        pm: { startTime: '14:00', endTime: '18:30', isOpen: true }
      },
      Tu: {
        am: { startTime: '09:00', endTime: '12:00', isOpen: true },
        pm: { startTime: '14:00', endTime: '18:30', isOpen: true }
      },
      We: {
        am: { startTime: '09:00', endTime: '12:00', isOpen: true },
        pm: { startTime: '14:00', endTime: '18:30', isOpen: true }
      },
      Th: {
        am: { startTime: '09:00', endTime: '12:00', isOpen: true },
        pm: { startTime: '14:00', endTime: '18:30', isOpen: true }
      },
      Fr: {
        am: { startTime: '09:00', endTime: '12:00', isOpen: true },
        pm: { startTime: '14:00', endTime: '18:30', isOpen: true }
      },
      Sa: {
        am: { startTime: '09:00', endTime: '12:00', isOpen: true },
        pm: { startTime: '14:00', endTime: '18:30', isOpen: true }
      },
      Su: {
        am: { startTime: '09:00', endTime: '12:00', isOpen: true },
        pm: { startTime: '14:00', endTime: '18:30', isOpen: true }
      }
    });
  });

  it('should get time table opening hours from osm opening hours, open every day in the morning', (): void => {
    const openingHours: string = 'Mo-Su 09:00-12:00';
    const date: Date = new Date('2022-07-22T09:00:00.000Z');

    const timetableOpeningHours: Schedule = toTimetableOpeningHours(date)(openingHours);

    expect(timetableOpeningHours).toStrictEqual({
      Mo: {
        am: { startTime: '09:00', endTime: '12:00', isOpen: true },
        pm: { startTime: null, endTime: null, isOpen: false }
      },
      Tu: {
        am: { startTime: '09:00', endTime: '12:00', isOpen: true },
        pm: { startTime: null, endTime: null, isOpen: false }
      },
      We: {
        am: { startTime: '09:00', endTime: '12:00', isOpen: true },
        pm: { startTime: null, endTime: null, isOpen: false }
      },
      Th: {
        am: { startTime: '09:00', endTime: '12:00', isOpen: true },
        pm: { startTime: null, endTime: null, isOpen: false }
      },
      Fr: {
        am: { startTime: '09:00', endTime: '12:00', isOpen: true },
        pm: { startTime: null, endTime: null, isOpen: false }
      },
      Sa: {
        am: { startTime: '09:00', endTime: '12:00', isOpen: true },
        pm: { startTime: null, endTime: null, isOpen: false }
      },
      Su: {
        am: { startTime: '09:00', endTime: '12:00', isOpen: true },
        pm: { startTime: null, endTime: null, isOpen: false }
      }
    });
  });

  it('should get time table opening hours from osm opening hours, open every day in the afternoon', (): void => {
    const openingHours: string = 'Mo-Su 14:00-18:30';
    const date: Date = new Date('2022-07-22T09:00:00.000Z');

    const timetableOpeningHours: Schedule = toTimetableOpeningHours(date)(openingHours);

    expect(timetableOpeningHours).toStrictEqual({
      Mo: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: '14:00', endTime: '18:30', isOpen: true }
      },
      Tu: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: '14:00', endTime: '18:30', isOpen: true }
      },
      We: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: '14:00', endTime: '18:30', isOpen: true }
      },
      Th: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: '14:00', endTime: '18:30', isOpen: true }
      },
      Fr: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: '14:00', endTime: '18:30', isOpen: true }
      },
      Sa: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: '14:00', endTime: '18:30', isOpen: true }
      },
      Su: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: '14:00', endTime: '18:30', isOpen: true }
      }
    });
  });
});
