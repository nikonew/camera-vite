import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import { camerasSlice } from './slice/cameras-slice';
import { productSlice } from './slice/product-slice';
import { reviewsSlice } from './slice/reviews-slice';
import { similarProductSlice } from './slice/similar-slice';
import { orderPostSlice } from './slice/order-slice';


export const store = configureStore({
  reducer: {
    [camerasSlice.name]:camerasSlice.reducer,
    [productSlice.name]:productSlice.reducer,
    [reviewsSlice.name]:reviewsSlice.reducer,
    [similarProductSlice.name]:similarProductSlice.reducer,
    [orderPostSlice.name]:orderPostSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: createAPI(),
      },
    }),
});
