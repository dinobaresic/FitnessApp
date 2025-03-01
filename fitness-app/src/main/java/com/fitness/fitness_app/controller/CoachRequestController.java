package com.fitness.fitness_app.controller;

import com.fitness.fitness_app.model.CoachRequest;
import com.fitness.fitness_app.model.CoachRequestDTO;
import com.fitness.fitness_app.model.User;
import com.fitness.fitness_app.service.CoachRequestService;
import com.fitness.fitness_app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/coach-requests")
public class CoachRequestController {

    @Autowired
    private CoachRequestService coachRequestService;

    @Autowired
    private UserService userService;

    @PostMapping("/send")
    public ResponseEntity<?> sendRequest(@RequestParam Long coachId, @RequestParam String clientIdentifier) {
        Optional<User> coachOpt = Optional.ofNullable(userService.getUserById(coachId));
        Optional<User> clientOpt = Optional.ofNullable((User) userService.findUsernameOrEmail(clientIdentifier));

        if (coachOpt.isEmpty() || clientOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Client not found");
        }

        User coach = coachOpt.get();
        User client = clientOpt.get();

        if (!coach.getRole().equals("COACH") || !client.getRole().equals("CLIENT")) {
            return ResponseEntity.badRequest().body("User is not client!");
        }

        CoachRequest request = new CoachRequest(coach, client);
        coachRequestService.save(request);
        return ResponseEntity.ok("Request sent successfully!");
    }

    @GetMapping("/client/requests")
    public ResponseEntity<List<CoachRequestDTO>> getClientRequests(@RequestParam Long clientId) {
        try {
            List<CoachRequest> requests = coachRequestService.findByClientIdAndStatus(clientId, "PENDING");

            // Convert to DTOs
            List<CoachRequestDTO> requestDTOs = requests.stream()
                    .map(CoachRequestDTO::new)
                    .collect(Collectors.toList());

            return ResponseEntity.ok(requestDTOs);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Collections.emptyList());
        }
    }
    @PostMapping("/{requestId}/respond")
    public ResponseEntity<?> respondToRequest(@PathVariable Long requestId, @RequestParam String action) {
        Optional<CoachRequest> requestOpt = coachRequestService.findById(requestId);

        if (requestOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Request not found");
        }

        CoachRequest request = requestOpt.get();

        if (action.equalsIgnoreCase("accept")) {
            request.setStatus("ACCEPTED");
            User client = request.getClient();
            client.setCoach(request.getCoach());
            userService.createUser(client);
        } else {
            request.setStatus("DECLINED");
        }

        coachRequestService.save(request);

        return ResponseEntity.ok("Request processed successfully!");

    }

}
