package com.fitness.fitness_app.controller;

import com.fitness.fitness_app.model.Message;
import com.fitness.fitness_app.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDateTime;
import java.util.List;

@Controller
@RequestMapping("/chat/messages")
public class ChatController {

    @Autowired
    private MessageService messageService;

    @PostMapping("/send")
    public ResponseEntity<Message> sendMessage(
            @RequestParam Long senderId,
            @RequestParam Long receiverId,
            @RequestParam String content
    ) {
        Message message = new Message();
        message.setSenderId(senderId);
        message.setReceiverId(receiverId);
        message.setContent(content);
        message.setTimestamp(LocalDateTime.now());

        Message savedMessage = messageService.saveMessage(message);


        return ResponseEntity.status(HttpStatus.CREATED).body(savedMessage);
    }

    /**
     * Fetch all messages between two users (coach and client).
     *
     * @param senderId   ID of the sender (coach).
     * @param receiverId ID of the receiver (client).
     * @return List of messages exchanged between the two users.
     */
    @GetMapping("/between")
    public ResponseEntity<List<Message>> getMessagesBetweenUsers(
            @RequestParam Long senderId,
            @RequestParam Long receiverId
    ) {
        // Call the service to get messages between the sender and receiver
        List<Message> messages = messageService.getMessagesBetweenUsers(senderId, receiverId);
        return ResponseEntity.ok(messages);
    }






}
