import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus } from '../../const';
import { TReviews } from '../../types/types';
import { fetchAllReviews } from '../thunk/thunk';

type ReviewsState = {
    reviews: TReviews[];
    status: RequestStatus;
}

const initialState: ReviewsState = {
  reviews: [],
  status: RequestStatus.Idle
};


export const reviewsSlice = createSlice ({
  extraReducers: (builder) =>
    builder
      .addCase(fetchAllReviews.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchAllReviews.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.reviews = action.payload;
      })
      .addCase(fetchAllReviews.rejected, (state) => {
        state.status = RequestStatus.Failed;
      }),
  initialState,
  name: 'reviews',
  reducers: {},
  selectors: {
    reviews: (state: ReviewsState)=> state.reviews
  }
});

export const reviewsSelectors = reviewsSlice.selectors;


