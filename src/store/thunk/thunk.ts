import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { TCameras } from '../../types/types';

export enum APIRoute {
    Cameras = '/cameras'
  }

export const fetchAllCameras = createAsyncThunk<TCameras[], undefined, { extra: AxiosInstance}>
('fetchCameras/all', async (_arg, { extra: api}) => {
  const response = await api.get<TCameras[]>(APIRoute.Cameras);
  return response.data;
});
