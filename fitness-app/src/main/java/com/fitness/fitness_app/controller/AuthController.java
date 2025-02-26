package com.fitness.fitness_app.controller;

import com.fitness.fitness_app.model.UserDTO;
import com.fitness.fitness_app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;



    // Sign up
    @PostMapping("/signup")
    public String signup(@RequestBody UserDTO userDTO) {
        try {
            userService.registerUser(userDTO.getUsername(), userDTO.getEmail(), userDTO.getPassword());
            return "User registered successfully";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    // Login
    @PostMapping("/login")
    public String login(@RequestBody UserDTO userDTO) {
        try {
            if (userService.authenticateUser(userDTO.getEmail(), userDTO.getPassword())) {
                return "User authenticated successfully";
            } else {
                return "Invalid credentials";
            }
        } catch (Exception e) {
            return e.getMessage();
        }
    }



}
