package com.example.couchai.service;

import com.example.couchai.dto.ScheduleByCategoriesDTO;
import com.example.couchai.dto.ScheduleCLI;
import com.example.couchai.dto.WorkoutDayCLI;
import com.example.couchai.entity.Schedule;
import com.example.couchai.entity.WorkoutDay;
import com.example.couchai.repository.ScheduleRepository;
import com.example.couchai.repository.WorkoutDayRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ScheduleServiceImpl implements ScheduleService {

    private final ScheduleRepository scheduleRepository;
    private final WorkoutDayRepository workoutDayRepository;

    public ScheduleServiceImpl(ScheduleRepository scheduleRepository, WorkoutDayRepository workoutDayRepository) {
        this.scheduleRepository = scheduleRepository;
        this.workoutDayRepository = workoutDayRepository;
    }

    @Override
    public List<Schedule> findAll() {
        return scheduleRepository.findAll();
    }

    @Override
    public ScheduleByCategoriesDTO findAllByCategory() {
        List<Schedule> schedules = scheduleRepository.findAll();

        ScheduleByCategoriesDTO scheduleByCategoriesDTO = new ScheduleByCategoriesDTO();

        for (Schedule schedule : schedules){
            String mainGoal = schedule.getMainGoal();
            if (Objects.equals(mainGoal,"gain_strength")){
               System.out.println("here");
               List<Schedule> gainStrength = scheduleByCategoriesDTO.getGainStrength();
               gainStrength.add(schedule);
               scheduleByCategoriesDTO.setGainStrength(gainStrength);
            }

            if (Objects.equals(mainGoal,"build_muscle")){

                List<Schedule> buildMuscle = scheduleByCategoriesDTO.getBuildMuscle();
                buildMuscle.add(schedule);
                scheduleByCategoriesDTO.setBuildMuscle(buildMuscle);

            }

            if (Objects.equals(mainGoal,"lose_fat")){

                List<Schedule> loseFat = scheduleByCategoriesDTO.getLoseFat();
                loseFat.add(schedule);
                scheduleByCategoriesDTO.setLoseFat(loseFat);

            }
        }

        return scheduleByCategoriesDTO;
    }

    @Override
    public String saveAll(List<ScheduleCLI> schedules) {
        List<Schedule> scheduleList = new ArrayList<>();

        for (ScheduleCLI scheduleCLI : schedules){
            if (scheduleCLI.isCustom()){
                continue;
            }

            Schedule schedule = new Schedule(
                    scheduleCLI.getId(),
                    scheduleCLI.getName(),
                    scheduleCLI.getCoverPhoto(),
                    scheduleCLI.isCustom(),
                    scheduleCLI.getDaysPerWeek(),
                    scheduleCLI.getDescription(),
                    scheduleCLI.getMainGoal(),
                    scheduleCLI.isPremium(),
                    scheduleCLI.getTrainingLevel());

            scheduleList.add(schedule);

            for (WorkoutDayCLI workoutDayCLI: scheduleCLI.getWorkouts()){
                Optional<WorkoutDay> workoutDayOptional = workoutDayRepository.findById(workoutDayCLI.getId());

                if (workoutDayOptional.isEmpty()){
                    continue;
                }


                WorkoutDay workoutDay = workoutDayOptional.get();

                Map<String,WorkoutDay> workoutDays = schedule.getWorkoutDays();
                workoutDays.put(workoutDay.getId(),workoutDay);
                schedule.setWorkoutDays(workoutDays);
            }
        }

        scheduleRepository.saveAll(scheduleList);
        return "Success";
    }
}
