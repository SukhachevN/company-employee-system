import { FaSpinner } from 'react-icons/fa';

import styles from './styles.module.scss';

const Spinner = () => (
  <div className={styles.spinner}>
    <FaSpinner size='5rem' />
  </div>
);

export { Spinner };
