package com.example.couchai.service;

import com.example.couchai.dto.WorkoutDayCLI;
import com.example.couchai.dto.WorkoutExerciseFile;
import com.example.couchai.entity.WorkoutDay;
import com.example.couchai.entity.WorkoutExercise;
import com.example.couchai.exception.NotFoundException;
import com.example.couchai.repository.WorkoutDayRepository;
import com.example.couchai.repository.WorkoutExerciseRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class WorkoutDayServiceImpl implements WorkoutDayService{

    public final WorkoutDayRepository workoutDayRepository;
    public final WorkoutExerciseRepository workoutExerciseRepository;

    public WorkoutDayServiceImpl(WorkoutDayRepository workoutDayRepository, WorkoutExerciseRepository workoutExerciseRepository) {
        this.workoutDayRepository = workoutDayRepository;
        this.workoutExerciseRepository = workoutExerciseRepository;
    }

    @Override
    public List<WorkoutDay> findAll() {
        return workoutDayRepository.findAll();
    }

    @Override
    public String saveAll(List<WorkoutDayCLI> workoutDays) {
        List<WorkoutDay> workoutDayList = new ArrayList<>();

        for (WorkoutDayCLI item: workoutDays){
            WorkoutDay workoutDay = new WorkoutDay(item.getId(),item.getName(),item.getPosition());

            for (WorkoutExerciseFile ex : item.getExerciseList()){
                System.out.println(ex.getExercise());
                if (ex.getExercise() == null){
                    continue;
                }

                Optional<WorkoutExercise>  workoutExerciseOptional = workoutExerciseRepository.findById(ex.getId());

                if (workoutExerciseOptional.isEmpty()){
                    continue;
                }

                WorkoutExercise workoutExercise = workoutExerciseOptional.get();

                List<WorkoutExercise> workoutExercises =  workoutDay.getWorkoutExercises();
                workoutExercises.add(workoutExercise);
                workoutDay.setWorkoutExercises(workoutExercises);
            }

            workoutDayList.add(workoutDay);
        }

        workoutDayRepository.saveAll(workoutDayList);

        return "Success";
    }
}
