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
  currentEntity: T | null;
  isLoading: boolean;
  entities: T[];
  page: number;
  endOfData: boolean;
  selected: Record<string, boolean>;
}

export interface fetchParams {
  link: string;
  options?: {
    method?: 'GET' | 'POST' | 'DELETE' | 'PUT';
    body?: string;
  };
}

export interface IExtraReducers {
  get?: AsyncThunk<any, any, {}>;
  post?: AsyncThunk<any, any, {}>;
  put?: AsyncThunk<any, any, {}>;
  delete?: AsyncThunk<any, any, {}>;
}
