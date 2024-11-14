import { createSelector } from '@reduxjs/toolkit';
import { SortOrder, SortType } from '../../const';
import { TCameras } from '../../types/types';
import { RootState } from '../store-types/store-types';
import { getSortCatalog } from '../../util';

export const selectCameras = (state: RootState): TCameras[] => state.cameras.cameras;
export const selectSortType = (state: RootState): SortType => state.cameras.sortType;
export const selectSortOrder = (state: RootState): SortOrder => state.cameras.sortOrder;

export const selectSortCameras = createSelector(
  [selectSortType, selectCameras, selectSortOrder],
  (sortType, cameras, sortOrder) => getSortCatalog(sortType, cameras, sortOrder)
);

