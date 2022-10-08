import { createSelector } from '@reduxjs/toolkit';
import { useAppSelector } from '../App/hooks';
import { RootState } from '../App/store';

const companiesSelectorFunc = (state: RootState) => state.companies;
const employeesSelectorFunc = (state: RootState) => state.employees;
const editFormSelectorFunc = (state: RootState) => state.editForm;
const companyEntitySelector = (state: RootState) =>
  state.companies.currentEntity;
const employeeEntitySelector = (state: RootState) =>
  state.employees.currentEntity;
const globalStateSelector = (state: RootState) => state;

export const useCompanies = () => useAppSelector(companiesSelectorFunc);
export const useEmployees = () => useAppSelector(employeesSelectorFunc);
export const useEditForm = () => useAppSelector(editFormSelectorFunc);
export const useCurrentCompany = () => useAppSelector(companyEntitySelector);
export const useCurrentEmployee = () => useAppSelector(employeeEntitySelector);

export const haveSelected = createSelector(
  companiesSelectorFunc,
  ({ selected }) => Boolean(Object.keys(selected).length)
);

export const queryForEmployees = createSelector(
  companiesSelectorFunc,
  ({ selected }) => `&companyId=${Object.keys(selected).join('&companyId=')}`
);

export const formState = createSelector(
  globalStateSelector,
  ({ companies, employees }) => ({
    isLoading: companies.isEntityUpdating || employees.isEntityUpdating,
    error: companies.currentEntityError || employees.currentEntityError,
  })
);
