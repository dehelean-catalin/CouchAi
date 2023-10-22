package com.example.couchai.service;

import com.example.couchai.dto.WorkoutExerciseFile;
import com.example.couchai.entity.Exercise;
import com.example.couchai.entity.WorkoutExercise;
import com.example.couchai.entity.WorkoutSet;
import com.example.couchai.exception.NotFoundException;
import com.example.couchai.repository.ExerciseRepository;
import com.example.couchai.repository.WorkoutExerciseRepository;
import com.example.couchai.repository.WorkoutSetRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class WorkoutExerciseServiceImpl implements WorkoutExerciseService {

    private final WorkoutExerciseRepository workoutExerciseRepository;
    private final WorkoutSetRepository workoutSetRepository;
    private final ExerciseRepository exerciseRepository;

    public WorkoutExerciseServiceImpl(WorkoutExerciseRepository workoutExerciseRepository, WorkoutSetRepository workoutSetRepository, ExerciseRepository exerciseRepository) {
        this.workoutExerciseRepository = workoutExerciseRepository;
        this.workoutSetRepository = workoutSetRepository;
        this.exerciseRepository = exerciseRepository;
    }

    @Override
    public List<WorkoutExercise> findAll() {
        return workoutExerciseRepository.findAll();
    }

    @Override
    public String saveAll(List<WorkoutExerciseFile> workoutExercises) {
        List<WorkoutExercise> workoutExerciseList = new ArrayList<>();

        for (WorkoutExerciseFile item: workoutExercises){
            WorkoutExercise workoutExercise = new WorkoutExercise();
            workoutExercise.setId(item.getId());
            workoutExercise.setPosition(item.getPosition());

            Exercise ex = item.getExercise();

            if (ex == null || ex.getCustom()){
                continue;
            }

            Optional<Exercise> exerciseOptional = exerciseRepository.findById(ex.getId());

            if (exerciseOptional.isEmpty()){
                throw new NotFoundException("Not found exercise with id - " + ex.getId());
            }

            Exercise exercise = exerciseOptional.get();
            workoutExercise.setExercise(exercise);

            for (WorkoutSet workoutSet : item.getWorkoutExerciseSets()){
                Optional<WorkoutSet> workoutSetOptional = workoutSetRepository.findById(workoutSet.getId());

                if (workoutSetOptional.isEmpty()){
                    throw new NotFoundException("Not found workout set with id - " + workoutSet.getId());
                }

                WorkoutSet set = workoutSetOptional.get();
                List<WorkoutSet> workoutSets = workoutExercise.getWorkoutSets();
                workoutSets.add(set);
                workoutExercise.setWorkoutSets(workoutSets);
            }

            for (WorkoutSet workoutSet : item.getSupersetExercises()){
                Optional<WorkoutSet> workoutSetOptional = workoutSetRepository.findById(workoutSet.getId());

                if (workoutSetOptional.isEmpty()){
                    throw new NotFoundException("Not found workout superset with id - " + workoutSet.getId());
                }

                WorkoutSet set = workoutSetOptional.get();
                List<WorkoutSet> workoutSets = workoutExercise.getWorkoutSets();
                workoutSets.add(set);
                workoutExercise.setWorkoutSuperSets(workoutSets);
            }

            workoutExerciseList.add(workoutExercise);
        }

        workoutExerciseRepository.saveAll(workoutExerciseList);

        return "Success";
    }
}
