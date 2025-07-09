// 📂 tests/tests-non-regression/cycle-crud.test.js

import test from "node:test";
import assert from "assert";
import request from "supertest";
import app from "../../src/app.js";

// Initialisation des variables globales
let adminToken = null;
let createdPostId = null;

// 🔑 Fonction pour obtenir un vrai token admin
async function getAdminToken() {
  const res = await request(app)
    .post("/api/login")
    .send({ username: "admin", password: "admin" }); // Remplace si besoin
  return `Bearer ${res.body.token}`;
}

// 🚀 Étape 0 : Connexion admin
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
  assert.ok(res.body.id);
  createdPostId = res.body.id;
});

// 🔄 Étape 2 : Lire l'article
test("should retrieve the created post", async () => {
  const res = await request(app)
    .get(`/api/posts/${createdPostId}`)
    .set("Authorization", adminToken);

  assert.strictEqual(res.statusCode, 200);
  assert.strictEqual(res.body.title, "Test Title");
  assert.strictEqual(res.body.content, "Test Content");
});

// 🔄 Étape 3 : Modifier l'article
test("should update the post", async () => {
  const res = await request(app)
    .put(`/api/posts/${createdPostId}`)
    .set("Authorization", adminToken)
    .send({ title: "Updated Title", content: "Updated Content" });

  assert.strictEqual(res.statusCode, 200);
  assert.strictEqual(res.body.post.title, "Updated Title");  // 🔑 res.body.post
});

// 🔄 Étape 4 : Supprimer l'article
test("should delete the post", async () => {
  const res = await request(app)
    .delete(`/api/posts/${createdPostId}`)
    .set("Authorization", adminToken);

  assert.strictEqual(res.statusCode, 200);
});
