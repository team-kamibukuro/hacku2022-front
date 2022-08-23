import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import {
  AuthState,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "./types";
import client from "@/common/utils/client";
import { AxiosResponse } from "axios";

export const fetchAsyncLogin = createAsyncThunk(
  "auth/login",
  async (auth: LoginRequest) => {
    const res = await client.post<LoginResponse>("/login", auth);
    return res;
  }
);

export const fetchAsyncRegister = createAsyncThunk(
  "auth/register",
  async (auth: RegisterRequest) => {
    const res = await client.post<RegisterResponse>("/signup", auth);
    return res;
  }
);

const initialState: AuthState = {
  isAuth: false,
  isAuthChecking: true,
  isLoginView: true,
  currentUser: {
    id: "",
    name: "",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    switchIsLoginView(state) {
      state.isLoginView = !state.isLoginView;
    },
    revokeAuth(state) {
      state.isAuth = false;
      localStorage.removeItem("localJWT");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchAsyncLogin.fulfilled,
      (state, action: PayloadAction<AxiosResponse<LoginResponse>>) => {
        localStorage.setItem(
          "localJWT",
          action.payload.headers["authorization"]
        );
        state.isAuth = true;
        state.isAuthChecking = false;
        state.currentUser.id = action.payload.data.userId;
        state.currentUser.name = action.payload.data.userName;

        window.location.replace("/entrance");
      }
    );
    builder.addCase(fetchAsyncLogin.rejected, (e) => {
      console.log(e);
    });
    builder.addCase(
      fetchAsyncRegister.fulfilled,
      (state, action: PayloadAction<AxiosResponse<RegisterResponse>>) => {
        localStorage.setItem(
          "localJWT",
          action.payload.headers["authorization"]
        );
        state.isAuth = true;
        state.isAuthChecking = false;
        state.currentUser.id = action.payload.data.userId;
        state.currentUser.name = action.payload.data.userName;

        window.location.replace("/entrance");
      }
    );
    builder.addCase(fetchAsyncRegister.rejected, (e) => {
      console.log(e);
    });
  },
});

export const { switchIsLoginView, revokeAuth } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
