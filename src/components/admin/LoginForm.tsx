"use client";

import { useActionState } from "react";
import { loginAction } from "@/lib/actions";

export function LoginForm() {
  const [error, formAction, pending] = useActionState(loginAction, "");

  return (
    <form action={formAction} className="mt-6 space-y-4">
      <label className="block text-sm font-medium text-sky-900">
        Email
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          className="mt-1 w-full rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3"
        />
      </label>
      <label className="block text-sm font-medium text-sky-900">
        Contraseña
        <input
          type="password"
          name="password"
          required
          autoComplete="current-password"
          className="mt-1 w-full rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3"
        />
      </label>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-sky-600 py-3 font-semibold text-white hover:bg-sky-700 disabled:opacity-70"
      >
        {pending ? "Ingresando..." : "Entrar"}
      </button>
    </form>
  );
}
