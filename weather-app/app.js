/* =============================================
   SkyPulse Weather App — app.js
   Week 1–8: Full Implementation
   ============================================= */

// ─── CONFIG ───────────────────────────────────
// 🔑 Replace with your own OpenWeatherMap API key
// Get a free key at: https://openweathermap.org/api
const API_KEY = 'YOUR_API_KEY_HERE';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// ─── STATE ────────────────────────────────────
let currentCity = 'Mumbai'; // default city
let isFetching = false;

// ─── DOM REFS ─────────────────────────────────
const loader        = document.getElementById('loader');
const app           = document.getElementById('app');
const errorBanner   = document.getElementById('errorBanner');
const errorMsg      = document.getElementById('errorMsg');
const searchInput   = document.getElementById('searchInput');
const searchBtn     = document.getElementById('searchBtn');
const locationBtn   = document.getElementById('locationBtn');

// Current weather
const cityName      = document.getElementById('cityName');
const countryName   = document.getElementById('countryName');
const currentDate   = document.getElementById('currentDate');
const weatherIconBig= document.getElementById('weatherIconBig');
const currentTemp   = document.getElementById('currentTemp');
const currentCondition = document.getElementById('currentCondition');
const feelsLike     = document.getElementById('feelsLike');
const humidity      = document.getElementById('humidity');
const windSpeed     = document.getElementById('windSpeed');
const pressure      = document.getElementById('pressure');
const visibility    = document.getElementById('visibility');

// Forecast & Hourly
const forecastGrid  = document.getElementById('forecastGrid');
const hourlyScroll  = document.getElementById('hourlyScroll');

// ─── WEATHER ICON MAP ─────────────────────────
function getWeatherEmoji(iconCode, description = '') {
  const d = description.toLowerCase();
  const map = {
    '01d': '☀️', '01n': '🌙',
    '02d': '⛅', '02n': '🌤️',
    '03d': '☁️', '03n': '☁️',
    '04d': '☁️', '04n': '☁️',
    '09d': '🌧️', '09n': '🌧️',
    '10d': '🌦️', '10n': '🌧️',
    '11d': '⛈️', '11n': '⛈️',
    '13d': '❄️', '13n': '❄️',
    '50d': '🌫️', '50n': '🌫️',
  };
  return map[iconCode] || '🌡️';
}

// ─── DATE HELPERS ─────────────────────────────
function formatDate(timestamp, timezoneOffset = 0) {
  const d = new Date((timestamp + timezoneOffset) * 1000);
  return d.toUTCString().slice(0, 22);
}

function getDayName(timestamp, short = false) {
  const d = new Date(timestamp * 1000);
  return d.toLocaleDateString('en-US', { weekday: short ? 'short' : 'long' });
}

function formatHour(timestamp) {
  const d = new Date(timestamp * 1000);
  return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
}

// ─── SHOW / HIDE ERROR ────────────────────────
function showError(msg) {
  errorMsg.textContent = msg;
  errorBanner.classList.remove('hidden');
  // Auto-hide after 5 seconds
  setTimeout(() => errorBanner.classList.add('hidden'), 5000);
}

function hideError() {
  errorBanner.classList.add('hidden');
}

