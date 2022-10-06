import { useAppSelector } from '../App/hooks';
import { RootState } from '../App/store';

const companiesSelectorFunc = (state: RootState) => state.companies;
const employeesSelectorFunc = (state: RootState) => state.employees;

export const useCompanies = () => useAppSelector(companiesSelectorFunc);
export const useEmployees = () => useAppSelector(employeesSelectorFunc);
