export const Event = {
  CONNECT_SUCCESS: "CONNECT_SUCCESS",
  DISCONNECT: "DISCONNECT",
  PLAYER: "PLAYER",
  UPDATE_CODE: "UPDATE_CODE",
  UPDATE_HEART: "UPDATE_HEART",
  FINISHED: "FINISHED",
  ATTACK: "ATTACK",
  FIREWALL: "FIREWALL",
} as const;

export type EventType = typeof Event[keyof typeof Event];

export const Attack = {
  INDENT_INJECTION: "INDENT_INJECTION",
  COMMENTOUT_INJECTION: "COMMENTOUT_INJECTION",
  TBC_POISONING2: "TBC_POISONING2",
};

export type AttackType = typeof Attack[keyof typeof Attack];

export const DialogEvent = {
  MatchingWaiting: 0,
  StartGame: 1,
  ServerError: 2,
  Finish: 3,
  None: 4,
} as const;

export type DialogEventType = typeof DialogEvent[keyof typeof DialogEvent];
