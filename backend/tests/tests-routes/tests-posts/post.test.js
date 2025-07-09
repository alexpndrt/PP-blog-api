// posts.test.js

import { test } from "node:test";
import assert from "assert";
import request from "supertest";
import app from "../../../src/app.js";

let adminToken;
let userToken;
let createdPostId;

/*************************************
 * Connexion pour obtenir les tokens
 *************************************/

// Connexion avec un compte admin pour récupérer un token JWT
// Ce token sera utilisé pour les tests nécessitant des droits admin

test("should login as admin", async () => {
  const response = await request(app).post("/api/login").send({
    username: "admin",
    password: "admin",
  });
  adminToken = response.body.token;
  console.log("Admin token:", adminToken);
  assert.ok(adminToken);
});

// Connexion avec un compte user standard pour obtenir un token JWT
// Ce token permettra de tester les restrictions liées aux droits d'accès

test("should login as user", async () => {
  const response = await request(app).post("/api/login").send({
    username: "user",
    password: "user",
  });
  userToken = response.body.token;
  console.log("User token:", userToken);
  assert.ok(userToken);
});

/*************************************
 * Lecture des posts (GET)
 *************************************/

// Test lecture des posts avec un token valide (admin ou user)
// Doit retourner un tableau d'articles avec un status 200

test("should get posts with valid token", async () => {
  const res = await request(app)
    .get("/api/posts")
    .set("Authorization", `Bearer ${adminToken}`);
  assert.strictEqual(res.statusCode, 200);
  assert.ok(Array.isArray(res.body));
});

// Test lecture sans token → accès refusé 401

test("should fail to get posts without token", async () => {
  const res = await request(app).get("/api/posts");
  assert.strictEqual(res.statusCode, 401);
});

// Test lecture avec token invalide → accès refusé 401 - 403

test("should fail to get posts with invalid token", async () => {
  const res = await request(app)
    .get("/api/posts")
    .set("Authorization", `Bearer invalidtoken`);
  assert.ok([401, 403].includes(res.statusCode));
});

/*************************************
 * Création de post (POST)
 *************************************/

// Création d'un article avec un token admin → succès attendu (201)

test("should create post with admin token", async () => {
  const res = await request(app)
    .post("/api/posts")
    .set("Authorization", `Bearer ${adminToken}`)
    .send({ title: "Titre test", content: "Contenu test" });
  assert.strictEqual(res.statusCode, 201);
  assert.ok(res.body.id);
  createdPostId = res.body.id;
});

// Création sans token → refusé (401)

test("should fail to create post without token", async () => {
  const res = await request(app)
    .post("/api/posts")
    .send({ title: "T", content: "C" });
  assert.strictEqual(res.statusCode, 401);
});

// Création avec token non-admin → refusé (403)

test("should fail to create post with user token", async () => {
  const res = await request(app)
    .post("/api/posts")
    .set("Authorization", `Bearer ${userToken}`)
    .send({ title: "Titre", content: "Contenu" });
  assert.strictEqual(res.statusCode, 403);
});

// Création avec données manquantes → erreur 400

test("should fail to create post with missing data", async () => {
  const res = await request(app)
    .post("/api/posts")
    .set("Authorization", `Bearer ${adminToken}`)
    .send({ title: "" });
  assert.ok([400, 403].includes(res.statusCode));
});

/*************************************
 * Modification de post (PUT)
 *************************************/

// Modification d'un post existant avec token admin → succès (200)

test("should update post with admin token", async () => {
  const res = await request(app)
    .put(`/api/posts/${createdPostId}`)
    .set("Authorization", `Bearer ${adminToken}`)
    .send({ title: "Titre modifié", content: "Contenu modifié" });
  assert.strictEqual(res.statusCode, 200);
});

// Modification sans token → refusé (401)

test("should fail to update post without token", async () => {
  const res = await request(app)
    .put(`/api/posts/${createdPostId}`)
    .send({ title: "A", content: "B" });
  assert.strictEqual(res.statusCode, 401);
});

// Modification avec token non-admin → refusé (403)

test("should fail to update post with user token", async () => {
  const res = await request(app)
    .put(`/api/posts/${createdPostId}`)
    .set("Authorization", `Bearer ${userToken}`)
    .send({ title: "X", content: "Y" });
  assert.strictEqual(res.statusCode, 403);
});

// Modification d'un post inexistant → erreur 404

test("should fail to update non-existing post", async () => {
  const res = await request(app)
    .put(`/api/posts/99999`)
    .set("Authorization", `Bearer ${adminToken}`)
    .send({ title: "X", content: "Y" });
  assert.ok([404, 403].includes(res.statusCode));
});

/*************************************
 * Suppression de post (DELETE)
 *************************************/

// Suppression d'un post avec token admin → succès (200)

test("should delete post with admin token", async () => {
  const res = await request(app)
    .delete(`/api/posts/${createdPostId}`)
    .set("Authorization", `Bearer ${adminToken}`);
  assert.strictEqual(res.statusCode, 200);
});

// Suppression sans token → refusé (401)

test("should fail to delete post without token", async () => {
  const res = await request(app).delete(`/api/posts/${createdPostId}`);
  assert.strictEqual(res.statusCode, 401);
});

// Suppression avec token non-admin → refusé (403)

test("should fail to delete post with user token", async () => {
  const res = await request(app)
    .delete(`/api/posts/${createdPostId}`)
    .set("Authorization", `Bearer ${userToken}`);
  assert.strictEqual(res.statusCode, 403);
});

// Suppression d'un post inexistant → erreur 404

test("should fail to delete non-existing post", async () => {
  const res = await request(app)
    .delete(`/api/posts/99999`)
    .set("Authorization", `Bearer ${adminToken}`);
  assert.ok([404, 403].includes(res.statusCode));
});
