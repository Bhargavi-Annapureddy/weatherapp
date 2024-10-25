import React, { useState } from 'react';
import { getWeatherData } from './services/weathereService';
import './Weather.css';


const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const data = await getWeatherData(city);
      setWeatherData(data);
    } catch (error) {
      alert('Failed to fetch weather data');
    }
    setLoading(false);
  };

  return (
    <div className="weather-container">
      <h1 style={{ color: "orange" }}>Weather in your city</h1>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          style={{ marginRight: '8px' }}
        />
        <button onClick={handleSearch}> <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-question-circle"
          viewBox="0 0 16 16"
          style={{ marginRight: '5px', verticalAlign: 'middle' }} // Optional styles
        >
          <path
            d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm1 12H7v-2h2v2zm0-4H7c0-1.485.55-2.2 1.293-2.732.743-.53 1.707-1.027 1.707-1.768C10.707 3.15 9.645 2 8 2S5.293 3.15 5.293 4.5H4.293C4.293 2.843 5.843 1 8 1s3.707 1.843 3.707 3.5c0 1.2-.69 2.1-1.588 2.682C8.105 8.15 8 9.3 8 10h1v-2z"
          />
        </svg>Search</button>
      </div>
      {loading && <div className="loader">Loading...</div>}

      {weatherData && (
        <div className="weather-cards">
          {weatherData.list.slice(0, 5).map((item, index) => (
            <div key={index} className="weather-card" style={{ border: "1px solid black" }}>
              <h3 className="date">Date:
                {new Date(item.dt * 1000).getDate().toString().padStart(2, '0')}/
                {(new Date(item.dt * 1000).getMonth() + 1).toString().padStart(2, '0')}/
                {new Date(item.dt * 1000).getFullYear()}
              </h3>

              <table>
                <tbody>
                  <tr>
                    <td className="temperature-label" colSpan="2">Temperature</td>
                  </tr>
                  <tr>
                    <td className="temperature-value">Min</td>
                    <td className="temperature-value">Max</td>
                  </tr>
                  <tr>
                    <td className="temperature-value">{(item.main.temp_min - 273.15).toFixed(2)}</td>
                    <td className="temperature-value">{(item.main.temp_max - 273.15).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td className="label">Pressure</td>
                    <td className="label">{item.main.pressure} hPa</td>
                  </tr>
                  <tr>
                    <td className="label">Humidity</td>
                    <td className="label">{item.main.humidity} %</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Weather;
