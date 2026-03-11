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
    @PostMapping
    public TaskResponse createTask(@RequestBody TaskResponse request) {
        return taskService.createTask(
                request.getTitle(),
                request.getDescription()
        );
    }

    //Obtener tareas del usuario logeado
    @GetMapping
    public List<TaskResponse> getTasks() {
        return taskService.getTasks();
    }

    //Actualizar tarea
    @PutMapping("/{taskId}")
    public TaskResponse updateTask(@PathVariable Long taskId, @RequestBody TaskResponse request) {
        return taskService.updateTask(
                taskId,
                request.getTitle(),
                request.getDescription()
        );
    }

    //Eliminar tarea
    @DeleteMapping("/{taskId}")
    public void deleteTask(@PathVariable Long taskId) {
        taskService.deleteTask(taskId);
    }

    //Completar tarea
    @PatchMapping("{task}/complete")
    public TaskResponse toggleTask(@PathVariable Long taskId) {
        return taskService.completeTask(taskId);
    }
}
