package com.fitness.fitness_app.model;

import aj.org.objectweb.asm.commons.Remapper;
import jakarta.persistence.*;
import org.springframework.boot.autoconfigure.condition.ConditionalOnJava;

@Entity
@Table(name = "link_coach_clients")
public class CoachClient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "coach_id", nullable = false)
    private User coach;

    @ManyToOne
    @JoinColumn(name = "client_id", nullable = false)
    private User client;


    public CoachClient() {
    }

    public CoachClient(User coach, User client) {
        this.coach = coach;
        this.client = client;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getCoach() {
        return coach;
    }

    public void setCoach(User coach) {
        this.coach = coach;
    }

    public User getClient() {
        return client;
    }

    public void setClient(User client) {
        this.client = client;
    }


}
