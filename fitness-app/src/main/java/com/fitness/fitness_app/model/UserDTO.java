package com.fitness.fitness_app.model;

public class UserDTO {

    private Long id;
    private String username;
    private String email;
    private String password;

    private String role;

    public UserDTO() {
    }

    public UserDTO(String username, String email) {
    }

    // Getters and setters
    public String getEmail() {
        return email;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }



    public void setPassword(String password) {
        this.password = password;
    }
}
