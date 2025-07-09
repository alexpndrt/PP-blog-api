// 📂 tests/tests-routes/tests-auth/auth.test.js

import { test } from "node:test";
import assert from "assert";
import request from "supertest";
import app from "../../../src/app.js";

/******************************
 * 1️⃣ TESTS D'INSCRIPTION
 ******************************/

// ✅ Inscription valide
test("should register a new user successfully", async () => {
  const uniqueUsername = `user_${Date.now()}`;
  const response = await request(app).post("/api/register").send({
    username: uniqueUsername,
    password: "password123",
  });

  assert.strictEqual(response.statusCode, 201, "Doit renvoyer 201");
  assert.ok(response.body.user, "Doit renvoyer un objet user");
  assert.strictEqual(
    response.body.user.username,
    uniqueUsername,
    "Doit renvoyer le bon username"
  );
});

// ❌ Username existant
test("should fail to register with an existing username", async () => {
  const response = await request(app).post("/api/register").send({
    username: "admin", // ⚠️ Remplace par un username existant si besoin
    password: "anyPassword",
  });

  assert.strictEqual(response.statusCode, 400, "Doit renvoyer 400");
  assert.ok(response.body.error, "Doit renvoyer un message d'erreur");
});

// ❌ Champs manquants
test("should fail to register with missing fields", async () => {
  const response = await request(app).post("/api/register").send({
    password: "password123",
  });

  assert.strictEqual(response.statusCode, 400, "Doit renvoyer 400");
  assert.ok(response.body.error, "Doit renvoyer un message d'erreur");
});

/******************************
 * 2️⃣ TESTS DE CONNEXION
 ******************************/

// ✅ Connexion valide
test("should login successfully with valid credentials", async () => {
  const response = await request(app).post("/api/login").send({
    username: "admin",
    password: "admin",
  });

  assert.strictEqual(response.statusCode, 200, "Doit renvoyer 200");
  assert.ok(response.body.token, "Doit renvoyer un token");
});

// ❌ Mauvais username
test("should fail login with invalid username", async () => {
  const response = await request(app).post("/api/login").send({
    username: "nonexistentuser",
    password: "password123",
  });

  assert.strictEqual(response.statusCode, 401, "Doit renvoyer 401");
});

// ❌ Mauvais mot de passe
test("should fail login with wrong password", async () => {
  const response = await request(app).post("/api/login").send({
    username: "admin",
    password: "wrongpassword",
  });

  assert.strictEqual(response.statusCode, 401, "Doit renvoyer 401");
});

// ❌ Champs manquants
test("should fail login with missing fields", async () => {
  const response = await request(app).post("/api/login").send({
    username: "admin",
  });

  assert.strictEqual(response.statusCode, 400, "Doit renvoyer 400");
  assert.ok(response.body.error, "Doit renvoyer un message d'erreur");
});
