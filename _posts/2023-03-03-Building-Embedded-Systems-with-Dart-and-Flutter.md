---
title: IoT Smart Light using an ESP32 and Flutter
layout: single
date: 2023-03-03
categories: [projects]
tags: [embedded systems, Dart, mobile app, Flutter, ESP32]
---


## Dart and Flutter for Embedded Systems

Dart is a modern, object-oriented programming language created by Google. It's fast, efficient, and easy to learn. Flutter, on the other hand, is a UI toolkit built on top of Dart that allows you to create beautiful, native applications for mobile, web, and desktop.

One of the key benefits of using Dart and Flutter in embedded systems is the ability to create rich, interactive user interfaces that can be easily updated and customized. This is particularly useful in IoT devices, where user interaction is often limited but still important. By using Flutter, you can create sleek and responsive interfaces that provide real-time feedback and enhance the user experience.

Another benefit is the fact that Dart and Flutter are open source, which means that there are many libraries and resources available for developers to use. This can significantly reduce development time and effort, as well as allow for greater collaboration and knowledge-sharing within the developer community.

## Using the ESP32 with Dart and Flutter

The ESP32 is a powerful chip that includes built-in Wi-Fi and Bluetooth capabilities. It's often used in IoT devices, wearables, and robotics, among other applications. By combining the ESP32 with Dart and Flutter, developers can create powerful and flexible embedded systems with rich user interfaces.

One library that can be used for communicating with BLE devices like the ESP32 is flutter_blue_plus. This package provides a simple and intuitive API for scanning for nearby devices, connecting to them, and sending and receiving data. 

In this project, we will be utilizing the flutter_blue_plus library to communicate with an ESP32 WROOM 32D board over Bluetooth. We will also be using an LED and a photoresistor to control the brightness of the light. The WROOM-32D is a commonly used variant of the ESP32 module, which includes an onboard antenna, 4MB flash memory, and 520KB SRAM. It also supports Wi-Fi and Bluetooth connectivity, making it an excellent choice for IoT applications.

To program and debug the WROOM-32D board, we will be using Visual Studio Code and the PlatformIO plugin. This IDE supports a wide range of ESP32 boards, including the WROOM-32D, making it easy to get started with our project. If you run into any issues during the setup or programming process, don't hesitate to ask for further assistance.



## Materials

- ESP32 WROOM D32 development board
- LED (5mm)
- Photoresistor
- Resistors (220Ω and 10kΩ)
- Breadboard
- Jumper wires
- Smartphone with Bluetooth connectivity
- VS Code

<p align="center">
  <img src="{{ '/assets/images/post3/1.jpg' | relative_url }}" width="250" height="250">
</p>


## Setup

1. Connect the anode (+) of the LED to the GPIO pin 13 on the ESP32 board and the cathode (-) to a 220Ω resistor.
2. Connect the other end of the 220Ω resistor to ground.
3. Connect one end of the photoresistor to the 3.3V pin on the board.
4. Connect the other end of the photoresistor to a 10kΩ resistor.
5. Connect the other end of the 10kΩ resistor to the GPIO pin 12 on the board.
6. Connect the ground pin on the board to the other end of the 10kΩ resistor.



```
                                      +3.3V
                                         |
                                         |
                                         \
                                         / R1 220Ω
                                         \
                                         |
                                         |
ESP32 GPIO12 ---------------------------|
                                         |
                                         |
                                         \
                                         / LED
                                         \
                                         |
                                         |
ESP32 GPIO34 ---------------------------|
                                         |
                                         |
                                         \
                                         / R2 10K
                                         \
                                         |
                                         |
ESP32 ADC1 (GPIO32) --------------------|
                                         |
                                         |
                                         \
                                         / Photoresistor
                                         \
                                         |
                                         |
GND -------------------------------------+

```


## Programming

This is the C++ code that we have to upload into the board:

