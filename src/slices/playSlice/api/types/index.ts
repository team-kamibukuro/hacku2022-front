export interface CreateRoomRequest {
  masterUserId: string;
  roomName: string;
}

export interface CreateRoomResponse {
  roomId: string;
  roomName: string;
  masterUserId: string;
}

export interface AuthRoomRequest {
  roomName: string;
}

export interface AuthRoomResponse {
  roomId: string;
  roomName: string;
  masterUserId: string;
}
