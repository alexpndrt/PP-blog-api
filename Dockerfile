# 1️⃣ Utilisation de l'image officielle Node.js
FROM node:20

# 2️⃣ Création du dossier de travail dans le container
WORKDIR /app

# 3️⃣ Copie des fichiers package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

RUN npm install

# 4️⃣ Copie du reste du projet dans le container
COPY . .

# 5️⃣ Exposer le port (doit correspondre au port de ton app)
EXPOSE 3000

# 6️⃣ Commande pour démarrer l’application
CMD ["npm", "run", "dev"]
