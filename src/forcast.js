import React, { useState, useEffect } from 'react';
import axios from 'axios';
import apiKeys from './apiKeys';
import ReactAnimatedWeather from 'react-animated-weather';

const defaults = {
  color: 'white',
  size: 112,
  animate: true,
};

function Forcast({icon, main}) {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const search = () => {
    axios
      .get(
        `${apiKeys.base}weather?q=${encodeURIComponent(
          city.trim()
        )}&units=metric&APPID=${apiKeys.key}`
      )
      .then((response) => {
        setWeather(response.data);
        console.log(response.data)
        setError(null);
      })
      .catch((error) => {
        console.error(error);
        setWeather(null);
        setError({ message: 'Not Found', city });
      });
      setCity("")
  };

  useEffect(() => {
    search();
  }, []);

  const renderWeatherDetails = () => {
    if (!weather) {
      return <li>{error ? `${error.city} ${error.message}` : 'Loading...'}</li>;
    }

    return (
      <>
        <li className="cityHead">
          <p>
            {weather.name}, {weather.sys.country}
          </p>
          <img
            className="temp"
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
            alt={weather.weather[0].description}
          />
        </li>
        <li>
          Temperature{' '}
          <span className="temp">
            {Math.round(weather.main.temp)}°C ({(weather.weather[0].main).slice(0,7)})
          </span>
        </li>
        <li>
          Humidity <span className="temp">{Math.round(weather.main.humidity)}%</span>
        </li>
        <li>
          Visibility <span className="temp">{Math.round(weather.visibility)} mi</span>
        </li>
        <li>
          Wind Speed <span className="temp">{Math.round(weather.wind.speed)} Km/h</span>
        </li>
      </>
    );
  };

  return (
    <div className="forecast">
      <div className="forecast-icon">
        <ReactAnimatedWeather
          icon={icon}
          color={defaults.color}
          size={defaults.size}
          animate={defaults.animate}
        />
      </div>
      <div className="today-weather">
        <h3>{main}</h3>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search any city"
            onChange={(e) => setCity(e.target.value)}
            value={city}
          />
          <div className="img-box">
            <img
              src="https://images.avishkaar.cc/workflow/newhp/search-white.png"
              alt="Search"
              onClick={search}
            />
          </div>
        </div>
        <ul>{renderWeatherDetails()}</ul>
      </div>
    </div>
  );
}

export default Forcast;
