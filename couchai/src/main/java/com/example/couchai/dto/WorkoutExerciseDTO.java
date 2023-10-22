package com.example.couchai.dto;

import lombok.Data;

import java.util.List;

@Data
public class WorkoutExerciseDTO {
   private List<WorkoutExerciseFile> exercises;
}
