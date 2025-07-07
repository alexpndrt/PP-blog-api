BEGIN;

-- Suppression des tables si elles existent déjà
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Création de la table des utilisateurs
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'user',
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Création de la table des posts
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Insertion de données fictives dans users (mots de passe en clair pour le DEV uniquement)
INSERT INTO users (username, password, role, "createdAt", "updatedAt") VALUES
('admin', '$argon2id$v=19$m=65536,t=3,p=4$rlv+bvDwraIm5pzCdBc9gQ$RyfPPfgJkajZqVPnyIZErOHG/eYoxbmF3X20FqRhO6U', 'admin', NOW(), NOW()),
('user1', '$argon2id$v=19$m=65536,t=3,p=4$e4IABy8dAXPBrz3lkCRM0g$SZcpPaCvLTkjvcj5PiVuVTg6RXeod1eV9R70WLAUirU', 'user', NOW(), NOW()),
('user2', '$argon2id$v=19$m=65536,t=3,p=4$6GTiyecSrmDySVfY4W6oJg$jj4GFQtN2FB49h+gg+FUu2NI9iyXsBCwH9PD+1eOTak', 'user', NOW(), NOW());

-- Insertion de données fictives dans posts
INSERT INTO posts (title, content, "createdAt", "updatedAt") VALUES
('Premier article', 'Contenu du premier article pour test.', NOW(), NOW()),
('Deuxième article', 'Un second article pour nos tests.', NOW(), NOW());

COMMIT;
