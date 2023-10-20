package com.example.couchai.controller;

import com.example.couchai.dto.ExerciseDTO;
import com.example.couchai.entity.Exercise;
import com.example.couchai.service.EquipmentService;
import com.example.couchai.service.ExerciseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class ExerciseController {
    private final ExerciseService exerciseService;

    public ExerciseController(ExerciseService exerciseService, EquipmentService equipmentService) {
        this.exerciseService = exerciseService;
    }

    @GetMapping("/exercises")
    public ResponseEntity<Map<String, Exercise>> findAll(){
        return ResponseEntity.ok(exerciseService.findAll());
    }

    @GetMapping("/exercises/{id}")
    public ResponseEntity<Exercise> findById(@PathVariable String id){
        return ResponseEntity.ok(exerciseService.findById(id));
    }

    @PostMapping("/exercises/{id}/equipments/{equipmentId}")
    public ResponseEntity<Exercise> updateExerciseEquipment(
            @PathVariable String id, @PathVariable String equipmentId) {

        Exercise updatedExercise = exerciseService.saveEquipment(id,equipmentId);

        return ResponseEntity.ok(updatedExercise);
    }
    @PostMapping("/exercises/{id}/primary-muscles/{muscleGroupId}")
    public ResponseEntity<Exercise> updateExercisePrimaryMuscleGroup(
            @PathVariable String id, @PathVariable String muscleGroupId) {
        Exercise exercise = exerciseService.savePrimaryMuscleGroup(id, muscleGroupId);

        return ResponseEntity.ok(exercise);
    }

    @PostMapping("/exercises/{id}/secondary-muscles/{muscleGroupId}")
    public ResponseEntity<Exercise> updateExerciseSecondaryMuscleGroup(
            @PathVariable String id, @PathVariable String muscleGroupId) {

        Exercise exercise = exerciseService.saveSecondaryMuscleGroup(id, muscleGroupId);

        return ResponseEntity.ok(exercise);
    }

    @PostMapping("/exercises")
    public ResponseEntity<List<Exercise>> saveAll(@RequestBody ExerciseDTO exercises){
        return ResponseEntity.ok(exerciseService.saveAll(exercises.getExercises()));
    }

    @DeleteMapping("/exercises/{id}")
    public ResponseEntity<String> deleteById(@PathVariable String id){
        return ResponseEntity.ok(exerciseService.deleteById(id));
    }
}


