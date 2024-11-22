import { createSelector } from '@reduxjs/toolkit';
import { PER_PAGE_CAMERAS_COUNT, SortOrder, SortType } from '../../const';
import { TCameras } from '../../types/types';
import { RootState } from '../store-types/store-types';
import { filterCatalog, getSortCatalog } from '../../util';
import { FilteredCategory, FilteredLevel, FilteredType } from '../../const';


export const selectCameras = (state: RootState): TCameras[] => state.cameras.cameras;
export const selectSortType = (state: RootState): SortType => state.cameras.sortType;
export const selectSortOrder = (state: RootState): SortOrder => state.cameras.sortOrder;
export const selectCurrentPage = (state: RootState): number => state.cameras.currentPage;
export const selectFilterCategory = (state: RootState): FilteredCategory | null => state.cameras.category;
export const selectFilterType = (state: RootState): FilteredType[] => state.cameras.type;
export const selectFilterLevel = (state: RootState): FilteredLevel[] => state.cameras.level;

export const selectFilteringCameras = createSelector(
  [selectCameras, selectFilterCategory, selectFilterType, selectFilterLevel],
  (cameras, category, type, level) => filterCatalog(cameras, category, type, level)
);


export const selectSortCameras = createSelector(
  [selectSortType, selectFilteringCameras, selectSortOrder],
  (sortType, cameras, sortOrder) => getSortCatalog(sortType, cameras, sortOrder)
);

export const selectCurrentCameras = createSelector(
  [selectSortCameras, selectCurrentPage],
  (sortCameras, currentPage) => {
    const lastIndex = currentPage * PER_PAGE_CAMERAS_COUNT;
    const firstIndex = lastIndex - PER_PAGE_CAMERAS_COUNT;
    return sortCameras.slice(firstIndex, lastIndex);
  }
);
