import { useState } from "react";
import { MapPin, Award, FactoryIcon, Snowflake, ChevronRight, Images } from "lucide-react";
import type { TraceabilityResultPayload } from "../data/ritiFarmContent";
import ProductHeader from "./ProductHeader";
import ImageLightbox from "./ImageLightbox";

const ICONS = [MapPin, Award, FactoryIcon, Snowflake];

export default function TraceabilityDisplay({ product, items, gallery }: TraceabilityResultPayload) {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-white px-6 py-14">
      <div className="mx-auto max-w-5xl">
        <ProductHeader product={product} />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {items.map((item, idx) => {
            const Icon = ICONS[idx % ICONS.length];
            const clickable = Boolean(item.imageUrl);
            return (
              <button
                key={item.label}
                onClick={() => item.imageUrl && setLightbox(item.imageUrl)}
                disabled={!clickable}
                className={[
                  "animate-fade-in-up flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition",
                  clickable ? "cursor-pointer hover:-translate-y-0.5 hover:shadow-lg" : "cursor-default",
                ].join(" ")}
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
                    {item.label}
                  </p>
                  <p className="mt-1 text-sm text-slate-700">{item.value}</p>
                  {clickable && (
                    <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
                      {item.actionLabel}
                      <ChevronRight className="h-3.5 w-3.5" />
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {gallery.length > 0 && (
          <div className="mt-10">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Images className="h-4 w-4 text-emerald-600" />
              Hình ảnh vùng trồng & quy trình chế biến
            </div>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
              {gallery.map((src) => (
                <button
                  key={src}
                  onClick={() => setLightbox(src)}
                  className="aspect-square overflow-hidden rounded-xl border border-slate-200 transition hover:opacity-80"
                >
                  <img src={src} alt="Quy trình Riti Farm" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {lightbox && (
        <ImageLightbox imageUrl={lightbox} alt={product.name} onClose={() => setLightbox(null)} />
      )}
    </div>
  );
}
