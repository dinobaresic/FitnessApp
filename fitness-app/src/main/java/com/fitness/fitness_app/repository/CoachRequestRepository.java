package com.fitness.fitness_app.repository;

import com.fitness.fitness_app.model.CoachRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CoachRequestRepository extends JpaRepository<CoachRequest, Long> {
    List<CoachRequest> findByClientIdAndStatus(Long clientId, String status);


    List<CoachRequest> findByClientId(Long clientId);
}
