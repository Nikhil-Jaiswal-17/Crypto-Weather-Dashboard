"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash, Plus, Search } from "lucide-react";

const WEATHER_API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const PEXELS_API_KEY = process.env.NEXT_PUBLIC_PEXELS_API_KEY;
const WEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const PEXELS_BASE_URL = "https://api.pexels.com/v1/search";

const WeatherPage = () => {
  const [cities, setCities] = useState(["Delhi", "London", "Tokyo"]);
  const [weatherData, setWeatherData] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [backgroundImages, setBackgroundImages] = useState({});

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
            const weatherCondition = data.weather[0].main;
            const imgRes = await fetch(`${PEXELS_BASE_URL}?query=${weatherCondition}&per_page=1`, {
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {cities.map((city) => (
          <Card key={city} className="shadow-lg relative text-black font-bold" style={{
            backgroundImage: `url(${backgroundImages[city]})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}>
            <CardHeader className="bg-black bg-opacity-50 p-4">
              <CardTitle className="flex justify-between items-center">
                {city}
                <Button variant="ghost" size="icon" onClick={() => removeCity(city)}>
                  <Trash size={16} />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="bg-black bg-opacity-50 p-4 rounded-lg">
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
    </div>
  );
};

export default WeatherPage;
