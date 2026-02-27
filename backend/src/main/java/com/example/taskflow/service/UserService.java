package com.example.taskflow.service;

import com.example.taskflow.exception.ResourceNotFoundException;
import com.example.taskflow.model.User;
import com.example.taskflow.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    //Constructor con inyección de dependencias
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    //Registrar usuario
    public User register(User user){
        if(userRepository.findByEmail(user.getEmail()).isPresent()){
            throw new RuntimeException("El email ya existe.");
        }
        return userRepository.save(user);
    }

    //Iniciar Sesión
    public User login(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if(!user.getPassword().equals(password)){
            throw new RuntimeException("Contraseña incorrecta");
        }

        return user;
    }

    //Obtener usuario por ID
    public User getUserById(Long id){
        return userRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Usuario no encontrado.")
                );
    }
}
