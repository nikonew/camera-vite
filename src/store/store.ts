import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import { camerasSlice } from './slice/cameras-slice';
import { productSlice } from './slice/product-slice';
import { reviewsSlice } from './slice/reviews-slice';


export const store = configureStore({
  reducer: {
    [camerasSlice.name]:camerasSlice.reducer,
    [productSlice.name]:productSlice.reducer,
    [reviewsSlice.name]:reviewsSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: createAPI(),
      },
    }),
});
