"use client";

import { Trash2 } from "lucide-react";
import { deletePropertyAction } from "@/lib/actions";

export function DeletePropertyButton({ id }: { id: string }) {
  return (
    <form
      action={deletePropertyAction}
      onSubmit={(event) => {
        if (!window.confirm("¿Eliminar esta propiedad?")) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="inline-flex items-center gap-1 rounded-full bg-red-50 px-4 py-2 text-sm font-medium text-red-700"
      >
        <Trash2 className="h-4 w-4" />
        Eliminar
      </button>
    </form>
  );
}
