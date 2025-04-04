1   "use client";
2   
3   import { useEffect, useState } from "react";
4   import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
5   import { Skeleton } from "@/components/ui/skeleton";
6   import { Button } from "@/components/ui/button";
7   
8   const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
9   const NEWS_API_URL = `https://newsdata.io/api/1/news?apikey=${API_KEY}&q=cryptocurrency&category=business&language=en`;
10  
11  // 👇 Yeh naya type define karo taaki TypeScript ko samajh aaye news article mein kya kya hoga
12  type NewsArticle = {
13    title: string;
14    link: string;
15    image_url?: string;
16    source_id?: string;
17    pubDate: string;
18  };
19  
20  // 👇 useState mein type specify karo warna TypeScript 'never' maan raha
21  const [news, setNews] = useState<NewsArticle[]>([]);
22  const [loading, setLoading] = useState(true);
23  const [refreshing, setRefreshing] = useState(false);
24  
25  const fetchNews = async () => {
26    setRefreshing(true);
27    setLoading(true);
28    try {
29      const res = await fetch(NEWS_API_URL);
30      const data = await res.json();
31      setNews(data.results.slice(0, 6)); // Get top 6 news articles
32    } catch (error) {
33      console.error("Error fetching news:", error);
34    } finally {
35      setLoading(false);
36      setRefreshing(false);
37    }
38  };
39  
40  useEffect(() => {
41    fetchNews();
42    const interval = setInterval(fetchNews, 300000); // Refresh every 5 minutes
43    return () => clearInterval(interval);
44  }, []);
45  
46  return (
47    <div className="max-w-7xl mx-auto">
48      <div className="flex justify-between items-center mb-6">
49        <h1 className="text-3xl font-bold">Latest Crypto News</h1>
50        <Button onClick={fetchNews} disabled={refreshing} className="text-sm">
51          {refreshing ? "Refreshing..." : "Refresh"}
52        </Button>
53      </div>
54      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
55        {loading
56          ? Array(6).fill(0).map((_, i) => <Skeleton key={i} className="h-56 w-full" />)
57          : news.map((article, index) => (
58              <Card key={index} className="shadow-md overflow-hidden">
59                {article.image_url && ( // 👈 Ab yeh error nahi dega kyunki type define hai
60                  <img src={article.image_url} alt={article.title} className="w-full h-64 object-cover" />
61                )}
62                <CardHeader>
63                  <CardTitle className="text-lg font-semibold">
64                    <a href={article.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
65                      {article.title}
66                    </a>
67                  </CardTitle>
68                </CardHeader>
69                <CardContent>
70                  <p className="text-sm text-gray-600">
71                    {article.source_id} - {new Date(article.pubDate).toLocaleDateString()}
72                  </p>
73                </CardContent>
74              </Card>
75            ))}
76      </div>
77    </div>
78  );
79  };
80  
81  export default CryptoNews;
