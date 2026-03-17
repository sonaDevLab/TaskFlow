package com.example.taskflow.service;

import com.example.taskflow.dto.RegisterRequest;
import com.example.taskflow.dto.UserResponse;
import com.example.taskflow.exception.ResourceNotFoundException;
import com.example.taskflow.model.User;
import com.example.taskflow.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    //Constructor con inyección de dependencias
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    //Registrar usuario
    public UserResponse register(RegisterRequest request) {
        if(userRepository.findByEmail(request.getEmail()).isPresent()){
            throw new RuntimeException("El usuario con este email ya existe.");
        }
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());

        // No guardar password en claro
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        User savedUser = userRepository.save(user);

        return new UserResponse(
                savedUser.getId(),
                savedUser.getName(),
                savedUser.getEmail()
        );
    }

    //Iniciar Sesión
    public UserResponse login(String email, String password) {
        System.out.println("🔵 Intentando login con email: " + email);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> {
                    System.err.println("❌ Usuario no encontrado: " + email);
                    return new RuntimeException("Usuario no encontrado");
                });

        System.out.println("✅ Usuario encontrado: " + user.getEmail());
        System.out.println("📝 Contraseña ingresada: " + password);
        System.out.println("🔒 Contraseña guardada (hash): " + user.getPassword());

        if(!passwordEncoder.matches(password, user.getPassword())){
            System.err.println("❌ Contraseña incorrecta");
            throw new RuntimeException("Contraseña incorrecta");
        }

        System.out.println("✅ Login exitoso");

        return new UserResponse(
                user.getId(),
                user.getName(),
                user.getEmail()
        );
    }

    //Obtener usuario por ID
        //para frontend
    public UserResponse getUserById(Long id){
        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Usuario no encontrado.")
                );

        return new UserResponse(
                user.getId(),
                user.getName(),
                user.getEmail()
        );
    }

        //para backend
    public User getUserEntityById(Long id){
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado."));
    }
}
