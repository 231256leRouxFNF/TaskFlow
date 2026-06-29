using System.ComponentModel.DataAnnotations;

namespace TaskFlow.API.Models
{
    public enum TaskItemStatus
    {
        Todo,
        InProgress,
        Completed
    }
}