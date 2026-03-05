package com.example.taskflow.controller;

import com.example.taskflow.dto.AuthResponse;
import com.example.taskflow.dto.LoginRequest;
import com.example.taskflow.dto.RegisterRequest;
import com.example.taskflow.dto.UserResponse;
import com.example.taskflow.security.JwtService;
import com.example.taskflow.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UserService userService;
    private final JwtService jwtService;

    public AuthController(UserService userService, JwtService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public UserResponse register(@RequestBody RegisterRequest request) {
        return userService.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {

        UserResponse user = userService.login(
                request.getEmail(),
                request.getPassword()
        );

        String token = jwtService.generateToken(user.getEmail());

        return new AuthResponse(token, user);
    }
}
