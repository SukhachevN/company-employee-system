import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../App/store';
import {
  baseUrl,
  employeesRoute,
  getDefaultEmptyState,
} from '../../utils/constants';
import {
  IEmployee,
  IExtraReducers,
  NotCreatedEmployee,
} from '../../utils/interfaces';
import {
  createDeleteThunk,
  createFetchThunk,
  createPostThunk,
  createPutThunk,
  resetError,
  setCurrentEntity,
  setExtraReducers,
  setSelected,
} from '../../utils/utils';
import { setEmployeesCountForUodate } from '../Companies/slice';

const initialState = {
  ...getDefaultEmptyState<IEmployee>(),
  currentEntity: { companyId: '' },
};

const url = `${baseUrl}${employeesRoute}`;

export const fetchEmployees = createAsyncThunk(
  'fetchEmployees',
  async (searchQuery: string | undefined, { getState }) =>
    createFetchThunk('employees', getState() as RootState, url, searchQuery)
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
  async (employeesIds: string[], { getState, dispatch }) => {
    const {
      employees: { entities },
    } = getState() as RootState;

    const employeesCountForUpdate: Record<string, number> = {};

    entities.forEach(({ companyId, id }) => {
      if (employeesIds.includes(id)) {
        !employeesCountForUpdate[companyId] &&
          (employeesCountForUpdate[companyId] = 0);

        employeesCountForUpdate[companyId]++;
      }
    });

    dispatch(setEmployeesCountForUodate(employeesCountForUpdate));

    return createDeleteThunk(employeesIds, url);
  }
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
  reducers: {
    setEmployee: setCurrentEntity,
    setSelectedEmployees: setSelected,
    setEmployeesCompany: (state, action: PayloadAction<string>) => {
      state.currentEntity = { companyId: action.payload };
    },
    resetEmployeeError: resetError,
  },
  extraReducers: (builder) => {
    setExtraReducers<IEmployee>(builder, extraReducers);
  },
});

export const { reducer: employeesReducer } = employeesSlice;

export const {
  setSelectedEmployees,
  setEmployee,
  setEmployeesCompany,
  resetEmployeeError,
} = employeesSlice.actions;
