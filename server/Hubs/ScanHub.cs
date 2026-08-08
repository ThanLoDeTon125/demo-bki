using System.Text.Json;
using Microsoft.AspNetCore.SignalR;
using RealtimePlantScan.Server.Services;

namespace RealtimePlantScan.Server.Hubs;

/// <summary>
/// SignalR Hub trung tâm cho toàn bộ luồng realtime:
/// - /mobile   : không kết nối trực tiếp tới Hub, chỉ POST ảnh qua UploadController.
/// - /admin    : join group "admin", nhận sự kiện "NewImageUploaded", gọi SendResult().
/// - /projector: join group "projector", nhận sự kiện "ResultReady".
///
/// Payload của SendResult là JSON tự do (traceability / heritage / tea_ritual, xem
/// client/src/data/ritiFarmContent.ts), nên nhận dạng JsonElement thay vì 1 model cố định.
/// </summary>
public class ScanHub : Hub
{
    private readonly ScanStore _scanStore;

    public ScanHub(ScanStore scanStore)
    {
        _scanStore = scanStore;
    }

    public async Task JoinGroup(string groupName)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
    }

    public async Task LeaveGroup(string groupName)
    {
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
    }

    /// <summary>
    /// Được gọi từ dashboard Admin sau khi chọn xong nội dung muốn hiển thị.
    /// Broadcast nguyên payload tới toàn bộ client đang ở group "projector".
    /// Nếu payload có "scanImageUrl", ảnh đó sẽ được đánh dấu là đã xử lý xong.
    /// </summary>
    public async Task SendResult(JsonElement result)
    {
        if (result.TryGetProperty("scanImageUrl", out var scanImageUrlProp)
            && scanImageUrlProp.ValueKind == JsonValueKind.String)
        {
            var scanImageUrl = scanImageUrlProp.GetString();
            if (!string.IsNullOrEmpty(scanImageUrl))
            {
                _scanStore.Remove(scanImageUrl);
            }
        }

        await Clients.Group("projector").SendAsync("ResultReady", result);
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        await base.OnDisconnectedAsync(exception);
    }
}
