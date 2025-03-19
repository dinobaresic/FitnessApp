package com.fitness.fitness_app.service;

import com.fitness.fitness_app.model.User;
import com.fitness.fitness_app.model.WorkoutVideo;
import com.fitness.fitness_app.repository.WorkoutVideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
public class WorkoutVideoService {

    @Autowired
    private  WorkoutVideoRepository workoutVideoRepository;


    public List<WorkoutVideo> getVideosForClient(Long clientId) {
        return workoutVideoRepository.findByClientId(clientId);
    }

    public WorkoutVideo uploadVideo(MultipartFile video, String title, String description, Long coachId, Long clientId) throws IOException {
        // Save the video file on the server

        /*
        String videoFileName = video.getOriginalFilename();
        Path videoPath = Paths.get("videos", videoFileName);
        Files.createDirectories(videoPath.getParent());
        video.transferTo(videoPath);

         */

        String videoFileName = video.getOriginalFilename();

        Path videoPath = Paths.get("videos", videoFileName);

        String videoFilePath = videoPath.toString().replace("\\", "/");

        Path finalPath = Paths.get(videoFilePath);
        Files.createDirectories(finalPath.getParent());  // Create the parent directories if they don't exist
        video.transferTo(finalPath);





        // Create a new video entity
        WorkoutVideo workoutVideo = new WorkoutVideo();
        workoutVideo.setTitle(title);
        workoutVideo.setDescription(description);
        workoutVideo.setVideoUrl(videoFilePath);
        workoutVideo.setCoachId(coachId);
        workoutVideo.setClientId(clientId);

        // Save the video in the database
        return workoutVideoRepository.save(workoutVideo);
    }

    public WorkoutVideo getVideoById(Long videoId) {
        return workoutVideoRepository.findById(videoId).orElse(null);
    }

    public UrlResource getVideo(Long videoId) {
        WorkoutVideo workoutVideo = workoutVideoRepository.findById(videoId).orElse(null);
        if (workoutVideo == null) {
            return null;
        }

        try {
            return new UrlResource("file:" + workoutVideo.getVideoUrl());
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
