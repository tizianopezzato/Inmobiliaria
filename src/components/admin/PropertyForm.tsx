"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { LoaderCircle, Trash2, Upload } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { getImagePublicUrl } from "@/lib/images";
import type { Property, PropertyFormValues, PropertyType } from "@/lib/types";

function sanitizeFileName(name: string) {
  return name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
}

export function PropertyForm({ property }: { property?: Property }) {
  const router = useRouter();
  const supabase = createClient();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState(
    property?.property_images ?? [],
  );
  const [values, setValues] = useState<PropertyFormValues>({
    type: property?.type ?? "venta",
    property_type: property?.property_type ?? "casa",
    title: property?.title ?? "",
    description: property?.description ?? "",
    square_meters: property?.square_meters ?? 0,
    bedrooms: property?.bedrooms ?? 0,
    bathrooms: property?.bathrooms ?? 0,
    garage: property?.garage ?? false,
    is_rented: property?.is_rented ?? false,
    is_sold: property?.is_sold ?? false,
  });

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      const payload = {
        type: values.type,
        property_type: values.property_type,
        title: values.title.trim(),
        description: values.description.trim(),
        square_meters: property?.square_meters ?? 0,
        bedrooms: Number(values.bedrooms),
        bathrooms: Number(values.bathrooms),
        garage: values.garage,
        is_rented: values.is_rented,
        is_sold: values.is_sold,
      };

      let propertyId = property?.id;

      if (propertyId) {
        const { error: updateError } = await supabase
          .from("properties")
          .update(payload)
          .eq("id", propertyId);
        if (updateError) throw updateError;
      } else {
        const { data, error: insertError } = await supabase
          .from("properties")
          .insert(payload)
          .select("id")
          .single();
        if (insertError) throw insertError;
        propertyId = data.id;
      }

      const startOrder = existingImages.length;
      for (const [index, file] of newFiles.entries()) {
        const path = `${propertyId}/${Date.now()}-${index}-${sanitizeFileName(file.name)}`;
        const { error: uploadError } = await supabase.storage
          .from("property-images")
          .upload(path, file);
        if (uploadError) throw uploadError;

        const { error: imageError } = await supabase.from("property_images").insert({
          property_id: propertyId,
          storage_path: path,
          is_main: existingImages.length === 0 && index === 0,
          sort_order: startOrder + index,
        });
        if (imageError) throw imageError;
      }

      router.push("/admin");
      router.refresh();
    } catch (err) {
      console.error(err);
      setError(
        "No se pudo guardar la propiedad. Revisá que estés logueado y que Supabase esté configurado.",
      );
      setSaving(false);
    }
  }

  async function removeExistingImage(imageId: string, storagePath: string) {
    const { error: storageError } = await supabase.storage
      .from("property-images")
      .remove([storagePath]);
    if (storageError) {
      setError("No se pudo borrar la imagen.");
      return;
    }
    await supabase.from("property_images").delete().eq("id", imageId);
    setExistingImages((images) => images.filter((image) => image.id !== imageId));
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6 rounded-3xl bg-white p-6 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm font-medium text-sky-900">
          Propiedad
          <select
            required
            value={values.type}
            onChange={(event) =>
              setValues((current) => ({
                ...current,
                type: event.target.value as PropertyType,
              }))
            }
            className="mt-1 w-full rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3"
          >
            <option value="venta">Venta</option>
            <option value="alquiler">Alquiler</option>
          </select>
        </label>
        
        <label className="block text-sm font-medium text-sky-900">
          Tipo
          <select
            required
            value={values.property_type ?? "casa"}
            onChange={(event) =>
              setValues((current) => ({
                ...current,
                property_type: event.target.value,
              }))
            }
            className="mt-1 w-full rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3"
          >
            <option value="lote">Lote</option>
            <option value="dpto">Dpto</option>
            <option value="casa">Casa</option>
            <option value="local">Local</option>
            <option value="campo">Campo</option>
            <option value="cochera">Cochera</option>
            <option value="quinta">Quinta</option>
          </select>
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm font-medium text-sky-900">
          Título
          <input
            required
            value={values.title}
            onChange={(event) =>
              setValues((current) => ({ ...current, title: event.target.value }))
            }
            className="mt-1 w-full rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3"
          />
        </label>

        <div className="flex flex-col gap-3 pt-6">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={values.is_rented}
              onChange={(event) =>
                setValues((current) => ({ ...current, is_rented: event.target.checked }))
              }
              className="h-5 w-5 rounded border-sky-300 text-sky-600 focus:ring-sky-500"
            />
            <span className="text-sm font-medium text-sky-900">¿Propiedad Alquilada?</span>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={values.is_sold}
              onChange={(event) =>
                setValues((current) => ({ ...current, is_sold: event.target.checked }))
              }
              className="h-5 w-5 rounded border-sky-300 text-sky-600 focus:ring-sky-500"
            />
            <span className="text-sm font-medium text-sky-900">¿Propiedad Vendida?</span>
          </label>
        </div>
      </div>

      <label className="block text-sm font-medium text-sky-900">
        Descripción
        <textarea
          required
          rows={6}
          value={values.description}
          onChange={(event) =>
            setValues((current) => ({
              ...current,
              description: event.target.value,
            }))
          }
          className="mt-1 w-full rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3"
        />
      </label>

      <div className="grid gap-4 md:grid-cols-3">
        <label className="block text-sm font-medium text-sky-900">
          Habitaciones
          <input
            required
            type="number"
            min={0}
            value={values.bedrooms}
            onChange={(event) =>
              setValues((current) => ({
                ...current,
                bedrooms: Number(event.target.value),
              }))
            }
            className="mt-1 w-full rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3"
          />
        </label>
        <label className="block text-sm font-medium text-sky-900">
          Baños
          <input
            required
            type="number"
            min={0}
            value={values.bathrooms}
            onChange={(event) =>
              setValues((current) => ({
                ...current,
                bathrooms: Number(event.target.value),
              }))
            }
            className="mt-1 w-full rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3"
          />
        </label>
        <label className="block text-sm font-medium text-sky-900">
          Cochera
          <select
            value={values.garage ? "si" : "no"}
            onChange={(event) =>
              setValues((current) => ({
                ...current,
                garage: event.target.value === "si",
              }))
            }
            className="mt-1 w-full rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3"
          >
            <option value="si">Sí</option>
            <option value="no">No</option>
          </select>
        </label>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-sky-900">Imágenes</p>
        {existingImages.length > 0 && (
          <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4">
            {existingImages.map((image) => (
              <div
                key={image.id}
                className="relative overflow-hidden rounded-2xl border border-sky-100"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getImagePublicUrl(image.storage_path)}
                  alt=""
                  className="h-28 w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeExistingImage(image.id, image.storage_path)}
                  className="absolute right-2 top-2 rounded-full bg-white p-1 text-sky-800"
                  aria-label="Eliminar imagen"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-sky-200 bg-sky-50 px-4 py-8 text-sky-700">
          <Upload className="mb-2 h-6 w-6" />
          <span>Subir imágenes</span>
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(event) =>
              setNewFiles(Array.from(event.target.files ?? []))
            }
          />
        </label>
        {newFiles.length > 0 && (
          <p className="mt-2 text-sm text-sky-700">
            {newFiles.length} archivo(s) listo(s) para subir.
          </p>
        )}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={saving}
        className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-6 py-3 font-semibold text-white hover:bg-sky-700 disabled:opacity-70"
      >
        {saving && <LoaderCircle className="h-4 w-4 animate-spin" />}
        {property ? "Guardar cambios" : "Publicar propiedad"}
      </button>
    </form>
  );
}