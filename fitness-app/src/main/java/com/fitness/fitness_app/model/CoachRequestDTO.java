package com.fitness.fitness_app.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class CoachRequestDTO {
    private Long id;
    private Long clientId;
    private Long coachId;
    private String status;
    private LocalDateTime requestDate;


    public CoachRequestDTO(CoachRequest request) {
        this.id = request.getId();
        this.clientId = request.getClient().getId();
        this.coachId = request.getCoach().getId();
        this.status = request.getStatus();
        this.requestDate = request.getRequestDate();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getClientId() {
        return clientId;
    }

    public void setClientId(Long clientId) {
        this.clientId = clientId;
    }

    public Long getCoachId() {
        return coachId;
    }

    public void setCoachId(Long coachId) {
        this.coachId = coachId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getRequestDate() {
        return requestDate;
    }

    public void setRequestDate(LocalDateTime requestDate) {
        this.requestDate = requestDate;
    }
}
