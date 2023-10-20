package com.example.couchai.controller;

import com.example.couchai.dto.WorkoutSetDTO;
import com.example.couchai.entity.WorkoutSet;
import com.example.couchai.service.MuscleService;
import com.example.couchai.service.WorkoutSetService;
import org.hibernate.jdbc.Work;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class WorkoutSetController {

    private final WorkoutSetService workoutSetService;

    public WorkoutSetController(WorkoutSetService workoutSetService){
        this.workoutSetService = workoutSetService;
    }

    @GetMapping("/workout-sets")
    public ResponseEntity<List<WorkoutSet>> findAll(){
        return ResponseEntity.ok(workoutSetService.findAll());
    }

    @PostMapping("/workout-sets")
    public ResponseEntity<String> saveAll(@RequestBody WorkoutSetDTO workoutSetDTO){
        return ResponseEntity.ok(workoutSetService.saveAll(workoutSetDTO.getWorkoutSets()));
    }

}
