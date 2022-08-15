import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { playSlice } from "@/slices/playSlice";
import { authSlice } from "@/slices/authSlice";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  play: playSlice.reducer,
  auth: authSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
export default store;