import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type formTypes = 'company' | 'employee' | null;

interface IEditFormState {
  entityType: formTypes;
}

const initialState: IEditFormState = {
  entityType: null,
};

export const editFormSlice = createSlice({
  name: 'editForm',
  initialState,
  reducers: {
    setFormType: (state, action: PayloadAction<formTypes>) => {
      state.entityType = action.payload;
    },
  },
});

export const { reducer: editFormReducer } = editFormSlice;

export const { setFormType } = editFormSlice.actions;
