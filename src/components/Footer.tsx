import { Clock, Award } from "lucide-react";
import { siteConfig } from "@/lib/config";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-sky-100 bg-sky-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-sm text-sky-900 md:flex-row md:items-center md:justify-between">
        <p className="flex items-start gap-2">
          <Clock className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" />
          <span>
            <strong>Horarios:</strong> {siteConfig.hours}
          </span>
        </p>
        <p className="flex items-start gap-2">
          <Award className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" />
          <span>
            <strong>Matrícula:</strong> {siteConfig.license}
          </span>
        </p>
      </div>
    </footer>
  );
}
