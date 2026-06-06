# ⛅ SkyPulse — Weather App
**DIYInternship Project | Web Development Internship**

A fully responsive weather application built with vanilla HTML, CSS, and JavaScript using the OpenWeatherMap API.

---

## 🚀 Features

| Week | Feature | Status |
|------|---------|--------|
| Week 1 | Project Initialization & Environment Setup | ✅ |
| Week 2 | Responsive UI with HTML & CSS | ✅ |
| Week 3 | OpenWeatherMap API Integration | ✅ |
| Week 4 | Display Current Weather Data | ✅ |
| Week 5 | 5-Day Weather Forecast | ✅ |
| Week 6 | Location-Based Weather (Geolocation API) | ✅ |
| Week 7 | Error Handling & User Feedback | ✅ |
| Week 8 | Cross-browser Testing & Optimization | ✅ |

---

## 📸 App Overview

- **Current Weather** — Temperature, condition, feels like, humidity, wind, pressure, visibility
- **5-Day Forecast** — Daily high/low with weather icons
- **Hourly Forecast** — Next 24 hours in 3-hour intervals
- **Geolocation** — Auto-detect user's location with one click
- **City Search** — Search any city worldwide
- **Error Handling** — Friendly messages for network errors, invalid API key, city not found, etc.
- **Responsive** — Works on desktop, tablet, and mobile

---

## ⚙️ Setup

### 1. Get a Free API Key
1. Go to [https://openweathermap.org/api](https://openweathermap.org/api)
2. Sign up for a free account
3. Go to **API Keys** in your dashboard
4. Copy your API key

### 2. Add Your API Key
Open `app.js` and replace line 9:
```javascript
const API_KEY = 'YOUR_API_KEY_HERE';
```
with:
```javascript
const API_KEY = 'your_actual_api_key_here';
```

### 3. Run the App
- Open `index.html` in your browser, **OR**
- Use a local server (recommended):

```bash
# Using VS Code Live Server extension — just click "Go Live"

# OR using Python
python -m http.server 8000
# Then open http://localhost:8000
```

> ⚠️ **Note:** The Geolocation API requires either HTTPS or localhost. Use a local server for the location feature.

---

## 📁 Project Structure

```
weather-app/
├── index.html      # Main HTML (Week 1 & 2)
├── style.css       # Styling & Layout (Week 2)
├── app.js          # JavaScript & API logic (Weeks 3–8)
└── README.md       # Documentation
```

---

## 🛠️ Technologies Used

- **HTML5** — Semantic structure
- **CSS3** — Custom properties, Grid, Flexbox, animations
- **JavaScript (ES6+)** — Fetch API, async/await, DOM manipulation
- **OpenWeatherMap API** — Weather & forecast data
- **Geolocation API** — Browser-based location detection
- **Google Fonts** — Syne + Space Mono typefaces

---

## 📖 Reference Materials

- [MDN: Getting Started with the Web](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web)
- [MDN: CSS Layout Introduction](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Introduction)
- [OpenWeatherMap API Docs](https://openweathermap.org/api)
- [MDN: Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [MDN: Working with Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects)
- [OpenWeatherMap Forecast5](https://openweathermap.org/forecast5)
- [MDN: Array.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [MDN: Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)
- [MDN: Error Handling](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling)
- [MDN: Performance](https://developer.mozilla.org/en-US/docs/Learn/Performance)

---

## 🌐 Browser Compatibility

Tested on:
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Android)

---

*Built for DIYInternship Web Development Program*
