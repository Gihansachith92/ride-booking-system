# 🚖 Ride Booking Application

A clean and simple full-stack web application built to manage drivers and handle ride booking requests. This project was developed as a technical assessment to show how to connect a React frontend with a Spring Boot backend using a MySQL database.

## 🎥 Application Demonstration
Due to file size constraints, the full demonstration video is securely hosted on Google Drive. 
[Click here to watch the 5-minute Video Demonstration](https://drive.google.com/file/d/1GvJcVhOCtAVGDJsCCX-DTApT67vTFjjs/view?usp=sharing)

## 🛠️ Tech Stack

* **Frontend:** React.js
* **Backend:** Java, Spring Boot, Spring Data JPA
* **Database:** MySQL

## ✨ Core Features

* **Driver Dashboard:** Displays a live list of drivers who are currently online and available.
* **Ride Booking:** Users can enter their name and request a ride.
* **Automatic Assignment:** The backend automatically finds the next available driver and assigns them to the booking.
* **Status Updates:** Once assigned, a driver's status immediately updates from `AVAILABLE` to `ON_RIDE`.

## 🚀 Getting Started

Follow these steps to run the project on your local machine.

### Prerequisites
Make sure you have the following installed:
* Java 17 or higher
* Node.js and npm
* MySQL Server

### 1. Database Setup
1. Open your MySQL client.
2. Create a new database named `ride_booking_db`.
3. The tables will be created automatically when the backend starts. 
4. *(Optional)* Add some sample drivers to the `driver` table so you have data to view.

### 2. Backend Setup (Spring Boot)
1. Open your terminal and go to the backend folder.
2. Open `src/main/resources/application.properties` and update the database username and password to match your local MySQL setup.
3. Run the application:
```bash
   ./mvnw spring-boot:run
