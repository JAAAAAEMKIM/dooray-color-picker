import Switch from '../switch/Switch';
import styles from './DarkModeSetting.module.css';

const DarkModeSetting: React.FC = () => {
  return (
    <div>
      <h1>다크모드</h1>
      <div className={styles.darkmode}>
        <label className={styles.label}>On / Off</label>
        <Switch />
      </div>
    </div>
  );
};

export default DarkModeSetting;
