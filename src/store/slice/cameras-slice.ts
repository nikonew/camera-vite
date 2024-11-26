import { FilteredCategory, FilteredLevel, FilteredType, TCameras } from '../../types/types';
import { fetchAllCameras } from '../thunk/thunk';
import { RequestStatus, SortOrder, SortType, START_PAGE} from '../../const';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


type CamerasState = {
    cameras: TCameras[];
    status: RequestStatus;
    sortType: SortType;
    sortOrder: SortOrder;
    priceMin: number;
    priceMax: number;
    level: FilteredLevel[];
    category: FilteredCategory | null;
    type: FilteredType[];
    isResetFilter: boolean;
    currentPage: number;
}

const initialState: CamerasState = {
  cameras:[],
  status: RequestStatus.Idle,
  sortType: SortType.Price,
  sortOrder: SortOrder.Up,
  priceMin: 0,
  priceMax: 0,
  level: [],
  category: null,
  type: [],
  isResetFilter: false,
  currentPage: START_PAGE
};

export const camerasSlice = createSlice({
  extraReducers: (builder) =>
    builder
      .addCase(fetchAllCameras.pending, (state) => {
        state.status = RequestStatus.Success;
      })
      .addCase(fetchAllCameras.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.cameras = action.payload;
      })
      .addCase(fetchAllCameras.rejected, (state) => {
        state.status = RequestStatus.Failed;
      }),
  initialState,
  name: 'cameras',
  reducers: {
    changeSortCatalog: (state, action: PayloadAction<{cameras: TCameras[]}>) => {
      state.cameras = action.payload.cameras;
    },
    changeSortType: (state, action: PayloadAction<{sortType: SortType}>) => {
      state.sortType = action.payload.sortType;
    },
    changeSortOrder: (state, action: PayloadAction<{sortOrder: SortOrder}>) => {
      state.sortOrder = action.payload.sortOrder;
    },
    changeCategory: (state, action: PayloadAction<FilteredCategory>) => {
      state.category = action.payload;
    },
    changeType: (state, action: PayloadAction<FilteredType>) => {
      if (!state.type.includes(action.payload)) {
        state.type.push(action.payload);
      } else {
        state.type = state.type.filter((type) => type !== action.payload);
      }
    },
    changeLevel: (state, action: PayloadAction<FilteredLevel>) =>{
      if (!state.level.includes(action.payload)) {
        state.level.push(action.payload);
      } else {
        state.level = state.level.filter((level) => level !== action.payload);
      }
    },
    changeCurrentPage: (state, action: PayloadAction<{currentPage: number}>) => {
      state.currentPage = action.payload.currentPage;
    },
    changePriceMin: (state, action: PayloadAction<number>) => {
      state.priceMin = action.payload;
    },
    changePriceMax: (state, action: PayloadAction<number>) => {
      state.priceMax = action.payload;
    },
    resetFilters: (state) => {
      state.priceMin = 0;
      state.priceMax = Infinity;
      state.category = null;
      state.type = [];
      state.level = [];
      state.isResetFilter = false;
    }
  }
});

export const {changeSortType, changeSortOrder, changeSortCatalog, changeCurrentPage, changeCategory, changeType, changeLevel, changePriceMin, changePriceMax, resetFilters} = camerasSlice.actions;

