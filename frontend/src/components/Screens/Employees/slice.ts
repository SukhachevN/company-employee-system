import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../App/store';
import {
  baseUrl,
  employeesRoute,
  getDefaultEmptyState,
} from '../../../utils/constants';
import {
  fetchParams,
  IEmployee,
  IExtraReducers,
  NotCreatedEmployee,
} from '../../../utils/interfaces';
import {
  createDeleteThunk,
  createFetchThunk,
  createPostThunk,
  createPutThunk,
  getResponse,
  setExtraReducers,
} from '../../../utils/utils';

const initialState = getDefaultEmptyState<IEmployee>();

const url = `${baseUrl}${employeesRoute}`;

export const fetchEmployees = createAsyncThunk(
  'fetchEmployees',
  async (_, { getState }) =>
    createFetchThunk('employees', getState() as RootState, url)
);

export const postEmployee = createAsyncThunk(
  'postEmployee',
  async (employee: NotCreatedEmployee) => createPostThunk(employee, url)
);

export const updateEmployee = createAsyncThunk(
  'updateEmployee',
  async (employee: IEmployee) => createPutThunk(employee, url)
);

export const deleteEmployees = createAsyncThunk(
  'deleteEmployees',
  async (employeesIds: string[]) => createDeleteThunk(employeesIds, url)
);

const extraReducers: IExtraReducers<IEmployee> = {
  get: fetchEmployees,
  post: postEmployee,
  put: updateEmployee,
  remove: deleteEmployees,
};

export const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    setExtraReducers<IEmployee>(builder, extraReducers);
  },
});

export const { reducer: employeesReducer } = employeesSlice;
