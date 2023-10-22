package com.example.couchai.service;

import com.example.couchai.dto.ScheduleByCategoriesDTO;
import com.example.couchai.dto.ScheduleCLI;
import com.example.couchai.entity.Schedule;

import java.util.List;

public interface ScheduleService {
    List<Schedule> findAll();
    ScheduleByCategoriesDTO findAllByCategory();
    String saveAll(List<ScheduleCLI> schedules);

}
