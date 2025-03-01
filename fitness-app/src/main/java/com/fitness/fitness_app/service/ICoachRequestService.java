package com.fitness.fitness_app.service;

import com.fitness.fitness_app.model.CoachRequest;

import java.util.List;
import java.util.Optional;

public interface ICoachRequestService {
    CoachRequest save(CoachRequest request);
    Optional<CoachRequest> findById(Long id);
    List<CoachRequest> findPendingRequestsForClient(Long clientId);
}
