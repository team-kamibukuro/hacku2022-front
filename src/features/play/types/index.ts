export const Event = {
  CONNECT_SUCCESS: "CONNECT_SUCCESS",
  READY: "READY",
  DISCONNECT: "DISCONNECT",
  PLAYER: "PLAYER",
  UPDATE_CODE: "UPDATE_CODE",
  UPDATE_HEART: "UPDATE_HEART",
  FINISHED: "FINISHED",
  ALL_FINISHED: "ALL_FINISHED",
  ATTACK: "ATTACK",
  FIREWALL: "FIREWALL",
  RANKING: "RANKING",
  SERVER_ERROR: "500_ERROR",
} as const;

export type EventType = typeof Event[keyof typeof Event];

export const Attack = {
  INDENT_INJECTION: "INDENT_INJECTION",
  COMMENTOUT_INJECTION: "COMMENTOUT_INJECTION",
  TBC_POISONING: "TBC_POISONING",
  RANSOMWARE: "RANSOMWARE",
};

export type AttackType = typeof Attack[keyof typeof Attack];

export const DialogEvent = {
  MatchingWaiting: 0,
  StartGame: 1,
  ServerError: 2,
  Finish: 3,
  None: 4,
  ConnectionError: 5,
} as const;

export type DialogEventType = typeof DialogEvent[keyof typeof DialogEvent];

export interface FINISHED_DATA {
  event: "FINISHED";
  playerId: string;
  name: string;
}

export interface CONNECT_SUCCESS_DATA {
  event: "CONNECT_SUCCESS";
  playerId: string;
  name: string;
  language: string;
}

export interface DISCONNECT_DATA {
  event: "DISCONNECT";
  playerId: string;
}

export interface READY_DATA {
  event: "READY";
  question: {
    id: string;
    name: string;
    context: string;
  };
  players: [
    {
      id: string;
      name: string;
      isMaster: boolean;
      language: string;
    }
  ];
}

export interface UPDATE_CODE_DATA {
  event: "UPDATE_CODE";
  playerId: string;
  code: string;
}

export interface UPDATE_HEART_DATA {
  event: "UPDATE_HEART";
  playerId: string;
  heart: number;
}

export interface SERVER_ERROR_DATA {
  event: "SERVER_ERROR";
  status: boolean;
  playerId: string;
  name: string;
}
export interface ALL_FINISHED_DATA {
  event: "ALL_FINISHED";
  playerId: string;
  name: string;
  time: string;
}

export interface RANKING_DATA {
  event: "RANKING";
  users: [
    {
      playerId: string;
      name: string;
      time: string;
      rank: number;
    }
  ];
}

export interface ATTACK_DATA {
  event: "ATTACK";
  attackType: "INDENT_INJECTION" | "COMMENTOUT_INJECTION" | "TBC_POISONING";
  playerId: string;
  name: string;
  language: string;
  code: string;
  firewall: boolean;
}

export interface RANSOMWARE_DATA {
  event: "ATTACK";
  attackType: "RANSOMWARE";
  playerId: string;
  name: string;
  heart: number;
  firewall: boolean;
}

export interface FIREWALL_DATA {
  event: "FIREWALL";
  status: boolean;
  playerId: string;
  name: string;
}
