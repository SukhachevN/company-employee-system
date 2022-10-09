import { memo } from 'react';
import { useAppDispatch } from '../../App/hooks';
import { setNewCompany } from '../Companies/slice';
import { setFormType } from './slice';

import styles from './styles.module.scss';

const CreateCompanyButton = memo(() => {
  const dispatch = useAppDispatch();

  const createCompany = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    dispatch(setFormType('company'));
    dispatch(setNewCompany());
  };

  return (
    <button className={styles.form__button} onClick={createCompany}>
      Создать компанию
    </button>
  );
});

export { CreateCompanyButton };
