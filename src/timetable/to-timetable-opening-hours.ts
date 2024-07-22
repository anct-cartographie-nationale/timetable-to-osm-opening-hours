import { CLOSED_SCHEDULE, DaySchedule, NullableTime, OsmOpeningHours, Schedule, Time, TimeRange } from '../utilities';
import { toTimetableOsmOpeningHours } from './to-timetable-osm-opening-hours';

const isAfternoonTime = (time: NullableTime): boolean => +(time?.split(':').at(0) ?? 0) > 12;

const createTimeSlot = ([[amStart, amEnd], [pmStart, pmEnd]]: [TimeRange, TimeRange]): DaySchedule => ({
  am: { startTime: amStart, endTime: amEnd, isOpen: ![amStart, amEnd].includes(null) },
  pm: { startTime: pmStart, endTime: pmEnd, isOpen: ![pmStart, pmEnd].includes(null) }
});

const toTimeRage = (osmTimeRange?: string): TimeRange =>
  osmTimeRange == null ? [null, null] : (osmTimeRange.split('-') as [Time, Time]);

const timeRangesFrom = (osmHours: string): [TimeRange, TimeRange] =>
  [...osmHours.split(','), undefined].slice(0, 2).map(toTimeRage) as [TimeRange, TimeRange];

const orderedTimeRange = ([[timeStart, timeEnd], [pmStart, pmEnd]]: [TimeRange, TimeRange]): [TimeRange, TimeRange] =>
  pmStart == null && isAfternoonTime(timeStart)
    ? [
        [null, null],
        [timeStart, timeEnd]
      ]
    : [
        [timeStart, timeEnd],
        [pmStart, pmEnd]
      ];

export const toTimetableOpeningHours =
  (date: Date) =>
  (horairesOSM?: string): Schedule =>
    toTimetableOsmOpeningHours(date)(horairesOSM).reduce<Schedule>(
      (schedule: Schedule, { day, osmHours }: OsmOpeningHours): Schedule => ({
        ...schedule,
        [day]: createTimeSlot(orderedTimeRange(timeRangesFrom(osmHours)))
      }),
      CLOSED_SCHEDULE
    );
