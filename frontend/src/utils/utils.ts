import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { fetchParams, IExtraReducers } from './interfaces';

export const getResponse = async ({ link, options }: fetchParams) => {
  const response = await fetch(link, options);
  const result = await response.json();

  return result;
};

export const setExtraReducers = <T>(
  builder: ActionReducerMapBuilder<T>,
  extraReducers: IExtraReducers
) => {};
