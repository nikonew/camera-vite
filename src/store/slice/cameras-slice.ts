import { TCameras } from '../../types/types';
import { fetchAllCameras } from '../thunk/thunk';
import { RequestStatus} from '../../const';
import { createSlice } from '@reduxjs/toolkit';

type CamerasState = {
    cameras: TCameras[];
    status: RequestStatus;
}

const initialState: CamerasState = {
  cameras:[],
  status: RequestStatus.Idle
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
  reducers: {},
  selectors: {
    cameras: (state: CamerasState) => state.cameras
  }
});

export const camerasSelectors = camerasSlice.selectors;
