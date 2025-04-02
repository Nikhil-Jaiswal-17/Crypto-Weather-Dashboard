import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://api.coingecko.com/api/v3/simple/price";

export const fetchCryptoPrices = createAsyncThunk(
  "crypto/fetchCryptoPrices",
  async () => {
    const response = await axios.get(`${BASE_URL}?ids=bitcoin,ethereum,cardano&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`);
    return response.data;
  }
);

const cryptoSlice = createSlice({
  name: "crypto",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptoPrices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCryptoPrices.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCryptoPrices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default cryptoSlice.reducer;