```c++
#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>
#include <Arduino.h>

// LED pin
const int LED_PIN = 13;

// Photoresistor pin
const int PHOTO_PIN = 12;

// Bluetooth Service and Characteristics UUID
#define SERVICE_UUID        "4fafc201-1fb5-459e-8fcc-c5c9c331914b"
#define CHAR_UUID           "beb5483e-36e1-4688-b7f5-ea07361b26a8"

BLECharacteristic *pCharacteristic;

int brightness =  128;

void setup() {
  pinMode(LED_PIN, OUTPUT);
  pinMode(PHOTO_PIN, INPUT);
  
  // Create a BLE server
  BLEDevice::init("SmartLight");
  BLEServer *pServer = BLEDevice::createServer();

  // Create a BLE service
  BLEService *pService = pServer->createService(SERVICE_UUID);

  // Create a BLE characteristic
  pCharacteristic = pService->createCharacteristic(
                      CHAR_UUID,
                      BLECharacteristic::PROPERTY_READ | BLECharacteristic::PROPERTY_WRITE
                    );

  // Create a descriptor
  pCharacteristic->addDescriptor(new BLE2902());

  // Start the service
  pService->start();

  // Advertising the service
  BLEAdvertising *pAdvertising = pServer->getAdvertising();
  pAdvertising->addServiceUUID(SERVICE_UUID);
  pAdvertising->start();

}

void loop() {
  // Read the value of the photoresistor
  int sensorValue = analogRead(PHOTO_PIN);
  brightness = map(sensorValue, 0, 4095, 0, 255);

  // Update the LED brightness
  analogWrite(LED_PIN, brightness);

  delay(50);
}

```
First on this code, we have imported some libraries, including the BLEDevice, BLEServer, and BLEUtils libraries.
The LED_PIN and PHOTO_PIN constants are defined, which represent the pins where the LED and photoresistor are connected, respectively.

The UUIDs for the Bluetooth service and characteristic are defined using the #define preprocessor directive.
A BLECharacteristic pointer named pCharacteristic is declared.

The setup function is defined, which initializes the microcontroller, sets the LED_PIN and PHOTO_PIN pins as output and input, respectively, and creates a BLE server, service, and characteristic. The characteristic is set to have both read and write properties, and a BLE2902 descriptor is added to it. Finally, the service is started and advertised.

The loop function is defined, which reads the value of the photoresistor using the analogRead function, maps the sensorValue from 0-4095 to 0-255, which is the range of brightness for the LED, and updates the LED brightness using the analogWrite function. The function then waits for 50 milliseconds before repeating.


## Mobile Application

In this section we explain how to build an example Flutter app that controls the IoT Smart Light. In this example we are using the flutter_blue_plus library to communicate with the ESP32 over Bluetooth and control the LED brightness using the photoresistor:

```dart
import 'package:flutter/material.dart';
import 'package:flutter_blue_plus/flutter_blue_plus.dart';

	void main() => runApp(MyApp());

	class MyApp extends StatelessWidget {
	  @override
	  Widget build(BuildContext context) {
	    return MaterialApp(
	      title: 'IoT Smart Light',
	      theme: ThemeData(
		primarySwatch: Colors.blue,
	      ),
	      home: MyHomePage(title: 'IoT Smart Light'),
	    );
	  }
	}

	class MyHomePage extends StatefulWidget {
	  MyHomePage({Key? key, required this.title}) : super(key: key);
	  final String title;

	  @override
	  _MyHomePageState createState() => _MyHomePageState();
	}

	class _MyHomePageState extends State<MyHomePage> {
	  BluetoothDevice? _device;
	  BluetoothCharacteristic? _characteristic;
	  bool _isConnected = false;
	  bool _isOn = false;
	  int _brightness = 0;

	  void _connectToDevice() async {
	    // Scan for nearby devices
	    final devices = await FlutterBlue.instance.scan(timeout: Duration(seconds: 5));

	    // Find the device with the name "ESP32"
	    final esp32Device = devices.firstWhere(
		(device) => device.name == "ESP32",
		orElse: () => throw Exception("Could not find device"));

	    // Connect to the device
	    await esp32Device.connect();

	    // Discover services and characteristics
	    final services = await esp32Device.discoverServices();
	    final characteristic = services
		.expand((service) => service.characteristics)
		.firstWhere((c) => c.uuid.toString() == "0000ffe1-0000-1000-8000-00805f9b34fb");

	    setState(() {
	      _device = esp32Device;
	      _characteristic = characteristic;
	      _isConnected = true;
	    });
	  }

	  void _disconnectFromDevice() async {
	    if (_device != null) {
	      await _device!.disconnect();
	    }
	    setState(() {
	      _device = null;
	      _characteristic = null;
	      _isConnected = false;
	      _isOn = false;
	      _brightness = 0;
	    });
	  }

	  void _toggleLight() async {
	    if (_isConnected && _characteristic != null) {
	      final newValue = _isOn ? 0 : 1;
	      await _characteristic!.write([newValue]);
	      setState(() {
		_isOn = !_isOn;
	      });
	    }
	  }

	  void _updateBrightness(int newValue) async {
	    if (_isConnected && _characteristic != null) {
	      await _characteristic!.write([newValue]);
	      setState(() {
		_brightness = newValue;
	      });
	    }
	  }

	  @override
	  void dispose() {
	    _disconnectFromDevice();
	    super.dispose();
	  }

      @override
      Widget build(BuildContext context) {
        return Scaffold(
          appBar: AppBar(
      title: Text(widget.title),
          ),
          body: Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          Text(
            'Light is ${_isOn ? 'on' : 'off'}',
            style: TextStyle(fontSize: 20),
          ),
          SizedBox(height: 20),
          ElevatedButton(
            child: Text(_isConnected ? 'Disconnect' : 'Connect'),
            onPressed: _isConnected ? _disconnectFromDevice : _connectToDevice,
          ),
          SizedBox(height: 20),
    Row(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: [
        ElevatedButton(
          onPressed: () {
      sendOnMessageToBluetooth();
          },
          child: Text('ON'),
        ),
        ElevatedButton(
          onPressed: () {
      sendOffMessageToBluetooth();
          },
          child: Text('OFF'),
        ),
  ],
),
SizedBox(height: 20),
Row(
  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
  children: [
    ElevatedButton(
      onPressed: () {
	_updateBrightness(25);
      },
      child: Text('25%'),
    ),
    ElevatedButton(
      onPressed: () {
	_updateBrightness(50);
      },
      child: Text('50%'),
    ),
    ElevatedButton(
      onPressed: () {
	_updateBrightness(75);
      },
      child: Text('75%'),
    ),
    ElevatedButton(
      onPressed: () {
	_updateBrightness(100);
      },
      child: Text('100%'),
    ),
  ],
 ),
     ],
   ),
  ),
 );
}

void sendOnMessageToBluetooth() async {
if (_isConnected && _characteristic != null) {
await _characteristic!.write([1]);
setState(() {
_isOn = true;
});
}
}

void sendOffMessageToBluetooth() async {
if (_isConnected && _characteristic != null) {
await _characteristic!.write([0]);
setState(() {
_isOn = false;
});
}
}
  }

```

