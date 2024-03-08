import styles from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={styles['loading-container']}>
      <div className={styles['loading-spinner']}></div>
      <div className={styles['loading-text']}>Loading...</div>
    </div>
  );
};

export default Loader;
