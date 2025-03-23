import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage
import cryptoReducer from "../features/cryptoSlice";
import favoritesReducer from "../features/favoritesSlice";
import currencyReducer from "../features/currencySlice";

// Configure persist for favorites and currency
const favoritesPersistConfig = {
    key: "favorites",
    storage,
    whitelist: ["favoriteIds"], // only favoriteIds will be persisted
};

const currencyPersistConfig = {
    key: "currency",
    storage,
    whitelist: ["selectedCurrency", "exchangeRates", "lastUpdated"], // persist user's currency choice and rates
};

const persistedFavoritesReducer = persistReducer(favoritesPersistConfig, favoritesReducer);
const persistedCurrencyReducer = persistReducer(currencyPersistConfig, currencyReducer);

// Create root reducer
const rootReducer = combineReducers({
    crypto: cryptoReducer,
    favorites: persistedFavoritesReducer,
    currency: persistedCurrencyReducer,
});

// Create store
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST"],
            },
        }),
});

// Create persistor
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
