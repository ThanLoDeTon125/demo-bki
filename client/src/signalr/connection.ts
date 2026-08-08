import * as signalR from "@microsoft/signalr";

const BACKEND_PORT = 5000;

/**
 * Dùng chính hostname mà trình duyệt đang truy cập (localhost hoặc IP LAN)
 * để gọi về backend. Nhờ vậy khi điện thoại mở trang qua IP LAN
 * (vd: http://192.168.1.5:5173/mobile), nó cũng tự gọi đúng
 * http://192.168.1.5:5000 thay vì "localhost" (là chính điện thoại).
 */
export const API_BASE_URL = `${window.location.protocol}//${window.location.hostname}:${BACKEND_PORT}`;

const HUB_URL = `${API_BASE_URL}/hubs/scan`;

/**
 * Tạo một kết nối SignalR mới tới ScanHub.
 * Mỗi route (Admin, Projector) tự tạo và quản lý vòng đời kết nối riêng của nó.
 */
export function createScanConnection(): signalR.HubConnection {
  return new signalR.HubConnectionBuilder()
    .withUrl(HUB_URL)
    .withAutomaticReconnect()
    .configureLogging(signalR.LogLevel.Information)
    .build();
}
