'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Trash, Plus, Heart, Search } from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const WEATHER_API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY!;
const PEXELS_API_KEY = process.env.NEXT_PUBLIC_PEXELS_API_KEY!;
const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const PEXELS_BASE_URL = 'https://api.pexels.com/v1/search';

interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
    pressure: number;
  };
  weather: {
    description: string;
  }[];
  wind: {
    speed: number;
  };
  cod: number;
}

interface PexelsPhoto {
  src: {
    large: string;
  };
}

interface PexelsResponse {
  photos: PexelsPhoto[];
}

const WeatherPage = () => {
  const [cities, setCities] = useState<string[]>(() => {
    const saved = localStorage.getItem('cities');
    return saved ? JSON.parse(saved) : ['Delhi', 'London', 'Tokyo'];
  });

  const [weatherData, setWeatherData] = useState<Record<string, WeatherData>>({});
  const [backgroundImages, setBackgroundImages] = useState<Record<string, string>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<WeatherData | null>(null);
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const citiesPerPage = 4;
  const totalPages = Math.ceil(cities.length / citiesPerPage);
  const paginatedCities = cities.slice(currentPage * citiesPerPage, (currentPage + 1) * citiesPerPage);

  useEffect(() => {
    const fetchWeather = async () => {
      const newWeatherData: Record<string, WeatherData> = {};
      const newBackgrounds: Record<string, string> = {};

      for (const city of cities) {
        try {
          const res = await fetch(`${WEATHER_BASE_URL}?q=${city}&appid=${WEATHER_API_KEY}&units=metric`);
          const data: WeatherData = await res.json();
          newWeatherData[city] = data;

          if (data.weather) {
            const imgRes = await fetch(`${PEXELS_BASE_URL}?query=${city} landmark&per_page=1`, {
              headers: { Authorization: PEXELS_API_KEY },
            });
            const imgData: PexelsResponse = await imgRes.json();
            newBackgrounds[city] = imgData.photos[0]?.src?.large || '';
          }
        } catch (err) {
          console.error(`Failed to fetch weather for ${city}`, err);
        }
      }

      setWeatherData(newWeatherData);
      setBackgroundImages(newBackgrounds);
    };

    fetchWeather();
  }, [cities]);

  useEffect(() => {
    localStorage.setItem('cities', JSON.stringify(cities));
  }, [cities]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleSearch = async () => {
    try {
      const res = await fetch(`${WEATHER_BASE_URL}?q=${searchQuery}&appid=${WEATHER_API_KEY}&units=metric`);
      const data: WeatherData = await res.json();
      if (data.cod === 200) {
        setSearchResult(data);
      } else {
        setSearchResult(null);
      }
    } catch (error) {
      console.error('Error searching city:', error);
    }
  };

  const addCity = () => {
    if (searchResult && !cities.includes(searchResult.name)) {
      setCities([...cities, searchResult.name]);
      setSearchResult(null);
      setSearchQuery('');
    }
  };

  const removeCity = (city: string) => {
    setCities(cities.filter((c) => c !== city));
  };

  const addFavorite = (city: string) => {
    if (!favorites.includes(city)) {
      setFavorites([...favorites, city]);
    }
  };

  const chartData =
    selectedCity && weatherData[selectedCity]
      ? [
          { name: 'Temperature', value: weatherData[selectedCity].main.temp },
          { name: 'Humidity', value: weatherData[selectedCity].main.humidity },
          { name: 'Wind Speed', value: weatherData[selectedCity].wind.speed },
          { name: 'Pressure', value: weatherData[selectedCity].main.pressure },
        ]
      : [];

  const pieColors = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d'];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Weather Dashboard</h1>
        <div className="flex gap-3">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a city..."
          />
          <Button onClick={handleSearch}>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {paginatedCities.map((city) => (
          <Card key={city} className="shadow-lg cursor-pointer" onClick={() => setSelectedCity(city)}>
            <div
              className="relative h-40 w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${backgroundImages[city]})` }}
            />
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                {city}
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeCity(city);
                    }}
                  >
                    <Trash size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      addFavorite(city);
                    }}
                  >
                    <Heart
                      size={16}
                      className={favorites.includes(city) ? 'text-red-500' : 'text-gray-500'}
                    />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {weatherData[city] ? (
                <>
                  <p><strong>Temp:</strong> {weatherData[city].main.temp}°C</p>
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

      <div className="flex justify-center my-4 gap-2">
        <Button disabled={currentPage === 0} onClick={() => setCurrentPage(currentPage - 1)}>
          Prev
        </Button>
        <Button disabled={currentPage === totalPages - 1} onClick={() => setCurrentPage(currentPage + 1)}>
          Next
        </Button>
      </div>

      {selectedCity && chartData.length > 0 && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Weather Chart for {selectedCity}</CardTitle>
          </CardHeader>
          <CardContent style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WeatherPage;
