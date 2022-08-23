export interface WebsocketState {
  socket: any;
  abend: boolean;
  normalend: boolean;
}

export interface CloseWebsocket {
  id: string;
}
