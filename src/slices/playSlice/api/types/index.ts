export interface CreateRoomRequest {
  masterUserId: string;
  roomName: string;
}

export interface CreateRoomResponse {
  id: string;
  masterUserId: string;
  roomName: string;
}

export interface AuthRoomRequest {
  roomName: string;
}

export interface AuthRoomResponse {
  roomId: string;
  roomName: string;
  masterUserId: string;
}
