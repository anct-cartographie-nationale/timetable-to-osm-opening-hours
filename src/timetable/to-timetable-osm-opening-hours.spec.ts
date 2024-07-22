import { OsmOpeningHours, Time, WeekDay } from '../utilities';
import {
  dateTimeFor,
  dayOfTheWeek,
  firstDayOfTheWeek,
  lastDayOfTheWeek,
  toTimetableOsmOpeningHours
} from './to-timetable-osm-opening-hours';

const toMilliseconds = (minutes: number): number => minutes * 60 * 1000;

describe('horaires presenter', (): void => {
  it('should get time table opening hours from osm opening hours, open every working day', (): void => {
    const openingHours: string = 'Mo-Fr 09:00-12:00,14:00-18:30';
    const date: Date = new Date('2022-07-22T09:00:00.000Z');

    const timetableOsmOpeningHours: OsmOpeningHours[] = toTimetableOsmOpeningHours(date)(openingHours);

    expect(timetableOsmOpeningHours).toStrictEqual([
      {
        day: 'Mo',
        osmHours: '09:00-12:00,14:00-18:30'
      },
      {
        day: 'Tu',
        osmHours: '09:00-12:00,14:00-18:30'
      },
      {
        day: 'We',
        osmHours: '09:00-12:00,14:00-18:30'
      },
      {
        day: 'Th',
        osmHours: '09:00-12:00,14:00-18:30'
      },
      {
        day: 'Fr',
        osmHours: '09:00-12:00,14:00-18:30'
      }
    ]);
  });

  it('should get time table opening hours from osm opening hours, open every day', (): void => {
    const openingHours: string = 'Mo-Su 09:00-12:00,14:00-18:30';
    const date: Date = new Date('2022-07-22T09:00:00.000Z');

    const timetableOsmOpeningHours: OsmOpeningHours[] = toTimetableOsmOpeningHours(date)(openingHours);

    expect(timetableOsmOpeningHours).toStrictEqual([
      {
        day: 'Mo',
        osmHours: '09:00-12:00,14:00-18:30'
      },
      {
        day: 'Tu',
        osmHours: '09:00-12:00,14:00-18:30'
      },
      {
        day: 'We',
        osmHours: '09:00-12:00,14:00-18:30'
      },
      {
        day: 'Th',
        osmHours: '09:00-12:00,14:00-18:30'
      },
      {
        day: 'Fr',
        osmHours: '09:00-12:00,14:00-18:30'
      },
      {
        day: 'Sa',
        osmHours: '09:00-12:00,14:00-18:30'
      },
      {
        day: 'Su',
        osmHours: '09:00-12:00,14:00-18:30'
      }
    ]);
  });

  it('should get horaires for odd week', (): void => {
    const openingHours: string = 'week 1-53/2 Mo 09:30-12:30,13:30-15:30; PH off';
    const date: Date = new Date('2022-07-22T09:00:00.000Z');

    const timetableOsmOpeningHours: OsmOpeningHours[] = toTimetableOsmOpeningHours(date)(openingHours);

    expect(timetableOsmOpeningHours).toStrictEqual([
      {
        day: 'Mo',
        osmHours: '09:30-12:30,13:30-15:30'
      }
    ]);
  });

  it('should get horaires full closed if we are in even week', (): void => {
    const openingHours: string = 'week 1-53/2 Mo 09:30-12:30,13:30-15:30; PH off';
    const date: Date = new Date('2022-07-29T09:00:00.000Z');

    const timetableOsmOpeningHours: OsmOpeningHours[] = toTimetableOsmOpeningHours(date)(openingHours);

    expect(timetableOsmOpeningHours).toStrictEqual([]);
  });

  it('should get first day of the week', (): void => {
    const date: Date = new Date('2023-03-03T17:02:08.686Z');

    const mondayDate: Date = firstDayOfTheWeek(date);

    expect(mondayDate).toStrictEqual(new Date('2023-02-27T17:02:08.686Z'));
  });

  it('should get last day of the week', (): void => {
    const date: Date = new Date('2023-03-03T17:02:08.686Z');

    const mondayDate: Date = lastDayOfTheWeek(date);

    expect(mondayDate).toStrictEqual(new Date('2023-03-05T17:02:08.686Z'));
  });

  it('should get specified day of the week', (): void => {
    const date: Date = new Date('2023-03-03T17:02:08.686Z');

    const mondayDate: Date = dayOfTheWeek(date, WeekDay.Wednesday);

    expect(mondayDate).toStrictEqual(new Date('2023-03-01T17:02:08.686Z'));
  });

  it('should get date time for specified day at 12:30', (): void => {
    const date: Date = new Date('2023-03-07T17:02:08.686Z');
    const time: Time = '12:30';

    const dateTime: Date = dateTimeFor(date)(WeekDay.Wednesday, time);

    expect(dateTime.getTime()).toBe(1678278600000 + toMilliseconds(date.getTimezoneOffset()));
  });
});
