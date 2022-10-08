import { memo, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../App/hooks';
import {
  ICompany,
  IEmployee,
  NotCreatedCompany,
  NotCreatedEmployee,
} from '../../utils/interfaces';
import {
  formState,
  useCurrentCompany,
  useCurrentEmployee,
  useEditForm,
} from '../../utils/selectors';
import { postCompany, setNewCompany, updateCompany } from '../Companies/slice';
import { postEmployee, updateEmployee } from '../Employees/slice';
import { Input } from '../Input';
import { Spinner } from '../Spinner';
import { config } from './configs';
import { setFormType } from './slice';

import styles from './styles.module.scss';

const EditForm = memo(() => {
  const dispatch = useAppDispatch();

  const { entityType } = useEditForm();

  const { error, isLoading } = useAppSelector(formState);

  const [inputsErrors, setInputsErrors] = useState<Record<string, boolean>>({});

  const company = useCurrentCompany();
  const employee = useCurrentEmployee();

  const currentEntity = entityType === 'company' ? company : employee;

  const createCompany = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    dispatch(setFormType('company'));
    dispatch(setNewCompany());
  };

  useEffect(() => {
    setInputsErrors({});
  }, [entityType]);

  if (!entityType)
    return (
      <form className={styles.form}>
        <button onClick={createCompany}>Создать компанию</button>
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
      <form className={`${styles.form} ${styles.form_error}`}>
        <button onClick={createCompany}>Создать компанию</button>
        {error}
      </form>
    );

  const inputs = Object.entries(config[entityType]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    const errorObj: Record<string, boolean> = {};

    const dataObj = inputs.reduce((acc: Record<string, string>, curr) => {
      const value = data.get(curr[0]);
      acc[curr[0]] = value as string;
      if (!value) errorObj[curr[0]] = true;
      return acc;
    }, {});

    setInputsErrors(errorObj);
    if (Object.keys(errorObj).length) return;
    const isNew = Object.keys(currentEntity).length === 1;
    const entityWithAllProps = { ...currentEntity, ...dataObj };

    if (entityType === 'company') {
      isNew
        ? dispatch(postCompany(entityWithAllProps as NotCreatedCompany))
        : dispatch(updateCompany(entityWithAllProps as ICompany));
    } else {
      isNew
        ? dispatch(postEmployee(entityWithAllProps as NotCreatedEmployee))
        : dispatch(updateEmployee(entityWithAllProps as IEmployee));
    }
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.form__inputs}>
        {inputs.map(([key, fieldName]) => {
          return (
            <Input
              haveError={inputsErrors[key]}
              name={key}
              key={key}
              fieldName={fieldName}
              defaultValue={
                (entityType === 'company'
                  ? (currentEntity as ICompany)?.[key as keyof ICompany]
                  : (currentEntity as IEmployee)?.[key as keyof IEmployee]) ||
                ''
              }
            />
          );
        })}
      </div>
      <div className={styles.form__buttons}>
        <button onClick={createCompany}>Создать компанию</button>
        <button type='submit'>Сохранить</button>
      </div>
    </form>
  );
});

export { EditForm };
