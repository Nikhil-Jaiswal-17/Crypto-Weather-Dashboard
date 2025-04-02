"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCryptoPrices } from "../redux/cryptoSlice";
import { RootState, AppDispatch } from "../redux/store";

export default function Crypto() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector((state: RootState) => state.crypto);

  useEffect(() => {
    dispatch(fetchCryptoPrices());
  }, [dispatch]);

  return (
    <div className="p-4 bg-gray-900 text-white rounded-lg">
      <h2 className="text-xl font-bold">Cryptocurrency Prices</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {data && (
        <div>
          {Object.keys(data).map((coin) => (
            <div key={coin} className="border-b border-gray-700 py-2">
              <p className="text-lg font-semibold capitalize">{coin}</p>
              <p>💰 Price: ${data[coin].usd.toFixed(2)}</p>
              <p>📉 24h Change: {data[coin].usd_24h_change.toFixed(2)}%</p>
              <p>🏦 Market Cap: ${data[coin].usd_market_cap.toFixed(0)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
