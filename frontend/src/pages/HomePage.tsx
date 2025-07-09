// 🏠 HomePage.tsx ➔ Page d'accueil avec présentation du blog

import Header from "../components/Header";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="flex flex-col items-center justify-center h-[80vh] text-center px-4">
        <h2 className="text-3xl font-bold mb-4">Bienvenue sur Mon Blog</h2>
        <p className="max-w-2xl text-lg text-gray-700">
          Partagez et découvrez des articles passionnants sur divers sujets.
          Connectez-vous ou inscrivez-vous pour rejoindre la communauté !
        </p>
      </main>
    </div>
  );
}
