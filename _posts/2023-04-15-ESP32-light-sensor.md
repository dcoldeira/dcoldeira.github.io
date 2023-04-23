---
title: "Weather Station with ESP32 - Part III"
layout: single
date: 2023-04-17
categories:
  - projects
tags:
  - ESP32
  - BMP180
  - weather station
  - IoT
---

In this project, we will be building upon the [previous post](https://dcoldeira.github.io/projects/XTVTX-module-weather-station-II/), in which we used a BMP180 sensor to measure temperature and pressure, and displayed the data on an OLED display. We will be adding new features to the project, including the ability to display the current date and time using the internal clock of the ESP32, a photoresistor to measure the ambient light level, and a push button to switch between different modes of display on the OLED. Additionally, we will incorporate an active buzzer and LED to alert the user when the temperature or pressure exceeds a certain threshold value. With these new features, our weather station will be even more capable of providing real-time weather information.

## Materials 

- Photoresistor
- 10kΩ resistor (for the photoresistor)
- Active buzzer
- Push button
- 10kΩ resistor (for the push button)



<p align="center">
  <img src="{{ '/assets/images/post5/1.jpg' | relative_url }}" width="250" height="250">
</p>



## Setup

These are the step to connect the components:


1. We Connect the photoresistor to the ESP32 board. We use a resistor as a voltage divider to convert the varying resistance of the photoresistor into a measurable voltage.
2. We then connect the active buzzer and LED to the ESP32 board. Using a transistor to switch the power to the buzzer and LED when a threshold value is reached.


## Programming

```c++

//work in progress

```

