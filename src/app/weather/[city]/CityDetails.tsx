"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const WEATHER_API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const WEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

const CityDetails = () => {
  const [cities, setCities] = useState([]); // List of cities from localStorage
  const [selectedCity, setSelectedCity] = useState(""); // Currently selected city
  const [weatherData, setWeatherData] = useState(null); // Weather data for the selected city

  useEffect(() => {
    // Fetch cities from localStorage
    const savedCities = localStorage.getItem("cities");
    if (savedCities) {
      setCities(JSON.parse(savedCities));
      setSelectedCity(JSON.parse(savedCities)[0]); // Default to the first city
    }
  }, []);

  useEffect(() => {
    if (selectedCity) {
      // Fetch weather data for the selected city
      const fetchWeatherData = async () => {
        try {
          const res = await fetch(`${WEATHER_BASE_URL}?q=${selectedCity}&appid=${WEATHER_API_KEY}&units=metric`);
          const data = await res.json();
          setWeatherData(data);
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      };
      fetchWeatherData();
    }
  }, [selectedCity]);

  // Prepare data for charts
  const chartData = weatherData
    ? [
        { name: "Temperature (°C)", value: weatherData.main.temp },
        { name: "Humidity (%)", value: weatherData.main.humidity },
        { name: "Pressure (hPa)", value: weatherData.main.pressure },
        { name: "Wind Speed (m/s)", value: weatherData.wind.speed },
        { name: "Visibility (km)", value: (weatherData.visibility / 1000).toFixed(1) },
      ]
    : [];

  return (
    <div className="max-w-4xl mx-auto py-6">
      {/* Dropdown to select city */}
      <div className="mb-6">
        <label className="block text-lg font-bold mb-2" htmlFor="city-select">
          Select a City:
        </label>
        <select
          id="city-select"
          className="p-2 border rounded-md w-full"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          {cities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {/* Weather details and charts */}
      {weatherData ? (
        <>
          <Card className="shadow-md p-6 mb-6">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">{selectedCity} - Weather Details</CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>Temperature:</strong> {weatherData.main.temp}°C</p>
              <p><strong>Humidity:</strong> {weatherData.main.humidity}%</p>
              <p><strong>Pressure:</strong> {weatherData.main.pressure} hPa</p>
              <p><strong>Wind Speed:</strong> {weatherData.wind.speed} m/s</p>
              <p><strong>Visibility:</strong> {(weatherData.visibility / 1000).toFixed(1)} km</p>
            </CardContent>
          </Card>

          {/* Individual Charts for Each Parameter */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {chartData.map((item, index) => (
              <Card key={index} className="shadow-md p-4">
                <CardHeader>
                  <CardTitle className="text-lg font-bold">{item.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={[item]}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#007bff" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500">Select a city to view weather details...</p>
      )}
    </div>
  );
};

export default CityDetails;
