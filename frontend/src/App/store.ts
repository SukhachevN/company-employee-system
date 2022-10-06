import { configureStore } from '@reduxjs/toolkit';
import { companiesReducer } from '../components/Screens/Companies/slice';
import { employeesReducer } from '../components/Screens/Employees/slice';

export const store = configureStore({
  reducer: {
    companies: companiesReducer,
    employees: employeesReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
