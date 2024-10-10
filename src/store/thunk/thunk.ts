import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { TCameras, TReviews } from '../../types/types';

export enum APIRoute {
  Catalog = '/cameras',
  Review = '/reviews',
}

export const fetchAllCameras = createAsyncThunk<TCameras[], undefined, { extra: AxiosInstance}>
('fetchCameras/all', async (_arg, { extra: api}) => {
  const response = await api.get<TCameras[]>(APIRoute.Catalog);
  return response.data;
});

export const fetchProduct = createAsyncThunk<TCameras, string, { extra: AxiosInstance}>
('fetchProductPage/one', async (productId, { extra: api}) => {
  const response = await api.get<TCameras>(`${APIRoute.Catalog}/${productId}`);
  return response.data;
});

export const fetchAllReviews = createAsyncThunk<TReviews[], undefined, { extra: AxiosInstance}>
('fetchReviews/all', async (_arg, { extra: api}) => {
  const response = await api.get<TReviews[]>(APIRoute.Review);
  return response.data;
});
