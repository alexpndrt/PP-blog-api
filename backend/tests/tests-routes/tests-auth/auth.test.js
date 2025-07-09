// auth.test.js

import { test } from "node:test";
import assert from "assert";
import request from "supertest";
import app from "../../../src/app.js";

/******************************
 * 1️⃣ TESTS D'INSCRIPTION
 ******************************/

// ✅ Inscription valide
// Ce test vérifie qu'un utilisateur peut s'inscrire correctement avec un username unique

test("should register a new user successfully", async () => {
  const uniqueUsername = `user_${Date.now()}`;

  const response = await request(app).post("/api/register").send({
    username: uniqueUsername,
    password: "password123",
    roleId: 2, // suppose que ce roleId existe en base
  });

  assert.strictEqual(response.statusCode, 201);
  assert.ok(response.body.user);
  assert.strictEqual(response.body.user.username, uniqueUsername);
});

// ❌ Username existant
// Ce test vérifie qu'on ne peut pas s'inscrire avec un username déjà pris

test("should fail to register with an existing username", async () => {
  const response = await request(app).post("/api/register").send({
    username: "admin", // username existant dans ta DB
    password: "anyPassword",
    roleId: 2,
  });

  assert.strictEqual(response.statusCode, 400);
  assert.ok(response.body.error);
});

// ❌ Champs manquants
// Ce test vérifie que l'API rejette une inscription incomplète (par ex : pas de username)

test("should fail to register with missing fields", async () => {
  const response = await request(app).post("/api/register").send({
    password: "password123",
    roleId: 2,
  });

  assert.strictEqual(response.statusCode, 400);
  assert.ok(response.body.error);
});

// ❌ Rôle inexistant
// Ce test vérifie que l'API renvoie une erreur si on fournit un roleId inexistant

test("should fail to register with non-existing role", async () => {
  const uniqueUsername = `user_${Date.now()}`;

  const response = await request(app).post("/api/register").send({
    username: uniqueUsername,
    password: "password123",
    roleId: 999, // roleId inexistant
  });

  assert.strictEqual(response.statusCode, 400); // ou 500 selon ton API
  assert.ok(response.body.error);
});

/******************************
 * 2️⃣ TESTS DE CONNEXION
 ******************************/

// ✅ Connexion valide
// Ce test vérifie qu'un utilisateur peut se connecter avec les bons identifiants et reçoit un token

test("should login successfully with valid credentials", async () => {
  const response = await request(app).post("/api/login").send({
    username: "admin",
    password: "admin",
  });

  assert.strictEqual(response.statusCode, 200);
  assert.ok(response.body.token);
});

// ❌ Mauvais username
// Ce test vérifie que la connexion échoue si le username n'existe pas

test("should fail login with invalid username", async () => {
  const response = await request(app).post("/api/login").send({
    username: "nonexistentuser",
    password: "password123",
  });

  assert.strictEqual(response.statusCode, 401);
});

// ❌ Mauvais mot de passe
// Ce test vérifie que la connexion échoue si le mot de passe est incorrect

test("should fail login with wrong password", async () => {
  const response = await request(app).post("/api/login").send({
    username: "admin",
    password: "wrongpassword",
  });

  assert.strictEqual(response.statusCode, 401);
});

// ❌ Champs manquants
// Ce test vérifie que la connexion échoue si le username ou le password est manquant

test("should fail login with missing fields", async () => {
  const response = await request(app).post("/api/login").send({
    username: "admin",
    // pas de password
  });

  assert.strictEqual(response.statusCode, 400);
  assert.ok(response.body.error);
});
