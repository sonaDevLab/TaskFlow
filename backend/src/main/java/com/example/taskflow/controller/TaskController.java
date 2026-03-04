package com.example.taskflow.controller;

import com.example.taskflow.dto.TaskResponse;
import com.example.taskflow.service.TaskService;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins = "http://localhost:5173")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    //Crear tarea
    @PostMapping("/{userId}")
    public TaskResponse createTask(@PathVariable Long userId, @RequestBody TaskResponse request) {
        return taskService.createTask(
                userId,
                request.getTitle(),
                request.getDescription()
        );
    }

    //Obtener tareas por usuario
    @GetMapping("/{userId}")
    public List<TaskResponse> getTasksByUser(@PathVariable Long userId) {
        return taskService.getTasksByUserId(userId);
    }

    //Actualizar tarea
    @PutMapping("/{userId}/{taskId}")
    public TaskResponse updateTask(@PathVariable Long userId, @PathVariable Long taskId, @RequestBody TaskResponse request) {
        return taskService.updateTask(
                userId,
                taskId,
                request.getTitle(),
                request.getDescription()
        );
    }

    //Eliminar tarea
    @DeleteMapping("/{userId}/{taskId}")
    public void deleteTask(@PathVariable Long userId, @PathVariable Long taskId) {
        taskService.deleteTask(userId, taskId);
    }
}
