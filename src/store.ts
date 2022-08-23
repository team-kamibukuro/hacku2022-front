import {
  configureStore,
  combineReducers,
  AnyAction,
  Action,
} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { playSlice } from "@/slices/playSlice";
import { authSlice } from "@/slices/authSlice";
import { websocketSlice } from "@/slices/websocketSlice";
import { entranceSlice } from "@/slices/entranceSlice";
import { useDispatch } from "react-redux";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";

const rootReducer = combineReducers({
  play: playSlice.reducer,
  auth: authSlice.reducer,
  websocket: websocketSlice.reducer,
  entrance: entranceSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["websocket", "entrance"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type ReduxState = ReturnType<typeof rootReducer>;
export type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;
export type TypedThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  ReduxState,
  unknown,
  AnyAction
>;
export const useTypedDispatch = () => useDispatch<TypedDispatch>();

export default store;
