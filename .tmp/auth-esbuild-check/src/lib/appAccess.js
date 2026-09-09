// src/lib/appAccess.ts
var APPROVED_APP_LOGINS = ["luis", "pimenta", "peduzzi", "lobo"];
var approvedLoginSet = new Set(APPROVED_APP_LOGINS);
function normalizeLogin(value) {
  return String(value || "").trim().toLowerCase();
}
function getAppLogin(user) {
  if (!user) return "";
  const metadataLogin = normalizeLogin(user.user_metadata?.login) || normalizeLogin(user.user_metadata?.username);
  if (metadataLogin) return metadataLogin;
  const email = normalizeLogin(user.email);
  return email.includes("@") ? email.split("@")[0] : email;
}
function hasAppAccess(user) {
  if (!user || user.app_metadata?.app_access !== true) return false;
  return approvedLoginSet.has(getAppLogin(user));
}
export {
  APPROVED_APP_LOGINS,
  getAppLogin,
  hasAppAccess
};
