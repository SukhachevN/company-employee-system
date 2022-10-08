import { createSelector } from '@reduxjs/toolkit';
import { useAppSelector } from '../App/hooks';
import { RootState } from '../App/store';

const companiesSelectorFunc = (state: RootState) => state.companies;
const employeesSelectorFunc = (state: RootState) => state.employees;

export const useCompanies = () => useAppSelector(companiesSelectorFunc);
export const useEmployees = () => useAppSelector(employeesSelectorFunc);

export const haveSelected = createSelector(
  companiesSelectorFunc,
  ({ selected }) => Boolean(Object.keys(selected).length)
);

export const queryForEmployees = createSelector(
  companiesSelectorFunc,
  ({ selected }) => `&companyId=${Object.keys(selected).join('&companyId=')}`
);
