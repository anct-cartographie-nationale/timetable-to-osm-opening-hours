/* eslint-disable @typescript-eslint/naming-convention */

export enum WeekDay {
  Monday = 0,
  Tuesday = 1,
  Wednesday = 2,
  Thursday = 3,
  Friday = 4,
  Saturday = 5,
  Sunday = 6
}

type Digit = `${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`;

export type Time = `${0 | 1 | 2}${Digit}:${0 | 1 | 2 | 3 | 4 | 5}${Digit}`;

export type NullableTime = Time | null;

export type TimeRange = [NullableTime, NullableTime];

/* eslint-disable-next-line @typescript-eslint/sort-type-union-intersection-members */
export type OsmDaysOfWeek = 'Mo' | 'Tu' | 'We' | 'Th' | 'Fr' | 'Sa' | 'Su';

export type OsmOpeningHours = {
  day: OsmDaysOfWeek;
  osmHours: string;
};

export type DaySchedule = {
  am: { startTime: Time | null; endTime: Time | null; isOpen: boolean };
  pm: { startTime: Time | null; endTime: Time | null; isOpen: boolean };
};

const CLOSED_DAY_SCHEDULE: DaySchedule = {
  am: { startTime: null, endTime: null, isOpen: false },
  pm: { startTime: null, endTime: null, isOpen: false }
};

export const CLOSED_SCHEDULE: Schedule = {
  Mo: CLOSED_DAY_SCHEDULE,
  Tu: CLOSED_DAY_SCHEDULE,
  We: CLOSED_DAY_SCHEDULE,
  Th: CLOSED_DAY_SCHEDULE,
  Fr: CLOSED_DAY_SCHEDULE,
  Sa: CLOSED_DAY_SCHEDULE,
  Su: CLOSED_DAY_SCHEDULE
};

export type Schedule = Record<OsmDaysOfWeek, DaySchedule>;

/* eslint-disable-next-line @typescript-eslint/typedef */
export const OSM_DAYS_OF_WEEK = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'] as const;
