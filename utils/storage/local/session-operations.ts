import { getLocal, setLocal } from "@/utils/storage/local/crud";
import { LocalStorageKeys } from "@/utils/storage/local/keys";

export function isSessionDataPresent() {
  return (
    getLocal(LocalStorageKeys.SID) &&
    getLocal(LocalStorageKeys.KEY_JSESSIONID) &&
    getLocal(LocalStorageKeys.KEY_KIBANA_OAUTH_1) &&
    getLocal(LocalStorageKeys.KEY_KIBANA_OAUTH_2)
  );
}

export function setSessionData(
  jsessionId: string,
  oAuthCookie1: string,
  oAuthCookie2: string,
  sid: string
) {
  setLocal(LocalStorageKeys.SID, sid);
  setLocal(LocalStorageKeys.KEY_JSESSIONID, jsessionId);
  setLocal(LocalStorageKeys.KEY_KIBANA_OAUTH_1, oAuthCookie1);
  setLocal(LocalStorageKeys.KEY_KIBANA_OAUTH_2, oAuthCookie2);
}

export function getSessionData () {
  return {
    jsessionId: getLocal(LocalStorageKeys.KEY_JSESSIONID) as string,
    oAuthCookie1: getLocal(LocalStorageKeys.KEY_KIBANA_OAUTH_1) as string,
    oAuthCookie2: getLocal(LocalStorageKeys.KEY_KIBANA_OAUTH_2) as string,
    sid: getLocal(LocalStorageKeys.SID) as string,
  };
}