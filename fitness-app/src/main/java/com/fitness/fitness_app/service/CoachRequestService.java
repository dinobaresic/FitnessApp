package com.fitness.fitness_app.service;

import com.fitness.fitness_app.model.CoachRequest;
import com.fitness.fitness_app.repository.CoachRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CoachRequestService implements ICoachRequestService{

    @Autowired
    private CoachRequestRepository coachRequestRepository;

    public CoachRequest save(CoachRequest request) {
        if (request.getRequestDate() == null) {
            request.setRequestDate(LocalDateTime.now());
        }
        return coachRequestRepository.save(request);
    }
    @Override
    public Optional<CoachRequest> findById(Long id) {
        return coachRequestRepository.findById(id);
    }

    @Override
    public List<CoachRequest> findPendingRequestsForClient(Long clientId) {
        return coachRequestRepository.findByClientIdAndStatus(clientId, "PENDING");
    }

    public List<CoachRequest> findByClientId(Long clientId) {
        return coachRequestRepository.findByClientId(clientId);
    }

    public List<CoachRequest> findByClientIdAndStatus(Long clientId, String pending) {
        return coachRequestRepository.findByClientIdAndStatus(clientId, pending);
    }
}
