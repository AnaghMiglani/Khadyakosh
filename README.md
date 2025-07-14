# ♻️ Khadyakosh – Compost Health Monitoring System

**Khadyakosh** is an IoT + Web platform that helps individuals and communities monitor compost conditions in real-time, ensuring optimal decomposition and reducing environmental harm.

## This project is submitted under the _Sustainable Tech & Climate Innovation_ category at CodeForBharat Hackathon.

## 📦 Tech Stack

| Component          | Technology Used                 |
| ------------------ | ------------------------------- |
| **Frontend**       | Next.js (React Framework)       |
| **Auth**           | Firebase Authentication         |
| **Database**       | Firebase Realtime Database      |
| **IoT Simulation** | Wokwi (virtual ESP32 + sensors) |
| **IoT**            | ESP32 + MQ135 + DHT22           |

---

## 🚀 Features

- Realtime sensor data display (Temperature, Humidity, Gas PPM)
- Firebase-authenticated dashboards for each user
- Compost health status (Healthy / Alert / Warning)
- IoT-ready architecture with ESP32 and DHT22 + MQ135 sensors
- Easy-to-deploy backend-free Firebase integration

## Sample of IOT

![Khadyakosh IOT Sample](assets\Khadyakosh_wokwi.gif)

## 📡 IoT Integration

- We use an **ESP32 microcontroller** connected to DHT22 and MQ135 sensors.
- The device pushes data to **Firebase Realtime Database** under each user's node.
- We’ve simulated this setup on [**Wokwi**](https://wokwi.com) for testing without real hardware.

### 🔬 IoT Simulation (Wokwi)

You can explore the simulation in the `/wokwi` folder.  
Open the `diagram.json` file directly in [Wokwi](https://wokwi.com) or run it using the [Wokwi CLI](https://docs.wokwi.com/guides/wokwi-cli).  
Alternatively, try the live simulation here: [Live Wokwi Project](https://wokwi.com/projects/436373210560617473).

### ⚠️ Note on Wokwi Simulations

Wokwi simulations rely on public servers and may occasionally lag or fail, especially on the **free plan**.

If you face issues:

- 🔄 Click the **“Start Simulator”** button manually.
- 🔁 Refresh the page.
- 💻 Use Chrome for best compatibility.
- 🧪 Or run it locally using [Wokwi CLI](https://docs.wokwi.com/guides/wokwi-cli).

---

---
