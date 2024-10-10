import { TCameras } from '../../types/types';
import { RequestStatus} from '../../const';
import { createSlice } from '@reduxjs/toolkit';
import { fetchProduct } from '../thunk/thunk';

type ProductState = {
    product: TCameras | null;
    status: RequestStatus;
}

const initialState: ProductState = {
  product: null,
  status: RequestStatus.Idle
};

export const productSlice = createSlice({
  extraReducers: (builder) =>
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.product = action.payload;
      })
      .addCase(fetchProduct.rejected, (state) => {
        state.status = RequestStatus.Failed;
      }),
  initialState,
  name: 'camera',
  reducers: {},
  selectors: {
    camera: (state: ProductState) => state.product
  }
});

export const productSelectors = productSlice.selectors;
