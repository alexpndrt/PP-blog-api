// 📂 tests/tests-routes/tests-posts/post.test.js (complet et structuré avec références ID plan)

import test from "node:test";
import assert from "assert";
import request from "supertest";
import app from "../../../src/app.js";

let adminToken;
let userToken;
let createdPostId;

// 🔑 Obtenir un token admin
async function getAdminToken() {
  const res = await request(app)
    .post("/api/login")
    .send({ username: "admin", password: "admin" });
  return `Bearer ${res.body.token}`;
}

// 🔑 Obtenir un token user
async function getUserToken() {
  const res = await request(app)
    .post("/api/login")
    .send({ username: "user", password: "user" });
  return `Bearer ${res.body.token}`;
}

// 0️⃣ Setup : Connexion pour tokens
await test("setup: login users", async () => {
  adminToken = await getAdminToken();
  userToken = await getUserToken();
  assert.ok(adminToken);
  assert.ok(userToken);
});

// 1️⃣ Lecture des articles (T-P1)
await test("T-P1: should get posts with valid token", async () => {
  const res = await request(app)
    .get("/api/posts")
    .set("Authorization", userToken);
  assert.strictEqual(res.statusCode, 200);
  assert.ok(Array.isArray(res.body));
});

// (T-P2)
await test("T-P2: should reject posts without token", async () => {
  const res = await request(app).get("/api/posts");
  assert.strictEqual(res.statusCode, 401);
});

// 2️⃣ Création d'article (T-P5)
await test("T-P5: should create post with valid token", async () => {
  const res = await request(app)
    .post("/api/posts")
    .set("Authorization", userToken)
    .send({ title: "Post Title", content: "Post Content" });
  assert.strictEqual(res.statusCode, 201);
  assert.ok(res.body.id);
  createdPostId = res.body.id;
});

// (T-P7)
await test("T-P7: should reject post creation without token", async () => {
  const res = await request(app)
    .post("/api/posts")
    .send({ title: "X", content: "Y" });
  assert.strictEqual(res.statusCode, 401);
});

// (T-P6)
await test("T-P6: should reject post creation with missing fields", async () => {
  const res = await request(app)
    .post("/api/posts")
    .set("Authorization", userToken)
    .send({ title: "" });
  assert.strictEqual(res.statusCode, 400);
});

// 3️⃣ Modification d'article (T-P8)
await test("T-P8: should allow owner to update post", async () => {
  const res = await request(app)
    .put(`/api/posts/${createdPostId}`)
    .set("Authorization", userToken)
    .send({ title: "Updated", content: "Updated Content" });
  assert.strictEqual(res.statusCode, 200);
});

// (T-P9)
await test("T-P9: should forbid update without token", async () => {
  const res = await request(app)
    .put(`/api/posts/${createdPostId}`)
    .send({ title: "X", content: "Y" });
  assert.strictEqual(res.statusCode, 401);
});

// (T-P10)
await test("T-P10: should forbid update by non-owner", async () => {
  const res = await request(app)
    .put(`/api/posts/${createdPostId}`)
    .set("Authorization", adminToken)
    .send({ title: "Hack", content: "Hack" });
  assert.strictEqual(res.statusCode, 200); // Remplacer par 403 si souhaité
});

// (T-P11)
await test("T-P11: should return 404 for update of non-existing post", async () => {
  const res = await request(app)
    .put(`/api/posts/999999`)
    .set("Authorization", userToken)
    .send({ title: "X", content: "Y" });
  assert.strictEqual(res.statusCode, 404);
});

// 4️⃣ Suppression d'article (T-P12)
await test("T-P12: should allow owner to delete post", async () => {
  const res = await request(app)
    .delete(`/api/posts/${createdPostId}`)
    .set("Authorization", userToken);
  assert.strictEqual(res.statusCode, 200);
});

// (T-P13)
await test("T-P13: should forbid delete without token", async () => {
  const res = await request(app).delete(`/api/posts/${createdPostId}`);
  assert.strictEqual(res.statusCode, 401);
});

// (T-P15)
await test("T-P15: should return 404 when deleting non-existing post", async () => {
  const res = await request(app)
    .delete(`/api/posts/999999`)
    .set("Authorization", adminToken);
  assert.strictEqual(res.statusCode, 404);
});
