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

export type CompanyEntity = ICompany | { employees: number };
export type EmployeeEntity = IEmployee | { companyId: string };

export interface IDefaultState<T> {
  currentEntity: T extends ICompany ? CompanyEntity : EmployeeEntity;
  isLoading: boolean;
  entities: T[];
  page: number;
  endOfData: boolean;
  selected: Record<string, boolean>;
  entitiesError: string | null;
  lastSearch?: string | undefined;
  isEntityUpdating: boolean;
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
  get?: AsyncThunk<GetPayload<T>, string | undefined, {}>;
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

export interface ISetSelectedPayload {
  id: string;
  setAllTo?: boolean;
}

export type ButtonTypes = 'EDIT' | 'REMOVE' | 'ADD_EMPLOYEE';

export type ClickHandler = (id: string) => void;
export type ClickHandlerForMultiple = (ids: string[]) => void;

export type ButtonHandlers = Partial<{
  EDIT: ClickHandler;
  REMOVE: ClickHandlerForMultiple;
  ADD_EMPLOYEE: ClickHandler;
}>;

export interface IEmployeeForTable {
  fullName: string;
  position: string;
}

export type CNArgs = string | Record<string, boolean>;

export type TableCheckboxClick = (id: string, setAllTo?: boolean) => void;

export type TableConfig<T> = Record<keyof Omit<T, 'id'>, ITableConfigValue>;

export type KeysWithoutId<T> = keyof Omit<T, 'id'>;
