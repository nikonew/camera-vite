import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { TCameras, TOrder, TReviews } from '../../types/types';


export enum APIRoute {
  Cameras = '/cameras',
  Similar = '/similar',
  Promo = '/promo',
  Reviews = '/reviews',
  Coupons = '/coupons',
  Orders = '/orders',
}

export const fetchAllCameras = createAsyncThunk<TCameras[], undefined, { extra: AxiosInstance}>
('fetchCameras/all', async (_arg, { extra: api}) => {
  const response = await api.get<TCameras[]>(APIRoute.Cameras);
  return response.data;
});

export const fetchProduct = createAsyncThunk<TCameras, string, { extra: AxiosInstance}>
('fetchProductPage/one', async (id, { extra: api}) => {
  const response = await api.get<TCameras>(`${APIRoute.Cameras}/${id}`);
  return response.data;
});

export const fetchAllReviews = createAsyncThunk<TReviews[], string, { extra: AxiosInstance}>
('fetchReviews/all', async (id , { extra: api}) => {
  const response = await api.get<TReviews[]>(`${APIRoute.Cameras}/${id}${APIRoute.Reviews}`);
  return response.data;
});

export const fetchAllSimilar = createAsyncThunk<TCameras[], string, { extra: AxiosInstance}>
('fetchSimilar/all', async (id, { extra: api}) => {
  const response = await api.get<TCameras[]>(`${APIRoute.Cameras}/${id}${APIRoute.Similar}`);
  return response.data;
});

export const postOrder = createAsyncThunk<void, TOrder, { extra: AxiosInstance}>
('postOrderAction', async (order, { extra: api}) => {
  await api.post(APIRoute.Orders, order);
});
