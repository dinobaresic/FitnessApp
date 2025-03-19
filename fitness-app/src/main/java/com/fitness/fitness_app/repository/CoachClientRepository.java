package com.fitness.fitness_app.repository;

import com.fitness.fitness_app.model.CoachClient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CoachClientRepository extends JpaRepository<CoachClient, Long> {
    CoachClient findByCoachIdAndClientId(Long coachId, Long clientId);
    CoachClient findByClientId(Long clientId);
    List<CoachClient> findByCoachId(Long coachId);

    List<CoachClient> findClientsIdByCoachId(Long coachId);


    List<CoachClient> findCoachClientByClientId(Long clientId);


}
