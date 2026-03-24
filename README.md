# weather-report# 🇮🇳 India Weather Dashboard

A colourful, interactive weather dashboard covering all **28 states and 8 union territories** of India — built with React and for real-time weather insights, storm alerts, and smart weather indices.

---

## 🌤️ Live Demo
  https://resonant-manatee-7c66cb.netlify.app/

---

## ✨ Features

### 🗺️ Full India Coverage
- All 28 states and 8 union territories with individual weather data
- Filter by region: North, South, East, West, Northeast, Central, Union Territories
- Each state chip is colour-coded by weather type (sunny, rainy, stormy, cold, humid, cloudy)

### ⚠️ AI Storm Alert System
Real-time alert engine that predicts and flags:
- **⛈️ Thunderstorm Alerts** — triggered by humidity, rain chance, visibility and storm conditions
- **🌀 Cyclone Warnings** — for coastal states based on wind speed, pressure and storm risk index
- **🔥 Heat Wave Warnings** — fires when temperature exceeds 40°C with severity scaling
- **🌊 Flood Risk Alerts** — when rain probability exceeds 80% combined with extreme humidity

Each alert shows severity level (WATCH / MODERATE / SEVERE / WARNING / EXTREME), probability percentage, detailed description, and 4 safety action tiles. States with active alerts show a pulsing red indicator on their chip.

### 🤖 AI Emergency Advisory
When alerts are active, a single button generates a Claude-powered 4-sentence emergency bulletin — IMD-style, with immediate actions, what to avoid, and official helpline numbers.

### ✦ 6 AI Weather Indices
Computed instantly from real meteorological formulas — no API required:

| Index | What it measures |
|-------|-----------------|
| 😌 Comfort index | Heat + humidity + wind comfort level |
| 🏥 Health risk | UV, heat stress, air quality, rain risk |
| 🏃 Outdoor score | Whether conditions are safe to go outside |
| 🌾 Agricultural index | Crop-friendliness of current conditions |
| ✈️ Travel score | Visibility, rain, wind, temperature comfort |
| 🌙 Sleep quality | Night temperature and humidity impact |

### 🌡️ Weather Cards
- Hero temperature card with condition icon, feels-like temperature and rain probability
- Stats panel: wind speed, humidity, UV index, storm risk percentage
- Hourly 6-slot forecast with colour-coded chips
- Interactive 7-day forecast with temperature range bars

### 🕐 Live IST Clock
Updates every second, always showing Indian Standard Time.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 18** | UI framework |
| **Vite** | Build tool and dev server |
| **Claude API** (claude-sonnet-4) | AI insights and emergency advisories |
| **GitHub Pages** | Free hosting and deployment |
| **gh-pages** | Automated deployment script |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18 or higher — [nodejs.org](https://nodejs.org)
- Git — [git-scm.com](https://git-scm.com)

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/india-weather-dashboard.git

# Navigate into the folder
cd india-weather-dashboard

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open your browser and go to **http://localhost:5173**

---

## 📦 Deployment

This project is configured for GitHub Pages deployment using `gh-pages`.

```bash
# Build and deploy to GitHub Pages
npm run deploy
```

Then go to your GitHub repo → **Settings → Pages** → select **gh-pages** branch → Save.


---

## 📁 Project Structure

```
india-weather-dashboard/
├── src/
│   ├── App.jsx          ← Main dashboard component
│   ├── main.jsx         ← React entry point
│   └── index.css        ← Global styles (minimal)
├── public/
├── package.json
├── vite.config.js       ← Vite config with base path for GitHub Pages
└── README.md
```

---

## 🌀 Alert Logic

Alerts are computed using a scoring system based on real meteorological thresholds:

```
Thunderstorm score = humidity weight + rain weight + storm condition + wind + visibility
Cyclone score      = coastal bonus + wind speed + humidity + rain chance + storm risk index
Heat wave          = temperature threshold (≥ 40°C) with scaling severity
Flood risk         = rain probability (≥ 80%) + extreme humidity (≥ 88%)
```

Alert levels activate at these thresholds:

| Alert | WATCH | MODERATE | SEVERE / WARNING |
|-------|-------|----------|-----------------|
| Thunderstorm | Score ≥ 50 | Score ≥ 60 | Score ≥ 75 |
| Cyclone | Score ≥ 45 | Score ≥ 60 | Score ≥ 75 |
| Heat wave | Temp ≥ 40°C | Temp ≥ 42°C | Temp ≥ 44°C |

---

## 📸 Screenshots

> *Add screenshots of your dashboard here after deployment*

---

## 🔮 Future Improvements

- [ ] Connect to OpenWeatherMap API for real-time live data
- [ ] Add India map with clickable state regions
- [ ] Push notifications for severe weather alerts
- [ ] Add historical weather chart per state
- [ ] Dark mode toggle
- [ ] PWA support for mobile installation

---

## 📚 Data Sources

- Weather data: Demo data modelled on real Indian climate patterns
- Alert thresholds: Based on IMD (India Meteorological Department) guidelines
  

---

## 🆘 Emergency Contacts

| Service | Contact |
|---------|---------|
| National Disaster Helpline | 1078 |
| NDRF Control Room | 011-24363260 |
| IMD Official Website | [imd.gov.in](https://imd.gov.in) |

---

## 👨‍💻 Author

Made with ❤️ by **[priyanshu prasad sethi]
India


---

> **Note:** This dashboard uses demo weather data. For production use, connect to a live weather API such as [OpenWeatherMap](https://openweathermap.org/api) for accurate real-time data.
