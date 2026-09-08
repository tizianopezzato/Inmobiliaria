"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plus } from "lucide-react";
import { LogoutButton } from "@/components/admin/LogoutButton";
import { siteConfig } from "@/lib/config";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname.startsWith("/admin/login");

  if (isLogin) {
    return (
      <div className="flex min-h-screen items-center bg-sky-50 px-4">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sky-50">
      <header className="border-b border-sky-100 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-sky-500">
              Panel privado
            </p>
            <Link href="/admin" className="text-lg font-semibold text-sky-900">
              {siteConfig.name}
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/admin/propiedades/nueva"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sky-600 text-white hover:bg-sky-700"
              aria-label="Agregar propiedad"
            >
              <Plus className="h-5 w-5" />
            </Link>
            <LogoutButton />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  );
}
