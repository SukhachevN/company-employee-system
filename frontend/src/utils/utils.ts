import { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';

import { RootState } from '../App/store';
import {
  CompanyEntity,
  EmployeeEntity,
  fetchParams,
  ICompany,
  IDefaultState,
  IExtraReducers,
  ISetSelectedPayload,
} from './interfaces';

export const getResponse = async ({ link, options }: fetchParams) => {
  const response = await fetch(link, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });
  const result = await response.json();

  return result;
};

export const setExtraReducers = <T extends { id: string }>(
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
      const { arg } = action.meta;

      state.isLoading = false;
      if (arg && arg !== state.lastSearch) {
        state.lastSearch = arg;
        (state as IDefaultState<T>).entities = results;
        state.page = 1;
      } else {
        (state as IDefaultState<T>).entities.push(...results);
      }
      state.endOfData = endOfData;
      state.entitiesError = null;

      !endOfData && state.page++;
    });

    builder.addCase(get.rejected, (state, action) => {
      state.isLoading = false;
      state.entitiesError = action.error.message as string;
      state.endOfData = false;
      state.entities = [];
    });
  }

  if (post) {
    builder.addCase(post.pending, (state) => {
      state.isEntityUpdating = true;
    });

    builder.addCase(post.fulfilled, (state, action) => {
      (state.currentEntity as T) = action.payload;
      state.isEntityUpdating = false;
      (state.entities as T[]) = [action.payload, ...state.entities] as T[];
    });

    builder.addCase(post.rejected, (state, action) => {
      state.isEntityUpdating = false;
      state.currentEntityError = action.error.message as string;
    });
  }

  if (put) {
    builder.addCase(put.pending, (state, action) => {
      state.isEntityUpdating = true;
    });

    builder.addCase(put.fulfilled, (state, action) => {
      (state.currentEntity as T) = action.payload;
      state.isEntityUpdating = false;
      (state.entities as T[]) = state.entities.map((entity) =>
        entity.id === action.payload.id ? action.payload : entity
      ) as T[];
    });

    builder.addCase(put.rejected, (state, action) => {
      state.isEntityUpdating = false;
      state.currentEntityError = action.error.message as string;
    });
  }

  if (remove) {
    builder.addCase(remove.fulfilled, (state, action) => {
      state.entities = state.entities.filter(({ id }) => {
        const condition = !action.payload.includes(id);
        !condition && delete state.selected[id];

        return condition;
      });

      state.entitiesError = null;
    });

    builder.addCase(remove.rejected, (state, action) => {
      state.entitiesError = action.error.message as string;
    });
  }
};

export const createFetchThunk = async (
  key: 'companies' | 'employees',
  state: RootState,
  url: string,
  searchQuery?: string
) => {
  const { page, entities, lastSearch } = state[key];

  const currentPage = !entities.length || lastSearch !== searchQuery ? 1 : page;

  const link = `${url}?page=${currentPage}${searchQuery || ''}`;

  return await getResponse({ link });
};

export const createPostThunk = async <T>(entity: T, url: string) => {
  const params: fetchParams = {
    link: url,
    options: {
      method: 'POST',
      body: JSON.stringify(entity),
    },
  };

  return await getResponse(params);
};

export const createPutThunk = async <T>(entity: T, url: string) => {
  const params: fetchParams = {
    link: url,
    options: {
      method: 'PUT',
      body: JSON.stringify(entity),
    },
  };

  return await getResponse(params);
};

export const createDeleteThunk = async (ids: string[], url: string) => {
  const params: fetchParams = {
    link: url,
    options: {
      method: 'DELETE',
      body: JSON.stringify(ids),
    },
  };

  return await getResponse(params);
};

export const useIsVisible = (ref: React.RefObject<HTMLDivElement>) => {
  const [isIntersecting, setIntersecting] = useState(false);

  const observer = new IntersectionObserver(([entry]) =>
    setIntersecting(entry.isIntersecting)
  );

  useEffect(() => {
    ref.current && observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return isIntersecting;
};

export const setSelected = <T extends { id: string }>(
  state: IDefaultState<T>,
  action: PayloadAction<ISetSelectedPayload>
) => {
  const { id, setAllTo } = action.payload;

  if (typeof setAllTo === 'undefined') {
    state.selected[id]
      ? delete state.selected[id]
      : (state.selected[id] = true);

    return;
  }

  if (!setAllTo) {
    state.selected = {};
  } else {
    state.entities.forEach(({ id }) => (state.selected[id] = true));
  }
};

type CNArgs = string | Record<string, boolean>;

export const cn = (...args: CNArgs[]) =>
  args
    .map((arg) =>
      typeof arg === 'string' ? arg : Object.keys(arg).filter((key) => arg[key])
    )
    .join(' ');

export const setCurrentEntity = <T extends { id: string }>(
  state: IDefaultState<T>,
  action: PayloadAction<string>
) => {
  state.currentEntity = state.entities.find(
    ({ id }) => id === action.payload
  ) as unknown as T extends ICompany ? CompanyEntity : EmployeeEntity;
};
