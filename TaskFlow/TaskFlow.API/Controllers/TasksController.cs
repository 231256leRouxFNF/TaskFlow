using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskFlow.API.Data;
using TaskFlow.API.Models;
using TaskFlow.API.DTOs;

namespace TaskFlow.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly ILogger<TasksController> _logger;

    public TasksController(ApplicationDbContext context, ILogger<TasksController> logger)
    {
        _context = context;
        _logger = logger;
    }

        // POST: api/tasks
    [HttpPost]
    public async Task<ActionResult<TaskDto>> CreateTask(CreateTaskDto dto)
    {

        _logger.LogInformation("Creating a new task with title: {Title}", dto.Title);

        var task = new TaskItem
        {
            Title = dto.Title,
            Description = dto.Description,
            DueDate = dto.DueDate,
            Priority = dto.Priority,
            Status = TaskItemStatus.Todo,
            CreatedAt = DateTime.UtcNow
        };

        _context.Tasks.Add(task);
        await _context.SaveChangesAsync();

        // Map to a clean response DTO
        var responseDto = MapToDto(task);

        return CreatedAtAction(nameof(GetTask), new { id = task.Id }, responseDto);
    }

    // GET: api/tasks/5
    [HttpGet("{id}")]
    public async Task<ActionResult<TaskDto>> GetTask(int id)
    {
        _logger.LogInformation("Fetching task with ID: {Id}", id);

        // Using AsNoTracking since we are only reading the data
        var task = await _context.Tasks
            .AsNoTracking()
            .FirstOrDefaultAsync(t => t.Id == id);

        if (task == null)
        {
            return NotFound();
        }

        return Ok(MapToDto(task));
    }

    // GET: api/tasks
    [HttpGet]
    public async Task<ActionResult<IEnumerable<TaskDto>>> GetTasks(
        TaskItemStatus? status,
        Priority? priority,
        [FromQuery] string? sortBy,
        [FromQuery] bool descending = false,
        [FromQuery] string? search = null,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10)

    {

        _logger.LogInformation("Fetching tasks with filters - Status: {Status}, Priority: {Priority}, SortBy: {SortBy}, Descending: {Descending}, Search: {Search}, Page: {Page}, PageSize: {PageSize}",
            status, priority, sortBy, descending, search, page, pageSize);

        var query = _context.Tasks.AsNoTracking();

        if (status.HasValue)
        {
            query = query.Where(t => t.Status == status.Value);
        }
        if (priority.HasValue)
        {
            query = query.Where(t => t.Priority == priority.Value);
        }

        if (!string.IsNullOrWhiteSpace(search))
        {
            
            query = query.Where(t =>
            t.Title.Contains(search) ||
            (t.Description != null && t.Description.Contains(search)));
        }

        query = (sortBy?.ToLower()) switch
        {
            "duedate" => descending
                ? query.OrderByDescending(t => t.DueDate)
                : query.OrderBy(t => t.DueDate),

            "createdat" => descending
                ? query.OrderByDescending(t => t.CreatedAt)
                : query.OrderBy(t => t.CreatedAt),

            "priority" => descending
                ? query.OrderByDescending(t => t.Priority)
                : query.OrderBy(t => t.Priority),

            _ => query.OrderBy(t => t.Id)
        };

        page = Math.Max(page, 1);
        pageSize = Math.Clamp(pageSize, 1, 100);

        var totalCount = await query.CountAsync();
        var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);

        var skip = (page - 1) * pageSize;

        var tasks = await query
            .Skip(skip)
            .Take(pageSize)
            .Select(t => MapToDto(t))
            .ToListAsync();

        return Ok(new
        {
            page,
            pageSize,
            totalCount,
            totalPages,
            items = tasks
        });
    }

    // PUT: api/tasks/
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTask(int id, UpdateTaskDto dto)
    {

        _logger.LogInformation("Updating task with ID: {Id}", id);

        var task = await _context.Tasks.FindAsync(id);

        if (task == null)
        {
            _logger.LogWarning("Task with ID: {Id} not found for update", id);
            return NotFound();
        }

        task.Title = dto.Title;
        task.Description = dto.Description;
        task.DueDate = dto.DueDate;
        task.Priority = dto.Priority;
        task.Status = dto.Status;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    // DELETE: api/tasks/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTask(int id)
    {

        _logger.LogInformation("Deleting task with ID: {Id}", id);

        var task = await _context.Tasks.FindAsync(id);

        if (task == null)
        {
            _logger.LogWarning("Task with ID: {Id} not found for deletion", id);
            return NotFound();
        }

        _context.Tasks.Remove(task);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    // Helper method to keep your endpoints clean (or use a tool like AutoMapper / Mapster)
    private static TaskDto MapToDto(TaskItem task) => new()
    {
        Id = task.Id,
        Title = task.Title,
        Description = task.Description,
        DueDate = task.DueDate,
        // Priority = task.Priority,
        Status = task.Status,
        CreatedAt = task.CreatedAt,
        Priority = task.Priority.ToString()
    };
}