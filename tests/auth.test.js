import { test } from 'node:test';
import assert from 'assert';
import request from 'supertest';
import app from '../src/app.js';

test('should login successfully with valid credentials', async () => {
  const response = await request(app)
    .post('/api/login')
    .send({
      username: 'admin',
      password: 'admin123'
    });

  assert.strictEqual(response.statusCode, 200);
  assert.ok(response.body.token);
});

test('should fail login with invalid credentials', async () => {
  const response = await request(app)
    .post('/api/login')
    .send({
      username: 'wronguser',
      password: 'wrongpass'
    });

  assert.strictEqual(response.statusCode, 401);
});
