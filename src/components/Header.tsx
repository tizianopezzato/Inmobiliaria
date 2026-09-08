"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { siteConfig } from "@/lib/config";

const navLink =
  "rounded-full px-3 py-2 text-sm font-medium text-sky-900 transition hover:bg-sky-100";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [propertiesOpen, setPropertiesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-sky-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-3 text-sky-800">
          <Image
            src="/logo.png"
            alt={`Logo de ${siteConfig.name}`}
            width={64}
            height={64}
            className="h-14 w-14 object-contain"
            priority
          />
          <span className="text-lg font-semibold tracking-tight">
            {siteConfig.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <Link
            href="/"
            className={`${navLink} ${pathname === "/" ? "bg-sky-100" : ""}`}
          >
            Inicio
          </Link>
          <div
            className="relative"
            onMouseEnter={() => setPropertiesOpen(true)}
            onMouseLeave={() => setPropertiesOpen(false)}
          >
            <Link
              href="/propiedades"
              className={`${navLink} inline-flex items-center gap-1 ${pathname.startsWith("/propiedades") ? "bg-sky-100" : ""}`}
            >
              Propiedades
              <ChevronDown className="h-4 w-4" />
            </Link>
            {propertiesOpen && (
              <div className="absolute left-0 top-full z-20 min-w-40 rounded-2xl border border-sky-100 bg-white p-2 shadow-lg">
                <Link
                  href="/propiedades/venta"
                  className="block rounded-xl px-3 py-2 text-sm text-sky-900 hover:bg-sky-50"
                >
                  Venta
                </Link>
                <Link
                  href="/propiedades/alquiler"
                  className="block rounded-xl px-3 py-2 text-sm text-sky-900 hover:bg-sky-50"
                >
                  Alquiler
                </Link>
              </div>
            )}
          </div>
          <Link
            href="/contacto"
            className={`${navLink} ${pathname.startsWith("/contacto") ? "bg-sky-100" : ""}`}
          >
            Contacto
          </Link>
        </nav>

        <button
          type="button"
          className="rounded-full p-2 text-sky-800 md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Abrir menú"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-sky-100 bg-white px-4 py-3 md:hidden">
          <Link href="/" className="block py-2 text-sky-900" onClick={() => setOpen(false)}>
            Inicio
          </Link>
          <Link
            href="/propiedades"
            className="block py-2 text-sky-900"
            onClick={() => setOpen(false)}
          >
            Propiedades
          </Link>
          <Link
            href="/propiedades/venta"
            className="block py-2 pl-4 text-sky-700"
            onClick={() => setOpen(false)}
          >
            Venta
          </Link>
          <Link
            href="/propiedades/alquiler"
            className="block py-2 pl-4 text-sky-700"
            onClick={() => setOpen(false)}
          >
            Alquiler
          </Link>
          <Link
            href="/contacto"
            className="block py-2 text-sky-900"
            onClick={() => setOpen(false)}
          >
            Contacto
          </Link>
        </div>
      )}
    </header>
  );
}