// ─── FETCH WEATHER (Week 3: API Integration) ──
async function fetchWeather(city) {
  if (isFetching) return;
  isFetching = true;
  hideError();

  try {
    // Current weather
    const res = await fetch(
      `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );

    // Week 7: Error Handling
    if (!res.ok) {
      if (res.status === 401) throw new Error('Invalid API key. Please check your API key in app.js.');
      if (res.status === 404) throw new Error(`City "${city}" not found. Please check the spelling.`);
      if (res.status === 429) throw new Error('Too many requests. Please wait a moment and try again.');
      throw new Error(`API error (${res.status}). Please try again later.`);
    }

    const data = await res.json();
    console.log('Current weather data:', data); // Week 3: Log API response

    // Week 4: Display current weather
    displayCurrentWeather(data);

    // Fetch forecast (Week 5)
    await fetchForecast(city, data.timezone);

  } catch (err) {
    // Week 7: Graceful error display
    if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
      showError('Network error. Please check your internet connection.');
    } else {
      showError(err.message);
    }
    console.error('Weather fetch error:', err);
  } finally {
    isFetching = false;
  }
}

// ─── FETCH BY COORDINATES (Week 6: Geolocation) ─
async function fetchWeatherByCoords(lat, lon) {
  if (isFetching) return;
  isFetching = true;
  hideError();

  try {
    const res = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    if (!res.ok) {
      if (res.status === 401) throw new Error('Invalid API key. Please check your API key in app.js.');
      throw new Error(`Failed to fetch weather for your location (${res.status}).`);
    }

    const data = await res.json();
    console.log('Location-based weather data:', data);
    displayCurrentWeather(data);

    // Fetch forecast by coords
    await fetchForecastByCoords(lat, lon, data.timezone);

  } catch (err) {
    showError(err.message);
    console.error('Geo weather fetch error:', err);
  } finally {
    isFetching = false;
  }
}

// ─── FETCH FORECAST ───────────────────────────
async function fetchForecast(city, timezoneOffset) {
  const res = await fetch(
    `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
  );
  if (!res.ok) throw new Error('Failed to fetch forecast data.');
  const data = await res.json();
  console.log('Forecast data:', data);
  displayForecast(data.list);
  displayHourly(data.list);
}

async function fetchForecastByCoords(lat, lon, timezoneOffset) {
  const res = await fetch(
    `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );
  if (!res.ok) return;
  const data = await res.json();
  displayForecast(data.list);
  displayHourly(data.list);
}

// ─── DISPLAY CURRENT WEATHER (Week 4) ─────────
function displayCurrentWeather(data) {
  // Extract data from API response (Week 4)
  const { main, weather, wind, name, sys, timezone, visibility: vis } = data;

  // Update UI dynamically (Week 4)
  cityName.textContent       = name;
  countryName.textContent    = `📍 ${sys.country}`;
  currentDate.textContent    = formatDate(data.dt, timezone);
  weatherIconBig.textContent = getWeatherEmoji(weather[0].icon, weather[0].description);
  currentTemp.textContent    = Math.round(main.temp);
  currentCondition.textContent = weather[0].description;
  feelsLike.textContent      = `Feels like ${Math.round(main.feels_like)}°C`;
  humidity.textContent       = `${main.humidity}%`;
  windSpeed.textContent      = `${Math.round(wind.speed * 3.6)} km/h`;
  pressure.textContent       = `${main.pressure} hPa`;
  visibility.textContent     = `${(vis / 1000).toFixed(1)} km`;

  // Update page title
  document.title = `${Math.round(main.temp)}°C — ${name} · SkyPulse`;
}

// ─── DISPLAY 5-DAY FORECAST (Week 5) ──────────
function displayForecast(list) {
  // Group by day — take one entry per day at noon
  const dailyMap = {};
  list.forEach(item => {
    const date = new Date(item.dt * 1000);
    const day  = date.toDateString();
    if (!dailyMap[day]) dailyMap[day] = [];
    dailyMap[day].push(item);
  });

  // Get up to 5 days
  const days = Object.keys(dailyMap).slice(0, 5);

  forecastGrid.innerHTML = days.map(day => {
    const items  = dailyMap[day];
    // Pick the midday reading or first available
    const mid    = items.find(i => new Date(i.dt * 1000).getHours() >= 11) || items[0];
    const temps  = items.map(i => i.main.temp);
    const high   = Math.round(Math.max(...temps));
    const low    = Math.round(Math.min(...temps));
    const icon   = getWeatherEmoji(mid.weather[0].icon, mid.weather[0].description);
    const desc   = mid.weather[0].description;
    const dayLabel = new Date(mid.dt * 1000).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

    return `
      <div class="forecast-card">
        <div class="forecast-day">${dayLabel}</div>
        <div class="forecast-icon">${icon}</div>
        <div class="forecast-temps">
          <span class="forecast-high">${high}°</span>
          <span class="forecast-low">${low}°</span>
        </div>
        <div class="forecast-desc">${desc}</div>
      </div>
    `;
  }).join('');
}

// ─── DISPLAY HOURLY (next 8 intervals = 24h) ──
function displayHourly(list) {
  const next24 = list.slice(0, 8); // 3-hour intervals = 24h

  hourlyScroll.innerHTML = next24.map(item => {
    const time = formatHour(item.dt);
    const icon = getWeatherEmoji(item.weather[0].icon);
    const temp = Math.round(item.main.temp);
    return `
      <div class="hourly-card">
        <div class="hourly-time">${time}</div>
        <div class="hourly-icon">${icon}</div>
        <div class="hourly-temp">${temp}°C</div>
      </div>
    `;
  }).join('');
}

// ─── GEOLOCATION (Week 6) ─────────────────────
function getLocation() {
  if (!navigator.geolocation) {
    showError('Geolocation is not supported by your browser.');
    return;
  }

  locationBtn.classList.add('loading');
  locationBtn.textContent = '⏳';

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      locationBtn.classList.remove('loading');
      locationBtn.textContent = '📍';
      const { latitude, longitude } = pos.coords;
      console.log('User location:', latitude, longitude); // Week 6 log
      fetchWeatherByCoords(latitude, longitude);
    },
    (err) => {
      locationBtn.classList.remove('loading');
      locationBtn.textContent = '📍';
      // Week 7: Graceful error for geolocation
      const messages = {
        1: 'Location access denied. Please allow location access in your browser settings.',
        2: 'Location unavailable. Please try searching for your city instead.',
        3: 'Location request timed out. Please try again.',
      };
      showError(messages[err.code] || 'Could not get your location.');
      console.error('Geolocation error:', err);
    },
    { timeout: 10000, enableHighAccuracy: true }
  );
}

// ─── SEARCH (Week 1: Event Handling) ──────────
function handleSearch() {
  const city = searchInput.value.trim();
  if (!city) {
    showError('Please enter a city name.');
    searchInput.focus();
    return;
  }
  currentCity = city;
  fetchWeather(city);
  searchInput.blur();
}

// ─── EVENT LISTENERS ──────────────────────────
searchBtn.addEventListener('click', handleSearch);
searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') handleSearch();
});
locationBtn.addEventListener('click', getLocation);

// ─── INIT (Week 1: Setup) ─────────────────────
function init() {
  // Simulate loading screen for 2s then reveal app
  setTimeout(() => {
    loader.classList.add('fade-out');
    setTimeout(() => {
      loader.style.display = 'none';
      app.classList.remove('hidden');
      app.classList.add('show');
    }, 500);

    // Load default city
    fetchWeather(currentCity);
  }, 1800);
}

// Week 8: Performance — log initial load time
const t0 = performance.now();
window.addEventListener('load', () => {
  const t1 = performance.now();
  console.log(`Page load time: ${(t1 - t0).toFixed(0)}ms`);
});

init();
