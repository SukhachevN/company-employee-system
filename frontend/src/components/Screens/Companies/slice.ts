import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../App/store';
import {
  baseUrl,
  companiesRoute,
  getDefaultEmptyState,
} from '../../../utils/constants';
import {
  ICompany,
  IDefaultState,
  IExtraReducers,
  NotCreatedCompany,
} from '../../../utils/interfaces';
import {
  createDeleteThunk,
  createFetchThunk,
  createPostThunk,
  createPutThunk,
  setExtraReducers,
  setSelected,
} from '../../../utils/utils';
import { deleteEmployees } from '../Employees/slice';

const url = `${baseUrl}${companiesRoute}`;

const initialState: IDefaultState<ICompany> & {
  employeesCountUpdate: Record<string, number>;
} = {
  ...getDefaultEmptyState<ICompany>(),
  employeesCountUpdate: {},
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
    setSelectedCompanies: setSelected,
    setEmployeesCountForUodate: (
      state,
      action: PayloadAction<Record<string, number>>
    ) => {
      state.employeesCountUpdate = action.payload;
    },
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
  },
});

export const { reducer: companiesReducer } = companiesSlice;

export const { setSelectedCompanies, setEmployeesCountForUodate } =
  companiesSlice.actions;
