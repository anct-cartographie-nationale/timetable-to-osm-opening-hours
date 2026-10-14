/* eslint-disable-next-line @typescript-eslint/sort-type-union-intersection-members */
import { OSM_DAYS_OF_WEEK, OsmDaysOfWeek, OsmOpeningHours } from '../utilities';

export type OsmWeekOpeningHours = {
  days: OsmDaysOfWeek[];
  osmHours: string;
};

const dayIndex = (day: OsmDaysOfWeek): number => OSM_DAYS_OF_WEEK.indexOf(day);

const byDayOfWeek = (day1: OsmDaysOfWeek, day2: OsmDaysOfWeek): number => dayIndex(day1) - dayIndex(day2);

const isDaysRange = (days: OsmDaysOfWeek[]): boolean => days.length > 2;

const firstDay = (days: OsmDaysOfWeek[]): OsmDaysOfWeek => days[0] ?? 'Mo';

const lastDay = (days: OsmDaysOfWeek[]): OsmDaysOfWeek => days[days.length - 1] ?? 'Su';

const withHours =
  (osmHours: string) =>
  (group: OsmWeekOpeningHours): boolean =>
    group.osmHours === osmHours;

const withDay =
  (day: OsmDaysOfWeek, osmHours: string) =>
  (group: OsmWeekOpeningHours): OsmWeekOpeningHours =>
    withHours(osmHours)(group) ? { ...group, days: [...group.days, day].sort(byDayOfWeek) } : group;

const groupDaysByHours = (groups: OsmWeekOpeningHours[], { day, osmHours }: OsmOpeningHours): OsmWeekOpeningHours[] =>
  groups.some(withHours(osmHours)) ? groups.map(withDay(day, osmHours)) : [...groups, { days: [day], osmHours }];

const isClosedOn =
  (openDays: OsmDaysOfWeek[]) =>
  (day: OsmDaysOfWeek): boolean =>
    !openDays.includes(day);

const daysSkippedBy = (days: OsmDaysOfWeek[]): OsmDaysOfWeek[] =>
  OSM_DAYS_OF_WEEK.slice(dayIndex(firstDay(days)), dayIndex(lastDay(days)) + 1).filter(isClosedOn(days));

const spansOnlyClosedDays =
  (openDays: OsmDaysOfWeek[]) =>
  (group: OsmWeekOpeningHours): boolean =>
    isDaysRange(group.days) && daysSkippedBy(group.days).every(isClosedOn(openDays));

const toConsecutiveDays = (runs: OsmDaysOfWeek[][], day: OsmDaysOfWeek): OsmDaysOfWeek[][] => {
  const previousRun: OsmDaysOfWeek[] | undefined = runs[runs.length - 1];
  return previousRun != null && dayIndex(lastDay(previousRun)) + 1 === dayIndex(day)
    ? [...runs.slice(0, -1), [...previousRun, day]]
    : [...runs, [day]];
};

const formatDaysRange = (days: OsmDaysOfWeek[]): string => `${firstDay(days)}-${lastDay(days)}`;

const formatRun = (days: OsmDaysOfWeek[]): string => (isDaysRange(days) ? formatDaysRange(days) : days.join(','));

const formatDays = (days: OsmDaysOfWeek[]): string => days.reduce(toConsecutiveDays, []).map(formatRun).join(',');

const formatGroupDays =
  (openDays: OsmDaysOfWeek[]) =>
  (group: OsmWeekOpeningHours): string =>
    spansOnlyClosedDays(openDays)(group) ? formatDaysRange(group.days) : formatDays(group.days);

const isFirstOccurrence = (day: OsmDaysOfWeek, index: number, days: OsmDaysOfWeek[]): boolean => days.indexOf(day) === index;

const daysOffSkippedBy = (groups: OsmWeekOpeningHours[], openDays: OsmDaysOfWeek[]): OsmDaysOfWeek[] =>
  groups
    .filter(spansOnlyClosedDays(openDays))
    .flatMap((group: OsmWeekOpeningHours): OsmDaysOfWeek[] => daysSkippedBy(group.days))
    .filter(isFirstOccurrence)
    .sort(byDayOfWeek);

const daysOffRule = (daysOff: OsmDaysOfWeek[]): string[] => (daysOff.length > 0 ? [`${formatDays(daysOff)} off`] : []);

const byFirstDayOfWeek = (group1: OsmWeekOpeningHours, group2: OsmWeekOpeningHours): number =>
  byDayOfWeek(firstDay(group1.days), firstDay(group2.days));

const byRange = (group1: OsmWeekOpeningHours, group2: OsmWeekOpeningHours): number => group2.days.length - group1.days.length;

const toOsmRule =
  (openDays: OsmDaysOfWeek[]) =>
  (group: OsmWeekOpeningHours): string =>
    `${formatGroupDays(openDays)(group)} ${group.osmHours}`;

const openDaysOf = (horaires: OsmOpeningHours[]): OsmDaysOfWeek[] =>
  horaires.map(({ day }: OsmOpeningHours): OsmDaysOfWeek => day);

const toOsmRules = (groups: OsmWeekOpeningHours[], openDays: OsmDaysOfWeek[]): string[] => [
  ...groups.map(toOsmRule(openDays)),
  ...daysOffRule(daysOffSkippedBy(groups, openDays))
];

export const fromTimetableOsmOpeningHours = (horaires: OsmOpeningHours[]): string =>
  toOsmRules(horaires.reduce(groupDaysByHours, []).sort(byFirstDayOfWeek).sort(byRange), openDaysOf(horaires)).join('; ');
