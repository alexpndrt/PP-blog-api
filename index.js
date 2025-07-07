import express from "express";
import dotenv from "dotenv";
import { sequelize } from "./src/config/database.js";
import postRoutes from "./src/routes/postRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(errorHandler);

app.use("/api/posts", postRoutes);

app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API Blog 🚀");
});

sequelize
  .sync()
  .then(() => console.log("✅ Base de données synchronisée"))
  .catch((error) => console.error("❌ Erreur de synchronisation:", error));

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
