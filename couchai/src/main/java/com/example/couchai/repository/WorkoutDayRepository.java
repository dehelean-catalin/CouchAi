package com.example.couchai.repository;

import com.example.couchai.entity.WorkoutDay;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkoutDayRepository extends JpaRepository<WorkoutDay,String> {
}
