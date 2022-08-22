import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { EntranceState } from "./types";

const initialState: EntranceState = {
  loading: {
    entrance: true,
  },
  touchStart: true,
};

export const entranceSlice = createSlice({
  name: "entrance",
  initialState,
  reducers: {
    loadedEntrance(state) {
      state.loading.entrance = false;
    },
    switchTouchStart(state) {
      state.touchStart = !state.touchStart;
    },
  },
});

export const { loadedEntrance, switchTouchStart } = entranceSlice.actions;
export const selectLoading = (state: RootState) => state.entrance.loading;
export const selectTouchStart = (state: RootState) => state.entrance.touchStart;

export default entranceSlice.reducer;
