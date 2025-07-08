// 📂 tests/tests-non-regression/cycle-crud.test.js

import test from "node:test";
import assert from "assert";
import request from "supertest";
import app from "../../src/app.js";

// 👉 Remplacer par un vrai token admin valide
const adminToken =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInJvbGVJZCI6MSwiaWF0IjoxNzUxOTc1MDQxLCJleHAiOjE3NTE5ODIyNDF9.6i-oI7BZlkIjeZMBK2YQJPWc5-8j9kfkcBO8W_bRBp4";

let createdPostId = null;

// 🔄 Étape 1 : Créer un article
test("should create a new post", async () => {
  const res = await request(app)
    .post("/api/posts")
    .set("Authorization", adminToken)
    .send({ title: "Test Title", content: "Test Content" });
  assert.strictEqual(res.statusCode, 201);
  createdPostId = res.body.id;
  assert.ok(createdPostId);
});

// 🔄 Étape 2 : Lire l'article
test("should retrieve the created post", async () => {
  const res = await request(app)
    .get(`/api/posts/${createdPostId}`)
    .set("Authorization", adminToken);
  assert.strictEqual(res.statusCode, 200);
  assert.strictEqual(res.body.title, "Test Title");
});

// 🔄 Étape 3 : Modifier l'article
test("should update the post", async () => {
  const res = await request(app)
    .put(`/api/posts/${createdPostId}`)
    .set("Authorization", adminToken)
    .send({ title: "Updated Title", content: "Updated Content" });
  assert.strictEqual(res.statusCode, 200);
  assert.strictEqual(res.body.title, "Updated Title");
});

// 🔄 Étape 4 : Supprimer l'article
test("should delete the post", async () => {
  const res = await request(app)
    .delete(`/api/posts/${createdPostId}`)
    .set("Authorization", adminToken);
  assert.strictEqual(res.statusCode, 200);
});
