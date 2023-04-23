---
title: Weather Station with ESP32 - Part II
layout: single
date: 2023-04-03
categories: [projects]
tags:
  - ESP32
  - BMP180
  - weather station
  - IoT
---



In the [previous post,](https://dcoldeira.github.io/projects/ESP32-Temperature-Sensor/) we began the process of building a weather station using an ESP32 board. We selected the BMP180 sensor due to its precise and dependable temperature and pressure measurements.

To make it easy to check the readings from the sensor, we created a web-based dashboard using the ESP32's built-in WiFi capabilities. This dashboard allows us to view the current temperature and pressure readings, as well as historical readings over time.

However, we also wanted to have a physical display that we could use to check the sensor readings without having to access the web-based dashboard. To achieve this, we decided to integrate a 0.96 OLED module to display the sensor readings directly on the screen.

With this integration, we can now view the sensor readings both on the web-based dashboard and on the OLED screen. This makes it easy to check the weather conditions at a glance, whether we are sitting at our desk or out and about.

## Aditional Materials

- 0.96 inch OLED module

<p align="center">
  <img src="{{ '/assets/images/post4/1.jpg' | relative_url }}" width="250" height="250">
</p>


## Setup

Here are the steps to connect the OLED module to your ESP32 board:

1. Connect the OLED module's VCC pin to the 3.3V pin on the ESP32 board.
2. Connect the OLED module's GND pin to the GND pin on the ESP32 board.
3. Connect the OLED module's SDA pin to the SDA pin on the ESP32 board (GPIO 21).
4. Connect the OLED module's SCL pin to the SCL pin on the ESP32 board (GPIO 22).

Once we have made these connections, we can use the Adafruit_SSD1306 library to display text and graphics on the OLED module.


## Programming 

In order to continue with our weather station project, we need to add the `Adafruit_GFX` and `Adafruit_SSD1306` libraries. These libraries provide the necessary functions to display sensor data on a small OLED module:


1. Open the PlatformIO IDE and navigate to the "Libraries" tab on the left-hand side.
2. In the search bar, search for "Adafruit GFX Library" and click on the first result.
3. Click on the "Install" button and wait for the installation process to complete.
4. Repeat steps 2 and 3 for the "Adafruit SSD1306" library.
5. Once the libraries are installed, open the 'PlatformIO.ini' file and add the following lines of code to the [env:d1_mini] section:

```
lib_deps =
  ...
  ...
  Adafruit GFX Library
  Adafruit SSD1306
```
6. Save the file and the libraries should now be added to the project.

With the required libraries installed and added to the project, we can now move on to integrating the OLED module and displaying the sensor values on the screen.


```c++
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BMP085.h>
#include <WiFi.h>
#include <WebServer.h>
#include <SPI.h>
#include <WiFiClientSecure.h>

#define BMP085_ADDRESS 0x76

// Replace with your network credentials
const char* ssid = "xxx";
const char* password = "xxx";

// Create an instance of the BMP180 sensor
Adafruit_BMP085 bmp;

// Create an instance of the WebServer
WebServer server(80);

// Create an instance of the OLED display
Adafruit_SSD1306 display(128, 64, &Wire, -1);

// Function prototype for handleRoot()
void handleRoot();

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

  // Initialize the BMP180 sensor
  if (!bmp.begin(BMP085_ADDRESS)) {
    Serial.println("Could not find a valid BMP085 sensor, check wiring!");
    while (1);
  }

  // Initialize the OLED display
  if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
    Serial.println("SSD1306 allocation failed");
    for (;;);
  }

  // Serve the web page
  server.on("/", handleRoot);
  server.begin();

  // Display a message on the OLED screen
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(WHITE);
  display.setCursor(0, 0);
  display.println("Weather Station");
  display.println("with ESP32 WROOM");
  display.println("and BMP180 Sensor");
  display.display();
  delay(2000);
  display.clearDisplay();
}

void loop() {
  // Handle web requests
  server.handleClient();

  // Read the temperature and pressure from the BMP180 sensor
  float temperature = bmp.readTemperature();
  float pressure = bmp.readPressure() / 100.0F;

  // Print the readings to the serial monitor
  Serial.print("Temperature = ");
  Serial.print(temperature, 1);
  Serial.println(" °C");
  Serial.print("Pressure = ");
  Serial.print(pressure);
  Serial.println(" hPa");

  // Display the readings on the OLED screen
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(WHITE);
  display.setCursor(0, 0);
  display.print("Temp: ");
  display.print(temperature, 1);
  display.println(" C");
  display.print("Pressure: ");
  display.print(pressure);
  display.println(" hPa");
  display.display();

  // Wait for a second before taking the next reading
  delay(1000);
}

void handleRoot() {
  // Build the HTML page
  String html = "<html><body>";
  html += "<h1 style='text-align:center;'>Weather Station with an ESP32 WROOM 32D and a BMP180 Sensor</h1>";
  html += "<div style='display:flex; justify-content:center;'>";
  html += "<div style='margin:20px; text-align:center;'>";
  html += "<h2>Temperature</h2>";
  html += "<p style='font-size:48px;'>" + String(bmp.readTemperature(), 1) + " &deg;C</p>";
  html += "</div>";
  html += "<div style='margin:20px; text-align:center;'>";
  html += "<h2>Pressure</h2>";
  html += "<p style='font-size:48px;'>" + String(bmp.readPressure() / 100.0F) + " hPa</p>";
  html += "</div>";
  html += "</div>";
  html += "</body></html>";

  // Send the HTML page to the client
  server.send(200, "text/html", html);
}
```

In the loop function, we also use the `display` object of the Adafruit_SSD1306 class so we can display the readings of the sensor on our little screen, however we can definitelly improve it by implementing some designing and making fonts bigger etc by using the methods on this class: 


```c++
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

  // Initialize the BMP180 sensor
  if (!bmp.begin(BMP085_ADDRESS)) {
    Serial.println("Could not find a valid BMP085 sensor, check wiring!");
    while (1);
  }

  //xzvtx 0.96 inch OLED Module display added
  Wire.begin();
  Adafruit_SSD1306 display(SSD1306_SWITCHCAPVCC, 0x3C); // 0x3C is the I2C address of the OLED module
  display.clearDisplay();
  display.setTextSize(3); // Set the text size to 3
  display.setTextColor(WHITE);
  display.setCursor((display.width() - 12 * 3) / 2, (display.height() - 24) / 2); // Position the text in the center
  display.println("Hello world!");
  display.display();
}


```

In the above code, we set the text size to 3 by calling display.setTextSize(3) and position the text in the center of the screen by calculating the X and Y coordinates of the center of the screen using the width() and height() methods of the Adafruit_SSD1306 class, respectively. 

## Conclusion
 we have successfully built a weather station using an ESP32 board and a BMP180 sensor, and we have added a 0.96 inch OLED module to display the temperature and pressure readings on the screen. By integrating the capabilities of the ESP32 board, BMP180 sensor, and the OLED display, we have created a custom weather station that is tailored to our specific needs. Additionally, we have created a web-based dashboard that allows us to remotely monitor the sensor values from anywhere with an internet connection. This project is a great example of how the combination of hardware and software can be used to create innovative solutions to real-world problems. With some basic knowledge of electronics and programming, anyone can create their own custom weather station or similar projects