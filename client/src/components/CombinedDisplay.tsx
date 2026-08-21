import { useState } from "react";
import {
  MapPin,
  Award,
  FactoryIcon,
  Snowflake,
  Images,
  Scroll,
  ShieldCheck,
  MapPinned,
  Sparkles,
  ZoomIn,
} from "lucide-react";
import type { CombinedResultPayload } from "../data/ritiFarmContent";
import ImageLightbox from "./ImageLightbox";
import { API_BASE_URL } from "../signalr/connection";

const TRACE_ICONS = [MapPin, Award, FactoryIcon, Snowflake];

// Nhãn cho từng bước trong timeline quy trình chế biến (9 ảnh)
const PROCESS_STEP_LABELS = [
  "Gieo trồng",
  "Chăm sóc",
  "Thu hoạch",
  "Phân loại",
  "Rửa sạch",
  "Sấy lạnh",
  "Kiểm tra CL",
  "Đóng gói",
  "Thành phẩm",
];



export default function CombinedDisplay({
  product,
  items,
  gallery,
  cards,
  scanImageUrl,
}: CombinedResultPayload) {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-white">
      {/* ========== PRODUCT HEADER (giống ProductHeader.tsx) ========== */}
      <div className="px-6 pt-14 pb-10">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
            <ShieldCheck className="h-3.5 w-3.5" />
            {product.verifiedBy}
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-2 text-slate-500">{product.tagline}</p>

          {scanImageUrl && (
            <button
              onClick={() => setLightbox(`${API_BASE_URL}${scanImageUrl}`)}
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-1.5 text-xs font-medium text-emerald-700 shadow-sm transition hover:bg-emerald-50"
            >
              <img
                src={`${API_BASE_URL}${scanImageUrl}`}
                alt="Scan"
                className="h-5 w-5 rounded-full object-cover border border-emerald-300"
              />
              Xem ảnh đã quét
            </button>
          )}
        </div>
      </div>

      {/* ========== Phần 1: TRUY XUẤT NGUỒN GỐC ========== */}
      <section id="traceability" className="px-6 pb-14">
        <div className="mx-auto max-w-5xl">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
              <MapPinned className="h-5 w-5" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
                Phần 1
              </span>
              <h2 className="text-lg font-bold text-slate-900">Truy xuất nguồn gốc & Sản xuất</h2>
            </div>
            <span className="ml-auto hidden items-center gap-1.5 text-xs text-slate-400 sm:inline-flex">
              <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
              Dữ liệu minh bạch 100%
            </span>
          </div>

          {/* 4 card hàng ngang */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {items.map((item, idx) => {
              const Icon = TRACE_ICONS[idx % TRACE_ICONS.length];
              return (
                <div
                  key={item.label}
                  className="animate-fade-in-up group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* Ảnh */}
                  {item.imageUrl && (
                    <button
                      onClick={() => setLightbox(item.imageUrl!)}
                      className="relative overflow-hidden bg-gradient-to-b from-emerald-50/80 to-slate-50 p-3"
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.actionLabel}
                        className="mx-auto h-36 w-full rounded-xl object-contain drop-shadow-sm"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-emerald-900/0 transition-all duration-300 group-hover:bg-emerald-900/15">
                        <span className="flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-semibold text-emerald-700 opacity-0 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 scale-90">
                          <ZoomIn className="h-3 w-3" />
                          Phóng to
                        </span>
                      </div>
                    </button>
                  )}

                  {/* Thông tin */}
                  <div className="flex flex-1 flex-col border-t border-slate-100 p-3">
                    <div className="flex items-start gap-2">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-bold uppercase tracking-wide text-emerald-600">
                          {item.label}
                        </p>
                        <p className="mt-0.5 text-[11px] leading-snug text-slate-600 line-clamp-3">{item.value}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>


          {/* Gallery – Timeline quy trình chế biến */}
          {gallery.length > 0 && (
            <div className="mt-10">
              <div className="mb-5 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Images className="h-4 w-4 text-emerald-600" />
                Quy trình canh tác & chế biến
              </div>

              <div className="overflow-x-auto pb-4 -mx-6 px-6">
                <div className="flex items-start" style={{ minWidth: `${gallery.length * 160}px` }}>
                  {gallery.map((src, idx) => {
                    const isLast = idx === gallery.length - 1;
                    const label = PROCESS_STEP_LABELS[idx] ?? `Bước ${idx + 1}`;
                    return (
                      <div key={idx} className="flex flex-col items-center" style={{ width: 160 }}>
                        {/* Đường nối + số bước */}
                        <div className="flex w-full items-center">
                          {/* Nửa trái */}
                          <div
                            className={[
                              "h-0.5 flex-1",
                              idx === 0 ? "bg-transparent" : "bg-emerald-200",
                            ].join(" ")}
                          />
                          {/* Vòng số bước */}
                          <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-emerald-400 bg-emerald-50 text-xs font-bold text-emerald-700 shadow-sm">
                            {idx + 1}
                          </div>
                          {/* Nửa phải */}
                          <div
                            className={[
                              "h-0.5 flex-1",
                              isLast ? "bg-transparent" : "bg-emerald-200",
                            ].join(" ")}
                          />
                        </div>

                        {/* Ảnh */}
                        <button
                          onClick={() => setLightbox(src)}
                          className="mt-3 aspect-square w-32 overflow-hidden rounded-xl border border-slate-200 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                        >
                          <img
                            src={src}
                            alt={label}
                            className="h-full w-full object-cover"
                          />
                        </button>

                        {/* Nhãn bước */}
                        <p className="mt-2 text-center text-xs font-medium text-slate-600 leading-tight px-1">
                          {label}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========== Phần 2: CÂU CHUYỆN DI SẢN ========== */}
      <section
        id="heritage"
        className="bg-gradient-to-b from-emerald-50/60 via-white to-white px-6 py-14"
      >
        <div className="mx-auto max-w-5xl">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
              <Scroll className="h-5 w-5" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
                Phần 2
              </span>
              <h2 className="text-lg font-bold text-slate-900">Hành trình & Câu chuyện Di sản</h2>
            </div>
          </div>

          <div className="relative">
            {/* Timeline line (desktop) */}
            <div className="absolute left-0 right-0 top-[104px] hidden h-px bg-gradient-to-r from-transparent via-emerald-300/50 to-transparent sm:block" />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {cards.map((card, idx) => (
                <div key={card.title} className="animate-fade-in-up flex flex-col items-center text-center">
                  <span className="relative z-10 mb-4 inline-flex items-center rounded-full border border-emerald-300 bg-white px-4 py-1.5 text-xs font-bold text-emerald-700 shadow-sm">
                    {card.year}
                  </span>
                  <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
                    <img src={card.imageUrl} alt={card.title} className="h-48 w-full object-cover" />
                    <div className="p-5">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-emerald-600">
                        Thẻ {idx + 1}
                      </p>
                      <h3 className="mb-2 text-lg font-bold text-slate-900">{card.title}</h3>
                      <p className="text-sm leading-relaxed text-slate-600">{card.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>



      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 text-center text-xs text-slate-400">
        <p>Sankit Traceability & Heritage Platform · Riti Farm Organic Chrysanthemum Tea</p>
      </footer>

      {/* Lightbox */}
      {lightbox && (
        <ImageLightbox imageUrl={lightbox} alt={product.name} onClose={() => setLightbox(null)} />
      )}
    </div>
  );
}
