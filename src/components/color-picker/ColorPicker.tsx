import { ChangeEvent } from 'react';

import { SERVICE, SERVICE_LABEL_MAP } from '../../constants';
import styles from './ColorPicker.module.css';
import { useColorByService } from '../../atoms/colorPickerFormAtom';

interface ColorPickerProps {
  target: SERVICE;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ target }) => {
  const [value, setValue] = useColorByService(target);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>{SERVICE_LABEL_MAP[target]}</label>
      <input
        className={styles.input}
        type="color"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default ColorPicker;
