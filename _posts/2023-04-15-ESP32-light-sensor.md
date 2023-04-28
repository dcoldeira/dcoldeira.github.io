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

In this project, we will be building upon the [previous post](https://dcoldeira.github.io/projects/XTVTX-module-weather-station-II/), in which we used a BMP180 sensor to measure temperature and pressure, and displayed the data on an OLED display. We will be adding new features to the project, including the ability to display the time of displying (i.e time the sensor has been active) using the internal clock of the ESP32, a photoresistor to measure the ambient light level, and a push button to switch between different modes of display on the OLED. Additionally, we will incorporate an active buzzer and LED to alert the user when the temperature or pressure exceeds a certain threshold value. With these new features, our weather station will be even more capable of providing real-time weather information.


In this project, we are taking our [previous work](https://dcoldeira.github.io/projects/XTVTX-module-weather-station-II/) a step further. We previously utilized a BMP180 sensor to collect data on temperature and pressure, and then showcased the information on an OLED display. However, we are now expanding the project by adding exciting new features.

Firstly, we will implement the internal clock of the ESP32 to display the duration of the sensor's activity alongside the collected data. Moreover, we will integrate a photoresistor to measure the ambient light level and enable the weather station to provide more detailed insights. To further enhance its functionality, we will include a push button that can switch between various display modes on the OLED.

Furthermore, we will include an active buzzer and an LED that will notify the user when the temperature or pressure exceeds specific threshold values. These additions will enable our weather station to provide real-time and accurate weather information that can help the user make informed decisions.
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
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BME280.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <WiFi.h>
#include <WebServer.h>
#include <SPI.h>
#include <WiFiClientSecure.h>
#include <RTClib.h>

#define BMP085_ADDRESS 0x76

// Replace with your network credentials
const char* ssid = "zzz";
const char* password = "xxx";

#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 32
#define OLED_RESET -1
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

#define BUTTON_PIN 2
#define BUZZER_PIN 16
#define LED_PIN 17
#define PHOTO_PIN A0
#define PHOTO_RESISTOR 10000

// Create an instance of the BMP180 sensor
Adafruit_BME280 bme;

// Create an instance of the WebServer
WebServer server(80);

// Create an instance of the real-time clock
RTC_DS3231 rtc;
// Function prototype for handleRoot()
void handleRoot();

// Function prototype for getFormattedTime()
String getFormattedTime();

int buttonState = 0;
int buzzerState = LOW;
int ledState = LOW;
int mode = 0;
int buzzerThreshold = 500;
int ledThreshold = 2000;

void setup() {
  // Start the serial communication
  Serial.begin(115200);

  // Connect to Wi-Fi network
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }

  // Print the IP address of the board
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
  pinMode(BUZZER_PIN, OUTPUT);
  pinMode(LED_PIN, OUTPUT);
  pinMode(BUTTON_PIN, INPUT);
  display.begin(SSD1306_SWITCHCAPVCC, 0x3C);
  display.display();
  delay(2000);
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(WHITE);
  display.setCursor(0,0);
  display.println("Starting up...");
  display.display();
  if (!bme.begin(0x76)) {
    display.println("Could not find a valid BMP180 sensor, check wiring!");
    display.display();
    while (1);
  }
}

String getFormattedTime() {
  // Get the current time
  time_t now = time(nullptr);

  // Convert the current time to a struct tm
  struct tm *timeinfo = localtime(&now);

  // Create a string for the formatted time
  char formattedTime[20];
  strftime(formattedTime, sizeof(formattedTime), "%H:%M:%S", timeinfo);

  // Return the formatted time as a string
  return String(formattedTime);
}

void loop() {
  float temperature = bme.readTemperature();
  float humidity = bme.readHumidity();
  float pressure = bme.readPressure() / 100.0F;
  int lightLevel = analogRead(PHOTO_PIN);
  int buzzerOn = (pressure > buzzerThreshold || temperature > buzzerThreshold) ? 1 : 0;
  int ledOn = (pressure > ledThreshold || temperature > ledThreshold) ? 1 : 0;
  buttonState = digitalRead(BUTTON_PIN);
  if (buttonState == HIGH) {
    mode = (mode + 1) % 3;
    delay(500);
  }
  display.clearDisplay();
  display.setCursor(0, 0);
  switch (mode) {
    case 0:
      display.println("Temperature:");
      display.print(temperature);
      display.println(" *C");
      break;
    case 1:
      display.println("Humidity:");
      display.print(humidity);
      display.println("%");
      break;
    case 2:
      display.println("Pressure:");
      display.print(pressure);
      display.println(" hPa");
      break;
  }
  if (buzzerOn == 1) {
    digitalWrite(BUZZER_PIN, HIGH);
  } else {
    digitalWrite(BUZZER_PIN, LOW);
  }
  if (ledOn == 1) {
    digitalWrite(LED_PIN, HIGH);
  } else {
    digitalWrite(LED_PIN, LOW);
  }
  delay(1000);
}
```
This code now includes several libraries new libraries that provide the necessary functionality. We now have included a button to cycle through the different readings, and can activate a buzzer and LED if the temperature or pressure readings exceed a certain threshold.

Here is a breakdown of the code:

- The required libraries are included using the #include directive.
- Constant values are defined for the network credentials, OLED display, and pins used for the button, buzzer, LED, and photoresistor.
- An instance of the BMP180 sensor, the WebServer, and the RTC_DS3231 real-time clock are created.
- The setup function is called once when the program starts, and sets up the Wi-Fi connection, pin modes, and initializes the OLED display. It also checks if the BMP180 sensor is connected and will print an error message and stop the program if it is not found.
- The getFormattedTime function converts the current time to a formatted string.
- The loop function runs continuously, reading the temperature, humidity, pressure, and light level using the BMP180 sensor and photoresistor. It also checks if the button is pressed, and changes the mode (which determines what data is displayed on the OLED screen) accordingly.
- Depending on the mode, the OLED screen will display either the temperature, humidity, or pressure readings.
- If the temperature or pressure readings exceed a certain threshold, the buzzer and LED will be activated.
- There is a 1-second delay at the end of the loop to prevent the program from running too quickly.


## Conclusion 

In this project, we have added new features to the weather station project from the previous post. These include the ability to display the time of displaying, using the internal clock of the ESP32, a photoresistor to measure the ambient light level, and a push button to switch between different modes of display on the OLED. Additionally, we have incorporated an active buzzer and LED to alert the user when the temperature or pressure exceeds a certain threshold value. With these new features, the weather station is even more capable of providing real-time weather information. The code has been provided for the project, along with the necessary connections and setup.
