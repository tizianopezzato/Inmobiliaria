import Link from "next/link";
import { LoginForm } from "@/components/admin/LoginForm";

export default function AdminLoginPage() {
  return (
    <div className="mx-auto max-w-md rounded-3xl bg-white p-8 shadow-sm">
      <h1 className="text-2xl font-semibold text-sky-950">Ingresar al panel</h1>
      <p className="mt-2 text-sm text-sky-700">
        Solo el martillero puede acceder con su usuario y contraseña de
        Supabase.
      </p>
      <LoginForm />
      <Link
        href="/"
        className="mt-6 inline-block text-sm text-sky-700 hover:text-sky-900"
      >
        Volver al sitio
      </Link>
    </div>
  );
}
