import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { playSlice } from "@/slices/playSlice";
import { authSlice } from "@/slices/authSlice";
import { websocketSlice } from "@/slices/websocketSlice";
import { entranceSlice } from "@/slices/entranceSlice";
import thunk from "redux-thunk";

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
export default store;
