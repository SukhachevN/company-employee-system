import { configureStore } from '@reduxjs/toolkit';
import { companiesReducer } from '../components/Companies/slice';
import { editFormReducer } from '../components/EditForm/slice';
import { employeesReducer } from '../components/Employees/slice';

export const store = configureStore({
  reducer: {
    companies: companiesReducer,
    employees: employeesReducer,
    editForm: editFormReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
