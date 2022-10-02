/* eslint-disable-next-line @typescript-eslint/sort-type-union-intersection-members */
type OsmDaysOfWeek = 'Mo' | 'Tu' | 'We' | 'Th' | 'Fr' | 'Sa' | 'Su';

export type OsmOpeningHours = {
  day: OsmDaysOfWeek;
  osmHours: string;
};

export type OsmWeekOpeningHours = {
  days: OsmDaysOfWeek[];
  osmHours: string;
};

const OSM_DAYS_OF_WEEK: OsmDaysOfWeek[] = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

const daysBetween = (startDayIndex: number, endDayIndex: number): OsmDaysOfWeek[] =>
  OSM_DAYS_OF_WEEK.filter((_: OsmDaysOfWeek, index: number): boolean => index > startDayIndex && index < endDayIndex);

const ofDay =
  (previousLastDay?: OsmDaysOfWeek) =>
  (day: OsmDaysOfWeek): boolean =>
    day === previousLastDay;

const openingHoursDaysOffIfAny = (newDaysOff: OsmDaysOfWeek[]): OsmWeekOpeningHours[] =>
  newDaysOff.length > 0
    ? [
        {
          days: newDaysOff,
          osmHours: 'off'
        }
      ]
    : [];

const workingDays =
  (currentOpeningHour: OsmWeekOpeningHours) =>
  (day: OsmDaysOfWeek): boolean =>
    !currentOpeningHour.days.includes(day);

const daysOffToAdd = (currentOpeningHours: OsmWeekOpeningHours): OsmDaysOfWeek[] =>
  daysBetween(
    OSM_DAYS_OF_WEEK.findIndex(ofDay(currentOpeningHours.days[0])),
    OSM_DAYS_OF_WEEK.findIndex(ofDay(currentOpeningHours.days.slice(-1)[0]))
  ).filter(workingDays(currentOpeningHours));

const isDaysRange = (days: OsmDaysOfWeek[]): boolean => days.length > 2;

const getDaysOff = (
  currentOpeningHour: OsmWeekOpeningHours,
  previousOpeningHoursDaysOff?: OsmWeekOpeningHours
): OsmWeekOpeningHours[] => {
  if (isDaysRange(currentOpeningHour.days)) {
    return openingHoursDaysOffIfAny([
      ...(previousOpeningHoursDaysOff?.days.filter(workingDays(currentOpeningHour)) ?? []),
      ...daysOffToAdd(currentOpeningHour)
    ]);
  }
  if (previousOpeningHoursDaysOff != null) {
    return openingHoursDaysOffIfAny(previousOpeningHoursDaysOff.days.filter(workingDays(currentOpeningHour)));
  }

  return [];
};

const withoutDaysOff = (group: OsmWeekOpeningHours): boolean => group.osmHours !== 'off';

const withDaysOff = (group: OsmWeekOpeningHours): boolean => group.osmHours === 'off';

const appendOffHours = (
  openingHoursGroupDaysByHours: OsmWeekOpeningHours[],
  currentOpeningHours: OsmWeekOpeningHours
): OsmWeekOpeningHours[] => [
  ...openingHoursGroupDaysByHours.filter(withoutDaysOff),
  currentOpeningHours,
  ...getDaysOff(currentOpeningHours, openingHoursGroupDaysByHours.find(withDaysOff))
];

const appendToExistingOpeningHoursGroup = (
  existingOpeningHoursGroup: OsmWeekOpeningHours,
  currentOpeningHours: OsmOpeningHours
): OsmWeekOpeningHours[] => [
  {
    days: [...existingOpeningHoursGroup.days, currentOpeningHours.day],
    osmHours: currentOpeningHours.osmHours
  }
];

const newOpeningHoursGroup = (currentOpeningHours: OsmOpeningHours): OsmWeekOpeningHours[] => [
  {
    days: [currentOpeningHours.day],
    osmHours: currentOpeningHours.osmHours
  }
];

const updateOpeningHoursGroupDaysByHours = (
  currentOpeningHours: OsmOpeningHours,
  existingOpeningHoursGroup?: OsmWeekOpeningHours
): OsmWeekOpeningHours[] =>
  existingOpeningHoursGroup == null
    ? newOpeningHoursGroup(currentOpeningHours)
    : appendToExistingOpeningHoursGroup(existingOpeningHoursGroup, currentOpeningHours);

const updatingOpeningHoursGroups =
  (currentOpeningHour: OsmOpeningHours) =>
  (openingHours: OsmWeekOpeningHours): boolean =>
    openingHours.osmHours !== currentOpeningHour.osmHours && !openingHours.osmHours.includes('off');

const existingOpeningHoursGroupFor =
  (currentOpeningHours: OsmOpeningHours) =>
  (openingHours: OsmWeekOpeningHours): boolean =>
    openingHours.osmHours === currentOpeningHours.osmHours;

const formatDays = (days: OsmDaysOfWeek[]): string =>
  isDaysRange(days) ? [days[0], days[days.length - 1]].join('-') : days.join(',');

const toOSMOpeningHoursStrings = (osmOpeningHours: string[], openingHours: OsmWeekOpeningHours): string[] => [
  ...osmOpeningHours,
  `${formatDays(openingHours.days)} ${openingHours.osmHours}`
];

const byDayOfWeek = (osmOpeningHours1: OsmWeekOpeningHours, osmOpeningHours2: OsmWeekOpeningHours): number =>
  OSM_DAYS_OF_WEEK.findIndex(ofDay(osmOpeningHours1.days[0])) - OSM_DAYS_OF_WEEK.findIndex(ofDay(osmOpeningHours2.days[0]));

const byRange = (osmOpeningHours1: OsmWeekOpeningHours, osmOpeningHours2: OsmWeekOpeningHours): number =>
  osmOpeningHours2.days.length - osmOpeningHours1.days.length;

const groupOpeningHoursDaysByHours = (
  openingHoursGroupDaysByHours: OsmWeekOpeningHours[],
  currentOpeningHours: OsmOpeningHours
): OsmWeekOpeningHours[] => [
  ...openingHoursGroupDaysByHours.filter(updatingOpeningHoursGroups(currentOpeningHours)),
  ...updateOpeningHoursGroupDaysByHours(
    currentOpeningHours,
    openingHoursGroupDaysByHours.find(existingOpeningHoursGroupFor(currentOpeningHours))
  )
];

export const toOsmOpeningHours = (horaires: OsmOpeningHours[]): string =>
  horaires
    .reduce(groupOpeningHoursDaysByHours, [])
    .sort(byDayOfWeek)
    .sort(byRange)
    .reduce(appendOffHours, [])
    .reduce(toOSMOpeningHoursStrings, [])
    .join('; ')
    .replace('Mo-Su ', '');
