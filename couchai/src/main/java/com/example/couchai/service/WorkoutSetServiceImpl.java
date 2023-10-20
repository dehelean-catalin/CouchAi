package com.example.couchai.service;

import com.example.couchai.entity.WorkoutSet;
import com.example.couchai.repository.WorkoutSetRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkoutSetServiceImpl implements WorkoutSetService {

     private final WorkoutSetRepository workoutSetRepository;

     public WorkoutSetServiceImpl(WorkoutSetRepository workoutSetRepository) {
          this.workoutSetRepository = workoutSetRepository;
     }

     @Override
     public List<WorkoutSet> findAll() {
          return workoutSetRepository.findAll();
     }

     @Override
     public String saveAll(List<WorkoutSet> workoutSets) {
          workoutSetRepository.saveAll(workoutSets);
          return "Success";
     }
}
