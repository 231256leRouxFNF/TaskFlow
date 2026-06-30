using System.ComponentModel.DataAnnotations;
using TaskFlow.API.Models; 

namespace TaskFlow.API.DTOs;

public class UpdateTaskDto
{

    [Required]
    [MaxLength(100)]
    public string Title { get; set; } = string.Empty;

    [MaxLength(500)]
    public string Description { get; set; } = string.Empty;

    public DateTime? DueDate { get; set; }

    public Priority Priority { get; set; }
    public TaskItemStatus Status { get; set; } 
}