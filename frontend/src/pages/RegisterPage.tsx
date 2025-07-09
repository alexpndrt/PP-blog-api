// ✅ src/pages/RegisterPage.tsx
// ➔ Page Inscription avec Header et formulaire centré

import Header from "../components/Header";
import RegisterForm from "../components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="flex items-center justify-center min-h-[80vh]">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-center">Inscription</h2>
          <RegisterForm />
        </div>
      </main>
    </div>
  );
}
