package com.example.couchai.service;

import com.example.couchai.dto.WorkoutDayCLI;
import com.example.couchai.entity.WorkoutDay;

import java.util.List;

public interface WorkoutDayService {
    List<WorkoutDay> findAll();
    String saveAll(List<WorkoutDayCLI> workoutDays);
}
