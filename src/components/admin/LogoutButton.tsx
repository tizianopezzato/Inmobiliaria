import { logoutAction } from "@/lib/actions";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-full border border-sky-200 px-4 py-2 text-sm font-medium text-sky-800 hover:bg-sky-50"
      >
        <LogOut className="h-4 w-4" />
        Cerrar sesión
      </button>
    </form>
  );
}
