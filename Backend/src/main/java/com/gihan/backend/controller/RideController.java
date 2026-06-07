package com.gihan.backend.controller;

import com.gihan.backend.model.Booking;
import com.gihan.backend.model.Driver;
import com.gihan.backend.service.RideService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class RideController {

    private final RideService rideService;

    public RideController(RideService rideService) {
        this.rideService = rideService;
    }

    @GetMapping("/drivers")
    public List<Driver> getAvailableDrivers() {
        return rideService.getAvailableDrivers();
    }

    @PostMapping("/bookings")
    public Booking bookRide(@RequestBody Map<String, String> payload) {
        String passengerName = payload.get("passengerName");
        return rideService.bookRide(passengerName);
    }

}
