---
title: "Weather Station with ESP32 WROOM 32D and BMP180 Sensor"
layout: single
date: 2023-04-16
categories:
  - projects
tags:
  - ESP32
  - BMP180
  - weather station
  - IoT
---


In this project, we have built a weather station using an ESP32 board and a BMP180 sensor. Our goal was to create a custom weather station that is tailored to our specific needs, and we have achieved this by combining the powerful capabilities of the ESP32 board with the accurate and reliable BMP180 sensor.

The ESP32 board measures temperature and pressure, and the data is displayed on a web-based dashboard that can be accessed remotely from any device with internet access. This project can be used to monitor weather conditions in a specific location and can be expanded to include other sensors like humidity or wind speed in the future.

While this project is not intended to be a tutorial, we have documented our process and provided the  complete [project repository](https://github.com/dcoldeira/ESP32-IoT-Weather-Station), including source code and documentation, on GitHub. This project can serve as an excellent addition to our portfolio, showcasing our skills in programming and hardware design.

Furthermore, this project can be expanded in many ways as we shall see in outcoming posts, such as adding more sensors to measure other weather parameters like humidity and wind speed, or modifying it to send alerts or notifications based on specific conditions. This versatility makes it an excellent platform for further experimentation and exploration.

Overall, this weather station project demonstrates our ability to design and implement complex systems that integrate hardware and software components to achieve a specific goal. We hope that it can serve as an example of our capabilities to potential employers and inspire future projects that leverage the power of IoT technologies.

## Materials

To complete this project, we will need the following materials:

- ESP32-WROOM-D32 board
- BMP180 sensor
- Jumper wires
- Breadboard

<p align="center">
  <img src="/assets/images/post2/1.jpg/" width="250" height="250">
</p>


## Setup

1. Connect the GND pin on the BMP180 sensor to the GND pin on the ESP32 board.
2. Connect the VCC pin on the BMP180 sensor to the 3.3V pin on the ESP32 board.
3. Connect the SDA pin on the BMP180 sensor to the SDA pin on the ESP32 board (GPIO 21).
4. Connect the SCL pin on the BMP180 sensor to the SCL pin on the ESP32 board (GPIO 22).
5. Connect the Wi-Fi module to the ESP32 board by following the manufacturer's instructions.

<p align="center">
  <img src="/assets/images/post2/2.jpg/" width="250" height="250">
</p>

## Programming

We will be using VS code with the PlatformIO IDE extension which I have already installed. 

1. Create a new project in VS Code by selecting "PlatformIO Home" from the sidebar, clicking "New Project," and selecting the ESP32 board as the target platform.
2. To include the Adafruit_BMP085_Library and the HTTPClient libraries in our project, we need to open the platformio.ini file located in the root directory of the project. Then, we should add the following lines under the [env:esp32] section:

```
   lib_deps =
     Adafruit BMP085 Library
     HTTPClient
```


We then open the src/main.cpp file and replace the existing code with the following code:

```c++
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BMP085.h>
#include <WiFi.h>
#include <WebServer.h>
#define BMP085_ADDRESS 0x76
#include <SPI.h>
#include <WiFiClientSecure.h>

// Replace with your network credentials
const char* ssid = "XXX";
const char* password = "xxx";

// Create an instance of the BMP180 sensor
Adafruit_BMP085 bmp;

// Create an instance of the WebServer
WebServer server(80);

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

  // Serve the web page
  server.on("/", handleRoot);
  server.begin();
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
This is a program serves a web page with the temperature and pressure readings from the sensor.

The program starts by including the necessary libraries for the BMP180 sensor, the WiFi module, and the web server. It also defines the BMP180 sensor address and the WiFi network credentials.

Then, it creates an instance of the BMP180 sensor and the web server. It also defines the function prototype for handleRoot(), which will handle the web page request.

In the setup() function, the program initializes the serial communication, connects to the WiFi network, and prints the IP address of the board. It also initializes the BMP180 sensor and checks if it is working properly. Finally, it sets up the web server to serve the root path ("/") with the handleRoot() function and starts it.

In the loop() function, the program handles incoming web requests and reads the temperature and pressure from the BMP180 sensor. It then prints these readings to the serial monitor and waits for a second before taking the next reading.

The handleRoot() function builds an HTML page with the temperature and pressure readings displayed in a centered, nicely formatted layout. It then sends this page to the client when the root path is requested.

## Conclusion

We have successfully built a weather station using an ESP32 WROOM 32D board and a BMP180 sensor. The project involved setting up the hardware, programming the board to read temperature and pressure data from the sensor, and displaying the data on a web-based dashboard. This project serves as a great introduction to IoT and can be expanded to include other sensors to monitor additional weather conditions. By using the code and instructions provided in this project, you can create your own weather station that can be accessed remotely from any device with internet access.