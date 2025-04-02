"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const API_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana&order=market_cap_desc&per_page=3&page=1&sparkline=true";

const CryptoDashboard = () => {
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setCryptoData(data);
      } catch (error) {
        console.error("Error fetching crypto data:", error);
      }
    };
    fetchCryptoData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Cryptocurrency Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cryptoData.map((coin) => (
          <Card key={coin.id} className="shadow-md">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                {coin.name} <img src={coin.image} alt={coin.name} className="w-8 h-8" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>Price:</strong> ${coin.current_price.toFixed(2)}</p>
              <p><strong>24h Change:</strong> {coin.price_change_percentage_24h.toFixed(2)}%</p>
              <p><strong>Market Cap:</strong> ${coin.market_cap.toLocaleString()}</p>
              <ResponsiveContainer width="100%" height={100}>
                <LineChart data={coin.sparkline_in_7d.price.map((price, index) => ({ time: index, price }))}>
                  <XAxis dataKey="time" hide />
                  <YAxis domain={[Math.min(...coin.sparkline_in_7d.price), Math.max(...coin.sparkline_in_7d.price)]} hide />
                  <Tooltip />
                  <Line type="monotone" dataKey="price" stroke="#8884d8" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        ))}
      </div>
      <h2 className="text-2xl font-semibold mt-8 mb-4">Cryptocurrency Market Overview</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>24h Change</TableHead>
            <TableHead>Market Cap</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cryptoData.map((coin) => (
            <TableRow key={coin.id}>
              <TableCell className="flex items-center gap-2">
                <img src={coin.image} alt={coin.name} className="w-5 h-5" /> {coin.name}
              </TableCell>
              <TableCell>${coin.current_price.toFixed(2)}</TableCell>
              <TableCell className={coin.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"}>
                {coin.price_change_percentage_24h.toFixed(2)}%
              </TableCell>
              <TableCell>${coin.market_cap.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CryptoDashboard;
