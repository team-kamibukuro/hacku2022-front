import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "@/common/utils/client";
import {
  AuthRoomRequest,
  AuthRoomResponse,
  CreateRoomRequest,
  CreateRoomResponse,
} from "./types";

export const fetchAsyncCreateRoom = createAsyncThunk(
  "play/createRoom",
  async (room: CreateRoomRequest) => {
    const res = await client.post<CreateRoomResponse>("/room", room, {
      headers: {
        Authorization: `${localStorage.localJWT}`,
      },
    });
    return res.data;
  }
);

export const fetchAsyncAuthRoom = createAsyncThunk(
  "play/authRoom",
  async (room: AuthRoomRequest) => {
    const res = await client.post<AuthRoomResponse>("/room/get", room, {
      headers: {
        Authorization: `${localStorage.localJWT}`,
      },
    });
    return res.data;
  }
);