import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import { camerasSlice } from './slice/cameras-slice';


export const store = configureStore({
  reducer: {
    [camerasSlice.name]:camerasSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: createAPI(),
      },
    }),
});
