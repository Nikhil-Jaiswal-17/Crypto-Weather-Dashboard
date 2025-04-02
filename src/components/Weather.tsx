"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../redux/weatherSlice";
import { RootState, AppDispatch } from "../redux/store";

export default function Weather() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector((state: RootState) => state.weather);

  useEffect(() => {
    dispatch(fetchWeather("New York")); // Default city
  }, [dispatch]);

  return (
    <div className="p-4 bg-gray-900 text-white rounded-lg">
      <h2 className="text-xl font-bold">Weather</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {data && (
        <div>
          <p>🌡️ Temperature: {data.main.temp}°C</p>
          <p>💧 Humidity: {data.main.humidity}%</p>
          <p>🌤️ Condition: {data.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}
