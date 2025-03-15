package com.fitness.fitness_app.service;

import com.fitness.fitness_app.model.Message;
import com.fitness.fitness_app.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;


    /**
     * Saves a message.
     */
    public Message saveMessage(Message message) {
        return messageRepository.save(message);
    }

    /**
     * Retrieves all messages between a sender and receiver.
     */
    public List<Message> getMessagesBetweenUsers(Long senderId, Long receiverId) {
        return messageRepository.findBySenderIdAndReceiverId(senderId, receiverId);
    }

    /**
     * Retrieves chat history (bi-directional messages, sorted by timestamp).
     */
    public List<Message> getChatHistory(Long userId1, Long userId2) {
        return messageRepository.findBySenderIdAndReceiverIdOrReceiverIdAndSenderIdOrderByTimestamp(userId1, userId2, userId2, userId1);
    }

    /**
     * Retrieves all messages received by a user.
     */
    public List<Message> getAllReceivedMessages(Long receiverId) {
        return messageRepository.findByReceiverId(receiverId);
    }


}
