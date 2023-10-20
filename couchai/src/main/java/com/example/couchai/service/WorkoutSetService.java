package com.example.couchai.service;

import com.example.couchai.entity.WorkoutSet;

import java.util.List;

public interface WorkoutSetService {

     List<WorkoutSet> findAll();
     String saveAll(List<WorkoutSet> workoutSets);
}