The MyHomePage widget is a stateful widget that defines the UI of the home screen. It has a `BluetoothDevice` variable `_device`, a `BluetoothCharacteristic` variable `_characteristic`, a boolean variable `_isConnected` to keep track of the connection status, a boolean variable `_isOn` to keep track of the light’s on/off status, and an integer variable `_brightness` to keep track of the light’s brightness level.

There are several functions defined within the `_MyHomePageState` class, including `_connectToDevice()`, `_disconnectFromDevice()`, `_toggleLight()`, and `_updateBrightness()`.

The `_connectToDevice()` function scans for nearby Bluetooth devices and connects to the ESP32 device that has the name “ESP32”. It then discovers the services and characteristics of the device and sets the `_device`, `_characteristic`, and `_isConnected` variables accordingly.

The `_disconnectFromDevice()` function disconnects from the connected device and resets the `_device`, `_characteristic`, `_isConnected`, `_isOn`, and `_brightness` variables.

The `_toggleLight()` function writes a new value to the `_characteristic` to turn the light on or off, depending on its current state. It then updates the `_isOn` variable accordingly.

The `_updateBrightness()` function writes a new value to the `_characteristic` to update the light’s brightness level. It then updates the `_brightness` variable accordingly.

The `build()` method defines the layout of the home screen using a `Scaffold` widget, an `AppBar` widget, and a `Column` widget. The UI consists of a text widget that displays the current state of the light, two `ElevatedButton` widgets that allow the user to connect or disconnect from the device, and four `ElevatedButton` widgets that allow the user to turn the light on or off and adjust its brightness level.

The `sendOnMessageToBluetooth()` and `sendOffMessageToBluetooth()` functions are used to send messages to the connected device to turn the light on or off, respectively. They are called when the user taps the corresponding `ElevatedButton` widgets on the UI.



## Conclusion

In this project, we have demonstrated how to use Dart and Flutter with an ESP32 board to create an IoT smart light. We have shown how Dart and Flutter can be used to build an intuitive mobile app that communicates with the ESP32 board over Bluetooth and controls the brightness of an LED using a photoresistor.

By using Dart and Flutter, we were able to create a modern and responsive user interface that allows for real-time feedback and customization. We also utilized the built-in Wi-Fi and Bluetooth capabilities of the ESP32 board to create a flexible and powerful embedded system.

Overall, this project highlights the potential of combining modern programming languages and frameworks with embedded systems to create innovative IoT solutions. With the increasing demand for smart devices and connected systems, this project provides a useful example of how developers can leverage their skills to create exciting and impactful projects in the IoT space.