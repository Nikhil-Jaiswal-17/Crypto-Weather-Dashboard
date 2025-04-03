import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana&order=market_cap_desc&per_page=3&page=1&sparkline=true";

// Async thunk to fetch crypto data
export const fetchCryptoData = createAsyncThunk("crypto/fetchCryptoData", async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
});

const cryptoSlice = createSlice({
  name: "crypto",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptoData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCryptoData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCryptoData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default cryptoSlice.reducer;
