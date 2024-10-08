import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { TCameras } from '../../types/types';

export enum APIRoute {
  Catalog = '/cameras',
}

export const fetchAllCameras = createAsyncThunk<TCameras[], undefined, { extra: AxiosInstance}>
('fetchCameras/all', async (_arg, { extra: api}) => {
  const response = await api.get<TCameras[]>(APIRoute.Catalog);
  return response.data;
});

export const fetchProduct = createAsyncThunk<TCameras, string, { extra: AxiosInstance}>
('fetchProduct/one', async (productId, { extra: api}) => {
  const response = await api.get<TCameras>(`${APIRoute.Catalog}/${productId}`);
  return response.data;
});
