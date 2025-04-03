"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash, Plus, Heart, Search } from "lucide-react"; // Added Heart icon
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { PieChart, Pie, Cell, Legend } from "recharts";

const WEATHER_API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const PEXELS_API_KEY = process.env.NEXT_PUBLIC_PEXELS_API_KEY;
const WEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const PEXELS_BASE_URL = "https://api.pexels.com/v1/search";

const WeatherPage = () => {
  const [cities, setCities] = useState(() => {
    const savedCities = localStorage.getItem("cities");
    return savedCities ? JSON.parse(savedCities) : ["Delhi", "London", "Tokyo"];
  });

  const [weatherData, setWeatherData] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [backgroundImages, setBackgroundImages] = useState({});
  const [selectedCity, setSelectedCity] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  }); // State for favorite cities
  const [currentPage, setCurrentPage] = useState(0); // For pagination

  const citiesPerPage = 4; // Number of cities per page

  useEffect(() => {
    const fetchWeather = async () => {
      const newWeatherData = {};
      const newBackgrounds = {};
      for (const city of cities) {
        try {
          const res = await fetch(`${WEATHER_BASE_URL}?q=${city}&appid=${WEATHER_API_KEY}&units=metric`);
          const data = await res.json();
          newWeatherData[city] = data;
          
          if (data.weather) {
            const imgRes = await fetch(`${PEXELS_BASE_URL}?query=${city} landmark&per_page=1`, {
              headers: { Authorization: PEXELS_API_KEY },
            });
            const imgData = await imgRes.json();
            newBackgrounds[city] = imgData.photos[0]?.src?.large || "";
          }
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      }
      setWeatherData(newWeatherData);
      setBackgroundImages(newBackgrounds);
    };
    fetchWeather();
  }, [cities]);

  useEffect(() => {
    localStorage.setItem("cities", JSON.stringify(cities));
  }, [cities]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleSearch = async () => {
    try {
      const res = await fetch(`${WEATHER_BASE_URL}?q=${searchQuery}&appid=${WEATHER_API_KEY}&units=metric`);
      const data = await res.json();
      if (data.cod === 200) {
        setSearchResult(data);
      } else {
        setSearchResult(null);
      }
    } catch (error) {
      console.error("Error searching city:", error);
    }
  };

  const addCity = () => {
    if (searchResult && !cities.includes(searchResult.name)) {
      setCities([...cities, searchResult.name]);
      setSearchResult(null);
      setSearchQuery("");
    }
  };

  const removeCity = (city) => {
    setCities(cities.filter((c) => c !== city));
  };

  const addFavorite = (city) => {
    if (!favorites.includes(city)) {
      setFavorites([...favorites, city]);
    }
  };

  const chartData = selectedCity && weatherData[selectedCity] ? [
    { name: "Temperature", value: weatherData[selectedCity].main.temp },
    { name: "Humidity", value: weatherData[selectedCity].main.humidity },
    { name: "Wind Speed", value: weatherData[selectedCity].wind.speed },
    { name: "Pressure", value: weatherData[selectedCity].main.pressure },
  ] : [];

  const pieColors = ["#8884d8", "#83a6ed", "#8dd1e1", "#82ca9d"];

  // Pagination logic
  const totalPages = Math.ceil(cities.length / citiesPerPage);
  const paginatedCities = cities.slice(
    currentPage * citiesPerPage,
    (currentPage + 1) * citiesPerPage
  );

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Weather Dashboard</h1>
        <div className="flex gap-3">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a city..."
            className="flex-grow w-fit"
          />
          <Button onClick={handleSearch} className="flex items-center">
            <Search className="mr-2" size={16} /> Search
          </Button>
        </div>
      </div>

      {searchResult && (
        <Card className="mb-6 shadow-md">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              {searchResult.name}
              <Button variant="ghost" size="icon" onClick={addCity}>
                <Plus size={18} />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>Temperature:</strong> {searchResult.main.temp}°C</p>
            <p><strong>Humidity:</strong> {searchResult.main.humidity}%</p>
            <p><strong>Condition:</strong> {searchResult.weather[0].description}</p>
          </CardContent>
        </Card>
      )}

      {/* Pagination for city cards */}
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {paginatedCities.map((city) => (
            <Card key={city} className="shadow-lg cursor-pointer text-black font-bold" onClick={() => setSelectedCity(city)}>
              <div className="relative h-40 w-full bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImages[city]})` }}></div>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  {city}
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); removeCity(city); }}>
                      <Trash size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); addFavorite(city); }}>
                      <Heart size={16} className={favorites.includes(city) ? "text-red-500" : "text-gray-500"} />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {weatherData[city] ? (
                  <>
                    <p><strong>Temperature:</strong> {weatherData[city].main.temp}°C</p>
                    <p><strong>Humidity:</strong> {weatherData[city].main.humidity}%</p>
                    <p><strong>Condition:</strong> {weatherData[city].weather[0].description}</p>
                  </>
                ) : (
                  <p>Loading...</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

       {/* Pagination dots */}
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`h-3 w-3 rounded-full mx-1 ${
                index === currentPage ? "bg-black" : "bg-gray-300"
              }`}
            ></button>
          ))}
        </div>
      </div>

      {selectedCity && weatherData[selectedCity] && (
        <div className="mt-8 p-6 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">{selectedCity} - Detailed Weather</h2>
          <div className="mb-6">
            <p><strong>Temperature:</strong> {weatherData[selectedCity].main.temp}°C</p>
            <p><strong>Humidity:</strong> {weatherData[selectedCity].main.humidity}%</p>
            <p><strong>Condition:</strong> {weatherData[selectedCity].weather[0].description}</p>
            <p><strong>Wind Speed:</strong> {weatherData[selectedCity].wind.speed} m/s</p>
            <p><strong>Pressure:</strong> {weatherData[selectedCity].main.pressure} hPa</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherPage;