import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { MatchHistory, MypageState } from "./types";

const initialState: MypageState = {
  matchHistory: {
    targetHistoryIndex: 0,
    currentCode: "",
    beforeCode: "",
  },
};

export const mypageSlice = createSlice({
  name: "mypage",
  initialState,
  reducers: {
    editMatchHistory(state, action: PayloadAction<MatchHistory>) {
      state.matchHistory.targetHistoryIndex = action.payload.targetHistoryIndex;
      state.matchHistory.currentCode = action.payload.currentCode;
      state.matchHistory.beforeCode = action.payload.beforeCode;
    },
  },
});

export const { editMatchHistory } = mypageSlice.actions;
export const selectMatchHistory = (state: RootState) =>
  state.mypage.matchHistory;
export const selectTargetIndex = (state: RootState) =>
  state.mypage.matchHistory.targetHistoryIndex;

export default mypageSlice.reducer;
