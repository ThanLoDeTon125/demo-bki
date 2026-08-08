import { ShieldCheck } from "lucide-react";
import type { PRODUCT_INFO } from "../data/ritiFarmContent";

interface ProductHeaderProps {
  product: typeof PRODUCT_INFO;
  accentClassName?: string;
}

export default function ProductHeader({ product, accentClassName = "text-slate-900" }: ProductHeaderProps) {
  return (
    <div className="mb-8 text-center">
      <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
        <ShieldCheck className="h-3.5 w-3.5" />
        {product.verifiedBy}
      </div>
      <h1 className={`text-3xl font-bold tracking-tight sm:text-4xl ${accentClassName}`}>{product.name}</h1>
      <p className="mt-2 text-slate-500">{product.tagline}</p>
    </div>
  );
}
