import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '../../types/types';
import { postOrder } from '../thunk/thunk';
import { RequestStatus } from '../../const';

type OrderPostState = {
order: TOrder | null;
status: RequestStatus;
}

const initialState: OrderPostState = {
  order: null,
  status: RequestStatus.Idle,
};

export const orderPostSlice = createSlice({
  extraReducers: (builder) =>
    builder
      .addCase(postOrder.pending, (state) => {
        state.status = RequestStatus.Success;
      })
      .addCase(postOrder.fulfilled, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(postOrder.rejected, (state) => {
        state.status = RequestStatus.Failed;
      }),
  initialState,
  name: 'order',
  reducers: {},
  selectors:{
    order: (state: OrderPostState) => state.order
  }
});

export const orderPostSelectors = orderPostSlice.selectors;
