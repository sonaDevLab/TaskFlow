package com.example.taskflow;

import com.example.taskflow.model.Task;
import com.example.taskflow.model.User;
import com.example.taskflow.service.TaskService;
import com.example.taskflow.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class TaskflowApp {

    public static void main(String[] args) {
        SpringApplication.run(TaskflowApp.class, args);
    }

    @Bean
    CommandLineRunner commandLineRunner(UserService userService, TaskService taskService){
        return args -> {

            User user = new User();
            user.setName("Sona");
            user.setEmail("sona@gmail.com");
            user.setPassword("1234");

            userService.createUser(user);

            Task task = new Task();
            task.setTitle("Terminar libro");
            task.setDescription("Terminar de leer mi libro actual");
            task.setUser(user);

            taskService.createTask(task);

            System.out.println("Tareas del usuario:");
            taskService.getTasksByUserId(user.getId())
                    .forEach(t -> System.out.println(t.getTitle()));
        };
    }

}
