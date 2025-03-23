import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

interface CryptoState {
    coins: any[];
    status: "idle" | "loading" | "failed";
}

const initialState: CryptoState = {
    coins: [],
    status: "idle",
};

// Fetch crypto data from CoinGecko API with the selected currency
export const fetchCryptos = createAsyncThunk(
    "crypto/fetchCryptos",
    async (_, { getState }) => {
        const state = getState() as RootState;
        const currency = state.currency.selectedCurrency;

        const response = await axios.get(
            "https://api.coingecko.com/api/v3/coins/markets",
            {
                params: {
                    vs_currency: currency,
                    order: "market_cap_desc",
                    per_page: 150,
                    page: 1
                }
            }
        );
        return response.data;
    }
);

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
