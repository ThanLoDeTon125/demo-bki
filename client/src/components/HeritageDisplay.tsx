import { Scroll } from "lucide-react";
import type { HeritageResultPayload } from "../data/ritiFarmContent";

export default function HeritageDisplay({ product, cards }: HeritageResultPayload) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 px-6 py-14">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-300">
            <Scroll className="h-3.5 w-3.5" />
            Câu chuyện di sản
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{product.name}</h1>
          <p className="mt-2 text-slate-400">{product.tagline}</p>
        </div>

        <div className="relative">
          {/* Đường timeline nối các thẻ (chỉ hiện trên desktop) */}
          <div className="absolute left-0 right-0 top-[104px] hidden h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent sm:block" />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {cards.map((card, idx) => (
              <div key={card.title} className="animate-fade-in-up flex flex-col items-center text-center">
                <span className="relative z-10 mb-4 inline-flex items-center rounded-full border border-amber-400/40 bg-slate-900 px-4 py-1.5 text-xs font-bold text-amber-300">
                  {card.year}
                </span>
                <div className="w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-xl backdrop-blur">
                  <img src={card.imageUrl} alt={card.title} className="h-48 w-full object-cover" />
                  <div className="p-5">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-amber-300">
                      Thẻ {idx + 1}
                    </p>
                    <h3 className="mb-2 text-lg font-bold text-white">{card.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-300">{card.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
