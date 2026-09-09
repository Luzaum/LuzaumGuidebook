// tests/app-access.test.ts
import assert from "node:assert/strict";
import test from "node:test";
import { getAppLogin, hasAppAccess } from "../src/lib/appAccess";
test("permite apenas logins aprovados com flag administrativa", () => {
  assert.equal(hasAppAccess({ email: "luis@vetius.link", app_metadata: { app_access: true } }), true);
  assert.equal(hasAppAccess({ email: "pimenta@vetius.link", app_metadata: { app_access: true } }), true);
  assert.equal(hasAppAccess({ email: "intruso@vetius.link", app_metadata: { app_access: true } }), false);
  assert.equal(hasAppAccess({ email: "luis@vetius.link", app_metadata: {} }), false);
});
test("prioriza o login registrado nos metadados", () => {
  const user = {
    email: "outro@email.com",
    app_metadata: { app_access: true },
    user_metadata: { login: "Peduzzi" }
  };
  assert.equal(getAppLogin(user), "peduzzi");
  assert.equal(hasAppAccess(user), true);
});
