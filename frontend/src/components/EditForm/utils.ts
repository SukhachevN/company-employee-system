import { AppDispatch } from '../../App/store';
import {
  CompanyEntity,
  EmployeeEntity,
  ICompany,
  IEmployee,
  NotCreatedCompany,
  NotCreatedEmployee,
} from '../../utils/interfaces';
import { deepEquals } from '../../utils/utils';
import { postCompany, updateCompany } from '../Companies/slice';
import { postEmployee, updateEmployee } from '../Employees/slice';
import { formTypes } from './slice';

interface SumbmitProps {
  e: React.FormEvent<HTMLFormElement>;
  inputs: [string, string][];
  setInputsErrors: (
    value: React.SetStateAction<Record<string, boolean>>
  ) => void;
  currentEntity: CompanyEntity | EmployeeEntity;
  entityType: formTypes;
  dispatch: AppDispatch;
}

export const onSubmit = ({
  e,
  inputs,
  setInputsErrors,
  currentEntity,
  entityType,
  dispatch,
}: SumbmitProps) => {
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

  if (deepEquals(entityWithAllProps, currentEntity)) return;

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
