package com.gihan.backend.service;

import com.gihan.backend.model.Booking;
import com.gihan.backend.model.Driver;
import com.gihan.backend.repository.BookingRepository;
import com.gihan.backend.repository.DriverRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RideService {

    private final DriverRepository driverRepository;
    private final BookingRepository bookingRepository;

    public RideService(DriverRepository driverRepository, BookingRepository bookingRepository) {
        this.driverRepository = driverRepository;
        this.bookingRepository = bookingRepository;
    }

    public List<Driver> getAvailableDrivers() {
        return driverRepository.findByStatus("AVAILABLE");
    }

    public Booking bookRide(String passengerName) {
        List<Driver> availableDrivers = getAvailableDrivers();

        if (availableDrivers.isEmpty()) {
            throw new RuntimeException("No drivers currently available.");
        }

        // Assign the first available driver
        Driver assignedDriver = availableDrivers.get(0);
        assignedDriver.setStatus("ON_RIDE");
        driverRepository.save(assignedDriver);

        // Create booking record
        Booking booking = new Booking();
        booking.setPassengerName(passengerName);
        booking.setDriver(assignedDriver);

        return bookingRepository.save(booking);
    }

}
