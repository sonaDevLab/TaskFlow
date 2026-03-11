package com.example.taskflow.service;

import com.example.taskflow.dto.TaskResponse;
import com.example.taskflow.model.Task;
import com.example.taskflow.model.User;
import com.example.taskflow.repository.TaskRepository;
import com.example.taskflow.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    //Constructor con inyección de dependecias
    public TaskService(TaskRepository taskRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    // Obtener usuario actual
    private User getCurrentUser() {
        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }

    //Cerar tarea
    public TaskResponse createTask(String title, String description) {
        User user = getCurrentUser();

        Task task = new Task();
        task.setTitle(title);
        task.setDescription(description);
        task.setUser(user);
        task.setCompleted(false);

        Task savedTask = taskRepository.save(task);

        return new TaskResponse(
                savedTask.getId(),
                savedTask.getTitle(),
                savedTask.getDescription(),
                savedTask.isCompleted()
        );
    }

    //Obtener todas las tareas
    public List<TaskResponse> getTasks(){
        User user  = getCurrentUser();

        return taskRepository.findByUserId(user.getId())
                .stream()
                .map(task -> new TaskResponse(
                        task.getId(),
                        task.getTitle(),
                        task.getDescription(),
                        task.isCompleted()
                ))
                .toList();
    }

    //Actualizar tarea
    public TaskResponse updateTask(Long taskId, String title, String description) {
        User user = getCurrentUser();

        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Tarea no encontrada"));

        if(!task.getUser().getId().equals(user.getId())){
            throw new RuntimeException("No puedes modificar esta tarea");
        }

        task.setTitle(title);
        task.setDescription(description);

        Task updatedTask = taskRepository.save(task);

        return new TaskResponse(
                updatedTask.getId(),
                updatedTask.getTitle(),
                updatedTask.getDescription(),
                updatedTask.isCompleted()
        );
    }

    //Eliminar tarea
    public void deleteTask(Long taskId) {
        User user = getCurrentUser();

        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Tarea no encontrada"));

        if(!task.getUser().getId().equals(user.getId())){
            throw new RuntimeException("No puedes eliminar esta tarea");
        }

        taskRepository.delete(task);
    }

    //Completar tarea
    public TaskResponse completeTask(Long taskId) {
        User user = getCurrentUser();

        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Tarea no encontrada"));

        if(!task.getUser().getId().equals(user.getId())){
            throw new RuntimeException("No puedes eliminar esta tarea");
        }

        task.setCompleted(!task.isCompleted());

        Task updatedTask = taskRepository.save(task);

        return new TaskResponse(
                updatedTask.getId(),
                updatedTask.getTitle(),
                updatedTask.getDescription(),
                updatedTask.isCompleted()
        );
    }
}
