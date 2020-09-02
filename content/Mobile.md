Title: NauticApp
Date: 2020-01-15 12:00
Category: NauticApp 
Tags: tool, mobile app, marine
Slug: marine app
Authors: David Coldeira
Summary: A marine app that I have been developing in my free time. 

# The app



I have been designing and developing this app initially for android and iOX and then PC. The app features the Dart language under the hut and thanks to Flutter, a cool framework, it has been relatively quick, at least to put ideas into code.

<img src="/images/NauticApp2.png"
     alt="NauticApp"
     style="float: left; margin-right: 20px;" />

The app is still on development and will features Position of the vessel, Speed, Course Over Ground (COG), Direction and Barometer readers right out of your phone or tablet, no extra connections will be needed. Only works with the device sensors.



## GPS Positioning, Speed, COG and Direction 

GPS and Magnetic mobile sensors are way more powerfull nowadays than the ones commonly found on marine electronic devices, they consume less energy and allow to implement (program) different technologies. The app will accurately read your position and direction which will then be used to plot your position on the chart plotter and calculate the speed of your vessel and record it.

<img src="/images/NauticApp3.png"
     alt="NauticApp"
     style="float: left; margin-right: 20px;" />


## Logbook and Anchoring Alarm

The app will allow you to save and log all the readings (time, position, location, speed, distance, COG, and presure) plus any comments you may have on the device (and not on the cloud so it is not internet dependent). You can do a log manually at anytime you wish by touching a button or set the app to do it automatically as often as you wish. The app will also allow you to set an alarm that will trigger as soon as the vessel starts drifting when supposted to be anchored.

## Further implementations: - Chart Plotter

The app will work with OpenSeaMap chats by default. There are plans, however, to allow the user to use any chart available in the market. Ideally, the app will allow you to integrate your current electronic readings through a SBC (Single Board Computer i.e. Raspberry Pi, etc) so you have them all together on your table/phone screen. The app will also allow you to share you vessel’s details and readings with family and friends if you allow them while you are off sailing...

## Contribution

As any app/software development, funding is needed as time is money. If you want to contribute [get in touch](mailto:dcoldeira@gmail.com).    
