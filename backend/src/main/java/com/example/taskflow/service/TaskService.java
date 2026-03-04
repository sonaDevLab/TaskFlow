package com.example.taskflow.service;

import com.example.taskflow.dto.TaskResponse;
import com.example.taskflow.model.Task;
import com.example.taskflow.model.User;
import com.example.taskflow.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    //Constructor con inyección de dependecias
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    //Cerar tarea
    public TaskResponse createTask(Long userId, String title, String description) {
        Task task = new Task();
        task.setTitle(title);
        task.setDescription(description);

        //Solo setea el userId
        task.setUser(new User());
        task.getUser().setId(userId);

        Task savedTask = taskRepository.save(task);

        return new TaskResponse(
                savedTask.getId(),
                savedTask.getTitle(),
                savedTask.getDescription()
        );
    }

    //Obtener todas las tareas
    public List<TaskResponse> getTasksByUserId(Long userId){
        return taskRepository.findByUserId(userId)
                .stream()
                .map(task -> new TaskResponse(
                        task.getId(),
                        task.getTitle(),
                        task.getDescription()
                ))
                .toList();
    }

    //Actualizar tarea
    public TaskResponse updateTask(Long userId, Long taskId, String title, String description) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Tarea no encontrada"));

        if(!task.getUser().getId().equals(userId)){
            throw new RuntimeException("No puedes modificar tareas de otro usuario");
        }

        task.setTitle(title);
        task.setDescription(description);

        Task updatedTask = taskRepository.save(task);

        return new TaskResponse(
                updatedTask.getId(),
                updatedTask.getTitle(),
                updatedTask.getDescription()
        );
    }

    //Eliminar tarea
    public void deleteTask(Long userId, Long taskId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Tarea no encontrada"));

        if(!task.getUser().getId().equals(userId)){
            throw new RuntimeException("No puedes eliminar tareas de otro usuario");
        }

        taskRepository.delete(task);
    }
}
