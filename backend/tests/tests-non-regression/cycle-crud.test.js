// 📂 tests/tests-non-regression/cycle-crud.test.js

import test from "node:test";
import assert from "assert";
import request from "supertest";
import app from "../../src/app.js";

// 👉 Remplacer par un vrai token admin valide
let adminToken = null;
let createdPostId = null;

// Fonction pour obtenir un vrai token avant les tests
async function getAdminToken() {
  const res = await request(app)
    .post("/api/login")
    .send({ username: "admin", password: "admin" }); // Remplace par ton vrai login si besoin

  return `Bearer ${res.body.token}`;
}

test("setup: login as admin", async () => {
  adminToken = await getAdminToken();
  assert.ok(adminToken);
});

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
