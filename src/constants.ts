export const SERVICE = {
  MAIL: 'MAIL',
  TASK: 'TASK',
  CALENDAR: 'CALENDAR',
  DRIVE: 'DRIVE',
  WIKI: 'WIKI',
  CONTACTS: 'CONTACTS',
  HOME: 'HOME',
} as const;

export type SERVICE = (typeof SERVICE)[keyof typeof SERVICE];

export const SERVICE_LABEL_MAP = {
  [SERVICE.MAIL]: '메일',
  [SERVICE.TASK]: '업무',
  [SERVICE.HOME]: '홈',
  [SERVICE.CALENDAR]: '캘린더',
  [SERVICE.WIKI]: '위키',
  [SERVICE.DRIVE]: '드라이브',
  [SERVICE.CONTACTS]: '주소록',
} as const;

export const THEME_COLOR_HSL = {
  [SERVICE.TASK]: {
    h: 218,
    s: 96,
    l: 35,
  },
  [SERVICE.MAIL]: {
    h: 158,
    s: 100,
    l: 26,
  },
  [SERVICE.CALENDAR]: {
    h: 355,
    s: 61,
    l: 50,
  },
  [SERVICE.DRIVE]: {
    h: 194,
    s: 100,
    l: 41,
  },
  [SERVICE.WIKI]: {
    h: 22,
    s: 34,
    l: 37,
  },
  [SERVICE.CONTACTS]: {
    h: 336,
    s: 62,
    l: 49,
  },
  // 홈 색상 체크 필요
  [SERVICE.HOME]: {
    h: 190,
    s: 100,
    l: 26,
  },
} as const;
