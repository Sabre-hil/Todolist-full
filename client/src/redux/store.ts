import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook ,useDispatch, useSelector } from 'react-redux';
import authAndRegSlice from './slices/authAndRegSlice';
import taskSlice from './slices/taskSlice';
import sortSlice from './slices/sortSlice';

export const store = configureStore({
  reducer: {
    auth: authAndRegSlice,
    task: taskSlice,
    sort: sortSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>
  
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector