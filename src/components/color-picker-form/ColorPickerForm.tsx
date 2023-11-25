import { useCallback, useEffect } from 'react';
import { SERVICE, THEME_COLOR_HSL } from '../../constants';
import {
  getColorMappingByService,
  hslToRgbString,
  rgbStringToHex,
  type RgbString,
} from '../../utils/colorUtils';
import ColorPicker from '../color-picker/ColorPicker';
import { changeColor } from '../../content-scripts/changeColor';
import { runOnCurrentTab } from '../../utils/chromeUtil';
import Button from '../button/Button';
import { useColorPickerFormAtom } from '../../atoms/colorPickerFormAtom';

const ColorPickerForm: React.FC = () => {
  const [form, setForm] = useColorPickerFormAtom();

  const init = useCallback(async () => {
    const colorMap: Record<RgbString, RgbString> =
      await chrome.storage.local.get(null);

    setForm((prev) => ({
      ...Object.values(SERVICE).reduce((acc, service) => {
        const targetColor = hslToRgbString(THEME_COLOR_HSL[service]);
        acc[service] = colorMap[targetColor]
          ? rgbStringToHex(colorMap[targetColor])
          : rgbStringToHex(targetColor);
        return acc;
      }, prev),
    }));
  }, [setForm]);

  const handleApply = async () => {
    const colorMap = {};

    Object.values(SERVICE).forEach((service) => {
      Object.assign(colorMap, getColorMappingByService(service, form[service]));
    });
    runOnCurrentTab({
      func: changeColor,
      args: [colorMap],
    });
    chrome.storage.local.set(colorMap);
  };

  useEffect(() => {
    init();
  }, [init]);

  return (
    <div>
      <h1>테마 색상</h1>
      <div>
        {Object.values(SERVICE).map((service) => (
          <ColorPicker key={service} target={service} />
        ))}
      </div>

      <div>
        <Button onClick={handleApply}>적용</Button>
        <Button>초기화</Button>
      </div>
    </div>
  );
};

export default ColorPickerForm;
