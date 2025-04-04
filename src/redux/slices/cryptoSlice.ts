import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define the shape of a single crypto coin
interface CryptoCoin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  total_volume: number;
  price_change_percentage_24h: number;
  sparkline_in_7d?: {
    price: number[];
  };
}

// Define the state interface
interface CryptoState {
  data: CryptoCoin[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: CryptoState = {
  data: [],
  loading: false,
  error: null,
};

const API_URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana&order=market_cap_desc&per_page=3&page=1&sparkline=true";

// Async thunk to fetch crypto data
export const fetchCryptoData = createAsyncThunk<CryptoCoin[]>("crypto/fetchCryptoData", async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data as CryptoCoin[];
});

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
