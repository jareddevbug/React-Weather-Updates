import React, { useEffect, useState } from "react";
import axios from "axios";
import WeatherCard from "./WeatherCard";
import FormDialog from "./OpenModal";

function App() {
  const [weatherDataList, setWeatherDataList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [countries, setCountries] = useState([]);
  const [icon, setIcon] = useState("N/A"); // Initialize icon state with "N/A"

  useEffect(() => {
    console.log(icon);
  }, [icon]);

  const fetchData = async (country) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=a353d012daaefef91c02fdede6b5ceed`
      );

      if (
        response.data &&
        response.data.main &&
        response.data.clouds &&
        response.data.wind
      ) {
        const newWeatherData = {
          country: response.data.sys.country,
          cloud: response.data.weather[0].description,
          feels: (response.data.main.feels_like - 273.15).toFixed(0) + "°C",
          humidity: response.data.main.humidity,
          wind: response.data.wind.speed,
          pressure: response.data.main.pressure,
          icon: response.data.weather[0].icon,
        };
        console.log(icon);
        setIcon(response.data.weather[0].icon);
        setWeatherDataList((prevList) => [...prevList, newWeatherData]);
        setCountries((prevCountries) => [...prevCountries, country]);
      } else {
        console.error("Error: Unexpected response structure");
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    setLoading(true);
    try {
      const updatedWeatherDataList = await Promise.all(
        countries.map(async (country) => {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=a353d012daaefef91c02fdede6b5ceed`
          );

          if (
            response.data &&
            response.data.main &&
            response.data.clouds &&
            response.data.wind
          ) {
            return {
              country: response.data.sys.country,
              cloud: response.data.weather[0].description,
              feels: (response.data.main.feels_like - 273.15).toFixed(0) + "°C",
              humidity: response.data.main.humidity,
              wind: response.data.wind.speed,
              pressure: response.data.main.pressure,
              icon: response.data.weather[0].icon,
            };
            console.log(country);
          } else {
            console.error("Error: Unexpected response structure");
            return null;
          }
        })
      );
      setWeatherDataList(
        updatedWeatherDataList.filter((data) => data !== null)
      );
    } catch (error) {
      console.error("Error refreshing weather data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = (countryName) => {
    fetchData(countryName);
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="header">
        <h2>
          Weather App{" "}
          <span>
            <hr />
            <button id="AddWeather" onClick={handleOpenModal}>
              Add
            </button>
            <button id="RefreshWeather" onClick={refreshData}>
              Refresh
            </button>
            <button id="DeleteWeather" onClick={() => setWeatherDataList([])}>
              Delete
            </button>
          </span>
        </h2>
      </div>

      <div className="container">
        {loading ? (
          <p id="loading">Loading...</p>
        ) : weatherDataList.length === 0 ? (
          <p id="avail">
            <strong>No data available</strong>
            <br />
            please add one first
          </p>
        ) : (
          weatherDataList.map((data, index) => (
            <WeatherCard key={index} {...data} />
          ))
        )}
      </div>

      <FormDialog
        open={isModalOpen}
        handleClose={handleCloseModal}
        handleSubmit={handleFormSubmit}
      />
    </div>
  );
}

export default App;
