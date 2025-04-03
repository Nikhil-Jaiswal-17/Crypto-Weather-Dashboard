"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash, Sun, DollarSign } from "lucide-react";

// Define the type for a favorite item
type FavoriteItem = {
  id: string;
  name: string;
  type: "weather" | "crypto"; // type can be either 'weather' or 'crypto'
  details: {
    temp?: number; // Only used if type is 'weather'
    humidity?: number; // Only used if type is 'weather'
    price?: number; // Only used if type is 'crypto'
    change?: number; // Only used if type is 'crypto'
  };
};

const FavoritesSection = () => {
  // Now we specify the type of favorites as an array of FavoriteItem
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    const parsedFavorites: FavoriteItem[] = savedFavorites ? JSON.parse(savedFavorites) : []; // Safe fallback to empty array
    setFavorites(parsedFavorites);
  }, []);

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Remove a favorite item
  const removeFavorite = (id: string) => {
    setFavorites(favorites.filter((item) => item.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Favorites</h1>
      {favorites.length === 0 ? (
        <>
          <p className="text-gray-700">You have no favorites yet. Add some from the Weather or Crypto sections!</p>
          <p className="text-gray-400 font-bold mt-10">Work in Progress! We are building something amazing for you. Please check back soon! </p>
        </>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((item) => (
            <Card key={item.id} className="shadow-md">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span className="flex items-center gap-2">
                    {item.type === "weather" ? (
                      <Sun className="h-5 w-5 text-yellow-500" />
                    ) : (
                      <DollarSign className="h-5 w-5 text-green-500" />
                    )}
                    {item.name}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFavorite(item.id)}
                    className="hover:bg-red-100"
                  >
                    <Trash size={16} className="text-red-500" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {item.type === "weather" ? (
                  <div>
                    <p><strong>Temperature:</strong> {item.details.temp}°C</p>
                    <p><strong>Humidity:</strong> {item.details.humidity}%</p>
                  </div>
                ) : (
                  <div>
                    <p><strong>Price:</strong> ${item.details.price}</p>
                    <p><strong>24h Change:</strong> {item.details.change}%</p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <p className="text-xs text-gray-500">{item.type === "weather" ? "Weather" : "Crypto"}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesSection;
