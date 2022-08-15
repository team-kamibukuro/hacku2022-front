export const Access = {
  Input: 0,
  Create: 1,
  Matching: 2,
} as const;

export type AccessType = typeof Access[keyof typeof Access];
