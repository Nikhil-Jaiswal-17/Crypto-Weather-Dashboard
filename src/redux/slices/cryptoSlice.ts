import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// API URL to fetch cryptocurrency data
const API_URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana&order=market_cap_desc&per_page=3&page=1&sparkline=true";

// Async thunk to fetch crypto data
export const fetchCryptoData = createAsyncThunk("crypto/fetchCryptoData", async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
});

// Define the state interface
interface CryptoState {
  data: any[]; // You can replace `any` with a proper type if needed
  loading: boolean;
  error: string | null;
}

// Initial state with proper typing
const initialState: CryptoState = {
  data: [],
  loading: false,
  error: null,
};

// Create the crypto slice
const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
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
        state.error = action.error.message ?? "Something went wrong";
      });
  },
});

export default cryptoSlice.reducer;
