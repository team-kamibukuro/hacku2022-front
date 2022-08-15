import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { AuthState } from "./types";

const initialState: AuthState = {
  isAuthChecking: true,
  currentUser: {
    id: "",
    name: "",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

// export const { editCurrentUser, editRoom } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
