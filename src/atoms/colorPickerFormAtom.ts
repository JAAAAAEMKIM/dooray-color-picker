import { atom, useAtom } from 'jotai';
import { SERVICE, THEME_COLOR_HSL } from '../constants';
import { hslToHex, type HEX } from '../utils/colorUtils';

export type ColorPickerForm = { [service in SERVICE]: HEX };

export const colorPickerFormAtom = atom<ColorPickerForm>({
  [SERVICE.TASK]: hslToHex(THEME_COLOR_HSL[SERVICE.TASK]),
  [SERVICE.MAIL]: hslToHex(THEME_COLOR_HSL[SERVICE.MAIL]),
  [SERVICE.CALENDAR]: hslToHex(THEME_COLOR_HSL[SERVICE.CALENDAR]),
  [SERVICE.DRIVE]: hslToHex(THEME_COLOR_HSL[SERVICE.DRIVE]),
  [SERVICE.HOME]: hslToHex(THEME_COLOR_HSL[SERVICE.HOME]),
  [SERVICE.WIKI]: hslToHex(THEME_COLOR_HSL[SERVICE.WIKI]),
  [SERVICE.CONTACTS]: hslToHex(THEME_COLOR_HSL[SERVICE.CONTACTS]),
});

export const ServiceAtoms = Object.values(SERVICE).map((service) =>
  atom<string, string[], void>(
    (get) => {
      const a = get(colorPickerFormAtom);
      return a[service];
    },
    (get, set, change) => {
      set(colorPickerFormAtom, (a) => {
        return { ...a, [service]: change };
      });
    }
  )
);

export const ServiceAtomMap = Object.fromEntries(
  Object.values(SERVICE).map((service, idx) => [service, ServiceAtoms[idx]])
);

export const useColorPickerFormAtom = () => useAtom(colorPickerFormAtom);

export const useColorByService = (service: SERVICE) =>
  useAtom(ServiceAtomMap[service]);
