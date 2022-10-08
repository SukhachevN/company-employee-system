import { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';

import { RootState } from '../App/store';
import {
  fetchParams,
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
        (state as IDefaultState<T>).entities = results.reverse();
        state.page = 1;
      } else {
        (state as IDefaultState<T>).entities.push(...results.reverse());
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
      state.isUpdating = true;
    });

    builder.addCase(post.fulfilled, (state, action) => {
      state.isUpdating = false;
      (state.currentEntity as T) = action.payload;
      state.currentEntityError;
    });

    builder.addCase(post.rejected, (state, action) => {
      state.isUpdating = false;
      state.currentEntity = null;
      state.currentEntityError = action.error.message as string;
    });
  }

  if (put) {
    builder.addCase(put.pending, (state) => {
      state.isUpdating = true;
    });

    builder.addCase(put.fulfilled, (state, action) => {
      state.isUpdating = false;
      (state.currentEntity as T) = action.payload;
      state.currentEntityError;
    });

    builder.addCase(put.rejected, (state, action) => {
      state.isUpdating = false;
      state.currentEntity = null;
      state.currentEntityError = action.error.message as string;
    });
  }

  if (remove) {
    builder.addCase(remove.fulfilled, (state, action) => {
      state.entities = state.entities.filter(
        ({ id }) => !action.payload.includes(id)
      );

      if (!action.payload.includes(state.currentEntity?.id as string))
        state.currentEntity = null;

      state.entitiesError = null;
      state.currentEntityError = null;
    });

    builder.addCase(remove.rejected, (state, action) => {
      state.entitiesError = action.error.message as string;
    });
  }
};

export const createFetchThunk = async (
  key: keyof RootState,
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
