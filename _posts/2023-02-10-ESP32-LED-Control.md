---
title: ESP32 LED Control
layout: single
date: 2023-02-10
categories: [embedded]
tags: [ESP32, C++, electronics]
---


This project shows some of the features of the powerful ESP32 microcontroller. Starting with a simple LED circuit, we demonstrate how to control it using code and how to toggle it on and off with a push button. We then use pulse-width modulation (PWM) to control the LED's brightness and create various lighting effects.

Next, we explore the ESP32's Wi-Fi capabilities and create a web interface that allows us to control the LED remotely. Finally, we take our project to the next level by creating a Flutter app that communicates with the ESP32 via Wi-Fi and enables us to control the LED from our mobile device.



# 1.1 Materials

To complete this project, I used the following materials:

- An ESP32 development board
- A breadboard
- A 5mm LED (any color)
- A 220-ohm resistor
- Jumper wires


<p align="center">
  <img src="{{ '/assets/images/post1/1.jpg' | relative_url }}" width="250" height="250">
</p>

# 1.2 Circuit Diagram 



```     
                     +------------------+
                     |                  |
                     |    ESP32 Board   |
                     |                  |
                     +------------------+
                              |
                              |
                              |
                              |                             
                     +------------------+
                     |                  |
                     |        LED       |
                     |                  |
                     +------------------+
                              |
                              |
                             ---
                              |
                             GND
```
Everything was connected as per the diagram above, pin 2 was used on the ESP32 board.

<p align="center">
  <img src="{{ '/assets/images/post1/2.jpg/' | relative_url }}" width="250" height="250">
</p>

# 1.3 Arduino IDE

To use the ESP32 with Arduino IDE, the ESP32 board support package is needed. Here are the steps I followed:

1. Opened the Arduino IDE.
2. Clicked on File > Preferences.
3. In the Additional Boards Manager URLs field, entered the following URL: `https://dl.espressif.com/dl/package_esp32_index.json`.
4. Clicked on OK to close the Preferences window.
5. Went to Tools > Board > Boards Manager.
6. Typed "esp32" in the search bar and installed "esp32 by Espressif Systems".
7. Went to Tools > Board and select the ESP32 board.
8. Just needed to write and upload the code to the ESP32 board using the Arduino IDE.

# 1.4 Programming

C++ was used to program the ESP32 microcontroller. The code is simple and straightforward. Here is a brief overview of the code:

```c++
// Define the LED pin number
#define LED_PIN 2

void setup() {
  // Set the LED pin as an output pin
  pinMode(LED_PIN, OUTPUT);
}

void loop() {
  // Turn the LED on
  digitalWrite(LED_PIN, HIGH);
  delay(1000);
  
  // Turn the LED off
  digitalWrite(LED_PIN, LOW);
  delay(1000);
}

```

In the first line of code, we use the #define directive to define the LED pin number as a constant variable called LED_PIN. In this case, we set it to pin 2.

In the setup() function, we set the LED_PIN as an output pin using the pinMode() function.

In the loop() function, we first turn the LED on by setting the LED_PIN output to HIGH using the digitalWrite() function, then we use the delay() function to wait for one second before turning it off again by setting the LED_PIN output to LOW. We then wait another second before repeating the cycle.

So the code turns the LED on and off every second indefinitely.

*To add a push button to toggle the LED, we will need:*

# 2.1 Aditional materials

- Push button


# 2.2 Circuit Diagram 
 
```
                     +------------------+
                     |                  |
                     |    ESP32 Board   |
                     |                  |
                     +------------------+
                              |
                     +--------+---------+
                     |        |         |
                     |        |         |
                    +--+     ---       ---
                    |  |     ---       ---
                    |  |      |         |
                    |  |      |         |
                    |  |      |         |
                    |  |      |         |
                    |  |      |         |
                    |  |      |         |
                    |  |      |         |
                    +--+      |         |
                              |         |
                              |         |
                              |         |
                              |         
                              |
                              |
                              |
                              |
                     +------------------+
                     |                  |
                     |        LED       |
                     |                  |
                     +------------------+
                              |
                              |
                             ---
                              |
                             GND

```


