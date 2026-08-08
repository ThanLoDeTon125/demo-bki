using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using RealtimePlantScan.Server.Hubs;
using RealtimePlantScan.Server.Services;

namespace RealtimePlantScan.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UploadController : ControllerBase
{
    private readonly IHubContext<ScanHub> _hubContext;
    private readonly IWebHostEnvironment _env;
    private readonly ScanStore _scanStore;

    public UploadController(IHubContext<ScanHub> hubContext, IWebHostEnvironment env, ScanStore scanStore)
    {
        _hubContext = hubContext;
        _env = env;
        _scanStore = scanStore;
    }

    /// <summary>
    /// Admin gọi khi vừa mở trang /admin để lấy lại các ảnh đã upload
    /// nhưng chưa được chọn kết quả (phòng trường hợp mở /admin sau khi ảnh đã gửi).
    /// </summary>
    [HttpGet("pending")]
    public IActionResult GetPending()
    {
        return Ok(_scanStore.GetAll());
    }

    /// <summary>
    /// Nhận ảnh từ trang /mobile, lưu vào wwwroot/uploads,
    /// sau đó phát sự kiện realtime "NewImageUploaded" tới dashboard /admin.
    /// </summary>
    [HttpPost]
    [RequestSizeLimit(10_000_000)]
    public async Task<IActionResult> Upload([FromForm] IFormFile? file)
    {
        if (file is null || file.Length == 0)
        {
            return BadRequest(new { message = "Vui lòng chọn một file ảnh." });
        }

        var webRoot = _env.WebRootPath ?? Path.Combine(_env.ContentRootPath, "wwwroot");
        var uploadsDir = Path.Combine(webRoot, "uploads");
        Directory.CreateDirectory(uploadsDir);

        var extension = Path.GetExtension(file.FileName);
        var fileName = $"{Guid.NewGuid()}{extension}";
        var filePath = Path.Combine(uploadsDir, fileName);

        await using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        var imageUrl = $"/uploads/{fileName}";
        var uploadedAt = DateTime.UtcNow;

        _scanStore.Add(new PendingScan(imageUrl, uploadedAt));

        await _hubContext.Clients.Group("admin").SendAsync("NewImageUploaded", new
        {
            ImageUrl = imageUrl,
            UploadedAt = uploadedAt
        });

        return Ok(new { imageUrl });
    }
}
