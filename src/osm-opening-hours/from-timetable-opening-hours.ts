import { DaySchedule, OsmDaysOfWeek, OsmOpeningHours, Schedule } from '../utilities';
import { fromTimetableOsmOpeningHours } from './from-timetable-osm-opening-hours';

const isOpenOn = (daySchedule: DaySchedule): boolean => daySchedule.am.isOpen || daySchedule.pm.isOpen;

const toOsmHours = (daySchedule: DaySchedule): string =>
  [
    ...(daySchedule.am.isOpen ? [[daySchedule.am.startTime, daySchedule.am.endTime].join('-')] : []),
    ...(daySchedule.pm.isOpen ? [[daySchedule.pm.startTime, daySchedule.pm.endTime].join('-')] : [])
  ].join(',');

const toOsmOpeningHours = (osmOpeningHours: OsmOpeningHours[], [day, daySchedule]: [string, DaySchedule]): OsmOpeningHours[] =>
  isOpenOn(daySchedule)
    ? [...osmOpeningHours, { day: day as OsmDaysOfWeek, osmHours: toOsmHours(daySchedule) }]
    : osmOpeningHours;

export const fromTimetableOpeningHours = (schedule: Schedule): string =>
  fromTimetableOsmOpeningHours(Object.entries(schedule).reduce(toOsmOpeningHours, []));
