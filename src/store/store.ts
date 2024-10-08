import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import { camerasSlice } from './slice/cameras-slice';
import { productSlice } from './slice/product-slice';


export const store = configureStore({
  reducer: {
    [camerasSlice.name]:camerasSlice.reducer,
    [productSlice.name]:productSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: createAPI(),
      },
    }),
});
