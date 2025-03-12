import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state
interface FavoritesState {
    favoriteIds: string[];
}

const initialState: FavoritesState = {
    favoriteIds: [],
};

// Create the favorites slice
const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        toggleFavorite: (state, action: PayloadAction<string>) => {
            const coinId = action.payload;
            const index = state.favoriteIds.indexOf(coinId);

            if (index > -1) {
                // Remove from favorites if already exists
                state.favoriteIds.splice(index, 1);
            } else {
                // Add to favorites
                state.favoriteIds.push(coinId);
            }
        },
        clearFavorites: (state) => {
            state.favoriteIds = [];
        }
    },
});

// Export actions and reducer
export const { toggleFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
