using System.ComponentModel.DataAnnotations;

namespace TaskFlow.API.DTOs;
using TaskFlow.API.Models;

public class CreateTaskDto
{
    [Required]
    [MaxLength(100)]
    public string Title { get; set; } = "";

    [MaxLength(500)]
    public string Description { get; set; } = "";

    public DateTime? DueDate { get; set; }

    public Priority Priority { get; set; }
}