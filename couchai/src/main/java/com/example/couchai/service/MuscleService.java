package com.example.couchai.service;

import com.example.couchai.entity.Muscle;

import java.util.List;

public interface MuscleService {
    List<Muscle> findAll();
    String saveAll(List<Muscle> muscles);
}
