package com.fitness.fitness_app.service;


import com.fitness.fitness_app.model.CoachClient;
import com.fitness.fitness_app.model.CoachRequest;

import java.util.List;

public interface ICoachClientService {
    List<CoachClient> findClientsForCoach(Long coachId);
    List<CoachClient> findCoachByClientId(Long clientId);
}
