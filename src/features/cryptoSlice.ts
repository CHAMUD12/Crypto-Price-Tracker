import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface CryptoState {
    coins: any[];
    status: "idle" | "loading" | "failed";
}

const initialState: CryptoState = {
    coins: [],
    status: "idle",
};

// Fetch crypto data from CoinGecko API
export const fetchCryptos = createAsyncThunk("crypto/fetchCryptos", async () => {
    const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        { params: { vs_currency: "usd", order: "market_cap_desc", per_page: 10, page: 1 } }
    );
    return response.data;
});

const cryptoSlice = createSlice({
    name: "crypto",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCryptos.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchCryptos.fulfilled, (state, action) => {
                state.status = "idle";
                state.coins = action.payload;
            })
            .addCase(fetchCryptos.rejected, (state) => {
                state.status = "failed";
            });
    },
});

export default cryptoSlice.reducer;
