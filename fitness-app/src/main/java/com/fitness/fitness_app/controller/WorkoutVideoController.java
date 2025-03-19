package com.fitness.fitness_app.controller;

import com.fitness.fitness_app.model.User;
import com.fitness.fitness_app.model.WorkoutVideo;
import com.fitness.fitness_app.service.WorkoutVideoService;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/workout-video")
public class WorkoutVideoController {


    @Autowired
    private WorkoutVideoService workoutVideoService;


    @GetMapping("/client/{clientId}")
    public List<WorkoutVideo> getVideosForClient(@PathVariable Long clientId) {
        return workoutVideoService.getVideosForClient(clientId);
    }

    @GetMapping("/get/{videoId}")
    public ResponseEntity<UrlResource> getVideo(@PathVariable Long videoId) {
        UrlResource video = workoutVideoService.getVideo(videoId);
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType("video/mp4"))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + video.getFilename() + "\"")
                .body(video);
    }


    @PostMapping("/upload")
    public ResponseEntity<WorkoutVideo> uploadVideo(
            @RequestParam("video") MultipartFile video,
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("coachId") Long coachId,
            @RequestParam("clientId") Long clientId) {
        try {
            WorkoutVideo workoutVideo = workoutVideoService.uploadVideo(video, title, description, coachId, clientId);
            return ResponseEntity.ok(workoutVideo);
        } catch (IOException e) {
            return ResponseEntity.status(500).body(null); // Handle file upload error
        }
    }

}
