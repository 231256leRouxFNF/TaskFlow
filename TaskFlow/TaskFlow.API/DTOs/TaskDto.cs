using TaskFlow.API.Models;

namespace TaskFlow.API.DTOs;

public class TaskDto
{
    public int Id { get; set; }

    public string? Title { get; set; } = "";

    public string? Description { get; set; } = "";

    public DateTime? DueDate { get; set; }

    public string? Priority { get; set; } = "";

    public TaskItemStatus Status { get; set; }

    public DateTime CreatedAt { get; set; }
}