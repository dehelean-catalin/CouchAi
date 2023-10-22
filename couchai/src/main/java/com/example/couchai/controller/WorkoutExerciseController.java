package com.example.couchai.controller;

import com.example.couchai.dto.WorkoutExerciseDTO;
import com.example.couchai.entity.WorkoutExercise;
import com.example.couchai.service.WorkoutExerciseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class WorkoutExerciseController {

    private final WorkoutExerciseService workoutExerciseService;

    public WorkoutExerciseController(WorkoutExerciseService workoutExerciseService) {
        this.workoutExerciseService = workoutExerciseService;
    }

    @GetMapping("/workout-exercises")
    public ResponseEntity<List<WorkoutExercise>> findAll(){
        return ResponseEntity.ok(workoutExerciseService.findAll());
    }

    @PostMapping("/workout-exercises")
    public ResponseEntity<String>  saveAll(@RequestBody WorkoutExerciseDTO workoutExerciseDTO){
        return ResponseEntity.ok(workoutExerciseService.saveAll(workoutExerciseDTO.getExercises()));
    }
}
