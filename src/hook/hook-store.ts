import { useDispatch, TypedUseSelectorHook, useSelector, useStore } from 'react-redux';
import { store } from '../store/store';
import { AppDispatch, RootState } from '../store/types/types';

export const useAppDispatch = useDispatch<AppDispatch>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAppStore: () => typeof store = useStore;
