import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../App/store';
import {
  baseUrl,
  companiesRoute,
  getDefaultEmptyState,
} from '../../../utils/constants';
import {
  ICompany,
  IExtraReducers,
  NotCreatedCompany,
} from '../../../utils/interfaces';
import {
  createDeleteThunk,
  createFetchThunk,
  createPostThunk,
  createPutThunk,
  getResponse,
  setExtraReducers,
} from '../../../utils/utils';

const url = `${baseUrl}${companiesRoute}`;

const initialState = getDefaultEmptyState<ICompany>();

export const fetchCompanies = createAsyncThunk(
  'fetchCompanies',
  async (_, { getState }) =>
    createFetchThunk('companies', getState() as RootState, url)
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
  reducers: {},
  extraReducers: (builder) => {
    setExtraReducers<ICompany>(builder, extraReducers);
  },
});

export const { reducer: companiesReducer } = companiesSlice;
