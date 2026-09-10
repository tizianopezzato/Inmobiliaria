"use client";

import { useState, FormEvent } from "react";
import { MessageCircle, X } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function ContactModal({ 
  defaultType = "General", 
  buttonLabel, 
  className = "" 
}: { 
  defaultType?: string; 
  buttonLabel: string; 
  className?: string; 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mail, setMail] = useState("");
  const [tipoConsulta, setTipoConsulta] = useState(defaultType);
  const [consulta, setConsulta] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const mailText = mail ? ` Mail: ${mail}.` : "";
    const message = `Hola, mi nombre es ${nombre} ${apellido}. Tel: ${telefono}.${mailText} Motivo: ${tipoConsulta}. Consulta: ${consulta}`;
    const url = buildWhatsAppUrl(message);
    window.open(url, "_blank");
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`inline-flex items-center justify-center gap-2 rounded-full bg-sky-600 px-6 py-3 font-semibold text-white transition hover:bg-sky-700 ${className}`}
      >
        <MessageCircle className="h-5 w-5" />
        {buttonLabel}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 text-sky-900 hover:text-sky-700"
            >
              <X className="h-6 w-6" />
            </button>
            <h3 className="mb-1 text-xl font-bold text-sky-950">Completá tus datos</h3>
            <p className="mb-5 text-sm text-sky-700">Te responderemos por WhatsApp a la brevedad.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-sky-900">Nombre</label>
                  <input
                    type="text"
                    required
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="w-full rounded-2xl border border-sky-100 bg-sky-50 px-4 py-2.5 text-sm text-sky-900 outline-none focus:border-sky-400"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-sky-900">Apellido</label>
                  <input
                    type="text"
                    required
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                    className="w-full rounded-2xl border border-sky-100 bg-sky-50 px-4 py-2.5 text-sm text-sky-900 outline-none focus:border-sky-400"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-sky-900">Teléfono</label>
                <input
                  type="tel"
                  required
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  className="w-full rounded-2xl border border-sky-100 bg-sky-50 px-4 py-2.5 text-sm text-sky-900 outline-none focus:border-sky-400"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-sky-900">Correo Electrónico (Opcional)</label>
                <input
                  type="email"
                  value={mail}
                  onChange={(e) => setMail(e.target.value)}
                  className="w-full rounded-2xl border border-sky-100 bg-sky-50 px-4 py-2.5 text-sm text-sky-900 outline-none focus:border-sky-400"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-sky-900">Motivo de consulta</label>
                <select
                  value={tipoConsulta}
                  onChange={(e) => setTipoConsulta(e.target.value)}
                  className="w-full rounded-2xl border border-sky-100 bg-sky-50 px-4 py-2.5 text-sm text-sky-900 outline-none focus:border-sky-400"
                >
                  <option value="Alquiler">Alquiler</option>
                  <option value="Venta">Venta</option>
                  <option value="Tasación">Tasación</option>
                  <option value="General">General</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-sky-900">Consulta</label>
                <textarea
                  required
                  rows={3}
                  value={consulta}
                  onChange={(e) => setConsulta(e.target.value)}
                  className="w-full rounded-2xl border border-sky-100 bg-sky-50 px-4 py-2.5 text-sm text-sky-900 outline-none focus:border-sky-400"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-2xl bg-sky-600 px-4 py-3 font-semibold text-white transition hover:bg-sky-700"
              >
                Enviar por WhatsApp
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}