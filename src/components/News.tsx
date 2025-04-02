"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCryptoNews } from "../redux/newsSlice";
import { RootState, AppDispatch } from "../redux/store";

export default function News() {
  const dispatch = useDispatch<AppDispatch>();
  const { articles, loading, error } = useSelector((state: RootState) => state.news);

  useEffect(() => {
    dispatch(fetchCryptoNews());
  }, [dispatch]);

  return (
    <div className="p-4 bg-gray-900 text-white rounded-lg w-full max-w-3xl">
      <h2 className="text-xl font-bold mb-2">Crypto News</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {articles.length > 0 && (
        <ul className="list-disc pl-4">
          {articles.slice(0, 5).map((article, index) => (
            <li key={index} className="mb-2">
              <a href={article.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                {article.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
