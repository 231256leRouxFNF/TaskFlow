using TaskFlow.API.Models; 

namespace TaskFlow.API.DTOs;

public class UpdateTaskDto
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateTime? DueDate { get; set; }
    public Priority Priority { get; set; }
    public TaskItemStatus Status { get; set; } 
}