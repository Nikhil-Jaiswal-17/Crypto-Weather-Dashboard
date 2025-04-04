"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
const NEWS_API_URL = `https://newsdata.io/api/1/news?apikey=${API_KEY}&q=cryptocurrency&category=business&language=en`;

type NewsArticle = {
  title: string;
  link: string;
  image_url?: string;
  source_id?: string;
  pubDate: string;
};

const CryptoNews = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchNews = async () => {
    setRefreshing(true);
    setLoading(true);
    try {
      const res = await fetch(NEWS_API_URL);
      const data = await res.json();
      setNews(data.results.slice(0, 6)); // Get top 6 news articles
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchNews();
    const interval = setInterval(fetchNews, 300000); // Refresh every 5 minutes
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Latest Crypto News</h1>
        <Button onClick={fetchNews} disabled={refreshing} className="text-sm">
          {refreshing ? "Refreshing..." : "Refresh"}
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {loading
          ? Array(6)
              .fill(0)
              .map((_, i) => <Skeleton key={i} className="h-56 w-full" />)
          : news.map((article, index) => (
              <Card key={index} className="shadow-md overflow-hidden">
                {article.image_url && (
                  <img
                    src={article.image_url}
                    alt={article.title}
                    className="w-full h-64 object-cover"
                  />
                )}
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    <a
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {article.title}
                    </a>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    {article.source_id} -{" "}
                    {new Date(article.pubDate).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))}
      </div>
    </div>
  );
};

export default CryptoNews;
