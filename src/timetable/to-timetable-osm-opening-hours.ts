/* eslint-disable-next-line camelcase */
import opening_hours from 'opening_hours';
import { OSM_DAYS_OF_WEEK, OsmDaysOfWeek, OsmOpeningHours, Time, WeekDay } from '../utilities';

type OsmInterval = [Date, Date, boolean, string | undefined];

const MINUTE_TO_MILLISECONDS: number = 60 * 1000;
const HOUR_TO_MILLISECONDS: number = 60 * MINUTE_TO_MILLISECONDS;
const DAY_TO_MILLISECONDS: number = 24 * HOUR_TO_MILLISECONDS;

export const dayOfTheWeek = (date: Date, weekDay: WeekDay): Date =>
  /* eslint-disable-next-line no-mixed-operators */
  new Date(date.getTime() + (weekDay + 1 - date.getDay()) * DAY_TO_MILLISECONDS);

const timeToMilliseconds = (time: Time): number => {
  const [hours, minutes]: number[] = time.split(':').map(Number);
  /* eslint-disable-next-line no-mixed-operators */
  return (hours ?? 0) * HOUR_TO_MILLISECONDS + (minutes ?? 0) * MINUTE_TO_MILLISECONDS;
};

const firstTimeOfTheDay = (date: Date): Date => {
  const dateWithoutTime: Date = new Date(date);
  dateWithoutTime.setHours(0, 0, 0, 0);
  return dateWithoutTime;
};

const lastTimeOfTheDay = (date: Date): Date => {
  const dateWithoutTime: Date = new Date(date);
  dateWithoutTime.setHours(23, 59, 59, 999);
  return dateWithoutTime;
};

export const dateTimeFor =
  (date: Date) =>
  (weekDay: WeekDay, time: Time): Date =>
    new Date(dayOfTheWeek(firstTimeOfTheDay(date), weekDay).getTime() + timeToMilliseconds(time));

const formatTime = (intervalStart?: Date): string | undefined =>
  intervalStart?.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit'
  });

const appendOsmOpeningHours = (day: OsmDaysOfWeek, [intervalStart, intervalEnd]: OsmInterval): OsmOpeningHours => ({
  day,
  osmHours: `${formatTime(intervalStart)}-${formatTime(intervalEnd)}`
});
const matchingDay =
  (day: OsmDaysOfWeek) =>
  (openingHours: OsmOpeningHours): boolean =>
    openingHours.day === day;

const toUpdatedOsmOpeningHours =
  (day: OsmDaysOfWeek, [intervalStart, intervalEnd]: OsmInterval) =>
  (openingHours: OsmOpeningHours): OsmOpeningHours =>
    openingHours.day === day
      ? {
          ...openingHours,
          osmHours: `${openingHours.osmHours},${formatTime(intervalStart)}-${formatTime(intervalEnd)}`
        }
      : openingHours;

const appendTimeTableInterval = (
  timeTableOpeningHours: OsmOpeningHours[],
  osmInterval: OsmInterval,
  day: OsmDaysOfWeek
): OsmOpeningHours[] =>
  timeTableOpeningHours.find(matchingDay(day)) == null
    ? [...timeTableOpeningHours, appendOsmOpeningHours(day, osmInterval)]
    : timeTableOpeningHours.map(toUpdatedOsmOpeningHours(day, osmInterval));

export const firstDayOfTheWeek = (date: Date): Date => dayOfTheWeek(date, WeekDay.Monday);

export const lastDayOfTheWeek = (date: Date): Date => dayOfTheWeek(date, WeekDay.Sunday);

const dayOfWeek = ([intervalStart]: OsmInterval): OsmDaysOfWeek => OSM_DAYS_OF_WEEK[intervalStart.getDay() - 1] ?? 'Su';

export const toTimetableOsmOpeningHours =
  (date: Date) =>
  (horairesOSM?: string): OsmOpeningHours[] =>
    horairesOSM == null
      ? []
      : new opening_hours(horairesOSM, null)
          .getOpenIntervals(firstTimeOfTheDay(firstDayOfTheWeek(date)), lastTimeOfTheDay(lastDayOfTheWeek(date)))
          .reduce(
            (timeTableOpeningHours: OsmOpeningHours[], osmInterval: OsmInterval): OsmOpeningHours[] =>
              appendTimeTableInterval(timeTableOpeningHours, osmInterval, dayOfWeek(osmInterval)),
            []
          );
