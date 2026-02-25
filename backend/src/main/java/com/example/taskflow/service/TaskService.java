package com.example.taskflow.service;

import com.example.taskflow.model.Task;
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
    public Task createTask(Task task){
        return taskRepository.save(task);
    }

    //Obtener todas las tareas
    public List<Task> getTasksByUserId(Long userId){
        return taskRepository.findByUserId(userId);
    }

    //Actualizar tarea
    public Task updateTask(Task task){
        return taskRepository.save(task);
    }

    //Eliminar tarea
    public void deleteTask(Long id){
        taskRepository.deleteById(id);
    }
}
