import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type formTypes = 'company' | 'employee' | null;

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
