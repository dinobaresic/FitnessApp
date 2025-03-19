package com.fitness.fitness_app.repository;

import com.fitness.fitness_app.model.User;
import com.fitness.fitness_app.model.WorkoutVideo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkoutVideoRepository extends JpaRepository<WorkoutVideo, Long> {


    List<WorkoutVideo> findByClientId(Long clientId);

}
