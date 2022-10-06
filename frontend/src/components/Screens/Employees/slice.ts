import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getDefaultEmptyState } from '../../../utils/constants';
import { IEmployee } from '../../../utils/interfaces';

const initialState = getDefaultEmptyState<IEmployee>();

export const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {},
});

export const { reducer: employeesReducer } = employeesSlice;
