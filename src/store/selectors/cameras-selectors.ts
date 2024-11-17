import { createSelector } from '@reduxjs/toolkit';
import { PER_PAGE_CAMERAS_COUNT, SortOrder, SortType } from '../../const';
import { TCameras } from '../../types/types';
import { RootState } from '../store-types/store-types';
import { getSortCatalog } from '../../util';
import { TFilteringType } from '../../types/filter-type';

export const selectCameras = (state: RootState): TCameras[] => state.cameras.cameras;
export const selectSortType = (state: RootState): SortType => state.cameras.sortType;
export const selectSortOrder = (state: RootState): SortOrder => state.cameras.sortOrder;
export const selectFiltering = (state: RootState): TFilteringType => state.cameras.filtering;
export const selectCurrentPage = (state: RootState): number => state.cameras.currentPage;

// export const selectFilteringCameras = createSelector(
//   [selectCameras, selectFiltering],
//   (cameras, filtering) => (cameras, filtering.price, filtering.priceUp, filtering.level, filtering.category, filtering.type)
// );


export const selectSortCameras = createSelector(
  [selectSortType, selectCameras, selectSortOrder],
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
