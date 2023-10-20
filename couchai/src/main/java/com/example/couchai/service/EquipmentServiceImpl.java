package com.example.couchai.service;

import com.example.couchai.repository.EquipmentRepository;
import com.example.couchai.entity.Equipment;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EquipmentServiceImpl implements EquipmentService{
    private final EquipmentRepository equipmentRepository;

    public EquipmentServiceImpl(EquipmentRepository equipmentRepository){
        this.equipmentRepository = equipmentRepository;
    }

    @Override
    public List<Equipment> findAll() {
        return equipmentRepository.findAll();
    }

    @Override
    public Equipment findById(String id) {
        Optional<Equipment> result = equipmentRepository.findById(id);
        if(result.isEmpty()){
            throw new RuntimeException("Not Found");
        }

        return result.get();
    }

    @Override
    public String saveAll(List<Equipment> equipment) {
         equipmentRepository.saveAll(equipment);
         return "Success";
    }

    @Override
    public void deleteById(String id) {
       equipmentRepository.deleteById(id);
    }
}
