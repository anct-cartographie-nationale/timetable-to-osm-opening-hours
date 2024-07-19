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

export type OsmDaysOfWeek = 'Mo' | 'Tu' | 'We' | 'Th' | 'Fr' | 'Sa' | 'Su';

export type OsmOpeningHours = {
  day: OsmDaysOfWeek;
  osmHours: string;
};

export const OSM_DAYS_OF_WEEK = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'] as const;
