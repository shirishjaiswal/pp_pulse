// utils/storage/local/keys.ts
// NO IMPORTS HERE

export const LocalStorageKeys = {
  KEY_JSESSIONID: "KEY_JSESSIONID",
  KEY_KIBANA_OAUTH_1: "KEY_KIBANA_OAUTH_1",
  KEY_KIBANA_OAUTH_2: "KEY_KIBANA_OAUTH_2",
  SID: "SID",
} as const;

export type LocalStorageKeysType = keyof typeof LocalStorageKeys;

