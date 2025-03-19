package com.fitness.fitness_app.model;

import jakarta.persistence.*;

@Entity
@Table(name = "workout_videos")
public class WorkoutVideo {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String videoUrl;

    @Column(nullable = false)
    private Long clientId; // Store only the client ID, not the full User object

    @Column(nullable = false)
    private Long coachId; // Store only the coach ID, not the full User object

    public WorkoutVideo() {
    }

    public WorkoutVideo(String title, String description, String videoUrl, Long clientId, Long coachId) {
        this.title = title;
        this.description = description;
        this.videoUrl = videoUrl;
        this.clientId = clientId;
        this.coachId = coachId;
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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getVideoUrl() {
        return videoUrl;
    }

    public void setVideoUrl(String videoUrl) {
        this.videoUrl = videoUrl;
    }


}
