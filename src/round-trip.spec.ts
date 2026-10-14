/* eslint-disable @typescript-eslint/naming-convention */

import { fromTimetableOpeningHours } from './osm-opening-hours/from-timetable-opening-hours';
import { toTimetableOpeningHours } from './timetable/to-timetable-opening-hours';
import { CLOSED_SCHEDULE, DaySchedule, OSM_DAYS_OF_WEEK, OsmDaysOfWeek, Schedule, Time } from './utilities';

const CLOSED: DaySchedule['am'] = { startTime: null, endTime: null, isOpen: false };

const openFrom = (startTime: Time, endTime: Time): DaySchedule['am'] => ({ startTime, endTime, isOpen: true });

const CLOSED_DAY: DaySchedule = { am: CLOSED, pm: CLOSED };
const MORNING: DaySchedule = { am: openFrom('09:00', '12:00'), pm: CLOSED };
const AFTERNOON: DaySchedule = { am: CLOSED, pm: openFrom('14:00', '18:00') };
const FULL_DAY: DaySchedule = { am: openFrom('09:00', '12:00'), pm: openFrom('14:00', '18:00') };
const LATE_MORNING: DaySchedule = { am: openFrom('10:00', '12:00'), pm: CLOSED };

const DAY_SCHEDULES: DaySchedule[] = [CLOSED_DAY, MORNING, AFTERNOON, FULL_DAY, LATE_MORNING];

const scheduleWith = (days: Partial<Schedule>): Schedule => ({ ...CLOSED_SCHEDULE, ...days });

const roundTrip = (schedule: Schedule): Schedule =>
  toTimetableOpeningHours(new Date('2026-10-14'))(fromTimetableOpeningHours(schedule));

const daySchedulesOfPreviousDays = (dayIndex: number): number => DAY_SCHEDULES.length ** dayIndex;

const scheduleNumber = (index: number): Schedule =>
  OSM_DAYS_OF_WEEK.reduce(
    (schedule: Schedule, day: OsmDaysOfWeek, dayIndex: number): Schedule => ({
      ...schedule,
      [day]: DAY_SCHEDULES[Math.floor(index / daySchedulesOfPreviousDays(dayIndex)) % DAY_SCHEDULES.length] ?? CLOSED_DAY
    }),
    CLOSED_SCHEDULE
  );

const ALL_SCHEDULES: Schedule[] = Array.from(
  { length: DAY_SCHEDULES.length ** OSM_DAYS_OF_WEEK.length },
  (_: unknown, index: number): Schedule => scheduleNumber(index)
);

const OSM_RULE_STARTING_WITH_DAYS: RegExp = /^(?:Mo|Tu|We|Th|Fr|Sa|Su)(?:[-,](?:Mo|Tu|We|Th|Fr|Sa|Su))* /u;

describe('aller-retour entre emploi du temps et horaires OSM', (): void => {
  it("devrait garder ouverts le jeudi et le vendredi après-midi d'une permanence qui ferme ces matins-là", (): void => {
    const schedule: Schedule = scheduleWith({
      Mo: AFTERNOON,
      Tu: { am: openFrom('10:00', '18:00'), pm: CLOSED },
      We: { am: openFrom('10:00', '18:00'), pm: CLOSED },
      Th: AFTERNOON,
      Fr: AFTERNOON,
      Sa: { am: openFrom('10:00', '18:00'), pm: CLOSED }
    });

    expect(fromTimetableOpeningHours(schedule)).toBe('Mo,Th,Fr 14:00-18:00; Tu,We,Sa 10:00-18:00');
    expect(roundTrip(schedule)).toStrictEqual(schedule);
  });

  it("devrait ne fermer que les jours fermés d'une plage de jours qui n'est pas continue", (): void => {
    const schedule: Schedule = scheduleWith({ Mo: MORNING, We: MORNING, Sa: MORNING });

    expect(fromTimetableOpeningHours(schedule)).toBe('Mo-Sa 09:00-12:00; Tu,Th,Fr off');
    expect(roundTrip(schedule)).toStrictEqual(schedule);
  });

  it("devrait ne pas enjamber un jour ouvert à d'autres horaires", (): void => {
    const schedule: Schedule = scheduleWith({ Mo: MORNING, Tu: AFTERNOON, We: MORNING, Th: AFTERNOON, Fr: MORNING });

    expect(fromTimetableOpeningHours(schedule)).toBe('Mo,We,Fr 09:00-12:00; Tu,Th 14:00-18:00');
    expect(roundTrip(schedule)).toStrictEqual(schedule);
  });

  it('devrait écrire en segments les jours qui ne se suivent pas', (): void => {
    const schedule: Schedule = scheduleWith({ Mo: MORNING, Tu: MORNING, We: MORNING, Th: AFTERNOON, Fr: MORNING, Sa: MORNING });

    expect(fromTimetableOpeningHours(schedule)).toBe('Mo-We,Fr,Sa 09:00-12:00; Th 14:00-18:00');
    expect(roundTrip(schedule)).toStrictEqual(schedule);
  });

  it('devrait nommer les jours d’une permanence ouverte toute la semaine aux mêmes horaires', (): void => {
    const schedule: Schedule = OSM_DAYS_OF_WEEK.reduce(
      (week: Schedule, day: OsmDaysOfWeek): Schedule => ({ ...week, [day]: MORNING }),
      CLOSED_SCHEDULE
    );

    expect(fromTimetableOpeningHours(schedule)).toBe('Mo-Su 09:00-12:00');
    expect(roundTrip(schedule)).toStrictEqual(schedule);
  });

  it('devrait relire à l’identique chaque emploi du temps', (): void => {
    const altered: Schedule[] = ALL_SCHEDULES.filter(
      (schedule: Schedule): boolean => JSON.stringify(roundTrip(schedule)) !== JSON.stringify(schedule)
    );

    expect(altered).toStrictEqual([]);
  });

  it('devrait faire commencer chaque règle par les jours auxquels elle s’applique', (): void => {
    const rulesWithoutDays: string[] = ALL_SCHEDULES.map(fromTimetableOpeningHours)
      .flatMap((osmOpeningHours: string): string[] => (osmOpeningHours === '' ? [] : osmOpeningHours.split('; ')))
      .filter((rule: string): boolean => !OSM_RULE_STARTING_WITH_DAYS.test(rule));

    expect(rulesWithoutDays).toStrictEqual([]);
  });
});
