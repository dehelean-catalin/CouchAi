package com.example.couchai.controller;

import com.example.couchai.dto.WorkoutDayDTO;
import com.example.couchai.entity.WorkoutDay;
import com.example.couchai.service.WorkoutDayService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class WorkoutDayController {
    private final WorkoutDayService workoutDayService;

    public WorkoutDayController(WorkoutDayService workoutDayService) {
        this.workoutDayService = workoutDayService;
    }

    @GetMapping("/workout-days")
    private ResponseEntity<List<WorkoutDay>> findAll(){
        return  ResponseEntity.ok(workoutDayService.findAll());
    }

    @PostMapping("/workout-days")
    private ResponseEntity<String> saveAll(@RequestBody WorkoutDayDTO workoutDayDTO){
        return  ResponseEntity.ok(workoutDayService.saveAll(workoutDayDTO.getWorkoutDays()));
    }
}
