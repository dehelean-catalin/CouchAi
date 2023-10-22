package com.example.couchai.service;

import com.example.couchai.repository.EquipmentRepository;
import com.example.couchai.repository.ExerciseRepository;
import com.example.couchai.repository.MuscleRepository;
import com.example.couchai.dto.ExerciseFileDTO;
import com.example.couchai.entity.Equipment;
import com.example.couchai.entity.Exercise;
import com.example.couchai.entity.Muscle;

import com.example.couchai.exception.NotFoundException;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class ExerciseServiceImpl implements ExerciseService{

    private final ExerciseRepository exerciseRepository;
    private final EquipmentRepository equipmentRepository;

    private final MuscleRepository muscleRepository;

    public ExerciseServiceImpl(ExerciseRepository exerciseRepository, EquipmentRepository equipmentRepository, MuscleRepository muscleRepository) {
        this.exerciseRepository = exerciseRepository;
        this.equipmentRepository = equipmentRepository;
        this.muscleRepository = muscleRepository;
    }

    @Override
    public Map<String, Exercise> findAll() {
        List<Exercise> exercises = exerciseRepository.findAll(Sort.by(Sort.Direction.ASC, "name"));

        return exercises.stream()
               .collect(Collectors.toMap(
                       Exercise::getId,
                       Function.identity(),
                       (existing, replacement) -> existing,
                       LinkedHashMap::new
               ));
    }

    @Override
    public Exercise findById(String id) {
        Optional<Exercise> result = exerciseRepository.findById(id);

        if(result.isEmpty()){
            throw new NotFoundException("Not found Exercise with id - " + id);
        }

        return result.get();
    }

    @Override
    public Exercise saveEquipment(String id, String equipmentId) {
        Optional<Exercise> exerciseOpt = exerciseRepository.findById(id);
        Optional<Equipment> equipmentOpt = equipmentRepository.findById(equipmentId);

        if(exerciseOpt.isEmpty()){
            throw new NotFoundException("Not found Exercise with id - " + id);
        }

        if(equipmentOpt.isEmpty()){
            throw new NotFoundException("Not found Equipment with id - " + id);
        }

        Exercise exercise = exerciseOpt.get();
        Equipment equipment = equipmentOpt.get();

        Set<Equipment> equipmentSet = exercise.getEquipments();
        equipmentSet.add(equipment);
        exercise.setEquipments(equipmentSet);

        return exerciseRepository.save(exercise);
    }
    @Override
    public Exercise savePrimaryMuscleGroup(String id, String muscleGroupId){
        Optional<Exercise> exerciseOpt = exerciseRepository.findById(id);
        Optional<Muscle> muscleOpt = muscleRepository.findById(muscleGroupId);

        if(exerciseOpt.isEmpty()){
            throw new NotFoundException("Not found Exercise with id - " + id);
        }

        if(muscleOpt.isEmpty()){
            throw new NotFoundException("Not found Muscle with id - " + id);
        }

        Exercise exercise = exerciseOpt.get();
        Muscle muscle = muscleOpt.get();

        Set<Muscle> exerciseGroupSet = exercise.getPrimaryMuscleGroup();
        exerciseGroupSet.add( muscle);
        exercise.setPrimaryMuscleGroup(exerciseGroupSet);

        return exerciseRepository.save(exercise);

    }

    public Exercise saveSecondaryMuscleGroup(String id, String muscleGroupId){
        Optional<Exercise> exerciseOpt = exerciseRepository.findById(id);
        Optional<Muscle> muscleOpt = muscleRepository.findById(muscleGroupId);

        if(exerciseOpt.isEmpty()){
            throw new RuntimeException("Not found Exercise with - " + id);
        }

        if(muscleOpt.isEmpty()){
            throw new RuntimeException("Not found Muscle with - " + id);
        }

        Exercise exercise = exerciseOpt.get();
        Muscle muscle = muscleOpt.get();

        Set<Muscle> muscleMap = exercise.getSecondaryMuscleGroup();
        muscleMap.add(muscle);
        exercise.setSecondaryMuscleGroup(muscleMap);

        return exerciseRepository.save(exercise);

    }
    @Override
    public List<Exercise> saveAll(List<ExerciseFileDTO> exercisesDTO) {
         List<Exercise> exercises = new ArrayList<>();

         for(ExerciseFileDTO ex: exercisesDTO){
             if(ex.getCustom()){
                 continue;
             }

             Exercise exercise = new Exercise(ex.getId(),
                     ex.getName(),
                     ex.getInstructions(),
                     ex.getCategory(),
                     Objects.equals(ex.getMechanicsType(), "compound"),
                     ex.getMainBodyPart(),
                     false,
                     false,
                     ex.getStandardResolutionUrl(),
                     ex.getThumbnailUrl());

             for(var theEquipment: ex.getEquipmentRequired()){
                 String id = theEquipment.getId();
                 Optional<Equipment> equipmentOptional =  equipmentRepository.findById(id);

                 if (equipmentOptional.isEmpty()){
                     throw new NotFoundException("Not found Equipment with id - " + id);
                 }

                 Equipment equipment = equipmentOptional.get();
                 Set<Equipment> equipmentSet = exercise.getEquipments();
                 equipmentSet.add(equipment);
                 exercise.setEquipments(equipmentSet);
             }

             for(var theMuscle: ex.getPrimaryMuscleGroups()){
                 String id = theMuscle.getId();
                 Optional<Muscle> muscleOptional =  muscleRepository.findById(theMuscle.getId());

                 if (muscleOptional.isEmpty()){
                     throw new NotFoundException("Not found Muscle Group with id - " + id);
                 }

                 Muscle muscle = muscleOptional.get();
                 Set<Muscle> exerciseSet = exercise.getPrimaryMuscleGroup();
                 exerciseSet.add(muscle);
                 exercise.setPrimaryMuscleGroup(exerciseSet);
             }

             for(var theMuscle: ex.getSecondaryMuscleGroups()){
                 String id = theMuscle.getId();
                 Optional<Muscle> muscleOptional =  muscleRepository.findById(id);

                 if (muscleOptional.isEmpty()){
                     throw new NotFoundException("Not found Secondary Muscle Group with id - " + id);
                 }

                 Muscle muscle = muscleOptional.get();
                 Set<Muscle> exerciseSet = exercise.getSecondaryMuscleGroup();
                 exerciseSet.add(muscle);
                 exercise.setSecondaryMuscleGroup(exerciseSet);
             }

             exercises.add(exercise);
         }
         return  exerciseRepository.saveAll(exercises);
    }

    @Override
    public String deleteById(String id) {
        Optional<Exercise> exercise = exerciseRepository.findById(id);

        if (exercise.isEmpty()){
            throw new NotFoundException("Not found Exercise with id - " + id);
        }

        exerciseRepository.deleteById(id);

        return "Deleted Exercise with id - " + id;
    }
}
