"use client";
import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Table } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const API_KEY = "YOUR_WEATHER_API_KEY";
const CITY = "London"; // Change dynamically based on user selection

const CityDetails = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/history.json?key=${API_KEY}&q=${CITY}&dt=2024-03-25`
        );
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWeatherData();
  }, []);

  if (loading) {
    return <Skeleton className="h-40 w-full" />;
  }

  const historyData = weatherData?.forecast?.forecastday[0]?.hour.map((hour) => ({
    time: hour.time.split(" ")[1],
    temp: hour.temp_c,
    humidity: hour.humidity,
  }));

  const columns = [
    { title: "Time", dataIndex: "time", key: "time" },
    { title: "Temperature (°C)", dataIndex: "temp", key: "temp" },
    { title: "Humidity (%)", dataIndex: "humidity", key: "humidity" },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{CITY} Weather Details</h1>
      <Card className="mb-4 p-4 shadow-lg rounded-xl">
        <h2 className="text-lg font-semibold mb-2">Temperature & Humidity Chart</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={historyData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="temp" stroke="#8884d8" name="Temperature (°C)" />
            <Line type="monotone" dataKey="humidity" stroke="#82ca9d" name="Humidity (%)" />
          </LineChart>
        </ResponsiveContainer>
      </Card>
      <Card className="p-4 shadow-lg rounded-xl">
        <h2 className="text-lg font-semibold mb-2">Hourly Weather Data</h2>
        <Table dataSource={historyData} columns={columns} pagination={false} />
      </Card>
    </div>
  );
};

export default CityDetails;