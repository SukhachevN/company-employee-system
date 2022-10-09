import { memo, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../App/hooks';
import { ICompany, IEmployee } from '../../utils/interfaces';
import {
  formState,
  useCurrentCompany,
  useCurrentEmployee,
  useEditForm,
} from '../../utils/selectors';
import { resetCompanyError } from '../Companies/slice';
import { resetEmployeeError } from '../Employees/slice';
import { Input } from '../Input';
import { Spinner } from '../Spinner';
import { config } from './configs';
import { CreateCompanyButton } from './CreateCompanyButton';
import { onSubmit } from './utils';

import styles from './styles.module.scss';

const EditForm = memo(() => {
  const dispatch = useAppDispatch();

  const { entityType } = useEditForm();

  const { error, isLoading } = useAppSelector(formState);

  const [inputsErrors, setInputsErrors] = useState<Record<string, boolean>>({});

  const company = useCurrentCompany();
  const employee = useCurrentEmployee();

  const currentEntity = entityType === 'company' ? company : employee;

  useEffect(() => {
    setInputsErrors({});
  }, [entityType]);

  useEffect(() => {
    dispatch(resetCompanyError());
    dispatch(resetEmployeeError());
  }, [currentEntity]);

  if (!entityType)
    return (
      <form className={styles.form}>
        <CreateCompanyButton />
        Выберите компанию или сотрудника, либо создайте новые
      </form>
    );

  if (isLoading)
    return (
      <form className={styles.form}>
        <Spinner />
      </form>
    );

  if (error)
    return (
      <form className={`${styles.form} error`}>
        <CreateCompanyButton />
        {error}
      </form>
    );

  const inputs = Object.entries(config[entityType]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) =>
    onSubmit({
      e,
      inputs,
      setInputsErrors,
      currentEntity,
      entityType,
      dispatch,
    });

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div className={styles.form__inputs}>
        {inputs.map(([key, fieldName]) => (
          <Input
            haveError={inputsErrors[key]}
            name={key}
            key={key}
            fieldName={fieldName}
            defaultValue={
              (entityType === 'company'
                ? (currentEntity as ICompany)?.[key as keyof ICompany]
                : (currentEntity as IEmployee)?.[key as keyof IEmployee]) || ''
            }
          />
        ))}
      </div>
      <div className={styles.form__buttons}>
        <CreateCompanyButton />
        <button className={styles.form__button} type='submit'>
          Сохранить
        </button>
      </div>
    </form>
  );
});

export { EditForm };
