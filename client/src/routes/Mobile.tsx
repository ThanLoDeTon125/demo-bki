import { useState } from "react";
import { Camera, Leaf, Loader2, CheckCircle2, AlertCircle, Upload } from "lucide-react";
import { API_BASE_URL } from "../signalr/connection";

type UploadStatus = "idle" | "uploading" | "done" | "error";

export default function Mobile() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<UploadStatus>("idle");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    setFile(selected);
    setPreviewUrl(selected ? URL.createObjectURL(selected) : null);
    setStatus("idle");
  };

  const handleUpload = async () => {
    if (!file) return;
    setStatus("uploading");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${API_BASE_URL}/api/upload`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");
      setStatus("done");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-white px-4 py-8">
      <div className="mx-auto max-w-sm">
        {/* Header */}
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 shadow-lg shadow-emerald-600/30">
            <Leaf className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Quét cây của bạn</h1>
          <p className="mt-1 text-sm text-slate-500">
            Chụp ảnh rõ nét lá hoặc thân cây để nhận diện chính xác nhất
          </p>
        </div>

        {/* Card */}
        <div className="animate-fade-in-up overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50">
          {!previewUrl ? (
            <label
              htmlFor="plant-photo"
              className="flex cursor-pointer flex-col items-center justify-center gap-3 px-6 py-16 text-center transition hover:bg-emerald-50/50 active:bg-emerald-50"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                <Camera className="h-8 w-8 text-emerald-600" />
              </div>
              <div>
                <p className="font-semibold text-slate-800">Chạm để mở camera</p>
                <p className="mt-1 text-xs text-slate-400">Hoặc chọn ảnh có sẵn trong thư viện</p>
              </div>
            </label>
          ) : (
            <div className="relative">
              <img src={previewUrl} alt="preview" className="aspect-square w-full object-cover" />
              <label
                htmlFor="plant-photo"
                className="absolute bottom-3 right-3 flex cursor-pointer items-center gap-1.5 rounded-full bg-white/95 px-3 py-2 text-xs font-medium text-slate-700 shadow-md backdrop-blur transition hover:bg-white"
              >
                <Camera className="h-3.5 w-3.5" />
                Chụp lại
              </label>
            </div>
          )}
          <input
            id="plant-photo"
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {/* Submit button */}
        <button
          onClick={handleUpload}
          disabled={!file || status === "uploading"}
          className={[
            "mt-5 flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3.5 text-sm font-semibold shadow-lg transition active:scale-[0.98]",
            !file || status === "uploading"
              ? "cursor-not-allowed bg-slate-100 text-slate-400 shadow-none"
              : "bg-emerald-600 text-white shadow-emerald-600/30 hover:bg-emerald-700",
          ].join(" ")}
        >
          {status === "uploading" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Đang tải lên...
            </>
          ) : (
            <>
              <Upload className="h-4 w-4" />
              Gửi ảnh
            </>
          )}
        </button>

        {/* Status messages */}
        {status === "done" && (
          <div className="animate-fade-in-up mt-4 flex items-center justify-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
            <CheckCircle2 className="h-4 w-4" />
            Đã gửi ảnh thành công!
          </div>
        )}
        {status === "error" && (
          <div className="animate-fade-in-up mt-4 flex items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            <AlertCircle className="h-4 w-4" />
            Có lỗi khi tải ảnh lên, thử lại nhé.
          </div>
        )}
      </div>
    </div>
  );
}
