package com.example.couchai.controller;

import com.example.couchai.dto.ScheduleByCategoriesDTO;
import com.example.couchai.dto.ScheduleDTO;
import com.example.couchai.entity.Schedule;
import com.example.couchai.service.ScheduleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class ScheduleController {

    private final ScheduleService scheduleService;

    public ScheduleController(ScheduleService scheduleService) {
        this.scheduleService = scheduleService;
    }

    @GetMapping("/schedules")
    private ResponseEntity<List<Schedule>>  findAll(){
        return ResponseEntity.ok(scheduleService.findAll());
    }

    @GetMapping("/schedules/categories")
    private ResponseEntity<ScheduleByCategoriesDTO>  findAllByCategory(){
        return ResponseEntity.ok(scheduleService.findAllByCategory());
    }

    @PostMapping("/schedules")
    private ResponseEntity<String> saveAll(@RequestBody ScheduleDTO schedules){
        return ResponseEntity.ok(scheduleService.saveAll(schedules.getSchedules()));
    }

}
