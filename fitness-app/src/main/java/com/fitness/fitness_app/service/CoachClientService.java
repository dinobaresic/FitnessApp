package com.fitness.fitness_app.service;

import com.fitness.fitness_app.model.CoachClient;
import com.fitness.fitness_app.model.CoachRequest;
import com.fitness.fitness_app.model.User;
import com.fitness.fitness_app.repository.CoachClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CoachClientService implements ICoachClientService{


    @Autowired
    private CoachClientRepository coachClientRepository;


    @Override
    public List<CoachClient> findClientsForCoach(Long coachId) {
        List<CoachClient> clients = coachClientRepository.findByCoachId(coachId);

        System.out.println("Found " + clients.size() + " clients for coachId " + coachId);

        return clients;
    }

    @Override
    public List<CoachClient> findCoachByClientId(Long clientId) {
        return coachClientRepository.findCoachClientByClientId(clientId);
    }


}
