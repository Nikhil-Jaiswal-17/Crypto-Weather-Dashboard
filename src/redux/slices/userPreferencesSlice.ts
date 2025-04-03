import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserPreferencesState {
  favoriteCities: string[];
  favoriteCryptos: string[];
}

const initialState: UserPreferencesState = {
  favoriteCities: [],
  favoriteCryptos: [],
};

const userPreferencesSlice = createSlice({
  name: "userPreferences",
  initialState,
  reducers: {
    addFavoriteCity: (state, action: PayloadAction<string>) => {
      state.favoriteCities.push(action.payload);
    },
    removeFavoriteCity: (state, action: PayloadAction<string>) => {
      state.favoriteCities = state.favoriteCities.filter(city => city !== action.payload);
    },
    addFavoriteCrypto: (state, action: PayloadAction<string>) => {
      state.favoriteCryptos.push(action.payload);
    },
    removeFavoriteCrypto: (state, action: PayloadAction<string>) => {
      state.favoriteCryptos = state.favoriteCryptos.filter(crypto => crypto !== action.payload);
    },
  },
});

export const { addFavoriteCity, removeFavoriteCity, addFavoriteCrypto, removeFavoriteCrypto } = userPreferencesSlice.actions;
export default userPreferencesSlice.reducer;