<p align="center">
  <img src="{{ '/assets/images/post1/3.jpg/' | relative_url }}" width="250" height="250">
</p>


We Connect one leg of the push button to pin 3 of the ESP32 and the other leg to ground. The LED stays connected as in the previous section.

# 2.3 Arduino IDE

In the Arduino IDE, we need to define the pin numbers for the LED and the push button. Here is the code to do that:

```c++
// Define the LED and button pin numbers
#define LED_PIN 2
#define BUTTON_PIN 3
```

# 2.4 Programming

In the setup() function, we need to set the BUTTON_PIN as an input pin using the pinMode() function:

```c++
void setup() {
  // Set the LED pin as an output pin
  pinMode(LED_PIN, OUTPUT);
  // Set the button pin as an input pin
  pinMode(BUTTON_PIN, INPUT);
}
```
In the loop() function, we can use the digitalRead() function to read the state of the BUTTON_PIN. If the button is pressed, the LED should toggle its state. Here is the code:

```c++
void loop() {
  // Read the state of the button
  int reading = digitalRead(BUTTON_PIN);

  // Check if the button state has changed
  if (reading != lastButtonState) {
    // Reset the debounce timer
    lastDebounceTime = millis();
  }

  // Check if the debounce delay has passed
  if ((millis() - lastDebounceTime) > debounceDelay) {
    // Check if the button state has stabilized
    if (reading != buttonState) {
      buttonState = reading;
      // If the button has been pressed, toggle the LED
      if (buttonState == LOW) {
        digitalWrite(LED_PIN, !digitalRead(LED_PIN));
      }
    }
  }

  // Update the last button state
  lastButtonState = reading;

  // Flash the LED if it is on
  if (digitalRead(LED_PIN) == HIGH) {
    digitalWrite(LED_PIN, LOW);
    delay(500);
    digitalWrite(LED_PIN, HIGH);
    delay(500);
  }
}
```
In the above code, we first read the state of the BUTTON_PIN using the digitalRead() function and store it in the variable buttonState.

If the button is pressed (i.e., the buttonState is HIGH), we toggle the state of the LED using the digitalWrite() function and the ! operator to invert the current state of the LED. We also add a small debounce delay of 500ms to avoid registering multiple presses for a single button press.

With these changes, the LED should now toggle its state whenever the push button is pressed.



*We now use pulse-width modulation to create lighting effects.*

 Pulse-width modulation (PWM) is a technique used to control the brightness of an LED by varying the duty cycle of the signal. Instead of turning the LED fully on or off, PWM switches the LED on and off rapidly, with varying amounts of time spent on and off. This creates the illusion of brightness control, as the LED appears to be dimming or brightening depending on the duty cycle of the signal.


# 3.1 Aditional materials

- 1 x 10k ohm potentiometer


# 3.2 Circuit Diagram 
 
 ```
                      +------------------+
                     |                  |
                     |    ESP32 Board   |
                     |                  |
                     +------------------+
                              |
                              |
                            10kΩ
                              |
                     +------|<|-------+
                     |      |          |
                     |   GPIO2        |
                     |               |
                     |     LED       |
                     |               |
                     +---------------+

 ```


<p align="center">
  <img src="{{ '/assets/images/post1/4.jpg/' | relative_url }}" width="250" height="250">
</p>


# 3.3 Arduino IDE

No additional steps are required for the Arduino IDE since we have already installed the ESP32 board support package.


# 3.3 Programming

Here is the code for using pulse-width modulation to create lighting effects on the LED:

```c++
// Define the LED pin number and PWM frequency
#define LED_PIN 2
#define PWM_FREQ 5000

void setup() {
  // Set the LED pin as an output pin
  pinMode(LED_PIN, OUTPUT);
  // Set the PWM frequency
  ledcSetup(0, PWM_FREQ, 8);
  // Attach the PWM signal to the LED pin
  ledcAttachPin(LED_PIN, 0);
}

void loop() {
  // Fade the LED on and off
  for (int dutyCycle = 0; dutyCycle <= 255; dutyCycle++) {
    // Set the LED brightness
    ledcWrite(0, dutyCycle);
    // Wait a short period of time
    delay(10);
  }
  for (int dutyCycle = 255; dutyCycle >= 0; dutyCycle--) {
    // Set the LED brightness
    ledcWrite(0, dutyCycle);
    // Wait a short period of time
    delay(10);
  }
}
```

