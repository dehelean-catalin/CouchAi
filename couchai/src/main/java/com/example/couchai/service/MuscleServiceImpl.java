package com.example.couchai.service;

import com.example.couchai.repository.MuscleRepository;
import com.example.couchai.entity.Muscle;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MuscleServiceImpl implements MuscleService{

    private final MuscleRepository muscleRepository;

    public MuscleServiceImpl(MuscleRepository muscleRepository) {
        this.muscleRepository = muscleRepository;
    }

    @Override
    public List<Muscle> findAll() {
        return muscleRepository.findAll();
    }

    @Override
    public String saveAll(List<Muscle> muscles) {
        muscleRepository.saveAll(muscles);
        return "Success";
    }
}
