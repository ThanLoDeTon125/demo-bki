import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Sparkles, ScanLine } from "lucide-react";
import { createScanConnection } from "../signalr/connection";
import type { ProjectorResultPayload } from "../data/ritiFarmContent";
import TraceabilityDisplay from "../components/TraceabilityDisplay";
import HeritageDisplay from "../components/HeritageDisplay";
import TeaRitualDisplay from "../components/TeaRitualDisplay";

// URL trang /mobile mà điện thoại sẽ quét QR để mở.
// Cố định theo IP LAN của máy tính để QR luôn đúng dù /projector được mở
// bằng "localhost" hay bất kỳ địa chỉ nào khác trên chính máy đó.
const MOBILE_URL = "http://192.168.1.5:5173/mobile";

export default function Projector() {
  const [result, setResult] = useState<ProjectorResultPayload | null>(null);

  useEffect(() => {
    const connection = createScanConnection();

    connection.on("ResultReady", (data: ProjectorResultPayload) => {
      setResult(data);
    });

    connection
      .start()
      .then(() => connection.invoke("JoinGroup", "projector"))
      .catch(console.error);

    return () => {
      connection.stop();
    };
  }, []);

  if (!result) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-900 px-6 text-center">
        <div className="mb-6 flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 text-xs font-medium text-emerald-300">
          <Sparkles className="h-3.5 w-3.5" />
          Sankit Traceability
        </div>

        <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Quét mã QR để xem thông tin sản phẩm
        </h1>
        <p className="mt-4 max-w-md text-emerald-100/70">
          Dùng camera điện thoại quét mã bên dưới để bắt đầu
        </p>

        <div className="relative mt-10">
          <div className="animate-pulse-ring absolute inset-0 rounded-3xl" />
          <div className="rounded-3xl bg-white p-6 shadow-2xl">
            <QRCodeSVG value={MOBILE_URL} size={260} />
          </div>
        </div>

        <p className="mt-6 font-mono text-sm text-emerald-100/50">{MOBILE_URL}</p>

        <div className="mt-12 flex items-center gap-2 text-emerald-100/60">
          <ScanLine className="h-5 w-5 animate-pulse" />
          <span className="text-sm">Đang chờ ảnh quét...</span>
        </div>
      </div>
    );
  }

  switch (result.type) {
    case "traceability":
      return <TraceabilityDisplay {...result} />;
    case "heritage":
      return <HeritageDisplay {...result} />;
    case "tea_ritual":
      return <TeaRitualDisplay {...result} />;
    default:
      return null;
  }
}
