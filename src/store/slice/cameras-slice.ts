import { TCameras } from '../../types/types';
import { fetchAllCameras } from '../thunk/thunk';
import { RequestStatus, SortOrder, SortType} from '../../const';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


type CamerasState = {
    cameras: TCameras[];
    status: RequestStatus;
    sortType: SortType;
    sortOrder: SortOrder;
}

const initialState: CamerasState = {
  cameras:[],
  status: RequestStatus.Idle,
  sortType: SortType.Price,
  sortOrder: SortOrder.Up
};

export const camerasSlice = createSlice({
  extraReducers: (builder) =>
    builder
      .addCase(fetchAllCameras.pending, (state) => {
        state.status = RequestStatus.Loading;
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
    }
  },

});

export const {changeSortType, changeSortOrder, changeSortCatalog} = camerasSlice.actions;

