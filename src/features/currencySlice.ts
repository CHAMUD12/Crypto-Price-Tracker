import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export type Currency = "usd" | "eur" | "gbp" | "jpy" | "aud" | "cad" | "chf";

interface CurrencyState {
    selectedCurrency: Currency;
    exchangeRates: Record<Currency, number>;
    status: "idle" | "loading" | "failed";
    lastUpdated: number | null;
}

const initialState: CurrencyState = {
    selectedCurrency: "usd",
    exchangeRates: {
        usd: 1,
        eur: 0.92,
        gbp: 0.78,
        jpy: 152.34,
        aud: 1.51,
        cad: 1.37,
        chf: 0.89
    },
    status: "idle",
    lastUpdated: null
};

// Fetch exchange rates from API
export const fetchExchangeRates = createAsyncThunk(
    "currency/fetchExchangeRates",
    async () => {
        // Using ExchangeRate-API as an example
        const response = await axios.get(
            "https://open.er-api.com/v6/latest/USD"
        );

        const rates = response.data.rates;

        // Format the rates to match our Currency type
        const formattedRates: Record<Currency, number> = {
            usd: 1, // Base currency is USD
            eur: rates.EUR,
            gbp: rates.GBP,
            jpy: rates.JPY,
            aud: rates.AUD,
            cad: rates.CAD,
            chf: rates.CHF
        };

        return formattedRates;
    }
);

const currencySlice = createSlice({
    name: "currency",
    initialState,
    reducers: {
        changeCurrency: (state, action: PayloadAction<Currency>) => {
            state.selectedCurrency = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchExchangeRates.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchExchangeRates.fulfilled, (state, action) => {
                state.exchangeRates = action.payload;
                state.status = "idle";
                state.lastUpdated = Date.now();
            })
            .addCase(fetchExchangeRates.rejected, (state) => {
                state.status = "failed";
                // Keep the existing rates if fetching fails
            });
    }
});

export const { changeCurrency } = currencySlice.actions;
export default currencySlice.reducer;
