import { IDefaultState } from './interfaces';

export const baseUrl = 'http://localhost:4000';
export const companiesRoute = '/companies';
export const employeesRoute = '/employees';

export const getDefaultEmptyState = <T>(): Omit<
  IDefaultState<T>,
  'currentEntity'
> => ({
  entities: [],
  isLoading: false,
  page: 1,
  selected: {},
  endOfData: false,
  entitiesError: null,
  isEntityUpdating: false,
  currentEntityError: null,
});
