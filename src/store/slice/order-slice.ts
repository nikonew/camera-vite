import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '../../types/types';
import { postOrder } from '../thunk/thunk';

type OrderPostState = {
order: TOrder | null;
}

const initialState: OrderPostState = {
  order: null,
};

export const orderPostSlice = createSlice({
  extraReducers: (builder) =>
    builder
      .addCase(postOrder.fulfilled, (state, action) => {
        state.order = action.payload;
      }),
  initialState,
  name: 'order',
  reducers: {},
  selectors:{
    order: (state: OrderPostState) => state.order
  }
});

export const orderPostSelectors = orderPostSlice.selectors;
