import { X } from "lucide-react";

interface ImageLightboxProps {
  imageUrl: string;
  alt: string;
  onClose: () => void;
}

export default function ImageLightbox({ imageUrl, alt, onClose }: ImageLightboxProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
        aria-label="Đóng"
      >
        <X className="h-5 w-5" />
      </button>
      <img
        src={imageUrl}
        alt={alt}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[85vh] max-w-full rounded-2xl object-contain shadow-2xl"
      />
    </div>
  );
}
