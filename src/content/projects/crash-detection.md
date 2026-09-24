---
title: Crash alert
line: A box that texts your location to family after a crash
year: '2024'
kind: Hardware
stack: [ESP32, Embedded C, SIM800L, GPS]
featured: true
order: 3
---

A small device for a vehicle. When it detects a crash, it reads its GPS position and sends it by SMS to a few saved numbers. The message goes out within five seconds.

It uses plain GSM on purpose, with no Wi-Fi, app or server. After an accident on a highway, a data connection is the last thing you can count on.

I designed the circuit, wired the power, wrote the firmware in C and tested it on the road. Most of the testing was about false alarms, because a pothole shouldn't text your parents. I spent a lot of runs tuning the trigger until it stopped doing that.
