package com.fitness.fitness_app.controller;

import com.fitness.fitness_app.model.User;
import com.fitness.fitness_app.model.UserDTO;
import com.fitness.fitness_app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;




    // Sign up
    @PostMapping("/signup")
    public String signup(@RequestBody UserDTO userDTO) {
        try {
            userService.registerUser(userDTO.getUsername(), userDTO.getEmail(), userDTO.getPassword(), userDTO.getRole());
            return "User registered successfully";
        } catch (Exception e) {
            return e.getMessage();
        }
    }


    // Login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDTO userDTO) {
        try {
            if (userService.authenticateUser(userDTO.getEmail(), userDTO.getPassword())) {
                User user = userService.getUserByEmail(userDTO.getEmail());
                Map<String, Object> response = new HashMap<>();
                response.put("userId", user.getId());
                response.put("role", user.getRole());
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "Invalid credentials"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", e.getMessage()));
        }

    }







}
