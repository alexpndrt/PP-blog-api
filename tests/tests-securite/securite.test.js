// 📂 tests/tests-securite/securite.test.js

import test from "node:test";
import assert from "assert";
import request from "supertest";
import app from "../../src/app.js";

const fakeToken = "Bearer invalid.token.here";

// 🔐 Test 1 : Injection SQL simulée sur /api/login
test("should reject login with SQL injection attempt", async () => {
  const res = await request(app).post("/api/login").send({
    username: "' OR '1'='1",
    password: "' OR '1'='1",
  });
  assert.strictEqual(res.statusCode, 401);
  assert.ok(res.body.error);
});

// 🔐 Test 2 : Accès sans token
test("should reject access to protected route without token", async () => {
  const res = await request(app).get("/api/posts");
  assert.strictEqual(res.statusCode, 401);
});

// 🔐 Test 3 : Accès avec token invalide
test("should reject access with invalid token", async () => {
  const res = await request(app)
    .get("/api/posts")
    .set("Authorization", fakeToken);
  assert.strictEqual(res.statusCode, 401);
});
