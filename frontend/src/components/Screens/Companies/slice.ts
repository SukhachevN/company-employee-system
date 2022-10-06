import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../App/store';
import {
  baseUrl,
  companiesRoute,
  getDefaultEmptyState,
} from '../../../utils/constants';
import { ICompany } from '../../../utils/interfaces';
import { getResponse } from '../../../utils/utils';

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

export const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const { reducer: companiesReducer } = companiesSlice;
