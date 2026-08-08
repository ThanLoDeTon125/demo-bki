namespace RealtimePlantScan.Server.Services;

public record PendingScan(string ImageUrl, DateTime UploadedAt);

/// <summary>
/// Lưu tạm trong bộ nhớ danh sách ảnh đã upload nhưng CHƯA được Admin chọn kết quả.
/// Giúp Admin mở trang /admin muộn (sau khi ảnh đã được gửi từ điện thoại) vẫn thấy được ảnh đó,
/// thay vì phải phụ thuộc hoàn toàn vào sự kiện realtime "NewImageUploaded".
/// (Chỉ phù hợp demo/POC — production nên dùng DB hoặc cache có TTL.)
/// </summary>
public class ScanStore
{
    private readonly List<PendingScan> _pending = new();
    private readonly object _lock = new();

    public void Add(PendingScan scan)
    {
        lock (_lock)
        {
            _pending.Add(scan);
        }
    }

    public IReadOnlyList<PendingScan> GetAll()
    {
        lock (_lock)
        {
            return _pending.OrderByDescending(s => s.UploadedAt).ToList();
        }
    }

    public void Remove(string imageUrl)
    {
        lock (_lock)
        {
            _pending.RemoveAll(s => s.ImageUrl == imageUrl);
        }
    }
}
