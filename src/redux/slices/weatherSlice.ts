import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// Types
interface WeatherData {
  [city: string]: any; // You can replace `any` with a specific response shape if you want
}

interface WeatherState {
  cities: string[];
  weatherData: WeatherData;
  selectedCity: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// API Keys and URLs
const WEATHER_API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const WEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

// Thunk to fetch weather data
export const fetchWeatherData = createAsyncThunk(
  "weather/fetchWeatherData",
  async (city: string) => {
    const response = await fetch(`${WEATHER_BASE_URL}?q=${city}&appid=${WEATHER_API_KEY}&units=metric`);
    const data = await response.json();
    return { city, data };
  }
);

// Initial State
const initialState: WeatherState = {
  cities: ["Delhi", "London", "Tokyo"],
  weatherData: {},
  selectedCity: null,
  status: "idle",
  error: null,
};

// Slice
const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    addCity(state, action: PayloadAction<string>) {
      if (!state.cities.includes(action.payload)) {
        state.cities.push(action.payload);
      }
    },
    removeCity(state, action: PayloadAction<string>) {
      state.cities = state.cities.filter((city) => city !== action.payload);
      delete state.weatherData[action.payload];
    },
    selectCity(state, action: PayloadAction<string>) {
      state.selectedCity = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.weatherData[action.payload.city] = action.payload.data;
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const { addCity, removeCity, selectCity } = weatherSlice.actions;
export default weatherSlice.reducer;
