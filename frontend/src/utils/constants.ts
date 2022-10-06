import { IDefaultState } from './interfaces';

export const baseUrl = 'http://localhost:4000';
export const companiesRoute = '/companies';
export const employeesRoute = '/employees';

export const getDefaultEmptyState = <T>(): IDefaultState<T> => ({
  entities: [],
  currentEntity: null,
  isLoading: true,
  page: 1,
  selected: {},
  endOfData: false,
  error: null,
});
