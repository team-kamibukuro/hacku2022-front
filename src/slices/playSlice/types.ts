export interface Room {
  id: string;
  name: string;
}

export interface User {
  id: string;
  name: string;
  heart: number;
  isMaster: boolean;
  finished: boolean;
  firewall: boolean;
  language: string;
  code: string;
  consoleResult: string;
  testResults: string;
}

export interface Player {
  id: string;
  name: string;
  heart: number;
  isMaster: boolean;
  finished: boolean;
  firewall: boolean;
  language: string;
  code: string;
}

export interface PlayState {
  room: Room;
  question: string;
  currentUser: User;
  players: Player[];
  clock: any;
}
