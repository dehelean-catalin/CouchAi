package com.example.couchai.service;

import com.example.couchai.dto.ExerciseFileDTO;
import com.example.couchai.entity.Exercise;

import java.util.List;
import java.util.Map;

public interface ExerciseService {
    Map<String, Exercise> findAll();
    Exercise findById(String id);
    Exercise saveEquipment(String id, String equipmentId);

    Exercise savePrimaryMuscleGroup(String id, String muscleGroupId);

    Exercise saveSecondaryMuscleGroup(String id, String muscleGroupId);
    List<Exercise> saveAll(List<ExerciseFileDTO> exercises);
    String deleteById(String id);
}
