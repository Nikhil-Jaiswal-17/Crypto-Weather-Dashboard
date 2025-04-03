"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, Legend } from "recharts";

const WEATHER_API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const WEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

const CityWeatherDetails = () => {
  const router = useRouter();
  const [cities, setCities] = useState([]); // List of cities from localStorage
  const [selectedCity, setSelectedCity] = useState(""); // Currently selected city
  const [weatherData, setWeatherData] = useState(null); // Weather data for the selected city

  useEffect(() => {
    // Fetch cities from localStorage
    const savedCities = localStorage.getItem("cities");
    if (savedCities) {
      setCities(JSON.parse(savedCities));
      setSelectedCity(JSON.parse(savedCities)[0] || "Add City"); // Default to first city or "Add City"
    }
  }, []);

  useEffect(() => {
    if (selectedCity && selectedCity !== "Add City") {
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
    } else if (selectedCity === "Add City") {
      // Redirect to Weather Page for adding new cities
      router.push("/weather"); // Replace '/weather' with your actual route
    }
  }, [selectedCity, router]); // Include 'router' as a dependency here

  // // Prepare data for charts
  // const chartData = weatherData
  //   ? [
  //       { name: "Temperature", value: weatherData.main.temp },
  //       { name: "Humidity", value: weatherData.main.humidity },
  //       { name: "Pressure", value: weatherData.main.pressure },
  //       { name: "Wind Speed", value: weatherData.wind.speed },
  //       { name: "Visibility", value: (weatherData.visibility / 1000).toFixed(1) },
  //     ]
  //   : [];

  // Colors for Pie Chart
  const pieColors = ["#007bff", "#00c49f", "#ffbb28", "#ff8042", "#8884d8"];

  return (
    <div className="max-w-4xl mx-auto">
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
          <option value="Add City">Add City</option> {/* Add City Option */}
          {cities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {/* Weather details and charts */}
      {weatherData && selectedCity !== "Add City" ? (
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

          {/* Unique Charts for Each Parameter */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Temperature */}
            <Card className="shadow-md p-4">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Temperature (°C)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={[{ name: "Temperature", value: weatherData.main.temp }]}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#ff7300" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Humidity */}
            <Card className="shadow-md p-4">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Humidity (%)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={[{ name: "Humidity", value: weatherData.main.humidity }]}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="value" stroke="#007bff" fill="#007bff" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Pressure */}
            <Card className="shadow-md p-4">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Pressure (hPa)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={[{ name: "Pressure", value: weatherData.main.pressure }]}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#00c49f" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Wind Speed */}
            <Card className="shadow-md p-4">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Wind Speed (m/s)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      dataKey="value"
                      data={[{ name: "Wind Speed", value: weatherData.wind.speed }]}
                      cx="50%"
                      cy="50%"
                      outerRadius={60}
                      fill="#ff8042"
                      label
                    >
                      <Cell key="wind" fill={pieColors[3]} />
                    </Pie>
                    <Legend />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Visibility */}
            <Card className="shadow-md p-4">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Visibility (km)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={[{ name: "Visibility", value: (weatherData.visibility / 1000).toFixed(1) }]}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500">Select a city to view weather details...</p>
      )}
    </div>
  );
};

export default CityWeatherDetails;
