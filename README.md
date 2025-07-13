# ♻️ Khadyakosh – Compost Health Monitoring System

**Khadyakosh** is an IoT + Web platform that helps individuals and communities monitor compost conditions in real-time, ensuring optimal decomposition and reducing environmental harm.

This project is submitted under the _Sustainable Tech & Climate Innovation_ category at CodeForBharat Hackathon.
---

## 📦 Tech Stack

| Component   | Technology Used             |
|-------------|-----------------------------|
| **Frontend**| Next.js (React Framework)   |
| **Auth**    | Firebase Authentication     |
| **Database**| Firebase Realtime Database  |
| **IoT Sim** | Wokwi (virtual ESP32 + sensors) |
| **IoT**     | ESP32 + MQ135 + DHT22       |

---

## 🚀 Features

- Realtime sensor data display (Temperature, Humidity, Gas PPM)
- Firebase-authenticated dashboards for each user
- Compost health status (Healthy / Alert / Warning)
- IoT-ready architecture with ESP32 and DHT22 + MQ135 sensors
- Easy-to-deploy backend-free Firebase integration
  
 ## 📡 IoT Integration

- We use an **ESP32 microcontroller** connected to DHT22 and MQ135 sensors.
- The device pushes data to **Firebase Realtime Database** under each user's node.
- We’ve simulated this setup on [**Wokwi**](https://wokwi.com) for testing without real hardware.

### 🔬 Find the IoT simulation in the `/wokwi` folder.

You can open the `diagram.json` file in [wokwi.com](https://wokwi.com) to try it instantly.

---
