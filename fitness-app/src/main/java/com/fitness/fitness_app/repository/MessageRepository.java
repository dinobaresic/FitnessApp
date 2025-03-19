package com.fitness.fitness_app.repository;

import com.fitness.fitness_app.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {

    /**
     * Fetch messages between a sender and a receiver.
     *
     * @param senderId   The ID of the sender.
     * @param receiverId The ID of the receiver.
     * @return List of messages between sender and receiver.
     */
    @Query("SELECT m FROM Message m WHERE " +
            "(m.senderId = :senderId AND m.receiverId = :receiverId) OR " +
            "(m.senderId = :receiverId AND m.receiverId = :senderId) " +
            "ORDER BY m.timestamp ASC")
    List<Message> findBySenderIdAndReceiverId(@Param("senderId") Long senderId, @Param("receiverId") Long receiverId);


    /**
     * Get all messages received by a specific user.
     */
    List<Message> findByReceiverId(Long receiverId);

    /**
     * Custom method to get chat history between two users (either direction).
     */
    List<Message> findBySenderIdAndReceiverIdOrReceiverIdAndSenderIdOrderByTimestamp(
            Long senderId, Long receiverId, Long receiverId2, Long senderId2
    );


    // Retrieve all unread messages for a specific user
    List<Message> findByReceiverIdAndReadFalse(Long receiverId);

}
