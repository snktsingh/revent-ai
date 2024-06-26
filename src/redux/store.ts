import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import slideReducer from './reducers/slide';
import ElementReducer from './reducers/elements';
import CanvasReducer from './reducers/canvas';
import ThunkReducer from './thunk/thunk';
import apiDataReducer from './reducers/apiData';
import elementsIdsReducer from './reducers/elementsCount';
import themeReducer from './reducers/theme';
export const store = configureStore({
  reducer: {
    slide: slideReducer,
    element: ElementReducer,
    canvas: CanvasReducer,
    thunk: ThunkReducer,
    apiData: apiDataReducer,
    elementsIds: elementsIdsReducer,
    slideTheme: themeReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