In this code, the ledcSetup function is used to set up a PWM channel with a frequency of 5000 Hz and a resolution of 8 bits. The ledcAttachPin function is then used to attach the PWM signal to the LED pin.

The loop function then fades the LED on and off using two for loops. In each loop, the ledcWrite function is used to set the duty cycle of the PWM signal, and the delay function is used to wait a short period of time before changing the duty cycle.

You can adjust the delay time in each loop to change the speed of the fading effect.



*Finally we proceed to add Wi-Fi connectivity to control the LED via a web interface.*

To add Wi-Fi connectivity to control the LED via a web interface, we can use the ESP32's built-in Wi-Fi capabilities and the ESPAsyncWebServer library.

# 4.1 Aditional materials

- Wi-Fi router


# 4.2 Circuit Diagram 
 
```
                     +--------------------+
                     |                    |
                     |    ESP32 Board     |
                     |                    |
                     +--------------------+
                            |        |
                            |        |                          
                            |        |
                            |        |
                            |        |
                            |        |
                      +------------------+
                      |                  |
                      |        LED       |
                      |                  |
                      +------------------+
                               |
                               |
                              ---
                               |
                              GND

```

In the circuit diagram above, we use the same LED and resistor as before, and connect them to the ESP32 board as shown. We will also need to connect the ESP32 board to a Wi-Fi router to enable it to communicate with other devices over the internet.


# 4.3 Arduino IDE

In addition to the steps we took earlier to set up the Arduino IDE for use with the ESP32 board, we will also need to install the WiFi library. To do this, follow these steps:

1. Open the Arduino IDE.
2. Go to Sketch > Include Library > Manage Libraries.
3. In the search bar, type "WiFi" and press Enter.
4. Find the "WiFi" library by the Arduino team and click "Install".


# 4.3 Programming

We will now write a program that allows us to control the LED via a web interface hosted on the ESP32 board.

```c++
#include <WiFi.h>
#include <WebServer.h>

// Define the LED pin number
#define LED_PIN 2

// Replace with your network credentials
const char* ssid = "XXX";
const char* password = "XXX";

WebServer server(80); // Create a web server on port 80

void handleRoot() {
  server.send(200, "text/html", "<html><body><h1>ESP32 LED Control</h1><form method='POST' action='/led'><button name='state' value='on'>Turn On</button><button name='state' value='off'>Turn Off</button></form></body></html>");
}

void handleLED() {
  String state = server.arg("state");
  Serial.println("Received state: " + state);
  if (state == "on") {
    digitalWrite(LED_PIN, HIGH);
  } else if (state == "off") {
    digitalWrite(LED_PIN, LOW);
  }
  server.send(200, "text/html", "<html><body><h1>ESP32 LED Control</h1><p>LED is now " + state + "</p><p><a href='/'>Back</a></p></body></html>");
}


void setup() {
  // Set the LED pin as an output pin
  pinMode(LED_PIN, OUTPUT);

  // Connect to Wi-Fi network
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP()); // Print the IP address of the board

  // Start the web server
  server.on("/", handleRoot);
  server.on("/led", handleLED);
  server.begin();
  Serial.println("HTTP server started");
}

void loop() {
  // Handle incoming client requests
  server.handleClient();  
}

```


This code first defines the LED pin number (LED_PIN) and the network credentials (ssid and password). Then, it creates a web server on port 80. The web server handles requests to the root path (/) and the /led path.

The handleRoot() function is called when a request is made to the root path. This function sends a simple HTML form that allows the user to turn the LED on or off.

The handleLED() function is called when a request is made to the /led path. This function receives the state of the LED (on or off) from the form and sets the LED accordingly. It then sends a simple HTML page that tells the user the current state of the LED.

