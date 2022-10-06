import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../App/store';
import {
  baseUrl,
  companiesRoute,
  getDefaultEmptyState,
} from '../../../utils/constants';
import { ICompany, IExtraReducers } from '../../../utils/interfaces';
import { getResponse, setExtraReducers } from '../../../utils/utils';

const initialState = getDefaultEmptyState<ICompany>();

export const fetchCompanies = createAsyncThunk(
  'fetchCompanies',
  async (_, { getState }) => {
    const {
      companies: { page, entities },
    } = getState() as RootState;

    const currentPage = !entities.length ? 1 : page + 1;

    const link = `${baseUrl}${companiesRoute}?page=${currentPage}`;

    return await getResponse({ link });
  }
);

const extraReducers: IExtraReducers<ICompany> = {
  get: fetchCompanies,
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
