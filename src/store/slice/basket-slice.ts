import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TCameras } from '../../types/types';

export const PRODUCT_IN_BASKET = 'product_in_basket';
export type Product = string;

export const updateProducts = (product: Product): void => {
  localStorage.setItem(PRODUCT_IN_BASKET, product);
};
export type TypeBasketProduct = TCameras & { cnt?: number };

type BasketState = {
  basketProducts: TypeBasketProduct[];
  basketProductsId: number[];
}

const initialState: BasketState = {
  basketProducts: [],
  basketProductsId: [],
};

export const basketSlice = createSlice({
  initialState,
  name: 'basket',
  reducers: {
    setProducts(state, action: PayloadAction<string>) {
      state.basketProducts = JSON.parse(action.payload) as TCameras[];
    },
    addProduct(state, action: PayloadAction<TCameras>) {
      const foondedProduct = state.basketProducts.find(
        (element) => element.id === action.payload.id
      );
      state.basketProducts = [
        ...state.basketProducts.filter((element) => element.id !== action.payload.id),
        { ...action.payload, cnt: (foondedProduct?.cnt || 0) + 1 },
      ];
      updateProducts(JSON.stringify(state.basketProducts));
    },
    incrementProduct(state, action: PayloadAction<TCameras>) {
      state.basketProducts = state.basketProducts.map((element) => {
        if (element.id === action.payload.id) {
          return { ...element, cnt: (element.cnt || 0) + 1 };
        } else {
          return element;
        }
      });
      updateProducts(JSON.stringify(state.basketProducts));
    },
    decrementProduct(state, action: PayloadAction<TCameras>) {
      state.basketProducts = state.basketProducts.map((element) => ({
        ...element,
        cnt: element.id === action.payload.id ? (element.cnt || 0) - 1 : element.cnt,
      }));
      updateProducts(JSON.stringify(state.basketProducts));
    },
    setCountProduct(state, action: PayloadAction<TypeBasketProduct>) {
      state.basketProducts = state.basketProducts.map((element) =>
        element.id === action.payload.id ? action.payload : element
      );
      updateProducts(JSON.stringify(state.basketProducts));
    },
  }
});
