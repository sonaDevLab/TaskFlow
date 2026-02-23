package com.example.taskflow.service;

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

    //Crear usuario
    public User createUser(User user){
        Optional<User> existing = userRepository.findByEmail(user.getEmail());
        if(existing.isPresent()){
            throw new RuntimeException("El email ya existe.");
        }
        return userRepository.save(user);
    }

    //Obtener usuario por ID
    public User getUserById(Long id){
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("Usuario no encontrado."));
    }
}
