namespace TaskFlow.API.DTOs;
using TaskFlow.API.Models;

public class CreateTaskDto
{
    public string Title { get; set; } = "";

    public string Description { get; set; } = "";    

    public DateTime? DueDate { get; set; }

    public Priority Priority { get; set; }

    public TaskStatus Status { get; set; }

}