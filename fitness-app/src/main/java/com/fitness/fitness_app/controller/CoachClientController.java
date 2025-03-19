package com.fitness.fitness_app.controller;

import com.fitness.fitness_app.model.CoachClient;
import com.fitness.fitness_app.model.User;
import com.fitness.fitness_app.model.UserDTO;
import com.fitness.fitness_app.service.CoachClientService;
import com.fitness.fitness_app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/requests")
public class CoachClientController {

    @Autowired
    private CoachClientService coachClientService;

    @GetMapping("/coach/clients/{coachId}")
    public ResponseEntity<?> getClients(@PathVariable Long coachId) {
        System.out.println("Received coachId: " + coachId); // Debugging line

        if (coachId == null) {
            return ResponseEntity.badRequest().body("coachId is required");
        }

        List<CoachClient> listOfCoachConnections = coachClientService.findClientsForCoach(coachId);

        if (listOfCoachConnections.isEmpty()) {
            return ResponseEntity.ok("No clients assigned to this coach.");
        }

        List<UserDTO> listOfClientInfo = new ArrayList<>();
        for (CoachClient coachClient : listOfCoachConnections) {
            if (coachClient.getClient() == null) {
                return ResponseEntity.status(500).body("Error: Client is null in CoachClient");
            }

            User client = coachClient.getClient();
            if (client.getUsername() == null || client.getEmail() == null) {
                return ResponseEntity.status(500).body("Error: Client details (username or email) are null");
            }

            UserDTO clientInfoDTO = new UserDTO();
            clientInfoDTO.setId(client.getId());
            clientInfoDTO.setUsername(client.getUsername());
            clientInfoDTO.setEmail(client.getEmail());
            listOfClientInfo.add(clientInfoDTO);

            System.out.println("Client found: " + client.getUsername());

        }

        return ResponseEntity.ok(listOfClientInfo);
    }


    @GetMapping("/client/coaches/{clientId}")
    public ResponseEntity<?> getCoachForClientId(@PathVariable Long clientId) {
        if (clientId == null) {
            return ResponseEntity.badRequest().body("clientId is required");
        }

        List<CoachClient> listOfClientsConnections = coachClientService.findCoachByClientId(clientId);

        List<UserDTO> listOfCoachInfo = new ArrayList<>();
        for (CoachClient coachClient : listOfClientsConnections) {
            if (coachClient.getClient() == null) {
                return ResponseEntity.status(500).body("Error: Client is null in CoachClient");
            }

            User coach = coachClient.getCoach();
            if (coach.getUsername() == null || coach.getEmail() == null) {
                return ResponseEntity.status(500).body("Error: Client details (username or email) are null");
            }

            UserDTO coachInfoDTO = new UserDTO();
            coachInfoDTO.setId(coach.getId());
            coachInfoDTO.setUsername(coach.getUsername());
            coachInfoDTO.setEmail(coach.getEmail());
            listOfCoachInfo.add(coachInfoDTO);

            System.out.println("Client found: " + coach.getUsername());

        }

        return ResponseEntity.ok(listOfCoachInfo);
    }



}
