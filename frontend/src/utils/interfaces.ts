import { AsyncThunk } from '@reduxjs/toolkit';

export interface ICompany {
  id: string;
  title: string;
  employees: number;
  address: string;
}

export interface IEmployee {
  id: string;
  firstName: string;
  lastName: string;
  position: string;
  companyId: string;
}

export interface IDefaultState<T> {
  currentEntity: (T & { isUpdating?: boolean }) | null;
  isLoading: boolean;
  entities: T[];
  page: number;
  endOfData: boolean;
  selected: Record<string, boolean>;
  error: string | null;
}

export interface fetchParams {
  link: string;
  options?: {
    method?: 'GET' | 'POST' | 'DELETE' | 'PUT';
    body?: string;
  };
}

export interface GetPayload<T> {
  endOfData: boolean;
  results: T[];
}

export interface IExtraReducers<T> {
  get?: AsyncThunk<GetPayload<T>, void, {}>;
  post?: AsyncThunk<any, any, {}>;
  put?: AsyncThunk<any, any, {}>;
  remove?: AsyncThunk<any, any, {}>;
}
