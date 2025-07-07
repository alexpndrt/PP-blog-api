BEGIN;

-- Suppression des tables existantes
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS roles CASCADE;

-- Création de la table des rôles
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

-- Insertion des rôles
INSERT INTO roles (name) VALUES ('admin'), ('user');

-- Création de la table des utilisateurs avec roleId (casse respectée)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    "roleId" INTEGER REFERENCES roles(id),
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Création de la table des articles avec userId
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    "userId" INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Insertion de données fictives dans users
INSERT INTO users (username, password, "roleId", "createdAt", "updatedAt") VALUES
('admin', '$argon2id$v=19$m=65536,t=3,p=4$seGDSPb1D9rv2rATew+5AQ$AhW9UgL6JAwl95iqb0JyZaBHUJkew3FCFKrhdQzkUZI', 1, NOW(), NOW()),
('user', '$argon2id$v=19$m=65536,t=3,p=4$jnG3vblJ1SWQw+9Yxoh0Zg$/wS8O5j+GGtyiYxjaLlggYmhDaCbxMqMqWyqMvMGeuY', 2, NOW(), NOW()),
('user1', '$argon2id$v=19$m=65536,t=3,p=4$iZA/A99uRWa5cxhCXk72jA$YGFu2UIv+rapzKAGFY8p/ImBezg3m7NjEiKB//UV7vw', 2, NOW(), NOW()),
('user2', '$argon2id$v=19$m=65536,t=3,p=4$nFneYOWrvI9VbrVp7lCmuA$sLM2ejVjcLEZn9xWh9zqXVtcQrNVOeJnUe6YvMLCiAM', 2, NOW(), NOW()),
('user3', '$argon2id$v=19$m=65536,t=3,p=4$eK9bYxoc66vl+ooBbpczWw$YsD16WxP6Zk7MfByp20EDY4Jekl2L8vP6ofgNvDFR2E', 2, NOW(), NOW());

-- Insertion de données fictives dans posts
INSERT INTO posts (title, content, "userId", "createdAt", "updatedAt") VALUES
('Premier article de admin', 'Contenu du premier article pour test.', 1, NOW(), NOW()),
('Deuxième article de admin', 'Un second article pour nos tests.', 1, NOW(), NOW()),
('Troisieme article de user1', 'Un second article pour nos tests.', 2, NOW(), NOW()),
('Quatrieme article de user2', 'Un second article pour nos tests.', 3, NOW(), NOW());

COMMIT;
