import { createSelector } from '@reduxjs/toolkit';
import { PER_PAGE_CAMERAS_COUNT, SortOrder, SortType } from '../../const';
import { TCameras, FilteredCategory, FilteredLevel, FilteredType } from '../../types/types';
import { RootState } from '../store-types/store-types';
import { filterCatalog, getSortCatalog} from '../../util';


export const selectCameras = (state: RootState): TCameras[] => state.cameras.cameras;
export const selectSortType = (state: RootState): SortType => state.cameras.sortType;
export const selectSortOrder = (state: RootState): SortOrder => state.cameras.sortOrder;
export const selectCurrentPage = (state: RootState): number => state.cameras.currentPage;
export const selectFilterCategory = (state: RootState): FilteredCategory | null => state.cameras.category;
export const selectFilterType = (state: RootState): FilteredType[] => state.cameras.type;
export const selectFilterLevel = (state: RootState): FilteredLevel[] => state.cameras.level;
export const selectFilterPriceMin = (state: RootState): number => state.cameras.priceMin;
export const selectFilterPriceMax = (state: RootState): number => state.cameras.priceMax;


export const selectFilteringCameras = createSelector(
  [selectCameras, selectFilterCategory, selectFilterType, selectFilterLevel, selectFilterPriceMin, selectFilterPriceMax],
  (cameras, category, type, level, priceMin, priceMax) => filterCatalog(cameras, category, type, level, priceMin, priceMax)
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
