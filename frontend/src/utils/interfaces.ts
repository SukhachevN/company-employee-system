import { AsyncThunk } from '@reduxjs/toolkit';
import React from 'react';

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
  isUpdating: boolean;
  entities: T[];
  page: number;
  endOfData: boolean;
  selected: Record<string, boolean>;
  entitiesError: string | null;
  currentEntityError: string | null;
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

export interface IExtraReducers<T extends { id: string }> {
  get?: AsyncThunk<GetPayload<T>, void, {}>;
  post?: AsyncThunk<T, Omit<T, 'id'>, {}>;
  put?: AsyncThunk<T, T, {}>;
  remove?: AsyncThunk<string[], string[], {}>;
}

export type NotCreatedCompany = Omit<ICompany, 'id'>;

export type NotCreatedEmployee = Omit<IEmployee, 'id'>;

export interface ITableConfigValue {
  fieldName: string;
  styles: React.CSSProperties;
}
