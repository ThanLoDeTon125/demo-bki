import { useEffect, useRef, useState } from "react";
import type { HubConnection } from "@microsoft/signalr";
import {
  LayoutDashboard,
  Wifi,
  WifiOff,
  Clock,
  CheckCircle2,
  Sparkles,
  X,
  ImageOff,
  MapPinned,
  Scroll,
  Coffee,
  Layers,
} from "lucide-react";
import { API_BASE_URL, createScanConnection } from "../signalr/connection";
import { RESULT_OPTIONS, buildResultPayload, type ResultOption } from "../data/ritiFarmContent";

interface IncomingScan {
  imageUrl: string;
  uploadedAt: string;
}

const OPTION_ICONS = {
  combined: Layers,
  traceability: MapPinned,
  heritage: Scroll,
  tea_ritual: Coffee,
} as const;

export default function Admin() {
  const [scans, setScans] = useState<IncomingScan[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  // Ảnh đang được chọn để xem danh sách candidate + gửi kết quả
  const [activeScan, setActiveScan] = useState<IncomingScan | null>(null);
  const [sentImageUrls, setSentImageUrls] = useState<Set<string>>(new Set());
  const connectionRef = useRef<HubConnection | null>(null);

  // Lấy lại danh sách ảnh đã upload nhưng chưa chọn kết quả (phòng khi mở /admin sau khi ảnh đã gửi)
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/upload/pending`)
      .then((res) => res.json())
      .then((data: IncomingScan[]) => {
        setScans((prev) => {
          const existingUrls = new Set(prev.map((s) => s.imageUrl));
          const newOnes = data.filter((s) => !existingUrls.has(s.imageUrl));
          return [...newOnes, ...prev];
        });
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const connection = createScanConnection();
    connectionRef.current = connection;

    connection.on("NewImageUploaded", (data: IncomingScan) => {
      setScans((prev) => {
        if (prev.some((s) => s.imageUrl === data.imageUrl)) return prev;
        return [data, ...prev];
      });
    });

    connection
      .start()
      .then(() => {
        setIsConnected(true);
        return connection.invoke("JoinGroup", "admin");
      })
      .catch(console.error);

    return () => {
      connection.stop();
    };
  }, []);

  // Admin chọn thủ công 1 loại nội dung (Truy xuất nguồn gốc / Câu chuyện di sản / Nghi thức pha trà)
  // rồi gửi ra /projector
  const handleSelectResult = async (scan: IncomingScan, option: ResultOption) => {
    const payload = buildResultPayload(option.id, scan.imageUrl);

    try {
      await connectionRef.current?.invoke("SendResult", payload);
      setSentImageUrls((prev) => new Set(prev).add(scan.imageUrl));
      setActiveScan(null);
    } catch (err) {
      console.error("Gửi kết quả thất bại:", err);
    }
  };

  const pendingCount = scans.filter((s) => !sentImageUrls.has(s.imageUrl)).length;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top bar */}
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 shadow-md shadow-emerald-600/30">
              <LayoutDashboard className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold leading-tight text-slate-900">Admin Dashboard</h1>
              <p className="text-xs text-slate-400">Realtime Plant Scan</p>
            </div>
          </div>

          <div
            className={[
              "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium",
              isConnected ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600",
            ].join(" ")}
          >
            {isConnected ? <Wifi className="h-3.5 w-3.5" /> : <WifiOff className="h-3.5 w-3.5" />}
            {isConnected ? "Đã kết nối" : "Đang kết nối..."}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Ảnh vừa quét</h2>
            <p className="text-sm text-slate-500">
              {scans.length === 0
                ? "Chưa có ảnh nào được gửi lên từ /mobile."
                : `${pendingCount} ảnh đang chờ chọn kết quả · ${scans.length} tổng cộng`}
            </p>
          </div>
        </div>

        {scans.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-white py-20 text-center">
            <ImageOff className="mb-3 h-10 w-10 text-slate-300" />
            <p className="font-medium text-slate-500">Đang chờ khách quét QR và gửi ảnh...</p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {scans.map((scan, idx) => {
            const isSent = sentImageUrls.has(scan.imageUrl);

            return (
              <div
                key={idx}
                className="animate-fade-in-up group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
              >
                <div className="relative aspect-square">
                  <img
                    src={`${API_BASE_URL}${scan.imageUrl}`}
                    alt="scan"
                    className="h-full w-full object-cover"
                  />
                  {isSent && (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-900/40 backdrop-blur-[1px]">
                      <span className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-emerald-700 shadow">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Đã gửi kết quả
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between gap-2 p-3">
                  <span className="flex items-center gap-1 text-xs text-slate-400">
                    <Clock className="h-3 w-3" />
                    {new Date(scan.uploadedAt).toLocaleTimeString()}
                  </span>
                  <button
                    onClick={() => setActiveScan(scan)}
                    className={[
                      "rounded-lg px-3 py-1.5 text-xs font-semibold transition",
                      isSent
                        ? "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        : "bg-emerald-600 text-white hover:bg-emerald-700",
                    ].join(" ")}
                  >
                    {isSent ? "Chọn lại" : "Chọn kết quả"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Candidate picker modal */}
      {activeScan && (
        <div
          className="fixed inset-0 z-20 flex items-end justify-center bg-slate-900/50 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          onClick={() => setActiveScan(null)}
        >
          <div
            className="animate-fade-in-up max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-emerald-600" />
                <h3 className="text-base font-bold text-slate-900">Chọn nội dung hiển thị</h3>
              </div>
              <button
                onClick={() => setActiveScan(null)}
                className="rounded-full p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <img
              src={`${API_BASE_URL}${activeScan.imageUrl}`}
              alt="scan"
              className="mb-4 h-40 w-full rounded-xl object-cover"
            />

            <div className="grid grid-cols-1 gap-2">
              {RESULT_OPTIONS.map((option) => {
                const Icon = OPTION_ICONS[option.id];
                return (
                  <button
                    key={option.id}
                    onClick={() => handleSelectResult(activeScan, option)}
                    className="flex items-start gap-3 rounded-xl border border-slate-200 p-3 text-left transition hover:border-emerald-400 hover:bg-emerald-50"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{option.title}</p>
                      <p className="text-xs text-slate-500">{option.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
