import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../App/store';
import {
  baseUrl,
  companiesRoute,
  getDefaultEmptyState,
} from '../../utils/constants';
import {
  ICompany,
  IDefaultState,
  IExtraReducers,
  NotCreatedCompany,
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
import { deleteEmployees, postEmployee } from '../Employees/slice';

const url = `${baseUrl}${companiesRoute}`;

const initialState: IDefaultState<ICompany> & {
  employeesCountUpdate: Record<string, number>;
} = {
  ...getDefaultEmptyState<ICompany>(),
  employeesCountUpdate: {},
  currentEntity: {
    employees: 0,
  },
};

export const fetchCompanies = createAsyncThunk(
  'fetchCompanies',
  async (searchQuery: string | undefined, { getState }) =>
    createFetchThunk('companies', getState() as RootState, url, searchQuery)
);

export const postCompany = createAsyncThunk(
  'postCompany',
  async (company: NotCreatedCompany) => createPostThunk(company, url)
);

export const updateCompany = createAsyncThunk(
  'updateCompany',
  async (company: ICompany) => createPutThunk(company, url)
);

export const deleteCompanies = createAsyncThunk(
  'deleteCompanies',
  async (companyIds: string[]) => createDeleteThunk(companyIds, url)
);

const extraReducers: IExtraReducers<ICompany> = {
  get: fetchCompanies,
  post: postCompany,
  put: updateCompany,
  remove: deleteCompanies,
};

export const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    setCompany: setCurrentEntity,
    setSelectedCompanies: setSelected,
    setEmployeesCountForUodate: (
      state,
      action: PayloadAction<Record<string, number>>
    ) => {
      state.employeesCountUpdate = action.payload;
    },
    setNewCompany: (state) => {
      state.currentEntity = { employees: 0 };
    },
    resetCompanyError: resetError,
  },
  extraReducers: (builder) => {
    setExtraReducers<ICompany>(builder, extraReducers);

    builder.addCase(deleteEmployees.fulfilled, (state) => {
      state.entities = state.entities.map((company) => {
        const diff = state.employeesCountUpdate[company.id];

        if (!diff) return company;

        return {
          ...company,
          employees: company.employees - diff,
        };
      });

      state.employeesCountUpdate = {};
    });

    builder.addCase(deleteEmployees.rejected, (state) => {
      state.employeesCountUpdate = {};
    });

    builder.addCase(
      postEmployee.fulfilled,
      (state, action: PayloadAction<NotCreatedEmployee>) => {
        const company = state.entities.find(
          ({ id }) => id === action.payload.companyId
        );

        company!!.employees++;
      }
    );
  },
});

export const { reducer: companiesReducer } = companiesSlice;

export const {
  setSelectedCompanies,
  setEmployeesCountForUodate,
  setCompany,
  setNewCompany,
  resetCompanyError,
} = companiesSlice.actions;
