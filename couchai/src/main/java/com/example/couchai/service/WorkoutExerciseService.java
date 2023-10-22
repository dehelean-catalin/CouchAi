package com.example.couchai.service;

import com.example.couchai.dto.WorkoutExerciseFile;
import com.example.couchai.entity.WorkoutExercise;

import java.util.List;

public interface WorkoutExerciseService {

    List<WorkoutExercise> findAll();
    String saveAll(List<WorkoutExerciseFile> workoutExercises);
}
