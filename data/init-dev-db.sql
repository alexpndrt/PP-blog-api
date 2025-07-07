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
INSERT INTO roles (id, name) VALUES (1, 'admin'), (2, 'user');

-- Création de la table des utilisateurs avec roleId (casse respectée)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    "roleId" INTEGER NOT NULL REFERENCES roles(id),
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
INSERT INTO users (id, username, password, "roleId", "createdAt", "updatedAt") VALUES
(1, 'admin', '$argon2id$v=19$m=65536,t=3,p=4$rlv+bvDwraIm5pzCdBc9gQ$RyfPPfgJkajZqVPnyIZErOHG/eYoxbmF3X20FqRhO6U', 1, NOW(), NOW()),
(2, 'user1', '$argon2id$v=19$m=65536,t=3,p=4$e4IABy8dAXPBrz3lkCRM0g$SZcpPaCvLTkjvcj5PiVuVTg6RXeod1eV9R70WLAUirU', 2, NOW(), NOW()),
(3, 'user2', '$argon2id$v=19$m=65536,t=3,p=4$6GTiyecSrmDySVfY4W6oJg$jj4GFQtN2FB49h+gg+FUu2NI9iyXsBCwH9PD+1eOTak', 2, NOW(), NOW());

-- Insertion de données fictives dans posts
INSERT INTO posts (title, content, "userId", "createdAt", "updatedAt") VALUES
('Premier article de admin', 'Contenu du premier article pour test.', 1, NOW(), NOW()),
('Deuxième article de admin', 'Un second article pour nos tests.', 1, NOW(), NOW()),
('Troisieme article de user1', 'Un second article pour nos tests.', 2, NOW(), NOW()),
('Quatrieme article de user2', 'Un second article pour nos tests.', 3, NOW(), NOW());

COMMIT;
