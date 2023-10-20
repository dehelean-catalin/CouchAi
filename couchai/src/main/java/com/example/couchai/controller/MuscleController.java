package com.example.couchai.controller;

import com.example.couchai.dto.MuscleDTO;
import com.example.couchai.entity.Muscle;
import com.example.couchai.service.MuscleService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class MuscleController {
    private final MuscleService muscleService;

    public MuscleController(MuscleService muscleService) {
        this.muscleService = muscleService;
    }
    @GetMapping("/muscles")
    private List<Muscle> findAll(){
        return muscleService.findAll();
    }
    @PostMapping("/muscles")
    private String saveAll(@RequestBody MuscleDTO muscles){
        return muscleService.saveAll(muscles.getMuscles());
    }
}
