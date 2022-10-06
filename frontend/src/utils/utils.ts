import { ActionReducerMapBuilder, Draft } from '@reduxjs/toolkit';
import { fetchParams, IDefaultState, IExtraReducers } from './interfaces';

export const getResponse = async ({ link, options }: fetchParams) => {
  const response = await fetch(link, options);
  const result = await response.json();

  return result;
};

export const setExtraReducers = <T>(
  builder: ActionReducerMapBuilder<IDefaultState<T>>,
  extraReducers: IExtraReducers<T>
) => {
  const { get, post, put, remove } = extraReducers;

  if (get) {
    builder.addCase(get.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(get?.fulfilled, (state, action) => {
      const { results, endOfData } = action.payload;

      state.isLoading = false;
      (state as IDefaultState<T>).entities.push(...results);
      state.endOfData = endOfData;
      state.error = null;
    });

    builder.addCase(get.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message as string;
      state.endOfData = false;
      state.entities = [];
    });
  }
};
