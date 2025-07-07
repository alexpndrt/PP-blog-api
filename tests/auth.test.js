import { test } from "node:test";
import assert from "assert";
import request from "supertest";
import app from "../src/app.js";

// Login

test("should login successfully with valid credentials", async () => {
  const response = await request(app).post("/api/login").send({
    username: "admin",
    password: "admin123",
  });

  assert.strictEqual(response.statusCode, 200);
  assert.ok(response.body.token);
});

test("should fail login with invalid credentials", async () => {
  const response = await request(app).post("/api/login").send({
    username: "wronguser",
    password: "wrongpass",
  });

  assert.strictEqual(response.statusCode, 401);
});

// Register

test("should register a new user successfully", async () => {
  const uniqueUsername = `user_${Date.now()}`; // garantit un username unique à chaque test

  const response = await request(app).post("/api/register").send({
    username: uniqueUsername,
    password: "password123",
    roleId: 2,
  });

  assert.strictEqual(response.statusCode, 201);
  assert.ok(response.body.user);
  assert.strictEqual(response.body.user.username, uniqueUsername);
});

test("should fail to register with an existing username", async () => {
  const response = await request(app).post("/api/register").send({
    username: "admin", // 🔑 username déjà existant dans ta base
    password: "anyPassword",
    roleId: 2,
  });

  assert.strictEqual(response.statusCode, 400); // ou 409 si tu veux être plus RESTful
  assert.ok(response.body.error);
});