The setup() function first sets the LED pin as an output pin. Then, it connects to the Wi-Fi network. Once the connection is established, it prints the IP address of the board. Finally, it starts the web server and registers the handleRoot() and handleLED() functions.

The loop() function simply handles incoming client requests.

In the browser, we now should be able to control the LED from the server. 



<p align="center">
  <img src="{{ '/assets/images/post1/5.png/' | relative_url }}" width="3300" height="300">
</p>

# A Flutter app to control the LED

To control the LED through a Flutter app, we can create a simple app that sends HTTP requests to the ESP32 web server using the http package.

The following functions define two methods to turn the LED on and off by sending HTTP POST requests to the ESP32 web server:

```dart
Future<void> turnOnLED() async {
  try {
    final response = await http.post(
      Uri.parse('http://<ESP32_IP_ADDRESS>/led'),
      body: {'state': 'on'},
    );
    print('Response status: ${response.statusCode}');
  } catch (e) {
    print('Error: $e');
  }
}

Future<void> turnOffLED() async {
  try {
    final response = await http.post(
      Uri.parse('http://<ESP32_IP_ADDRESS>/led'),
      body: {'state': 'off'},
    );
    print('Response status: ${response.statusCode}');
  } catch (e) {
    print('Error: $e');
  }
}
```

In these functions, we pass the IP address of the ESP32 board as a parameter and then use it to construct the URL. We replace <ESP32_IP_ADDRESS> with the actual IP address of the ESP32 board.

To create the user interface, we can create a new class that extends the StatefulWidget class. In the build method, we can create a Scaffold widget with an AppBar and two ElevatedButton widgets that call the turnOnLED and turnOffLED functions when pressed.

```dart
class LEDControlApp extends StatefulWidget {
  final String ipAddress;

  LEDControlApp({required this.ipAddress});

  @override
  _LEDControlAppState createState() => _LEDControlAppState();
}

class _LEDControlAppState extends State<LEDControlApp> {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'LED Control',
      home: Scaffold(
        appBar: AppBar(
          title: Text('LED Control'),
        ),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              ElevatedButton(
                onPressed: () => turnOnLED(widget.ipAddress),
                child: Text('Turn On'),
              ),
              ElevatedButton(
                onPressed: () => turnOffLED(widget.ipAddress),
                child: Text('Turn Off'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
```

In this class, we define a constructor that takes the IP address of the ESP32 board as a parameter. In the build method, we pass this IP address to the turnOnLED and turnOffLED functions when the buttons are pressed. We use an anonymous function to wrap the function calls in order to pass the IP address as a parameter.

To use this class, we can create an instance of it and pass the IP address of the ESP32 board as a parameter:

```dart
void main() {
  runApp(LEDControlApp(ipAddress: '<ESP32_IP_ADDRESS>'));
}
```

We replace <ESP32_IP_ADDRESS> with the actual IP address of the ESP32 board. When we run this app, we will see a screen with two buttons that allow us to turn the LED on and off.

# Conclusion 

Throughout the project, we explored some of the basic features of the ESP32 microcontroller, such as controlling a single LED, adding a push button to toggle the LED on and off, and using pulse-width modulation to create different lighting effects. We then added Wi-Fi connectivity and created a web interface to control the LED remotely.
 
Finally, we showed how to control the LED through a Flutter app by sending HTTP requests to the ESP32 web server using the http package. The simple UI with two buttons to turn the LED on and off provides a convenient way to remotely control the LED. This demonstrates how the ESP32 can be integrated into mobile applications and can be a useful tool for home automation and remote monitoring systems. The ESP32 LED Control project is an excellent starting point for anyone interested in learning about the possibilities of the ESP32 microcontroller.

The ESP32 LED Control project serves to demonstrate my ability to integrate hardware and software to create a functional system, and showcases the versatility of the Arduino IDE in programming different microcontrollers, including the ESP32. This project will serve as a valuable addition to my portfolio and will highlight my skills in embedded systems design and programming. It is also an excellent starting point for anyone interested in learning about the possibilities of the ESP32 microcontroller.