namespace Bank.domain.Entities;

public class Device
{
    public int DeviceId { get; set; }
    public string DeviceType { get; set; }
    public int? CustomerId { get; set; }
    public string SerialNumber { get; set; }
    public string DeviceIdentifier { get; set; }
    public DateTime RegisteredAt { get; set; }
    public DateTime? LastSeenAt { get; set; }
    public string Status { get; set; }
}
