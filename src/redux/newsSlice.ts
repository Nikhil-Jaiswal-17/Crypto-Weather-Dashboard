import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const NEWS_API_URL = "https://newsdata.io/api/1/news";
const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY; 

export const fetchCryptoNews = createAsyncThunk(
  "news/fetchCryptoNews",
  async () => {
    const response = await axios.get(`${NEWS_API_URL}?apikey=${API_KEY}&q=crypto&language=en`);
    return response.data.results;
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState: {
    articles: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptoNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCryptoNews.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
      })
      .addCase(fetchCryptoNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default newsSlice.reducer;
