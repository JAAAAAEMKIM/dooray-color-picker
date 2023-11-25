import styles from './Switch.module.css';

const Switch: React.FC = () => {
  return (
    <label className={styles.switch}>
      <input className={styles.input} type="checkbox" />
      <span className={styles.slider}></span>
    </label>
  );
};

export default Switch;
