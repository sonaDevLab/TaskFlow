package com.example.taskflow.controller;

import com.example.taskflow.dto.LoginRequest;
import com.example.taskflow.dto.RegisterRequest;
import com.example.taskflow.dto.UserResponse;
import com.example.taskflow.model.User;
import com.example.taskflow.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public UserResponse register(@RequestBody RegisterRequest request) {
        return userService.register(request);
    }

    @PostMapping("/login")
    public User login(@RequestBody LoginRequest request) {
        return userService.login(request.getEmail(), request.getPassword());
    }
}
