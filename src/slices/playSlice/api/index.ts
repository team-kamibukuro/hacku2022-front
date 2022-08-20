import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "@/common/utils/client";
import {
  AuthRoomRequest,
  AuthRoomResponse,
  CreateRoomRequest,
  CreateRoomResponse,
  RunConsoleRequest,
  RunConsoleResponse,
  RunTestCaseRequest,
  RunTestCaseResponse,
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

export const fetchAsyncRunConsole = createAsyncThunk(
  "play/runConsole",
  async (req: RunConsoleRequest) => {
    const res = await client.post<RunConsoleResponse>("/console", req, {
      headers: {
        Authorization: `${localStorage.localJWT}`,
      },
    });
    return res.data;
  }
);

export const fetchAsyncRunTestCase = createAsyncThunk(
  "play/runTestCase",
  async (req: RunTestCaseRequest) => {
    const res = await client.post<RunTestCaseResponse>("/testcase", req, {
      headers: {
        Authorization: `${localStorage.localJWT}`,
      },
    });
    console.log(res.data);
    return res.data;
  }
);
