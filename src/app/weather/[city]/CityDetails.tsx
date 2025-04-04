"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const WEATHER_API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const WEATHER_HISTORY_API = "https://api.openweathermap.org/data/2.5/onecall";
const WEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

interface CityWeatherDetailsProps {
  params: {
    city: string;
  };
}

const CityWeatherDetails = ({ params }: CityWeatherDetailsProps) => {
  const { city } = params;
  const router = useRouter();
  const [weatherData, setWeatherData] = useState<any>(null);
  const [historyData, setHistoryData] = useState<any[]>([]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const res = await fetch(`${WEATHER_BASE_URL}?q=${city}&appid=${WEATHER_API_KEY}&units=metric`);
        const data = await res.json();
        if (data.coord) {
          setWeatherData(data);
          fetchWeatherHistory(data.coord.lat, data.coord.lon);
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    const fetchWeatherHistory = async (lat: number, lon: number) => {
      try {
        const res = await fetch(`${WEATHER_HISTORY_API}?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
        const data = await res.json();
        setHistoryData(data.hourly.slice(0, 12));
      } catch (error) {
        console.error("Error fetching weather history:", error);
      }
    };

    fetchWeatherData();
  }, [city]);

  const chartData = {
    labels: historyData.map((_, index) => `${index + 1}h ago`),
    datasets: [
      {
        label: "Temperature (°C)",
        data: historyData.map((item) => item.temp),
        borderColor: "#007bff",
        fill: false,
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto py-6">
      <button className="mb-4 text-blue-600 underline" onClick={() => router.back()}>
        Go Back
      </button>

      {weatherData ? (
        <Card className="shadow-md p-4">
          <CardHeader>
            <CardTitle>{city} - Detailed Weather</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>Temperature:</strong> {weatherData.main.temp}°C</p>
            <p><strong>Humidity:</strong> {weatherData.main.humidity}%</p>
            <p><strong>Condition:</strong> {weatherData.weather[0].description}</p>
            <p><strong>Wind Speed:</strong> {weatherData.wind.speed} m/s</p>
            <p><strong>Pressure:</strong> {weatherData.main.pressure} hPa</p>
            <p><strong>Visibility:</strong> {weatherData.visibility / 1000} km</p>
          </CardContent>
        </Card>
      ) : (
        <p>Loading weather data...</p>
      )}

      {historyData.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-3">Temperature History (Last 12 Hours)</h2>
          <Line data={chartData} />
        </div>
      )}
    </div>
  );
};

export default CityWeatherDetails;
