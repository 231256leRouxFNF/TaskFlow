using System.ComponentModel.DataAnnotations;

namespace TaskFlow.API.Models
{
    public class TaskItem
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Title { get; set; } = string.Empty;

        [MaxLength(500)]
        public string Description { get; set; } = string.Empty;

        public bool IsCompleted { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? DueDate { get; set; } = DateTime.UtcNow;

        [MaxLength(20)]
        public string Priority { get; set; } = "Medium";

    }
}