import rootReducer, { TRootState } from './reducers';
import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

export const setupsStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
};

export type TStore = ReturnType<typeof setupsStore>;
export type TDispatch = TStore['dispatch'];

export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;
export const useAppDispatch = () => useDispatch<TDispatch>();