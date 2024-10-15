import { TCameras } from '../../types/types';
import { fetchAllSimilar } from '../thunk/thunk';
import { RequestStatus} from '../../const';
import { createSlice } from '@reduxjs/toolkit';

type SimilarProductState = {
    similarProduct: TCameras[];
    status: RequestStatus;
}

const initialState: SimilarProductState = {
  similarProduct:[],
  status: RequestStatus.Idle
};

export const similarProductSlice = createSlice({
  extraReducers: (builder) =>
    builder
      .addCase(fetchAllSimilar.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchAllSimilar.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.similarProduct = action.payload;
      })
      .addCase(fetchAllSimilar.rejected, (state) => {
        state.status = RequestStatus.Failed;
      }),
  initialState,
  name: 'similarProduct',
  reducers: {},
  selectors: {
    similarProduct: (state: SimilarProductState) => state.similarProduct
  }
});

export const similarProductSelectors = similarProductSlice.selectors;
