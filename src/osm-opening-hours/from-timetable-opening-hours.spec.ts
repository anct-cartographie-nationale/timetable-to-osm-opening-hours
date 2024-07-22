/* eslint-disable @typescript-eslint/naming-convention */

import { Schedule } from '../utilities';
import { fromTimetableOpeningHours } from './from-timetable-opening-hours';

describe('osm opening hours', (): void => {
  it("devrait convertir les horaires au format OSM pour une permanence qui n'ouvre aucun jour de la semaine", (): void => {
    const timetableOpeningHours: Schedule = {
      Mo: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: null, endTime: null, isOpen: false }
      },
      Tu: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: null, endTime: null, isOpen: false }
      },
      We: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: null, endTime: null, isOpen: false }
      },
      Th: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: null, endTime: null, isOpen: false }
      },
      Fr: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: null, endTime: null, isOpen: false }
      },
      Sa: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: null, endTime: null, isOpen: false }
      },
      Su: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: null, endTime: null, isOpen: false }
      }
    };

    const osmOpeningHours: string = fromTimetableOpeningHours(timetableOpeningHours);

    expect(osmOpeningHours).toBe('');
  });

  it('devrait convertir les horaires au format OSM pour une permanence qui ouvre le lundi matin de 10h à 12h', (): void => {
    const timetableOpeningHours: Schedule = {
      Mo: {
        am: { startTime: '10:00', endTime: '12:00', isOpen: true },
        pm: { startTime: null, endTime: null, isOpen: false }
      },
      Tu: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: null, endTime: null, isOpen: false }
      },
      We: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: null, endTime: null, isOpen: false }
      },
      Th: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: null, endTime: null, isOpen: false }
      },
      Fr: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: null, endTime: null, isOpen: false }
      },
      Sa: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: null, endTime: null, isOpen: false }
      },
      Su: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: null, endTime: null, isOpen: false }
      }
    };

    const osmOpeningHours: string = fromTimetableOpeningHours(timetableOpeningHours);

    expect(osmOpeningHours).toBe('Mo 10:00-12:00');
  });

  it('devrait convertir les horaires au format OSM pour une permanence qui ouvre le lundi après-midi de 14h à 18h', (): void => {
    const timetableOpeningHours: Schedule = {
      Mo: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: '14:00', endTime: '18:00', isOpen: true }
      },
      Tu: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: null, endTime: null, isOpen: false }
      },
      We: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: null, endTime: null, isOpen: false }
      },
      Th: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: null, endTime: null, isOpen: false }
      },
      Fr: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: null, endTime: null, isOpen: false }
      },
      Sa: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: null, endTime: null, isOpen: false }
      },
      Su: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: null, endTime: null, isOpen: false }
      }
    };

    const osmOpeningHours: string = fromTimetableOpeningHours(timetableOpeningHours);

    expect(osmOpeningHours).toBe('Mo 14:00-18:00');
  });

  it('devrait convertir les horaires au format OSM pour une permanence qui ouvre le lundi matin de 10h à 12h et le mardi après-midi de 14h à 18h', (): void => {
    const timetableOpeningHours: Schedule = {
      Mo: {
        am: { startTime: '10:00', endTime: '12:00', isOpen: true },
        pm: { startTime: '14:00', endTime: '18:00', isOpen: true }
      },
      Tu: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: null, endTime: null, isOpen: false }
      },
      We: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: null, endTime: null, isOpen: false }
      },
      Th: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: null, endTime: null, isOpen: false }
      },
      Fr: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: null, endTime: null, isOpen: false }
      },
      Sa: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: null, endTime: null, isOpen: false }
      },
      Su: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: null, endTime: null, isOpen: false }
      }
    };

    const osmOpeningHours: string = fromTimetableOpeningHours(timetableOpeningHours);

    expect(osmOpeningHours).toBe('Mo 10:00-12:00,14:00-18:00');
  });

  it('devrait convertir les horaires au format OSM pour une permanence qui ouvre tous les jours à des heures différentes', (): void => {
    const timetableOpeningHours: Schedule = {
      Mo: {
        am: { startTime: '09:30', endTime: '10:45', isOpen: true },
        pm: { startTime: null, endTime: null, isOpen: false }
      },
      Tu: {
        am: { startTime: '11:15', endTime: '12:45', isOpen: true },
        pm: { startTime: null, endTime: null, isOpen: false }
      },
      We: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: '13:30', endTime: '14:25', isOpen: true }
      },
      Th: {
        am: { startTime: '08:00', endTime: '09:25', isOpen: true },
        pm: { startTime: '15:00', endTime: '16:05', isOpen: true }
      },
      Fr: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: '16:20', endTime: '17:15', isOpen: true }
      },
      Sa: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: '18:30', endTime: '19:00', isOpen: true }
      },
      Su: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: '19:50', endTime: '23:55', isOpen: true }
      }
    };

    const osmOpeningHours: string = fromTimetableOpeningHours(timetableOpeningHours);

    // eslint-disable-next-line max-len
    expect(osmOpeningHours).toBe(
      'Mo 09:30-10:45; Tu 11:15-12:45; We 13:30-14:25; Th 08:00-09:25,15:00-16:05; Fr 16:20-17:15; Sa 18:30-19:00; Su 19:50-23:55'
    );
  });

  it('devrait convertir les horaires au format OSM pour une permanence qui ouvre du lundi au vendredi aux mêmes horaires', (): void => {
    const timetableOpeningHours: Schedule = {
      Mo: {
        am: { startTime: '08:00', endTime: '12:00', isOpen: true },
        pm: { startTime: '15:00', endTime: '18:00', isOpen: true }
      },
      Tu: {
        am: { startTime: '08:00', endTime: '12:00', isOpen: true },
        pm: { startTime: '15:00', endTime: '18:00', isOpen: true }
      },
      We: {
        am: { startTime: '08:00', endTime: '12:00', isOpen: true },
        pm: { startTime: '15:00', endTime: '18:00', isOpen: true }
      },
      Th: {
        am: { startTime: '08:00', endTime: '12:00', isOpen: true },
        pm: { startTime: '15:00', endTime: '18:00', isOpen: true }
      },
      Fr: {
        am: { startTime: '08:00', endTime: '12:00', isOpen: true },
        pm: { startTime: '15:00', endTime: '18:00', isOpen: true }
      },
      Sa: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: null, endTime: null, isOpen: false }
      },
      Su: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: null, endTime: null, isOpen: false }
      }
    };

    const osmOpeningHours: string = fromTimetableOpeningHours(timetableOpeningHours);

    expect(osmOpeningHours).toBe('Mo-Fr 08:00-12:00,15:00-18:00');
  });

  it('devrait convertir les horaires au format OSM pour une permanence qui ouvre du lundi au vendredi sauf le mercredi aux mêmes horaires', (): void => {
    const timetableOpeningHours: Schedule = {
      Mo: {
        am: { startTime: '08:00', endTime: '12:00', isOpen: true },
        pm: { startTime: '15:00', endTime: '18:00', isOpen: true }
      },
      Tu: {
        am: { startTime: '08:00', endTime: '12:00', isOpen: true },
        pm: { startTime: '15:00', endTime: '18:00', isOpen: true }
      },
      We: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: null, endTime: null, isOpen: false }
      },
      Th: {
        am: { startTime: '08:00', endTime: '12:00', isOpen: true },
        pm: { startTime: '15:00', endTime: '18:00', isOpen: true }
      },
      Fr: {
        am: { startTime: '08:00', endTime: '12:00', isOpen: true },
        pm: { startTime: '15:00', endTime: '18:00', isOpen: true }
      },
      Sa: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: null, endTime: null, isOpen: false }
      },
      Su: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: null, endTime: null, isOpen: false }
      }
    };

    const osmOpeningHours: string = fromTimetableOpeningHours(timetableOpeningHours);

    expect(osmOpeningHours).toBe('Mo-Fr 08:00-12:00,15:00-18:00; We off');
  });

  it('devrait convertir les horaires au format OSM pour une permanence qui ouvre du lundi au vendredi sauf le mercredi et le jeudi', (): void => {
    const timetableOpeningHours: Schedule = {
      Mo: {
        am: { startTime: '08:00', endTime: '12:00', isOpen: true },
        pm: { startTime: '15:00', endTime: '18:00', isOpen: true }
      },
      Tu: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: null, endTime: null, isOpen: false }
      },
      We: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: null, endTime: null, isOpen: false }
      },
      Th: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: null, endTime: null, isOpen: false }
      },
      Fr: {
        am: { startTime: '08:00', endTime: '12:00', isOpen: true },
        pm: { startTime: '15:00', endTime: '18:00', isOpen: true }
      },
      Sa: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: null, endTime: null, isOpen: false }
      },
      Su: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: null, endTime: null, isOpen: false }
      }
    };

    const osmOpeningHours: string = fromTimetableOpeningHours(timetableOpeningHours);

    expect(osmOpeningHours).toBe('Mo,Fr 08:00-12:00,15:00-18:00');
  });

  it('devrait convertir les horaires au format OSM pour une permanence qui ouvre du lundi au vendredi sauf le mardi et le jeudi', (): void => {
    const timetableOpeningHours: Schedule = {
      Mo: {
        am: { startTime: '08:00', endTime: '12:00', isOpen: true },
        pm: { startTime: '15:00', endTime: '18:00', isOpen: true }
      },
      Tu: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: null, endTime: null, isOpen: false }
      },
      We: {
        am: { startTime: '08:00', endTime: '12:00', isOpen: true },
        pm: { startTime: '15:00', endTime: '18:00', isOpen: true }
      },
      Th: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: null, endTime: null, isOpen: false }
      },
      Fr: {
        am: { startTime: '08:00', endTime: '12:00', isOpen: true },
        pm: { startTime: '15:00', endTime: '18:00', isOpen: true }
      },
      Sa: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: null, endTime: null, isOpen: false }
      },
      Su: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: null, endTime: null, isOpen: false }
      }
    };

    const osmOpeningHours: string = fromTimetableOpeningHours(timetableOpeningHours);

    expect(osmOpeningHours).toBe('Mo-Fr 08:00-12:00,15:00-18:00; Tu,Th off');
  });

  it('devrait convertir les horaires au format OSM pour une permanence qui ouvre du mardi au vendredi sauf le mercredi', (): void => {
    const timetableOpeningHours: Schedule = {
      Mo: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: null, endTime: null, isOpen: false }
      },
      Tu: {
        am: { startTime: '08:00', endTime: '12:00', isOpen: true },
        pm: { startTime: '15:00', endTime: '18:00', isOpen: true }
      },
      We: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: null, endTime: null, isOpen: false }
      },
      Th: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: null, endTime: null, isOpen: false }
      },
      Fr: {
        am: { startTime: '08:00', endTime: '12:00', isOpen: true },
        pm: { startTime: '15:00', endTime: '18:00', isOpen: true }
      },
      Sa: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: null, endTime: null, isOpen: false }
      },
      Su: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: null, endTime: null, isOpen: false }
      }
    };

    const osmOpeningHours: string = fromTimetableOpeningHours(timetableOpeningHours);

    expect(osmOpeningHours).toBe('Tu,Fr 08:00-12:00,15:00-18:00');
  });

  it('devrait convertir les horaires au format OSM pour une permanence qui ouvre tous les jours à la même heure', (): void => {
    const timetableOpeningHours: Schedule = {
      Mo: {
        am: { startTime: '08:00', endTime: '12:00', isOpen: true },
        pm: { startTime: '15:00', endTime: '18:00', isOpen: true }
      },
      Tu: {
        am: { startTime: '08:00', endTime: '12:00', isOpen: true },
        pm: { startTime: '15:00', endTime: '18:00', isOpen: true }
      },
      We: {
        am: { startTime: '08:00', endTime: '12:00', isOpen: true },
        pm: { startTime: '15:00', endTime: '18:00', isOpen: true }
      },
      Th: {
        am: { startTime: '08:00', endTime: '12:00', isOpen: true },
        pm: { startTime: '15:00', endTime: '18:00', isOpen: true }
      },
      Fr: {
        am: { startTime: '08:00', endTime: '12:00', isOpen: true },
        pm: { startTime: '15:00', endTime: '18:00', isOpen: true }
      },
      Sa: {
        am: { startTime: '08:00', endTime: '12:00', isOpen: true },
        pm: { startTime: '15:00', endTime: '18:00', isOpen: true }
      },
      Su: {
        am: { startTime: '08:00', endTime: '12:00', isOpen: true },
        pm: { startTime: '15:00', endTime: '18:00', isOpen: true }
      }
    };

    const osmOpeningHours: string = fromTimetableOpeningHours(timetableOpeningHours);

    expect(osmOpeningHours).toBe('08:00-12:00,15:00-18:00');
  });

  it('devrait convertir les horaires au format OSM pour une permanence qui est fermée du jeudi au samedi', (): void => {
    const timetableOpeningHours: Schedule = {
      Mo: {
        am: { startTime: '08:00', endTime: '12:00', isOpen: true },
        pm: { startTime: '15:00', endTime: '18:00', isOpen: true }
      },
      Tu: {
        am: { startTime: '08:00', endTime: '12:00', isOpen: true },
        pm: { startTime: '15:00', endTime: '18:00', isOpen: true }
      },
      We: {
        am: { startTime: '08:00', endTime: '12:00', isOpen: true },
        pm: { startTime: '15:00', endTime: '18:00', isOpen: true }
      },
      Th: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: null, endTime: null, isOpen: false }
      },
      Fr: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: null, endTime: null, isOpen: false }
      },
      Sa: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: null, endTime: null, isOpen: false }
      },
      Su: {
        am: { startTime: '08:00', endTime: '12:00', isOpen: true },
        pm: { startTime: '15:00', endTime: '18:00', isOpen: true }
      }
    };

    const osmOpeningHours: string = fromTimetableOpeningHours(timetableOpeningHours);

    expect(osmOpeningHours).toBe('08:00-12:00,15:00-18:00; Th-Sa off');
  });

  it('devrait convertir les horaires au format OSM pour une permanence qui est ouverte sur deux périodes', (): void => {
    const timetableOpeningHours: Schedule = {
      Mo: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: null, endTime: null, isOpen: false }
      },
      Tu: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: null, endTime: null, isOpen: false }
      },
      We: {
        am: { startTime: '10:00', endTime: '12:00', isOpen: true },
        pm: { startTime: '14:00', endTime: '18:00', isOpen: true }
      },
      Th: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: '13:30', endTime: '18:00', isOpen: true }
      },
      Fr: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: '13:30', endTime: '18:00', isOpen: true }
      },
      Sa: {
        am: { startTime: '10:00', endTime: '12:00', isOpen: true },
        pm: { startTime: '14:00', endTime: '18:00', isOpen: true }
      },
      Su: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: null, endTime: null, isOpen: false }
      }
    };

    const osmOpeningHours: string = fromTimetableOpeningHours(timetableOpeningHours);

    expect(osmOpeningHours).toBe('We,Sa 10:00-12:00,14:00-18:00; Th,Fr 13:30-18:00');
  });

  it('devrait convertir les horaires au format OSM pour une permanence qui est ouverte en continue certains jours', (): void => {
    const timetableOpeningHours: Schedule = {
      Mo: {
        am: { startTime: '07:30', endTime: '16:30', isOpen: true },
        pm: { startTime: null, endTime: null, isOpen: false }
      },
      Tu: {
        am: { startTime: '07:30', endTime: '14:30', isOpen: true },
        pm: { startTime: null, endTime: null, isOpen: false }
      },
      We: {
        am: { startTime: '07:30', endTime: '14:30', isOpen: true },
        pm: { startTime: null, endTime: null, isOpen: false }
      },
      Th: {
        am: { startTime: '07:30', endTime: '16:30', isOpen: true },
        pm: { startTime: null, endTime: null, isOpen: false }
      },
      Fr: {
        am: { startTime: '07:30', endTime: '12:30', isOpen: true },
        pm: { startTime: null, endTime: null, isOpen: false }
      },
      Sa: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: null, endTime: null, isOpen: false }
      },
      Su: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: null, endTime: null, isOpen: false }
      }
    };

    const osmOpeningHours: string = fromTimetableOpeningHours(timetableOpeningHours);

    expect(osmOpeningHours).toBe('Mo,Th 07:30-16:30; Tu,We 07:30-14:30; Fr 07:30-12:30');
  });

  it("devrait convertir les horaires au format OSM pour une permanence en tenant compte de l'ordre des jours", (): void => {
    const timetableOpeningHours: Schedule = {
      Mo: {
        am: { startTime: '09:00', endTime: '12:00', isOpen: true },
        pm: { startTime: '14:30', endTime: '17:00', isOpen: true }
      },
      Tu: {
        am: { startTime: '09:00', endTime: '12:00', isOpen: true },
        pm: { startTime: '14:30', endTime: '17:30', isOpen: true }
      },
      We: {
        am: { startTime: '09:00', endTime: '12:00', isOpen: true },
        pm: { startTime: '14:00', endTime: '17:00', isOpen: true }
      },
      Th: {
        am: { startTime: '09:00', endTime: '12:00', isOpen: true },
        pm: { startTime: '14:30', endTime: '17:30', isOpen: true }
      },
      Fr: {
        am: { startTime: '09:00', endTime: '12:00', isOpen: true },
        pm: { startTime: '14:30', endTime: '17:30', isOpen: true }
      },
      Sa: {
        am: { startTime: '09:00', endTime: '12:00', isOpen: true },
        pm: { startTime: null, endTime: null, isOpen: false }
      },
      Su: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: null, endTime: null, isOpen: false }
      }
    };

    const osmOpeningHours: string = fromTimetableOpeningHours(timetableOpeningHours);

    expect(osmOpeningHours).toBe(
      'Tu-Fr 09:00-12:00,14:30-17:30; Mo 09:00-12:00,14:30-17:00; We 09:00-12:00,14:00-17:00; Sa 09:00-12:00'
    );
  });

  it('devrait convertir les horaires au format OSM pour une permanence avec une plage horaire des horaires spécifiques et un jour off', (): void => {
    const timetableOpeningHours: Schedule = {
      Mo: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: '16:00', endTime: '18:30', isOpen: true }
      },
      Tu: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: '16:00', endTime: '18:30', isOpen: true }
      },
      We: {
        am: { startTime: '09:30', endTime: '12:00', isOpen: true },
        pm: { startTime: '14:00', endTime: '18:30', isOpen: true }
      },
      Th: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: null, endTime: null, isOpen: false }
      },
      Fr: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: '16:00', endTime: '18:30', isOpen: true }
      },
      Sa: {
        am: { startTime: '09:30', endTime: '12:30', isOpen: true },
        pm: { startTime: '14:00', endTime: '17:30', isOpen: true }
      },
      Su: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: null, endTime: null, isOpen: false }
      }
    };

    const osmOpeningHours: string = fromTimetableOpeningHours(timetableOpeningHours);

    expect(osmOpeningHours).toBe('Mo-Fr 16:00-18:30; We 09:30-12:00,14:00-18:30; Sa 09:30-12:30,14:00-17:30; Th off');
  });

  it('devrait convertir les horaires au format OSM pour une permanence avec 3 jours aux mêmes horaires sans plage horaire', (): void => {
    const timetableOpeningHours: Schedule = {
      Mo: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: '14:00', endTime: '18:00', isOpen: true }
      },
      Tu: {
        am: { startTime: '09:00', endTime: '12:00', isOpen: true },
        pm: { startTime: '14:00', endTime: '18:00', isOpen: true }
      },
      We: {
        am: { startTime: '09:00', endTime: '12:00', isOpen: true },
        pm: { startTime: '14:00', endTime: '18:00', isOpen: true }
      },
      Th: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: '14:00', endTime: '18:00', isOpen: true }
      },
      Fr: {
        am: { startTime: '09:00', endTime: '12:00', isOpen: true },
        pm: { startTime: '14:00', endTime: '18:00', isOpen: true }
      },
      Sa: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: null, endTime: null, isOpen: false }
      },
      Su: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: null, endTime: null, isOpen: false }
      }
    };

    const osmOpeningHours: string = fromTimetableOpeningHours(timetableOpeningHours);

    expect(osmOpeningHours).toBe('Tu-Fr 09:00-12:00,14:00-18:00; Mo,Th 14:00-18:00');
  });

  it('devrait convertir les horaires au format OSM pour une permanence avec deux plages horaires', (): void => {
    const timetableOpeningHours: Schedule = {
      Mo: {
        am: { startTime: '09:00', endTime: '12:00', isOpen: true },
        pm: { startTime: null, endTime: null, isOpen: false }
      },
      Tu: {
        am: { startTime: '09:00', endTime: '12:00', isOpen: true },
        pm: { startTime: null, endTime: null, isOpen: false }
      },
      We: {
        am: { startTime: '09:00', endTime: '12:00', isOpen: true },
        pm: { startTime: '14:00', endTime: '18:00', isOpen: true }
      },
      Th: {
        am: { startTime: '09:00', endTime: '12:00', isOpen: true },
        pm: { startTime: '14:00', endTime: '18:00', isOpen: true }
      },
      Fr: {
        am: { startTime: '09:00', endTime: '12:00', isOpen: true },
        pm: { startTime: '14:00', endTime: '18:00', isOpen: true }
      },
      Sa: {
        am: { startTime: '09:00', endTime: '12:00', isOpen: true },
        pm: { startTime: null, endTime: null, isOpen: false }
      },
      Su: {
        am: { startTime: null, endTime: null, isOpen: false },
        pm: { startTime: null, endTime: null, isOpen: false }
      }
    };

    const osmOpeningHours: string = fromTimetableOpeningHours(timetableOpeningHours);

    expect(osmOpeningHours).toBe('Mo-Sa 09:00-12:00; We-Fr 09:00-12:00,14:00-18:00');
  });
});
