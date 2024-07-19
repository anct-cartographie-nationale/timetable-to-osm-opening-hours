import opening_hours from 'opening_hours';
import {OSM_DAYS_OF_WEEK, OsmDaysOfWeek, Time, WeekDay} from '../utilities';

export type HorairesPresentation = {
  [day in OsmDaysOfWeek]: string[];
};

const MINUTE_TO_MILLISECONDS: number = 60 * 1000;
const HOUR_TO_MILLISECONDS: number = 60 * MINUTE_TO_MILLISECONDS;
const DAY_TO_MILLISECONDS: number = 24 * HOUR_TO_MILLISECONDS;

export const dayOfTheWeek = (date: Date, weekDay: WeekDay): Date =>
  new Date(date.getTime() + (weekDay + 1 - date.getDay()) * DAY_TO_MILLISECONDS);

const timeToMilliseconds = (time: Time): number => {
  const [hours, minutes]: number[] = time.split(':').map(Number);
  return (hours ?? 0) * HOUR_TO_MILLISECONDS + (minutes ?? 0) * MINUTE_TO_MILLISECONDS;
};

const firstTimeOfTheDay = (date: Date): Date => {
  const dateWithoutTime = new Date(date);
  dateWithoutTime.setHours(0, 0, 0, 0);
  return dateWithoutTime;
};

const lastTimeOfTheDay = (date: Date): Date => {
  const dateWithoutTime = new Date(date);
  dateWithoutTime.setHours(23, 59, 59, 999);
  return dateWithoutTime;
};

export const dateTimeFor =
  (date: Date) =>
  (weekDay: WeekDay, time: Time): Date =>
    new Date(dayOfTheWeek(firstTimeOfTheDay(date), weekDay).getTime() + timeToMilliseconds(time));

const formatTime = (intervalStart?: Date) =>
  intervalStart &&
  intervalStart.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit'
  });

const appendTimeTableInterval = (
  timeTableOpeningHours: HorairesPresentation,
  intervalStart: Date,
  intervalEnd: Date,
  day: OsmDaysOfWeek
) => {
  const hours = {
    startTime: formatTime(intervalStart),
    endTime: formatTime(intervalEnd)
  };

  return {
    ...timeTableOpeningHours,
    [day]: [...(timeTableOpeningHours[day] ?? []), hours]
  };
};

export const firstDayOfTheWeek = (date: Date): Date => dayOfTheWeek(date, WeekDay.Monday);

export const lastDayOfTheWeek = (date: Date): Date => dayOfTheWeek(date, WeekDay.Sunday);

const initialTimeTableOpeningHours: HorairesPresentation = {
  Mo: [],
  Tu: [],
  We: [],
  Th: [],
  Fr: [],
  Sa: [],
  Su: []
};

export const parseHoraires =
  (date: Date) =>
  (horairesOSM?: string): HorairesPresentation | undefined =>
    horairesOSM
      ? new opening_hours(horairesOSM, null)
          .getOpenIntervals(firstTimeOfTheDay(firstDayOfTheWeek(date)), lastTimeOfTheDay(lastDayOfTheWeek(date)))
          .reduce(
            (
              timeTableOpeningHours: HorairesPresentation,
              [intervalStart, intervalEnd]: [Date, Date, boolean, string | undefined]
            ): HorairesPresentation =>
              appendTimeTableInterval(
                timeTableOpeningHours,
                intervalStart,
                intervalEnd,
                OSM_DAYS_OF_WEEK[intervalStart.getDay() - 1] ?? 'Su'
              ),
            initialTimeTableOpeningHours
          )
      : undefined;
